function containsClitic(x) {
    return (x.indexOf("clitic") > -1 || x.cat === 'clitic');
  }
  
  
  function generateWordOrders(wordList, clitic) {
    if (typeof wordList === 'string') {
      var cliticTagIndex = wordList.indexOf("-clitic");
      if (cliticTagIndex > 0) {
        var wordListParts = wordList.split("-clitic");
        wordList = wordListParts[0] + wordListParts[1];
      }
      wordList = wordList.split(' ');
    }
    //Find the clitic to move around
    var cliticIndex = wordList.indexOf(clitic);
    try {
      if (cliticIndex < 0)
        throw new Error("The provided clitic " + clitic + " was not found in the word list");
    }
    catch(err) {
      displayError(err.message, err);
    }
    //Slice the clitic out
    var beforeClitic = wordList.slice(0, cliticIndex);
    var afterClitic = wordList.slice(cliticIndex + 1, wordList.length);
    var cliticlessWords = beforeClitic.concat(afterClitic);
  
    var orders = new Array(wordList.length);
    for (var i = 0; i <= cliticlessWords.length; i++) {
      beforeClitic = cliticlessWords.slice(0, i);
      afterClitic = cliticlessWords.slice(i, cliticlessWords.length);
      orders[i] = beforeClitic.concat([clitic + "-clitic"], afterClitic);
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
  
  function GENwithCliticMovement(stree, words, options) {
    if(!words && (!stree.cat || !stree.id)){
      displayError("GENwithCliticMovement was called with no valid input!");
      return [];
    }
    // Identify the clitic of interest
    var clitic = '';
    // First try to read words and clitic off the tree
    var leaves = getLeaves(stree);
    if (leaves.length > 0 && leaves[0].id) {
      //console.log(leaves);
      var leaf = 0;
      while (clitic === '' && leaf < leaves.length) {
        if (leaves[leaf].cat === "clitic")
          clitic = leaves[leaf].id;
        leaf++;
      }
      if (clitic === '') {
        displayWarning("You selected GEN settings that move clitics, but one or more input trees do not have a clitic lableled.");
        return GEN(stree, words, options);
        //throw new Error("GENWithCliticMovement was called but no node in stree has category clitic was provided in stree");
  
      }
    }
    //Otherwise, get the clitic from words
    else {
      // Make sure words is an array
      if (typeof words === "string") {
        words = words.split(' ');
      }
      var x = words.find(containsClitic);
      if (!x) { //x is undefined if no word in "words" contains "clitic"
        displayWarning("You selected GEN settings that move clitics, but one or more input trees do not have a clitic lableled.");
        return GEN(stree, words, options);
      }
      clitic = x.split('-clitic')[0];
      words[words.indexOf(x)] = clitic;
    }
  
    //Make sure words is defined before using it to generate word orders
    if (!words || words.length < leaves.length) {
      words = new Array(leaves.length);
      for (var i in leaves) {
        words[i] = leaves[i].id;
      }
  
    }
    var wordOrders = generateWordOrders(words, clitic);
    var candidateSets = new Array(wordOrders.length);
    for (var i = 0; i < wordOrders.length; i++) {
      candidateSets[i] = GEN(stree, wordOrders[i], options);
    }
    //candidateSets;
    return [].concat.apply([], candidateSets);
  }
  
  /**
   * GENwithPermutation: function that takes an stree or a list of words and returns a set of candidates
   * <input, output> in which input = stree and the outputs are GEN run on all orders of the words.
   * Word orders are computed using Heap's algorithm, implemented in allOrdersInner().
   * 
   * @param {*} stree A syntactic tree to use as the input in the candidate pairs <input, output> 
   * @param {*} words A list of words. Can be a string of space-separated words, or an array of words
   * @param {*} options An object of options to pass along to GEN()
   */
  //If both an stree and words are provided, words take priority. 
  function GENwithPermutation(stree, words, options){
  
      //function for swapping elements in an array, takes array and indexes of elements to be swapped
      function swap(array, index1, index2){
          var swapped = [];
          for(var i = 0; i<array.length; i++){
              if(i === index1){
                  swapped.push(array[index2]);
              }
              else if(i === index2){
                  swapped.push(array[index1]);
              }
              else{
                  swapped.push(array[i]);
              }
          }
          return swapped;
      }
    
      options = options || {};
      options = evaluateGenOptions(options);
      if(!options.terminalCategory){
        console.warn("Terminal category is not defined.")
      }

      var leaves = handleGenTerminals(stree, words, options);
      //console.log(leaves);
    
    //Make sure words is defined before using it to generate word orders
    //Display warning if:
    //    -There are no words or leaves
    //    -There are mismatching words and leaves
    if(!words.length && !leaves.length){
      displayError("GENwithPermutation(): Both leaves and words are undefined. It is possible that GENwithPermutation() was not given any syntactic tree or words to permute.");
      return '';
    }
    else if(words.length && leaves.length && leaves.length !== words.length){
    //  displayWarning("The arguments words and stree to GENwithPermutation() are mismatched. The function will use words and ignore the stree.");
    }

    var permutations = [];
      //actual implementation of Heap's algorithm
      function allOrdersInner(innerList, k){
          if(k == 1){
              permutations.push(innerList);
          }
          else{
              allOrdersInner(innerList, k-1); //recursive function call
  
              for(var i = 0; i < k-1; i++){
                  if(k%2 === 0){
                      //swap innerList[i] with innerList[k-1]
                      allOrdersInner(swap(innerList, 0, k-1), k-1); //recursive function call
                  }
                  else {
                      //swap innerList[0] with innerList[k-1]
                      allOrdersInner(swap(innerList, i, k-1), k-1); //recursive function call
                  }
              }
          }
      }
      
      allOrdersInner(leaves, leaves.length);
      var candidateSets = [];
      for(var i = 0; i<permutations.length; i++){
          candidateSets[i] = GEN_impl(stree, permutations[i], options);
      }
      //candidateSets;
      return [].concat.apply([], candidateSets);
  }
  