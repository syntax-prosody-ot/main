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

	spotForm.onsubmit=sendToTableau;

	//show/hide the tree code area
	document.getElementById('tree-code-box').addEventListener('click', function(){
		if (document.getElementById('tree-code-area').style.display === 'none' && document.getElementById('tree-code-box').checked){
			document.getElementById('tree-code-area').style.display = 'block';
			document.getElementById('sliderText').innerHTML = 'Hide code';
		}
		else{
			document.getElementById('tree-code-area').style.display = 'none';
			document.getElementById('sliderText').innerHTML = 'Show code';
		}
	});

	/** COLLECTION OF FUNCTIONS TO MANAGE SHOWING/HIDING OPTIONS UNDER GEN: OUTPUT PARAMETERS */

	//show/hide Exhaustivity options under GEN: Output parameters > Enforce Exhaustivity
	document.getElementById('exhaustivityBox').addEventListener('click', function(){
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
	});

	//show/hide options for "GEN: Output parameters > Allow movement"
	document.getElementById('movementOptions').addEventListener('click', function(){
		var movementSpecifications = document.getElementById('movementSpecification');
		if (movementSpecifications.style.display === 'none' && document.getElementById('movementOptions').checked){
			movementSpecifications.style.display = 'block';
		}
		else{
			movementSpecifications.style.display = 'none';
		}
	})

	//show extra boxes for "GEN: Output parameters > Annotated with tones" on click
	document.getElementById('annotatedWithTones').addEventListener('click', function(){
		if (document.getElementById('tonesSelectionRow').style.display === 'none' && document.getElementById('annotatedWithTones').checked){
			document.getElementById('tonesSelectionRow').style.display = '';
		}
		else{
			document.getElementById('tonesSelectionRow').style.display = 'none';
		}

	});

	//show/hide options for "GEN: Output parameters > Tree marking options > Mark prosodic heads"
	document.getElementById('showHeads').addEventListener('click', function(){
		if (document.getElementById('headSideOptions').style.display === 'none' && document.getElementById('showHeads').checked){
			document.getElementById('headSideOptions').style.display = '';
		}
		else{
			document.getElementById('headSideOptions').style.display = 'none';
		}
	});

	/*
	document.getElementById("japaneseTonesInfo").addEventListener("click", toneInfoBlock("japanese"));
	document.getElementById("irishTonesInfo").addEventListener("click", toneInfoBlock("irish"));
	*/

	/** END OF GEN: OUTPUT PARAMETERS DISPLAY HELPERS */


	/** RELATED TO MANUAL TREE-BUILDER */

	//Code for generating the JS for a syntactic tree
	var treeTableContainer = document.getElementById('treeTableContainer');

	//Open the tree making GUI when the users clicks "Build syntax"
	document.getElementById('goButton').addEventListener('click', function(){
		changeInputTabs('inputButton', 'goButton');
	});

	function refreshHtmlTree(treeIndex) {
		if (treeIndex === undefined) {
			for (index of Object.keys(treeUIsTreeMap)) {
				refreshHtmlTree(index);
			}
			return;
		}

		if (treeIndex in treeUIsTreeMap) {
			treeUIsTreeMap[treeIndex].refreshHtml();
		}
		refreshNodeEditingButtons();
	}



	//Set up the table for manual tree creation...
	document.getElementById('buildButton').addEventListener('click', function(){
		// Get the string of terminals
		var terminalString = spotForm.inputToGen.value;
		var terminalList = terminalString.trim().split(/\s+/);

		//Make the js tree (a dummy tree only containing the root CP)
		var tree = UTree.fromTerminals(terminalList);
		showUTree(tree);
		document.getElementById('doneMessage').style.display = 'none';
	});

	// automatically generate syntax button
	document.getElementById('inputButton').addEventListener('click', function(){
		changeInputTabs('goButton', 'inputButton');
	});

	// show and display addClitics options
	document.getElementById('add-clitics').addEventListener('change', function(){
		if(document.getElementById('add-clitics').checked) {
			document.getElementById('add-clitics-row').style.display = 'block';
		}
		else {
			document.getElementById('add-clitics-row').style.display = 'none';
		}
	});

	// done button for auto input gen
	document.getElementById('autoGenDoneButton').addEventListener('click', function(){
		document.getElementById('autoDoneMessage').style.display = 'inline-block';
		autoGenInputTree();
		document.getElementById('autoTreeArea').style.display = 'block';
		document.getElementById('syntax-tree-switch').checked = true;
		document.getElementById('syntax-switch-text').innerHTML = 'Hide syntactic trees';
	});

	var sTreeList;
	var terminalStringGenInputMsg = "You must supply at least one list of terminals in order to generate combinations and permutations of terminals.";
	

	window.getAutoSTreeList = function(){
		return sTreeList;
	}

	// add terminal string button
	document.getElementById('addString').addEventListener('click', function(){
		var length = spotForm.inputToGenAuto.length;
		if(length === undefined) {
			length = 1;
		}
		var newLength = length + 1;
		length = length.toString();
		newLength = newLength.toString();
		document.getElementById('str'+length).insertAdjacentHTML('afterend', "<p id='str"+newLength+"'>String of terminals "+newLength+": <input type='text' name='inputToGenAuto'></p>");
		document.getElementById('autoDoneMessage').style.display = 'none';
	});

	// check for change in syntax parameters
	document.getElementById('syntax-parameters').addEventListener('change', function(){
		document.getElementById('autoDoneMessage').style.display = 'none';
	});
	// check for change in syntax parameters
	document.getElementById('syntax-parameters-clitics').addEventListener('change', function(){
		document.getElementById('autoDoneMessage').style.display = 'none';
	});
	// check for change in syntax parameters
	document.getElementById('syntax-parameters-phonology').addEventListener('change', function(){
		document.getElementById('autoDoneMessage').style.display = 'none';
	});

	// check for change in 'string of terminals'
	document.getElementById('terminalStrings').addEventListener('change', function(){
		document.getElementById('autoDoneMessage').style.display = 'none';
	});

	// check for change in 'list of terminals'
	document.getElementById('listOfTerminals').addEventListener('change', function(){
		document.getElementById('autoDoneMessage').style.display = 'none';
	});

	// show/hide syntactic trees
	document.getElementById('syntax-tree-switch').addEventListener('click', function(){
		if (document.getElementById('autoTreeArea').style.display === 'none' && document.getElementById('syntax-tree-switch').checked){
			document.getElementById('autoTreeArea').style.display = 'block';
			document.getElementById('syntax-switch-text').innerHTML = 'Hide syntactic trees';
		}
		else{
			document.getElementById('autoTreeArea').style.display = 'none';
			document.getElementById('syntax-switch-text').innerHTML = 'Show syntactic trees';
		}
	});

	// display tree tables
	function displayTable(sTreeList) {
		var treeTable = treeToTable(sTreeList);
		document.getElementById('autoTreeBox').innerHTML += treeTable;
	}

	// create table from sTree list
	function treeToTable(sTreeList) {
		var htmlChunks = ['<table class="auto-table"><tbody>'];
		var i = 1;
		for(var s in sTreeList) {
			var parTree = parenthesizeTree(sTreeList[s]);
			htmlChunks.push('<tr>');
			htmlChunks.push('<td>' + i + "." + '</td>');
			htmlChunks.push('<td>' + parTree + '</td>');
			htmlChunks.push('</tr>');
			i++;
		}
		htmlChunks.push('</tbody></table>');
		return htmlChunks.join('');
	}

	// GENERATE TERMINAL STRINGS

	// add list of terminals button
	document.getElementById('addList').addEventListener('click', function(){
		var length = spotForm.genStringsInput.length;
		if(length === undefined) {
			length = 1;
		}
		var newLength = length + 1;
		length = length.toString();
		newLength = newLength.toString();
		document.getElementById('list'+length).insertAdjacentHTML('afterend', "<div id='list"+newLength+"'>List of terminals "+newLength+": <input type='text' name='genStringsInput'><p>Number of terminals in generated strings:</p><p class='genStringsNum'>Min: <input type='text' name='genStringsMin' class='genStringsNumBox' style='margin-left: 4px'></p><p class='genStringsNum'>Max: <input type='text' name='genStringsMax' class='genStringsNumBox'></p></div>");
		document.getElementById('autoDoneMessage').style.display = 'none';
	});

	// show/hide generated terminal strings
	document.getElementById('gen-strings-switch').addEventListener('click', function(){
		if (document.getElementById('genStringsArea').style.display === 'none' && document.getElementById('gen-strings-switch').checked){
			document.getElementById('genStringsArea').style.display = 'block';
			document.getElementById('strings-switch-text').innerHTML = 'Hide generated terminals strings';
		}
		else{
			document.getElementById('genStringsArea').style.display = 'none';
			document.getElementById('strings-switch-text').innerHTML = 'Show generated terminals strings';
		}
	});

	// done button for generate terminal strings
	document.getElementById('genStringsDoneButton').addEventListener('click', function(){
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
	});

	
	//Look at the html tree and turn it into a JSON tree. Put the JSON in the following textarea.
	document.getElementById('htmlToJsonTreeButton').addEventListener('click', function(){
		sTree = JSON.stringify(Object.values(treeUIsTreeMap).map(function(tree) {

			// console.log(JSON.parse(tree.toJSON()));
			// console.log(JSON.parse(tree.toJSON())['cat']);
			var checkTree = JSON.parse(tree.toJSON());
			parseCats(checkTree);
			return (checkTree); // bit of a hack to get around replacer not being called recursively
		}), null, 4);

		if(sTree.includes('-')) {
			displayError('Your trees were not added to the analysis because there are hyphens in category or id names in the tree builder. Please refer to the instructions in the tree builder info section.');
			var info = document.getElementById('treeBuilderInfo');
			info.classList.add('showing');
		}
		else {
			spotForm.sTree.value = sTree
			document.getElementById('doneMessage').style.display = 'inline-block';
		}

		spotForm.inputToGen.value = "";
	});

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

	function elementToNode(el) {
		var idFrags = el.id.split('-');
		if (idFrags[0] !== 'treeNode') return null;
		var nodeId = idFrags[1];
		return treeUIsTreeMap[idFrags[2]].nodeMap[nodeId];
	}

	function getSelectedNodes() {
		var elements = treeTableContainer.getElementsByClassName('selected');
		var nodes = [];
		for (var i = 0; i < elements.length; i++) {
			var node = elementToNode(elements[i]);
			if (node) {
				nodes.push(node);
			}
		}
		return nodes;
	}

	document.getElementById('treeUImakeParent').addEventListener('click', function() {
		var nodes = getSelectedNodes();
		try {
			treeUIsTreeMap[nodes[0].m.treeIndex].addParent(nodes);
			refreshHtmlTree();
		} catch (err) {
			displayError('Unable to add daughter: ' + err.message, err);
		}
		document.getElementById('doneMessage').style.display = 'none';
	});

	document.getElementById('treeUIdeleteNodes').addEventListener('click', function() {
		var nodes = getSelectedNodes();
		if (nodes) {
			var treeIndex = nodes[0].m.treeIndex;
			for (var i = 1; i < nodes.length; i++) {
				if (nodes[i].treeIndex != treeIndex) {
					displayError('You attempted to delete nodes from multiple trees. Please delete nodes one tree at a time.');
					return;
				}
			}
		}
		var tree = treeUIsTreeMap[treeIndex];
		for (var i = 0; i < nodes.length; i++) {
			tree.deleteNode(nodes[i]);
		}
		refreshHtmlTree(treeIndex);
		document.getElementById('doneMessage').style.display = 'none';
	});

	document.getElementById('treeUIclearSelection').addEventListener('click', function() {
		var elements = treeTableContainer.getElementsByClassName('selected');
		for (var i = elements.length-1; i >= 0; i--) {
			elements[i].classList.remove('selected');
		}
		refreshNodeEditingButtons();
	});

	document.body.addEventListener('click', function(event) {
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
	});

	document.getElementById("clearAllButton").addEventListener("click", function(){
		clearAnalysis();
		document.getElementById('treeUIinner').style.display = 'none';
		document.getElementById('built-in-dropdown').value = 'select';
		document.getElementById('fileUpload').value = '';
		document.getElementById('chooseFilePrompt').style = "font-size: 13px; color: #555";
		document.getElementById('chooseFile').style = "display: none";
		document.getElementById('save/load-dialog').innerHTML = '';
	});

	document.getElementById('spotForm').addEventListener("change", function(){
		document.getElementById("save/load-dialog").innerHTML = '';
	});

	var x = document.getElementsByName("autoInputOptions");
	//console.log(x);
	var i;
	var noBarLevelsIndex;
	for (i = 0; i < x.length; i++) {
		if (x[i].value === "noBarLevels") {
			noBarLevelsIndex = i;
			break;
		}
	}

	document.getElementsByName('autoInputOptions-recursiveCategory')[2].addEventListener('click', function() {
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
	});

	document.getElementsByName('autoInputOptions-recursiveCategory')[0].addEventListener('click', function() {
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
	});

	document.getElementsByName('autoInputOptions-recursiveCategory')[1].addEventListener('click', function() {
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
	});

	document.getElementsByName("autoInputOptions")[noBarLevelsIndex].addEventListener('click', function() {
		var x = document.getElementsByName("autoInputOptions")[noBarLevelsIndex];
		if(x.checked === false) {
			var y = document.getElementById('head-req').options;
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
			var y = document.getElementById('head-req').options;
			y[1].disabled = false;
			y[2].disabled = false;
			y[3].disabled = true;
			y[4].disabled = true;
		}
	});

});

// END 1000 LINE LOAD FUNCTION







