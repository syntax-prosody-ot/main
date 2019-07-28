/* Assign a violation for every node of syntactic category s in the syntactic tree, and is not mapped to a corresponding prosodic node of category p, where p = catMap(s), such that p does not dominate another node of category p. (Originally: "A minimal lexical phrase in syntactic constiturnt structure must be matched by a corresponding minimal prosodic constituent in phonological representation. */



function MatchPhraseMin(s, ptree, cat) {
  var vcount = 0;
  if(s.children && s.children.length) {
    //if stree is minimal but ptree is not
    if(s.cat === cat && isMinimal(s) && !isMinimal(ptree)) {
      vcount++;
    }
  }
  for(var i = 0; i < s.children.length; i++) {
    if(s.children[i].cat === cat) {
      //if ptree is minimal but stree is not
      if( ptree.children[i].cat !== "phi") {
        vcount++;
      }
      if(ptree.children && ptree.children[i]) {
         vcount += MatchPhraseMin(s.children[i], ptree.children[i], cat);
      }
    }
  }
  return vcount;
}

/*function sameChildren(s, ptree) {
   if(s.children.length === 0 && ptree.children.length !== 0) {
      var sChildren = s.children;
      while(ptree.children.length !== 0) {
	ptree = ptree.children;
      }
      var ptreeChildren = ptree.children;
   } 
   if(s.children.length !== 0 && ptree.children.length === 0) {
     var ptreeChildren = ptree.children;
     while(s.children.length !== 0) {
       s = s.children;
     }
   }
}*/

