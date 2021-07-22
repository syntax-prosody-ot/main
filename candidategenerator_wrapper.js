/* Takes a list of words and returns the candidate set of trees (JS objects)
   Options is an object consisting of the parameters of GEN. Its properties can be:
   - obeysExhaustivity (boolean or array of categories at which to require conformity to exhaustivity)
   - obeysHeadedness (boolean)
   - obeysNonrecursivity (boolean)
	 - rootCategory (string)
	 - recursiveCategory (array) --> array of categories, from highest to lowest (e.g. ['phi','w'], not ['w','phi'])
	 	-> saved in recursiveCats (see below) + becomes a string rep of the current recursive category
	 - terminalCategory (string)

	 - recursiveCatIndex (int): tracks which recursive category we're currently using
	 - recursiveCats (list of strings): list 
	 of recursive categories to use
   - addTones (string). Possible values include:
	 		- "addJapaneseTones"
			- "addIrishTones_Elfner"
			- "addIrishTones_Kalivoda"
	- noUnary (boolean): if true, don't create any nodes that immediately dominate only a single node.
	- maxBranching (numeric): maximum number of children that any node in the tree can have
	- requireRecWrapper (boolean). Formerly "requirePhiStem"
	- syntactic (boolean): are we generating syntactic trees?
   - ph (prosodic heirarchy object):
   	pCat: custom pCat used in GEN
	categoryPairings: custom category pairings passed to makeTableau passed to constraints
*/
window.GEN = function(sTree, words, options){
	options = {...options} || {obeysHeadedness: true}; // if options is undefined, set it to an empty object (so you can query its properties without crashing things)
	//Set obeysHeadedness:true by default

	//Set prosodic hierarchy if we're making prosodic trees. Don't bother with this for syntactic trees.
	if(!options.syntactic){
		
		// Create the ph object if none was passed or what was passed was incomplete, and set it the default PH object, defined in prosodicHierarchy.js
		if (!(options.ph && options.ph.pCat && options.ph.categoryPairings)){
			options.ph = PH_PHI;
			//console.log("The prosodic hierarchy input to GEN was missing or incomplete, so ph has been set by default to PH_PHI, defined in prosodicHierarchy.js");
		}
		
		setPCat(options.ph.pCat);
		setCategoryPairings(options.ph.categoryPairings);
		// give a warning if there are categories from categoryPairings not present in pCat
		if (!checkProsodicHierarchy(options.ph.pCat, options.ph.categoryPairings)){
			displayWarning("One or more categories in the provided map of syntactic-prosodic correspondences (categoryPairings) do not exist in the provided prosodic hierarchy (pCat). Resetting pCat and categoryPairings to their default values, defined in PH_PHI.");
			//set pCat and categoryPairings to their default values
			resetPCat();
			resetCategoryPairings();
			options.ph = PH_PHI;
		}
	}
	
	//Set the relevant category hierarchy (syntactic or prosodic) based on the GEN option syntactic
	var categoryHierarchy = options.syntactic ? sCat : pCat;
	var defaultRecCat = options.syntactic ? "xp" : "phi"; //sets the default of recursiveCategory option to "phi" if prosodic, "xp" if syntactic

	/* First, warn the user if they have specified terminalCategory and/or
	 * rootCategory without specifying recursiveCategory
	 */
	if((!options.recursiveCategory || !options.recursiveCategory.length) && (options.rootCategory || options.terminalCategory)){
		if(!window.confirm("You have not specified the recursive category for GEN, it will default to "+ defaultRecCat +".\nClick OK if you wish to continue."))
			throw new Error("GEN was canceled by user.");
	}

	options.recursiveCategory = options.recursiveCategory || [defaultRecCat];
		
	var recCats = [];
	
	if(typeof options.recursiveCategory !== 'string'){
		for(var i = 0; i<options.recursiveCategory.length; i++){
			recCats.push(options.recursiveCategory[i]);
		}
	}
	else {
		options.recursiveCategory = [options.recursiveCategory];
	}
	
	options.recursiveCats = options.recursiveCategory;

	options.recursiveCatIndex = 0;
	//Set current recursiveCategory
	options.recursiveCategory = recCats[options.recursiveCatIndex];
	
	if(recCats.length > 2){
		this.alert("You have entered more than 2 recursive categories!")
	}

	/* the prosodic hierarchy should include the categories specified in
	 * options.rootCategory, options.recursiveCategory and options.terminalCategory
	 * But if they are not, the default setting code throws unhelpful errors.
	 * The finally block throws more helpful errors and alert boxes instead
	 */

	//a flag for whether the user has included a novel category undefined in categoryHierarchy
	var novelCategories = false;
	try{
		
		options.recursiveCategory = options.recursiveCategory || [defaultRecCat];
		//sets the default of rootCategory based on recursiveCategory
		options.rootCategory = options.rootCategory || categoryHierarchy.nextHigher(options.recursiveCategory);
		//sets the default of terminalCategory based on recursiveCategory
		options.terminalCategory = options.terminalCategory|| categoryHierarchy.nextLower(options.recursiveCategory);
	}
	finally{
		var novelCatWarning = " is not a valid category with the current settings.\nCurrently valid prosodic categories: " + JSON.stringify(pCat) + "\nValid syntactic categories: " + JSON.stringify(sCat);

		//private function to avoid code duplication in warning about novel recursive cats
		function novelRecursiveCatEval(recCat){
			if(categoryHierarchy.indexOf(recCat)<0){
				var err = new Error("Specified recursive category "+recCat+novelCatWarning);
				displayError(err.message, err);
				novelCategories = true;
				throw err;
			}
		}

		if(options.rootCategory && categoryHierarchy.indexOf(options.rootCategory)<0){
			var err = new Error("Specified root category "+options.rootCategory+novelCatWarning);
			displayError(err.message, err);
			novelCategories = true;
			throw err;
		}

		//Throw an error for any specified recursive category(s) that are valid. 

		for(let i in options.recursiveCats){
			novelRecursiveCatEval(options.recursiveCats[i]);
		}
		
		// Throws an error for the defined terminal category if it is not a valid category.
		// Don't check terminal category if we're building syntactic trees.
		if(!options.syntactic && options.terminalCategory && categoryHierarchy.indexOf(options.terminalCategory)<0){
			var err = new Error("Specified terminal category "+options.terminalCategory+novelCatWarning);
			displayError(err.message, err);
			novelCategories = true;
			throw err;
		}
	}

	//Warnings for adverse GEN options combinations:
	for(var i = 0; i < options.recursiveCats.length; i++){
		if(options.rootCategory === options.recursiveCats[i] && options.obeysNonrecursivity){
			displayWarning("You have instructed GEN to produce non-recursive trees and to produce trees where the root node and intermediate nodes are of the same category. Some of the trees GEN produces will be recursive.");
		}
		if(options.rootCategory === options.terminalCategory && options.obeysNonrecursivity){
			displayWarning("You have instructed GEN to produce non-recursive trees and to produce trees where the root node and terminal nodes are of the same category. All of the trees GEN produces will be recursive.");
		}
		if(options.recursiveCats[i] === options.terminalCategory && options.obeysNonrecursivity){
			displayWarning("You have instructed GEN to produce non-recursive trees and to produce trees where the intermediate nodes and the terminal nodes are of the same category. You will only get one bracketing.");
		}
	}

	//Perform additional checks of layering if novel categories are not involved.
	if(!novelCategories){
		for(var i = 0; i < options.recursiveCats.length; i++){
			if(categoryHierarchy.isHigher(options.recursiveCats[i], options.rootCategory) || categoryHierarchy.isHigher(options.terminalCategory, options.recursiveCats[i])){
				displayWarning("You have instructed GEN to produce trees that do not obey layering. See pCat and sCat in prosodicHierarchy.js");
			}
			else{
				//Check that the highest recursive category is immediately below the selected root category.
				if(options.recursiveCats[i] !== categoryHierarchy.nextLower(options.rootCategory) && options.recursiveCats[i] !== options.rootCategory)
				{
					displayWarning(""+options.recursiveCats[i]+" is not directly below "+options.rootCategory+" in the prosodic hierarchy. None of the resulting trees will be exhaustive because GEN will not generate any "+categoryHierarchy.nextLower(options.rootCategory)+"s. See pCat and sCat in prosodicHierarchy.js");
				}
				var lowestRecCat = options.recursiveCats[options.recursiveCats.length-1];
				if(options.terminalCategory !== categoryHierarchy.nextLower(lowestRecCat) && options.terminalCategory !== lowestRecCat){
					displayWarning(""+options.terminalCategory+" is not directly below "+lowestRecCat+" in the prosodic hierarchy. None of the resulting trees will be exhaustive because GEN will not generate any "+categoryHierarchy.nextLower(lowestRecCat)+"s. Current pCat: "+pCat);
				}
			}
		}
	}

	if(typeof words === "string") { // words can be a space-separated string of words or an array of words; if string, split up into an array
		if (!words) { // if empty, scrape words from sTree
			if(sTree.cat && sTree.id){
				words = getLeaves(sTree);
			}
			else{
				let message = "window.GEN() was called no valid input!";
				displayError(message);
				return [];
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

	return window.GEN_impl(sTree, leaves, options);
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

/** Function to take a string and category and return an object wordObj with attributes
 *  wordObj.id = word
 *  wordObj.cat = cat
 * 
 * Also convert hyphenated information about accent and status as a clitic that is 
 * appended to the word argument to attributes of wordObj.
 * 
 * If input word is already an object, return it after checking its category.
 * - if word.cat == cat, return as is
 * - if word.cat == "clitic" and syntactic==true, create an x0 layer over the clitic
 * - if word.cat == "clitic" and syntactic==false, change word.cat to "syll"
 * - if word.cat != cat, and word.cat != clitic, change word.cat to cat.
 */
function wrapInLeafCat(word, cat, syntactic){
	var wordObj;
	//If word is already an object with appropriate properties, then check categories and return.
	if(typeof word === "object"){
		if(word.cat && word.id){
			wordObj = JSON.parse(JSON.stringify(word)); //deep copy shortcut
			//convert "clitic" to "syll" if we're making a prosodic tree
			if(wordObj.cat==="clitic"){
				if(!syntactic){
					wordObj.cat = "syll";
				}
				else{ //if it's a clitic and we're making syntactic trees, then give it an x0 layer 
					var cliticObj = wordObj;
					wordObj = addParent(cliticObj);
				}
			} 
			//otherwise change cat to the specified cat if they don't match
			else if (wordObj.cat !== cat){
				wordObj.cat = cat;
			}
			
			return wordObj;
		}
		else displayWarning("wrapInLeafCat: argument word is already an object but lacks an id or cat.");
	}

	//Otherwise, word is a string and must be converted into an object.
	else{
		var myCat = cat || 'w'; //by default, the leaf category is 'w'
		var wordId = word;

		//check if the input specifies this is a clitic and set category appropriately
		var isClitic = word.indexOf('-clitic')>=0;
		if (isClitic){
			myCat = syntactic ? 'clitic' : 'syll'; //syntactic tree vs prosodic trees
			wordId = wordId.split('-clitic')[0];
		}
		wordObj = {cat: myCat};

		//check if the input specifies this is an accented word, and set accent to true if so
		if(word.indexOf('-accent') >= 0){
			wordObj.accent = true;
			wordId = wordId.split('-accent')[0];
		}
		wordObj.id = wordId;

		//add an x0 layer if this is a (syntactic) clitic
		if(myCat==="clitic"){
			wordObj = addParent(wordObj);
		}
		return wordObj;
	}
}

function addParent(child, parentCat="x0", parentId="clitic_x0"){
	return {cat:parentCat, id:parentId, children:[child]};
}
