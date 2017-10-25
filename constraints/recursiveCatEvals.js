
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
Returns true if parent.cat is of a higher level than child.cat
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
	
	Previous isMin or isMax labels are preserved.
*/
// Move this to the prosodic hierarchy file probably?
var sCat = ["cp", "xp", "x0"];

function markMinMax(mytree, parcat){
	// Check for maximality
	if(!mytree.hasOwnProperty('isMax')){
		mytree.isMax = (mytree.cat !== parcat)
	}
	
	// Check for minimality
	if(!mytree.hasOwnProperty('isMin')){
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