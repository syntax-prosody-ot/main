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
	var index = sTreeList.indexOf(sTree);
	var reverseTree = JSON.parse(JSON.stringify(sTree));
	// console.log(sTree)
	// console.log(parenthesizeTree(sTree))
	reverseTree = getReverseTree(reverseTree);
	// console.log(parenthesizeTree(sTree))
	for(var i = 0; i < index; i++) {
		var currTree = sTreeList[i];
		var checkReverse = checkReverseTree(reverseTree, currTree);
		console.log(checkReverse, "reverseTree: ", index, "currTree: ", i)
		if(checkReverse) {
			mirrorImageExists = true;
			return mirrorImageExists;
		}
	}
	return mirrorImageExists;
}

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

// Definition of mirror image:
// Ignoring ids, but not cats, the mirror image of a tree T
// is a tree T' in which every children array in T is in reverse order in T'.
// Example:
// T = [x0 [x0 [x0]]]
// T' = [[[x0] x0] x0]
function checkReverseTree(rTree, currTree) {
	var checkTree = false;
	if(rTree.children && rTree.children.length && currTree.children && currTree.children.length){
		var length = rTree.children.length
    for(var i=0; i<length; i++){
      var rChild = rTree.children[i];
			var currChild = currTree.children[i];
			if(rChild && currChild) {
				var rCat = rChild.cat;
				// var currCat = currTree.children[length-1-i].cat;
				var currCat = currChild.cat;
				if(rCat && currCat) {
					if(rCat === currCat) {
						checkTree = true;
					}
					else {
						checkTree = false;
						return checkTree;
					}
				}
				else {
					checkTree = false;
					return checkTree;
				}
			}
			else {
				checkTree = false;
				return checkTree;
			}
      checkReverseTree(rChild, currChild);
    }
  }
	return checkTree;
}
