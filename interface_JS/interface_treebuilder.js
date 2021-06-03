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
					var inputSuffixId = "";
			 		if (node.silentHead == true){ //silentHead = true
						inputSuffixId += ", silentHead";
					}
					if (node.func == true){ //func = true
						inputSuffixId += ", func";
					}
					if (node.foc == true){ //foc = true
						inputSuffixId += ", foc";
					}
					rowFrags.push('<div id="treeNode-' + node.m.nodeId + '-' + node.m.treeIndex + '" class="' + nodeClasses + '" style="width: ' + pxWidth + 'px">' + stemContainer + '<div class="inputContainer"><input id="' + catInputId + '" class="catInput" type="text" value="' + node.cat + inputSuffixId + '"></input></div><div class="inputContainer"><input id="' + idInputId + '" class="idInput" type="text" value="' + node.id + '"></input></div></div>');
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

function htmlToJSONTree(){
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

function treeUIMakeParent() {
	var nodes = getSelectedNodes();
	try {
		treeUIsTreeMap[nodes[0].m.treeIndex].addParent(nodes);
		refreshHtmlTree();
	} catch (err) {
		displayError('Unable to add daughter: ' + err.message, err);
	}
	document.getElementById('doneMessage').style.display = 'none';
}

function deleteTreeUINodes() {
	var nodes = getSelectedNodes();
	if (nodes) {
		var treeIndex = nodes[0].m.treeIndex;
		for (var i = 1; i < nodes.length; i++) {;
			if(nodes[i].m.treeIndex != treeIndex) {
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
}

function treeUIClearSelection() {
	var elements = treeTableContainer.getElementsByClassName('selected');
	for (var i = elements.length-1; i >= 0; i--) {
		elements[i].classList.remove('selected');
	}
	refreshNodeEditingButtons();
}

function refreshNodeEditingButtons() {
	var treeTableContainer = document.getElementById('treeTableContainer');
	var hasSelection = treeTableContainer.getElementsByClassName('selected').length > 0;
	var buttons = document.getElementsByClassName('nodeEditingButton');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = !hasSelection;
	}
}

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

function setUpTreeBuilderTable(){
	// Get the string of terminals
	var terminalString = spotForm.inputToGen.value;
	var terminalList = terminalString.trim().split(/\s+/);

	//Make the js tree (a dummy tree only containing the root CP)
	var tree = UTree.fromTerminals(terminalList);
	showUTree(tree);
	document.getElementById('doneMessage').style.display = 'none';
}

//Shows or hides the tree code area when the toggle is switched
function showHideTreeCode(){
	if (document.getElementById('tree-code-area').style.display === 'none' && document.getElementById('tree-code-box').checked){
		document.getElementById('tree-code-area').style.display = 'block';
		document.getElementById('sliderText').innerHTML = 'Hide code';
	}
	else{
		document.getElementById('tree-code-area').style.display = 'none';
		document.getElementById('sliderText').innerHTML = 'Show code';
	}
}

//Get syntactic trees from manual tree builder's code area
function getSTrees() {
	var spotForm = document.getElementById('spotForm');
	var sTrees;
	sTrees = JSON.parse(spotForm.sTree.value);
	if (!(sTrees instanceof Array)) {
		sTrees = [sTrees];
	}
	return sTrees;
}


/** 
 * Functions for generating all maximally binary-branching trees with two or three terminals
 * as used in Bellik & Kalivoda 2018 on Danish compound words
 * LEGACY CODE
 */
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