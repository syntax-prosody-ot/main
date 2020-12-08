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

// Accept single tree and return permutations of head placements
function addHeadsTo(ptree, cat='phi') {
    let result = [];
    let rightmostInMinimal = getRightEdge(getLeaves({children:getMinimalNodes(ptree)}));
    function addHeadsInner(root, node) {
        /* Expected sequence of marking
        ((a b) (c d))|
                     |- (('a b) (c d))|
                                      |- ((a 'b) ('c d))|
                                      |                 |- ((a 'b) (c 'd))
                                      |
                                      |- (('a b) ('c d))|
                                                        |- (('a b) (c 'd))
            
        */
        node = node || root;
        if(node.children && node.children.length) {
            if(isMinimal(node) && node.cat === cat) {
                if(!isHeaded(node)) {
                    //minimal nodes, if unheaded, get left head
                    addLeftHead(node);
                    //addHeadsInner(copyNode(root)); //this line duplicates results in (a)
                }
                else if(node.children[0].head && node.children.length > 1) {
                    //headed minimal nodes then get right heads on n > 1 th pass
                    node.children[0].head = false;
                    addRightHead(node);
                    if(getRightEdge(node).id === rightmostInMinimal.id) {
                        //if right edges line up, we have reached the end and this tree is ready to be added
                        result.push(root);
                    }
                    else {
                        //otherwise there are 
                        addHeadsInner(copyNode(root));
                    }
                }
            }
            else { //addHeadsInner should be called on non-minimal nodes' children 
                for(let child of node.children) {
                    addHeadsInner(root, child);
                }
            }
        } //nothing needs to be done on terminal nodes
    }
    addHeadsInner(copyNode(ptree));
    return result;
}

// Main function. Takes list of trees and returns 
function addMinimalNodeHeads(treeList, cat='phi') {
    let result = [];
    for(let tree of treeList) {
        if(tree.length && tree.length === 2) {
            // gen output, use latter of pair of trees
            result.concat(addHeadsTo(tree[1]));
        }
        else if(tree.cat) {
            // not gen output, just a tree
            result.concat(addHeadsTo(tree));
        }
        else throw new Error("List of pairs of trees or list of trees expected, got neither");
    }
    return result;
}