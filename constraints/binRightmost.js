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

/* Assign a violation for every rightmost node x of category cat such that x dominates (at any level) more than two children of category cat such that x dominates (at any level) more than two children of category cat-1 */
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
      //if there is a parent and the current ptree is the rightmost child of that parent 
      //or if there is not parent but the cat is still the same as the input cat
      if((parent_ptree && ptree === parent_ptree.children[parent_ptree.children.length - 1]) || parent_ptree === null) {
	//count the leaves
        var leaves = findLeaves(ptree);
	//if the leaves exceed 2, increment vcount
	if(leaves > 2) {
          vcount++;
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
  //remove everything in parent_ptree aka reset var to typeof undefined
  delete parent_ptree;
  return vcount;
};

/*helper function I created to count the leaves of a ptree*/
function findLeaves(ptree) {
  var leaves = 0;
  //if this ptree does not dominate another ptree with the same cat
  if(isMinimal(ptree) && ptree.children) {
    //add the number of leaves of the current ptree to the current amount of leaves
    leaves = leaves + ptree.children.length;
  }
  //if there are children
  if(ptree.children && ptree.children.length) {
    //for every children
    for(var i =0; i < ptree.children.length; i++){
      //if they are the same cat as the current ptree
      //count the leaves
      leaves+=findLeaves(ptree.children[i]);
    }
  }
  return leaves;
}
