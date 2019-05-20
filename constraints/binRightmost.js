/* Assign a violation for every node of category cat 
such that its rightmost child of category (cat-1) 
has more than two children.
*/

function binMaxRightParent(s, ptree, cat) {
  var vcount = 0;
  if (ptree.children && ptree.children.length) {
    if (ptree.cat === cat) {
	  //This condition needs to change to be general across categories -- don't just check for 'phi'
	  // You'll need to look at prosodichierarchy.js to help you out here.
    if (cat === 'phi') {
      var len = ptree.children.length - 1;
      var rightMost = ptree.children[len];
      if (rightMost.children.length > 2) {
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
	return vcount;
}
