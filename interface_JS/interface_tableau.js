/** 
 * Functions for handling sending the user's inputs on interface1.html to makeTableau() and for downloading it.
 *  saveAs()
 *  getCheckedConstraints()
 *  getInputsForTableau()
 *  getOutputGenOptions()
 *  getTableauOptions(genOptions)
 *  checkForLongInputs(genOptions)
 *  sendToTableau(e)
 */

var myGenInputs = {
    pString: '',
    sTrees: {}
};

//downloads an element to the user's computer. Originally defined up by saveTextAs()
function saveAs(blob, name) {
	var a = document.createElement("a");
	a.display = "none";
	a.href = URL.createObjectURL(blob);
	a.download = name;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

// Helper for sendToTableau(): builds a list of checked constraints and their info
function getCheckedConstraints(){
    var constraintSet = [];
    for(var i=0; i<spotForm.constraints.length; i++){
        var constraintBox = spotForm.constraints[i];
        if(constraintBox.checked){
            var constraint = constraintBox.value;
            //Figure out all the categories selected for the constraint
            if(spotForm['category-'+constraint]){
                var constraintCatSet = spotForm['category-'+constraint];
                if (constraintCatSet.length === undefined) {
                    constraintCatSet = [constraintCatSet];
                }
                for(var j=0; j<constraintCatSet.length; j++){
                    var categoryBox = constraintCatSet[j];
                    if(categoryBox.checked){
                        var category = categoryBox.value;
                        if(constraint === "alignLeftMorpheme" || constraint === 'alignRightMorpheme') {
                            category = category.split(' ').join(';');
                        }
                        if(constraint === "binMaxHead") {
                            constraintSet.push('binMaxHead-' + category + '-{"side" : "' + spotForm['genOptions-showHeads'].value + '"}')
                        }
                        //Figure out selected match options for the constraint
                        else if(spotForm['option-'+constraint]){
                            var constraintOptionSet = spotForm['option-'+constraint];
                            var options = {};
                            if(constraintOptionSet.length){
                                for(var k=0; k<constraintOptionSet.length; k++){
                                    var optionBox = constraintOptionSet[k];
                                    //If lexical or overtly headed is checked, then option is true
                                    if(optionBox.checked) {
                                        options[optionBox.value] = true;
                                    }
                                    //If option is in a select, not a checkbox, and the option is not "any", then option is true
                                    if(optionBox.checked === undefined && optionBox.value !== 'any') {
                                        options[optionBox.value] = true;
                                    }
                                }
                            }
                            else{ //constraint only has one possible option:
                                if(constraintOptionSet.checked){
                                    options[constraintOptionSet.value] = true;
                                }
                            }
                            var strOptions = JSON.stringify(options);
                            constraintSet.push(constraint+'-'+category+'-'+strOptions);
                        }
                        else {
                            constraintSet.push(constraint+'-'+category);
                        }
                    }
                }
            }
            else
                constraintSet.push(constraint);
        }
    }
    return constraintSet;
}

// Helper for sendToTableau: gets the syntactic trees
function getInputsForTableau(){
    myGenInputs.pString = spotForm.inputToGen.value;
    var treeCode = spotForm.sTree.value; // Get the code that is in the manually generated stree textarea
    // if code has been generated, then ignore pString in GEN
    if(treeCode !== "{}") {
        myGenInputs.pString = "";
    }
    var sTrees;
    var treeSelectOption = document.getElementById('treeEditOption'); // options selecting input from manual, automatic tab or both tabs
    treeSelectOptions = treeSelectOption.value; // getting the value of the option the user has selected
    var manInputsPres = (spotForm.inputToGen.value != "" || (treeCode != "{}" && treeCode != "[]")); //manual tab input present boolean
    var autoInputsPres = getAutoSTreeList(); //automatic tab input present boolean

   // determine if both generate tree and build syntax has input
    if (manInputsPres && autoInputsPres && document.getElementById('treeOption').style.display != "block" && treeSelectOptions == "option-tree"){
        document.getElementById('treeOption').style.display = "block";
        displayWarning('Inputs were provided on both the Manual tab and the Automatic tab of Gen: Inputs. Please select an option from the dropdown menu displayed above "Get results" button to choose which set of trees to use in the tableaux.');
        return;
    }
    
    //if the dropdown menu is shown and option is option-tree //default-tree
    if (treeSelectOptions == "option-tree" && document.getElementById('treeOption').style.display == "block"){
        return;
    }else if(treeSelectOptions == "auto-tree" || (!manInputsPres && autoInputsPres)){ //If auto-tree is chosen, display this
        myGenInputs.pString = "";
        if (autoInputsPres){
            //Try to actually get the auto-generated sTrees.
            try{
                sTrees = getAutoSTreeList();
            }
            catch(e){
                displayError(e.message, e);
                return;
            }
        }else{
            return;
        }
    }else if(treeSelectOptions == "manual-tree" || (manInputsPres && !autoInputsPres)){   //Otherwise, if manual-tree is chosen, display this  
        // Get the input syntactic trees from manual tree builder
        if (manInputsPres){
            try{
                sTrees = getSTrees();
            }
            catch(e){
                displayError(e.message, e);
                return;
            }
        }else{
            return;
        }
    }else if(treeSelectOptions == "both-tree"){ // if both trees are selected
        if (autoInputsPres && manInputsPres){
            try{
                if (getAutoSTreeList() && getSTrees()){
                    sTrees = getSTrees();
                    myGenInputs.pString = "";
                    sTrees = sTrees.concat(getAutoSTreeList());
                }else if(getAutoSTreeList()){
                    myGenInputs.pString = "";
                    sTrees = getAutoSTreeList();
                }else{
                    sTrees = getSTrees();
                }
            }
            catch(e){
                displayError(e.message, e);
                return;
            }
        }else{
            return;
        }
    }else if(treeSelectOptions == "clear-tree"){
        treeSelectOption = treeSelectOption.selectedIndex = 0;
        document.getElementById('treeOption').style.display = "none";
        clearAll();
        sTreeList = undefined;
        return;
    }

    return sTrees;
}

function getOutputGenOptions() {
    var genOptions = {};

    //hard-code in the default prosodic hierarchy and category pairings
    genOptions.ph = PH_PHI;

    for(var i=0; i<spotForm.genOptions.length; i++){
        var optionBox = spotForm.genOptions[i];
        genOptions[optionBox.value]=optionBox.checked;
    }

    //record exhaustivity options if selected
    if(genOptions['obeysExhaustivity']){
        var exCats = [];
        for(var i=0; i<spotForm.exhaustivityCats.length; i++){
            var exCatBox = spotForm.exhaustivityCats[i];
            if(exCatBox.checked)
                exCats = exCats.concat(exCatBox.value);
        }
        genOptions['obeysExhaustivity'] = exCats;
    }

    // if max branching option is selected
    if(genOptions['maxBranching']){
        genOptions['maxBranching'] = spotForm.maxBranchingValue.value;
    }

    //plug correct value into category options
    genOptions.rootCategory = spotForm['genOptions-rootCategory'].value;
    genOptions.recursiveCategory = spotForm['genOptions-recursiveCategory'].value;
    genOptions.terminalCategory = spotForm['genOptions-terminalCategory'].value;

    //warn user if they do something weird with the category options
    var rootCategoryError = new Error("The specified root category is lower on the prosodic hierarchy\nthan the specified recursive category.");
    var terminalCategoryError = new Error("The specified recursive category is not higher on the prosodic hierarchy\nthan the specified terminal category.");
    if(pCat.isHigher(genOptions.recursiveCategory, genOptions.rootCategory)){
        if(!confirm(rootCategoryError.message + " Are you sure you want to continue?\nIf you are confused, change Root Category and Recursive Category\nin \"Options for prosodic tree generation (GEN function)\"")){
            throw rootCategoryError;
        }
    }
    if(!pCat.isHigher(genOptions.recursiveCategory, genOptions.terminalCategory)){
        if(!confirm(terminalCategoryError.message + " Are you sure you want to continue?\nIf you are confused, change Terminal Category and Recursive Category\nin \"Options for prosodic tree generation (GEN function)\"")){
            throw terminalCategoryError;
        }
    }

    return genOptions;
}

function getTableauOptions(genOptions){
    var tableauOptions = {
        showTones: false,  //true iff tones are selected
        trimStree: false,
        invisibleCategories: []
    };

    if(document.getElementById("annotatedWithTones").checked){
        //from radio group near the bottom of spotForm
        genOptions.addTones = spotForm.toneOptions.value;
         tableauOptions.showTones = spotForm.toneOptions.value;
        //console.log(genOptions);
    }
    if(document.getElementById("trimTrees").checked){
        tableauOptions.trimStree = true;
    }
    if(document.getElementById("showHeads").checked){
        tableauOptions.showHeads = window.spotForm['genOptions-showHeads'].value;
    }


    for(var i = 0; i < window.spotForm.hideCategory.length; i++){
        var hiddenCat = window.spotForm.hideCategory[i];
        if(hiddenCat.checked){
            tableauOptions.invisibleCategories.push(hiddenCat.value);
        }
    }

    return tableauOptions;
}

function checkForLongInputs(genOptions){
    var safe_input_length = true;
    var safe_input_length_clitic = true;
    var sTree;
    var maxNumTerminals;
    var j = 0;
    while(safe_input_length && safe_input_length_clitic && j < myGenInputs.sTrees.length){
    //check for inputs that are too long and set safe_input_length = false as needed
        sTree = myGenInputs.sTrees[j];
        maxNumTerminals = Math.max(getLeaves(sTree).length, myGenInputs.pString.split(" ").length);
        //warn user about possibly excessive numbers of candidates
        if (genOptions['cliticMovement'])
        {
            if((maxNumTerminals >= 7) || (!genOptions['noUnary'] && maxNumTerminals >= 5))
            {
                safe_input_length_clitic = false;
            }
        }else if(maxNumTerminals >= 9 || (maxNumTerminals >= 6 && !genOptions['noUnary'])){
            safe_input_length = false;
        }
        j++;
    }
    if(!safe_input_length){
    //display warning and get confirmation
        if(!confirm("You have one or more input with more than five terminals, which may run slowly and even freeze your browser, depending on the selected GEN options. Do you wish to continue?")){
            throw new Error("Tried to run GEN with too many terminals");
        }
    }else if (!safe_input_length_clitic){
        var tooManyCandMsg = "You have selected GEN settings that allow movement, and included a sentence of "+ maxNumTerminals.toString()+" terminals. This GEN may yield more than 10K candidates. To reduce the number of candidates, consider enforcing non-recursivity, exhaustivity, and/or branchingness for intermediate prosodic nodes. Do you wish to proceed with these settings?";
        var continueGEN = confirm(tooManyCandMsg);
        if(!continueGEN){
            throw new Error("Tried to run GEN with clitic movement with too many terminals");
        }
    }
}

/**
 * This function runs when the "Get results" button is clicked.
 * 
 * Components:
 * - Build list of checked constraints and their options and arguments
 * - Get selected output GEN options
 * - Get inputs (manual or from input GEN)
 * - Send everything to makeTableau(), writeTableau(), and saveTextAs() 
 */
function sendToTableau(e) {
    if (e.preventDefault) e.preventDefault();
    var constraintSet = getCheckedConstraints();
    myGenInputs.sTrees = getInputsForTableau();
    if (myGenInputs.sTrees == undefined){
        return false;
    }
    var genOptions = getOutputGenOptions();
    checkForLongInputs(genOptions);

    var tableauOptions = getTableauOptions(genOptions);

    //If the tree is rooted in a word, the recursive category is the foot, and the terminal category is the syllable, then
    //the function makeTableau() will be called with the option "subword" which will change bracketing notation for parenthesizeTree().
    if (genOptions.rootCategory === "w" && genOptions.recursiveCategory === "Ft" && genOptions.terminalCategory === "syll") {
        tableauOptions.subword = true;
    }

    var resultsConCl = document.getElementById("results-container").classList;
    resultsConCl.add('show-tableau');

    var csvSegs = [];
    for (var i = 0; i < myGenInputs.sTrees.length; i++) {
        var sTree = myGenInputs.sTrees[i];

        //Actually create the candidate set
        if (genOptions['cliticMovement']){
        //	var candidateSet = GENwithCliticMovement(sTree, pString, genOptions);
            var candidateSet = globalNameOrDirect(spotForm['genOptions-movement'].value)(sTree, myGenInputs.pString, genOptions);
        }
        else{
            var candidateSet = GEN(sTree, myGenInputs.pString, genOptions);
        }

        //Make the violation tableau with the info we just got.
        var tabl = makeTableau(candidateSet, constraintSet, tableauOptions);
        csvSegs.push(tableauToCsv(tabl, ',', {noHeader: i}));
        writeTableau(tabl);
        revealNextSegment();
    }

    saveTextAs(csvSegs.join('\n'), 'SPOT_Results.csv');

    function saveTextAs(text, name) {
        saveAs(new Blob([text], {type: "text/csv", encoding: 'utf-8'}), name);
    }

    return false;
};