
/*
Returns true if node does not dominate any other nodes of its category
Assumes all nodes have valid and relevant categories
(i.e., this is designed for prosodic trees and won't give the desired results
if run on a syntactic tree that contains, e.g., bar levels).
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
Returns true even if parent.cat is of a higher level than child.cat
(i.e, assumes layering)
To be revised!!!
For the long run, Ozan suggests pre-processing trees to mark every node as minimal/maximal.
*/
function isMaximal(parent, child){
	if(parent.cat===child.cat)
		return false;
	else return true;
}

// Move this to the prosodic hierarchy file probably?
var sCat = ["cp", "xp", "x0"];

/* Function that takes a tree and labels all the nodes in the tree as being
 * a minimal or maximal instance of whatever category k they are, where:
 * minimal = does not dominate any nodes of category k
 * maximal = is not dominated by any nodes of category k
 * and layering is assumed (a node of category level k will never be dominated
 * by a node of category < k).
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
 * 7/29/19 refactor of an earlier version
 */

function markMinMax(mytree){
	/* If parentCat property is not already defined for this node, it is probably
	 * the root node. Non-root nodes get the property parentCat when this node's
	 * children are marked below.
	 */
	if (!mytree.hasOwnProperty('parentCat')){
		mytree.parentCat = "is root"; //marks the root node
	}

	//mark maximal nodes
	mytree.isMax = (mytree.cat !== mytree.parentCat);

	//mark minimality (relies on isMinimal above)
	mytree.isMin = isMinimal(mytree);

	if(mytree.children && mytree.children.length){
		for(var i = 0; i < mytree.children.length; i++){
			var child = mytree.children[i];
			child.parentCat = mytree.cat; // set the property parentCat
			mytree.children[i] = markMinMax(mytree.children[i]);
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
	side = side || 'right'
	if(typeof side !== 'string' || side !== 'right' || side !== 'left'){
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
