/* Binarity that cares about the number of branches */

//sensitive to the category of the parent only (2 branches of any type is acceptable)
function binMinBranches(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length===1){
			logreport("VIOLATION: "+ptree.id+" has only one child");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMinBranches(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//sensitive to the category of the parent only (2 branches of any type is acceptable)
//categorical evaluation: 1 violation for every super-binary branching node
function binMaxBranches(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length>2){
			logreport("VIOLATION: "+ptree.id+" has "+ptree.children.length+" children!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBranches(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//sensitive to the category of the parent only (2 branches of any type is acceptable)
//gradient evaluation: assigns 1 violation for every child past the first 2 ("third-born" or later)
function binMaxBranchesGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		var numChildren = ptree.children.length;
		if(ptree.cat === cat && numChildren>2){
			var excessChildren = numChildren - 2;
			logreport(excessChildren+ " VIOLATION(s): "+ptree.id+" has "+numChildren+" children!");
			vcount += excessChildren;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBranches(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

/* Binarity constraints that care about the number of leaves 
Note: relies on getLeaves. 
In the future we might want to have structure below the level of the (terminal) word, e.g., feet
and in that case would need a type-sensitive implementation of getLeaves
*/

function binMinLeaves(s, ptree, cat){
	parentcat = cat[0];
	childcat2 = cat[1];
}


function binMaxLeaves(s, ptree, cat){

}
/********************
* Some implementations of EqualSisters (Myrberg 2013)
* Myrberg introduces this constraint but doesn't actually define 
* how to count violations if there are more than 2 sisters.
* TODO does the degree of prosodic inequality make a difference to the severity of the violation?
*********************/

/* EqualSisters: looks at the category of the first sister, and assigns a violation 
* for every one of its sisters that doesn't share its category
* A definition probably no one wants but which is not ruled out by the "definitions" that appear in papers
* Markedness only -- just looks at prosody
* s and c are just there to fill out the argument structure for tableau-izing purposes.
*/
function equalSistersFirstPrivilege(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		var cat1 = parent.children[0].cat;
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(child.cat != cat1)
			{
				logreport.debug("\tVIOLATION: "+child.id+" and "+parent.children[0].id+" are unequal.");
				vCount++;
			}
			vCount += equalSistersFirstPrivilege(s, child, c);
		}
	}
	return vCount;
}

/*EqualSisters: assigns a violation for every (unordered) pair of sisters whose categories don't match
* Probably no one wants this version, either. Predicts "majority rules" effects.
* Markedness only -- just looks at prosody
* s and c are just there to fill out the argument structure for tableau-izing purposes.
*/

function equalSistersPairwise(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		var sisters = parent.children;
		for(var i=0; i < sisters.length; i++){
			var child = sisters[i];
			for(var j=i; j < sisters.length; j++){
				var sister = sisters[j];
				if(child.cat != sister.cat)
				{
					logreport.debug("\tVIOLATION: "+child.id+" and "+sister.id+" are unequal.");
					vCount++;
				}
			}
			vCount += equalSistersPairwise(s, child, c);
		}
	}
	return vCount;
}

//EqualSisters: assigns a violation for every pair of adjacent sister nodes that are not of the same prosodic category
//This is probably the version that actually makes sense.
//Markedness only -- just looks at prosody
//s and c are just there to fill out the argument structure for tableau-izing purposes.
function equalSistersAdj(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		logreport.debug("\tchecking equality of children of "+parent.id);
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(i<parent.children.length-1)
			{
				var sister = parent.children[i+1];
				if(child.cat != sister.cat)
				{
					logreport.debug("\tVIOLATION: "+child.id+" and "+sister.id+" are unequal.");
					vCount++;
				}
			}
			vCount += equalSistersAdj(s, child, c);
		}
	}
	return vCount;
}

/***********************
MATCH THEORY constraints
and their numerous helpers
************************/

function getLeaves(x)
//return a list of all the terminals dominated by a node
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
//helper function to compare two arrays (notably for comparing the children arrays)
//since there isn't a built_in array comparator.
{
	if(a1.length != a2.length)
		return false;
	
	var i = 0;
	while(i<a1.length){
		if(a1[i].id != a2[i].id)
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
/****************
* Function that implements Nonrecursivity, version 1:
* "Assign a violation for every node of category x dominated 
* by another node of category x"
******************/

function nonRec1(parent, type){
//Assumes trees that obey Layering.
	
	//Base case: if parent is a terminal, return 0 violations.
	if (!parent.children){
		return 0;
	}
	
	//Recursive case: if parent is non_terminal, find out how many violations are in each of the subtrees rooted in its children
	var vcount = 0;
	var child;
	
	for (var i=0; i < parent.children.length; i++){
		child = parent.children[i];
		if (parent.type===type && child.type===type){
			vcount++;
		}		
		vcount+=nonRec1(child, type);
	}
	return vcount;
}
//Ozan's code
function walkTree(node, foo) {
	if (foo(node) === false)
		return;
	if (node.children instanceof Array)
		for (var i = 0; i < node.children.length; i++)
			walkTree(node.children[i], foo);
}

function getLeaves2(root) {
	var leaves = [];
	walkTree(root, function(node) {
		if (!(node.children instanceof Array))
			leaves.push(node);
	});
	return leaves;
}

// matchSP2 and hasMatch2 are equivalents of older versions of matchSP and hasMatch (without category sensitivity)
function matchSP2(sParent, pTree) {
	var vcount = 0;
	walkTree(sParent, function(node) {
		if (!hasMatch2(getLeaves(node), pTree))
			vcount++;
	});
	return vcount;
}

function hasMatch2(sLeaves, pTree) {
	var result = false;
	walkTree(pTree, function(node) {
		if (sameIds(getLeaves(node), sLeaves)) {
			result = true;
			return false; // don't continue tree-traversal
		}
	});
	return result;
}
