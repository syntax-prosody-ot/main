
/*
Returns true if node does not dominate any other nodes of its category
Assumes all nodes have valid and relevant categories
(i.e., this is designed for prosodic trees and won't give the desired results
if run on a syntactic tree that contains, e.g., bar levels).
*/
function isMinimal(node, lastCat){
	//If a node and one of its children have the same category then the node is not minimal.
	//The "lastCat" argument is only included in the function-internal call of isMinimal.  If one of 
	//the children of the node-in-question is a "dummy" node, then it should be skipped and its children checked instead.
	//isMinimal is called on the dummy node to check its children against "lastCat", the category of the node-in-question.

	if(lastCat){
		var cat = lastCat;
	} else {
		var cat = node.cat;
	}
	
	var isMin = true;

	//If the node is a leaf, it's minimal.
	if(!node.children || !node.children.length)
		return isMin;
	//Otherwise, we have to look at its children to determine whether it's minimal.
	var i = 0;
	var chil = node.children;
	while(isMin && i<chil.length){
		//if a child is a dummy, we will have to skip over that dummy to see if any of its children have the same category.
		if(chil[i].cat == "dummy"){
			isMin = isMinimal(chil[i], cat)
		} else if(chil[i].cat===cat){
			isMin = false;
		}
		i++;
	}
	return isMin;
}


/* Function that takes a tree and labels all the nodes in the tree as being
 * a minimal or maximal instance of whatever category k they are, where:
 * minimal = does not dominate any nodes of category k
 * maximal = is not dominated by any nodes of category k
 * and layering is assumed (a node of category level k will never be dominated
 * by a node of category < k).
 *
 * There are two boolean options: 
 * - options.requireLexical
 * - options.requireOvertHead
 *
 * In the case that markMinMax is called with the option "requireLexical" or
 * "requireOvertHead", nodes with the attribute "func" or "silentHead" are given
 * a new category "dummy". These nodes are ignored when checking for maximality or
 * minimality, only their children and parents are significant to the check.
 * 
 * Ex: given the syntax: [FuncP X [LexP1 Y [LexP2 Z ]]]
 * When options.requireLexical===true, LexP1 will be labeled maximal 
 * because it is the highest lexical phrase (i.e., it is the highest 
 * XP within the set of lexical XPs that are visible to MatchXP-Lex)
 *
 * When checking for minimality, a node's category is checked against its children's.
 * If all children have a different category from the node's, then it is minimal.
 * If a child has the "dummy" category, then that dummy's children are checked as well.
 *
 * When checking for maximality, a node's category is checked against its parent's.
 * If the node and its parent have different categories then it is maximal. The
 * category of each node's parent is inherited as an attribute node.parentCat.
 * If a child has the "dummy" category, then that dummy will be given the attribute
 * node.lastCat in order to store the value of the parent. Every child of a dummy will
 * inherit node.lastCat as its node.parentCat instead of "dummy".
 *
 * This can be called in a recursive function and is compatable with GEN's
 * re-use of certain prosodic subtrees, but when testing something that relies
 * on this function and GEN, it is best to use one tree at a time since JS is a
 * pass by reference language and subtrees will show the markings assigned from
 * the most recent call of markMinMax, which are not always the correct markings
 * for the current tree. As long as markMinMax is called on a subtree or its
 * ancestors before its maximality or minimality is used, your function will be
 * working with the correct values of isMin, isMax and parentCat.
 *
 * 10/26/20 update of an earlier version, now includes dummies.
 */

function markMinMax(mytree, options){
	options = options || {};
	if(options.requireLexical){
		mytree = createDummies(mytree, 'func');
	}
	if(options.requireOvertHead){
		mytree = createDummies(mytree, 'silent');
	}
	return markMinMaxInner(mytree, options)
}

function markMinMaxInner(mytree, options){
	/* If parentCat property is not already defined for this node, it is probably
	 * the root node. Non-root nodes get the property parentCat when this node's
	 * children are marked below.
	 */
	options = options || {};

	if (!mytree.hasOwnProperty('parentCat')){
		mytree.parentCat = "is root"; //marks the root node
	}

	//Store the info of the most recent cat in order to skip over dummy nodes
	//except when the dummy node's parent is ALSO a dummy node, then lastcat should be passed
	//down dummy generation after dummy generation until a normal node is reached to inherit
	//it as the parentCat.
	if(mytree.cat === "dummy"){
		mytree.isMax = false;
		mytree.isMin = false;
		if(mytree.parentCat !== "dummy"){
			mytree.lastCat = mytree.parentCat;
		}
	} else {
		//mark maximality and minimality for node
		mytree.isMax = (mytree.cat !== mytree.parentCat);
		mytree.isMin = isMinimal(mytree);

		//recall stored parentCat after dummies are skipped
		if(mytree.parentCat === "dummy"){
			mytree.parentCat = mytree.lastCat;
		}
	}

	if(mytree.children && mytree.children.length){
		for(var i = 0; i < mytree.children.length; i++){
			mytree.children[i].parentCat = mytree.cat; // set the property parentCat
			mytree.children[i].lastCat = mytree.lastCat; //pass on lastCat
			mytree.children[i] = markMinMaxInner(mytree.children[i], options);
		}
	}
	return mytree;
}

function markHeadsJapanese(mytree){
	console.warn('markHeadsJapanese() has changed to markHeads()');
	return markHeads(mytree, 'right');
}

/* Function to mark heads of Japanese compound words.
 * Head of a node is the leftmost/rightmost(default) daughter of the highest category.
 * Takes two arguments:
 * 	mytree: tree to mark heads on
 * 	side: 'left' or 'right' (default)
 */
function markHeads(mytree, side){

	if(typeof side !== 'string' || !(side === 'right' || side === 'left')){
		console.warn('"side" argument of markHeads() must be "right" or "left", default to "right"');
		side = 'right';
	}
	//headCat stores the highest category in children. Defaults to lowest pCat
	var headCat = pCat[pCat.length-1];
	if(mytree.children && mytree.children.length){
		let previousChildren = [];
		if(side === 'right'){
			//mark heads and iterate through tree from RIGHT to LEFT
			for(let i = mytree.children.length-1; i >= 0; i--){
				markHeadsInner(mytree.children[i], previousChildren, side);
			}
		}
		else if(side === 'left'){
			//mark heads and iterate from LEFT to RIGHT
			for(let i = 0; i < mytree.children.length; i++){
				markHeadsInner(mytree.children[i], previousChildren, side);
			}
		}
	}
	//Indicate that this tree has been marked for heads, and on which side
	mytree.headsMarked = side;
	return mytree;

	function markHeadsInner(child, previousChildren, side){
		/* since we are iterating through children in a specified direction, if we
		 * come across the highest cat we have seen so far, it is necessarily the
		 * rightmost/leftmost of its category */
		if(pCat.isHigher(child.cat, headCat)){
			headCat = child.cat;
			child.head = true;
			//iterate over the children we have already marked:
			for(var x = 0; x < previousChildren.length; x++){
				/* when a new head is marked, all nodes previously evaluated must be
				 * marked as head = false since they are of a lower category */
				previousChildren[x].head = false;
			}
		}
		else{
			child.head = false;
		}
		previousChildren.push(child);
		child = markHeads(child, side); //recursive function call
	}
}
