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
*  - noBarLevels: if false (default), bar levels are treated as phrasal. 
*    If true, bar levels are not represented, and ternary branching is permitted.
*  - addClitics: 'right' or 'left' determines whether clitics are added on the
*    righthand-side or the left; true will default to right. false doesn't add any clitics.
*    Default false.
*  - cliticsAreBare: false by default. If false, clitics will be wrapped in unary XPs. 
*    If true, clitics will not be wrapped in XPs, but will be bare heads with category clitic.
*  - cliticInSpecifier: false by default. If true, clitics are positioned "inside" the highest 
*    XP as sister to an invisible X' layer. Otherwise, cliics are sister to the highest XP.
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

    // Options that default to true
    if(options.noAdjacentHeads === undefined){
        options.noAdjacentHeads = true;
    }
    
    options.syntactic = true;
    options.recursiveCategory = options.recursiveCategory || 'xp';
    options.terminalCategory = options.terminalCategory || 'x0';
    options.rootCategory = options.rootCategory || 'xp';

    // If bar levels are not treated as phrasal, then we need to allow ternary XPs and CPs, but not ternary x0s.
    if(options.noBarLevels && options.recursiveCategory !== 'x0'){
      options.maxBranching = 3;
    }
    //Otherwise, we want binary branching syntactic inputs.
    options.maxBranching = options.maxBranching || 2;

    //Run GEN on the provided terminal string
    var autoSTreePairs = GEN({}, terminalString, options);
    //Select just the generated trees
    var sTreeList = autoSTreePairs.map(x=>x[1]);

    //---Apply filters---
    if(options.allowClitic){
      var cliticTrees = getCliticTrees(terminalString, options);
      if(cliticTrees) {
        sTreeList = sTreeList.concat(cliticTrees);
      }
    }
    if(options.noAdjuncts){
        sTreeList = sTreeList.filter(x => !containsAdjunct(x));
    }

    //If adding clitics, various other options are relevant: clitic category (cliticsAreBare), whether clitics go inside the existing root as a daughter, or outside as a sister ()
    if(options.addClitics){
        if(options.rootCategory == 'cp' || options.cliticInSpecifier){
          var outsideClitics = [];
        }
        else {
          var outsideClitics = sTreeList.map(x => addClitic(x, options.addClitics, options.rootCategory, false, options.cliticsAreBare));;
        }
        var insideClitics = sTreeList.map(x => addClitic(x, options.addClitics, options.rootCategory, true, options.cliticsAreBare));
        sTreeList = outsideClitics.concat(insideClitics);
    }
    if(options.noAdjacentHeads){
        sTreeList = sTreeList.filter(x => !x0Sisters(x, 'x0'));
    }

    if(options.maxBranching > 0){
        sTreeList = sTreeList.filter(x=>!ternaryNodes(x, options.maxBranching));
    }
    if(options.minBranching > 0){
        sTreeList = sTreeList.filter(x=>!unaryNodes(x, options.minBranching));
    }
  
    if(options.noBarLevels){
      sTreeList = sTreeList.filter(x => !threeXPs(x));
    }
  
    if(options.headSide){
        var side, strict;
        [side, strict] = options.headSide.split('-');
        // console.log(sTreeList)
        sTreeList = sTreeList.filter(x => !headsOnWrongSide(x, side, strict));
    }
    if(options.noMirrorImages){
      sTreeList = sTreeList.filter(x => !mirrorImages(x, sTreeList));
    }

    return sTreeList;
}

/** Helper function to add clitics to trees
 *  side: which side should clitics be added on? left/right
 *  rootCategory: normally xp but could be cp or x0
 *  inside: if true, clitics are daughters to the input sTree; otherwise, sisters to it
 */
function addClitic(sTree, side="right", rootCategory, inside, bareClitic){
  if(side===true){side="right"}
  var cliticX0 = {id:'x', cat: 'clitic'};
  //Unless bareClitic==true, wrap the clitic in an XP layer
  if(!bareClitic){
    var cliticObj = {id:'dp', cat: 'xp', children: [cliticX0]};
  }
  else{
    var cliticObj = cliticX0;
  }
    
    var tp;
    var sisters;
    //Make the clitic a daughter of sTree
    if(inside){
        //console.log("inside");
        if(side==="right"){
            sisters = sTree.children.concat(cliticObj);
        }
        else if(side==="left"){
            sisters = [cliticObj].concat(sTree.children);
            //console.log(tp);
        }
        else{
            var errorMsg = "addClitic(): The provided side " + side + " is not valid. Side must be specified as 'left' or 'right'.";
            displayError(errorMsg);
            throw new Error(errorMsg);
        }
        
    }
    //Make the clitic sister to sTree's root, and root the whole thing elsewhere
    else{
        var sisters;
        if(side==="right"){
            sisters = [sTree, cliticObj];
        }
        else if(side==="left"){
            sisters = [cliticObj, sTree];
        }
        else{
            var errorMsg = "addClitic(): The provided side " + side + " is not valid. Side must be specified as 'left' or 'right'.";
            displayError(err.message, err);
            throw new Error(errorMsg)
        }
    }
    tp = {id: 'root', cat: rootCategory, children: sisters};
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
// T -> input array of characters in string
// min -> minimum length of output strings
// max -> maximum length of output strings
function generateTerminalStrings(T, min, max) {
  // Get list of all possible permutations for each length
  var finalPermList = [];
  for(var i = min; i <= max; i++) {
    var temp = T.slice();
    var data = new Array(i);
    var permList = [];
    var currPermList = getPermutations(temp, data, i - 1, 0, permList);
    // Initialize finalPermList
    if(finalPermList.length === 0) {
      finalPermList = currPermList;
    }
    // Add to finalPermList
    else {
      finalPermList = finalPermList.concat(currPermList);
    }
  }

  return finalPermList;
}

// Return an array of all permutations (allowing repitition) of input array T
// T -> input array of characters in string
// data -> stores permutation at current iteration
// last -> index of last element in resulting permuatation
// index -> current index
// permList -> list of all permutations
// If T = ['F', 'FF'] and last = 1
// Then permList = ["F F", "F FF", "FF F", "FF FF"]
function getPermutations(T, data, last, index, permList) {
  var length = T.length;
  // One by one fix all characters at the given index and recur for the subsequent indexes
  for(var i = 0; i < length; i++) {
    // Fix the ith character at index and if this is not the last index then recursively call for higher indexes
    data[index] = T[i];
    // If this is the last index then add the string stored in data to permList
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
