//When a test is failed, message() will return information about the options, stree, and ptree being used in the test.
// Helper for Mocha testing. No tests in this file.

function message(stree, ptree, options) {
        options = options || {"no options": 0};
        return `with ${Object.keys(options)},\
        \n\t${parenthesizeTree(stree)} --> ${parenthesizeTree(ptree)}`;
    }

//Same as message(), but also returns the direction of the align constraint (left or right).
function messageAlign(stree, ptree, d, options) {
        options = options || {"no options": 0};
        return `align with direction ${d} and ${Object.keys(options)},\
        \n\t${parenthesizeTree(stree)} --> ${parenthesizeTree(ptree)}`;
    }

function messageGEN(treePairs, expectedPairs, options){
    options = options || {"no options": 0};
    return `with ${Object.keys(options)},\
        \n\tExpected ${convertTreePairsListToString(treePairs)} \n\tto equal ${convertTreePairsListToString(expectedPairs)}`;
}

function convertTreePairsListToString(treeList){
    var pairStringList = [];
    for(let i=0; i<treeList.length; i++){
        let sp = [parenthesizeTree(treeList[i][0]), parenthesizeTree(treeList[i][1])].join(', ');
        pairStringList = pairStringList.concat(sp);
    }
    return pairStringList.join('; ');
}