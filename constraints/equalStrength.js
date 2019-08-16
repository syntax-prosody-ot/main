/* Equal Strength Boundaries Constraints
 * as proposed by Nick Kalivoda, August 2019:
 * Assign violations if a phonological terminal is at the left/right edge of a
 * different number of syntactic constituents as phonological constituents.
 * Specific functions defined below. Base function counts number of left/right
 * edges a terminal falls on.
 */

function equalStrengthBase(stree, ptree, scat, edgeName){
  var sTerminals = getLeaves(stree); //syntactic terminals
  var pTerminals = getLeaves(ptree); //prosodic terminals

  /* edges refers to left or right edges, so it should be cleared out in case
   * the edge is different from the last call */
  for (var i = 0; i < sTerminals.length; i ++){
    //clear out edges for syntactic terminals
    sTerminals[i].edges = void(0);
  }
  // GEN also re-uses subtrees, so edges must be cleared out every time
  for (var i = 0; i < pTerminals.length; i ++){
    //clear out edges for prosodic terminals
    pTerminals[i].edges = void(0);
  }

  equalStrengthHelper(stree, scat, edgeName);//call recursive helper for syntax
  var pcat = reversibleCatPairings(scat); // the prosodic cat the corresponds to scat
  equalStrengthHelper(ptree, pcat, edgeName);//call recursive helper for prosody

  //return an array of the terminals, also arrays, now with the property edges
  return [getLeaves(stree), getLeaves(ptree)];
}

/* equalStrengthHelper takes a tree, a category "cat", and the name of an edge
 * (left/right) "edgeName" and counts the number of nodes of category cat that
 * each terminal falls on the left/right edge of, as specified by edgeName.
 * This information is recorded in a property of each terminal called "edges".

 * equalStrengthBase is run once per call so that sTerminals and pTerminals can
 * be cleared out once. equalStrengthHelper runs recursively, once for each node
 * on the tree. Also, the same process needs to be run on ptree and stree, so
 * the helper function minimizes code repetition by taking only one tree and
 * being called for both ptree and stree.
 */
function equalStrengthHelper(tree, cat, edgeName){
  var boundaries = 0;
  recursiveStrengthHelper(tree, cat, boundaries);
  //recursiveStrengthHelper only goes through the left/right branches of tree
  //arguments given unique names to avoid scope problems
  function recursiveStrengthHelper(partree, category, boundaries){
    // argument boundaries keeps track of the number of edges a terminal is on
    var edgeIndex; // the index of the l/r edge
    //left = [0]
    if (edgeName == "left"){
      edgeIndex = 0;
    }
    //right = [length -1]
    if (edgeName == "right" && partree.children && partree.children.length){
      edgeIndex = (partree.children.length - 1);
    }
    //increment boundaries when partree is of the correct category
    if (partree.cat === category){
      boundaries++;
    }
    /* if partree is terminal and the terminal's edges have not already been
     * recorded in partree.edges */
    if (!partree.children && !partree.edges){
      partree.edges = boundaries; //assign partree.edges the value of boundaries
    }
    //recursively call inner function for the child on the l/r edge
    if (partree.children && partree.children.length){
      recursiveStrengthHelper(partree.children[edgeIndex], category, boundaries);
    }
  }
  //recursively call outer function for every node
  if (tree.children && tree.children.length){
    for (var i = 0; i < tree.children.length; i ++){
      equalStrengthHelper(tree.children[i], cat, edgeName);
    }
  }
}

/* Equal Strength Right Syntax --> Prosody:
 * For every terminal in stree that is at the right edge of n nodes of category
 * cat in stree, and at the right edge of m nodes of category
 * reversibleCatPairings(cat) in ptree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase
 */
function equalStrengthRightSP(stree, ptree, cat){
  var vcount = 0;
  var terminals = equalStrengthBase(stree, ptree, cat, "right");
  //base function returns [streeTerminals, ptreeTerminals]
  for (var i = 0; i < terminals[0].length; i ++){
    //property edges refers to the number of right edges a terminal is on
    if (terminals[0][i].edges > terminals[1][i].edges){
      vcount += terminals[0][i].edges - terminals[1][i].edges;
      //if n > m, assign n - m violations
    }
  }
  return vcount;
}

/* Equal Strength Right Prosody --> Syntax:
 * For every terminal in ptree that is at the right edge of n nodes of category
 * cat in ptree, and at the right edge of m nodes of category
 * reversibleCatPairings(cat) in stree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase and equalStrengthRightSP. SP constraints are PS
 * constraints with stree and ptree switched
 */
function equalStrengthRightPS(stree, ptree, cat){
  return equalStrengthRightSP(ptree, stree, cat);
}

// a combined version of equalStrengthrightSP and PS. Takes syntactic cat, not prosodic
function equalStrengthRight(stree, ptree, cat){
  if (!categoryPairings[cat]){
    cat = reversibleCatPairings(cat); //makes sure that cat is a syntactic cat.
  }
  return equalStrengthRightSP(stree, ptree, cat) + equalStrengthRightPS(stree, ptree, reversibleCatPairings(cat));
}

/* Equal Strength Left Syntax --> Prosody:
 * For every terminal in stree that is at the left edge of n nodes of category
 * cat in stree, and at the left edge of m nodes of category
 * reversibleCatPairings(cat) in ptree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase
 */
function equalStrengthLeftSP(stree, ptree, cat){
  var vcount = 0;
  var terminals = equalStrengthBase(stree, ptree, cat, "left");
  //base function returns [streeTerminals, ptreeTerminals]
  for (var i = 0; i < terminals[0].length; i ++){
    //property edges refers to the number of left edges a terminal is on
    if (terminals[0][i].edges > terminals[1][i].edges){
      vcount += terminals[0][i].edges - terminals[1][i].edges;
      //if n > m, assign n - m violations
    }
  }
  return vcount;
}

/* Equal Strength Left Prosody --> Syntax:
 * For every terminal in ptree that is at the left edge of n nodes of category
 * cat in ptree, and at the left edge of m nodes of category
 * reversibleCatPairings(cat) in stree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase and equalStrengthLeftSP. SP constraints are PS
 * constraints with stree and ptree switched
 */
function equalStrengthLeftPS(stree, ptree, cat){
  return equalStrengthLeftSP(ptree, stree, cat);
}

// a combined version of equalStrengthLeftSP and PS, takes syntactic cat, not prosodic
function equalStrengthLeft(stree, ptree, cat){
  if (!categoryPairings[cat]){
    cat = reversibleCatPairings(cat); //makes sure that cat is a syntactic cat.
  }
  return equalStrengthLeftSP(stree, ptree, cat) + equalStrengthLeftPS(stree, ptree, reversibleCatPairings(cat));
}
