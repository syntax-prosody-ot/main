function noShift(stree, ptree, cat){
    //Get lists of terminals

    var sleaves = getLeaves(stree);
    var pleaves = getLeaves(ptree);
    var sorder = new Array(sleaves.length);
    var porder = new Array(pleaves.length);

    try {
      if(sleaves.length != pleaves.length) {
        throw new Error("NoShift problem: The stree and ptree have different numbers of terminals!");
      }
    }
    catch(err) {
      // Display error message in alert if error is thrown
      console.warn(err);
    }

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
        // establish lists of x precedes
        var y = sorder.slice(j+1, sorder.length);
        var px = porder.indexOf(sorder[j]);
        var z = porder.slice(px+1, porder.length);

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
