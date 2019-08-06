/* Assign a violation for every node of syntactic category s in 
 * the syntactic tree, and is not mapped to a corresponding prosodic 
 * node of category p, where p = catMap(s), such that p does not 
 * dominate another node of category p. (Originally: "A minimal 
 * lexical phrase in syntactic constiturnt structure must be matched 
 * by a corresponding minimal prosodic constituent in phonological 
 * representation. */


//match a syntax tree wuth a prosody tree
function MatchMinSP(s, ptree, cat) {
  var vcount = 0;
  //if s has children
  if(s.children && s.children.length) {
    //if stree cat is the same as input cat & stree is minimal & does not have a match on the ptree
      if(s.cat === cat && isMinimal(s)===true && hasMinMatch(s, ptree)===false) {
      vcount++;
    }
    //check every node in s, check for matching Minimals
    for(var i = 0; i < s.children.length; i++) {
      vcount += MatchMinSP(s.children[i], ptree, cat);
    }
  }
  return vcount;
}

//match prosody tree with a syntax tree
function MatchMinPS(s, ptree, cat) {
  var vcount = MatchMinSP(ptree, s, cat);
  return vcount;
}

//helper function, similar to hasMatch, different in that it ensures that ptree is minimal
function hasMinMatch(sNode, pTree) {
  var leaves = getLeaves(sNode);
  //sort leaves
  leaves = leaves.sort();
  if(catsMatch(sNode.cat, pTree.cat) && sameIds((getLeaves(pTree)).sort(), leaves) && isMinimal(pTree)) {
    return true;
  } else if(!pTree.children || pTree.children.length === 0) {
    return false;
  } else {
    for(var i = 0; i < pTree.children.length; i++) {
      var child = pTree.children[i];
      if(hasMinMatch(sNode, child)) {
        return true;
      }
    }
  }
  return false;
}

