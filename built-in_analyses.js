/* Built-in Analyses */

function clearInputs(){
  let inputOptions = spotForm['autoInputOptions'];
  //document.getElementById('inputOptions');

  spotForm['autoInputOptions-rootCategory'].value = 'xp';
  spotForm['autoInputOptions-recursiveCategory'].value = 'xp';
  spotForm['autoInputOptions-terminalCategory'].value = 'x0';

  for(let i = 0; i<inputOptions.length; i++){
    if(inputOptions[i].checked){
      inputOptions[i].click();
    }
  }

  spotForm['head-req'].value = 'select';

  if(document.getElementById('add-clitics').checked){
    document.getElementById('add-clitics').click();
  }

  let inputStrings = spotForm['inputToGenAuto'];

  if(inputStrings.length){
    for(let i = 0; i<inputStrings.length; i++){
      inputStrings[i].value = '';
      if(i>0){
        inputStrings[i].parentElement.remove();
      }
    }
  }
  else{
    inputStrings.value = '';
  }

  let inputTerminals = document.getElementsByName('genStringsInput');

  inputTerminals[0].value = '';
  document.getElementsByName('genStringsMin')[0].value = '';
  document.getElementsByName('genStringsMax')[0].value = '';

  while(inputTerminals.length > 1) {
    inputTerminals[inputTerminals.length - 1].parentElement.remove();
  }

  changeInputTabs('inputButton', 'goButton');
}

/*function to clear out any previous interaction with the interface, either from
 * the user or from another built-in alalysis. */
function clearAnalysis(){
  var genOptions = document.getElementsByName("genOptions");
  var hideCategories = document.getElementsByName('hideCategory');
  var constraints = document.getElementsByName("constraints");
  var conOptions;
  var fieldsets = document.getElementsByTagName("fieldset");
  var showMoreDivs = document.getElementsByClassName('more-constraints');

  //restrict branches text should default to 2, I think
  spotForm['maxBranchingValue'].value = 2;

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
    //reset constraint options
    conOptions = document.getElementsByName("option-"+constraints[i].value);
    if(conOptions.length){
      for(var z = 0; z < conOptions.length; z++){
        //set checkboxes to unchecked
        if(conOptions[z].type == "checkbox"){
          conOptions[z].checked = false;
        }
        //set drop-down selectors to "any"
        else if(conOptions[z].tagName === "SELECT"){
          //all of the drop-down constraint options default to "any" as of 2/1/20 -MT
          conOptions[z].value = "any";
        }
      }
    }
  }

  for(var i = 0; i<fieldsets.length; i++){

    fieldsets[i].classList.remove("open");


  }
  for(var i = 0; i<showMoreDivs.length; i++){
    showMoreDivs[i].style.display = 'none';
  }
  window.clearUTrees();
  document.getElementById("stree-textarea").value = '{}';
  document.getElementById("autoTreeBox").innerHTML = '';
  if(document.getElementById("syntax-tree-switch").checked){
    document.getElementById("syntax-tree-switch").click();
  }
  changeInputTabs('inputButton', 'goButton');
  
  clearInputs();

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
          //open "show more", if the constraint belongs to it
          var showMoreDivs = document.getElementsByClassName("more-constraints");
          for(var q = 0; q<showMoreDivs.length; q++){
            if(showMoreDivs[q].contains(con_boxes[y])){
              showMoreDivs[q].style.display = "block";
            }
          }

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
    //handling constraint options, uses last constraint options object specified
    /* we only need to do this once per input and we should probably run it after
     * all of the constraints and categories have been checked */
    if(input[i].options && document.getElementsByName("option-"+input[i].name) && document.getElementsByName("option-"+input[i].name).length){
      var optionBoxes = document.getElementsByName("option-"+input[i].name);
      if(optionBoxes.length){
        //iterate over option checkboxes corresponding to this input
        for(var x in optionBoxes){
          //dealing with checkboxes
          if(optionBoxes[x].type === "checkbox"){
            if(input[i].options[optionBoxes[x].value]){
              optionBoxes[x].checked = true;
            }
            else{
              optionBoxes[x].checked = false;
            }
          }
          //if not a checkbox, it should be a selector
          else if(optionBoxes[x].tagName === "SELECT"){
            var child = optionBoxes[x].getElementsByTagName("option");
            //iterate over options in the select tag
            for(var count = 0; count < child.length; count++){
              if(input[i].options[child[count].value]){
                /*if the input options contain reference to the options inside
                this selector, set this selector to that option value */
                optionBoxes[x].value = child[count].value;
              }
            }
          }
        }
      }
      //if there is only one option for this constraint:
      else{
        optionBoxes.checked = true;
      }
    }
    //record that this constraint has already been used so other inputs don't overwrite it
    usedCons = usedCons+input[i].name;
  }
}

function built_in_input(myTrees){
  if(Array.isArray(myTrees)){ //manual trees
    //First, shows the tree UI & the code view
    changeInputTabs('inputButton', 'goButton');
  
    for(var i = 0; i < myTrees.length; i++){
      var myUTree = new UTree(myTrees[i]);
      window.showUTree(myUTree);
    }
    document.getElementById("htmlToJsonTreeButton").click();
    //document.getElementById("tree-code-box").click();
    //Then paste trees in
    //document.getElementById("stree-textarea").value = JSON.stringify(myTrees);
  
  }
  else if (Object.keys(myTrees).length){
    //First make sure we are in auto mode and open syntax options
    changeInputTabs('goButton', 'inputButton');
    document.getElementById('syntax-parameters').setAttribute('class', 'open');

    for(let x = 0; x<spotForm.autoInputOptions.length; x++){
      const autoBox = spotForm.autoInputOptions[x];
      if(myTrees.autoInputOptions[autoBox.value] && !autoBox.checked){
        autoBox.click();
      }
    }

    if(myTrees.inputToGenAuto.length<2){
      spotForm.inputToGenAuto.value = myTrees.inputToGenAuto[0];
    }
    else{
      for(let x = 0; x<myTrees.inputToGenAuto.length; x++){
        if(!spotForm.inputToGenAuto.length || spotForm.inputToGenAuto.length<myTrees.inputToGenAuto.length){
          document.getElementById('addString').click();
        }
        spotForm.inputToGenAuto[x].value = myTrees.inputToGenAuto[x];
      }
    }

    if(myTrees['autoInputOptions-addClitics']){
      if(!spotForm['autoInputOptions-addClitics'][0].checked){
        spotForm['autoInputOptions-addClitics'][0].click();
      }
      spotForm['autoInputOptions-addClitics'].value = myTrees['autoInputOptions-addClitics'];
    }

    for(const i in myTrees){
      if(typeof myTrees[i] === 'string'){
        spotForm[i].value = myTrees[i];
      }
    }

    if(myTrees.terminalStrings && myTrees.terminalStrings.length){
      document.getElementById("stringGeneration").setAttribute('class', 'open');

      const terminalStrings = myTrees.terminalStrings;

      const strGENboxes = document.getElementsByName('genStringsInput');
      const strMinBoxes = document.getElementsByName('genStringsMin');
      const strMaxBoxes = document.getElementsByName('genStringsMax');

      //clicks 'add list of terminals' until there enough divs for the analysis at hand
      while(document.getElementsByName('genStringsInput').length < terminalStrings.length){
        document.getElementById('addList').click();
      }
      for(let i = 0; i < terminalStrings.length; i++){
        strGENboxes[i].value = terminalStrings[i].genStringsInput;
        strMinBoxes[i].value = terminalStrings[i].genStringsMin;
        strMaxBoxes[i].value = terminalStrings[i].genStringsMax
      }

      document.getElementById("genStringsDoneButton").click();
    }

    document.getElementById('autoGenDoneButton').click();
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
    if(genBoxes[box].value==='maxBranching' && typeof(optVal) == "string"){
      genBoxes[box].click();
      spotForm['maxBranchingValue'].value = optVal;
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

  //Step 3: Trees Call a helper function
  built_in_input(myTrees);
  
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

  var con = [{name: 'matchMaxSP', cat:'xp'}, {name:'matchPS', cat:'phi'}, {name: 'matchSP', cat:'xp'}, {name: 'binMinBranches', cat:'phi'}, {name:'binMaxBranches', cat:'phi'}, {name:'binMaxLeaves', cat:'phi'}, {name:'equalSistersAdj', cat:'phi'}, {name: 'equalSisters2', cat:'phi'}, {name: 'accentAsHead', cat: ''}, {name: 'noLapseL', cat: ''}];

  var jtrees = getAccentTrees();

  my_built_in_analysis(gen, 'addJapaneseTones', jtrees, con);

}

//cf. analysis_html_files/abstractMatchAnalysis.html. Japanese rebracketing project, Kalivoda 2019.
function built_in_Japanese_rebracketing(n){
  var gen = {obeysExhaustivity: true, requireRecWrapper: true, rootCategory: "phi"};
  var pwfcs = [{name: 'binMinBranches', cat:'phi'}, {name:'binMaxBranches', cat:'phi'}, {name:'binMaxLeaves', cat:'phi'}];
  var mapping = [{name: 'matchSP', cat:'xp'}, {name:'matchPS', cat:'phi'}, {name: 'alignRight', cat:'xp'}, {name: 'alignLeft', cat:'xp'}, {name: 'alignRightPS', cat:'phi'}, {name: 'alignLeftPS', cat:'phi'}];
  var jtrees = [tree_3w_1, tree_3w_2, tree_4w_1, tree_4w_2, tree_4w_3, tree_4w_4, tree_4w_5];
  var selected_mapping;
  switch(n){
    case 1: selected_mapping = mapping.slice(0,2); break;
    case 2: selected_mapping = mapping.slice(2); break;
    case 3: selected_mapping = mapping.slice(2,4).concat([mapping[0]]); break;
    case 4: selected_mapping = mapping.slice(2,4).concat([mapping[1]]); break;
    case 5: selected_mapping = mapping.slice(4).concat([mapping[0]]); break;
    case 6: selected_mapping = mapping.slice(4).concat([mapping[1]]); break;
    default: selected_mapping = mapping;
  }
  var con = pwfcs.concat(selected_mapping);
  my_built_in_analysis(gen, false, jtrees, con);
}


function built_in_Japanese_balSis(){
  var gen = {obeysExhaustivity: true, requireRecWrapper: true};

  var con = [{name:'matchPS', cat:'phi'}, {name: 'matchSP', cat:'xp'}, {name: 'binMinBranches', cat:'phi'}, {name:'binMaxBranches', cat:'phi'}, {name:'balancedSisters', cat:'phi'}, {name: 'equalSisters2', cat:'phi'}, {name: 'accentAsHead', cat: ''}, {name: 'noLapseL', cat: ''}];
  var jtrees = getAccentTrees();

  my_built_in_analysis(gen, 'addJapaneseTones', jtrees, con);

}


/* Nick Van Handel's Italian analysis as presented at ICPP2019
*/
function built_in_Italian_NVH(){
  var gen = {obeysHeadedness: true, obeysExhaustivity: true};
  var con = [{name: "matchSP", cat: "xp", options: {requireOvertHead: true}}, {name: "matchMaxSP", cat: "xp", options: {requireOvertHead: true}}, {name: "binMinLeaves", cat: "phi"}, {name: "binMaxLeaves", cat: "phi"}, {name: "binMinLeaves_requireMaximal", cat: "phi"}, {name: "strongStart_SubCat"}];
  var trees = [italian_adj_noun, italian_noun_adj, italian_noun_adv_adj, italian_ditrans, italian_subj_verb, italian_noun_pp, italian_verb_do_1, italian_verb_do_2, italian_verb_do_3];
  my_built_in_analysis(gen, false, trees, con);
}

/* Richard Bibbs's Chamorro clitic analysis as presented at ICPP2019
*/
function built_in_Chamorro_RB(){
  var gen = {obeysHeadedness: true, obeysNonrecursivity: false, obeysExhaustivity: ['i'], cliticMovement: true};
  var con = [{name: 'matchSP', cat:'xp', options:{requireOvertHead:true}}, {name: 'matchPS', cat:'phi'}, {name: 'equalSistersAdj', cat:'phi'}, {name: 'binMaxBranches', cat:'i'}, {name: 'strongStart_Elfner', cat:'syll'}, {name: 'alignLeftMorpheme', cat:"gui' yu' hit hao"}];
  var chamorrotrees = chamorro_clitic_trees;
  my_built_in_analysis(gen, false, chamorrotrees, con);
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
  //Systems for Nick Kalivoda's study of abstract mapping, using Japanese rebracketing
  if(analysis === "japanese_rebracketing_1"){
    built_in_Japanese_rebracketing(1);
  }
  if(analysis === "japanese_rebracketing_2"){
    built_in_Japanese_rebracketing(2);
  }
  if(analysis === "japanese_rebracketing_3"){
    built_in_Japanese_rebracketing(3);
  }
  if(analysis === "japanese_rebracketing_4"){
    built_in_Japanese_rebracketing(4);
  }
  if(analysis === "japanese_rebracketing_5"){
    built_in_Japanese_rebracketing(5);
  }
  if(analysis === "japanese_rebracketing_6"){
    built_in_Japanese_rebracketing(6);
  }

  if(analysis === "japanese_BK_2019"){
    built_in_Japanese_balSis();
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
    else if(option.value === 'maxBranching' && option.checked){
      analysis.myGEN.maxBranching = spotForm['maxBranchingValue'].value;
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

  //myTrees: manual
  if(document.getElementById('treeUI').style.display == 'block'){
    analysis.myTrees = JSON.parse(document.getElementById("stree-textarea").value);
  }
  //myTrees: auto
  else if(document.getElementById('inputOptions').style.display == 'block'){
    analysis.myTrees = {};
    analysis.myTrees.autoInputOptions = {};
    for(let i = 0; i<spotForm.autoInputOptions.length; i++){
      if(spotForm.autoInputOptions[i].checked){
        analysis.myTrees.autoInputOptions[spotForm.autoInputOptions[i].value] = true;
      }
    }
    if(spotForm['autoInputOptions-addClitics'][0].checked){
      analysis.myTrees['autoInputOptions-addClitics'] = spotForm['autoInputOptions-addClitics'].value;
    }
    analysis.myTrees['autoInputOptions-rootCategory'] = spotForm['autoInputOptions-rootCategory'].value;
    analysis.myTrees['autoInputOptions-recursiveCategory'] = spotForm['autoInputOptions-recursiveCategory'].value;
    analysis.myTrees['autoInputOptions-terminalCategory'] = spotForm['autoInputOptions-terminalCategory'].value;
    
    analysis.myTrees['head-req'] = spotForm['head-req'].value;

    if(spotForm.inputToGenAuto.length){
      analysis.myTrees.inputToGenAuto = [];
      for(let i = 0; i<spotForm.inputToGenAuto.length; i++){
        analysis.myTrees.inputToGenAuto.push(spotForm.inputToGenAuto[i].value);
      }
    }
    else {
      analysis.myTrees.inputToGenAuto = [spotForm.inputToGenAuto.value];
    }

    // GEN input strings

    const strGENboxes = document.getElementsByName('genStringsInput');
    const strMinBoxes = document.getElementsByName('genStringsMin');
    const strMaxBoxes = document.getElementsByName('genStringsMax');

    //if there are a different number of these boxes, you will get weird results
    //this should never happen, though, unless the interface is broken
    if(strGENboxes.length !== strMinBoxes.length || strGENboxes.length !== strMaxBoxes.length){
      const err = new Error("Missing inerface element");
      displayError("Error: " + err.message + '. Interface is broken at "Generate Combinations and \
      Permutations and cannot be saved at this time.');
      throw err;
    }

    analysis.myTrees.terminalStrings = [];

    for(let i = 0; i < strGENboxes.length; i++){

      const terminals = strGENboxes[i].value;
      const min = strMinBoxes[i].value;
      const max = strMaxBoxes[i].value;

      if(terminals || min || max){
        analysis.myTrees.terminalStrings.push({
          genStringsInput: terminals ?? '',
          genStringsMin: min ?? '',
          genStringsMax: max ?? '',
        });
      }
    }

  }
  else {
    displayError('GEN input not found');
    throw new Error('GEN input not found');
  }

  //myCon
  var uCon = spotForm.constraints;
  for(var i = 0; i<uCon.length; i++){ //iterate over constraints in interface
    var cName = uCon[i].value; //constraint name for myCON array
    if(uCon[i].checked){
      if(spotForm['category-'+cName]){
        var uCategories = spotForm['category-'+cName]; //categories for this constraint
        //handeling alignLeftMorpheme: (category is actually a user defined string)
        if(!uCategories.length){
          analysis.myCon.push({name: cName, cat: uCategories.value});
        }
        //basically every other case: (category is actually a category)
        else{
          for(var x = 0; x<uCategories.length; x++){ //iterate over categories
            var cat = uCategories[x];
            if(cat.checked){
              analysis.myCon.push({name: cName, cat: cat.value}); //add to con
            }
          }
        }
      }
      else{
        //if the constraint does not have category specifications (accent constraints)
        analysis.myCon.push({name: cName}); //add to con without category specification
      }
    }
  }
  //optionable constraints:
  //iterate over all the selected constraints
  for(var i = 0; i<analysis.myCon.length; i++){
    var optionableCon = analysis.myCon[i];
    //if the constraint has options
    if(spotForm["option-"+optionableCon.name]){
      optionableCon.options = {};
      var conOptions = spotForm["option-"+optionableCon.name];
      if(conOptions.length){
        //iterate over the options for this match constraint
        for(var x = 0; x<conOptions.length; x++){
          //if this option is a checkbox, record if it is checked
          if(conOptions[x].type == "checkbox"){
            optionableCon.options[conOptions[x].value] = conOptions[x].checked;
          }
          //if this option is a drop-down selector, record its value so long as it is not default
          else if(conOptions[x].tagName === "SELECT" && conOptions[x].value != "any"){
            optionableCon.options[conOptions[x].value] = true;
          }
        }
      }
      else{
        //when there is only one option
        if(conOptions.type == "checkbox"){
          optionableCon.options[conOptions.value] = conOptions.checked;
        }
        else if(conOptions.tagName === "SELECTOR"){
          optionableCon.options[conOptions.value] = true;
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
        //error handling:
        displayError('File does not follow SPOT format: ' + err.message, err);
        return;
      }
    }
  }
}
