/* Assign a violation for every node in sTree of category sCat
whose d edge is not aligned with the d edge of a node in pTree 
of the prosodic category corresponding to s

For every sCat node s in sTree, find a node p in pTree of the proper category
such that the first (for align-left) leaf dominated by s has the same id as
the first leaf dominated by p.

TODO Do we ever want to try to align x0 levels?? Or would we ever have an xp as a leaf?
TODO test this function.
*/
function alignLeft(sTree, pTree, sCat){
	return alignSP(sTree, pTree, sCat, 'left');
}

function alignRight(sTree, pTree, sCat){
	return alignSP(sTree, pTree, sCat, 'right');
}

function alignSP(sTree, pTree, sCat, d){
	var getEdge = (d==="left") ? getLeftEdge : getRightEdge;
	var vCount = 0;
	walkTree(sTree, function(sNode){
		if(sNode.cat !== sCat)	 // only go further if sNode has the category we're interested in
			return;
		var sEdge = getEdge(sNode);
		if(!sEdge)
			sEdge = sNode;	// If sNode is a leaf (which it probably shouldn't be but depending on the tree might be),
								// then look for a p-node that matches sNode itself. TODO is this a good idea?
		var noMatch = true;
		walkTree(pTree, function(pNode){
			if(!catsMatch(sCat, pNode.cat))
				return;
			var pEdge = getEdge(pNode);
			if(!pEdge) 
				pEdge = pNode;	//I'm assuming the leaves are words...
			if(sEdge.id === pEdge.id){
				noMatch = false;
				return false;
			}
		});
		if(noMatch)
			vCount++;
	});
	return vCount;
}

function getLeftEdge(node){
	return getLeaves(node)[0];
}

function getRightEdge(node){
	var leaves = getLeaves(node);
	return leaves[leaves.length-1];
}

function wrap(sTree, pTree, cat){
	var vCount = 0;
	walkTree(sTree, function(sNode){
		if(sNode.cat !== cat)
			return;
		var noMatch = true;
		sLeaves = getLeaves(sNode);
		walkTree(pTree, function(pNode){
			if(!catsMatch(cat, pNode.cat))
				return;
			if(containsIds(getLeaves(pNode), sLeaves)){	// if the current pNode wraps our sNode
				noMatch = false;
				return false;	 // stop looking for a match
			}
		});
		if(noMatch)
			vCount++;
	});
	return vCount;
}

// Returns true if a contains b
// More precisely, if a contains a set of nodes whose ids are identical to the ids of the nodes in b.
function containsIds(a, b){
	for(var i=0; i<=(a.length-b.length); i++){
		var j=0;
		while((j<b.length)&&(a[i+j].id === b[j].id))
			j++;
		if(j===b.length)
			return true;
	}
	return false;
}





/* Binarity that cares about the number of branches */

//sensitive to the category of the parent only (2 branches of any type is acceptable)
function binMinBranches(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length===1){
			//logreport("VIOLATION: "+ptree.id+" has only one child");
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
			//logreport("VIOLATION: "+ptree.id+" has "+ptree.children.length+" children!");
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
			//logreport(excessChildren+ " VIOLATION(s): "+ptree.id+" has "+numChildren+" children!");
			vcount += excessChildren;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBranches(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

/*TRUCKENBRODT-STYLE BINARITY*/

//Parent-category-neutral version of:
//Sandalo & Truckenbrodt 2002: "Max-Bin: P-phrases consist of maximally two prosodic words"
//Assigns a violation for every node in ptree that dominates more than two prosodic words.
function binMax2Words(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length>2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMax2Words(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//Gradient version of Truckenbrodt's Maximum Binarity
function binMax2WordsGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length>2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount += (wDesc.length - 2);
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMax2WordsGradient(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//Helper function: given a node x, returns all the descendents of x that have category cat.
//Since this function is designed for use on prosodic trees, it does not take silence into account.
function getDescendentsOfCat(x, cat){
	var descendents = [];
	//logreport("x.cat is "+x.cat+ ", cat is " +cat);
	if(x.children && x.children.length)
	//x is non-terminal
	{
		for(var y=0; y < x.children.length; y++){
			var yDescendents = getDescendentsOfCat(x.children[y], cat);
			for(var i=0; i < yDescendents.length; i++){
				descendents.push(yDescendents[i]);
			}
		}
	}
	else if(x.cat === cat)	// x is a terminal of the right category
	{
		descendents.push(x);
	}
	return descendents;
}

function binMin2Words(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length<2){
			//logreport("VIOLATION: "+ptree.id+" only dominates "+wDesc.length+" words!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMin2Words(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

function binMin2WordsGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length<2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount += (2-wDesc.length);
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMin2WordsGradient(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

/* Binarity constraints that care about the number of leaves 
Note: relies on getLeaves. 
In the future we might want to have structure below the level of the (terminal) word, e.g., feet
and in that case would need a type-sensitive implementation of getLeaves
*/

//INCOMPLETE
function binMinLeaves(s, ptree, cat){
	parentcat = cat[0];
	childcat2 = cat[1];
}

//INCOMPLETE
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

/****************
* Function that implements Exhaustivity, version 1:
* "Assign a violation for every parent-child pair (x,y) such that x is of PH-level n and y is of PH-level n-m, m >= 2."
* Assigns violations based on distance between categories on PH, but otherwise category-insensitive.
* "Vertically categorical"; greater distance between parent and child on PH does not result in higher vcount.
******************/

function exhaust1(s, ptree){
//Assumes trees that obey Layering.
	
	//Base case: if parent is a terminal, return 0 violations.
	if (!ptree.children){
		return 0;
	}
	
	//Recursive case: if parent is non_terminal, find out how many violations are in each of the subtrees rooted in its children.

	if(ptree.children && ptree.children.length){
		var vcount = 0;
		var child;
		for (var i=0; i < ptree.children.length; i++){
			child = ptree.children[i];
			if (ptree.cat!==child.cat && pCat.nextLower(ptree.cat)!==child.cat){
				vcount++;
			}
			vcount += exhaust1(s, child);
		}
		return vcount;
	}
};
/*
Defined in Ito & Mester (2013) as: "Every accented word must be the head of a (minimal) phi
Assign a violation for each accented prosodic word that is not the head of a minimal phi."

Operationalized as:
For each phi, look at all children. If at least one child is a phi, then the current node is a non-minimal phi, 
so assign a violation for every A (= w [+accent]) in the array of children. 
If no child is a phi, let aCount = the number of A in the children array, and assign (aCount-1) violations."

Notes:
- Assumes accent as a separate attribute of a word. TODO fix Gen do add this; currently testing by assuming accent is specified in word id. ex. a_1, a_2, u_3
- As currently implemented, assumes no recursive phonological words.
*/


function accentAsHead(s, p, c){
	var vCount = 0;
	var child;
	
	//Base case: p is a leaf.
	if(!p.children || !p.children.length)
		return vCount;
	
	//Recursive case: p is a non-leaf.
	
	//Count all the accented words that are immediate daughters of current node p.
	// Store value in aCount.
	var aCount = 0;
	
	for(var i=0; i < p.children.length; i++){
		child = p.children[i];
		console.log("child.id is:"+child.id);
		if(child.cat==="w" && !child.accent){
			child.accent = child.id.split('_')[0]	//If accent isn't defined, try to get it from the node's id.
			console.log("child.id ("+child.id+") is assigned accent "+child.accent);
		}
		
		//if an accented word is discovered...
		if(child.accent==="a" && child.cat==="w"){
			aCount++;
			console.log("child.id ("+child.id+") is an accented word. aCount = "+aCount);
		}
		
		vCount += accentAsHead(s,child,c);
	}
		
	// Case 1: p is a minimal phi. Assign a violation for every accented word except the first
	// by incrementing the violation count by one less than the total number of accented words (or 0 if there are none).
	if((p.cat==="phi") && isMinimal(p) && aCount>0){
		vCount += (aCount-1);
	}
	
	// Case 2: p is not a minimal phi (i.e. it's an iota, non-minimal phi, or w)
	// 			-> Assign a violation for every accented word. 
	else{
		vCount += aCount;
	}
	
	console.log("For node "+p.id+", vCount is: "+vCount);
	return vCount;
}

/*
Defined in Ito&Mester(2013) as: "No accentual lapse. Assign a violation for every fully L-toned w."

Operationalized as: 
"For every U (= w[-accent]), assign a violation if U is non-initial (i.e. index of U in the children array > 0) and preceded by A in phi (i.e. there is an A in the children array with index greater than indexOf(U))."

TODO find out if there is an accent for the beginning of iota -- i.e. should the initial U *not* receive a violation as well...???

ANSWER: Assuming words can be immediately dominated by intonational phrases (i.e. violable Exhaustivity):

	iota( U ... ) : If the U receives a high tone by virtue of being at the left edge of the iota, 
	then it shouldn't receive a violation. (Otherwise, it should.) =====> Seems correct. [*Which* does????]

	iota( phi(U) U ) : What about a U immediately dominated by iota that is preceded by 
	a U that receives a high tone by virtue of being first in a phi?
	======> There would be no fall, hence no violation of NoLapse-L.

	iota( phi(A) U ) : We assume the U here does receive a violation (i.e. is all L's) since the A contributes a fall.
	======> Yes, that sounds right.

	For each phi, assign a violation for every U that is a) non-initial b) preceded an A (within the maximal phi).

*/
function noLapseL(s, p, c){
	
	var vCount = 0;
	var wordToneList = assignAccents(p);
	var word = wordToneList.head;	//TODO determine if is this the best way to refer to things?
	
	while(word != null){
		if(word.tone === 'L')
			vCount++;
		word = word.next;
	}	
		
	return vCount;
}

/* Helper function for noLapseL: take a prosodic tree with words marked as U or A
	and determine for each word what tone(s) it receives
	where tones are contributed by:
		1. accent: a -> HL
		2. [ (left phi boundary) -> H
	and an unaccented word (accent: u) receives its accent from whatever is immediately to its left.
	
	Procedure:
	- convert the tree to a linked list consisting of: all the word nodes and all the left phi and iota boundaries.
	- assign tones to all the words in the list according to the principles above.
	- remove non-words (the boundaries) from the list
	- return the list which maps words to tones.
		
*/
function assignAccents(p){
	
}
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
/****************
* Function that implements Nonrecursivity, version 1:
* "Assign a violation for every node of category x immediately dominated 
* by another node of category x"
******************/

function nonRec1(s, parent, cat){
	
	//Base case: if parent is a terminal, return 0 violations.
	if (!parent.children){
		return 0;
	}
	
	//Recursive case: if parent is non-terminal, find out how many violations are in each of the subtrees rooted in its children
	var vcount = 0;
	var child;
	
	for (var i=0; i < parent.children.length; i++){
		child = parent.children[i];
		if (parent.cat===cat && child.cat===cat){
			vcount++;
		}		
		vcount+=nonRec1(s, child, cat);
	}
	return vcount;
}


/* Non-recursivity, Truckenbrodt style:
*  "Any two p-phrases that are not disjoint in extension are identical in extension."
*  For every node x of category p dominated by another node y of category p, 
*  assign a violation for every leaf dominated by y that is not also dominated by x.
*/
function nonRecTruckenbrodt(s, parent, cat){
	//console.log("looking for nonRecTruckenbrodt violations in prosodic tree "+parent.id);
	if(!parent.children||(parent.children.length===0)){
		return 0;
	}
	
	var vcount=0;
	var child;
	
	for(var i=0; i<parent.children.length; i++){
		child = parent.children[i];
		if(parent.cat===cat && child.cat===cat){
			vcount+=leafDifferenceSize(getLeaves(child), getLeaves(parent));
		}
		vcount+=nonRecTruckenbrodt(s, child, cat);
	}
	return vcount;
}

/*Given arrays x, y, where the elements in x are a subset of the elements in y,
* and the elements in x and y are in the same order, returns the number of elements
* in y that are not also in x.
* TODO Modify this so that it doesn't make all the assumptions above concerning the relationship of x and y.
*/
function leafDifferenceSize(x,y){
	if(!(x instanceof Array) || !(y instanceof Array)){
		console.log("x: "+x);
		console.log("y: "+y);
		throw new Error("Either x or y is not an array");
	}
	return y.length-x.length;
}
	

/*
Returns true if node does not dominate any other nodes of its category
*/
function isMinimal(node){
	var cat = node.cat;
	var isMin = true;
	//If the node is a leaf, it's minimal.
	if(!node.children || !node.children.length)
		return isMin;
	//Otherwise, we have to look at its children to determine whether it's minimal.
	var i = 0;
	var chil = node.children;
	while(isMin && i<chil.length){
		if(chil[i].cat===cat)
			isMin = false;
		i++;
	}
	return isMin;
}

/*
Returns true if parent.cat is of a higher level than child.cat
To be revised!!!
For the long run, Ozan suggests pre-processing trees to mark every node as minimal/maximal.
*/
function isMaximal(parent, child){
	if(parent.cat===child.cat)
		return false;
	else return true;
}
/* Assign a violation for every node whose leftmost daughter constituent is of type k
*  and is lower in the prosodic hierarchy than its sister constituent immediately to its right: *(Kn Kn-1)
*  Elfner's StrongStart.
*/

function strongStart_Elfner(s, ptree, k){

	//base case: ptree is a leaf or only has one child
	if((!ptree.children) || (ptree.children.length<2)){
		return 0;
	}

	//recursive case: ptree dominates at least two nodes
	var vcount = 0;
	var leftmostCat = ptree.children[0].cat;
	var sisterCat = ptree.children[1].cat;

	if((leftmostCat === k) && (pCat.isLower(leftmostCat, sisterCat)))
		vcount++;
	
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongStart_Elfner(s, child, k);
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
