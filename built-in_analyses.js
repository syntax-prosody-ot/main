/* Built-in Analyses */

/*function to clear out any previous interaction with the interface, either from
 * the user or from another built-in alalysis. */
function clearAnalysis(){
  var genOptions = document.getElementsByName("genOptions");
  var hideCategories = document.getElementsByName('hideCategory');
  var constraints = document.getElementsByName("constraints");
  var fieldsets = document.getElementsByTagName("fieldset");

  //reset gen options
  for(var i = 0; i<genOptions.length; i++){
    if(genOptions[i].checked){
      genOptions[i].click();
    }
  }

  //reset prosodic categories
  document.getElementById("spotForm")["genOptions-rootCategory"].value = "i";
  document.getElementById("spotForm")["genOptions-recursiveCategory"].value = "phi";
  document.getElementById("spotForm")["genOptions-terminalCategory"].value = "w";

  //reset tree parenthesization options
  for(var i = 0; i<hideCategories.length; i++){
    hideCategories[i].checked = false;
  }

  //reset constraints
  for(var i = 0; i<constraints.length; i++){
    if(constraints[i].checked){
      constraints[i].click();
    }
  }

  for(var i = 0; i<fieldsets.length; i++){

    fieldsets[i].classList.remove("open");


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
  //for the constraint and category checkboxes
  var con_boxes;
  //for the categories of a constraint
  var cat_boxes;
  //string of all the constraints used so far
  var usedCons = "";

  //iterate over the inputs
  for(var i = 0; i < input.length; i++){
    //iterate over the fieldsets
    for(var x = 0; x < conFields.length; x++){
      //get the checkboxes in the fieldset
      con_boxes = conFields[x].getElementsByTagName("input");
      //iterate over the checkboxes in this fieldset
      for(var y = 0; y < con_boxes.length; y++){
        if(con_boxes[y].value === input[i].name && con_boxes[y].name === "constraints"){
          //click on the constraint if it is not already checked
          if(!con_boxes[y].checked){
            con_boxes[y].click();
          }
          //open the fieldset
          conFields[x].setAttribute("class", "open");
          cat_boxes = document.getElementsByName("category-"+input[i].name);
          for(var z = 0; z < cat_boxes.length; z++){
            //used to test if constraint has been used before:
            var regex = new RegExp(input[i].name);
            // select the category if the input calls for it
            if(cat_boxes[z].value === input[i].cat){
              cat_boxes[z].checked =  true;
            }
            //for dealing with text input (currently only from alignLeftMorpheme)
            else if(cat_boxes[z].type==="text"){
              cat_boxes[z].checked =  true;
              cat_boxes[z].value = input[i].cat;
            }
            // otherwise clear out category if this constraint has not been used before
            else if(!regex.test(usedCons)){
              cat_boxes[z].checked = false;
            }
          }
        }
      }
    }
    //handeling constraint options, uses last constraint options object specified
    /* we only need to do this once per input and we should probably run it after
     * all of the constraints and categories have been checked */
    if(input[i].options && document.getElementsByName("option-"+input[i].name) && document.getElementsByName("option-"+input[i].name).length){
      var optionBoxes = document.getElementsByName("option-"+input[i].name);
      //iterate over option checkboxes corresponding to this input
      for(var x in optionBoxes){
        if(input[i].options[optionBoxes[x].value]){
          optionBoxes[x].checked = true;
        }
        else{
          optionBoxes[x].checked = false;
        }
      }
    }
    //record that this constraint has already been used so other inputs don't overwrite it
    usedCons = usedCons+input[i].name;
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
  // To move clitics: value should be "cliticMovement"
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
  if(myGEN.rootCategory && (myGEN.rootCategory !== "i")){
    document.getElementById("prosodicCategories").setAttribute("class", "open");
    document.getElementById("spotForm")["genOptions-rootCategory"].value = myGEN.rootCategory;
  }
  if(myGEN.recursiveCategory && (myGEN.recursiveCategory !== "phi")){
    document.getElementById("prosodicCategories").setAttribute("class", "open");
    document.getElementById("spotForm")["genOptions-recursiveCategory"].value = myGEN.recursiveCategory;
  }
  if(myGEN.terminalCategory && (myGEN.terminalCategory !== "w")){
    document.getElementById("prosodicCategories").setAttribute("class", "open");
    document.getElementById("spotForm")["genOptions-terminalCategory"].value = myGEN.terminalCategory;
  }
  //hide boundaries for nodes of category...
  //myGEN.invisibleCategories should be an array
  if(myGEN.invisibleCategories && myGEN.invisibleCategories.length){
    var hideCategories = document.getElementsByName('hideCategory');
    //open the fieldset:
    document.getElementById("treeDisplayOptions").setAttribute("class", "open");
    //iterate over specified invisible categories
    for(var x = 0; x<myGEN.invisibleCategories.length; x++){
      //iterate over hideCategory checkboxes
      for(var y = 0; y<hideCategories.length; y++){
        if(hideCategories[y].value === myGEN.invisibleCategories[x]){
          hideCategories[y].checked = true;
        }
      }
    }
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
    //open the tree display options fieldset
    document.getElementById("treeDisplayOptions").setAttribute("class", "open");
    //make sure the annotated with tones checkbox is checked and its options are open
    if(!toneCheckbox.checked){
      toneCheckbox.click();
    }
    //the tone annotation options:
    var toneButtons = document.getElementsByName("toneOptions");
    for(var x = 0; x < toneButtons.length; x++){
      if(toneButtons[x].value===showTones){
        toneButtons[x].checked =  "checked";
      }
      else if (toneButtons[x] !== toneCheckbox){
        //we don't want multiple radio buttons to be checked, it gets confusing
        toneButtons[x].checked = false;
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

function built_in_Japanese_IM2017(){
  var gen = {obeysHeadedness: true, obeysExhaustivity: true};

  var con = [{name: 'matchMaxSyntax', cat:'xp'}, {name:'matchPS', cat:'phi'}, {name: 'matchSP', cat:'xp'}, {name: 'binMinBranches', cat:'phi'}, {name:'binMaxBranches', cat:'phi'}, {name:'binMaxLeaves', cat:'phi'}, {name:'equalSistersAdj', cat:'phi'}, {name: 'equalSisters2', cat:'phi'}, {name: 'accentAsHead', cat: ''}, {name: 'noLapseL', cat: ''}];

  var jtrees = getAccentTrees();

  my_built_in_analysis(gen, 'addJapaneseTones', jtrees, con);

}

/* Nick VH, please fill in your system's info here
*/
function built_in_Italian_NVH(){
  var gen = {};
  var con = [];
  var trees = [];
  my_built_in_analysis(gen, false, trees, con);
}

/* Richard, please fill in your system's info here
*/
function built_in_Chamorro_RB(){
  var gen = {};
  var con = [];
  var trees = [];
  my_built_in_analysis(gen, false, trees, con);
}

function built_in(analysis) {
  if(analysis === "irish") {
    built_in_Irish();
  }
  if(analysis === "kinyambo") {
    built_in_Kinyambo();
  }
  if(analysis === "ito&mester2017"){
    built_in_Japanese_IM2017();
  }
  if(analysis=== "italian"){
    built_in_Italian_NVH();
  }
  if(analysis=== "chamorro"){
    built_in_Chamorro_RB();
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
  for(var i = 0; i<spotForm.genOptions.length; i++){ //iterate over gen options
    var option = spotForm.genOptions[i];
    //make sure "obeys exhaustivity" has an array value
    if(option.value === "obeysExhaustivity" && option.checked){
      var exCats = [];
			for(var x=0; x<spotForm.exhaustivityCats.length; x++){
				var exCatBox = spotForm.exhaustivityCats[x];
				if(exCatBox.checked)
					exCats = exCats.concat(exCatBox.value);
			}
      analysis.myGEN.obeysExhaustivity = exCats;
    }
    //make sure "showTones" has a string value
    else if(option.value === "usesTones" && option.checked){
      analysis.showTones = spotForm.toneOptions.value;
    }
    else if(option.checked){
      analysis.myGEN[option.value] = true;
    }
  }
  //gen categories:
  analysis.myGEN.rootCategory = spotForm['genOptions-rootCategory'].value;
  analysis.myGEN.recursiveCategory = spotForm['genOptions-recursiveCategory'].value;
  analysis.myGEN.terminalCategory = spotForm['genOptions-terminalCategory'].value;

  //gen hide categories
  analysis.myGEN.invisibleCategories = [];
  for(var i = 0; i < spotForm.hideCategory.length; i++){
    var hiddenCat = spotForm.hideCategory[i];
    if(hiddenCat.checked){
      analysis.myGEN.invisibleCategories.push(hiddenCat.value);
    }
  }

  //myTrees
  analysis.myTrees = JSON.parse(document.getElementById("stree-textarea").value);

  //myCon
  var uCon = spotForm.constraints;
  for(var i = 0; i<uCon.length; i++){ //iterate over constraints in interface
    var cName = uCon[i].value; //constraint name for myCON array
    if(uCon[i].checked){
      if(spotForm['category-'+cName]){
        var uCategories = spotForm['category-'+cName]; //categories for this constraint
        for(var x = 0; x<uCategories.length; x++){ //iterate over categories
          var cat = uCategories[x];
          if(cat.checked){
            analysis.myCon.push({name: cName, cat: cat.value}); //add to con
          }
        }
      }
      else{
        //if the constraint does not have category specifications (accent constraints)
        analysis.myCon.push({name: cName}); //add to con without category specification
      }
    }
  }
  //matchOptions
  var matchReg = /match/;
  //iterate over all the selected constraints
  for(var i = 0; i<analysis.myCon.length; i++){
    var matchCon = analysis.myCon[i];
    //if the constraint name has "match" in it
    if(matchReg.test(matchCon.name)){
      matchCon.options = {};
      var matchOptions = spotForm["option-"+matchCon.name];
      //iterate over the options for this match constraint
      for(var x = 0; x<matchOptions.length; x++){
        matchCon.options[matchOptions[x].value] = matchOptions[x].checked;
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
  //Blob object becomees downloadable text file
  var spotAnalysis = new Blob(["//SPOT analysis file usable at https://people.ucsc.edu/~jbellik/spot/interface1.html\n"+"'"+analysis+"'"+"\n"], {type: "text/plain;charset=utf-8"});
  fileName = fileName+".SPOT";
  //saveAs is defined at the bottom of interface1.js
  saveAs(spotAnalysis, fileName);
  //confirmation:
  document.getElementById("save/load-dialog").innerHTML = "File saved as "+fileName+" <br/>Press \"Load\" and choose "+fileName+" to load this analysis in the future."
}

// function to show file upload button and instructions for loading an analysis
function loadAnalysis(file){
  //only run if the file has the extention ".SPOT"
  if(file.name.slice(-5)===".SPOT"){
    var contents; //file contentes
    read = new FileReader();
    read.readAsText(file);
    read.onload = function(){
      contents = read.result;
      try{
        /* JSON string begins on the second line of the SPOT file
         * (indexOf("\n")+2) and ends right before a newline character (-2)
        */
        var analysis = JSON.parse(contents.slice(contents.indexOf("\n")+2, -2));
        //load the built-in analysis using the parameters set in file
        my_built_in_analysis(analysis.myGEN, analysis.showTones, analysis.myTrees, analysis.myCon);
        var dialog = document.getElementById("save/load-dialog");
        dialog.innerHTML = "Analysis loaded. Choose another file to change analysis.";
        document.getElementById("chooseFilePrompt").style = "display: none";
      }
      catch(err){
        //error handeling:
        console.error("File does not follow SPOT format:");
        console.error(err);
        return;
      }
    }
  }
}
