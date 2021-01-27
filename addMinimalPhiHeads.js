/* Add minimal phi heads
   Takes list of ptrees and returns list of all possible iterations of input such that
   each minimal phi in the input has a left- or right-aligned head
   Max Tarlov 12/2020
*/

// Make a deep copy of a tree node
function copyNode(node) {
    if (node === null || typeof node !== 'object') {
        return node;
    }
    let result = node.constructor(); 
    for (var key in node) {
      result[key] = copyNode(node[key]);
    }
    return result;
}

// Takes node and returns true if any of node's children had a true 'head' attribute
function isHeaded(node) {
    let result = false;
    for (let child of node.children) {
        if (child.head) {
            result = true;
        }
    }
    return result;
}

// Accept node and add attribute head: true to the leftmost child
function addLeftHead(node) {
    if(node.children && node.children.length) {
        node.children[0].head = true;
    }
    return node;
}

// Accept node and add attribute head: true to the rightmost child
function addRightHead(node) {
    if(node.children && node.children.length){
        node.children[node.children.length - 1].head = true;
    }
    return node;
}

// take tree and return minimal nodes of specified category
function getMinimalNodes(root, cat='phi') {
    let result = [];
    function getNodesInner(node) {
        if(node.children && node.children.length) {
            for(let child of node.children) {
                getNodesInner(child);
            }
        }
        if(isMinimal(node) && node.cat == cat) {
            result.push(node);
        }
    }
    getNodesInner(root);
    return result;
}

/** Function that takes a single tree
 * and returns a list of trees consisting of all permutations 
 * of edge-aligned head placements for minimal nodes of category cat 
 * */ 
function addHeadsToTree(ptree, cat='phi') {
    let result = [];

    //add left heads to all minimalNodes
    let localCopy = copyNode(ptree);
    const minimals = getMinimalNodes(localCopy, cat);
    for(let node of minimals) {
        addLeftHead(node);
    }
    result.push(localCopy);

    //progressively change minimal nodes to right-headed for all combinations
    for(let i = 0; i < minimals.length; i++) {
        const resultLength = result.length; //note that the length of result increases with each iteration of the outer for-loop

        for(let j = 0; j < resultLength; j++) {
            localCopy = copyNode(result[j]);
            let thisMinimal = getMinimalNodes(localCopy, cat)[i];
            if(thisMinimal.children && thisMinimal.children.length > 1) {
                // Skip unary nodes to avoid duplicate trees   
                thisMinimal.children[0].head = false;
                addRightHead(thisMinimal);
                result.push(localCopy);
            }
        }
    }

    return result;
}

/** Main function. 
 * 
 * Arguments:
 * - treeList: a list of trees, or a list of pairs of trees (GEN output)
 * - cat: a category to pass along to addHeadsTo()
 * 
 * Returns: a list of all combinations of left- and right-headed minimal 
 * nodes of category 'cat' for each tree. If treeList is a list of pairs of
 * trees, the return value will also be a list of pairs of trees, preserving 
 * the inputs and iterating through the possible headed outputs.
 * 
 * Helper functions: addHeadsTo()
*/ 
function addMinimalNodeHeadsToList(treeList, cat='phi') {
    let result = [];
    for(let tree of treeList) {
        if(tree.length && tree.length === 2) // treeList is a list of pairs of trees (GEN output)
        {
            let headedTrees = addHeadsToTree(tree[1], cat);
            var interimResult = [];
            for(let ht in headedTrees){
                interimResult.push([tree[0], headedTrees[ht]]); //push the pair [stree, headedPTree]
            }
            result = result.concat(interimResult);
        }
        else if(tree.cat) // treeList's elements are plain trees, not pairs of trees
        {
            result = result.concat(addHeadsToTree(tree, cat));
        }
        else throw new Error("addMinimalNodeHeads(treeList, cat): Expected treeList to be a list of pairs of trees or a list of trees.");
    }
    return result;
}