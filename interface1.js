var uTreeCounter = 0;
var treeUIsTreeMap = {};

function UTree(root) {

	var self = this;
	this.root = root;
	this.treeIndex = uTreeCounter++;
	treeUIsTreeMap[this.treeIndex] = this;

	this.nodeNum = 0;
	this.nodeMap = {};
	this.addMeta = function(node, parent) {
		node.m = {nodeId: this.nodeNum++, parent: parent, treeIndex: this.treeIndex};
		this.nodeMap[node.m.nodeId] = node;
		if (node.children) {
			for (var i = 0; i < node.children.length; i++) {
				this.addMeta(node.children[i], node);
			}
		}
	};
	this.addMeta(this.root);
	this.root.m.isRoot = true;

	function assignDims(node) {
		var height = 0, width = 0;
		if (node.children && node.children.length) {
			for (var i = 0; i < node.children.length; i++) {
				var childResult = assignDims(node.children[i]);
				width += childResult.width; // width in number of cells
				height = Math.max(childResult.height, height); //height counts how many levels up from the terminals this node is
			}
			height += 1; // for this node
		} else {
			width = 1;
		}
		node.m.height = height;
		node.m.width = width;
		return node.m;
	}

	this.toTable = function() {
		assignDims(this.root);
		var table = [];
		for (var i = 0; i <= this.root.m.height; i++) {
			table.push([]);
		}
		function processNode(node, parentHeight) {
			var height = node.m.height;
			table[height].push({node: node, width: node.m.width, hasStem: parentHeight > height, stemOnly: false});
			for (var h = height+1; h < parentHeight; h++) {
				table[h].push({width: node.m.width, stemOnly: true});
			}
			if (node.children && node.children.length) {
				for (var i = 0; i < node.children.length; i++) {
					processNode(node.children[i], height);
				}
			}
		}
		processNode(this.root, this.root.height);
		return table;
	};

	function makeElementId(elType, node) {
		return [elType, node.m.nodeId, self.treeIndex].join('-');
	}

	function toInnerHtmlFrags(frags) {
		if (!frags) frags = [];
		var table = self.toTable();
		for (var h = table.length-1; h >= 0; h--) {
			var rowFrags = [];
			var row = table[h];
			for (var i = 0; i < row.length; i++) {
				var block = row[i], node = block.node;
				var pxWidth = block.width*80; // should be an even number of pixels
				var stemLeftWidth = pxWidth/2 - 2, stemRightWidth = pxWidth/2;
				var stem = '<div class="inline-block stemSide" style="width: ' + stemLeftWidth + 'px; border-right: 2px black solid"></div><div class="inline-block stemSide" style="width: ' + stemRightWidth + 'px"></div>';
				if (block.stemOnly) {
					rowFrags.push(stem);
				} else {
					var stemContainer = '';
					if (block.hasStem) {
						stemContainer = '<div class="stemContainer">' + stem + '</div>';
					}
					var nodeClasses = 'treeNode';
					if (node.m.isRoot) {
						nodeClasses += ' rootNode';
					}
					var catInputId = makeElementId('catInput', node), idInputId = makeElementId('idInput', node);
					rowFrags.push('<div id="treeNode-' + node.m.nodeId + '-' + node.m.treeIndex + '" class="' + nodeClasses + '" style="width: ' + pxWidth + 'px">' + stemContainer + '<div class="inputContainer"><input id="' + catInputId + '" class="catInput" type="text" value="' + node.cat + '"></input></div><div class="inputContainer"><input id="' + idInputId + '" class="idInput" type="text" value="' + node.id + '"></input></div></div>');
				}
			}
			frags.push('<div>');
			frags.push(rowFrags.join(''));
			frags.push('</div>');
		}
		return frags;
	};

	this.toInnerHtml = function() {
		return toInnerHtmlFrags().join('');
	}

	this.toHtml = function() {
		var frags = ['<div class="treeUI-tree" id="treeUI-' + self.treeIndex + '">'];
		toInnerHtmlFrags(frags);
		frags.push('</div>');
		return frags.join('');
	}

	this.refreshHtml = function() {
		document.getElementById('treeUI-'+self.treeIndex).innerHTML = self.toInnerHtml();
	}

	this.toJSON = function() {
		return JSON.stringify(this.root, function(k, v) {
			if (k !== 'm') return v;
		}, 4);
	};

	this.addParent = function(nodes) {
		var indices = [], parent = nodes[0].m.parent;
		if (!parent) {
			throw new Error('Cannot add a mother to the root node');
		}
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.m.parent !== parent) throw new Error('Nodes must have same the mother.');
			if (parent) {
				indices.push(parent.children.indexOf(node));
			}
		}
		indices.sort();
		if (indices && indices[0] < 0) throw new Error('Mother node not found.');
		for (var i = 1; i < indices.length; i++) {
			if (indices[i] !== indices[i-1]+1) throw new Error('Nodes must be adjacent sisters.');
		}

		// create new node, connect it to parent
		var newNode = {cat: 'xp'};
		this.addMeta(newNode, parent);
		newNode.id = 'XP_' + newNode.m.nodeId; // this does not guarantee uniqueness, but probably close enough for now

		// connect new node to children
		var firstChildIndex = indices[0], lastChildIndex = indices[indices.length-1];
		newNode.children = parent.children.slice(firstChildIndex, lastChildIndex+1);

		// connect children to new node
		for (var i = 0; i < newNode.children.length; i++) {
			newNode.children[i].m.parent = newNode;
		}

		// connect parent to new node
		parent.children = parent.children.slice(0, firstChildIndex).concat([newNode], parent.children.slice(lastChildIndex+1));
	};

	this.deleteNode = function(node) {
		// connect children to parent
		var parent = node.m.parent, children = node.children || [];
		for (var i = 0; i < children.length; i++) {
			children[i].m.parent = parent;
		}

		// connect parent to children
		if (node.m.parent) {
			var index = node.m.parent.children.indexOf(node);
			node.m.parent.children = node.m.parent.children.slice(0, index).concat(children, node.m.parent.children.slice(index+1));

			// remove from node map
			delete this.nodeMap[node.m.nodeId];
		} else { // delete UTree and associated element if root
			delete treeUIsTreeMap[node.m.treeIndex];
			var elem = document.getElementById('treeUI-' + this.treeIndex);
			elem.parentNode.removeChild(elem);
		}
	};
}

UTree.fromTerminals = function(terminalList) {
	var dedupedTerminals = deduplicateTerminals(terminalList);
	var cliticRegex = /-clitic/; //for testing if terminal should be a clitic

	//Make the js tree (a dummy tree only containing the root CP)
	var root = {
		"id":"CP1",
		"cat":"cp",
		"children":[]
	};
	//Add the provided terminals
	for(var i=0; i<dedupedTerminals.length; i++){
		//if terminal should be a clitic
		if(cliticRegex.test(dedupedTerminals[i])){
			//push a clitic to root.children
			root.children.push({
				"id":dedupedTerminals[i].replace('-clitic', ''),
				"cat":"clitic"
			});
		}
		//non-clitic terminals
		else {
			root.children.push({
				"id":dedupedTerminals[i],
				"cat":"x0"
			});
		}
	}
	return new UTree(root);
};

function showUTree(tree){
	treeTableContainer.innerHTML += tree.toHtml();
	refreshNodeEditingButtons();

	document.getElementById('treeUIinner').style.display = 'block';

	var treeContainer = document.getElementById("treeTableContainer");
	treeContainer.scrollTop = treeContainer.scrollHeight;

}

function clearUTrees(){
	treeTableContainer.innerHTML = '';
	treeUIsTreeMap = {};
}

function addOrRemoveUTrees(addTree){
	if(addTree){
		treeTableContainer.innerHTML += addTree.toHtml();
	}
	else{
		clearUTrees();
	}
	refreshNodeEditingButtons();

	document.getElementById('treeUIinner').style.display = 'block';

	var treeContainer = document.getElementById("treeTableContainer");
	treeContainer.scrollTop = treeContainer.scrollHeight;
}

function refreshNodeEditingButtons() {
	var treeTableContainer = document.getElementById('treeTableContainer');
	var hasSelection = treeTableContainer.getElementsByClassName('selected').length > 0;
	var buttons = document.getElementsByClassName('nodeEditingButton');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = !hasSelection;
	}
}

function getSTrees() {
	var spotForm = document.getElementById('spotForm');
	var sTrees;
	sTrees = JSON.parse(spotForm.sTree.value);
	if (!(sTrees instanceof Array)) {
		sTrees = [sTrees];
	}
	return sTrees;
}

function danishTrees() {
	var patterns = [
		[[{}],[{}]],
		[[{}],[{},{}]],
		[[{},{}],[{}]],
		[[{},{}],[{},{}]],
		[[{}],[[{}],[{}]]],
		[[{}],[[{}],[{},{}]]],
		[[{}],[[{},{}],[{}]]],
		[[{},{}],[[{}],[{}]]],
		[[{}],[[{},{}],[{},{}]]],
		[[{},{}],[[{}],[{},{}]]],
		[[{},{}],[[{},{}],[{}]]],
		[[{},{}],[[{},{}],[{},{}]]],
		[[[{}],[{}]],[{}]],
		[[[{}],[{}]],[{},{}]],
		[[[{}],[{},{}]],[{}]],
		[[[{},{}],[{}]],[{}]],
		[[[{}],[{},{}]],[{},{}]],
		[[[{},{}],[{}]],[{},{}]],
		[[[{},{}],[{},{}]],[{}]],
		[[[{},{}],[{},{}]],[{},{}]]
	];

	function patternToJS(pattern) {
		var xpid = 1, x0id = 1;
		function patternPartToJS(pattern) {
			var node = {};
			if (pattern instanceof Array) {
				node.id = "XP" + xpid++;
				node.cat = "xp";
				node.children = [];
				for (var i = 0; i < pattern.length; i++) {
					node.children.push(patternPartToJS(pattern[i]));
				}
			} else {
				node.id = "f_" + x0id++;
				node.cat = "x0";
			}
			return node;
		}
		return patternPartToJS(pattern);
	}

	var sTrees = [];

	for (var i = 0; i < patterns.length; i++) {
		sTrees.push(patternToJS(patterns[i]));
	}

	return sTrees;
}

window.addEventListener('load', function(){

	var spotForm = document.getElementById('spotForm');

	if (!spotForm) {
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

	spotForm.onsubmit=function(e){
		if (e.preventDefault) e.preventDefault();

		//Build a list of checked constraints.
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

		// Get the automatically generated syntactic trees
		if(document.getElementById('inputOptions').style.display == 'block') {
			var sTrees;
			try{
				sTrees = getAutoSTreeList();
			}
			catch(e){
				displayError(e.message, e);
				return;
			}
		}
		else {
			// Get the input syntactic tree from tree builder
			var sTrees;
			try{
				sTrees = getSTrees();
			}
			catch(e){
				displayError(e.message, e);
				return;
			}
		}

		//Get input to GEN.
		var pString = spotForm.inputToGen.value;
		// Get the code that is in the stree textarea
		var treeCode = spotForm.sTree.value
		// if code has been generated, then ignore pString in GEN
		if(treeCode !== "{}") {
			pString = "";
		}
		if(document.getElementById('inputOptions').style.display == 'block') {
			if (spotForm.inputToGen.value != ""){
				displayWarning("Inputs were provided on both the Manual tab and the Automatic tab of Gen: Inputs. The candidate set will be created using inputs on the tab that is currently visible. Inputs that are not currently displayed will be ignored.");
			}
			pString = "";
		}else{
			if (spotForm.inputToGenAuto.value != ""){
				displayWarning("Inputs were provided on both the Manual tab and the Automatic tab of Gen: Inputs. The candidate set will be created using inputs on the tab that is currently visible. Inputs that are not currently displayed will be ignored.");
			}
		}
		//Build a list of checked GEN options.
		var genOptions = {};
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
			tableauOptions.showHeads = spotForm['genOptions-showHeads'].value;
		}


		for(var i = 0; i < spotForm.hideCategory.length; i++){
			var hiddenCat = spotForm.hideCategory[i];
			if(hiddenCat.checked){
				tableauOptions.invisibleCategories.push(hiddenCat.value);
			}
		}

		var resultsConCl = document.getElementById("results-container").classList;
		resultsConCl.add('show-tableau');


		var safe_input_length = true;
		var safe_input_length_clitic = true;
		var sTree;
		var maxNumTerminals;
		var j = 0;
		while(safe_input_length && safe_input_length_clitic && j < sTrees.length){
		//check for inputs that are too long and set safe_input_length = false as needed
			sTree = sTrees[j];
			maxNumTerminals = Math.max(getLeaves(sTree).length, pString.split(" ").length);
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

		var csvSegs = [];
		for (var i = 0; i < sTrees.length; i++) {
			var sTree = sTrees[i];

			//Actually create the candidate set
			if (genOptions['cliticMovement']){
			//	var candidateSet = GENwithCliticMovement(sTree, pString, genOptions);
				var candidateSet = globalNameOrDirect(spotForm['genOptions-movement'].value)(sTree, pString, genOptions);
			}
			else{
				var candidateSet = GEN(sTree, pString, genOptions);
			}

			//Make the violation tableau with the info we just got.
			var tabl = makeTableau(candidateSet, constraintSet, tableauOptions);
			csvSegs.push(tableauToCsv(tabl, ',', {noHeader: i}));
			writeTableau(tabl);
			revealNextSegment();
		}

		saveTextAs(csvSegs.join('\n'), 'SPOT_Results.csv');

		// the function saveAs() has been moved to the end of this file to make it global

		function saveTextAs(text, name) {
			saveAs(new Blob([text], {type: "text/csv", encoding: 'utf-8'}), name);
		}

		return false;
	};
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
	document.getElementById('movementOptions').addEventListener('click', function(){
		var movementSpecifications = document.getElementById('movementSpecification');
		if (movementSpecifications.style.display === 'none' && document.getElementById('movementOptions').checked){
			movementSpecifications.style.display = 'block';
		}
		else{
			movementSpecifications.style.display = 'none';
		}
	})

	//show extra boxes for annotated with tones on click
	//console.log(document.getElementById('annotatedWithTones'))
	document.getElementById('annotatedWithTones').addEventListener('click', function(){
		if (document.getElementById('tonesSelectionRow').style.display === 'none' && document.getElementById('annotatedWithTones').checked){
			document.getElementById('tonesSelectionRow').style.display = '';
		}
		else{
			document.getElementById('tonesSelectionRow').style.display = 'none';
			//if (genOptions['usesTones']){
			//	genOptions['usesTones'] = false;
			//}
		}

	});

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

	//Code for generating the JS for a syntactic tree
	var treeTableContainer = document.getElementById('treeTableContainer');

	//Open the tree making GUI
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



	//Set up the table...
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

	// automatically generate input tree
	function autoGenInputTree() {
		genTerminalStrings();
		var strings = getStringsList();
		var length = strings.length;

		sTreeList = undefined;
		document.getElementById('autoTreeBox').innerHTML = "";

		for(var i=0; i<length; i++){
			var inputString = strings[i];

			// allow adjuncts and remove mirror images
			var autoInputOptions = {};
			var optionBox = spotForm.autoInputOptions;
			for(var j = 0; j < optionBox.length; j++) {
				if(optionBox[j].value == "noAdjuncts" || optionBox[j].value == "noBarLevels") {
					autoInputOptions[optionBox[j].value] =! optionBox[j].checked;
				}
				else {
					autoInputOptions[optionBox[j].value]=optionBox[j].checked;
				}
			}

			// head requirements
			var headReq = document.getElementById('head-req').value;
			if(headReq !== 'select') {
				var headSideVal = headReq;
			}
			autoInputOptions.headSide = headSideVal;

			// add XP clitics directly under root
			if(document.getElementById('add-clitics').checked) {
				var addCliticsVal = document.getElementById('add-clitics').value;
				if(document.getElementById('add-clitics-left').checked) {
					addCliticsVal = 'left';
				}
			}
			autoInputOptions.addClitics = addCliticsVal;

			// root, recursive terminal, category
			autoInputOptions.rootCategory = spotForm['autoInputOptions-rootCategory'].value;
			autoInputOptions.recursiveCategory = spotForm['autoInputOptions-recursiveCategory'].value;
			autoInputOptions.terminalCategory = spotForm['autoInputOptions-terminalCategory'].value;

			if(autoInputOptions.recursiveCategory === 'x0' || autoInputOptions.noUnary){
				autoInputOptions.noAdjacentHeads = false;
			}

			// console.log(autoInputOptions)

			if(inputString !== "") {
				var currSTreeList = sTreeGEN(inputString, autoInputOptions);
				displayTable(currSTreeList);
				if(sTreeList) {
					sTreeList = sTreeList.concat(currSTreeList);
				}
				else {
					sTreeList = currSTreeList;
				}
			}
		}
		//console.log(sTreeList)
	}

	function getAutoSTreeList() {
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
		deleteThickLine();
		genTerminalStrings();
		document.getElementById('genStringsArea').style.display = 'block';
		document.getElementById('gen-strings-switch').checked = true;
		document.getElementById('strings-switch-text').innerHTML = 'Hide generated terminals strings';
	});

	var genStringsList;

	// generate and display terminal strings
	function genTerminalStrings() {
		document.getElementById('genStringsBox').innerHTML = "";

		var length = spotForm.inputToGenAuto.length;
		if(length === undefined) {
			length = 1;
		}
		var inputString = spotForm.inputToGenAuto.value;
		var fixedStringList = [];
		genStringsList = undefined;

		for(var i=0; i<length; i++){
			if(length > 1) {
				inputString = spotForm.inputToGenAuto[i].value;
			}
			if(inputString !== "") {
				fixedStringList.push(inputString);
			}
		}
		if(fixedStringList.length > 0) {
			displayStringsTable(fixedStringList);
			genStringsList = fixedStringList;
		}

		var length = spotForm.genStringsInput.length;
		if(length === undefined) {
			length = 1;
		}
		var inputList = spotForm.genStringsInput.value;
		var min = spotForm.genStringsMin.value;
		var max = spotForm.genStringsMax.value;

		for(var i=0; i<length; i++){
			if(length > 1) {
				inputList = spotForm.genStringsInput[i].value;
				min = spotForm.genStringsMin[i].value;
				max = spotForm.genStringsMax[i].value;
			}

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
		// console.log(genStringsList)
	}

	function getStringsList() {
		return genStringsList;
	}

	// display generated terminal strings in table
	function displayStringsTable(genStringsList) {
		var tables = document.getElementsByClassName("string-table");
		var index = tables.length + 1;
		var stringsTable = stringToTable(genStringsList, index);
		document.getElementById('genStringsBox').innerHTML += stringsTable;
		addThickLine(genStringsList, index);
	}

	// create table from generated terminal strings list
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

	// add thicker line between generated strings of different lengths
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

	// remove thicker line between generated strings of different lengths before regenerating strings
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

	// For testing only
	/*
	new UTree({
		id: "CP1",
		cat: "cp",
		children: [
			{id: "a", cat: "x0"},
			{id: "n", cat: "n", children: [
				{id: "b", cat: "x0"},
				{id: "c", cat: "x0"},
			]},
			{id: "d", cat: "x0"}
		]
	});
	refreshHtmlTree();
	document.getElementById('treeUIinner').style.display = 'block';
	*/
	function parseCats(node){
		var cats = node['cat'].split(',');
		if (cats.length > 1){
			node['cat'] = cats[0];
		}
		// add the rest of the list as attributes
		for (var cat of cats.slice(1)){
			// remove non-alphanumeric characters, underscores
			// replace capital letters with lowercase
			att = cat.trim().replace(/\W/g, '');
			if (att === ""){
				continue;
			}
			//console.log(att)
			node[att] = true;
			/*
			if (cat.indexOf('silentHead') != -1){
				node['silentHead'] = true;
			}
			if (cat.indexOf('func') != -1){
				node['func'] = true;
			}
			if (cat.indexOf('foc') != -1){
				node['foc'] = true;
			}*/

		}
		var children = node['children'];
		if (children != undefined){
			for (var child of children){
				parseCats(child);
			}
		}
	}
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
	console.log(x);
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

function toneInfoBlock(language){
	var content = document.getElementById("tonesInfoContent");
	var japaneseContent = "Tokyo Japanese: the left edge of phi is marked with a rising boundary tone (LH), accented words receive an HL on the accented syllable, and H tones that follow a pitch drop (HL) within the maximal phi are downstepped (!H). (See: Pierrehumbert and Beckman 1988; Gussenhoven 2004; Ito and Mester 2007) Accents, boundary tones, and downstep in Lekeitio Basque are realized with the same tones as in Tokyo Japanese.";
	var irishContent = "Conamara Irish (Elfner 2012): The left edge of the non-minimal phi is marked with a rising boundary tone (LH), and the right edge of every phi is marked with a falling boundary tone (HL).";
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

function clearTableau() {
	document.getElementById('results-container').innerHTML = "";
	document.getElementById('results-container').className = "";
}

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

function closeButton() {
	var close = document.getElementsByClassName("closebtn");
	var i;

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.opacity = "0";
			setTimeout(function() {
				div.style.display = "none";
			}, 600);
		}
	}
}

function displayError(errorMsg, error) {
	if(error !== undefined) {
		console.error(error);
	}
	else {
		console.error("Error: " + errorMsg);
	}

	var spotForm = document.getElementById('spotForm');
	if (!spotForm) {
		alert("Error: " + errorMsg);
		return;
	}

	var div = document.getElementById("error");
	div.children[2].innerHTML = errorMsg;
	div.style.display = "block";
	div.style.opacity = "100";
	closeButton();
}

function displayWarning(warnMsg) {
	console.warn("Warning: " + warnMsg);

	var spotForm = document.getElementById('spotForm');
	if (!spotForm) {
		alert("Warning: " + warnMsg);
		return;
	}

	var div = document.getElementById("warning");
	div.children[2].innerHTML = warnMsg;
	div.style.display = "block";
	div.style.opacity = "100";
	closeButton();
}

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
