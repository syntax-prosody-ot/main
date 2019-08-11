/* Equal Strength Boundaries Constraints
 * as proposed by Nick Kalivoda
 * assign violations if a phonological terminal is at the left/right edge of a
 * different number of syntactic constituents as phonological constituents
 */

function equalStrengthBase(stree, ptree, cat, edgeName){
  var edgeIndex; //the index of the target edge for a equal strength constraint
  var sTerminals = getLeaves(stree); //syntactic terminals
  var pTerminals = getLeaves(ptree); //prosodic terminals

  // GEN re-uses subtrees, so the property edges must be cleared out every time
  for (var i = 0; i < sTerminals.length; i ++){
    //clear out edges for syntactic terminals
    sTerminals[i].edges = void(0);
  }
  for (var i = 0; i < pTerminals.length; i ++){
    //clear out edges for prosodic terminals
    pTerminals[i].edges = void(0);
  }

  if (edgeName == 'left'){edgeIndex = 0}; //left edge is children[0]
  if (edgeName == 'right')(edgeIndex = -1); //right edge is children[-1]

  equalStrengthHelper(stree, cat, edgeIndex);//call recursive helper for syntax
  equalStrengthHelper(ptree, cat, edgeIndex);//call helper for prosody

  return void(0);
}

/* equalStrengthBase is run once per call so that sTerminals and pTerminals can
 * be cleared out once. equalStrengthHelper runs recursively, once for each node
 * on the tree. Also, the same process needs to be run on ptree and stree, so
 * the helper function minimizes code repitition by taking only one tree and
 * being called for both ptree and stree.
 */
function equalStrengthHelper(tree, cat, edgeIndex){

  //recursiveStrengthHelper only goes through the left/right branches of tree
  //arguments given unique names to avoid scope problems
  function recursiveStrengthHelper(partree, category, edge, boundaries){
    // argument boundaries keeps track of the number of edges a terminal is on
    if (!boundaries){
      var boundaries = 0;
    }
    if (partree.cat === category){
      boundaries ++; //increment boundaries when partree is of the right cat
    }
    //if partree is terminal and partree.edges is not already defined
    if (!partree.children && !partree.edges){
      partree.edges = boundaries; //assign partree.edges the value of boundaries
    }
    if (partree.children && partree.children.length){
      recursiveStrengthHelper(partree.children[edge], category, edge, boundaries);
    }
  }

  if (tree.children && tree.children.length){
    for (var i = 0; i < tree.children.length; i ++){
      equalStrengthHelper(tree.children[i], cat, edgeIndex); //recursive function call
    }
  }

  return recursiveStrengthHelper(tree, cat, edgeIndex);

  //return tree;
}
