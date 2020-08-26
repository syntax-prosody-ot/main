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

function unaryNodes(sTree, minBr){
    var unaryNodesFound = false;
    if(sTree.children && sTree.children.length){
        if(sTree.children.length < minBr){
            unaryNodesFound = true;
            return true;
        }
        for(var i=0; i<sTree.children.length; i++){
            var child = sTree.children[i];
            unaryNodesFound = unaryNodes(child, minBr);
            if(unaryNodesFound) break;
        }

    }
    return unaryNodesFound;
}

function headsOnWrongSide(sTree, side, strict){
    var badHeadFound = false;
		if(sTree.cat === 'cp' && sTree.id === 'root' && sTree.children.length === 1) {
			sTree = sTree.children[0];
		}
    if(sTree.children && sTree.children.length > 1){
				console.log("in headsOnWrongSide()")
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

// returns true if sTree is a mirror of an earlier tree in sTreeList
// returns false if sTree is not a mirror image of an earlier tree in sTreeList
function mirrorImages(sTree, sTreeList) {
	var mirrorImageExists = false;
	var index = sTreeList.indexOf(sTree);
	//var reverseTree = JSON.parse(JSON.stringify(sTree));
	for(var i = 0; i < index; i++) {
		var currTree = sTreeList[i];
		if(checkMirror(currTree, sTree)) {
			mirrorImageExists = true;
			return mirrorImageExists;
		}
	}
	return mirrorImageExists;
}

// check for if trees are mirror images of eachother
function checkMirror(sTree, rTree) {
	if(sTree.children && sTree.children.length){
			if(rTree.children === undefined || sTree.children.length !== rTree.children.length) {
				return false;
			}
			for(var i=0; i<sTree.children.length; i++){
					var sChild = sTree.children[i];
					var rChild = rTree.children[sTree.children.length-i-1];
					if (sChild.cat !== rChild.cat) {
						return false;
					}
					if(!checkMirror(sChild, rChild)){
                        return false;
                        //quit early if checkMirror evaluates to false for any child.
                    }
			}
    }
    //if sTree has no children but rTree does
    else if(rTree.children && rTree.children.length > 0){
        return false;
    }
	return true;
}

// Return true if there is any node that has more than two children x such that x.cat === 'xp'.
// Two xp children is fine, but three (or more) is not fine.
function threeXPs(sTree) {
	var threeXPsFound = false;
	if(sTree.children && sTree.children.length){
		// console.log(sTree.children)
		var numXPs = 0;
		for(var i=0; i<sTree.children.length; i++){
			var child = sTree.children[i];
			if(child.cat === 'xp') {
				numXPs += 1;
			}
			if(numXPs > 2) {
				threeXPsFound = true;
				break;
			}
			threeXPsFound = threeXPs(child);
			if(threeXPsFound) break;
		}
	}
	return threeXPsFound;
}

// Return true if there is a node in it whose children are all xps, false if all nodes have an x0 child
function containsAdjunct(sTree) {
	var adjunctFound = false;
	if(sTree.children && sTree.children.length){
		var numXPs = 0;
		for(var i=0; i<sTree.children.length; i++){
			var child = sTree.children[i];
			if(child.cat === 'xp') {
				numXPs += 1;
			}
			if(numXPs == sTree.children.length) {
				adjunctFound = true;
				break;
			}
			adjunctFound = containsAdjunct(child);
			if(adjunctFound) break;
		}
	}
	return adjunctFound;
}
