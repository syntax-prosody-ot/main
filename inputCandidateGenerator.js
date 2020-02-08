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
*/
function sTreeGEN(terminalString, options)
{
    options = options || {noAdjacentHeads:true, maxBranching:2};
    options.syntactic = true;
    options.recursiveCategory = options.recursiveCategory || 'xp';
    options.terminalCategory = options.terminalCategory || 'x0';
    options.rootCategory = options.rootCategory || 'xp';

    //Run GEN on the provided terminal string
    var autoSTreePairs = GEN({}, terminalString, options);
    //Select just the generated trees
    var sTreeList = autoSTreePairs.map(x=>x[1]);

    //Apply filters
    if(options.noAdjacentHeads){
        sTreeList = sTreeList.filter(x => !x0Sisters(x, 'x0'));
    }
    if(options.noAdjuncts){
        sTreeList = sTreeList.filter(x => !x0Sisters(x, 'xp'));
    }
    if(options.maxBranching > 0){
        sTreeList = sTreeList.filter(x=>!ternaryNodes(x, options.maxBranching));
    }

    return sTreeList;
}