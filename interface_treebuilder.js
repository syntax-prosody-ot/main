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