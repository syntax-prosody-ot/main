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

	//Make the js tree (a dummy tree only containing the root CP)
	var root = {
		"id":"CP1",
		"cat":"cp",
		"children":[]
	};
	//Add the provided terminals
	for(var i=0; i<dedupedTerminals.length; i++){
		root.children.push({
			"id":dedupedTerminals[i],
			"cat":"x0"
		});
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
							if(constraint === "alignLeftMorpheme") {
								category = category.split(' ').join('_');
							}
							//Figure out selected match options for the constraint
							if(spotForm['option-'+constraint]){
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

		//Get the input syntactic tree.
		var sTrees;
		try{
			sTrees = getSTrees();
		}
		catch(e){
			console.error(e);
			alert(e.message);
			return;
		}

		//Get input to GEN.
		var pString = spotForm.inputToGen.value;

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
			invisibleCategories: []
		};

		if(document.getElementById("annotatedWithTones").checked){
			//from radio group near the bottom of spotForm
			genOptions.addTones = spotForm.toneOptions.value;
		 	tableauOptions.showTones = spotForm.toneOptions.value;
			//console.log(genOptions);
		}


		for(var i = 0; i < spotForm.hideCategory.length; i++){
			var hiddenCat = spotForm.hideCategory[i];
			if(hiddenCat.checked){
				tableauOptions.invisibleCategories.push(hiddenCat.value);
			}
		}

		var resultsConCl = document.getElementById("results-container").classList;
		resultsConCl.add('show-tableau');


		var csvSegs = [];
		for (var i = 0; i < sTrees.length; i++) {
			var sTree = sTrees[i];
			//console.log(pString.split(" ").length >= 6)
			//warn user about using more than six terminals


			//warn user about possibly excessive numbers of candidates
			if (genOptions['cliticMovement'] && (!genOptions['noUnary'] && (getLeaves(sTree).length >= 5 || pString.split(" ").length >= 5))
											 || (genOptions['noUnary'] && (getLeaves(sTree).length >= 7 || pString.split(" ").length >= 7))){
				if(!confirm("You have selected GEN settings that allow clitic reordering, and included a sentence of ".concat( pString.split(" ").length.toString()," terminals. This GEN may yield more than 10K candidates. To reduce the number of candidates, consider enforcing non-recursivity, exhaustivity, and/or branchingness for intermediate prosodic nodes. Do you wish to proceed with these settings?"))){
					throw new Error("clitic movement with too many terminals");
				}
			}
			else if(getLeaves(sTree).length >= 6 || pString.split(" ").length >= 6){
				if(!confirm("Inputs of more than six terminals may run slowly and even freeze your browser, depending on the selected GEN options. Do you wish to continue?")){
					throw new Error("Tried to run gen with more than six terminals");
				}
			}

			if (genOptions['cliticMovement']){
				var candidateSet = GENwithCliticMovement(sTree, pString, genOptions);
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
		}
		else{
			document.getElementById('tree-code-area').style.display = 'none';
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


	/*
	document.getElementById("japaneseTonesInfo").addEventListener("click", toneInfoBlock("japanese"));
	document.getElementById("irishTonesInfo").addEventListener("click", toneInfoBlock("irish"));
	*/

	//Code for generating the JS for a syntactic tree
	var treeTableContainer = document.getElementById('treeTableContainer');

	//Open the tree making GUI
	document.getElementById('goButton').addEventListener('click', function(){
		document.getElementById('treeUI').style.display = 'block';
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
	document.getElementById('goButton').addEventListener('click', function(){
		// Get the string of terminals
		var terminalString = spotForm.inputToGen.value;
		var terminalList = terminalString.trim().split(/\s+/);

		//Make the js tree (a dummy tree only containing the root CP)
		var tree = UTree.fromTerminals(terminalList);
		showUTree(tree);
		document.getElementById('doneMessage').style.display = 'none';
	});


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

	//Look at the html tree and turn it into a JSON tree. Put the JSON in the following textarea.
	document.getElementById('htmlToJsonTreeButton').addEventListener('click', function(){
		spotForm.sTree.value = JSON.stringify(Object.values(treeUIsTreeMap).map(function(tree) {
			return JSON.parse(tree.toJSON()); // bit of a hack to get around replacer not being called recursively
		}), null, 4);

		document.getElementById('doneMessage').style.display = 'inline-block';
	});

	document.getElementById('danishJsonTreesButton').addEventListener('click', function() {
		spotForm.sTree.value = JSON.stringify(danishTrees(), null, 4);
	});

	treeTableContainer.addEventListener('input', function(e) {
		var target = e.target;
		var idPieces = target.id.split('-');
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
			console.error(err);
			alert('Error, unable to add daughter: ' + err.message);
		}
		document.getElementById('doneMessage').style.display = 'none';
	});

	document.getElementById('treeUIdeleteNodes').addEventListener('click', function() {
		var nodes = getSelectedNodes();
		if (nodes) {
			var treeIndex = nodes[0].m.treeIndex;
			for (var i = 1; i < nodes.length; i++) {
				if (nodes[i].treeIndex != treeIndex) {
					alert('Attempting to delete nodes from multiple trees. Please delete nodes one tree at a time.');
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
		document.getElementById('treeUI').style.display = 'none';
		document.getElementById('built-in-dropdown').value = 'select';
		document.getElementById('fileUpload').value = '';
		document.getElementById('chooseFilePrompt').style = "font-size: 13px; color: #555";
		document.getElementById('chooseFile').style = "display: none";
		document.getElementById('save/load-dialog').innerHTML = '';
	});

	document.getElementById('spotForm').addEventListener("change", function(){
		document.getElementById("save/load-dialog").innerHTML = '';
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
