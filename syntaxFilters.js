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