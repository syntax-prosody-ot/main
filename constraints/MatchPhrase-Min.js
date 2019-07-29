/* Assign a violation for every node of syntactic category s in 
 * the syntactic tree, and is not mapped to a corresponding prosodic 
 * node of category p, where p = catMap(s), such that p does not 
 * dominate another node of category p. (Originally: "A minimal 
 * lexical phrase in syntactic constiturnt structure must be matched 
 * by a corresponding minimal prosodic constituent in phonological 
 * representation. */

function MatchPhraseMin(s, ptree, cat) {
  var vcount = 0;
  //if s has children
  if(s.children && s.children.length) {
    //if stree is minimal but ptree is not
    if(s.cat === cat && isMinimal(s) && !isMinimal(ptree)) {
      vcount++;
    }
  }
  //code to recursively look through all the other nodes
  for(var i = 0; i < s.children.length; i++) {
    //if the children of cat is cat input aka there are more children and it is not minimal
    if(s.children[i].cat === cat) {
      //automatically assign violation the moment there is not a match aka when ptree is minimal and stree is not
      if(!catsMatch(s.children[i].cat, ptree.children[i].cat)) {
        vcount++;
      }
      //if there are bith s children and ptree children, call function again
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

