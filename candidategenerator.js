if(typeof window === "undefined"){
  window = {};
}

(function() {

  window.GEN_impl = function(sTree, leaves, options) {
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
    if (options.rootCategory !== options.recursiveCategory) {
      rootlessCand = addRecCatWrapped(gen(leaves, recursiveOptions), options);
    }

    var candidates = [];
    for (var i = 0; i < rootlessCand.length; i++) {
      var pRoot = wrapInRootCat(rootlessCand[i], options);
      if (!pRoot)
        continue;
      if (options.obeysHeadedness && !obeysHeadedness(pRoot))
        continue;
      if (options.maxBranching && ternaryNodes(pRoot, options.maxBranching)) {
				continue;
			}
      candidates.push([sTree, pRoot]);
    }
	// add getter functions that returns the category pairinig and pCat so make tableau can access them
	candidates.getCategoryPairings = function(){return options.ph.categoryPairings};
	candidates.getPCat = function(){return options.ph.pCat};
  return candidates;
  }

  /* Function to check if a tree obeys headedness. Each node must either be be
   * terminal or have at least one child of the category immidately below its own
   * on the prosodic hierarch. Otherwise, return false. Written as a recursive
   * function, basically a constraint.
   */
  function obeysHeadedness(tree) {
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
        if (children[i].cat === pCat.nextLower(node.cat) ||
          children[i].cat === node.cat) {
          return true;
        }
      return false;
    }

    //outer function
    //first, check the parent node
    if (!nodeIsHeaded(tree))
      return false;
    //return false if one of the children does not obey headedness
    if (tree.children) {
      for (var x = 0; x < tree.children.length; x++) {
        if (!obeysHeadedness(tree.children[x])) //recursive function call
          return false;
      }
    }
    //if we get this far, the tree obeys headedness
    return true;
  }

  function obeysExhaustivity(cat, children) {
    for (var i = 0; i < children.length; i++)
      if (cat !== children[i].cat && pCat.nextLower(cat) !== children[i].cat) {
        return false;
      }
    return true;
  }

  function wrapInRootCat(candidate, options) {
    if (options && options.obeysExhaustivity) { // check that options.obeysExhaustivity is defined
      if (typeof options.obeysExhaustivity === "boolean" && options.obeysExhaustivity && !obeysExhaustivity(options.rootCategory, candidate)) {
        return null;
      } else if (options.obeysExhaustivity instanceof Array && options.obeysExhaustivity.indexOf(options.rootCategory) >= 0 && !obeysExhaustivity(options.rootCategory, candidate)) {
        return null;
      }
    }

    if (candidate.length < 2 && options.rootCategory === candidate[0].cat) {
      //console.log(candidate, options.rootCategory);
      return null;
    }
    //if we get here, there aren't any relevant exhaustivity violations
    return {
      id: 'root',
      cat: options.rootCategory,
      children: candidate
    };
  }

  /*Conceptually, returns all possible parenthesizations of leaves that don't
   *	have a set of parentheses enclosing all of the leaves
   * Format: returns an array of parenthesizations, where each parenthesization
   *	is an array of children, where each child is
   *	either a phi node (with descendant nodes attached) or a leaf
   */
  function gen(leaves, options) {
    var candidates = []; //each candidate will be an array of siblings
    try {
      if (!(leaves instanceof Array))
        throw new Error(leaves + " is not a list of leaves.");
    }
    catch(err) {
      displayError(err.message, err);
    }

    //Base case: 0 leaves
    if (leaves.length === 0) {
      candidates.push([]);
      return candidates;
    }

    //Recursive case: at least 1 word. Consider all candidates where the first i words are grouped together
    for (var i = 1; i <= leaves.length; i++) {

      var rightsides = addRecCatWrapped(gen(leaves.slice(i, leaves.length), options), options);

      //Case 1: the first i leaves attach directly to parent (no phi wrapping)

      var leftside = leaves.slice(0, i);

      // for case 1, we don't need to check the left side for nonrecursivity, because it's all leaves

      //Combine the all-leaf leftside with all the possible rightsides that have a phi at their left edge (or are empty)
      for (var j = 0; j < rightsides.length; j++) {
        var firstRight = rightsides[j][0];
        if (!rightsides[j].length || firstRight.children && firstRight.children.length) {
          var cand = leftside.concat(rightsides[j]);
          candidates.push(cand);
        }
      }



      //Case 2: the first i words are wrapped in a phi
      if (i < leaves.length) {
        if (options.noUnary && i < 2) {
          continue;
          //Don't generate any candidates where the first terminal is in a phi by itself.
        }
        var phiLeftsides = gen(leaves.slice(0, i), options);
        for (var k = 0; k < phiLeftsides.length; k++) {
          var phiNode = wrapInRecCat(phiLeftsides[k], options);
          if (!phiNode) {
            continue;
          }
          var leftside = [phiNode];

          for (var j = 0; j < rightsides.length; j++) {
            cand = leftside.concat(rightsides[j]);
            candidates.push(cand);
          }
        }
      }

    }

    return candidates;
  }

  function wrapInRecCat(candidate, options) {
    // Check for Exhaustivity violations below the phi, if phi is listed as one of the exhaustivity levels to check
    if (options && options.obeysExhaustivity) {
      if ((typeof options.obeysExhaustivity === "boolean" || options.obeysExhaustivity.indexOf(options.recursiveCategory) >= 0) && !obeysExhaustivity(options.recursiveCategory, candidate))
        return null;
    }
    if (options && options.obeysNonrecursivity)
      for (var i = 0; i < candidate.length; i++)
        if (candidate[i].cat === options.recursiveCategory)
          return null;

    if (candidate.length < 2 && options.recursiveCategory === candidate[0].cat) {
      return null;
    }
    return {
      id: options.recursiveCategory + (options.counters.recNum++),
      cat: options.recursiveCategory,
      children: candidate
    };
  }

  //Takes a list of candidates and doubles it to root each of them in a phi
  //If options.noUnary, skip wrapInRecCating candidates that are only 1 terminal long
  function addRecCatWrapped(candidates, options) {
    var origLen = candidates.length;
    var result = [];
    if (!options.requireRecWrapper) {
      result = candidates;
    }
    for (var i = 0; i < origLen; i++) {
      var candLen = candidates[i].length;
      if (candLen) {
        if (options.noUnary && candLen == 1) {
          continue;
        }
        var phiNode = wrapInRecCat(candidates[i], options);
        if (!phiNode) {
          continue;
        }
        result.push([phiNode]);
      }
    }
    return result;
  }

})();
