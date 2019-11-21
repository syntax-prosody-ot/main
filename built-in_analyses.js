/* Built-in Analyses */

/*function to clear out any previous interaction with the interface, either from
 * the user or from another built-in alalysis. */
function clearAnalysis(){
  var genOptions = document.getElementsByName("genOptions");
  var constraints = document.getElementsByName("constraints");
  for(var i = 0; i<genOptions.length; i++){
    if(genOptions[i].checked){
      genOptions[i].click();
    }
  }
  document.getElementById("spotForm")["genOptions-rootCategory"].value = "i";
  document.getElementById("spotForm")["genOptions-recursiveCategory"].value = "phi";
  document.getElementById("spotForm")["genOptions-terminalCategory"].value = "w";
  for(var i = 0; i<constraints.length; i++){
    if(constraints[i].checked){
      constraints[i].click();
    }
  }
  window.clearUTrees();
  document.getElementById("stree-textarea").value = '{}';
}

/* Function to check all of the boxes for a built-in constaint set in the UI
 * takes an array of objects with the properties "name" and "cat"
 * "name" is the name of a constraint as it is called in SPOT (ie "alignLeft")
 * "cat" is the category which that constraint should be called on (ie "xp")
*/
function built_in_con(input){
  //all of the fieldsets, which contain the constraint inputs
  var conFields = document.getElementsByTagName("fieldset");
  //for the constraint table rows which hide the category options
  var con_trs;
  //for the constraint and category checkboxes
  var con_boxes;

  //iterate over the inputs
  for(var i = 0; i < input.length; i++){
    //iterate over the fieldsets
    for(var x = 0; x < conFields.length; x++){
      //get all of the table rows in this fieldset
      con_trs = conFields[x].getElementsByTagName("tr");
      //iterate over the table rows in this fieldset
      for(var y = 0; y < con_trs.length; y++){
        //get checkboxes in this table row
        con_boxes = con_trs[y].getElementsByTagName("input");
        //check if constraint is in the current slot if the input
        //assumes that constraint is the first checkbox
        if(con_boxes[0].value === input[i].name){
          //select the constraint
          con_boxes[0].checked =  "checked";
          //open the fieldset
          conFields[x].setAttribute("class", "open")
          //reveal the categories
          con_trs[y].setAttribute("class", "constraint-checked")
          //iterate over the check boxes for cateogories
          //assumes that the constraint is the first check box
          for(var z = 1; z < con_boxes.length; z++){
            // select the category if the input calls for it
            if(con_boxes[z].value === input[i].cat){
              // see below comment re "checked" == "built_in"
              con_boxes[z].checked =  "built_in";
            }
            // deselect category unless already selected by built-in system
            else if(con_boxes[z].checked !== "built_in"){
              con_boxes[z].checked = false;;
              /* re "checked" == "built_in"
               * categories that have already been selected (eg. default
               * category for constraint) should be deselected, unless that
               * category has already been selected by the built-in system (ie.
               * both matchSP-xp and matchSP-x0 are desired). By setting
               * "checked" to "built_in", we can keep track of when this happens
               */
            }
          }
        }
      }
    }
  }
}



/*Template for built-in analyses
* Arguments:
* myGEN: a GEN options object
*   ex. {obeysExhaustivity: true, obeysNonRecursivity: false, noUnary: true}
* myCon: a list of constraints in form [{name: "constraint", cat: "name"}]
*   ex. [{name: "matchSP", cat:"xp"}, {name: "strongStart_Elfner", cat: "w"}, {name: "binMinBranches", cat: "phi"}, {name: "binMaxBranches", cat: "phi"}]
* myTrees: a list of trees
* showTones: either false or a string indicating the name of a tone annotation function to call
*   ex. "addJapaneseTones", "addIrishTones_Elfner"
*/
function my_built_in_analysis(myGEN, showTones, myTrees, myCon){
  //Step 0: clear the webpage
  clearAnalysis();
  //Step 1: GEN options
  var genBoxes = document.getElementsByName("genOptions");
  for(var box in genBoxes){
    var optVal = myGEN[genBoxes[box].value];
    if(optVal===true){
      genBoxes[box].checked = true;
    }
    if(optVal instanceof Array && genBoxes[box].value==='obeysExhaustivity'){
      var exhaustivityBox = document.getElementById("exhaustivityBox");
      //exhaustivityBox.click();
      exhaustivityBox.checked = "checked";
      var exhaustivityCats = document.getElementsByName("exhaustivityCats");
      for (var x = 0; x < exhaustivityCats.length; x++){
        exhaustivityCats[x].parentNode.style.display = "table-cell";
        if(optVal.indexOf(exhaustivityCats[x].value)>=0){
          exhaustivityCats[x].checked=true;
        }
        else{
          exhaustivityCats[x].checked=false;
        }
      }
    }
  }
  if(myGEN.rootCategory){
    document.getElementById("spotForm")["genOptions-rootCategory"].value = myGEN.rootCategory;
  }
  if(myGEN.recursiveCategory){
    document.getElementById("spotForm")["genOptions-recursiveCategory"].value = myGEN.recursiveCategory;
  }
  if(myGEN.terminalCategory){
    document.getElementById("spotForm")["genOptions-terminalCategory"].value = myGEN.terminalCategory;
  }


  //Step 2: CON. Call a helper function to select the appropriate constraints & categories.
  built_in_con(myCon);

  //Step 3: Trees
  //First, shows the tree UI & the code view
  document.getElementById("treeUI").style.display = "block";
  for(var i = 0; i < myTrees.length; i++){
	  var myUTree = new UTree(myTrees[i]);
	  window.showUTree(myUTree);
  }
  document.getElementById("htmlToJsonTreeButton").click();
  //document.getElementById("tree-code-box").click();
  //Then paste trees in
  //document.getElementById("stree-textarea").value = JSON.stringify(myTrees);

  // Step 4: If showTones is not false, the tableaux will be annotated with tones.
  if(showTones){
    var toneCheckbox = document.getElementById("annotatedWithTones");
    toneCheckbox.checked = true;
    //console.log(toneCheckbox.checked);
    var toneButtons = toneCheckbox.parentNode.parentNode.getElementsByTagName("input");
    for(var x = 0; x < toneButtons.length; x++){
      toneButtons[x].parentNode.setAttribute("style", "display: table-cell");
      if(toneButtons[x].value===showTones){
        toneButtons[x].checked =  "checked";
      }
      else if (toneButtons[x] !== toneCheckbox){
        //we don't want multiple radio buttons to be checked, it gets confusing
        toneButtons[x].checked = false;
        //toneButtons[x].removeAttribute("checked");
      }
    }
  }
}

//Irish, as analysed in Elfner (2012), with some useful trees
function built_in_Irish(){
  var myGEN = {obeysExhaustivity:['i','phi']};
  var myCON = [{name: "matchSP", cat:"xp"}, {name: "strongStart_Elfner", cat: "w"}, {name: "binMinBranches", cat: "phi"}, {name: "binMaxBranches", cat: "phi"}];
  var myTrees = irish_trees;
  var showTones = "addIrishTones_Elfner";

  my_built_in_analysis(myGEN, showTones, myTrees, myCON);
}

function built_in_Kinyambo(){
  var kGEN = {obeysHeadedness: true, obeysNonrecursivity: true, obeysExhaustivity: true};
  var ktrees = kinyambo_trees;
  var kcon = [{name:'matchSP', cat:'xp'}, {name:'matchPS', cat:'phi'}, {name:'binMinBranches',cat:'phi'}, {name:'binMaxBranches', cat:'phi'}];
  my_built_in_analysis(kGEN, false, ktrees, kcon);
}

function built_in(analysis) {
  if(analysis === "irish") {
    built_in_Irish();
  }
  if(analysis === "kinyambo") {
    built_in_Kinyambo();
  }
}
