/***********************
MATCH THEORY constraints
and their numerous helpers
************************/

function getLeaves(x)
//return a list of all the non-silent terminals dominated by a node
{
	var leaves = [];
	if(x.children && x.children.length)
	//x is non-terminal
	{
		for(var y=0; y < x.children.length; y++){
			var yLeaves = getLeaves(x.children[y]);
			for(var i=0; i < yLeaves.length; i++){
				leaves.push(yLeaves[i]);
			}
		}
	}
	else if(!x.silent)	// x is itself a non-silent terminal
	{
		leaves.push(x);
	}
	return leaves;
}

function sameIds(a1, a2)
//helper function to compare two arrays of children
//since there isn't a built_in array comparator.
{
	if(a1.length !== a2.length)
		return false;

	var i = 0;
	while(i<a1.length){
		if(a1[i].id !== a2[i].id)
			return false;
		i++;
	}

	return true;
}


function matchPS(sTree, pParent, pCat)
//Assign a violation for every prosodic node of type pCat in pParent that doesn't have a corresponding syntactic node in sTree,
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding syntactic category
//Assumes no null terminals.
{
	return matchSP(pParent, sTree, pCat);
}

//Longterm TODO: Technically, Match doesn't compare ordered sets but unordered sets, so for an implementation that wouldn't penalize prosodic scrambling we'd need to sort sParent.children and pParent.children before comparing them.
//TODO: what about null syntactic terminals?? these need to be filtered out of the syntactic input?? write this function later.

function matchSP(sParent, pTree, sCat)
//Assign a violation for every syntactic node of type sCat in sParent that doesn't have a corresponding prosodic node in pTree,
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding prosodic category
//Assumes no null syntactic terminals.
{
	if(sParent.cat === sCat)
		logreport.debug("\tSeeking match for "+sParent.id + " in tree rooted in "+pTree.id);
	var vcount = 0;

	if((sParent.cat === sCat) && !hasMatch(sParent, pTree)){
		vcount++;
		logreport.debug("\tVIOLATION: "+sParent.id+" has no match!");
	}

	if(sParent.children){
		for(var i = 0; i < sParent.children.length; i++)
		{
			var sChild = sParent.children[i];
			vcount += matchSP(sChild, pTree, sCat);
		}
	}

	return vcount;
}

function hasMatch(sNode, pTree)
//For a syntactic node sNode and a prosodic tree pTree, search the entire pTree
//to see if there is a node in pTree that has the same set of terminals as sNode,
//in the same order as sLeaves.
//Returns true for terminals assuming that there are no null syntactic terminals...
//Relies on sameIds for leaf comparisons and catMatches for category comparisons.
{
	var sLeaves = getLeaves(sNode);
	if(catsMatch(sNode.cat, pTree.cat) && sameIds(getLeaves(pTree), sLeaves))
	// the current prosodic node is the match, both for category and for terminals
	{
		logreport.debug("\tMatch found: "+pTree.id);
		return true;
	}

	// If the current prosodic node is NOT the match:

	else if(!pTree.children || pTree.children.length===0)
	// current node is terminal
		return false;

	else
	//the current prosodic node is non-terminal (has children)
	{
		for(var i = 0; i < pTree.children.length; i++)
		//check each child to see if the match exists in the subtree rooted in that child
		{
			var child = pTree.children[i];
			if(hasMatch(sNode, child))
				return true;
		}
		return false;
	}

}

// Match Max constraints:

/* Same as hasMatch function above, except this only returns true if the
 * matching prosodic node is maximal:
 */
function hasMaxMatch(sNode, pTree){
	 var sLeaves = getLeaves(sNode);
	 markMinMax(pTree); //mark min and max on prosodic tree
	 if(catsMatch(sNode.cat, pTree.cat) && sameIds(getLeaves(pTree), sLeaves) && pTree.isMax)
	 // the current prosodic node is the match, both for category and for terminals, and is maximal
		{
 			return true;
 		}

 		// If the current prosodic node is NOT the match:

 		else if(!pTree.children || pTree.children.length===0){
 		// current node is terminal
 			return false;
		}

 		else
 		//the current prosodic node is non-terminal (has children)
 		{
 			for(var i = 0; i < pTree.children.length; i++)
 			//check each child to see if the match exists in the subtree rooted in that child
 			{
 				var child = pTree.children[i];
 				if(hasMaxMatch(sNode, child)){
 					return true;
				}
 			}
 			return false;
 		}

 }

 /* Assign a violation for every node of syntactic category s that is not
  * dominated by another node of category s in the syntactic tree, and is not
  * mapped to a corresponding prosodic node of category p, where p=catMap(s),
  * such that p is not dominated by another node of category p.
  */

function matchMaxSP(sTree, pTree, sCat){
	 var vcount = 0;
	 markMinMax(sTree); //mark maximal nodes in tree
	 if (sTree.children && sTree.children.length){
		 for (var i = 0; i < sTree.children.length; i ++){
			 vcount += matchMaxSP(sTree.children[i], pTree, sCat); //recursive function call
		 }
	 }
	 if (sTree.cat === sCat && sTree.isMax && !hasMaxMatch(sTree, pTree)){
		 //add violation if this node has no maximal match, is maximal and of the right cat
		 vcount ++;
	 }
	 return vcount;
 }

/* Same as matchMaxSP, except matching prosodic node need not be maximal,
 * only the syntactic node must be maximal to incur a violation if no match is
 * found.
 */
function matchMaxSyntax(sTree, pTree, sCat){
	 var vcount = 0;
	 markMinMax(sTree); //mark maximal nodes in tree
	 if (sTree.children && sTree.children.length){
		 for (var i = 0; i < sTree.children.length; i ++){
			 vcount += matchMaxSyntax(sTree.children[i], pTree, sCat); //recursive function call
		 }
	 }
	 if (sTree.cat === sCat && sTree.isMax && !hasMatch(sTree, pTree)){
		 //add violation if this node has no match, is maximal and of the right cat
		 vcount ++;
	 }
	 return vcount;
 }

//Match Maximal P --> S
//Switch inputs for PS matching:
function matchMaxPS(sTree, pTree, pCat){
	return matchMaxSP(pTree, sTree, pCat);
}

//Match P --> S version of matchMaxSyntax. See comment there for explanation
function matchMaxProsody(sTree, pTree, pCat){
	return matchMaxSyntax(pTree, sTree, pCat);
}
