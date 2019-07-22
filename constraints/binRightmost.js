/* Assign a violation for every node of category cat 
such that its rightmost child of category (cat-1) 
has more than two children.
*/

function binMaxRightmostBranches(s, ptree, cat) {
  var vcount = 0;
  //base case: we are at leaf && there are no children
  //make sure there is children
  if (ptree.children && ptree.children.length) {
    if (ptree.cat === cat) {
      //check rightmost child
      var rightMost = ptree.children.length - 1;
      var rightMostChild = ptree.children[rightMost];
      if (rightMostChild.children && rightMostChild.children.length > 2) {
        vcount++;
      }       
    }
    //check other nodes in ptree
    for(var i = 0; i < ptree.children.length; i++) {
      vcount += binMaxRightmostBranches(s, ptree.children[i], cat);
    }       
  }
  return vcount;
};
var parent_ptree;
function binMaxRightmostLeaves(s, ptree, cat) {
  //first find the first level of with cat --> recursive look into the children
  var vcount = 0;
  if(ptree.children && ptree.children.length) {
  if(ptree.cat === cat) {
    var recur_flag = 0;
    for(var i = 0; i < ptree.children.length; i++) {
      if(ptree.children[i].cat === cat) {
        vcount++;
	recur_flag = 1;
	break;
      }
    }
    if(recur_flag === 0) {
      if(ptree.children.length > 2) {
      	if(parent_ptree && ptree === parent_ptree.children[parent_ptree.children.length-1]) {
        	vcount++;
      	}
      }
    }
  }
  for(var i = 0; i < ptree.children.length; i++) {
  	parent_ptree = ptree;
    vcount += binMaxRightmostLeaves(s, ptree.children[i], cat);
  }
  //once found save this level to look at other children for same cat
  //break out of recursive loop if cat is found
  //find if this is the bottom-most level of cat
  //assign a violation for every level that cat is not the bottomost cat
  //once it is the bottommost level of cat, check if that cat has more than 2 children
  //assign a violation if it more than 2
  }
  return vcount;
};
