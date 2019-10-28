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

function sameIdsOrdered(a1, a2)
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

/* function to compare sets of terminals {A} and {B}. returns true iff for each
 * element in A, there is an element in B with the same value for the property
 * "id" and A and B are of the same lenght.
 * Order insensitive version of sameIdsOrdered.
 */
function sameIds(a1, a2){
	if (a1.length !== a2.length){
		return false;
	}
	for (var x = 0; x < a1.length; x ++){ // for each element in a1
		var y = 0;
		var matched = false; // keeps track of if a1[x] has a match in a2
		while (matched == false){//there is an element in a2 ...
			if (a2[y] && a1[x].id === a2[y].id){ // such that these elements have the same ids
				matched = true; // set matched to true
			}
			if (y == a2.length){ //matched is false for every element in a2
				return false;
			}
			y ++; //increment y
		}
	}
	// if nothing caused the function to return false ...
	return true;
}


function matchPS(sTree, pParent, pCat, options)
//Assign a violation for every prosodic node of type pCat in pParent that doesn't have a corresponding syntactic node in sTree,
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding syntactic category
//Assumes no null terminals.
//flipped options is necessary because otherwise the prosodic trees will be checked for maximality/minimality when maxSyntax, eg,
//is set to true. The same goes for the syntactic trees
{
	options = options || {};
	var flippedOptions = {};
	flippedOptions.maxSyntax = options.maxProsody || false;
	flippedOptions.nonMaxSyntax = options.nonMaxProsody || false;
	flippedOptions.minSyntax = options.minProsody || false;
	flippedOptions.nonMinSyntax = options.nonMinProsody || false;
	flippedOptions.maxProsody = options.maxSyntax || false;
	flippedOptions.nonMaxProsody = options.nonMaxSyntax || false;
	flippedOptions.minProsody = options.minSyntax || false;
	flippedOptions.nonMinProsody = options.nonMinSyntax || false;
	flippedOptions.requireLexical = options.requireLexical || false;
	flippedOptions.requireOvertHead = options.requireOvertHead || false;
	return matchSP(pParent, sTree, pCat, flippedOptions);
}


//TODO: what about null syntactic terminals?? these need to be filtered out of the syntactic input?? write this function later.

function matchSP(sParent, pTree, sCat, options)
/*Assign a violation for every syntactic node of type sCat in sParent that
* doesn't have a  corresponding prosodic node in pTree, where "corresponding"
* is defined as: dominates all and only the same terminals, and has the
* corresponding prosodic category.
* By default, assumes no null syntactic terminals.
* options = {requireLexical: true/false, requireOvertHead: true/false}
* For non-lexical XPs to be ignored, they should be given an attribute func: true.
* For silently-headed XPs to be ignored, they should be given an attribute silentHead: true
*/
{
	options = options || {};
	markMinMax(sParent);

	if(sParent.cat === sCat)
		logreport.debug("\tSeeking match for "+sParent.id + " in tree rooted in "+pTree.id);
	var vcount = 0;

	/*sParent needs to be matched only if it fulfills the following conditions:
	*  - it has the right category
	*  - either it is lexical (sParent.func is false) OR requireLexical is false
	*  - either it has an overt head (sParent.silent is false) OR requireOvertHead is false
	*/
	if(sParent.cat === sCat
	&& !(options.requireLexical && sParent.func)
	&& !(options.requireOvertHead && sParent.silentHead)
	&& !(options.maxSyntax && !sParent.isMax)
	&& !(options.minSyntax && !isMinimal(sParent))
	&& !(options.nonMaxSyntax && sParent.isMax)
	&& !(options.nonMinSyntax && isMinimal(sParent)))
	{
		if(!hasMatch(sParent, pTree, options)){
			vcount++;
			logreport.debug("\tVIOLATION: "+sParent.id+" has no match!");
		}
	}

	if(sParent.children){
		for(var i = 0; i < sParent.children.length; i++)
		{
			var sChild = sParent.children[i];
			vcount += matchSP(sChild, pTree, sCat, options);
		}
	}

	return vcount;
}

function hasMatch(sNode, pTree, options)
//For a syntactic node sNode and a prosodic tree pTree, search the entire pTree
//to see if there is a node in pTree that has the same set of terminals as sNode,
//in the same order as sLeaves.
//Returns true for terminals assuming that there are no null syntactic terminals...
//Relies on sameIds for leaf comparisons and catMatches for category comparisons.

//options {maxProsody, minProsody, nonMaxProsody, nonMinProsody}
{

	var sLeaves = getLeaves(sNode);
	markMinMax(pTree);
	if(catsMatch(sNode.cat, pTree.cat)
	&& sameIds(getLeaves(pTree), sLeaves)
	&& !(options.requireLexical && pTree.func)
	&& !(options.requireOvertHead && pTree.silentHead)
	&& !(options.maxProsody && !pTree.isMax)
	&& !(options.minProsody && !isMinimal(pTree))
	&& !(options.nonMaxProsody && pTree.isMax)
	&& !(options.nonMinProsody && isMinimal(pTree)))
	{
		logreport.debug("\tMatch found: "+pTree.id);
		return true;
	}

	// If the current prosodic node is NOT the match:
	else if(!pTree.children || pTree.children.length===0)
	// current node is terminal
	{
		return false;
	}

	else
	//the current prosodic node is non-terminal (has children)
	{
		for(var i = 0; i < pTree.children.length; i++)
		//check each child to see if the match exists in the subtree rooted in that child
		{
			var child = pTree.children[i];
			if(hasMatch(sNode, child, options))
				return true;
		}
		return false;
	}
}


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

//helper function, similar to hasMatch, different in that it ensures that ptree is minimal
function hasMinMatch(sNode, pTree) {
  var leaves = getLeaves(sNode);
  if(catsMatch(sNode.cat, pTree.cat) && sameIds(getLeaves(pTree), leaves) && isMinimal(pTree)) {
    return true;
  } else if(!pTree.children || pTree.children.length === 0) {
    return false;
  } else {
    for(var i = 0; i < pTree.children.length; i++) {
      var child = pTree.children[i];
      if(hasMinMatch(sNode, child)) {
        return true;
      }
    }
  }
  return false;
}

/*Various flavors of Match to be called more easily by makeTableau*/

function matchSP_LexicalHead(stree, ptree, cat){
	return matchSP(stree, ptree, cat, {requireLexical:true});
}

function matchSP_OvertHead(stree, ptree, cat){
	return matchSP(stree, ptree, cat, {requireOvertHead:true});
}

function matchSP_OvertLexicalHead(stree, ptree, cat){
	return matchSP(stree, ptree, cat, {requireOvertHead: true, requireLexical:true});
}

// Match Max constraints:

/* Same as hasMatch function above, except this only returns true if the
 * matching prosodic node is maximal:
 */


/* Match-SP(scat-max, pcat-max): Assign a violation for every node of syntactic
 * category s that is not dominated by another node of category s in the
 * syntactic tree, and is not mapped to a corresponding prosodic node of
 * category p, where p=catMap(s), such that p is not dominated by another node
 * of category p.
 * ex. Match a maximal xp with a maximal phi.
 */

function matchMaxSP(sTree, pTree, sCat, options){
	options = options || {};
	 var vcount = 0;
	 markMinMax(sTree); //mark maximal nodes in tree
	 if (sTree.children && sTree.children.length){
		 for (var i = 0; i < sTree.children.length; i ++){
			 vcount += matchMaxSP(sTree.children[i], pTree, sCat); //recursive function call
		 }
	 }
	 if (sTree.cat === sCat && !(options.requireLexical && sTree.func)
		 && !(options.requireOvertHead && sTree.silent)
		 && sTree.isMax && !hasMaxMatch(sTree, pTree)){
		 //add violation if this node has no maximal match, is maximal and of the right cat
		 // and satisfies any additional conditions imposed by options
		 vcount ++;
	 }
	 return vcount;
 }

/* Match-SP(scat-max, pcat). Same as matchMaxSP, except matching prosodic node
 * need not be maximal, only the syntactic node must be maximal to incur a
 * violation if no match is found.
 * ex. Match a maximal xp with any phi.
 */
function matchMaxSyntax(sTree, pTree, sCat){
	 var vcount = 0;
	 markMinMax(sTree); //mark maximal nodes in tree
	 if (sTree.children && sTree.children.length){
		 for (var i = 0; i < sTree.children.length; i ++){
			 vcount += matchMaxSyntax(sTree.children[i], pTree, sCat); //recursive function call
		 }
	 }
	 if (sTree.cat === sCat && !(options.requireLexical && sTree.func)
		 && !(options.requireOvertHead && sTree.silent)
		 && sTree.isMax && !hasMatch(sTree, pTree)){
		 //add violation if this node has no match, is maximal and of the right cat
		 // and satisfies any additional requirements imposed by options.
		 vcount ++;
	 }
	 return vcount;
 }

//Match Maximal P --> S
//Switch inputs for PS matching:
function matchMaxPS(sTree, pTree, pCat, options){
	return matchMaxSP(pTree, sTree, pCat, options);
}

//Match P --> S version of matchMaxSyntax. See comment there for explanation
function matchMaxProsody(sTree, pTree, pCat, options){
	return matchMaxSyntax(pTree, sTree, pCat, options);
}

//Match Min constraints

/* Match-SP(scat-min, pcat-min): Assign a violation for every node of syntactic
 * category s that does not dominate another node of category s in the
 * syntactic tree, and is not mapped to a corresponding prosodic node of
 * category p, where p=catMap(s), such that p does not dominate another node
 * of category p.
 * ex. Match a minimal xp with a minimal phi.
 */

//match a syntactic tree with a prosodic tree
function MatchMinSP(s, ptree, cat) {
  var vcount = 0;
  //if s has children
  if(s.children && s.children.length) {
    //if stree cat is the same as input cat & stree is minimal & does not have a match on the ptree
    if(s.cat === cat && isMinimal(s)===true && hasMinMatch(s, ptree)===false) {
      vcount++;
    }
    //check every node in s, check for matching Minimals
    for(var i = 0; i < s.children.length; i++) {
      vcount += MatchMinSP(s.children[i], ptree, cat);
    }
  }
  return vcount;
}

//match prosody tree with a syntax tree
function MatchMinPS(s, ptree, cat) {
  var vcount = MatchMinSP(ptree, s, cat);
  return vcount;
}
