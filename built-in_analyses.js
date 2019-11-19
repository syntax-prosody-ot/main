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

/* Save Analysis:
 * functionality to save the options, constraints and inputs of an analysis to
 * be loaded later by the existing built-in analysis functionality
 */

/* Record Analysis:
 * function to gather all of the options, constraints and inputs currently in
 * the window
 */
function record_analysis(){
  var analysis = {
    myGEN: {},
    showTones: false,
    myTrees: [],
    myCon: []
  };
  /* analysis has attributes corresponding to inputs to
   * my_built_in_analysis(): myGEN, showTones, myTrees, myCON
   */
  var spotForm = document.getElementById("spotForm");

  //myGEN
  for(var i = 0; i<spotForm.genOptions.length; i++){
    var option = spotForm.genOptions[i];
    //make sure "obeys exhaustivity has an array value"
    if(option.value === "obeysExhaustivity" && option.checked){
      var exCats = [];
			for(var x=0; x<spotForm.exhaustivityCats.length; x++){
				var exCatBox = spotForm.exhaustivityCats[x];
				if(exCatBox.checked)
					exCats = exCats.concat(exCatBox.value);
			}
      analysis.myGEN.obeysExhaustivity = exCats;
    }
    else if(option.value === "usesTones" && option.checked){
      analysis.showTones = spotForm.toneOptions.value;
    }
    else if(option.value === "rootCategory" && option.checked){
      analysis.myGEN.rootCategory = spotForm['category-rootCategory'].value;
    }
    else if(option.value === "recursiveCategory" && option.checked){
      analysis.myGEN.recursiveCategory = spotForm['category-recursiveCategory'].value;
    }
    else if(option.value === "terminalCategory" && option.checked){
      analysis.myGEN.terminalCategory = spotForm['category-terminalCategory'].value;
    }
    else if(option.checked){
      analysis.myGEN[option.value] = true;
    }
  }

  //myTrees
  analysis.myTrees = JSON.parse(document.getElementById("stree-textarea").value);

  //myCon
  var uCon = spotForm.constraints;
  for(var i = 0; i<uCon.length; i++){
    var cName = uCon[i].value;
    var uCategories;
    if(uCon[i].checked){
      uCategories = spotForm['category-'+cName];
      for(var x = 0; x<uCategories.length; x++){
        var cat = uCategories[x];
        if(cat.checked){
          analysis.myCon.push({name: cName, cat: cat.value});
        }
      }
    }
  }

  return JSON.stringify(analysis);
}

/* funtion to create the elements necessary to download an analysis in JSON
 * string form.
 * Takes two arguments, both strings, the analysis in JSON string form and the
 * file name. This function will append ".SPOT" to the filename
 * fileName is an argument for this function in case we want to make the user
 * choose the file name instead of calling the file myAnalysis automatically
 */
function saveAnalysis(analysis, fileName){
  var spotAnalysis = new Blob(["//SPOT analysis file https://people.ucsc.edu/~jbellik/spot/interface1.html\n"+"'"+analysis+"'"+"\n"], {type: "text/plain;charset=utf-8"});
  fileName = fileName+".SPOT";
  saveAs(spotAnalysis, fileName);
  document.getElementById("save/load-dialog").innerHTML = "File saved as "+fileName+" Press \"Load\" and choose "+fileName+" to load this analysis in the future."
}

// function to show file upload button and instructions for loading an analysis
function loadAnalysis(){
  var dialog = document.getElementById("save/load-dialog");
  dialog.innerHTML = "Analysis loaded. Choose another file to change analysis."
}
