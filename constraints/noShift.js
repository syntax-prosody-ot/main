function noShift(stree, ptree, cat){
    //Get lists of terminals
    
    var sleaves = getLeaves(stree);
    var pleaves = getLeaves(ptree);
    var sorder = new Array(sleaves.length);
    var porder = new Array(pleaves.length);

    for(var i in sleaves){
        sorder[i] = sleaves[i].id;
        porder[i] = pleaves[i].id;
    }
    //for the gradient version, we may want to use parenthesize tree for this, but we'll worry about that later.

    //counter
    var j = 0;
    //flag for whether a shift in order has been detected
    var shiftFound = false;

    while(!shiftFound && j<sorder.length){
        var x = sorder[j];
        var y = sorder.slice(j+1, sorder.length);
        var z = porder.slice(j+1, porder.length);

        //if y has more elements than z, y can't possibly be a subset of z
        if(y.length > z.length){
            shiftFound = true;
        }

        //otherwise, y may or may not be a subset of z
        var k = 0;
        while(k<sorder.length){
            if(porder.indexOf(sorder[k])<0){
                shiftFound = true;
            }
            k++;
        }

        //increment outer counter and check the next word
        j++;
    }
    return shiftFound ? 1 : 0;
}