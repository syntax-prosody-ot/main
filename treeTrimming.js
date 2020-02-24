/* copyTree function gives you a new tree so you can have two copies of a tree
 * that do not reference eachother in memory, getting around pass by reference
 */
function copyTree(oldTree){
	var newTree = {}; //copy of old tree with values passed, not references
	for(var i in oldTree){
		if(i !== "children"){
			//copy all of the attributes and values that aren't "children"
			newTree[i] = oldTree[i];
		}
	}
	//now deal with children
	if(oldTree.children && oldTree.children.length){
		newTree.children = [];
		for(var i = 0; i < oldTree.children.length; i++){
			newTree.children.push(copyTree(oldTree.children[i])); //recursive function call
		}
	}
	return newTree;
}


/* function to remove silent heads from a tree. Takes a (syntactic) tree as
 * the input. This is recursive, like everything else that parses trees in SPOT
 */
function trimSilentTerminals(inputTree){
	var treeCopy = copyTree(inputTree); //getting around pass by reference
	function trimSilentInner(tree){ //inner recursive function so we don't copy the tree n times
		if(tree.children && tree.children.length){
			//iterate over tree's children
			for(var i = 0; i < tree.children.length; i++){
				var child = tree.children[i];
				if(child.silent && !(child.children && child.children.length)){
					tree.children.splice(i, 1); //remove child if it is silent and terminal
					if(tree.children.length === 0){
						tree.children = false; //children shouldn't really be an array any more
					}
				}
				else if(child.children && child.children.length){
					child = trimSilentInner(child); //recursive function call
				}
			}
		}
		return tree;
	}
	return trimSilentInner(treeCopy);
}

//function to trim non-x0 terminals
function trimDeadEndNodes(node){
	if(node.children && node.children.length){
		var i = 0; //indexing variable
		while(i<node.children.length){ //iterate over children
			var child = node.children[i];
			//if child is a syntactic terminal that is not an x0, get rid of it
			if(!(child.children && child.children.length) && (child.cat != "x0")){
				node.children.splice(i, 1); //remove child from children array of node
				if(node.children.length === 0){/*if node doesn't have any children,
					node.children shouldn't really be an array anymore */
					node.children === false;
				}
			}
			else {
				trimDeadEndNodes(child); //recursive function call
			 	i++; //iterate indexing variable, we only want to do this if node.children didn't change
			}
		}
	}
	return node;
}

/* function to remove redundant nodes. A node is redundant iff it dominates all
 * and only the set of terminals that are dominated by one of its children of
 * the same category, eg. [[arbitrary terminals]]
 */
function trimRedundantNodes(inputTree){
	/*call the other two tree trimming functions first, because they might create
	redundant nodes. trimSilentTerminals() might create dead-end terminals,
	so call that inside of trim deadEndTerminals(). trimSilentTerminals()
	creates a copy of the tree*/
	var tree = trimDeadEndNodes(trimSilentTerminals(inputTree));
	function trimInner(node){
		if(node.children && node.children.length){
			for(var i = 0; i<node.children.length; i++){
				var child = node.children[i];
				if(child.children && child.children.length){
					if(sameIds(getLeaves(node), getLeaves(child)) && child.cat === node.cat){
						//node is redundant, get rid of it\
						node = trimInner(child); //recursive function call

					}
					else {
						node.children[i] = trimInner(node.children[i]); //recursive function call
					}
				}
			}
		}
		return node;
	}
	return trimInner(tree);
}