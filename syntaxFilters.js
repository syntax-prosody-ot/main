function x0Sisters(sTree, cat){
	var x0SistersFound = false;
    if(sTree.children && sTree.children.length){
        var numX0 = 0;
        for(var i=0; i<sTree.children.length; i++){
            var child = sTree.children[i];

            if(child.cat === cat){
                numX0++;
            }
            if(numX0 > 1){
                x0SistersFound = true;
                break;
            }

            x0SistersFound = x0Sisters(child, cat);
            if(x0SistersFound) break;
        }

    }
    return x0SistersFound;
}

function ternaryNodes(sTree, maxBr){
    var ternaryNodesFound = false;
    if(sTree.children && sTree.children.length){
        if(sTree.children.length > maxBr){
            ternaryNodesFound = true;
            return true;
        }
        for(var i=0; i<sTree.children.length; i++){
            var child = sTree.children[i];
            ternaryNodesFound = ternaryNodes(child, maxBr);
            if(ternaryNodesFound) break;
        }

    }
    return ternaryNodesFound;
}

function headsOnWrongSide(sTree, side, strict){
    var badHeadFound = false;
    if(sTree.children && sTree.children.length > 1){
        var i = 0;
        while(!badHeadFound && i<sTree.children.length){
            var child = sTree.children[i];
            if(child.cat==='x0'){
                if((side==='right' && i===0) || (side==='left' && i===sTree.children.length-1)){
                    badHeadFound = true;
                }
                if(strict==='strict'){
                    if((side==='right' && i<sTree.children.length-1) || (side==='left' && i>0)){
                        badHeadFound = true;
                    }
                }
            }
            else{
                badHeadFound = headsOnWrongSide(child, side);
            }
            i++;
        }
    }
    return badHeadFound;

}

// Input Gen option to remove trees that are mirror images of trees earlier in the list
// returns true if tree is a mirror of an eariler tree
// returns false if tree is not a mirror image of an earlier tree
function mirrorImages(sTree, sTreeList) {
	var mirrorImageExists = false;
	var index = sTreeList.indexOf(sTree, sTree);
	var reverseTree = sTree;
	console.log(sTree)
	console.log(parenthesizeTree(sTree))
	reverseTree = getReverseTree(reverseTree);
	console.log(parenthesizeTree(sTree))
	for(var i = 0; i < index; i++) {
		var currTree = sTreeList[i];
		var checkReverse = checkReverseTree(reverseTree, currTree);
		if(checkReverse) {
			mirrorImageExists = true;
			return mirrorImageExists;
		}
	}
	return mirrorImageExists;
}

// Definition of mirror image:
// Ignoring ids, but not cats, the mirror image of a tree T
// is a tree T' in which every children array in T is in reverse order in T'.
// Example:
// T = [x0 [x0 [x0]]]
// T' = [[[x0] x0] x0]
function getReverseTree(rTree) {
  if(rTree.children && rTree.children.length){
		rTree.children = rTree.children.reverse();
    for(var i=0; i<rTree.children.length; i++){
      var child = rTree.children[i];
      getReverseTree(child);
    }
  }
	return rTree;
}

function checkReverseTree(sTree, currTree) {
	return false;
}
