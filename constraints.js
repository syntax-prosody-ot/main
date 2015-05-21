//An array of pairs to define which syntactic categories "match" which prosodic categories.
//For theory comparison, we'll want one array for each theory.
var categoryPairings = {
	"clause": "i", 
	"cp": "i",
	"xp": "phi",
	"x0": "w"
};


//Evaluates whether two nodes have corresponding categories.
function catsMatch(aCat, bCat){
	if(aCat === undefined && bCat === undefined)
		return true;	//vacuously true if both nodes are leaves (with no category)
	else if(categoryPairings.hasOwnProperty(aCat))
		return categoryPairings[aCat] === bCat;
	else if(categoryPairings.hasOwnProperty(bCat))
		return categoryPairings[bCat] === aCat;
	else
		throw new Error("Neither "+bCat +" nor "+aCat+" is a valid syntactic category");
}


//defines the prosodic hierarchy
var pCat = ["i", "phi", "w"];
pCat.isHigher = function (type1, type2){
//Function that compares two prosodic types and returns whether type1 is higher in the prosodic hierarchy than type2
	return (pCat.indexOf(type1) < pCat.indexOf(type2));
}
//pCat(type1).isHigherThan(type2)


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

/*Some implementations of EqualSisters (Myrberg 2013)
Myrberg introduces this constraint but doesn't actually define how to count violations if there are more than 2 sisters.
TODO does the degree of prosodic inequality make a difference to the severity of the violation?
*/

//EqualSisters: looks at the category of the first sister, and assigns a violation for every one of its sisters that doesn't share its category
//A definition probably no one wants but which is not ruled out by the "definitions" that appear in papers
//Markedness only -- just looks at prosody
//s and c are just there to fill out the argument structure for tableau-izing purposes.
function equalSistersFirstPrivilege(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		var cat1 = parent.children[0].cat;
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(child.cat != cat1)
				vCount++;
			vCount += equalSistersFirstPrivilege(s, child, c);
		}
	}
	return vCount;
}

//EqualSisters: assigns a violation for every (unordered) pair of sisters whose categories don't match
//Probably no one wants this version, either. Predicts "majority rules" effects.
//Markedness only -- just looks at prosody
//s and c are just there to fill out the argument structure for tableau-izing purposes.
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
					vCount++;
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
		logreport("\tchecking equality of children of "+parent.id);
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(i<parent.children.length-1)
			{
				var sister = parent.children[i+1];
				if(child.cat != sister.cat)
					vCount++;
			}
			vCount += equalSistersAdj(s, child, c);
		}
	}
	return vCount;
}



//Ozan's code
function walkTree(node, foo) {
	if (foo(node) === false)
		return;
	if (node.children instanceof Array)
		for (var i = 0; i < node.children.length; i++)
			walkTree(node.children[i], foo);
}


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
	else	// x is itself a terminal
	{
		leaves = [x];
	}
	return leaves;
}

function getLeaves2(root) {
	var leaves = [];
	walkTree(root, function(node) {
		if (!(node.children instanceof Array))
			leaves.push(node);
	});
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

/*
function sameIdsAndTypes(a1, a2)
//helper function that doesn't actually make sense >.<
{
	if(a1.length != a2.length)
		return false;
	
	var i = 0;
	while(i<a1.length){
		if(a1[i].id != a2[i].id)
			return false;
		
		if(!catMaps(a1[i], a2[i]))
			return false;		
		i++;
	}
	
	return true;
}*/

function matchPS(sTree, pParent, pCat)
//Assign a violation for every prosodic node of type pCat in pParent that doesn't have a corresponding syntactic node in sTree, 
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding syntactic category
//Assumes no null terminals.
{
	return matchSP(pParent, sTree, pCat);
/*	if(sParent.cat === sCat)
		logreport("\tSeeking match for "+sParent.id + " in tree rooted in "+pTree.id);
	var vcount = 0;
	
	if((sParent.cat === sCat) && !hasMatch(sParent, pTree)){
		vcount++;
		logreport("\tVIOLATION: "+sParent.id+" has no match!");
	} 
		
	if(sParent.children){	
		for(var i = 0; i < sParent.children.length; i++)
		{
			var sChild = sParent.children[i];
			vcount += matchSP(sChild, pTree, sCat);
		}
	}
	
	return vcount;
*/
}

//Longterm TODO: Technically, Match doesn't compare ordered sets but unordered sets, so for an implementation that wouldn't penalize prosodic scrambling we'd need to sort sParent.children and pParent.children before comparing them.
//TODO: what about null syntactic terminals?? these need to be filtered out of the syntactic input?? write this function later.

function matchSP(sParent, pTree, sCat)
//Assign a violation for every syntactic node of type sCat in sParent that doesn't have a corresponding prosodic node in pTree, 
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding prosodic category
//Assumes no null syntactic terminals.
{
	if(sParent.cat === sCat)
		logreport("\tSeeking match for "+sParent.id + " in tree rooted in "+pTree.id);
	var vcount = 0;
	
	if((sParent.cat === sCat) && !hasMatch(sParent, pTree)){
		vcount++;
		logreport("\tVIOLATION: "+sParent.id+" has no match!");
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

function matchSP2(sParent, pTree) {
	var vcount = 0;
	walkTree(sParent, function(node) {
		if (!hasMatch2(getLeaves(node), pTree))
			vcount++;
	});
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
		logreport("\tMatch found: "+pTree.id);
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
