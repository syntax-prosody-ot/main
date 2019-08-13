/* Assign a violation for every node in sTree of category sCat
whose d edge is not aligned with the d edge of a node in pTree 
of the prosodic category corresponding to s

For every sCat node s in sTree, find a node p in pTree of the proper category
such that the first (for align-left) leaf dominated by s has the same id as
the first leaf dominated by p.

TODO Do we ever want to try to align x0 levels?? Or would we ever have an xp as a leaf?
TODO test this function.
*/
function alignLeft(sTree, pTree, sCat){
	return alignSP(sTree, pTree, sCat, 'left');
}

function alignRight(sTree, pTree, sCat){
	return alignSP(sTree, pTree, sCat, 'right');
}

function alignSP(sTree, pTree, sCat, d){
	var getEdge = (d==="left") ? getLeftEdge : getRightEdge;
	var vCount = 0;
	walkTree(sTree, function(sNode){
		if(sNode.cat !== sCat)	 // only go further if sNode has the category we're interested in
			return;
		var sEdge = getEdge(sNode);
		if(!sEdge)
			sEdge = sNode;	// If sNode is a leaf (which it probably shouldn't be but depending on the tree might be),
								// then look for a p-node that matches sNode itself. TODO is this a good idea?
		var noMatch = true;
		walkTree(pTree, function(pNode){
			if(!catsMatch(sCat, pNode.cat))
				return;
			var pEdge = getEdge(pNode);
			if(!pEdge) 
				pEdge = pNode;	//I'm assuming the leaves are words...
			if(sEdge.id === pEdge.id){
				noMatch = false;
				return false;
			}
		});
		if(noMatch)
			vCount++;
	});
	return vCount;
}

function getLeftEdge(node){
	return getLeaves(node)[0];
}

function getRightEdge(node){
	var leaves = getLeaves(node);
	return leaves[leaves.length-1];
}

function wrap(sTree, pTree, cat){
	var vCount = 0;
	walkTree(sTree, function(sNode){
		if(sNode.cat !== cat)
			return;
		var noMatch = true;
		sLeaves = getLeaves(sNode);
		walkTree(pTree, function(pNode){
			if(!catsMatch(cat, pNode.cat))
				return;
			if(containsIds(getLeaves(pNode), sLeaves)){	// if the current pNode wraps our sNode
				noMatch = false;
				return false;	 // stop looking for a match
			}
		});
		if(noMatch)
			vCount++;
	});
	return vCount;
}

// Returns true if a contains b
// More precisely, if a contains a set of nodes whose ids are identical to the ids of the nodes in b.
function containsIds(a, b){
	for(var i=0; i<=(a.length-b.length); i++){
		var j=0;
		while((j<b.length)&&(a[i+j].id === b[j].id))
			j++;
		if(j===b.length)
			return true;
	}
	return false;
}





/* Function that takes a prosodic tree and returns a version annotated it with the phonological tones that it would have in Japanese or Lekeitio Basque.
Tones:
	A -> H*L
	left edge of phi -> LH on initial word. NB Here if there are multiple left-aligned phis, only one LH is annotated.
	H following H*L within a maximal phi -> !H (downstep)
Arguments:
	ptree = a prosodic tree
	parentCat = prosodic category of ptree's parent
	afterA = is there a preceding accent in this phi?
*/
function addJapaneseTones(ptree){
	
	function addJapaneseTonesInner(ptree, parentCat, afterA, firstInPhi){
		//Iota: No tonal diagnostics; just call recursively on the children
		if(ptree.cat==='i'){
			if(ptree.children && ptree.children.length){
				for(var child in ptree.children)
				{
					child = addJapaneseTonesInner(ptree.children[child], ptree.cat, false)[0];
				}
			}
		}
		//Phi: domain for downstep
		else if(ptree.cat==='phi'){
			//Non-maximal phi following a pitch-drop is assigned a downstepped LH
			if(parentCat === 'phi' && afterA && !firstInPhi){
				ptree.tones = 'L!H';
			}
			//Otherwise, LH is not downstepped
			else if(!firstInPhi){
				ptree.tones = 'LH';
			}
			
			if(ptree.children && ptree.children.length){			
				for(var child in ptree.children)
				{
					outputs = addJapaneseTonesInner(ptree.children[child], ptree.cat, afterA, child==0);
					child = outputs[0];
					afterA = outputs[1];
				}
			}
		}
		
		else if(ptree.cat === 'w'){
			//Unaccented w
			if(!ptree.accent){
				ptree.accent = ptree.id.split('_')[0];
			}
			if(ptree.accent === 'A' || ptree.accent === 'a'){
				ptree.tones = 'H*L';
				if(afterA)
					ptree.tones = '!H*L';
				afterA = true;
			}
			//Accented w
			else{
				ptree.tones = '-';
			}
			//this is only necessary if we have recursive prosodic words...
			// if(
			// outputs = addJapaneseTonesInner(child, ptree.cat, afterA);
			// child = outputs[0];
			// afterA = outputs[1];
		}
		
		else{
			console.log("Unrecognized prosodic category"+ptree.cat);
			ptree.tones = '-';
		}
		
		return [ptree, afterA];
	}
	
	return addJapaneseTonesInner(ptree)[0];
}

/* Function that takes a prosodic tree and returns a version annotated it with the phonological tones that it would have in Irish, according to Elfner (2012)'s diagnostics.
Tones:
	left edge of non-minimal phi: LH
	right edge of any phi: HL
	
Arguments:
	ptree = a prosodic tree
	parentCat = prosodic category of ptree's parent
	afterA = is there a preceding accent in this phi?
*/
function addIrishTones_Elfner(ptree){
	
	function addIrishTones_Elfner_Inner(ptree, getsRise, getsFall){
		//Iota: No tonal diagnostics; just call recursively on the children
		if(ptree.cat==='i'){
			if(ptree.children && ptree.children.length){
				for(var child in ptree.children)
				{
					child = addIrishTones_Elfner_Inner(ptree.children[child], false, false);
				}
			}
		}
		//Phi: domain for downstep
		else if(ptree.cat==='phi'){
			
			if(ptree.children && ptree.children.length){			
				for(var child in ptree.children)
				{
					var firstInNonMinPhi = (child==0 && !isMinimal(ptree));
					var lastInPhi = (child == (ptree.children.length-1));
					child = addIrishTones_Elfner_Inner(ptree.children[child], firstInNonMinPhi, lastInPhi);
				}
			}
		}
		
		else if(ptree.cat === 'w'){
			ptree.tones = '';
			if(getsRise){
				ptree.tones += 'LH';
			}
			if(getsFall){
				ptree.tones += 'HL';
			}
			if(!getsRise && !getsFall){
				ptree.tones = '-';
			}
		}
		
		else{
			console.log("Unrecognized prosodic category"+ptree.cat);
			ptree.tones = '-';
		}
		
		return ptree;
	}
	
	return addIrishTones_Elfner_Inner(ptree);
}

/* Function that takes a prosodic tree and returns a version annotated it with the phonological tones that it would have in Irish, according to our revised diagnostics.
Tones:
	left edge of any phi: LH
	right edge of any phi: HL
	
Arguments:
	ptree = a prosodic tree
	parentCat = prosodic category of ptree's parent
	afterA = is there a preceding accent in this phi?
*/
function addIrishTones_Kalivoda(ptree){
	
	function addIrishTones_Kalivoda_Inner(ptree, getsRise, getsFall){
		//Iota: No tonal diagnostics; just call recursively on the children
		if(ptree.cat==='i'){
			if(ptree.children && ptree.children.length){
				for(var child in ptree.children)
				{
					child = addIrishTones_Kalivoda_Inner(ptree.children[child], false, false);
				}
			}
		}
		
		else if(ptree.cat==='phi'){
			
			if(ptree.children && ptree.children.length){			
				for(var child in ptree.children)
				{
					var firstInPhi = (child == 0);
					var lastInPhi = (child == (ptree.children.length-1));
					child = addIrishTones_Kalivoda_Inner(ptree.children[child], firstInPhi, lastInPhi);
				}
			}
		}
		
		else if(ptree.cat === 'w'){
			ptree.tones = '';
			if(getsRise){
				ptree.tones += 'LH';
			}
			if(getsFall){
				ptree.tones += 'HL';
			}
			if(!getsRise && !getsFall){
				ptree.tones = '-';
			}
		}
		
		else{
			console.log("Unrecognized prosodic category"+ptree.cat);
			ptree.tones = '-';
		}
		
		return ptree;
	}
	
	return addIrishTones_Kalivoda_Inner(ptree);
}/* Assign a violation for every node of category cat 
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
/* Binarity that cares about the number of branches */

//sensitive to the category of the parent only (2 branches of any type is acceptable)
function binMinBranches(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length===1){
			//logreport("VIOLATION: "+ptree.id+" has only one child");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){

			vcount += binMinBranches(s, ptree.children[i], cat);
		}
	}

	return vcount;
}

//This function stops counting the violations once it finds the first one
function binMinBranchesInit(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length===1){
			//logreport("VIOLATION: "+ptree.id+" has only one child");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			//these are some debugging print codes
			/*console.log("ptree.children.length: "+ ptree.children.length);
			console.log("i: "+ i);
			console.log(ptree.cat);
			console.log('vcount: '+vcount);
			console.log('word: '+ptree.id);
			*/
			if(i === 1){
				break;
			}
			vcount += binMinBranchesInit(s, ptree.children[i], cat);
		}

	}

	return vcount;
}
//sensitive to the category of the parent only (2 branches of any type is acceptable)
//categorical evaluation: 1 violation for every super-binary branching node
function binMaxBranches(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length>2){
			//logreport("VIOLATION: "+ptree.id+" has "+ptree.children.length+" children!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBranches(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//sensitive to the category of the parent only (2 branches of any type is acceptable)
//gradient evaluation: assigns 1 violation for every child past the first 2 ("third-born" or later)
function binMaxBranchesGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		var numChildren = ptree.children.length;
		if(ptree.cat === cat && numChildren>2){
			var excessChildren = numChildren - 2;
			//logreport(excessChildren+ " VIOLATION(s): "+ptree.id+" has "+numChildren+" children!");
			vcount += excessChildren;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBranches(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

/*TRUCKENBRODT-STYLE BINARITY*/

/* Categorical BinMax (Leaves)
*	Assign one violation for every node of the prosodic category c such that this
* node dominates more than two nodes of the prosodic category immidately below c
* on the prosodic hierarchy.
*
* Parent-category-neutral version of:
* Sandalo & Truckenbrodt 2002: "Max-Bin: P-phrases consist of maximally two prosodic words"
* Assigns a violation for every node in ptree that dominates more than two prosodic words.
*/
function binMaxLeaves(s, ptree, c){
	var vcount = 0;
	//the category we are looking for:
	var target = pCat.nextLower(c);
	//pCat.nextLower defined in prosdic hierarchy.js
	//console.log("the target of binMaxLeaves is " + target);
	if(ptree.children && ptree.children.length){
		var targetDesc = getDescendentsOfCat(ptree, target);
		//console.log("there are " + targetDesc.length + " " + target + "s");
		if(ptree.cat === c && targetDesc.length > 2){
			vcount ++;
		}
		for(var i = 0; i < ptree.children.length; i++){
			vcount += binMaxLeaves(s, ptree.children[i], c);
		}
	}
	return vcount;
}

/* Gradiant BinMax (Leaves)
* I don't know how to define this constraint in pros, but it's binMaxLeaves as
* a gradient constraint instead of a categorical constraint.
*/
function binMaxLeavesGradient(s, ptree, c){
	var vcount = 0;
	//the category we are looking for:
	var target = pCat.nextLower(c);
	//pCat.nextLower defined in prosodicHierarchy.js
	if(ptree.children && ptree.children.length){
		var targetDesc = getDescendentsOfCat(ptree, target);
		if(ptree.cat === c && targetDesc.length > 2){
			vcount += targetDesc.length - 2; //this makes the constraint gradient
		}
		for(var i = 0; i < ptree.children.length; i++){
			vcount += binMaxLeavesGradient(s, ptree.children[i], c);
		}
	}
	return vcount;
}

/* BinMin (Leaves)
*	Assign one violation for every node of the prosodic category c such that this
* node dominates less than two nodes of the prosodic category immidately below c
* on the prosodic hierarchy.
*/

function binMinLeaves(s, ptree, c){
	var vcount = 0;
	//the category we are looking for:
	var target = pCat.nextLower(c);
	//pCat.nextLower defined in prosdic hierarchy.js
	if(ptree.children && ptree.children.length){
		var targetDesc = getDescendentsOfCat(ptree, target);
		if(ptree.cat === c && targetDesc.length < 2){
			vcount ++;
		}
		for(var i = 0; i < ptree.children.length; i++){
			vcount += binMinLeaves(s, ptree.children[i], c);
		}
	}
	return vcount;
}

//Helper function: given a node x, returns all the descendents of x that have category cat.
//Since this function is designed for use on prosodic trees, it does not take silence into account.
function getDescendentsOfCat(x, cat){
	var descendents = [];
	//logreport("x.cat is "+x.cat+ ", cat is " +cat);
	if(x.children && x.children.length)
	//x is non-terminal
	{
		for(var y=0; y < x.children.length; y++){
			if(x.children[y].cat === cat){
				descendents.push(x.children[y]);
			}
			var yDescendents = getDescendentsOfCat(x.children[y], cat);
			for(var i=0; i < yDescendents.length; i++){
				descendents.push(yDescendents[i]);
			}
		}
	}
	/* this else if statement was double counting terminal nodes of category cat.
	 * removing it causes double counting to stop.
	else if(x.cat === cat)	// x is a terminal of the right category
	{
		descendents.push(x);
	}*/
	return descendents;
}

/*<legacyBinarityConstraints> (for backwards compatability with old test files)*/

//Parent-category-neutral version of:
//Sandalo & Truckenbrodt 2002: "Max-Bin: P-phrases consist of maximally two prosodic words"
//Assigns a violation for every node in ptree that dominates more than two prosodic words.
function binMax2Words(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length>2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMax2Words(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//Gradient version of Truckenbrodt's Maximum Binarity
function binMax2WordsGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length>2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount += (wDesc.length - 2);
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMax2WordsGradient(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

function binMin2Words(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length<2){
			//logreport("VIOLATION: "+ptree.id+" only dominates "+wDesc.length+" words!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMin2Words(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

function binMin2WordsGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length<2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount += (2-wDesc.length);
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMin2WordsGradient(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

/*</legacyBinarityConstraints>*/

/* Binarity constraints that care about the number of leaves
Note: relies on getLeaves.
In the future we might want to have structure below the level of the (terminal) word, e.g., feet
and in that case would need a type-sensitive implementation of getLeaves
*/
function isInArray(myArray, x)
{
	var answer = false;
	for(var i = 0; i < myArray.length; i++)
	{
		if(x == myArray[i])
		{
			answer = true;
		}
	}
	return answer;
};

function getNodes(myTree)
{
	var nodes = [];
	nodes.push(myTree);
	if(myTree.children && myTree.children.length)
	{
		for(var x = 0; x < myTree.children.length; x++)
		{
			var xNodes = getNodes(myTree.children[x]);
			for(var y = 0; y < xNodes.length; y++)
			{
				nodes.push(xNodes[y]);
			}
		}
	}
	return nodes;
};

// x immediately dominates y
function imDom(x,y)
{
	var check = false;
	if(x.children && x.children.length)
	{
		for(var i = 0; i < x.children.length; i++)
		{
			var currentKid = x.children[i];
			if(currentKid == y)
			{
				var check = true;
			}
		}
	};
	return check;
};

// Intended to replace imDom
function isParentOf(x,y){
	return (x.children || []).indexOf(y) >= 0;
}

//Returns parent of goal-node in within tree, if one exists. Else returns false.
function getParent(myTree,goal)
{
	var par = false;
	if(imDom(myTree, goal) == true)
	{
		par = myTree;
	}
	else
	{
		if(myTree.children && myTree.children.length)
		{
			for(var j = 0; j < myTree.children.length; j++)
			{
				var nextNode = myTree.children[j];
				if(getParent(nextNode, goal) != "")
				{
					par = getParent(nextNode, goal);
				}
			}
		}
	}
	return par;
};

//Returns the non-silent terminals c-commanded by node x within tree.
function commands(myTree,x)
{
	var domain = [];
	var xParent = getParent(myTree,x);
	if(hasParent(myTree,x) && (xParent.children.length > 1))
	{
		for(var i = 0; i < xParent.children.length; i++)
		{
			var current = xParent.children[i];
			if(current != x)
			{
				var currentNodes = getNodes(current);
				for(var j = 0; j < currentNodes.length; j++)
				{
					var z = currentNodes[j];
					if(!z.silent && !z.children)
					{
						domain.push(z);
					}
				}
			}
		}
	};
	return domain;
};

function hasParent(myTree, x)
{
	if(getParent(myTree, x) == "false")
	{
		return false;
	}
	else
	{
		return true;
	}
};

function getPhis(pTree)
{
	var phiArray = [];
	var nodes = getNodes(pTree);
	for(var i = 0; i < nodes.length; i++)
	{
		var current = nodes[i];
		if(current.cat == "phi")
		{
			phiArray.push(current);
		}
	};
	return phiArray;
};

function phiMates(ptree,x,y)
{
	var answer = false;
	var phis = getPhis(ptree);
	for(var i = 0; i < phis.length; i++)
	{
		var currentPhi = phis[i];
		var nodes = currentPhi.children;
		var hasX = false;
		var hasY = false;
		for(var j = 0; j < nodes.length; j++)
		{
			var k = nodes[j];
			if(k.id == x.id)
			{
				var hasX = true;
			}
			if(k.id == y.id)
			{
				var hasY = true;
			}
			if(hasX && hasY)
			{
				break;
			}
		};
		if(hasX && hasY)
		{
			var answer = true;
			break;
		}
	};
	return answer;
};

function sharePhi(ptree,x,y)
{
	var answer = false;
	var phis = getPhis(ptree);
	for(var i = 0; i < phis.length; i++)
	{
		var currentPhi = phis[i];
		var nodes = getNodes(currentPhi);
		var hasX = false;
		var hasY = false;
		for(var j = 0; j < nodes.length; j++)
		{
			var k = nodes[j];
			if(k.id == x.id)
			{
				var hasX = true;
			}
			if(k.id == y.id)
			{
				var hasY = true;
			}
			if(hasX && hasY)
			{
				break;
			}
		};
		if(hasX && hasY)
		{
			var answer = true;
			break;
		}
	};
	return answer;
};

function group(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var currentLeaf = sLeaves[i];
		var comSet = commands(sTree,currentLeaf);
		for(var j = 0; j < comSet.length; j++)
		{
			var currentCommandee = comSet[j];
			if(!sharePhi(pTree,currentLeaf,currentCommandee))
			{
				vcount++;
			}
		}
	}
	return vcount;
};

function groupMin(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var currentLeaf = sLeaves[i];
		var comSet = commands(sTree,currentLeaf);
		for(var j = 0; j < comSet.length; j++)
		{
			var currentCommandee = comSet[j];
			if(!phiMates(pTree,currentLeaf,currentCommandee))
			{
				vcount++;
			}
		}
	}
	return vcount;
};

//Assumes x is a non-silent leaf. Returns next non-silent leaf.
function nextLeaf(tree,x)
{
	var next = [];
	var leaves = getLeaves(tree);
	for(var i = 0; i < leaves.length-1; i++)
	{
		if(leaves[i] == x)
		{
			var j = leaves[i+1];
			next.push(j);
			break;
		}
	}
	return next;
};

//NB: ASSUMES x AND y ARE TERMINALS! Will return false if one of the nodes is non-terminal, even if it actually c-commands the other.
function mutualNonCommand(tree,x,y)
{
	var cx = commands(tree,x);
	var cy = commands(tree,y);
	if(!isInArray(cx,y) && !isInArray(cy,x))
	{
		return true;
	}
	else
	{
		return false;
	};
};

function splitNMC(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var current = sLeaves[i];
		if(nextLeaf(sTree,current).length)
		{
			var next = nextLeaf(sTree,current)[0];
			if(mutualNonCommand(sTree,current,next) && sharePhi(pTree,current,next))
			{
				vcount++;
			}
		}
	}
	return vcount;
};

function splitNMCmin(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var current = sLeaves[i];
		if(nextLeaf(sTree,current).length)
		{
			var next = nextLeaf(sTree,current)[0];
			if(mutualNonCommand(sTree,current,next) && phiMates(pTree,current,next))
			{
				vcount++;
			}
		}
	}
	return vcount;
};/* Equal Strength Boundaries Constraints
 * as proposed by Nick Kalivoda
 * assign violations if a phonological terminal is at the left/right edge of a
 * different number of syntactic constituents as phonological constituents
 * specific functions defined below, base function counts number of left/right
 * edges a terminal falls on.
 */

 //this code isn't robust for terminal order-shifting, does it need to be?

function equalStrengthBase(stree, ptree, scat, edgeName){
  var sTerminals = getLeaves(stree); //syntactic terminals
  var pTerminals = getLeaves(ptree); //prosodic terminals

  /* edges refers to left or right edges, so it should be cleared out in case
   * the edge is different from the last call */
  for (var i = 0; i < sTerminals.length; i ++){
    //clear out edges for syntactic terminals
    sTerminals[i].edges = void(0);
  }
  // GEN also re-uses subtrees, so edges must be cleared out every time
  for (var i = 0; i < pTerminals.length; i ++){
    //clear out edges for prosodic terminals
    pTerminals[i].edges = void(0);
  }

  equalStrengthHelper(stree, scat, edgeName);//call recursive helper for syntax
  var pcat = reversableCatPairings(scat); // the prosodic cat the corresponds to scat
  equalStrengthHelper(ptree, pcat, edgeName);//call recursive helper for prosody

  //return an array of the terminals, also arrays, now with the property edges
  return [getLeaves(stree), getLeaves(ptree)];
}

/* equalStrengthBase is run once per call so that sTerminals and pTerminals can
 * be cleared out once. equalStrengthHelper runs recursively, once for each node
 * on the tree. Also, the same process needs to be run on ptree and stree, so
 * the helper function minimizes code repitition by taking only one tree and
 * being called for both ptree and stree.
 */
function equalStrengthHelper(tree, cat, edgeName){
  var boundaries = 0;
  recursiveStrengthHelper(tree, cat, boundaries);
  //recursiveStrengthHelper only goes through the left/right branches of tree
  //arguments given unique names to avoid scope problems
  function recursiveStrengthHelper(partree, category, boundaries){
    // argument boundaries keeps track of the number of edges a terminal is on
    var edgeIndex; // the index of the l/r edge
    //left = [0]
    if (edgeName == "left"){
      edgeIndex = 0;
    }
    //right = [length -1]
    if (edgeName == "right" && partree.children && partree.children.length){
      edgeIndex = (partree.children.length - 1);
    }
    //increment boundaries when partree is of the correct category
    if (partree.cat === category){
      boundaries ++;
    }
    //if partree is terminal and partree.edges is not already defined
    //edges must not already be defined because function is called recursively
    if (!partree.children && !partree.edges){
      partree.edges = boundaries; //assign partree.edges the value of boundaries
    }
    //recursively call inner function for the child on the l/r edge
    if (partree.children && partree.children.length){
      recursiveStrengthHelper(partree.children[edgeIndex], category, boundaries);
    }
  }
  //recursively call outer function for every node
  if (tree.children && tree.children.length){
    for (var i = 0; i < tree.children.length; i ++){
      equalStrengthHelper(tree.children[i], cat, edgeName);
    }
  }
}

/* A function to return the paired category as defined in categoryPairings.
 * categoryPairings only returns prosodic categories given a syntactic category.
 * reversableCatPairings also returns a syntactic category given a prosodic
 * category.
 * Maybe this should move to prosodicHierarchy.js?
*/
function reversableCatPairings(cat){
  if (categoryPairings[cat]){
    return categoryPairings[cat]; //just the same as calling categoryPairings
  }
  else {
    //get the property names of categoryPairings
    var props = Object.getOwnPropertyNames(categoryPairings);
    var propFound = false; //true when the category is paired
    for (var i = 0; i < props.length; i ++){
      if (categoryPairings[props[i]] == cat){
        propFound = true;
        if (props[i] == "clause"){
          // rn categoryPairings has a property "clause" which maps to i
          return "cp"; // "cp" also maps to i, I think we want "cp"
        }
        //props[i] is the property that maps to cat
        return props[i];
      }
    }
    // if no matching category is found, return a costom error.
    if (!propFound){
      var err = new Error("" + cat + " is not a category defined in categoryPairings (see main/prosodicHierarchy.js)");
      return err;
    }
  }
}

/* Equal Strength Right Syntax --> Prosody:
 * For every terminal in stree that is at the right edge of n nodes of category
 * cat in stree, and at the right edge of m nodes of category
 * reversableCatPairings(cat) in ptree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase
 */
function equalStrengthRightSP(stree, ptree, cat){
  var vcount = 0;
  var terminals = equalStrengthBase(stree, ptree, cat, "right");
  //base function returns [streeTerminals, ptreeTerminals]
  for (var i = 0; i < terminals[0].length; i ++){
    //property edges refers to the number of right edges a terminal is on
    if (terminals[0][i].edges > terminals[1][i].edges){
      vcount += terminals[0][i].edges - terminals[1][i].edges;
      //if n > m, assign n - m violations
    }
  }
  return vcount;
}

/* Equal Strength Right Prosody --> Syntax:
 * For every terminal in ptree that is at the right edge of n nodes of category
 * cat in ptree, and at the right edge of m nodes of category
 * reversableCatPairings(cat) in stree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase and equalStrengthRightSP. SP constraints are PS
 * constraints with stree and ptree switched
 */
function equalStrengthRightPS(stree, ptree, cat){
  return equalStrengthRightSP(ptree, stree, cat);
}

// a combined version of equalStrengthrightSP and PS. Takes syntactic cat, not prosodic
function equalStrengthRight(stree, ptree, cat){
  return equalStrengthRightSP(stree, ptree, cat) + equalStrengthRightPS(stree, ptree, reversableCatPairings(cat));
}

/* Equal Strength Left Syntax --> Prosody:
 * For every terminal in stree that is at the left edge of n nodes of category
 * cat in stree, and at the left edge of m nodes of category
 * reversableCatPairings(cat) in ptree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase
 */
function equalStrengthLeftSP(stree, ptree, cat){
  var vcount = 0;
  var terminals = equalStrengthBase(stree, ptree, cat, "left");
  //base function returns [streeTerminals, ptreeTerminals]
  for (var i = 0; i < terminals[0].length; i ++){
    //property edges refers to the number of left edges a terminal is on
    if (terminals[0][i].edges > terminals[1][i].edges){
      vcount += terminals[0][i].edges - terminals[1][i].edges;
      //if n > m, assign n - m violations
    }
  }
  return vcount;
}

/* Equal Strength Left Prosody --> Syntax:
 * For every terminal in ptree that is at the left edge of n nodes of category
 * cat in ptree, and at the left edge of m nodes of category
 * reversableCatPairings(cat) in stree, if n > m, assign n-m violations.
 * Relies on equalStrengthBase and equalStrengthLeftSP. SP constraints are PS
 * constraints with stree and ptree switched
 */
function equalStrengthLeftPS(stree, ptree, cat){
  return equalStrengthLeftSP(ptree, stree, cat);
}

// a combined version of equalStrengthLeftSP and PS, takes syntactic cat, not prosodic
function equalStrengthLeft(stree, ptree, cat){
  return equalStrengthLeftSP(stree, ptree, cat) + equalStrengthLeftPS(stree, ptree, reversableCatPairings(cat));
}
/********************
* Some implementations of EqualSisters (Myrberg 2013)
* Myrberg introduces this constraint but doesn't actually define 
* how to count violations if there are more than 2 sisters.
* TODO does the degree of prosodic inequality make a difference to the severity of the violation?
*********************/

/* EqualSisters: looks at the category of the first sister, and assigns a violation 
* for every one of its sisters that doesn't share its category
* A definition probably no one wants but which is not ruled out by the "definitions" that appear in papers
* Markedness only -- just looks at prosody
* s and c are just there to fill out the argument structure for tableau-izing purposes.
*/
function equalSistersFirstPrivilege(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		var cat1 = parent.children[0].cat;
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(child.cat != cat1)
			{
				logreport.debug("\tVIOLATION: "+child.id+" and "+parent.children[0].id+" are unequal.");
				vCount++;
			}
			vCount += equalSistersFirstPrivilege(s, child, c);
		}
	}
	return vCount;
}

/*EqualSisters: assigns a violation for every (unordered) pair of sisters whose categories don't match
* Probably no one wants this version, either. Predicts "majority rules" effects.
* Markedness only -- just looks at prosody
* s and c are just there to fill out the argument structure for tableau-izing purposes.
*/

function equalSistersPairwise(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		var sisters = parent.children;
		for(var i=0; i < sisters.length; i++){
			var child = sisters[i];
			for(var j=i; j < sisters.length; j++){
				var sister = sisters[j];
				if(child.cat != sister.cat)
				{
					logreport.debug("\tVIOLATION: "+child.id+" and "+sister.id+" are unequal.");
					vCount++;
				}
			}
			vCount += equalSistersPairwise(s, child, c);
		}
	}
	return vCount;
}

//EqualSisters: assigns a violation for every pair of adjacent sister nodes that are not of the same prosodic category
//This is probably the version that actually makes sense.
//Markedness only -- just looks at prosody
//s and c are just there to fill out the argument structure for tableau-izing purposes.
function equalSistersAdj(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		logreport.debug("\tchecking equality of children of "+parent.id);
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(i<parent.children.length-1)
			{
				var sister = parent.children[i+1];
				if(child.cat != sister.cat)
				{
					logreport.debug("\tVIOLATION: "+child.id+" and "+sister.id+" are unequal.");
					vCount++;
				}
			}
			vCount += equalSistersAdj(s, child, c);
		}
	}
	return vCount;
}/****************
* Function that implements Exhaustivity, version 1:
* "Assign a violation for every parent-child pair (x,y) such that x is of PH-level n and y is of PH-level n-m, m >= 2."
* Assigns violations based on distance between categories on PH, but otherwise category-insensitive.
* "Vertically categorical"; greater distance between parent and child on PH does not result in higher vcount.
******************/

function exhaust1(s, ptree){
//Assumes trees that obey Layering.
	
	//Base case: if parent is a terminal, return 0 violations.
	if (!ptree.children){
		return 0;
	}
	
	//Recursive case: if parent is non_terminal, find out how many violations are in each of the subtrees rooted in its children.

	if(ptree.children && ptree.children.length){
		var vcount = 0;
		var child;
		for (var i=0; i < ptree.children.length; i++){
			child = ptree.children[i];
			if (ptree.cat!==child.cat && pCat.nextLower(ptree.cat)!==child.cat){
				vcount++;
			}
			vcount += exhaust1(s, child);
		}
		return vcount;
	}
};
/*
Defined in Ito & Mester (2013) as: "Every accented word must be the head of a (minimal) phi
Assign a violation for each accented prosodic word that is not the head of a minimal phi."

Operationalized as:
For each phi, look at all children. If at least one child is a phi, then the current node is a non-minimal phi, 
so assign a violation for every A (= w [+accent]) in the array of children. 
If no child is a phi, let aCount = the number of A in the children array, and assign (aCount-1) violations."

Notes:
- Assumes accent as a separate attribute of a word. TODO fix Gen do add this; currently testing by assuming accent is specified in word id. ex. a_1, a_2, u_3
- As currently implemented, assumes no recursive phonological words.
*/


function accentAsHead(s, p, c){
	var vCount = 0;
	var child;
	
	//Base case: p is a leaf.
	if(!p.children || !p.children.length)
		return vCount;
	
	//Recursive case: p is a non-leaf.
	
	//Count all the accented words that are immediate daughters of current node p.
	// Store value in aCount.
	var aCount = 0;
	
	for(var i=0; i < p.children.length; i++){
		child = p.children[i];
		//console.log("child.id is:"+child.id);
		if(child.cat==="w" && !child.accent){
			child = accentFromId(child);	//If accent isn't defined, try to get it from the node's id.
			//console.log("child.id ("+child.id+") is assigned accent "+child.accent);
		}
		
		//if an accented word is discovered...
		if((child.accent==="a" || child.accent==='A') && child.cat==="w"){
			aCount++;
			//console.log("child.id ("+child.id+") is an accented word. aCount = "+aCount);
		}
		
		vCount += accentAsHead(s,child,c);
	}
		
	// Case 1: p is a minimal phi. Assign a violation for every accented word except the first
	// by incrementing the violation count by one less than the total number of accented words (or 0 if there are none).
	if((p.cat==="phi") && isMinimal(p) && aCount>0){
		vCount += (aCount-1);
	}
	
	// Case 2: p is not a minimal phi (i.e. it's an iota, non-minimal phi, or w)
	// 			-> Assign a violation for every accented word. 
	else{
		vCount += aCount;
	}
	
	//console.log("For node "+p.id+", vCount is: "+vCount);
	return vCount;
}

/*
Defined in Ito&Mester(2013) as: "No accentual lapse. Assign a violation for every fully L-toned w."

Operationalized as: 
"For every U (= w[-accent]), assign a violation if U is non-initial (i.e. index of U in the children array > 0) and preceded by A in phi (i.e. there is an A in the children array with index greater than indexOf(U))."

TODO find out if there is an accent for the beginning of iota -- i.e. should the initial U *not* receive a violation as well...???

ANSWER: Assuming words can be immediately dominated by intonational phrases (i.e. violable Exhaustivity):

	For each phi, assign a violation for every U that is a) non-initial 
    b) preceded an A (within the maximal phi) with no intervening left-edge phi boundaries.

*/
function noLapseL(s, p, c){
	
	var vCount = 0;
    var spreadLow = false;     //Left edge of phi or iota contributes H
	
    walkTree(p, function(node){
        node = accentFromId(node);  //assign an accent if necessary
        
        if(node.cat==='w'){
            if(node.accent==='a' || node.accent === 'A'){
                spreadLow = true;
            }
            
            /* spreadLow will be true if no phi or iota left edge intervenes
               between the last accented word and the current word
            */ 
            else if(spreadLow && (node.accent==='u' || node.accent==='U')){
                vCount++;
            }
        }
        /* Otherwise, the current node is a phi or iota
           and contributes a high tone to the following node,
           so we can turn off spreadLow.
        */
        else spreadLow = false; 
        
    });
		
	return vCount;
}

/* Helper function for noLapseL: take a prosodic tree with words marked as U or A
	and determine for each word what tone(s) it receives
	where tones are contributed by:
		1. accent: a -> HL
		2. [ (left phi boundary) -> H
	and an unaccented word (accent: u) receives its accent from whatever is immediately to its left.
	
	Procedure:
	- traverse the tree in order (L->R). Let the current node = child, and let its parent = var parent.
	- track whether to assign L to the next word: var spreadLow = {true, false}.
		if(parent.children.indexOf[p]
		if(p.accent === "a") spreadLow = true;
*/
function accentFromId(node){
    if(!node.accent)
        node.accent = node.id.split('_')[0];
    return node;
}/***********************
MATCH THEORY constraints
and their numerous helpers
************************/

function getLeaves(x)
//return a list of all the non-silent terminals dominated by a node
{
	var leaves = [];
	if(x.children && x.children.length)
	//x is non-terminal
	{
		for(var y=0; y < x.children.length; y++){
			var yLeaves = getLeaves(x.children[y]);
			for(var i=0; i < yLeaves.length; i++){
				leaves.push(yLeaves[i]);
			}
		}
	}
	else if(!x.silent)	// x is itself a non-silent terminal
	{
		leaves.push(x);
	}
	return leaves;
}

function sameIds(a1, a2)
//helper function to compare two arrays of children
//since there isn't a built_in array comparator.
{
	if(a1.length !== a2.length)
		return false;
	
	var i = 0;
	while(i<a1.length){
		if(a1[i].id !== a2[i].id)
			return false;
		i++;
	}
	
	return true;
}


function matchPS(sTree, pParent, pCat)
//Assign a violation for every prosodic node of type pCat in pParent that doesn't have a corresponding syntactic node in sTree, 
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding syntactic category
//Assumes no null terminals.
{
	return matchSP(pParent, sTree, pCat);
}

//Longterm TODO: Technically, Match doesn't compare ordered sets but unordered sets, so for an implementation that wouldn't penalize prosodic scrambling we'd need to sort sParent.children and pParent.children before comparing them.
//TODO: what about null syntactic terminals?? these need to be filtered out of the syntactic input?? write this function later.

function matchSP(sParent, pTree, sCat)
//Assign a violation for every syntactic node of type sCat in sParent that doesn't have a corresponding prosodic node in pTree, 
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding prosodic category
//Assumes no null syntactic terminals.
{
	if(sParent.cat === sCat)
		logreport.debug("\tSeeking match for "+sParent.id + " in tree rooted in "+pTree.id);
	var vcount = 0;
	
	if((sParent.cat === sCat) && !hasMatch(sParent, pTree)){
		vcount++;
		logreport.debug("\tVIOLATION: "+sParent.id+" has no match!");
	} 
		
	if(sParent.children){	
		for(var i = 0; i < sParent.children.length; i++)
		{
			var sChild = sParent.children[i];
			vcount += matchSP(sChild, pTree, sCat);
		}
	}
	
	return vcount;
}

function hasMatch(sNode, pTree)
//For a syntactic node sNode and a prosodic tree pTree, search the entire pTree 
//to see if there is a node in pTree that has the same set of terminals as sNode,
//in the same order as sLeaves.
//Returns true for terminals assuming that there are no null syntactic terminals...
//Relies on sameIds for leaf comparisons and catMatches for category comparisons.
{
	var sLeaves = getLeaves(sNode);
	if(catsMatch(sNode.cat, pTree.cat) && sameIds(getLeaves(pTree), sLeaves))
	// the current prosodic node is the match, both for category and for terminals
	{
		logreport.debug("\tMatch found: "+pTree.id);
		return true;
	}
	
	// If the current prosodic node is NOT the match:
	
	else if(!pTree.children || pTree.children.length===0)
	// current node is terminal
		return false;	

	else
	//the current prosodic node is non-terminal (has children)
	{
		for(var i = 0; i < pTree.children.length; i++)
		//check each child to see if the match exists in the subtree rooted in that child
		{
			var child = pTree.children[i];
			if(hasMatch(sNode, child))
				return true;
		}
		return false;
	}
	
}
/****************
* Function that implements Nonrecursivity, version 1:
* "Assign a violation for every node of category x immediately dominated
* by another node of category x"
******************/

function nonRecChild(s, parent, cat){

	//Base case: if parent is a terminal, return 0 violations.
	if (!parent.children){
		return 0;
	}

	//Recursive case: if parent is non-terminal, find out how many violations are in each of the subtrees rooted in its children
	var vcount = 0;
	var child;

	for (var i=0; i < parent.children.length; i++){
		child = parent.children[i];
		if (parent.cat===cat && child.cat===cat){
			vcount++;
		}
		vcount+=nonRecChild(s, child, cat);
	}
	return vcount;
}


/* Non-recursivity, Truckenbrodt style:
*  "Any two p-phrases that are not disjoint in extension are identical in extension."
*  For every node x of category p dominated by another node y of category p,
*  assign a violation for every leaf dominated by y that is not also dominated by x.
*/
function nonRecTruckenbrodt(s, parent, cat){
	//console.log("looking for nonRecTruckenbrodt violations in prosodic tree "+parent.id);
	if(!parent.children||(parent.children.length===0)){
		return 0;
	}

	var vcount=0;
	var child;

	for(var i=0; i<parent.children.length; i++){
		child = parent.children[i];
		if(parent.cat===cat && child.cat===cat){
			vcount+=leafDifferenceSize(getLeaves(child), getLeaves(parent));
		}
		vcount+=nonRecTruckenbrodt(s, child, cat);
	}
	return vcount;
}

/*Given arrays x, y, where the elements in x are a subset of the elements in y,
* and the elements in x and y are in the same order, returns the number of elements
* in y that are not also in x.
* TODO Modify this so that it doesn't make all the assumptions above concerning the relationship of x and y.
*/
function leafDifferenceSize(x,y){
	if(!(x instanceof Array) || !(y instanceof Array)){
		console.log("x: "+x);
		console.log("y: "+y);
		throw new Error("Either x or y is not an array");
	}
	return y.length-x.length;
}

/* Nonrecursivity, Pairwise (Max Tarlov)
"Assign a violation for every pair of nodes a and b such that a and b are both
of category c and a dominates b."

Unlike non-recursivity version 1 above, Pairwise Non-Recursivity does not require
immediate domination to assign a violation. This means that even if layering is
out of the ordinary, say phi dominates iota dominates phi, the pair of phis should
incur a violation.

This constraint requires two recursive function calls, one for each member of
the pair. nonRecPairs (the main constraint function) deals primarily with the
parent node and will call the helper function numOfCats, which returns a value
representing the number of occurances of nodes which match the category c in
a child of the parent node. This may be just one if the child is terminal or
dominates no nodes of category c.

In theory, this constraint should evaluate all pairs of nodes, but the functions
here will only evaluate pairs where a dominates b. This is ok because a must
dominate b for the pair to incur a violation.
*/

function nonRecPairs(s, parent, c){ //markedness constraint, s argument is for consistancy
	var vcount = 0; //number of violations counted in this function call (return)
	var child; //a child of parent (from array parent.children[])

	//Recursivity case: if parent is non-terminal and of category c, start counting violations.
	if (parent.children){
		for (var i = 0; i < parent.children.length; i ++ ) {
			child = parent.children[i];//new name, to avoid confusion and for consistency
			//add the number of nodes of cat c in the substructure/node child:
			if (parent.cat === c){
				/*
				If the parent node is of the category c, count the number of nodes
				dominated by this child that are also of the category c, including this
				child itself, and add that number to the violatin count. This is where
				violations are actually incured.
				*/
				vcount += numOfCats(child, c);
			}

			//run this function on the substructure child and add to vcount
			vcount += nonRecPairs(s, child, c);//recursive function call
			//this just makes sure that all of the possible parent nodes get evaluated

			//for debugging, uncomment the following line
			//console.log("Counting number of " + c + "'s dominated by " + parent.id);
		}

	}

	return vcount;
}

/*
Helper function to count the number of nodes in a substructure which are of the
category c. Called by nonRecPairs if a node is of the right catogory and is
non-terminal
*/
function numOfCats(p, c){//not a constraint, does not require s
	var occurances = 0; //number of nodes of category c (return this)
	if (p.cat === c){ //nonRec1 uses strict comparison
		occurances ++;
	}
	//count the number of children of category c
	if (p.children){
		for (var i = 0; i < p.children.length; i ++){
			var child = p.children[i];
			occurances += numOfCats(child, c);//recursive function call
		}
	}
	return occurances;
	/*
	since prosodic trees may not be properly layered, numOfCats must inspect
	children even if the parent is not of the relevant category. See comment on
	line 71.
	*/
}

/*Non-recursivity, assesed by parent node.
*"Assign one violation for every node of category c that immideately dominates
*at least one node of the category c."
*
*In general, this constraint will assign fewer violations than nonRec1 above.
*/

function nonRecParent(s, p, c){ //markedness constraint, s is for consistancy
	var vcount = 0; //number of violations, return
	var child; //p.children[i], see comment on variable's assignment (l. 165)
	var doms = 0; //the number of nodes of category c immidately dominated by p

	//base case: p has no children and cannot incur nonRec violations
	if(!p.children){
		return 0;
	}

	//otherwise, start counting violations
	for (var i = 0; i < p.children.length; i ++){
		child = p.children[i];
		//if both parent and child are of the category c, add increase doms
		if (p.cat === c && child.cat === c){
			doms ++;
		}
		//run function on child as well, running through the whole tree
		vcount += nonRecParent("sTree", child, c);//recursive function call
	}

	//if  parent has at least one child of the same category, assign a violation
	if (doms > 0){
		vcount ++;
	}

	return vcount;
}


/*Changed name of nonRec1 to nonRecChild. copy needed for backwards compatability*/
function nonRec1(s, parent, cat){

	//Base case: if parent is a terminal, return 0 violations.
	if (!parent.children){
		return 0;
	}

	//Recursive case: if parent is non-terminal, find out how many violations are in each of the subtrees rooted in its children
	var vcount = 0;
	var child;

	for (var i=0; i < parent.children.length; i++){
		child = parent.children[i];
		if (parent.cat===cat && child.cat===cat){
			vcount++;
		}
		vcount+=nonRecChild(s, child, cat);
	}
	return vcount;
}

/*
Returns true if node does not dominate any other nodes of its category
Assumes all nodes have valid and relevant categories 
(i.e., this is designed for prosodic trees and won't give the desired results
if run on a syntactic tree that contains, e.g., bar levels).
*/
function isMinimal(node){
	var cat = node.cat;
	var isMin = true;
	//If the node is a leaf, it's minimal.
	if(!node.children || !node.children.length)
		return isMin;
	//Otherwise, we have to look at its children to determine whether it's minimal.
	var i = 0;
	var chil = node.children;
	while(isMin && i<chil.length){
		if(chil[i].cat===cat)
			isMin = false;
		i++;
	}
	return isMin;
}

/*
Returns true even if parent.cat is of a higher level than child.cat
(i.e, assumes layering)
To be revised!!!
For the long run, Ozan suggests pre-processing trees to mark every node as minimal/maximal.
*/
function isMaximal(parent, child){
	if(parent.cat===child.cat)
		return false;
	else return true;
}

/* Function that takes a tree and the category of its root's parent node
	and labels all the nodes in the tree as being minimal or maximal 
	instance of whatever category k they are, where:
	minimal = does not dominate any nodes of category k
	maximal = is not dominated by any nodes of category k
	and level ordering is assumed (a node of category level k 
	will never be dominated by a node of category < k).
	
	Previous isMin or isMax labels are preserved.
*/
// Move this to the prosodic hierarchy file probably?
var sCat = ["cp", "xp", "x0"];

function markMinMax(mytree, parcat){
	// Check for maximalitys
	if(!mytree.hasOwnProperty('isMax')){
		mytree.isMax = (mytree.cat !== parcat)
	}
	
	// Check for minimality
	if(!mytree.hasOwnProperty('isMin')){
		mytree.isMin = isMinimal(mytree);
	}
/* 		// Breadth-first search of the children to see if 
		// any immediate children are the same category as the current node
		var i = 0;
		while(mytree.isMin; i < mytree.children.length){
			mychild = mytree.children[i];
			if(pCat.indexOf(mychild.cat) >= 0 || sCat.indexOf(mychild.cat) >= 0){
				childcat = mychild.cat;
				if(mytree.cat == childcat){
					mytree.isMin = false;
				}
				else{
					i++;
				}
				
			} */		
	
	if(mytree.children && mytree.children.length){
		parcat = mytree.cat;
		for(var i = 0; i < mytree.children.length; i++){
			mytree.children[i] = markMinMax(mytree.children[i], parcat);
		}
	}
	return mytree;
}/* Assign a violation for every node whose leftmost daughter constituent is of type k
*  and is lower in the prosodic hierarchy than its sister constituent immediately to its right: *(Kn Kn-1)
*  Elfner's StrongStart.
*/

function strongStart_Elfner(s, ptree, k){

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	if(ptree.children.length>1){		
		var leftmostCat = ptree.children[0].cat;
		var sisterCat = ptree.children[1].cat;
		
		//console.log(leftmostCat);
		//console.log(sisterCat);
		//console.log(pCat.isLower(leftmostCat, sisterCat));

		if((leftmostCat === k) && (pCat.isLower(leftmostCat, sisterCat)))
		{
			vcount++;
			//console.log("strongStart_Elfner violation: "+ptree.children[0]+" "+ptree.children[1]);
		}
	}
	
	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongStart_Elfner(s, child, k);
	}
	
	return vcount;
}

/* Assign a violation for every node of category cat whose leftmost daughter constituent
*  and is lower in the prosodic hierarchy than its sister constituent immediately to its right.
*  (intuitive strong start, according to the intuition of Bellik & Kalivoda 2019)
*/

function strongStart(s, ptree, cat){

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	if(ptree.cat === cat && ptree.children.length>1){		
		var leftmostCat = ptree.children[0].cat;
		var sisterCat = ptree.children[1].cat;
		
		//console.log(leftmostCat);
		//console.log(sisterCat);
		//console.log(pCat.isLower(leftmostCat, sisterCat));

		if(pCat.isLower(leftmostCat, sisterCat))
		{
			vcount++;
		}
	}
	
	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongStart(s, child, cat);
	}
	
	return vcount;
}

/* Assign a violation for every node of category cat whose leftmost daughter constituent
*  and is lower in the prosodic hierarchy than its sister constituent immediately to its right.
*  Sensitive to whether nodes are (non)minimal: phi min is lower than phi non-min
*  Not sensitive to the category of the parent.
*  (Van Handel's strongStart from SPOT2 2019)
*/

function strongStart_Elfner_SubCat(s, ptree, cat){
	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	if(ptree.children.length>1){		
		var leftmost = ptree.children[0];
		var sister = ptree.children[1];
		
		//console.log(leftmostCat);
		//console.log(sisterCat);
		//console.log(pCat.isLower(leftmostCat, sisterCat));
		
		if(nodeHasLowerCat(leftmost, sister))
		{
			vcount++;
		}
	}
	
	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongStart_Elfner_SubCat(s, child, cat);
	}
	
	return vcount;
}/*KEY FOR REPRESENTATIONS
	
	<	left of stressed syllable
	>   right of stressed syllable

	[	left of unstressed syllable
	]	right of any syllable

	H	mora linked to High
	L	mora linked to Low
	F	mora linked to High+Low
	R	mora linked to Low+High

The representations are unambiguous because the OCP is in force.
So, "HH" has 1 tone:  High+Low			"LL" has 1 tone:  Low+Low
	"HL" has 2 tones: High				"LH" has 2 tones: Low+High
	"HF" has 2 tones: High+Low			"LR" has 2 tones: Low+High
	"HR" has 3 tones: High+Low+High		"LF" has 3 tones: Low+High+Low
*/

//HELPER FUNCTIONS

function cross(x, y)
//x and y must be strings or arrays.
{
	var cArray = [];
	for(var i = 0; i < x.length; i++)
	{
		for(var k = 0; k < y.length; k++)
		{
			var string = x[i];
			var current = y[k];
			var string = string.concat(current);
			cArray.push(string);
		}
	};
	return cArray;
};

function aStar(alphabet, n)
{
	var pArray = alphabet;
	for(var i = 1; i < n; i++)
	{
		var pArray = cross(alphabet, pArray);
	};
	return pArray;
};

//says if a character is a mora
function isMora(x)
{
	if((x == "H") || (x == "L") || (x == "R") || (x == "F") || (x == "m"))
	{
		return true;
	}
	else
	{
		return false;
	};
};

//says if a character is a mora linked to 2 tones
function isContour(x)
{
	if((x == "R") || (x == "F"))
	{
		return true;
	}
	else
	{
		return false;
	};
};

function oppositeT(x)
{
	if(x == "H")
	{
		return "L";
	};
	if(x == "L")
	{
		return "H";
	};
};

//returns the first moraic character to the left of position i
function moraBefore(i,word)
{
	var mb = "";
	for(var j = (i-1); j > -1; j--)
	{
		var cur = word[j];
		if(isMora(cur))
		{
			mb = cur;
			break;
		};
	};
	return mb;
};

//returns the first moraic character to the right of position i
function moraAfter(i,word)
{
	var ma = "";
	for(var j = (i+1); j < word.length; j++)
	{
		var cur = word[j];
		if(isMora(cur))
		{
			ma = cur;
			break;
		};
	};
	return ma;
};

/*tone="H", returns "F"
  tone="L", returns "R"*/
function cStartingWith(tone)
{
	var a = "";
	if(tone == "H")
	{
		a = "F";
	};
	if(tone == "L")
	{
		a = "R";
	};
	return a;
};

/*tone="H", returns "R"
  tone="L", returns "F"*/
function cEndingWith(tone)
{
	var a = "";
	if(tone == "H")
	{
		a = "R";
	};
	if(tone == "L")
	{
		a = "F";
	};
	return a;
};

function mCountToEdge(string,i,cat,dir)
{
/* string	input string
   i		starting index
   cat		can be "word", "syl", or "sylX"
   dir		can be "left" or "right"
*/
	var mcount = 0;
	if(cat == "word")
	{
		//count to next # or edge of string, whichever closer
		if(dir == "left")
		{
			//go left until word boundary
			for(var j = i-1; j >= 0; j--)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if(cur == "#")
				{
					break;
				};
			};
		};
		if(dir == "right")
		{
			//go right until word boundary
			for(var j = i+1; j < string.length; j++)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if(cur == "#")
				{
					break;
				};
			};
		};
	};
	if(cat == "syl")
	{
		//count to the next [ or ]
		if(dir == "left")
		{
			//go left; counts # as syl-boundary
			for(var j = i-1; j >= 0; j--)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if((cur == "[") || (cur == "#") || (cur == "<"))
				{
					break;
				};
			};
		};
		if(dir == "right")
		{
			//go right; counts # as syl-boundary
			for(var j = i+1; j < string.length; j++)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if((cur == "]") || (cur == ">") || (cur == "#"))
				{
					break;
				};
			};
		};
	};
	if(cat == "sylX")
	{
		if(dir == "left")
		{
			var catExists = false;
			//check to see if there even is a < before i
			for(var j = i-1; j >= 0; j--)
			{
				var cur = string[j];
				if(cur == "<")
				{
					catExists = true;
					break;
				};					
			};
			if(catExists)
			{
				for(var j = i-1; j >= 0; j--)
				{
					var cur = string[j];
					if(isMora(cur))
					{
						mcount++;
					};
					if(cur == "<")
					{
						break;
					};
				};
			};
		};
		if(dir == "right")
		{
			var catExists = false;
			//check to see if there even is a > after i
			for(var j = i+1; j < string.length; j++)
			{
				var cur = string[j];
				if(cur == ">")
				{
					catExists = true;
					break;
				};
			};
			if(catExists)
			{
				for(var j = i+1; j < string.length; j++)
				{
					var cur = string[j];
					if(isMora(cur))
					{
						mcount++;
					};
					if(cur == ">")
					{
						break;
					};
				};
			};
		};

	};
	return mcount;
};

//GEN

function swToneGen(string)
{
	var candidates = [];
	var mcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(isMora(string[i]))
		{
			mcount++;
		};
	};
	var minv = ["H", "L", "R", "F", "m"];
	var nopunct = aStar(minv,mcount);
	for(var j = 0; j < nopunct.length; j++)
	{
		var inprep = nopunct[j];
		for(var l = 0; l < string.length; l++)
		{
			var cur = string[l];
			if(!isMora(cur))
			{
				inprep = inprep.substring(0,l).concat(cur).concat(inprep.substring(l));
			};
		};
		candidates.push(inprep);
	};
	return candidates;
};

function jToneGen(string)
{
	var candsForSpot = [];
	var candidates = [];
	var mcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(isMora(string[i]))
		{
			mcount++;
		};
	};
	var minv = ["H", "L", "R", "F", "m"];
	var nopunct = aStar(minv,mcount);
	for(var j = 0; j < nopunct.length; j++)
	{
		var inprep = nopunct[j];
		for(var l = 0; l < string.length; l++)
		{
			var cur = string[l];
			if(!isMora(cur))
			{
				inprep = inprep.substring(0,l).concat(cur).concat(inprep.substring(l));
			};
		};
		candidates.push(inprep);
	};
	for(var i = 0; i < candidates.length; i++)
	{
		var cur = candidates[i];
		var ioPair = [string,cur];
		candsForSpot.push(ioPair);
	};
	return candsForSpot;
};

function kjGen(string)
{
	var noGaps = [];
	var jset = jToneGen(string);
	for(var i = 0; i < jset.length; i++)
	{
		var cur = jset[i];
		if(!hasGap(cur))
		{
			noGaps.push(cur);
		};
	};
	return noGaps;
};

function hasGap(string)
{
	var gap = false;
	var prevT = "";
	var curT = "";
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if(((cur == "L") || (cur == "H")) && (prevT == cur) && (moraBefore(i,string) == "m"))
		{
			gap = true;
		};
		if((cur == "R") && (prevT == "L") && (moraBefore(i,string) == "m"))
		{
			gap = true;
		};
		if((cur == "F") && (prevT == "H") && (moraBefore(i,string) == "m"))
		{
			gap = true;
		};
		if(gap == true)
		{
			break;
		};
		if((cur == "H") || (cur == "R"))
		{
			prevT = "H";
		};
		if((cur == "L") || (cur == "F"))
		{
			prevT = "L";
		};
	};
	return gap;
};

function getTonalTier(string)
{
	var tTier = "";
	var ocpified = "";
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if((cur == "H") ||  (cur == "L"))
		{
			tTier = tTier.concat(cur);
		};
		if(cur == "R")
		{
			tTier = tTier.concat("LH");
		};
		if(cur == "F")
		{
			tTier = tTier.concat("HL");
		};
	};
	for(var j = 0; j < tTier.length; j++)
	{
		if(tTier[j] != tTier[j-1])
		{
			ocpified = ocpified.concat(tTier[j]);
		};
	};
	return ocpified;
};

//CONSTRAINTS

function atlWord(string)
{
	var h = alignT(string,"H","word","left");
	var l = alignT(string,"L","word","left");
	return h+l;
};

function atlSyl(string)
{
	var h = alignT(string,"H","syl","left");
	var l = alignT(string,"L","syl","left");
	return h+l;
};

function atrWord(string)
{
	var h = alignT(string,"H","word","right");
	var l = alignT(string,"L","word","right");
	return h+l;
};

function atrSyl(string)
{
	var h = alignT(string,"H","syl","right");
	var l = alignT(string,"L","syl","right");
	return h+l;
};

function ahlWord(string)
{
	return alignT(string,"H","word","left");
};

function ahlSyl(string)
{
	return alignT(string,"H","syl","left");
};

function ahrWord(string)
{
	return alignT(string,"H","word","right");
};

function ahrSyl(string)
{
	return alignT(string,"H","syl","right");
};

function allWord(string)
{
	return alignT(string,"L","word","left");
};

function allSyl(string)
{
	return alignT(string,"L","syl","left");
};

function alrWord(string)
{
	return alignT(string,"L","word","right");
};

function alrSyl(string)
{
	return alignT(string,"L","syl","right");
};


function alignT(string,tone,cat,dir)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if(dir == "left")
		{
			if((cur == tone) || (cur == cStartingWith(tone)))
			{
				var prevM = moraBefore(i,string);
				if((prevM != tone) && (prevM != cEndingWith(tone)))
				{
					vcount += mCountToEdge(string,i,cat,dir);
				};
			};
			if(cur == cEndingWith(tone))
			{
				vcount += mCountToEdge(string,i,cat,dir);
			};
		};
		if(dir == "right")
		{
			if((cur == tone) || (cur == cEndingWith(tone)))
			{
				var nextM = moraAfter(i,string);
				if((nextM != tone) && (nextM != cStartingWith(tone)))
				{
					vcount += mCountToEdge(string,i,cat,dir);
				}
			};
			if(cur == cStartingWith(tone))
			{
				vcount += mCountToEdge(string,i,cat,dir);
			};
		};
	};
	return vcount;
};

function star(tone,word)
{
	var vcount = 0;
	for(var i = 0; i < word.length; i++)
	{
		var cur = word[i];
		var prev = moraBefore(i,word);
		if((cur == tone) || (cur == cStartingWith(tone)))
		{
			if((prev != tone) && (prev != cEndingWith(tone)))
			{
				vcount++;
			};
		};
		if(cur == cEndingWith(tone))
		{
			vcount++;
		};
	};
	return vcount;
};

function toneToMora(tone,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if((cur == tone) || (cur == cStartingWith(tone)))
		{
			var prev = moraBefore(i,string);
			if((prev == tone) || (prev == cEndingWith(tone)))
			{
				vcount++;
			};
		};
	};
	return vcount;
};

function moraToTone(string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if((string[i] == "R") || (string[i] == "F"))
		{
			vcount++;
		};
	};
	return vcount;
};

//cat must be syl or sylX. i should add  word, etc.
function crispEdge(string,tone,cat)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		var prev = moraBefore(i,string);
		var next = moraAfter(i,string);
		if(cat == "sylX")
		{
			if((cur == "<") || (cur == ">"))
			{
				if((prev == tone) || (prev == cEndingWith(tone)))
				{
					if((next == tone) || (next == cStartingWith(tone)))
					{
						vcount++;
					};
				};
			};
		};
		if(cat == "syl")
		{
			if((cur == "[") || (cur == "<"))
			{
				if((prev == tone) || (prev == cEndingWith(tone)))
				{
					if((next == tone) || (next == cStartingWith(tone)))
					{
						vcount++;
					};
				};
			};
		};
	};
	return vcount;
};

function kjCrispEdge(string)
{
	var h = crispEdge(string,"H","syl");
	var l = crispEdge(string,"L","syl");
	return h+l;
};


function kjDep(string)
{
	var vcount = 0;
	var max = kjMax(string);
	var ttier = getTonalTier(string);
	var tcount = ttier.length;
	if((string[0] == "h") && (max == 1))
	{
		vcount = tcount;
	};
	if((string[0] == "h") && (max == 0))
	{
		vcount = tcount-1;
	};
	if((string[0] == "f") && (max == 2))
	{
		vcount = tcount;
	};
	if((string[0] == "f") && (max == 1))
	{
		vcount = tcount-1;
	};
	if((string[0] == "f") && (max == 0))
	{
		vcount = tcount-2;
	};
	if(vcount < 0)
	{
		vcount = 0;
	};
	return vcount;
};

function kjMax(string)
{
	var vcount = 0;
	var tTier = getTonalTier(string);
	if((string[0] == "h") && (tTier.indexOf("H") == -1))
	{
		vcount++;
	};
	if(string[0] == "f")
	{
		if(tTier.length == 1)
		{
			vcount++;
		};
		if(tTier == "LH")
		{
			vcount++;
		};
	};
	return vcount;
};

function kjInputs(sMin,sMax)
{
	var kji = [];
	for(var i = sMin; i <= sMax; i++)
	{
		var sylProfs = aStar(["[m]", "[mm]"], i);
		for(var j = 0; j < sylProfs.length; j++)
		{
			kji.push("h:".concat(sylProfs[j]));
			kji.push("f:".concat(sylProfs[j]));
		};
	};
	return kji;
};

var kjForms = kjInputs(1,4);

//UNNECESSARY
function eMoraToTone(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(moraToTone(cset[i]));
	};
	return vcounts;
};

function evalCrisp(cset,tone,cat)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = crispEdge(cand,tone,cat);
		vcounts.push(j);
	};
	return vcounts;
};

function ekjCrisp(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(kjCrispEdge(cset[i]));
	};
	return vcounts;
};

function eATR(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = allTonesRight(cand);
		vcounts.push(j);
	};
	return vcounts;
};

function eATL(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = allTonesLeft(cand);
		vcounts.push(j);
	};
	return vcounts;
};

function ekjMax(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(kjMax(cset[i]));
	};
	return vcounts;
};

function ekjDep(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(kjDep(cset[i]));
	};
	return vcounts;
};

//only works for markedness constraints
function evalAlignT(cset,tone,cat,dir)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = alignT(cand,tone,cat,dir);
		vcounts.push(j);
	};
	return vcounts;
};

function evalAlignAnyT(cset,cat,dir)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = alignT(cand,"H",cat,dir);
		var k = alignT(cand,"L",cat,dir);
		vcounts.push(j+k);
	};
	return vcounts;
};

function evalToneToMora(cset,tone)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = toneToMora(tone,cand);
		vcounts.push(j);
	};
	return vcounts;
};

function eToneToMora(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = toneToMora("H",cand);
		var k = toneToMora("L",cand);
		vcounts.push(j+k);
	};
	return vcounts;
};

var nagasaki = swToneGen("h:[m][m][m][m]");
var kagosima = swToneGen("f:[m][m][m][m]");
var wasinton = swToneGen("f:[m][mm][mm]");
var nagasakiken = swToneGen("h:[m][m][m][m][mm]");
var kagosimaken = swToneGen("f:[m][m][m][m][mm]");
//Ozan's code
function walkTree(node, foo) {
	if (foo(node) === false)
		return;
	if (node.children instanceof Array)
		for (var i = 0; i < node.children.length; i++)
			walkTree(node.children[i], foo);
}

function getLeaves2(root) {
	var leaves = [];
	walkTree(root, function(node) {
		if (!(node.children instanceof Array))
			leaves.push(node);
	});
	return leaves;
}

// matchSP2 and hasMatch2 are equivalents of older versions of matchSP and hasMatch (without category sensitivity)
function matchSP2(sParent, pTree) {
	var vcount = 0;
	walkTree(sParent, function(node) {
		if (!hasMatch2(getLeaves(node), pTree))
			vcount++;
	});
	return vcount;
}

function hasMatch2(sLeaves, pTree) {
	var result = false;
	walkTree(pTree, function(node) {
		if (sameIds(getLeaves(node), sLeaves)) {
			result = true;
			return false; // don't continue tree-traversal
		}
	});
	return result;
}
