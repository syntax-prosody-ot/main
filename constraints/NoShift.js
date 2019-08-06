/*NOSHIFT (Bennett et al. 2016): If a terminal element a is
 * linearly ordered before a terminal element b in the 
 * syntactic representation of an expression E, then the 
 * phonological exponent of a should precede the phonological 
 * exponent of b in the phonological representation of E
 *
 *Implementation 1: categorical. Assign a violation for every 
 *terminal element a that immediately precedes b in the 
 *linearization of the stree but does not immediately precede b
 *in the ptree.*/

function NoShiftCat(stree, ptree, cat) {
  var vcount = 0;
  var sLeaves = getLeaves(stree);
  var pLeaves = getLeaves(ptree);
  for(var i = 1; i < sLeaves.length; i++) {
    pair = [sLeaves[i-1], sLeaves[i]];
    if(pLeaves.includes(pair)===false) { 
      vcount++;
    }
  }
  return vcount;
}
