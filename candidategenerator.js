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

(function() {
var phiNum = 0;
var wNum = 0;

/* Takes a list of words and returns the candidate set of trees (JS objects)
   Options is an object consisting of the parameters of GEN. Its properties can be:
   - obeysExhaustivity (boolean or array of categories at which to require conformity to exhaustivity)
   - obeysHeadedness (boolean)
   - obeysNonrecursivity (boolean)
	 - rootCategory (string)
	 - recursiveCategory (string)
	 - terminalCategory (string)
   - addTones (string). Possible values include:
	 		- "addJapaneseTones"
			- "addIrishTones_Elfner"
			- "addIrishTones_Kalivoda"
	- noUnary (boolean): if true, don't create any nodes that immediately dominate only a single terminal. 
*/
window.GEN = function(sTree, words, options){
	options = options || {}; // if options is undefined, set it to an empty object (so you can query its properties without crashing things)

	options.recursiveCategory = options.recursiveCategory || "phi"; //sets the default of recursiveCategory option to "phi"

	//set default root root category based on options passed
	if(!options.rootCategory){ //root category is unspecifed
		//recursiveCategory is specified as "w"
		if(options.recursiveCategory === "w"){
			options.rootCategory = "phi";
		}
		else{
			options.rootCategory = "i";
		}
	}

	//set default terminal category based on options passed
	if(!options.terminalCategory){ //terminalCategory is unspecified
		//terminalCategory unspecified, recursiveCategory specified as "i"
		if(options.recursiveCategory === "i"){
			options.terminalCategory = "phi";
		}
		//terminalCategory unspecified, recursiveCategory specified as "w"
		else if(options.recursiveCategory === "w"){
			options.terminalCategory = "Ft";
		}
		//neither terminalCategory nor recursiveCategory is specified, default to "w"
		else{
			options.terminalCategory = "w";
		}
	}

	/* the prosodic hierarchy should include the categories specified in
	 * options.rootCategory, options.recursiveCategory and options.terminalCategory
	 */
	if(options.rootCategory || options.recursiveCategory || options.terminalCategory){
		//the specified root category should probably be highest
		if(pCat.indexOf(options.rootCategory)<0)
			pCat.unshift(options.rootCategory);
		if(pCat.indexOf(options.recursiveCategory)<0 && options.rootCategory !== options.recursiveCategory){
			//the specified recursive category should be after iota
			try{
				var afterI = pCat.indexOf("i") + 1;
				pCat.splice(afterI, 0, options.recursiveCategory);
			}
			catch(err){
				console.error("make sure pCat contains your recursive category.");
			}
		}
		//the specified terminal category should be right above "syll"
		if(pCat.indexOf(options.terminalCategory)<0 && options.terminalCategory !== options.recursiveCategory && options.rootCategory !== options.terminalCategory)
			pCat.splice(-1, 0, options.terminalCategory);
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
	phiNum = wNum = 0;
	for(var i=0; i<words.length; i++){
		leaves.push(omegafy(words[i], options.terminalCategory));
	}

	var recursiveOptions = {};
	for (var k in options) {
		if (options.hasOwnProperty(k) && k !== 'requirePhiStem')
			recursiveOptions[k] = options[k];
	}

	/* if rootCategory and recursiveCategory are the same, we don't want to call
	 * addPhiWrapped becasue half of the candidates will have a root node with
	 * only one child, which will be of the same category, ie. {i {i (...) (...)}}
	 */
	var rootlessCand = gen(leaves, recursiveOptions)
	if(options.rootCategory !== options.recursiveCategory)
	 rootlessCand = addPhiWrapped(gen(leaves, recursiveOptions), options);

	var candidates = [];
	for(var i=0; i<rootlessCand.length; i++){
		var iota = iotafy(rootlessCand[i], options);
		if (!iota)
			continue;
		if (options.obeysHeadedness && !iotaIsHeaded(iota))
			continue;
		if (options.addTones){
			try {
				window[options.addTones](iota); //calls the function named in the string
			}
			catch(err){
				if (typeof(options.addTones) == "boolean"){
					addJapaneseTones(iota); //backwards compatibility
					console.log("The addTones option has been updated. It now takes the name of a function as its value. Next time, try {addTones: 'addJapaneseTones'}");
				}
				else{
					throw new Error("Something isn't right with the addTones option. The value of addTones must be a string with the name of a tone function, no parentheses, eg. {addTones: 'addJapaneseTones'}");
				}
			}
		}
		candidates.push([sTree, iota]);
	}
	return candidates;
}

function iotaIsHeaded(iota) {
	var children = iota.children || [];
	for (var i = 0; i < children.length; i++)
		if (children[i].cat === 'phi')
			return true;
	return false;
}

function obeysExhaustivity(cat, children) {
	for (var i = 0; i < children.length; i++)
		if (cat !== children[i].cat && pCat.nextLower(cat) !== children[i].cat){
			//console.log('violates Exhaustivity:',cat, 'next lower cat:',pCat.nextLower(cat), '; actual child cat:', children[i].cat);
			return false;
		}
	return true;
}

function iotafy(candidate, options){
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

function omegafy(word, cat){
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
*	either a phi node (with descendant nodes attached) or a leaf
* Options: 	
*/
function gen(leaves, options){
	var candidates = [];	//each candidate will be an array of siblings
	if(!(leaves instanceof Array))
		throw new Error(leaves+" is not a list of leaves.");

	//Base case: 0 leaves
	if(leaves.length === 0){
		candidates.push([]);
		return candidates;
	}



	//Recursive case: at least 1 word. Consider all candidates where the first i words are grouped together
	for(var i = 1; i <= leaves.length; i++){
		
		var rightsides = addPhiWrapped(gen(leaves.slice(i, leaves.length), options), options);

		//Case 1: the first i leaves attach directly to parent (no phi wrapping)

		var leftside = leaves.slice(0,i);

		// for case 1, we don't need to check the left side for nonrecursivity, because it's all leaves

		//Combine the all-leaf leftside with all the possible rightsides that have a phi at their left edge (or are empty)
		for(var j = 0; j<rightsides.length; j++){
			if(!rightsides[j].length || rightsides[j][0].cat === options.recursiveCategory)
			{
				var cand = leftside.concat(rightsides[j]);
				candidates.push(cand);
			}
		}



		//Case 2: the first i words are wrapped in a phi
		if(i<leaves.length){
			if(options.noUnary && i<2){
				continue;
				//Don't generate any candidates where the first terminal is in a phi by itself.
			}
			var phiLeftsides = gen(leaves.slice(0,i), options);
			for(var k = 0; k<phiLeftsides.length; k++)
			{
				var phiNode = phiify(phiLeftsides[k], options);
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

	}

	return candidates;
}

function phiify(candidate, options){
	// Check for Exhaustivity violations below the phi, if phi is listed as one of the exhaustivity levels to check
	if (options && options.obeysExhaustivity){
		if ((typeof options.obeysExhaustivity === "boolean" || options.obeysExhaustivity.indexOf(options.recursiveCategory)>=0) && !obeysExhaustivity(options.recursiveCategory, candidate))
			return null;
	}
	if (options && options.obeysNonrecursivity)
		for (var i = 0; i < candidate.length; i++)
			if (candidate[i].cat === options.recursiveCategory)
				return null;
	return {id: options.recursiveCategory+(phiNum++), cat: options.recursiveCategory, children: candidate};
}

//Takes a list of candidates and doubles it to root each of them in a phi
//If options.noUnary, skip phiifying candidates that are only 1 terminal long
function addPhiWrapped(candidates, options){
	var origLen = candidates.length;
	var result = [];
	if (!options.requirePhiStem) {
		result = candidates;
	}
	for(var i=0; i<origLen; i++){
		var candLen = candidates[i].length;
		if(candLen) {
			if(options.noUnary && candLen == 1){
				continue;
			}
			var phiNode = phiify(candidates[i], options);
			if (phiNode)
				result.push([phiNode]);
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
		if(clitic === '')
			throw new Error("GENWithCliticMovement was called but no node in stree has category clitic was provided in stree");
	}
	//Otherwise, get the clitic from words
	else
	{
		// Make sure words is an array
		if(typeof words === "string"){
			words = words.split(' ');
		}
		var x = words.find(containsClitic);
		clitic = x.split('-clitic')[0];
		words[words.indexOf(x)] = clitic;
	}

	//Make sure words is defined before using it to generate word orders
	if(!words || words.length<leaves.length){
		words = new Array(leaves.length);
		for(var i in leaves){
			words[i] = leaves[i].id;
		}
		console.log(words);
	}
	var wordOrders = generateWordOrders(words, clitic);
	var candidateSets = new Array(wordOrders.length);
	for(var i = 0; i<wordOrders.length; i++){
		candidateSets[i] = GEN(stree, wordOrders[i], options);
	}
	//candidateSets;
	return [].concat.apply([], candidateSets);
}
