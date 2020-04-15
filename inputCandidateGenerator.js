/* Function that calls GEN from candidategenerator.js to generate syntactic input trees
*  rather than output prosodic trees.
*  By default, this creates unary and binary-branching strees rooted in xp, with all terminals mapped to x0.
*  Intermediate levels are xps, and structures of the form [x0 x0] are excluded as being 
*  syntactically ill-formed, since they only arise from head movement.
*  
*  Options:
*  - rootCategory
*  - recursiveCategory
*  - terminalCategory
*  - noAdjacentHeads: are x0 sisters allowed? [x0 x0]
*  - noAdjuncts: are xp sisters allowed? [xp xp]
*  - maxBranching: determines the maximum number of branches that are tolerated in the resulting syntactic trees
*  - addClitics: 'right' or 'left' determines whether clitics are added on the righthandside or the left; true will default to right. false doesn't add any clitics.
*  - headSide: 'right', 'left', 'right-strict', 'left-strict'. 
*    Which side will heads be required to be on, relative to their complements? 
*    Also, must heads be at the very edge (strict)?
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
    var autoSTreePairs = goodGEN({}, terminalString, options);
    //Select just the generated trees
    var sTreeList = autoSTreePairs.map(x=>x[1]);

    //Apply filters
    if(options.addClitics){
        var outsideClitics = sTreeList.map(x => addCliticXP(x, options.addClitics));
        var insideClitics = sTreeList.map(x => addCliticXP(x, options.addClitics, true));
        sTreeList = outsideClitics.concat(insideClitics);
    }
    if(options.noAdjacentHeads){
        sTreeList = sTreeList.filter(x => !x0Sisters(x, 'x0'));
    }
    if(options.noAdjuncts){
        sTreeList = sTreeList.filter(x => !x0Sisters(x, 'xp'));
    }
    if(options.maxBranching > 0){
        sTreeList = sTreeList.filter(x=>!ternaryNodes(x, options.maxBranching));
    }
    if(options.headSide){
        var side, strict;
        [side, strict] = options.headSide.split('-');
        sTreeList = sTreeList.filter(x => !headsOnWrongSide(x, side, strict));
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
        if(side==="right"){
            sisters = sTree.children.concat(cliticXP);
        }
        else if(side==="left"){
            sisters = [cliticXP].concat(sTree.children);
            //console.log(tp);
        }
        else{
            throw new Error("addCliticXP(): The provided side ", side," is not valid. Side must be specified as 'left' or 'right'.")
        }
    }
    //Make the clitic sister to sTree's root, and root the whole thing elsewhere
    else{
        var sisters;
        if(side==="right"){
            sisters = [sTree, cliticXP];
        }
        else if(side==="left"){
            sisters = [cliticXP, sTree];
        }
        else{
            throw new Error("addCliticXP(): The provided side ", side," is not valid. Side must be specified as 'left' or 'right'.")
        }
        
    }
    tp = {id: 'root', cat: 'xp', children: sisters};
    return tp;
}