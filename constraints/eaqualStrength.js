/* Equal Strength Boundaries Constraints
 * as proposed by Nick Kalivoda
 * assign violations if a phonological terminal is at the left/right edge of a
 * different number of syntactic constituents as phonological constituents
 */

function equalStrengthBase(stree, ptree, cat, edgeName){
  var edgeIndex; //the index of the target edge for a equal strength constraint
  var sTerminals = getLeaves(stree); //syntactic terminals
  var pTerminals = getLeaves(ptree); //prosodic terminals

  if (edgeName == 'left'){edgeIndex = 0}; //left edge is children[0]
  if (edgeName == 'right')(edgeIndex = -1); //right edge is children[-1]

  /* stBoundaries and ptBoundaries are arrays that store the number of
   * constituents that a terminal falls at the left/right edge of (left/right
   * edge specified by edgeName) eg. if edgeName is set to "left",
   * stBoundaries[x] stores the number of constituents that sTerminals[x] falls
   * at the left edge of.
   */
  var stBoundaries = equalStrength(stree, cat, edgeIndex, sTerminals);
  var ptBoundaries = equalStrengthHelper(ptree, cat, edgeIndex, pTerminals);

  //RETURN SOMETHING!!!!!!!!!!

}

/* equalStrengthBase uses a helper function to get stBoundaries and
 * ptBoundaries using the same code. The helper function also helps keep
 * terminals from being reset by allowing these variables to be assigned in a
 * non-recursive function (equalStrengthBase).
 */
function equalStrengthHelper(tree, cat, edgeIndex, terminals){
  //equalStrengthHelper recursively goes through every node in tree
  var boundaries = []; //counts the number of l/r boundaries each terminal is at

  /* Another helper function is needed to recursively go through only the left/
   * right branching children of each node
   */
  function recursiveStrengthHelper(tree, cat, edgeIndex, terminals){
    if (tree.children && tree.children.length){
      recursiveStrengthHelper(tree.children[edgeIndex], cat, edgeIndex, terminals);
    }
  }
  if (tree.children && tree.children.length){ //recursively call for all nodes
    for (var i = 0; i < tree.children.length; i ++){
      equalStregthHelper(tree.children[i], cat, edgeIndex, terminals);
    }
  }

  //RETURN SOMETHING!!!!!!!

}
