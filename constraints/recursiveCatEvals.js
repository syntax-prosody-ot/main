
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

/* Function that takes a tree and the category of its root's parent node
	and labels all the nodes in the tree as being minimal or maximal
	instance of whatever category k they are, where:
	minimal = does not dominate any nodes of category k
	maximal = is not dominated by any nodes of category k
	and level ordering is assumed (a node of category level k
	will never be dominated by a node of category < k).

	When calling markMinMax in a recursive function, best call without parcat arg

	**Previous isMin or isMax labels are NOT preserved as of 7/27/19 -MT**
*/
// Move this to the prosodic hierarchy file probably?
var sCat = ["cp", "xp", "x0"];

function markMinMax(mytree, parcat){
	//on first call, mark root node
	if(parcat == void(0)){
		mytree.parentCat = 'is root';
	}

	// Check if node is being reused by GEN
	if(parcat && mytree.parentCat !== parcat){
		console.log(mytree.id + ' is being reset');
		//node is being reused and must be reset
		mytree.parentCat = parcat; //correct parentCat
		mytree.isMax = void(0); //set to undefined
		mytree.isMin = void(0); //set to undefined
	}

	// Check for maximalitys
	if(!mytree.hasOwnProperty('isMax') || mytree.isMax === void(0)){
		mytree.isMax = (mytree.cat !== parcat);
	}

	// Check for minimality
	if(!mytree.hasOwnProperty('isMin') || mytree.isMin === void(0)){
		mytree.isMin = isMinimal(mytree);
	}
/* 		// Breadth-first search of the children to see if
		// any immediate children are the same category as the current node
		var i = 0;
		while(mytree.isMin; i < mytree.children.length){
			mychild = mytree.children[i];
			if(pCat.indexOf(mychild.cat) >= 0 || sCat.indexOf(mychild.cat) >= 0){
				childcat = mychild.cat;
				if(mytree.cat == childcat){
					mytree.isMin = false;
				}
				else{
					i++;
				}

			} */

	if(mytree.children && mytree.children.length){
		parcat = mytree.cat;
		for(var i = 0; i < mytree.children.length; i++){
			mytree.children[i] = markMinMax(mytree.children[i], parcat);
		}
	}
	return mytree;
}
