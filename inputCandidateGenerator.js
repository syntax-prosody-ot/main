/* Function that calls GEN from candidategenerator.js to generate syntactic input trees
*  rather than output prosodic trees.
*  By default, this creates unary and binary-branching strees rooted in xp, with all terminals mapped to x0.
*  Intermediate levels are xps, and structures of the form [x0 x0] are excluded as being
*  syntactically ill-formed, since they only arise from head movement.
*
*  Options:
*  - rootCategory: default = 'xp'
*  - recursiveCategory: default = 'xp'
*  - terminalCategory: default = 'x0'
*  - noAdjacentHeads: are x0 sisters allowed? [x0 x0]. Defaults to true.
*  - noAdjuncts: are xp sisters allowed? [xp xp]. Defaults to false.
*  - maxBranching: determines the maximum number of branches that are tolerated in
*    the resulting syntactic trees. Default = 2
*  - minBranching: determines the maximum number of branches that are tolerated in
*    the resulting syntactic trees. Default = 2
*  - addClitics: 'right' or 'left' determines whether clitics are added on the
*    righthand-side or the left; true will default to right. false doesn't add any clitics.
*    Default false.
*  - headSide: 'right', 'left', 'right-strict', 'left-strict'.
*    Which side will heads be required to be on, relative to their complements?
*    Also, must heads be at the very edge (strict)?
* Also has all the options from the underlying output candidate generator -- see
* GEN() in candidategenerator.js. Most relevant is probably noUnary which excludes
* non-branching intermediate nodes.
*/
function sTreeGEN(terminalString, options)
{
    options = options || {};
    if(options.noAdjacentHeads === undefined){
        options.noAdjacentHeads = true;
    }
    options.maxBranching = options.maxBranching || 2;
    options.syntactic = true;
    options.recursiveCategory = options.recursiveCategory || 'xp';
    options.terminalCategory = options.terminalCategory || 'x0';
    options.rootCategory = options.rootCategory || 'xp';

    //Run GEN on the provided terminal string
    var autoSTreePairs = GEN({}, terminalString, options);
    //Select just the generated trees
    var sTreeList = autoSTreePairs.map(x=>x[1]);

    //Apply filters
    if(options.allowClitic){
      var cliticTrees = getCliticTrees(terminalString, options);
      if(cliticTrees) {
        sTreeList = sTreeList.concat(cliticTrees);
      }
    }
    if(options.addClitics){
        var outsideClitics = sTreeList.map(x => addCliticXP(x, options.addClitics));
        var insideClitics = sTreeList.map(x => addCliticXP(x, options.addClitics, true));
        sTreeList = outsideClitics.concat(insideClitics);
    }
    if(options.noAdjacentHeads){
        sTreeList = sTreeList.filter(x => !x0Sisters(x, 'x0'));
    }
    if(options.noAdjuncts){
        sTreeList = sTreeList.filter(x => !x0Sisters(x, options.recursiveCategory));
    }
    if(options.maxBranching > 0){
        sTreeList = sTreeList.filter(x=>!ternaryNodes(x, options.maxBranching));
    }
    if(options.minBranching > 0){
        sTreeList = sTreeList.filter(x=>!unaryNodes(x, options.minBranching));
    }
    if(options.headSide){
        var side, strict;
        [side, strict] = options.headSide.split('-');
        sTreeList = sTreeList.filter(x => !headsOnWrongSide(x, side, strict));
    }
    if(options.noMirrorImages){
      sTreeList = sTreeList.filter(x => !mirrorImages(x, sTreeList));
    }

    return sTreeList;
}

function addCliticXP(sTree, side="right", inside){
    var cliticXP = {id:'dp', cat: 'xp', children: [{id:'x', cat: 'clitic'}]};
    var tp;
    var sisters;
    //Make the clitic a daughter of sTree
    if(inside){
        //console.log("inside");
        try {
          if(side==="right"){
              sisters = sTree.children.concat(cliticXP);
          }
          else if(side==="left"){
              sisters = [cliticXP].concat(sTree.children);
              //console.log(tp);
          }
          else{
              var errorMsg = "addCliticXP(): The provided side " + side + " is not valid. Side must be specified as 'left' or 'right'.";
              throw new Error(errorMsg)
          }
        }
        catch(err) {
          displayError(err.message, err);
        }
    }
    //Make the clitic sister to sTree's root, and root the whole thing elsewhere
    else{
      try {
        var sisters;
        if(side==="right"){
            sisters = [sTree, cliticXP];
        }
        else if(side==="left"){
            sisters = [cliticXP, sTree];
        }
        else{
            var errorMsg = "addCliticXP(): The provided side " + side + " is not valid. Side must be specified as 'left' or 'right'.";
            throw new Error(errorMsg)
        }
      }
      catch(err) {
        displayError(err.message, err);
      }
    }
    tp = {id: 'root', cat: 'xp', children: sisters};
    return tp;
}

function getCliticTrees(string, options) {
  var cliticTreeList = [];
  // if terminal string already contains cltic label do nothing
  if(string.includes('-clitic')) {
    return;
  }
  // else run gen on new strings with clitics
  var terminalList = string.split(" ");
  for(var i = 0; i < terminalList.length; i++) {
    var currList = string.split(" ");
    currList[i] = currList[i] + '-clitic';
    var cliticString = currList.join(" ");
    var autoSTreePairs = GEN({}, cliticString, options);
    var sTreeList = autoSTreePairs.map(x=>x[1]);
    cliticTreeList = cliticTreeList.concat(sTreeList);
  }
  return cliticTreeList;
}

// Return an array of all possible space-separated strings of length at least min and no more than max, drawn from T with replacement.
function generateTerminalStrings(T, min, max) {
  var length = T.length;

  // Get list of a possible combinations of T from length min to max
  finalCombList = [];
  for(var i=min; i<=max; i++) {
    if(i === length) {
      var currCombList = T.slice().join(' ');
      finalCombList.push(currCombList);
    }
    else {
      var temp2 = T.slice();
      var data2 = new Array(i);
      var combList = [];
      var currCombList = getCombinations(temp2, data2, 0, length-1, 0, i, combList);
      if(finalCombList.length === 0) {
        finalCombList = currCombList;
      }
      else {
        finalCombList = finalCombList.concat(currCombList);
      }
    }
  }

  // Get list of all possible permutations with repetition of the previously found list of combinations
  var results = [];
  for(var j=0; j<finalCombList.length; j++) {
    var temp1 = finalCombList[j].split(' ');
    var temp1Length = temp1.length;
    var data1 = new Array(temp1Length);

    var resultArr = new Array();
    var result = getPermutations(temp1, data1, temp1Length-1, 0, resultArr);
    if(results.length === 0) {
      results = result;
    }
    else {
      results = results.concat(result);
    }
  }

  // Convert to set to remove duplicates
  var uniqResults = [...new Set(results)];
  uniqResults = Array.from(uniqResults);
  return uniqResults;
}

// Return an array of all possible space-separated strings of length equal to length of T
function getPermutations(T, data, last, index, permList) {
  var length = T.length;
  for(var i = 0; i < length; i++) {
    data[index] = T[i];

    if(index == last) {
      var strData = data.join(' ');
      permList.push(strData);
    }
    else {
      getPermutations(T, data, last, index + 1, permList);
    }
  }
  return permList;
}

// Returns list of combinations of length r from input array
function getCombinations(arr, data, start, end, index, r, combList) {
  if(index == r) {
    var currComb = [];
    for(var j=0; j<r; j++) {
      currComb.push(data[j]);
    }
    var str = currComb.join(' ');
    combList.push(str);
    return;
  }

  for(var i=start; i<=end && end-i+1 >= r-index; i++) {
    data[index] = arr[i];
    getCombinations(arr, data, i+1, end, index+1, r, combList);
  }

  return combList;
}
