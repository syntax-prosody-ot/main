function UTree(root) {

	this.root = root;
	
	this.nodeNum = 0;
	this.nodeMap = {};
	this.addMeta = function(node, parent) {
		node.m = {nodeId: this.nodeNum++, parent: parent};
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
	
	this.toHtml = function() {
		var table = this.toTable();
		var frags = [];
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
					var catInputId = 'catInput-' + node.m.nodeId, idInputId = 'idInput-' + node.m.nodeId; 
					rowFrags.push('<div id="treeNode-' + node.m.nodeId + '" class="' + nodeClasses + '" style="width: ' + pxWidth + 'px">' + stemContainer + '<div class="inputContainer"><input id="' + catInputId + '" class="catInput" type="text" value="' + node.cat + '"></input></div><div class="inputContainer"><input id="' + idInputId + '" class="idInput" type="text" value="' + node.id + '"></input></div></div>');
				}
			}
			frags.push('<div>');
			frags.push(rowFrags.join(''));
			frags.push('</div>');
		}
		return frags.join('');
	};
	
	this.toJSON = function() {
		return JSON.stringify(this.root, function(k, v) {
			if (k !== 'm') return v;
		}, 4);
	};
	
	this.addParent = function(nodes) {
		var indices = [], parent = nodes[0].m.parent;
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.m.parent !== parent) throw new Error('Nodes must have same the mother.');
			indices.push(parent.children.indexOf(node));
		}
		indices.sort();
		if (indices[0] < 0) throw new Error('Mother node not found.');
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
		var index = node.m.parent.children.indexOf(node);
		node.m.parent.children = node.m.parent.children.slice(0, index).concat(children, node.m.parent.children.slice(index+1));
		
		// remove from node map
		delete this.nodeMap[node.m.nodeId];
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




window.addEventListener('load', function(){

	var spotForm = document.getElementById('spotForm');

	spotForm.onsubmit=function(e){
		if (e.preventDefault) e.preventDefault();
		
		
		//Build a list of checked constraints.
		var constraintSet = [];
		for(var i=0; i<spotForm.constraints.length; i++){
			var constraintBox = spotForm.constraints[i];
			if(constraintBox.checked){
				var constraint = constraintBox.value;
				if(spotForm['category-'+constraint]){
					var category = spotForm['category-'+constraint].value;
					constraintSet.push(constraint+'-'+category);
				}
				else
					constraintSet.push(constraint);
			}
		}
		
		console.log(constraintSet);
		
		//Get the input syntactic tree.
		var sTree; 
		try{
			sTree = JSON.parse(spotForm.sTree.value);
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
		
		var candidateSet = GEN(sTree, pString, genOptions);
		
		//Make the violation tableau with the info we just got.
		writeTableau(makeTableau(candidateSet, constraintSet));
		revealNextSegment();
		
		return false;
	};
	
	
	
	//Code for generating the JS for a syntactic tree
	var treeUIsTree;
	var treeTableContainer = document.getElementById('treeTableContainer');
	
	//Open the tree making GUI 
	document.getElementById('startTreeUIButton').addEventListener('click', function(){
		document.getElementById('treeUI').style.display = 'block';
	});
	
	function refreshHtmlTree() {
		treeTableContainer.innerHTML = treeUIsTree.toHtml();
		refreshNodeEditingButtons();
	}
	
	//Set up the table...
	document.getElementById('goButton').addEventListener('click', function(){
		// Get the string of terminals
		var terminalString = spotForm.sTreeTerminals.value;
		var terminalList = terminalString.trim().split(/\s+/);
		
		//Make the js tree (a dummy tree only containing the root CP)
		treeUIsTree = UTree.fromTerminals(terminalList);
		
		refreshHtmlTree();
		
		document.getElementById('treeUIinner').style.display = 'block';
	});
	
	// For testing only
	/*
	treeUIsTree = new UTree({
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
	document.getElementById('htmlToJsonTreeButton').addEventListener('click',function(){
		if (treeUIsTree) {
			spotForm.sTree.value = treeUIsTree.toJSON(); 
		}
	});
	
	treeTableContainer.addEventListener('input', function(e) {
		var target = e.target;
		var idPieces = target.id.split('-');
		var nodeId = idPieces[1];
		var isCat = idPieces[0] === 'catInput';
		treeUIsTree.nodeMap[nodeId][isCat ? 'cat' : 'id'] = target.value;
	});
	
	function refreshNodeEditingButtons() {
		var hasSelection = treeTableContainer.getElementsByClassName('selected').length > 0;
		var buttons = document.getElementsByClassName('nodeEditingButton');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].disabled = !hasSelection;
		}
	}
	
	treeTableContainer.addEventListener('click', function(e) {
		var node = e.target;
		if (e.target.classList.contains('stemSide') || e.target.classList.contains('inputContainer')) {
			while (node && !node.classList.contains('treeNode')) {
				node = node.parentElement;
			}
		}
		if (node.classList.contains('treeNode') && !node.classList.contains('rootNode')) {
			node.classList.toggle('selected');
			refreshNodeEditingButtons();
		}
	});
	
	function elementToNode(el) {
		var idFrags = el.id.split('-');
		if (idFrags[0] !== 'treeNode') return null;
		var nodeId = idFrags[1];
		return treeUIsTree.nodeMap[nodeId];
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
			treeUIsTree.addParent(nodes);
			refreshHtmlTree();
		} catch (err) {
			console.error(err);
			alert('Error, unable to add daughter: ' + err.message);
		}
	});
	
	document.getElementById('treeUIdeleteNodes').addEventListener('click', function() {
		var nodes = getSelectedNodes();
		for (var i = 0; i < nodes.length; i++) {
			treeUIsTree.deleteNode(nodes[i]);
		}
		refreshHtmlTree();
	});
	
	document.getElementById('treeUIclearSelection').addEventListener('click', function() {
		var elements = treeTableContainer.getElementsByClassName('selected');
		for (var i = elements.length-1; i >= 0; i--) {
			elements[i].classList.remove('selected');
		}
		refreshNodeEditingButtons();
	});
});
