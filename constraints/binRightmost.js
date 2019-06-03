/* Assign a violation for every node of category cat 
such that its rightmost child of category (cat-1) 
has more than two children.
*/

function binMaxRightParent(s, ptree, cat) {
  var vcount = 0;
  if (ptree && ptree.children.length) {
    if (ptree.cat === cat) {
      if (ptree.children.length > 2) {
        vcount++;
      }
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
    //console.log(ptree.children[1].cat);
    //console.log(cat);
    var len = ptree.children.length - 1;
    var rightMost = ptree.children[len];
    var childLen = rightMost.children.length - 1;
    var currChild = rightMost.children[childLen];
    while(currChild.cat !== "w") {
      rightMost = currChild;
      childLen = rightMost.children.length - 1;
      currChild = rightMost.children[childLen];
    }
    if(rightMost.children.length > 2) {
      vcount++;
    }
  }
  return vcount;
}
