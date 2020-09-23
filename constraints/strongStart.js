/* Assign a violation for every node whose leftmost daughter constituent is of type k
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

		if(pCat.isLower(leftmostCat, sisterCat))
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
*  is lower in the prosodic hierarchy than any sister constituent to its right.
*  (intuitive strong start, according to the intuition of Bellik & Kalivoda 2019) 
*  Updated Jan 2020 to penalize structures like (a b (c)) as well as (a (b c)). 
*  The previous definition only looked at the first and second sisters.
*  Updated Sept. 2020 to include an option to restrict this to the maximal node of category cat
*/

function strongStart(s, ptree, cat, options){

	options = options || {};
	markMinMax(ptree);

	//base case: ptree is a leaf or only has one child
	if(!ptree.children){
		return 0;
	}
	
	var vcount = 0;
	
	if(ptree.cat === cat && ptree.children.length>1 && !(options.maximal && !ptree.isMax)){
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
	
	if(pCat.isHigher(ptree.cat, 'w') && ptree.children.length>1){		
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
