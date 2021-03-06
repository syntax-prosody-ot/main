/* Assign a violation for every node whose leftmost daughter constituent is of type k
*  and is lower in the prosodic hierarchy than its sister constituent immediately to its right: *(Kn Kn-1)
*  Elfner's StrongStart(k).
*
*  If k is absent, use any category (Selkirk's StrongStart which Elfner also uses).
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

		// If not indexed to any particular category k, then we don't care what leftmostCat is
		// Otherwise we want leftmostCat to equal k.
		if((!k || leftmostCat===k) && (pCat.isLower(leftmostCat, sisterCat)))
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

/* Hsu 2016, p. 195
	"STRONGSTART(k/p)
	Assign a violation mark for every prosodic constituent whose leftmost daughter
	constituent is of type k and is lower in the Prosodic Hierarchy than its sister
	constituent immediately to the right, where k is at the left edge of a prosodic
	constituent p.

	The relevant notion of 'left edge' is defined as follows:
	(57) A prosodic constituent k is at the left edge of prosodic constituent p iff.
	a. p dominates k, and
	b. no prosodic constituent that both dominates k and is dominated by p has a
	leftmost daughter constituent that does not contain k."

	Note that the violations are for each parent with immediate daughter k at its edge (i.e., for every k), not for every p with k at its left edge at any depth.
*/

function strongStart_Hsu(s, ptree, k, p, node){

	/* Since we cannot search up the tree, the original tree must be retained 
	to determine whether a node of cat p dominates a node of cat k. We keep a 
	reference to the root ptree, while node refers to the object that is 
	currently being assessed as a weakly-starting parent of a node with category k.
	*/
	node = node || ptree;

	//base case: node is a leaf or only has one child
	if(!node.children){
		return 0;
	}
	
	var vcount = 0;
	
	// if node.children[0].cat === k and has a sibling, then compare it with its sibling as well as for domination by a node of cat p along the left edge.
	if(node.children.length>1 && node.children[0].cat === k){		
		if((pCat.isLower(node.children[0].cat, node.children[1].cat)) && catDomsIdAtLeftEdge(ptree, p, node.id)){ // searches tree for node of cat p dominating this node of cat k
			vcount++;
		}
	}
	
	// Recurse
	for(var i=0; i<node.children.length; i++){
		child = node.children[i];
		vcount += strongStart_Hsu(s, ptree, k, p, child);
	}
	
	return vcount;
}

//Wrapper functions for strongStart_Hsu to deal with the problem of having two separate category arguments
function strongStart_Hsu_phi(s, ptree, k)
{
	return strongStart_Hsu(s, ptree, k,'phi');
}

function strongStart_Hsu_iota(s, ptree, k)
{
	return strongStart_Hsu(s, ptree, k, 'i');
}

//can't be parameterized to a category at present -- k is ignored
function strongEndLocal(s, ptree, k){

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	if(ptree.children.length>1){		
		var rightmostCat = ptree.children[ptree.children.length-1].cat;
		var sisterCat = ptree.children[ptree.children.length-2].cat;
		
		//console.log(leftmostCat);
		//console.log(sisterCat);
		//console.log(pCat.isLower(leftmostCat, sisterCat));

		if(pCat.isLower(rightmostCat, sisterCat))
		{
			vcount++;
			//console.log("strongEndLocal violation: "+ptree.children[0]+" "+ptree.children[1]);
		}
	}
	
	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongEndLocal(s, child, k);
	}
	
	return vcount;
}

/* Constraint from Sabbagh (2014, p. 62) "Word Order and Prosodic-Structure Constraints in Tagalog":

Weak Start: *(π₁π₂..., where π₁ > π₂
A prosodic constituent begins with a leftmost daughter that is no higher on the prosodic hierarchy than the constituent that immediately follows.
*/
function weakStartLocal(s, ptree, k){

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	if(ptree.children.length>1){		
		var leftmostCat = ptree.children[0].cat;
		var sisterCat = ptree.children[1].cat;

		if(pCat.isHigher(leftmostCat, sisterCat))
		{
			vcount++;
		}
	}
	
	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += weakStartLocal(s, child, k);
	}
	
	return vcount;
}

/* Assign a violation for every node of category cat whose leftmost daughter constituent
*  is lower in the prosodic hierarchy than any sister constituent to its right.
*  (intuitive strong start, according to the intuition of Bellik & Kalivoda 2019) 
*  Updated Jan 2020 to penalize structures like (a b (c)) as well as (a (b c)). 
*  The previous definition only looked at the first and second sisters.
*  Updated Sept. 2020 to include an option to restrict this to the maximal node of category cat
* Updated Oct. 2020 to make the restriction on parent category optional.
*/

function strongStart(s, ptree, cat, options){

	options = options || {};
	markMinMax(ptree);

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	if((!cat || ptree.cat === cat) && ptree.children.length>1 && !(options.maximal && !ptree.isMax)){
		//If we only want to look at maximal nodes and this one isn't maximal, then don't evaluate it further.
		var leftmostCat = ptree.children[0].cat;
		for(var i = 1; i<ptree.children.length; i++){
			var sisterCat = ptree.children[i].cat;
			//console.log(leftmostCat, sisterCat, pCat.isLower(leftmostCat, sisterCat));

			if(pCat.isLower(leftmostCat, sisterCat))
			{
				vcount++;
				break;
			}
		}
	}
	
	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongStart(s, child, cat, options);
	}
	
	return vcount;
}

/* Assign a violation for every node whose leftmost daughter constituent
*  is lower in the prosodic hierarchy than its sister constituent immediately to its right.
*  Sensitive to whether nodes are (non)minimal: phi min is lower than phi non-min
*  Not sensitive to the category of the parent.
*  (Van Handel's strongStart from SPOT2 2019)
*/

function strongStart_SubCat(s, ptree, cat){
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
		vcount += strongStart_SubCat(s, child, cat);
	}
	
	return vcount;
}

/* Assign a violation for every node of category > w whose leftmost daughter constituent
*  is of category < w (a syllable or foot).
*  (proposed by Bennett, Elfner & McCloskey 2016 on Irish clitic placement)
*/
function strongStartClitic(s, ptree, cat){

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	//Corrected 2/5/21: this was checking that ptree.children.length>1, which is not correct since strongStartClitic as defined in BEM doesn't care how many children are present
	if(pCat.isHigher(ptree.cat, 'w') && ptree.children.length){		
		var leftmostCat = ptree.children[0].cat;

		if(pCat.isLower(leftmostCat, 'w'))
		{
			vcount++;
		}
	}
	
	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongStartClitic(s, child, cat);
	}
	
	return vcount;

}

/** Category-independent version of strongStartClitic.
 * Proposed by Jennifer Bellik in SS-ES stringency chapter in AOT book
 * as a generalized version of the hyperlocally-scoped SS constraint
 * in Bennett, Elfner, & McCloskey 2016. May also be conceived of as
 * Exhaustivity enforced at the left edge only.
 * 
 * "Assign a violation for every node of category k whose first daughter
 * is of category < k-1." (Bellik 2021)
 * 
*/
function ssHypLoc(stree, ptree, cat){
	var vcount = 0;

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return vcount;
	}

	if(ptree.children.length){		
		var parentCat = ptree.cat;
		var firstChildCat = ptree.children[0].cat;

		if(pCat.isLower(firstChildCat, pCat.nextLower(parentCat)))
		{
			vcount++;
		}
	}

	// Recurse
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += ssHypLoc(stree, child, cat);
	}
	//Code for going through the tree and evaluate for some structure goes here
	return vcount;
}

/* Strong start (cat init)
 * Assign one violation for every node of category k that is initial in a node of category
 * k+2 and sister to a node of category k+1
 */
function strongStartInit(stree, ptree, cat){
	let offendingNodes = totalDescender(ptree, cat, false);
	let result = [];
	for(var i = 0; i < offendingNodes.length; i++){
		if(result.indexOf(offendingNodes[i]) < 0){result.push(offendingNodes[i]);}
	}
	return result.length;

	//Function that takes a tree and returns all nodes in the tree for which violation returns true
	// tree = current sub-tree
	// category = specified category in constraint call
	// catInitial -- what is this?
	function totalDescender(tree, category, catInitial){
		let result = [];
		kPlus2 = pCat.isHigher(tree.cat, pCat.nextHigher(category));
		if(tree.children && tree.children.length){
			//Base case: evaluate current node for violation
			if(violation()){
				result.push(tree.children[0]);
			}

			//If catInitial is false and there is a category two steps up the prosodic hierarchy
			if(!catInitial && kPlus2){
				result = result.concat(totalDescender(tree.children[0], category, tree.cat));
				//Add violations from a recursive call on the first child
				//with catInitial set to the current tree's category
			}
			else{
				result = result.concat(totalDescender(tree.children[0], category, catInitial));
			}

			//Recursive call on each child of current tree
			for(var i = 1; i < tree.children.length; i++){
				result = result.concat(totalDescender(tree.children[i], category, false));
			}
		}
		return result;

		/* If the first child in the current tree is lower in category than its sister, return true
		*/
		function violation(){
			let bool = true;
			let parent = tree;
			let init = tree.children[0];
			let peninit = tree.children[1];
			// No violation if the category of the initial child isn't the specified category.
			// We should consider whether this should actually be: the specified category *or lower*. i.e., if you get a violation for {w phi}, you would certainly also get a violation for {ft phi}
			if(init && init.cat !== category){bool = false;}
			// No violation if the immediate sister to the initial node is not of a higher category
			// This definitely needs to be revised to look at all sisters.
			if(peninit && !pCat.isHigher(peninit.cat, init.cat)){bool = false;}
			// No violation if the tree's category isn't at least 2 categories up from the specified category AND catInitial (passed in from calling function totalDescender)
			if(!pCat.isHigher(parent.cat, pCat.nextHigher(category)) && !catInitial){bool = false;}
			return bool;
		}
	}
}


/** A helper function for strongStart_Hsu() that determines 
 * whether a tree contains a node of category cat that has 
 * a node with id "id" at its left edge at any depth. 
 * 
 * Arguments:
 * - tree: a prosodic or syntactic tree to search through
 * - cat: a string representing a node category
 * - id: a string representing the id of a node to look for at a left edge
 * 
 * Returns true if tree contains a node of category cat which has, 
 * at its left edge, a node with the specified id. 
 * Otherwise returns false.
 * 
 * Depends on hasIdAtLeftEdge()
 */
function catDomsIdAtLeftEdge(tree, cat, id){
	if(!tree.children){
		return false;
	}
	if(tree.cat === cat && (hasIdAtLeftEdge(tree, id) || tree.id === id)){
		return true;
	}
	else {
		for(var i=0; i<tree.children.length; i++){
			if(catDomsIdAtLeftEdge(tree.children[i], cat, id)){
				return true;
			}
		}
	}
}

/**A helper function for catDomsIdAtLeftEdge(). 
 * 
 * Arguments: 
 * - tree: a prosodic or syntactic tree to search through
 * - id: a string representing the id of a node to look for
 * 
 * Returns true if the tree has a node with the specified id at its left edge at any depth.
 * Otherwise, returns false.
*/
function hasIdAtLeftEdge(tree, id){
	if(!tree.children){
		return false;
	}
	if(tree.children[0].id === id){
		return true;
	}
	else {
		return hasIdAtLeftEdge(tree.children[0], id);
	}
}
