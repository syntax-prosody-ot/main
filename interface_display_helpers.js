/**
 * Functions that manage what content is displayed or hidden on interface1.html
 * without actually generating content
 */


// === INPUT GEN DISPLAY FUNCTIONS ===

/* Manages tab display for GEN: Input parameters:
*  Automatic vs. Manual tree building
*/
function changeInputTabs(from, to) {
	var fromButton = 	document.getElementById(from);
	var toButton = document.getElementById(to);
	// if from === 'inputButton'
	var show = 	document.getElementById('treeUI');
	var hide = document.getElementById('inputOptions');
	if(from === 'goButton') {
		show = 	document.getElementById('inputOptions');
		hide = document.getElementById('treeUI');
	}
	show.style.display = 'block';
	toButton.style.backgroundColor = 'white';
	toButton.style.borderColor = '#3A5370';
	if(hide.style.display === 'block') {
		hide.style.display = 'none';
		fromButton.style.backgroundColor = '#d0d8e0';
		fromButton.style.borderColor = '#d0d8e0';
	}
}

/** Input Gen: Terminal strings
 * Adds a set of input fields for generating combinations and permutations of terminal strings */
function addTerminalStringList() {
    var length = spotForm.genStringsInput.length;
    if(length === undefined) {
        length = 1;
    }
    var newLength = length + 1;
    length = length.toString();
    newLength = newLength.toString();
    document.getElementById('list'+length).insertAdjacentHTML('afterend', "<div id='list"+newLength+"'>List of terminals "+newLength+": <input type='text' name='genStringsInput'><p>Number of terminals in generated strings:</p><p class='genStringsNum'>Min: <input type='text' name='genStringsMin' class='genStringsNumBox' style='margin-left: 4px'></p><p class='genStringsNum'>Max: <input type='text' name='genStringsMax' class='genStringsNumBox'></p></div>");
    document.getElementById('autoDoneMessage').style.display = 'none';
}

/** Input Gen: Terminal strings
 * Shows or hides generated terminal strings */
function showHideGeneratedTermStrings() {
    if (document.getElementById('genStringsArea').style.display === 'none' && document.getElementById('gen-strings-switch').checked){
        document.getElementById('genStringsArea').style.display = 'block';
        document.getElementById('strings-switch-text').innerHTML = 'Hide generated terminals strings';
    }
    else{
        document.getElementById('genStringsArea').style.display = 'none';
        document.getElementById('strings-switch-text').innerHTML = 'Show generated terminals strings';
    }
}

/** Input Gen for trees: syntactic parameters
 *  When x0 is selected as the recursive category, bar levels are irrelevant
 *  and head side is also irrelevant
*/
function displaySettingsRecursiveX0() {
    if(document.getElementsByName('autoInputOptions-recursiveCategory')[2].checked == true) {
        // console.log("xo checked")
        var x = document.getElementsByName("autoInputOptions")[noBarLevelsIndex];
        if(x.checked === true) {
            x.checked = false;
        }
        x.disabled = true;
        var y = document.getElementById('head-req').options;
        y[1].disabled = true;
        y[2].disabled = true;
        y[3].disabled = true;
        y[4].disabled = true;
    }
}

/** Input Gen for trees: syntactic parameters*/
function displaySettingsRecursiveCP() {
    if(document.getElementsByName('autoInputOptions-recursiveCategory')[0].checked == true) {
        // console.log("cp checked")
        var x = document.getElementsByName("autoInputOptions")[noBarLevelsIndex];
        x.disabled = false;
        var y = document.getElementById('head-req').options;
        y[1].disabled = false;
        y[2].disabled = false;
        if(x.checked) {
            y[3].disabled = false;
            y[4].disabled = false;
        }
        else {
            y[3].disabled = true;
            y[4].disabled = true;
        }
    }
}

/** Input Gen for trees: syntactic parameters*/
function displaySettingsRecursiveXP() {
    if(document.getElementsByName('autoInputOptions-recursiveCategory')[1].checked == true) {
        // console.log("xp checked")
        var x = document.getElementsByName("autoInputOptions")[noBarLevelsIndex];
        x.disabled = false;
        var y = document.getElementById('head-req').options;
        y[1].disabled = false;
        y[2].disabled = false;
        if(x.checked) {
            y[3].disabled = false;
            y[4].disabled = false;
        }
        else {
            y[3].disabled = true;
            y[4].disabled = true;
        }
    }
}



/** Helper for Gen: Input parameters 
 *  Handles the interaction between enabling/disabling visibility of bar levels
 *  and the options for head alignment settings. 
 *  If bar levels are not treated as XPs, then more settings are relevant bc
 *  ternary structures will be included.
 */
function barLevelsHeadReq() {
    var x = document.getElementsByName("autoInputOptions")[noBarLevelsIndex];
    var y = document.getElementById('head-req').options;

    if(x.checked === false) {    
        // Heads must be perfectly left-aligned
        y[1].disabled = false;
        // Heads must be perfectly right-aligned
        y[2].disabled = false;
        // Heads must be on the left edge
        y[3].disabled = false;
        // Heads must be on the right edge
        y[4].disabled = false;
    }
    else {
        y[1].disabled = false;
        y[2].disabled = false;
        y[3].disabled = true;
        y[4].disabled = true;
    }
}

function showHideSTreeCliticOptions(){
    if(document.getElementById('add-clitics').checked) {
        document.getElementById('add-clitics-row').style.display = 'block';
    }
    else {
        document.getElementById('add-clitics-row').style.display = 'none';
    }
}

function showHideGeneratedSTrees(){
    if (document.getElementById('autoTreeArea').style.display === 'none' && document.getElementById('syntax-tree-switch').checked){
        document.getElementById('autoTreeArea').style.display = 'block';
        document.getElementById('syntax-switch-text').innerHTML = 'Hide syntactic trees';
    }
    else{
        document.getElementById('autoTreeArea').style.display = 'none';
        document.getElementById('syntax-switch-text').innerHTML = 'Show syntactic trees';
    }
}


//===OUTPUT GEN DISPLAY FUNCTIONS===

/* Manages the info blocks for 
   GEN: Output parameters > Tree marking options > Annotated with tones 
*/
function toneInfoBlock(language){
	var content = document.getElementById("tonesInfoContent");
	var japaneseContent = "Tokyo Japanese: the left edge of &phi; is marked with a rising boundary tone (LH), accented words receive an HL on the accented syllable, and H tones that follow a pitch drop (HL) within the maximal &phi; are downstepped (!H). (See: Pierrehumbert and Beckman 1988; Gussenhoven 2004; Ito and Mester 2007) Accents, boundary tones, and downstep in Lekeitio Basque are realized with the same tones as in Tokyo Japanese.";
	var irishContent = "Conamara Irish (Elfner 2012): The left edge of the non-minimal &phi; is marked with a rising boundary tone (LH), and the right edge of every &phi; is marked with a falling boundary tone (HL).";
	var format = "font-size: 13px; color: #555; margin-left: 25px; display: table-cell";
	if (language == "japanese"){
		if (content.innerHTML == japaneseContent){
			content.style = "display: none";
			content.innerHTML = '';
		}
		else{
			content.style = format;
			content.innerHTML = japaneseContent;
		}
	}
	if (language === "irish"){
		if (content.innerHTML == irishContent){
			content.style = "display: none";
			content.innerHTML = '';
		}
		else {
			content.style = format;
			content.innerHTML = irishContent;
		}
	}
}

/* Adds or hides an inline textfield for 
    GEN: Output options > Restrict maximum number of branches 
*/
function showMaxBranching() {
	var text = document.getElementById('maxBranchingText');
	var checkBox = document.getElementById('maxBranchingBox')
	if(checkBox.checked) {
		text.style.display = 'inline';
	}
	else{
		text.style.display = 'none';
	}
}

function exhaustivityDisplay(){
    if (document.getElementById('exhaustivityDetailOption1').style.display === 'none' && document.getElementById('exhaustivityBox').checked){
        document.getElementById('exhaustivityDetailOption1').style.display = 'table-cell';
        document.getElementById('exhaustivityDetailOption2').style.display = 'table-cell';
    }
    else{
        document.getElementById('exhaustivityDetailOption1').style.display = 'none';
        document.getElementById('exhaustivityDetailOption2').style.display = 'none';
        //if (genOptions['obeysExhaustivity']){
        //	genOptions['obeysExhaustivity'] = false;
        //}

    }
}

function movementOptionsDisplay(){
    var movementSpecifications = document.getElementById('movementSpecification');
    if (movementSpecifications.style.display === 'none' && document.getElementById('movementOptions').checked){
        movementSpecifications.style.display = 'block';
    }
    else{
        movementSpecifications.style.display = 'none';
    }
}

function toneOptionDisplay(){
    if (document.getElementById('tonesSelectionRow').style.display === 'none' && document.getElementById('annotatedWithTones').checked){
        document.getElementById('tonesSelectionRow').style.display = '';
    }
    else{
        document.getElementById('tonesSelectionRow').style.display = 'none';
    }

}

function markProsodicHeadsDisplay(){
    if (document.getElementById('headSideOptions').style.display === 'none' && document.getElementById('showHeads').checked){
        document.getElementById('headSideOptions').style.display = '';
    }
    else{
        document.getElementById('headSideOptions').style.display = 'none';
    }
}

//===CONSTRAINTS===

//Opens or closes fieldsets when their header or arrow is clicked
function openCloseFieldset(event) {
    var el = event.target;
    var legend = el.closest('legend');
    if (legend) {
        var fieldset = legend.closest('fieldset');
        if (fieldset) {
            fieldset.classList.toggle('open');
            return;
        }
    }


    if (el.classList.contains('info')) {
        el.classList.toggle('showing')
    }
}

/* Shows/hides the "Show more..." section of each constraint fieldset*/
function showMore(constraintType) {
	var x = document.getElementById(constraintType);
	var showMore = constraintType + "Show";
	var y = document.getElementById(showMore);

  if (x.style.display === "block") {
    x.style.display = "none";
		y.innerHTML = "Show more...";
  } else {
    x.style.display = "block";
		y.innerHTML = "Show less...";
  }
}



//===CLEARING RESULTS===

/**
 * Clears the results container; called when the user clicks on the "Clear results" button
 */
function clearTableau() {
	document.getElementById('results-container').innerHTML = "";
	document.getElementById('results-container').className = "";
}

/** Clears all inputs from interface */
function clearAll(){
    clearAnalysis();
    document.getElementById('treeUIinner').style.display = 'none';
    document.getElementById('built-in-dropdown').value = 'select';
    document.getElementById('fileUpload').value = '';
    document.getElementById('chooseFilePrompt').style = "font-size: 13px; color: #555";
    document.getElementById('chooseFile').style = "display: none";
    document.getElementById('save/load-dialog').innerHTML = '';
}