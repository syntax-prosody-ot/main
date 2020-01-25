/* function to remove silent heads from a tree. Takes a (syntactic) tree as
 * the input. This is recursive, like everything else that parses trees in SPOT
 */
function trimSilentTerminals(inputTree){
	var tree = inputTree; //getting around pass by reference
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
				child = trimSilentTerminals(child); //recursive function call
			}
		}
	}
	return tree;
}

/* function to remove redundant nodes. A node is redundant iff it dominates all
 * and only the set of terminals that are dominated by one of its children of
 * the same category, eg. [[arbitrary terminals]]
 */
function trimRedundantNodes(inputTree){
	var tree = trimSilentTerminals(inputTree);
	function trimInner(node){ //inner recursive function
		if(node.children && node.children.length){
			var i = 0; //indexing variable
			while(i<node.children.length){ //iterate over children
				var child = node.children[i];
				//if child is a syntactic terminal that is not an x0, get rid of it
				if(!(child.children && child.children.length) && (child.cat === "cp" || child.cat === "xp")){
					node.children.splice(i, 1); //remove child from children array of node
					if(node.children.length === 0){
						//if node doesn't have any children, node.children shouldn't really be an array anymore
						node.children === false;
					}
				}
				else{
					i++; //iterate indexing variable, we only want to do this if node.children didn't change
				 	if(child.children && child.children.length){
						child = trimInner(child); //recursive function call
						if(sameIds(getLeaves(node), getLeaves(child)) && child.cat === node.cat){
							//node is redundant, get rid of it
							node = child;
						}
					}
				}
			}
		}
		return node;
	}
	return trimInner(tree);
}
