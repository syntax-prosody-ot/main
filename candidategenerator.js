(function() {

window.GEN_impl = function(sTree, leaves, options) {

  var recursiveOptions = {};
  for (var k in options) {
    if (options.hasOwnProperty(k) && k !== 'requireRecWrapper')
      recursiveOptions[k] = options[k];
  }

  /* if rootCategory and recursiveCategory are the same, we don't want to call
   * addRecCatWrapped because half of the candidates will have a root node with
   * only one child, which will be of the same category, ie. {i {i (...) (...)}}
   */
  var rootlessCand = gen(leaves, recursiveOptions)
  if(options.rootCategory !== options.recursiveCategory){
    rootlessCand = addRecCatWrapped(gen(leaves, recursiveOptions), options);
  }

  var candidates = [];
  for(var i=0; i<rootlessCand.length; i++){
    var pRoot = wrapInRootCat(rootlessCand[i], options);
    if (!pRoot)
      continue;
    if (options.obeysHeadedness && !obeysHeadedness(pRoot))
      continue;
    
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

  if(candidate.length > 2 && options.rootCategory === candidate[0].cat){
    return null;
  }
  //if we get here, there aren't any relevant exhaustivity violations
  return {id: 'root', cat: options.rootCategory, children: candidate};
}

/*Conceptually, returns all possible parenthesizations of leaves that don't
*  have a set of parentheses enclosing all of the leaves
* Format: returns an array of parenthesizations, where each parenthesization
*  is an array of children, where each child is
*  either a node of category recursiveCategory (with descendant nodes attached) 
*  or a leaf (of category terminalCategory)
* Options:
*/
function gen(leaves, options){
  
  var candidates = [];  //each candidate will be an array of siblings
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
    //recursion at lower levels
    if(pushRecCat(options)){
      var wRightsides = addRecCatWrapped(gen(rightLeaves, options), options);
      rightsides.concat(wRightsides);
      popRecCat(options);
    }
    
    

    //Then create left sides and combine them with the right sides.

    //Case 1: the first i leaves attach directly to parent (no wrapping in a recursive category)
    var leftside = leaves.slice(0,i);

    // We don't need to check the left side for nonrecursivity, because it's all leaves

    //Combine the all-leaf leftside with all the possible rightsides that have a phi at their left edge (or are empty)
    for(var j = 0; j<rightsides.length; j++){
      var currRightside = rightsides[j];
      var firstRight = currRightside[0];
      if(!currRightside.length || (firstRight.children && firstRight.children.length) || (firstRight.cat != options.terminalCategory))
      {
        cand = leftside.concat(currRightside);
        candidates.push(cand);
      }
    }

    


    
    if(i<leaves.length){
      if(options.noUnary && i<2){
        continue;
        //Don't generate any candidates where the first terminal is in an intermediate level node by itself.
      }

      //Case 2: the first i words are wrapped in an intermediate level node
      //Case 2a: first recursive category
      var phiLeftsides = gen(leaves.slice(0,i), options);
      for(var k = 0; k<phiLeftsides.length; k++)
      {
        var phiNode = wrapInRecCat(phiLeftsides[k], options);
        if (!phiNode){
          continue;
        }
        var leftside = [phiNode];

        for(var j = 0; j<rightsides.length; j++)
        {
          cand = leftside.concat(rightsides[j]);
          candidates.push(cand);
        }
      }

      //Case 3
      //Try to build left-sides that are wrapped in the next lower recursive category but aren't wrapped in the current recursive category
      if(pushRecCat(options)){
        var wLeftsides = gen(leaves.slice(0,i), options);
        for(var k = 0; k<wLeftsides.length; k++){
          var wLeftside = wrapInRecCat(wLeftsides[k], options);
          popRecCat(options);
          if(wLeftside){
            //console.log(i, "wLeftside:", wLeftside);
            //Combine the all-leaf leftside with all the possible rightsides that aren't empty
            for(var j = 0; j<rightsides.length; j++){
              if(rightsides[j].length)
              {
                cand = [wLeftside].concat(rightsides[j]);
                candidates.push(cand);
              }
            }
          }
        }  
      }
 
    }

  }

	//Now try to use recursion at the next recursive category
	if (pushRecCat(options)) {
		
		var wCands = gen(leaves, options);
		
		//Add things that are entirely wrapped in [ ]
		for (var i = 0; i < wCands.length; i++) {
			cand = wCands[i];
			var wrappedCand = wrapInRecCat(cand, options);
			
			if(wrappedCand)
				candidates.push([wrappedCand]);
		} 
		
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
	if (candidate.length === 1 && (candidate[0] && candidate[0].cat === options.recursiveCategory)){
		if(candidate[0].cat==='phi')
			console.log("wrapInRecCat", options.recursiveCategory, candidate);
		//console.log("Not wrapping ", candidate);
		return null;
	}
	return {id: options.recursiveCategory+(options.counters.recNum++), cat: options.recursiveCategory, children: candidate};
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
		//console.log(leaves);
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
		
	}
	var wordOrders = generateWordOrders(words, clitic);
	var candidateSets = new Array(wordOrders.length);
	for(var i = 0; i<wordOrders.length; i++){
		candidateSets[i] = GEN(stree, wordOrders[i], options);
	}
	//candidateSets;
	return [].concat.apply([], candidateSets);
}
