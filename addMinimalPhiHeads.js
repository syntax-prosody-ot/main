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

// Takes node and returns if any of node's children node's 'head' attrabute is true
function isHeaded(node) {
    let result = false;
    for (let child of node.children) {
        if (child.head) {
            result = true;
        }
    }
    return result;
}

// Accept node and add attrabute head: true to the leftmost child
function addLeftHead(node) {
    if(node.children && node.children.length) {
        node.children[0].head = true;
    }
    return node;
}

// Accept node and add attrabute head: true to the rightmost child
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

// Accept single tree and return permutations of head placements for minimal nodes
function addHeadsTo(ptree, cat='phi') {
    const result = [];

    //initialize minimalNodes as left-headed
    let localCopy = copyNode(ptree);
    const minimals = getMinimalNodes(localCopy);
    for(let node of minimals) {
        addLeftHead(node);
    }
    result.push(localCopy);

    //progressively change minimal nodes to right-headed for all combinations
    for(let i = 0; i < minimals.length; i++) {
        const resultLength = result.length;
        for(let j = 0; j < resultLength; j++) {
            localCopy = copyNode(result[j]);
            const thisMinimal = getMinimalNodes(localCopy)[i];
            if(thisMinimal.children && thisMinimal.children.length > 1) {
                // unary nodes are skipped to avoid duplicate trees   
                thisMinimal.children[0].head = false;
                addRightHead(thisMinimal);
                result.push(localCopy);
            }
        }
    }

    return result;
}

// Main function. Takes list of trees and returns
// combinations of left- and right-headed minimal
// nodes of category 'cat' for each tree
// can take list of trees or GEN output
function addMinimalNodeHeads(treeList, cat='phi') {
    let result = [];
    for(let tree of treeList) {
        if(tree.length && tree.length === 2) {
            // gen output, use latter of pair of trees
            result = result.concat(addHeadsTo(tree[1]));
        }
        else if(tree.cat) {
            // not gen output, just a tree
            result = result.concat(addHeadsTo(tree));
        }
        else throw new Error("List of pairs of trees or list of trees expected, got neither");
    }
    return result;
}