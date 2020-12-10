/**
 * Functions that manage what content is displayed or hidden on interface1.html
 */

/* Manages tab display for GEN: Input parameters */
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


/**
 * Clears the results container; called when the user clicks on the "Clear results" button
 */
function clearTableau() {
	document.getElementById('results-container').innerHTML = "";
	document.getElementById('results-container').className = "";
}
