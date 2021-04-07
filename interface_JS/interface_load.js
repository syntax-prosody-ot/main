/**
 * Load function for interface1.html
 * Adds many event listeners with functions defined in the other .js files in the interface_JS directory.
 */

var treeUIsTreeMap = {};

window.addEventListener('load', function(){

	window.spotForm = document.getElementById('spotForm');

	if (!window.spotForm) {
		console.error('no spot form');
		return;
	}

	spotForm.addEventListener('change', function(ev) {
		var target = ev.target;
		if (target.name === 'constraints') {
			var catRow = target.closest('div .constraint-selection-table').classList;
			if (target.checked) {
				catRow.add('constraint-checked');
			}
			else {
				catRow.remove('constraint-checked');
			}
			//console.log(catRow);
		}

	});

	spotForm.addEventListener("change", function(){
		document.getElementById("save/load-dialog").innerHTML = '';
	});

	// Get Results button
	spotForm.onsubmit=sendToTableau;

	//treeEditOptions - dropdown list
	document.getElementById('treeEditOption').onchange = sendToTableau;


	document.body.addEventListener('click', openCloseFieldset); //Opening and closing fieldsets (mostly for constraints)
	document.getElementById("clearAllButton").addEventListener("click", clearAll);

	/** ===SHOWING/HIDING OPTIONS UNDER GEN: OUTPUT PARAMETERS=== */
	document.getElementById('exhaustivityBox').addEventListener('click', exhaustivityDisplay);
	document.getElementById('movementOptions').addEventListener('click', movementOptionsDisplay)
	document.getElementById('annotatedWithTones').addEventListener('click', toneOptionDisplay);
	document.getElementById('showHeads').addEventListener('click', markProsodicHeadsDisplay);


	//===MANUAL TREE-BUILDER===

	//Code for generating the JS for a syntactic tree
	var treeTableContainer = document.getElementById('treeTableContainer');

	//Open the tree making GUI when the users clicks "Build syntax"
	document.getElementById('goButton').addEventListener('click', function(){
		changeInputTabs('inputButton', 'goButton');
	});


	//Set up the table for manual tree creation...
	document.getElementById('buildButton').addEventListener('click', setUpTreeBuilderTable);

	document.getElementById('treeUImakeParent').addEventListener('click', treeUIMakeParent);
	document.getElementById('treeUIdeleteNodes').addEventListener('click', deleteTreeUINodes);
	document.getElementById('treeUIclearSelection').addEventListener('click', treeUIClearSelection);

	
	//Look at the html tree and turn it into a JSON tree. Put the JSON in the following textarea.
	document.getElementById('htmlToJsonTreeButton').addEventListener('click', htmlToJSONTree);

	//Show/hide the tree code area
	document.getElementById('tree-code-box').addEventListener('click', showHideTreeCode);

	//Legacy code that should probably get deleted
	document.getElementById('danishJsonTreesButton').addEventListener('click', function() {
		spotForm.sTree.value = JSON.stringify(danishTrees(), null, 4);
	});

	treeTableContainer.addEventListener('input', function(e) {
		var target = e.target;
		var idPieces = target.id.split('-');
		//console.log(idPieces);
		var treeIndex = idPieces[2];
		var nodeId = idPieces[1];
		var isCat = idPieces[0] === 'catInput';
		treeUIsTreeMap[treeIndex].nodeMap[nodeId][isCat ? 'cat' : 'id'] = target.value;
		document.getElementById('doneMessage').style.display = 'none';
	});


	treeTableContainer.addEventListener('click', function(e) {
		var node = e.target;
		if (e.target.classList.contains('stemSide') || e.target.classList.contains('inputContainer')) {
			while (node && !node.classList.contains('treeNode')) {
				node = node.parentElement;
			}
		}
		if (node.classList.contains('treeNode')) {
			node.classList.toggle('selected');
			refreshNodeEditingButtons();
		}
	});




	// ===Switch tabs between manual and automatic input creation===
	document.getElementById('inputButton').addEventListener('click', function(){
		changeInputTabs('goButton', 'inputButton');
	});


	// ===AUTO INPUT GEN ===
	// show and display addClitics options
	document.getElementById('add-clitics').addEventListener('change', showHideSTreeCliticOptions);

	var autoInputOptions = document.getElementsByName("autoInputOptions");
    // Locate noBarLevels option
    window.noBarLevelsIndex;
    for (var i = 0; i < autoInputOptions.length; i++) {
        if (autoInputOptions[i].value === "noBarLevels") {
            noBarLevelsIndex = i;
            break;
        }
    }
	document.getElementsByName("autoInputOptions")[noBarLevelsIndex].addEventListener('click', barLevelsHeadReq);
	document.getElementsByName('autoInputOptions-recursiveCategory')[2].addEventListener('click', displaySettingsRecursiveX0);
	document.getElementsByName('autoInputOptions-recursiveCategory')[0].addEventListener('click', displaySettingsRecursiveCP);
	document.getElementsByName('autoInputOptions-recursiveCategory')[1].addEventListener('click', displaySettingsRecursiveXP);

	// "Generate trees" done button for auto input Gen
	document.getElementById('autoGenDoneButton').addEventListener('click', makeAndDisplaySTrees);


	// Button to add a terminal string for automatic stree generation
	document.getElementById('addString').addEventListener('click', addTerminalString);
	
	// Show/hide generated syntactic trees
	document.getElementById('syntax-tree-switch').addEventListener('click', showHideGeneratedSTrees);

	/** Check for any changes that should remove the message "The trees in the analysis 
	 * are up-to-date" from the input Gen display:
	 * - syntax parameters
	 * - terminal strings
	 * - list of terminals
	* */ 
	function hideDoneMessage(){
		document.getElementById('autoDoneMessage').style.display = 'none';
	}
	document.getElementById('syntax-parameters').addEventListener('change', hideDoneMessage);
	document.getElementById('syntax-parameters-clitics').addEventListener('change', hideDoneMessage);
	document.getElementById('syntax-parameters-phonology').addEventListener('change', hideDoneMessage);
	document.getElementById('terminalStrings').addEventListener('change', hideDoneMessage);
	document.getElementById('listOfTerminals').addEventListener('change', hideDoneMessage);

	
	

	// ===GENERATE TERMINAL STRINGS===
	// Button to add list of terminals 
	document.getElementById('addList').addEventListener('click', addTerminalStringList);

	// Show/hide generated terminal strings
	document.getElementById('gen-strings-switch').addEventListener('click', showHideGeneratedTermStrings);

	// Button to generate terminal strings
	document.getElementById('genStringsDoneButton').addEventListener('click', makeAndDisplayTerminalStrings);


});