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
	Called by trimRedundantNodes()
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

/*  Function that removes non-lexical heads from a tree. 
	Basically identical to trimSilentTerminals
	Called by trimRedundantNodes()
 */
function trimFunctionalTerminals(inputTree){
	var treeCopy = copyTree(inputTree); //getting around pass by reference
	function trimFunctionalInner(tree){ //inner recursive function so we don't copy the tree n times
		if(tree.children && tree.children.length){
			//iterate over tree's children
			for(var i = 0; i < tree.children.length; i++){
				var child = tree.children[i];
				if(child.func && !(child.children && child.children.length)){
					tree.children.splice(i, 1); //remove child if it is functional and terminal
					if(tree.children.length === 0){
						tree.children = false; //children shouldn't really be an array any more
					}
				}
				else if(child.children && child.children.length){
					child = trimFunctionalInner(child); //recursive function call
				}
			}
		}
		return tree;
	}
	return trimFunctionalInner(treeCopy);
}

//function to trim non-x0 terminals
function trimDeadEndNodes(inputTree){
	var treeCopy = copyTree(inputTree);
	function trimDeadEndInner(node){
		if(node.children && node.children.length){
			var i = 0; //indexing variable
			while(i<node.children.length){ //iterate over children
				var child = node.children[i];
				//if child is a syntactic terminal that is not an x0, get rid of it
				if(!(child.children && child.children.length) && (child.cat != "x0" && child.cat != "clitic")){
					node.children.splice(i, 1); //remove child from children array of node
					if(node.children.length === 0){/*if node doesn't have any children,
						node.children shouldn't really be an array anymore */
						node.children = false;
					}
				}
				else {
					trimDeadEndInner(child); //recursive function call
				 	i++; //iterate indexing variable, we only want to do this if node.children didn't change
				}
			}
		}
		return node;
	}
	return trimDeadEndInner(treeCopy);
}

/* function to remove redundant nodes. A node is redundant iff it dominates all
 * and only the set of terminals that are dominated by one of its children of
 * the same category, eg. [[arbitrary terminals]]
 */
function trimRedundantNodes(inputTree, attribute){
	/*call the other two tree trimming functions first, because they might create
	redundant nodes. trimSilentTerminals() might create dead-end terminals,
	so also call trimDeadEndNodes(). trimSilentTerminals()
	creates a copy of the tree*/
	if(attribute=="silent"){
		var tree = trimSilentTerminals(inputTree);
	}else if(attribute=="func"){
		var tree = trimFunctionalTerminals(inputTree);
	}else{
		tree = inputTree;
	}
	var i = 0;

	//Must call multiple times to make sure all dead-ends are removed. If run only once, a non-x0 terminal will be removed but leave another dead end in its parent.
	var is_finished = false;
	while(!is_finished){
		is_finished = true;
		tree = trimDeadEndNodes(tree);
		leaves = getLeaves(tree);
		for(i = 0; i < leaves.length; i++){
			if(leaves[i].cat != "x0"){
				is_finished = false;
			}
		}
	};

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

/*  This function is untested and isn't called anywhere. 
	Call the other two tree trimming functions first, because they might create
	redundant nodes. trimSilentTerminals() might create dead-end terminals,
	so call that inside of trim deadEndTerminals(). trimSilentTerminals()
	creates a copy of the tree
*/
function trimAttributedNodes(inputTree, attribute){
	
	var tree = copyTree(inputTree);
	function trimInner(node){
		if(node.children && node.children.length){
			for(var i = 0; i<node.children.length; i++){
				var child = node.children[i];
				if(child.children && child.children.length){
					if(node[attribute]){
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
	if(tree[attribute]){
		tree.cat = NaN;
	}
	return trimInner(tree);
}

/* Helper function for markMinMax() in recursiveCatEvals.js
*/
function createDummies(inputTree, attribute){
	/*finds xp's with specified attribute and replaces their cat with "dummy"*/
	tree = copyTree(inputTree)
	function createDummyInner(node, attribute){
		if((attribute==="silent" && node.silentHead)
			|| (attribute==="func" && node.func))
			{
				node.cat = "dummy";
		}
		if(node.children && node.children.length){
			for(var i = 0; i<node.children.length; i++){
				var child = node.children[i];
				if(child.children && child.children.length){
					node.children[i] = createDummyInner(child);
				}
			}
		}
		return node;
	}
	return createDummyInner(tree, attribute);
}

/*  Created during an abandoned approach to evaluating the maximality or 
	minimality of nodes when only lexical nodes are being counted, for
	e.g. MatchMaxLexical.
	Tested during original creation but not tested by any current test files
	due to reworking of markMinMax.
*/
function removeSpecifiedNodes(inputTree, attribute){
	/*removes all terminal nodes with specified attribute and all redundant xp's left over.
	  afterward, replaces xp's with particular attribute with node of category dummy
	*/
	var tree = trimRedundantNodes(inputTree, attribute);
	//create dummmy nodes and return
	return createDummies(tree, attribute);
}