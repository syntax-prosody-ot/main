/* Assign a violation for every node of category cat 
such that its rightmost child of category (cat-1) 
has more than two children.
*/

function binMaxRightParent(s, ptree, cat) {
  var vcount = 0;
  //base case: we are at leaf && there are no children
  //make sure there is children
  if (ptree.children && ptree.children.length) {
    if (ptree.cat === cat) {
      //check rightmost child
      var rightMost = ptree.children.length - 1;
      var rightMostChild = ptree.children[rightMost];
      console.log(rightMostChild.cat);
      if (rightMostChild.children.length > 2) {
        vcount++;
      }       
    }
    //check other nodes in ptree
    for(var i = 0; i < ptree.children.length; i++) {
      vcount += binMaxRightParent(s, ptree.children[i], cat);
    }       
  }
  return vcount;
}


/* Assign a violation for every node x of category cat
such that x is the rightmost child of its parent
and x has more than 2 children.
*/
function binMaxRightChild(s, ptree, cat) {
  var vcount = 0;
  if (ptree.children && ptree.children.length) {
    //check all nodes of ptree
    for(var i = 0; i < ptree.children.length; i++) {
      if(ptree.children[i].cat === cat && i === ptree.children.length - 1) {
	if(ptree.children[i].children.length > 2) {
	  vcount++;
        }
      }
        vcount += binMaxRightChild(s, ptree.children[i], cat);
    }
  }
  return vcount;
}
