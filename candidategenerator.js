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
   - addTones (boolean)
*/
window.GEN = function(sTree, words, options){
	options = options || {}; // if options is undefined, set it to an empty object (so you can query its properties without crashing things)
	
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
		leaves.push(omegafy(words[i]));
	}
	
	var recursiveOptions = {};
	for (var k in options) {
		if (options.hasOwnProperty(k) && k !== 'requirePhiStem')
			recursiveOptions[k] = options[k];
	}
	
	var rootlessCand = addPhiWrapped(gen(leaves, recursiveOptions), options);
	
	var candidates = [];
	for(var i=0; i<rootlessCand.length; i++){
		var iota = iotafy(rootlessCand[i], options);
		if (!iota)
			continue;
		if (options.obeysHeadedness && !iotaIsHeaded(iota))
			continue;
		if(options.addTones)
			addJapaneseTones(iota);
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
		if(typeof options.obeysExhaustivity ==="boolean" && options.obeysExhaustivity && !obeysExhaustivity('i', candidate)){
			return null;
		}
		else if (options.obeysExhaustivity instanceof Array && options.obeysExhaustivity.indexOf('i')>=0 && !obeysExhaustivity('i', candidate)){
			return null;
		}
	}
	//if we get here, there aren't any relevant exhaustivity violations
	return {id: 'iota', cat: 'i', children: candidate};
}

function omegafy(word){
	var myCat = 'w';
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

// conceptually, returns all possible parenthesizations of leaves that don't have a set of parentheses enclosing all of the leaves
// format: returns an array of parenthesizations, where each parenthesization is an array of children, where each child is
// either a phi node (with descendant nodes attached) or a leaf
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
			if(!rightsides[j].length || rightsides[j][0].cat === 'phi')
			{
				var cand = leftside.concat(rightsides[j]);
				candidates.push(cand);
			}
		}
	
		
	
		//Case 2: the first i words are wrapped in a phi
		if(i<leaves.length){
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
		if ((typeof options.obeysExhaustivity === "boolean" || options.obeysExhaustivity.indexOf('phi')>=0) && !obeysExhaustivity('phi', candidate))
			return null;
	}
	if (options && options.obeysNonrecursivity)
		for (var i = 0; i < candidate.length; i++)
			if (candidate[i].cat === 'phi')
				return null;
	return {id: 'phi'+(phiNum++), cat: 'phi', children: candidate};
}

//Takes a list of candidates and doubles it to root each of them in a phi
function addPhiWrapped(candidates, options){
	var origLen = candidates.length;
	var result = [];
	if (!options.requirePhiStem) {
		result = candidates;
	}
	for(var i=0; i<origLen; i++){
		if(candidates[i].length) {
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
		throw new Error("The provided clitic"+clitic+" was not found in the word list");
	//Slice the clitic out
	var beforeClitic = wordList.slice(0,cliticIndex);
	var afterClitic = wordList.slice(cliticIndex+1, wordList.length);
	var cliticlessWords = beforeClitic.concat(afterClitic);

	var orders = new Array(wordList.length);
	for(var i = 0; i < wordList.length; i++){
		beforeClitic = cliticlessWords.slice(0,i);
		afterClitic = cliticlessWords.slice(i, cliticlessWords.length);
		orders[i] = beforeClitic.concat([clitic+"-clitic"].concat(afterClitic));
	}
	return orders;
}

/* Arguments: 
	stree: a syntatic tree, with the clitic marked as cat: "clitic"
	words: optional string or array of strings which are the desired leaves
	options: options for GEN
*/
function genWithCliticMovement(stree, words, options){
	// Identify the clitic of interest
	var clitic = '';
	// First try to read it off the tree
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
			throw new Error("genWithCliticMovement was called but no node in stree has category clitic was provided in stree");
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
	if(words.length<leaves.length){
		words = leaves;
	}
	var wordOrders = generateWordOrders(words, clitic);
	var candidateSets = new Array(wordOrders.length);
	for(var i = 0; i<wordOrders.length; i++){
		candidateSets[i] = GEN(stree, wordOrders[i], options);
	}
	//candidateSets;
	return [].concat.apply([], candidateSets);
}
