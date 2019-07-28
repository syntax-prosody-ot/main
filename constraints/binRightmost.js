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

function binMaxRightmostLeaves(s, ptree, cat) {
  //make parent_ptree static variable to keep track of the parent ptree
  if(typeof parent_ptree == 'undefined') {
    parent_ptree = null;
  }
  var vcount = 0;
  //if curr ptree has children
  if(ptree.children && ptree.children.length) {
    //and is the same cat as input cat
    if(ptree.cat === cat) {
      //set the recursion flag to 0
      var recur_flag = 0;
      //for each child in the curr ptree
      for(var i = 0; i < ptree.children.length; i++) {
	//check if it's cat is the same as the cat of the input
        if(ptree.children[i].cat === cat /* && ptree.children[i].length > 2*/) {
          //if it is, increment vcount because you can't have more than one of each cat
          vcount++;
	  //set recursion flag to 1
	  recur_flag = 1;
          //stop looking to prevent extra vcount incrementation
	  break;
        }
      }
      
      //if the recursion flag never set off
      if(recur_flag === 0) {
	//then check if there are more than two children
        if(ptree.children.length > 2) {
          //if there is a parent tree aka when the cat is not iota, make sure it is the rightmost children of parent
      	  if(parent_ptree && ptree === parent_ptree.children[parent_ptree.children.length-1]) {
	    //increment if conditions are met
            vcount++;
      	  }
	  //if parent_ptree is null aka we are in iota and the cat of ptree is the same as cat input
	  //the second condition is set all the way at the top as this part is inclosed in that if statement
	  if(parent_ptree === null) {
            vcount++;
          }
        }
      }
    }  
    //code to recursively look through tree
    for(var i = 0; i < ptree.children.length; i++) {
      //set parent_ptree to the current ptree
      parent_ptree = ptree;
      //recursively call on children of ptree
      vcount += binMaxRightmostLeaves(s, ptree.children[i], cat);
    }
  }
  return vcount;
};
