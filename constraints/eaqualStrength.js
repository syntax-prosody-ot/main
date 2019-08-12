/* Equal Strength Boundaries Constraints
 * as proposed by Nick Kalivoda
 * assign violations if a phonological terminal is at the left/right edge of a
 * different number of syntactic constituents as phonological constituents
 */

function equalStrengthBase(stree, ptree, cat, edgeName){
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

  equalStrengthHelper(stree, cat, edgeName);//call recursive helper for syntax
  equalStrengthHelper(ptree, cat, edgeName);//call helper for prosody

  return [getLeaves(stree, getLeaves(ptree))];
}

function edgeIndex(subtree, name){
  if (name == "left"){return 0;}
  if (name == "right"){return subtree.children.length - 1;}
}

/* equalStrengthBase is run once per call so that sTerminals and pTerminals can
 * be cleared out once. equalStrengthHelper runs recursively, once for each node
 * on the tree. Also, the same process needs to be run on ptree and stree, so
 * the helper function minimizes code repitition by taking only one tree and
 * being called for both ptree and stree.
 */
function equalStrengthHelper(tree, cat, edgeName){
  var boundaries = 0;
  recursiveStrengthHelper(tree, cat, boundaries);
  //recursiveStrengthHelper only goes through the left/right branches of tree
  //arguments given unique names to avoid scope problems
  function recursiveStrengthHelper(partree, category, boundaries){
    // argument boundaries keeps track of the number of edges a terminal is on
    var edge = edgeIndex(partree, edgeName);
    if (partree.cat === category){
      boundaries ++; //increment boundaries when partree is of the right cat
    }
    //if partree is terminal and partree.edges is not already defined
    if (!partree.children && !partree.edges){
      partree.edges = boundaries; //assign partree.edges the value of boundaries
    }
    if (partree.children && partree.children.length){
      recursiveStrengthHelper(partree.children[edge], category, boundaries);
    }
  }
  if (tree.children && tree.children.length){
    for (var i = 0; i < tree.children.length; i ++){
      equalStrengthHelper(tree.children[i], cat, edgeName); //recursive function call
    }
  }
}

function equalStrengthLeftSP(stree, ptree, cat){
  var vcount = 0;
  var terminals = equalStrengthBase(stree, ptree, cat, "left");
  for (var i = 0; i < terminals[0].length; i ++){
    if (terminals[0][i].edges > terminals[1][i].edges){
      vcount += terminals[0][i].edges - terminals[1][i].edges;
    }
  }
  return vcount;
}

function equalStrengthLeftPS(stree, ptree, cat){
  return equalStrengthLeftSP(ptree, stree, cat);
}

function equalStrengthLeft(stree, ptree, cat){
  return equalStrengthLeftSP(stree, ptree, cat) + equalStrengthLeftPS(stree, ptree, cat);
}
