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
	- requireRecWrapper (boolean). Formerly "requirePhiStem"
	- syntactic (boolean): are we generating syntactic trees?
   - ph (prosodic heirarchy object):
   	pCat: custom pCat used in GEN
	categoryPairings: custom category pairings passed to makeTableau passed to constraints
*/
window.GEN = function(sTree, words, options){
	options = options || {}; // if options is undefined, set it to an empty object (so you can query its properties without crashing things)
	// create the ph object if none was passed
	if (!options.ph){
		options.ph = {}
	}
	// set default pCat if none exists
	if (!options.ph.pCat){
		options.ph.pCat = ["u", "i", "phi", "w", "Ft", "syll"];
	}
	// set default category pairings value if none exists
	if (!options.ph.categoryPairings){
		options.ph.categoryPairings = {
			"clause": "i",
			"cp": "i",
			"xp": "phi",
			"x0": "w"
		};

	}
	// use the custom pCat 
	var categoryHierarchy = options.syntactic ? sCat : options.ph.pCat;
	//var categoryHierarchy = options.syntactic ? sCat : pCat;
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
	options.counters = {
		recNum: 0
	}
	for(var i=0; i<words.length; i++){
		leaves.push(wrapInLeafCat(words[i], options.terminalCategory, options.syntactic));
	}

	return GEN_impl(sTree, leaves, options);
}

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

function wrapInLeafCat(word, cat, syntactic){
	var myCat = cat || 'w';
	var wordId = word;
	var isClitic = word.indexOf('-clitic')>=0;
	if (isClitic){
		myCat = syntactic ? 'clitic' : 'syll'; //syntactic tree vs prosodic trees
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
