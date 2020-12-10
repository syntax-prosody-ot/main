/**
 * Functions that handle generation of terminal strings on the interface
 */
var terminalStringGenInputMsg = "You must supply at least one list of terminals in order to generate combinations and permutations of terminals.";
var genStringsList;

/**
 * Helper function for genTerminalStrings() and addCombinationsPermuatationsToTable()
 * Checks if any list of terminals has been provided in "Generate combinations and permutations"
 */ 
function terminalGenInputPresent(){
		
    var numTerminalStrings = spotForm.genStringsInput.length;
    if(numTerminalStrings === undefined) {
        numTerminalStrings = 1;
    }
    var inputPresent = false;
    var i = 0;
    while(!inputPresent && i<numTerminalStrings){
        inputPresent = (numTerminalStrings==1 ? spotForm.genStringsInput.value !== "": spotForm.genStringsInput[i].value !== "");
        i++;
    }

    return inputPresent;
}

/**
 * Validates user inputs for generating combinations and permutations of terminals
 * and generates terminal strings according to those specifications if everything is valid.
 * 
 * Displays errors if:
 * - any min or max field is missing
 * - any max or min field is non-numeric
 * - any max or min field is more than 10 or less than 1
 * - min field is more than max field
 * 
 * Displays warnings if:
 * - any max or min field is more than 5
 * 
 * Depends on:
 * - terminalGenInputPresent()
 * - generateTerminalStrings(): in inputCandidateGenerator.js [?]
 * - displayStringsTable()
 * 
 * Changes genStringsList
 */
function addCombinationsPermuatationsToTable(){
    //Begin input validation for generating combinations/permutations (generateTerminalStrings())
    var inputIsFive = false; //if the min or max input is 5 flag
    var minOrMaxProblem = false; //if there is a min or max input problem flag
    var problem = ""; //string indicating what the min or max problem is
    var stringTerminalInput, minTerminalInput, maxTerminalInput; //the list of terminals input, min input, and max input
    var inputCheckNeeded = false; //if there is more than one input then check for input being empty or not is needed

    var numTerminalStrings = spotForm.genStringsInput.length;
    if(numTerminalStrings === undefined) {
        numTerminalStrings = 1;
    }

    
    /*Only bother to validate everything else if at least one list of terminals is provided.
    If terminalGenInputPresent() returns false, then all the List of terminals are empty. */
    if(terminalGenInputPresent()){
        terminalStringsValidationLoop:
        for(var i=0; i<numTerminalStrings; i++){
            /*checking if the length is more than 1*/
            if (numTerminalStrings > 1){
                inputCheckNeeded = true;
                stringTerminalInput = spotForm.genStringsInput[i].value;
                minTerminalInput = spotForm.genStringsMin[i].value;
                maxTerminalInput = spotForm.genStringsMax[i].value;
            }else{
                inputCheckNeeded = false;
                minTerminalInput = spotForm.genStringsMin.value;
                maxTerminalInput = spotForm.genStringsMax.value;
            }
            if ((inputCheckNeeded == true && stringTerminalInput !== "") || inputCheckNeeded == false){
                /*checking if min or max is empty*/
                if (minTerminalInput === "" || maxTerminalInput === ""){
                    minOrMaxProblem = true;
                    problem = "Empty";
                    break terminalStringsValidationLoop;
                }
                /*checking if min or max is not a number*/
                if (isNaN(minTerminalInput) || isNaN(maxTerminalInput)){
                    minOrMaxProblem = true;
                    problem = "NonNumber";
                    break terminalStringsValidationLoop;
                }
                /*checking if min or max is less than or equal to 0*/
                if (Number(minTerminalInput) <= 0 || Number(maxTerminalInput) <= 0){
                    minOrMaxProblem = true;
                    problem = "Zero";
                    break terminalStringsValidationLoop;
                }
                /*checking if min or max is more than or equal to 10*/
                if (Number(minTerminalInput) >= 10 || Number(maxTerminalInput) >= 10){
                    minOrMaxProblem = true;
                    problem = "Ten";
                    break terminalStringsValidationLoop;
                }
                /*checking if min is greater than max*/
                if (Number(maxTerminalInput) <  Number(minTerminalInput)){
                    minOrMaxProblem = true;
                    problem = "MinGreaterThanMax";
                    break terminalStringsValidationLoop;
                }
                /*checking if min or max is more than or equal to 5*/
                if (Number(minTerminalInput) >= 5 || Number(maxTerminalInput) >= 5){
                    inputIsFive = true;
                }
            }
        }
        /*if there is an error with min or max input*/
        if (minOrMaxProblem == true){
            if (problem === "Empty"){
                displayError("Min or Max input missing in 'Generate combinations and permutations'.");
            }else if(problem === "NonNumber"){
                displayError("Min or Max input is not a number in 'Generate combinations and permutations.'");
            }else if(problem === "Zero"){
                displayError("Min and Max inputs must be larger than 0 in 'Generate combinations and permutations.'");
            }else if(problem === "Ten"){
                displayError("Min and Max inputs must be less than 10 in 'Generate combinations and permutations.'");
            }else if(problem === "MinGreaterThanMax"){
                displayError("Min input must be smaller than Max input in 'Generate combinations and permutations.'");
            }
        }else{
            /*confirm user wants to continue if the input is greater than or equal to 5 */
            if (inputIsFive == true){
                if(!confirm("Min or Max input is greater than or equal to 5 which may cause your browser to freeze due to too many terminal strings being generated. Confirm that you want to continue.")){
                    throw new Error ('Min or Max input is greater than or equal to 5.');
                }
            }
            var inputList = spotForm.genStringsInput.value;
            var min = spotForm.genStringsMin.value;
            var max = spotForm.genStringsMax.value;

            for(var i=0; i<numTerminalStrings; i++){
                if(numTerminalStrings > 1) {
                inputList = spotForm.genStringsInput[i].value;
                min = spotForm.genStringsMin[i].value;
                max = spotForm.genStringsMax[i].value;
                }
                /* Actual calculation of terminal strings here*/
                if(inputList !== "") {
                    inputList = inputList.trim().split(' ');
                    var currGenStringsList = generateTerminalStrings(inputList, min, max)
                    displayStringsTable(currGenStringsList);

                    if(genStringsList) {
                        genStringsList = genStringsList.concat(currGenStringsList);
                    }
                    else {
                        genStringsList = currGenStringsList;
                    }
                }
            }
        }
    }
    //else{
    //	console.warn(terminalStringGenInputMsg);
    //}
}




/* Generate and display terminal strings
   This includes: 
   - fixed strings taken from "inputToGenAuto", and 
   - strings to run generateTerminalStrings() on, taken from "genStringsInput"
   - TODO rename these fields!
*/
function genTerminalStrings() {
    //Remove any previously generated strings from the table of generated strings
    document.getElementById('genStringsBox').innerHTML = "";
    genStringsList = undefined; //genStringsList is declared at the top of this file

    addFixedTerminalStringsToTable();
    
    //Provide warnings if an input is present but the fieldset is closed, or vice versa.
    if(terminalGenInputPresent() && !document.getElementById("stringGeneration").classList.contains("open")){
        displayWarning("You provided an input(s) to 'Generate combinations and permutations', but have closed that section. Your input there, which is not currently visible, will be included in calculations unless you delete it.");
    }
    /*if(document.getElementById("stringGeneration").classList.contains("open") && !terminalGenInputPresent()){
        displayWarning(terminalStringGenInputMsg);
    }*/

    //Validate inputs to generateTerminalStrings, and run it.
    addCombinationsPermuatationsToTable();
    
}


// TerminalStringsGen helper: create table from generated terminal strings list
function stringToTable(genStringsList, index) {
    var htmlChunks = ['<table class="auto-table string-table" id="string-table-' + index + '"><tbody>'];
    var i = 1;
    for(var s in genStringsList) {
        var string = genStringsList[s];
        htmlChunks.push('<tr>');
        htmlChunks.push('<td>' + i + "." + '</td>');
        htmlChunks.push('<td>' + string + '</td>');
        htmlChunks.push('</tr>');
        i++;
    }
    htmlChunks.push('</tbody></table>');
    return htmlChunks.join('');
}

// TerminalStringsGen helper: display generated terminal strings in table
function displayStringsTable(genStringsList) {
    var tables = document.getElementsByClassName("string-table");
    var index = tables.length + 1;
    var stringsTable = stringToTable(genStringsList, index);
    document.getElementById('genStringsBox').innerHTML += stringsTable;
    addThickLine(genStringsList, index);
}

// TerminalStringsGen helper: add thicker line between generated strings of different lengths
function addThickLine(genStringsList, index) {
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    for(var i = 0; i < genStringsList.length - 1; i++) {
        var currString = genStringsList[i].split(' ');
        var nextString = genStringsList[i + 1].split(' ');
        if(currString.length < nextString.length) {
            var row = i + 1;
            sheet.addRule('#string-table-' + index + ' tbody > :nth-child(' + row + ')', 'border-bottom: 3px solid black;', 0);
        }
    }
}

// TerminalStringsGen helper: remove thicker line between generated strings of different lengths before regenerating strings
function deleteThickLine() {
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    var rules = 0;
    for(var i = 0; i < sheet.cssRules.length; i++) {
        if(sheet.cssRules[i].cssText.includes('#string-table')) {
            rules++;
        }
    }
    for(var i = 0; i < rules; i++) {
        sheet.deleteRule(0);
    }
}

// TerminalStringsGen helper: runs when "Generate terminal strings" is clicked
function makeAndDisplayTerminalStrings(){
    if(terminalGenInputPresent()){
        deleteThickLine();
        genTerminalStrings();
        document.getElementById('genStringsArea').style.display = 'block';
        document.getElementById('gen-strings-switch').checked = true;
        document.getElementById('strings-switch-text').innerHTML = 'Hide generated terminals strings';
    }
    else{
        displayError(terminalStringGenInputMsg);
    }
}