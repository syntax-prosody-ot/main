function noShift(stree, ptree, cat) {
  //Get lists of terminals

  // var sleaves = getLeaves(stree);
  // var pleaves = getLeaves(ptree);
  // var sorder = new Array(sleaves.length);
  // var porder = new Array(pleaves.length);
  //
  // try {
  //   if(sleaves.length != pleaves.length) {
  //     throw new Error("NoShift problem: The stree and ptree have different numbers of terminals!");
  //   }
  // }
  // catch(err) {
  //   // Display error message in alert if error is thrown
  //   console.warn(err);
  // }
  //
  // for(var i in sleaves){
  //     sorder[i] = sleaves[i].id;
  //     porder[i] = pleaves[i].id;
  // }

  //for the gradient version, we may want to use parenthesize tree for this, but we'll worry about that later.

  // get list of terminals using helper function
  var sorder = getTerminals(stree);
  var porder = getTerminals(ptree);

  //counter
  var j = 0;
  //flag for whether a shift in order has been detected
  var shiftFound = false;

  while (!shiftFound && j < sorder.length) {
    var x = sorder[j];
    // establish lists of x precedes
    var y = sorder.slice(j + 1, sorder.length);
    var px = porder.indexOf(sorder[j]);
    var z = porder.slice(px + 1, porder.length);

    //if y has more elements than z, y can't possibly be a subset of z
    if (y.length > z.length) {
      shiftFound = true;
    }

    //otherwise, y may or may not be a subset of z
    var k = 0;
    while (k < sorder.length) {
      if (porder.indexOf(sorder[k]) < 0) {
        shiftFound = true;
      }
      k++;
    }

    //increment outer counter and check the next word
    j++;
  }

  return shiftFound ? 1 : 0;
}

function noShiftGradient(stree, ptree, cat) {
  var sorder = getTerminals(stree);
  var porder = getTerminals(ptree);
  var vcount = 0;
  var length = sorder.length;

  // initialize nxn tables of precedence relations as false
  var sRel = new Array(length);
  var pRel = new Array(length);
  for (var i = 0; i < length; i++) {
    sRel[i] = new Array(length);
    pRel[i] = new Array(length);
    for (var j = 0; j < length; j++) {
      sRel[i][j] = false;
      pRel[i][j] = false;
    }
  }

  // fill in true precedence relations in tables where precedence is true
  for (i = 0; i < length - 1; i++) {
    var sy = sorder.slice(i + 1, length);
    var px = porder[i];
    var py = porder.slice(i + 1, length);
    for (j = 0; j < sy.length; j++) {
      sRel[i][sorder.indexOf(sy[j])] = true;
      pRel[sorder.indexOf(px)][sorder.indexOf(py[j])] = true;
    }
  }

  // count violations, where precedence relation is true in sorder and false in porder
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length; j++) {
      if (sRel[i][j] == true && pRel[i][j] == false) {
        vcount++;
      }
    }
  }

  return vcount;
}

function getTerminals(tree) {
  var leaves = getLeaves(tree);
  var order = new Array(leaves.length);
  for (var i in leaves) {
    order[i] = leaves[i].id;
  }
  return order;
}
