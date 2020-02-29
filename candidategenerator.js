function deduplicateTerminals(terminalList) {
	//Check for duplicate words
	var occurrences = {};
	var dedupedTerminals = [];
	for(var i=0; i<terminalList.length; i++){
		var t = terminalList[i];
		//If this is the first occurrence of t, don't append an index
		if(!occurrences.hasOwnProperty(t)){
			dedupedTerminals.push(t);
			occurrences[t] = 1;
		}
		// If we've seen t before, then add an index to it such that the 2nd occurrence of t
		// becomes t_1.
		else{
			dedupedTerminals.push(t+'_'+occurrences[t]);
			occurrences[t] = occurrences[t] + 1;
		}
	}
	return dedupedTerminals;
}

//Move to the next recursive category, if there is one.
function pushRecCat(options){
	var nextIndex = options.recursiveCatIndex + 1;
	if(nextIndex > options.recursiveCats.length-1){
		return false;
	}
	else{
		var nextRecCat = options.recursiveCats[nextIndex];
		options.recursiveCategory = nextRecCat;
		options.recursiveCatIndex = nextIndex;
		return true;
	}
	 
}

//Move to the previous recursive category, if there is one.
function popRecCat(options){
	var prevIndex = options.recursiveCatIndex - 1;
	if(prevIndex < 0){
		return false;
	}
	else{
		var prevRecCat = options.recursiveCats[prevIndex];
		options.recursiveCategory = prevRecCat;
		options.recursiveCatIndex = prevIndex;
		return true;
	}
}

(function() {
var recNum = 0;
var terminalNum = 0;

/* Takes a list of words and returns the candidate set of trees (JS objects)
   Options is an object consisting of the parameters of GEN. Its properties can be:
   - obeysExhaustivity (boolean or array of categories at which to require conformity to exhaustivity)
   - obeysHeadedness (boolean)
   - obeysNonrecursivity (boolean)
	 - rootCategory (string)
	 - recursiveCategory (string) --> '-' separated list of categories, from highest to lowest (e.g. 'phi-w', not 'w-phi')
	 	-> saved in recursiveCats (see below) + becomes a string rep of the current recursive category
	 - terminalCategory (string)

	 - recursiveCatIndex (int): tracks which recursive category we're currently using
	 - recursiveCats (list of strings): list of recursive categories to use
   - addTones (string). Possible values include:
	 		- "addJapaneseTones"
			- "addIrishTones_Elfner"
			- "addIrishTones_Kalivoda"
	- noUnary (boolean): if true, don't create any nodes that immediately dominate only a single terminal.
	- requireRecWrapper (boolean). Formerly "requirePhiStem"
	- syntactic (boolean): are we generating syntactic trees?
*/
window.GEN = function(sTree, words, options){
	options = options || {}; // if options is undefined, set it to an empty object (so you can query its properties without crashing things)

	//Point to first recursiveCat
	options.recursiveCatIndex = 0;

	//Set the relevant category hierarchy (syntactic or prosodic) based on the GEN option syntactic
	var categoryHierarchy = options.syntactic ? sCat : pCat;

	// Check for multiple recursive categories
	if(options.recursiveCategory && options.recursiveCategory.length){
		var recCats = options.recursiveCategory.split('-');
		if(recCats.length > 1){
			console.log(recCats);
			
			//Set current recursiveCategory
			options.recursiveCategory = recCats[options.recursiveCatIndex];
			//Save list of all categories	
			options.recursiveCats = recCats;
		}
		if(recCats.length > 2){
			this.alert("You have entered more than 2 recursive categories!")
		}
	}

	if(!options.recursiveCats){
		options.recursiveCats = [options.recursiveCategory];
	}

	/* First, warn the user if they have specified terminalCategory and/or
	 * rootCategory without specifying recursiveCategory
	 */
	 if(!options.recursiveCategory && (options.rootCategory || options.terminalCategory)){
		if(!window.confirm("You have not specified the recursive category for GEN, it will default to 'phi'.\nClick OK if you wish to continue."))
			throw new Error("GEN was canceled by user.");
	}
	/* the prosodic hierarchy should include the categories specified in
	 * options.rootCategory, options.recursiveCategory and options.terminalCategory
	 * But if they are not, the default setting code throws unhelpful errors.
	 * The finally block throws more helpful errors and alert boxes instead
	 */
	
	//a flag for whether the user has included a novel category undefined in categoryHierarchy
	var novelCategories = false;
	try{
		//sets the default of recursiveCategory option to "phi"
		options.recursiveCategory = options.recursiveCategory || "phi";
		//sets the default of rootCategory based on recursiveCategory
		options.rootCategory = options.rootCategory || categoryHierarchy.nextHigher(options.recursiveCategory);
		//sets the default of terminalCategory based on recursiveCategory
		options.terminalCategory = options.terminalCategory|| categoryHierarchy.nextLower(options.recursiveCategory);
	}
	finally{
		if(options.rootCategory && categoryHierarchy.indexOf(options.rootCategory)<0){
			alert("Warning:\n"+options.rootCategory+" is not in SPOT's pre-defined prosodic hierarchy (see pCat and sCat in prosodicHierarch.js)");
			novelCategories = true;
			//throw new Error(options.rootCategory+" is not in SPOT's pre-defined prosodic hierarchy (see pCat in prosodicHierarch.js)");
		}
		if(categoryHierarchy.indexOf(options.recursiveCategory)<0){
			alert("Warning:\n"+options.recursiveCategory+" is not in SPOT's pre-defined prosodic hierarchy (see pCat and sCat in prosodicHierarch.js)");
			novelCategories = true;
			//throw new Error(options.recursiveCategory+" is not in SPOT's pre-defined prosodic hierarchy (see pCat in prosodicHierarch.js)");
		}
		if(options.terminalCategory && categoryHierarchy.indexOf(options.terminalCategory)<0){
			alert("Warning:\n"+options.terminalCategory+" is not in SPOT's pre-defined prosodic hierarchy (see pCat and sCat in prosodicHierarch.js)");
			novelCategories = true;
			//throw new Error(options.terminalCategory+" is not in SPOT's pre-defined prosodic hierarchy (see pCat in prosodicHierarch.js)");
		}
	}

	//Warnings for adverse GEN options combinations:
	if(options.rootCategory === options.recursiveCategory && options.obeysNonrecursivity){
		console.warn("You have instructed GEN to produce non-recursive trees and to produce trees where the root node and intermediate nodes are of the same category. Some of the trees GEN produces will be recursive.");
	}
	if(options.rootCategory === options.terminalCategory && options.obeysNonrecursivity){
		console.warn("You have instructed GEN to produce non-recursive trees and to produce trees where the root node and terminal nodes are of the same category. All of the trees GEN produces will be recursive.");
	}
	if(options.recursiveCategory === options.terminalCategory && options.obeysNonrecursivity){
		console.warn("You have instructed GEN to produce non-recursive trees and to produce trees where the intermediate nodes and the terminal nodes are of the same category. You will only get one bracketing.");
	}

	//Perform additional checks of layering if novel categories are involved.
	if(!novelCategories){
		if(categoryHierarchy.isHigher(options.recursiveCategory, options.rootCategory) || categoryHierarchy.isHigher(options.terminalCategory, options.recursiveCategory)){
			console.warn("You have instructed GEN to produce trees that do not obey layering. See pCat and sCat in prosodicHierarchy.js");
		}
		else{
			if(options.recursiveCategory !== categoryHierarchy.nextLower(options.rootCategory) && options.recursiveCategory !== options.rootCategory){
				console.warn(""+options.recursiveCategory+" is not directly below "+options.rootCategory+" in the prosodic hierarchy. None of the resulting trees will be exhaustive because GEN will not generate any "+categoryHierarchy.nextLower(options.rootCategory)+"s. See pCat and sCat in prosodicHierarchy.js");
			}
			if(options.terminalCategory !== categoryHierarchy.nextLower(options.recursiveCategory) && options.terminalCategory !== options.recursiveCategory){
				console.warn(""+options.terminalCategory+" is not directly below "+options.recursiveCategory+" in the prosodic hierarchy. None of the resulting trees will be exhaustive because GEN will not generate any "+categoryHierarchy.nextLower(options.recursiveCategory)+"s. See pCat and sCat in prosodicHierarchy.js");
			}
		}
	}

	if(typeof words === "string") { // words can be a space-separated string of words or an array of words; if string, split up into an array
		if (!words) { // if empty, scrape words from sTree
			words = getLeaves(sTree);
			for (var i = 0; i < words.length; i++) {
				var catSuffix = '';
				if (words[i].cat == 'clitic'){
					catSuffix = '-clitic';
				}
				var accentSuffix = '';
				if(words[i].accent){
					accentSuffix = '-'+words[i].accent;
				}
				words[i] = words[i].id+catSuffix+accentSuffix;
			}
		} else {
			words = words.split(' ');
			words = deduplicateTerminals(words);
		}
	} else {
		words = deduplicateTerminals(words);
	}

	var leaves = [];
	recNum = terminalNum = 0;
	for(var i=0; i<words.length; i++){
		leaves.push(wrapInLeafCat(words[i], options.terminalCategory));
	}

	var recursiveOptions = {};
	for (var k in options) {
		if (options.hasOwnProperty(k) && k !== 'requireRecWrapper')
			recursiveOptions[k] = options[k];
	}

	/* if rootCategory and recursiveCategory are the same, we don't want to call
	 * addRecCatWrapped becasue half of the candidates will have a root node with
	 * only one child, which will be of the same category, ie. {i {i (...) (...)}}
	 */
	var rootlessCand = gen(leaves, recursiveOptions)
	if(options.rootCategory !== options.recursiveCategory)
	 rootlessCand = addRecCatWrapped(gen(leaves, recursiveOptions), options);

	var candidates = [];
	for(var i=0; i<rootlessCand.length; i++){
		var pRoot = wrapInRootCat(rootlessCand[i], options);
		if (!pRoot)
			continue;
		if (options.obeysHeadedness && !obeysHeadedness(pRoot))
			continue;
		/* if (options.addTones){
			try {
				window[options.addTones](pRoot); //calls the function named in the string
				//console.log(parenthesizeTree(pRoot, {showTones: options.addTones}));
			}
			catch(err){
				if (typeof(options.addTones) == "boolean"){
					addJapaneseTones(pRoot); //backwards compatibility
					console.log("The addTones option has been updated. It now takes the name of a function as its value. Next time, try {addTones: 'addJapaneseTones'}");
				}
				else{
					throw new Error("Something isn't right with the addTones option. The value of addTones must be a string with the name of a tone function, no parentheses, eg. {addTones: 'addJapaneseTones'}. You used: "+options.addTones);
				}
			}
		} */
		candidates.push([sTree, pRoot]);
	}
	return candidates;
}

/* Function to check if a tree obeys headedness. Each node must either be be
 * terminal or have at least one child of the category immidately below its own
 * on the prosodic hierarch. Otherwise, return false. Written as a recursive
 * function, basically a constraint.
 */
function obeysHeadedness(tree){
	//inner function
	function nodeIsHeaded(node) {
		/* Function to check if a node is headed. Relies on the prosodic hierarchy being
		 * properly defined. Returns true iff 
		 * a. one of the node's children is of the category directly below its own category *    on the prosodic hierarchy,
		 * b. one of the node's descendants is of the same category as the node
		 * c. the node is terminal.
		 */
		var children = node.children;
		//vacuously true if node is terminal
		if (!children)
			return true;
		for (var i = 0; i < children.length; i++)
			if (children[i].cat === pCat.nextLower(node.cat) 
			|| children[i].cat === node.cat){
				return true;
			}
			return false;
	}

	//outer function
	//first, check the parent node
	if (!nodeIsHeaded(tree))
		return false;
	//return false if one of the children does not obey headedness
	if (tree.children){
		for (var x = 0; x<tree.children.length; x++){
			if (!obeysHeadedness(tree.children[x])) //recursive function call
				return false;
		}
	}
	//if we get this far, the tree obeys headedness
	return true;
}

function obeysExhaustivity(cat, children) {
	for (var i = 0; i < children.length; i++)
		if (cat !== children[i].cat && pCat.nextLower(cat) !== children[i].cat){
			//console.log('violates Exhaustivity:',cat, 'next lower cat:',pCat.nextLower(cat), '; actual child cat:', children[i].cat);
			return false;
		}
	return true;
}

function wrapInRootCat(candidate, options){
	if (options && options.obeysExhaustivity){ // check that options.obeysExhaustivity is defined
		if(typeof options.obeysExhaustivity ==="boolean" && options.obeysExhaustivity && !obeysExhaustivity(options.rootCategory, candidate)){
			return null;
		}
		else if (options.obeysExhaustivity instanceof Array && options.obeysExhaustivity.indexOf(options.rootCategory)>=0 && !obeysExhaustivity(options.rootCategory, candidate)){
			return null;
		}
	}
	//if we get here, there aren't any relevant exhaustivity violations
	return {id: 'root', cat: options.rootCategory, children: candidate};
}

function wrapInLeafCat(word, cat){
	var myCat = cat || 'w';
	var wordId = word;
	var isClitic = word.indexOf('-clitic')>=0;
	if (isClitic){
		myCat = 'syll';
		wordId = wordId.split('-clitic')[0];
	}
	var wordObj = {cat: myCat};
	var accented = word.indexOf('-accented') >= 0;
	var	unaccented = word.indexOf('-unaccented') >= 0;
	if(accented){
		wordObj.accent = 'a';
		wordId = wordId.split('-accented')[0];
	}
	else if(unaccented){
		wordObj.accent = 'u';
		wordId = wordId.split('-unaccented')[0];
	}
	wordObj.id = wordId;
	return wordObj;
}

/*Conceptually, returns all possible parenthesizations of leaves that don't
*	have a set of parentheses enclosing all of the leaves
* Format: returns an array of parenthesizations, where each parenthesization
*	is an array of children, where each child is
*	either a node of category recursiveCategory (with descendant nodes attached) 
*	or a leaf (of category terminalCategory)
* Options:
*/
function gen(leaves, options){
	
	var candidates = [];	//each candidate will be an array of siblings
	var cand;
	if(!(leaves instanceof Array))
		throw new Error(leaves+" is not a list of leaves.");

	//Base case: 0 leaves
	if(leaves.length === 0){
		candidates.push([]);
		return candidates;
	}

	//Recursive case: at least 1 terminal. Consider all candidates where the first i words are grouped together
	for(var i = 1; i <= leaves.length; i++){

		//First, create the right sides:
		var rightLeaves = leaves.slice(i, leaves.length);
		
		//recursion at top level
		var rightsides = addRecCatWrapped(gen(rightLeaves, options), options);
		

		//Then create left sides and combine them with the right sides.
		//Case 1: the first i leaves attach directly to parent (no wrapping in a recursive category)

		var leftside = leaves.slice(0,i);

		// for case 1, we don't need to check the left side for nonrecursivity, because it's all leaves

		//Combine the all-leaf leftside with all the possible rightsides that have a phi at their left edge (or are empty)
		for(var j = 0; j<rightsides.length; j++){
			if(!rightsides[j].length || rightsides[j][0].cat === options.recursiveCategory)
			{
				cand = leftside.concat(rightsides[j]);
				candidates.push(cand);
			}
		}

		//Try to build left-sides that are wrapped in the next lower recursive category but aren't wrapped in the current recursive category
		if(pushRecCat(options)){
			var wLeftside = wrapInRecCat(leftside, options);
			popRecCat(options);
			if(wLeftside){
				console.log(i, "wLeftside:", wLeftside);
				//Combine the all-leaf leftside with all the possible rightsides that have a phi at their left edge (or are empty)
				for(var j = 0; j<rightsides.length; j++){
					if(rightsides[j].length)
					{
						cand = [wLeftside].concat(rightsides[j]);
						candidates.push(cand);
					}
				}
			}
			
        }


		
		if(i<leaves.length){
			if(options.noUnary && i<2){
				continue;
				//Don't generate any candidates where the first terminal is in an intermediate level node by itself.
			}

			//Case 2: the first i words are wrapped in an intermediate level node
			var phiLeftsides = gen(leaves.slice(0,i), options);
			for(var k = 0; k<phiLeftsides.length; k++)
			{
				var phiNode = wrapInRecCat(phiLeftsides[k], options);
				if (!phiNode)
					continue;
				var leftside = [phiNode];

				for(var j = 0; j<rightsides.length; j++)
				{
					cand = leftside.concat(rightsides[j]);
					candidates.push(cand);
				}
			}
 
		}

		//Now try to use recursion at the next recursive category
		// if(pushRecCat(options)){
		// 	//console.log("Recursive category:", options.recursiveCategory);

		// 	var noUnary = options.noUnary;
		// 	if(options.recursiveCategory===options.terminalCategory){
		// 		options.noUnary = true;
		// 	}
			
		// 	var wLeftSides = addRecCatWrapped(gen(leaves.slice(0,i), options), options);
		// 	options.noUnary = noUnary;

		// 	//Case 3: The left side is wrapped in the next lower recursive cat
		// 	if(options.recursiveCategory !== options.terminalCategory || i > 1){
		// 		console.log(options.recursiveCategory, options.terminalCategory, i);
		// 		for(var m = 0; m<wLeftSides.length; m++){
		// 			// var wNode = wrapInRecCat(wLeftSides[m], options);
		// 			// if(!wNode)
		// 			// 	continue;
		// 			var leftside = wLeftSides[m];
	
		// 			for(var n = 0; n<rightsides.length; n++){
		// 				cand = leftside.concat(rightsides[n]);
		// 				candidates.push(cand);
		// 			}
		// 		}
		// 	}
			
			
		// 	popRecCat(options);
		// }

	}

	//Now try to use recursion at the next recursive category
	if (pushRecCat(options)) {
		var noUnary = options.noUnary;
		if(options.recursiveCategory===options.terminalCategory){
			options.noUnary = true;
			console.log('noUnary set to true', options.recursiveCategory, options.terminalCategory, options.noUnary);
		}
		var wCands = gen(leaves, options);
		//Uncommenting these lines to replace the following ones leads to lots of empty stuff in the output
		/*var wCands2 = addRecCatWrapped(wCands, options);
		candidates.push(wCands2);
		*/
		
		// Starting i at 1 here eliminates the duplication of ([.w a b ]) when a.cat and b.cat = w, but also erroneously eliminates a whole bunch of candidates when a.cat, b.cat = Ft, and isn't a general fix for the longer cases.
		for (var i = 0; i < wCands.length; i++) {
			cand = wCands[i];
			var wrappedCand = wrapInRecCat(cand, options);
			
			if(wrappedCand)
				candidates.push([wrappedCand]);
				// candidates.push(cand);
		}
		
		options.noUnary = noUnary;
		popRecCat(options);
	}

	return candidates;
}

function wrapInRecCat(candidate, options){
	// Check for Exhaustivity violations below the phi, if phi is listed as one of the exhaustivity levels to check
	if (options && options.obeysExhaustivity){
		if ((typeof options.obeysExhaustivity === "boolean" || options.obeysExhaustivity.indexOf(options.recursiveCategory)>=0) && !obeysExhaustivity(options.recursiveCategory, candidate))
			return null;
	}
	if (options && options.obeysNonrecursivity)
		for (var i = 0; i < candidate.length; i++)
			if (candidate[i].cat === options.recursiveCategory){
				return null;
			}
				

	// Don't wrap anything in a recursive category that is already wrapped in one
	if (candidate.length < 2 && candidate[0] && candidate[0].cat === options.recursiveCategory){
		console.log("wrapInRecCat", options.recursiveCategory, candidate);
		console.log("Not wrapping ", candidate);
		return null;
	}

	return {id: options.recursiveCategory+(recNum++), cat: options.recursiveCategory, children: candidate};
}

//Takes a list of candidates and doubles it to root each of them in a phi
//If options.noUnary, skip wrapInRecCat-ing candidates that are only 1 terminal long
function addRecCatWrapped(candidates, options){
	var origLen = candidates.length;
	var result = [];
	if (!options.requireRecWrapper) {
		result = candidates;
	}
	for(var i=0; i<origLen; i++){
		var candLen = candidates[i].length;
		if(candLen) {
			if(options.noUnary && candLen == 1){
				continue;
			}
			
			var phiNode = wrapInRecCat(candidates[i], options);
			if (phiNode){
				result.push([phiNode]);
			}
		}
	}
	return result;
}

})();

function containsClitic(x){
	return x.indexOf("clitic")>-1;
}

function generateWordOrders(wordList, clitic){
	if(typeof wordList === 'string'){
		var cliticTagIndex = wordList.indexOf("-clitic");
		if(cliticTagIndex > 0){
			var wordListParts = wordList.split("-clitic");
			wordList = wordListParts[0]+wordListParts[1];
		}
		wordList = wordList.split(' ');
	}
	//Find the clitic to move around
	var cliticIndex = wordList.indexOf(clitic);
	if(cliticIndex < 0)
		throw new Error("The provided clitic "+clitic+" was not found in the word list");
	//Slice the clitic out
	var beforeClitic = wordList.slice(0,cliticIndex);
	var afterClitic = wordList.slice(cliticIndex+1, wordList.length);
	var cliticlessWords = beforeClitic.concat(afterClitic);

	var orders = new Array(wordList.length);
	for(var i = 0; i <= cliticlessWords.length; i++){
		beforeClitic = cliticlessWords.slice(0,i);
		afterClitic = cliticlessWords.slice(i, cliticlessWords.length);
		orders[i] = beforeClitic.concat([clitic+"-clitic"], afterClitic);
	}
	return orders;
}

/* Arguments:
	stree: a syntatic tree, with the clitic marked as cat: "clitic"
	words: optional string or array of strings which are the desired leaves
	options: options for GEN

   Returns: GEN run on each possible order of the words, where possible orders
   are those where terminals other than the clitic remian in place but the clitic can occupy any position.

   Caveat: If there are multiple clitics, only the first will be moved.
*/
function GENwithCliticMovement(stree, words, options){
	// Identify the clitic of interest
	var clitic = '';
	// First try to read words and clitic off the tree
	var leaves = getLeaves(stree);
	if(leaves.length > 0 && leaves[0].id){
		console.log(leaves);
		var leaf = 0;
		while(clitic === '' && leaf < leaves.length){
			if(leaves[leaf].cat==="clitic")
				clitic = leaves[leaf].id;
			leaf++;
		}
		if(clitic === ''){
			console.warn("GENWithCliticMovement was called but no node in stree has category clitic was provided in stree");
			console.log(stree);
			return GEN(stree, words, options);
			//throw new Error("GENWithCliticMovement was called but no node in stree has category clitic was provided in stree");

		}
	}
	//Otherwise, get the clitic from words
	else
	{
		// Make sure words is an array
		if(typeof words === "string"){
			words = words.split(' ');
		}
		var x = words.find(containsClitic);
		if(!x){ //x is undefined if no word in "words" contains "clitic"
			console.warn("GENWithCliticMovement was called but no node in stree has category clitic was provided in stree");
			console.log(stree);
			return GEN(stree, words, options);
		}
		clitic = x.split('-clitic')[0];
		words[words.indexOf(x)] = clitic;
	}

	//Make sure words is defined before using it to generate word orders
	if(!words || words.length<leaves.length){
		words = new Array(leaves.length);
		for(var i in leaves){
			words[i] = leaves[i].id;
		}
		//console.log(words);
	}
	var wordOrders = generateWordOrders(words, clitic);
	var candidateSets = new Array(wordOrders.length);
	for(var i = 0; i<wordOrders.length; i++){
		candidateSets[i] = GEN(stree, wordOrders[i], options);
	}
	//candidateSets;
	return [].concat.apply([], candidateSets);
}
