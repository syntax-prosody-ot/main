function UTree(root) {

	this.root = root;
	
	this.nodeNum = 0;
	this.nodeMap = {};
	this.addMeta = function(node) {
		node.m = {nodeId: this.nodeNum++};
		this.nodeMap[node.m.nodeId] = node;
		if (node.children) {
			for (var i = 0; i < node.children.length; i++) {
				this.addMeta(node.children[i]);
			}
		}
	};
	this.addMeta(this.root);
	
	function assignDims(node) {
		var height = 0, width = 0;
		if (node.children && node.children.length) {
			for (var i = 0; i < node.children.length; i++) {
				var childResult = assignDims(node.children[i]);
				width += childResult.width;
				height = Math.max(childResult.height, height);
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
		console.log(table);
		var frags = [];
		for (var h = table.length-1; h >= 0; h--) {
			var rowFrags = [];
			var row = table[h];
			for (var i = 0; i < row.length; i++) {
				var block = row[i];
				var pxWidth = block.width*80;
				var stemLeftWidth = pxWidth/2 - 2, stemRightWidth = pxWidth/2;
				var stem = '<div class="inline-block stemSide" style="width: ' + stemLeftWidth + 'px; border-right: 2px black solid"></div><div class="inline-block stemSide" style="width: ' + stemRightWidth + 'px"></div>';
				if (block.stemOnly) {
					rowFrags.push(stem);
				} else {
					var stemContainer = '';
					if (block.hasStem) {
						stemContainer = '<div class="stemContainer">' + stem + '</div>';
					}
					console.log(row);
					rowFrags.push('<div class="inline-block" style="width: ' + pxWidth + 'px">' + stemContainer + '<div class="inputContainer"><input class="catInput" type="text" value="' + block.node.cat + '"></input></div><div class="inputContainer"><input class="idInput" type="text" value="' + block.node.id + '"></input></div></div>');
				}
			}
			frags.push('<div>');
			frags.push(rowFrags.join(''));
			frags.push('</div>');
		}
		return frags.join('');
	};
}
UTree.fromTerminals = function(terminalList) {
	//Check for duplicate words
	var occurrences = {};
	var dedupedTerminals = [];
	for(var i=0; i<terminalList.length; i++){
		var t = terminalList[i];
		//If this is the first occurrence of t, don't append an index
		if(!occurrences.hasOwnProperty(t)){
			dedupedTerminals.push(t);
			occurrences[t] = 1;
		}
		// If we've seen t before, then add an index to it such that the 2nd occurrence of t
		// becomes t_1.
		else{
			dedupedTerminals.push(t+'_'+occurrences[t]);
			occurrences[t] = occurrences[t] + 1;
		}
	}
	
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


//This function takes a JS tree and creates an html representation of it.
function jsTreeToHtml(sTree){
	var rows = [];
	
	function processNode(node, leftOffset){
		var hasChildren = node.children && node.children.length;
		var width = 0, height = 0;	//height counts how many levels up from the terminals this node is
		var i, r;
		if(hasChildren){
			for(i=0; i<node.children.length; i++){
				var childResult = processNode(node.children[i], leftOffset+width);
				width += childResult.width;
				height = Math.max(childResult.height, height);
			}
			//Add one to the height to take the current row into account.
			height += 1;
		}
		width = Math.max(width, 80); // should be an even number of pixels
		while (height >= rows.length) rows.push({contentRow: [], lineRow: [], width: 0});
		for (i = 0; i < height; i++) {
			r = rows[i];
			if (r.width < leftOffset) {
				var space = '<div class="inline-block" style="height: 15px; width: ' + (leftOffset-r.width) + 'px"></div>';
				r.contentRow.push(space);
				r.lineRow.push(space);
				r.width = leftOffset;
			}
		}
		r = rows[height];
		r.contentRow.push('<div class="inline-block" style="width: ' + width + 'px"><div class="inputContainer"><input class="catInput" type="text" value="' + node.cat + '"></input></div><div class="inputContainer"><input class="idInput" type="text" value="' + node.id + '"></input></div></div>');
		r.lineRow.push('<div class="inline-block" style="width: ' + width/2 + 'px; height: 12px; border-right: 2px black solid"></div><div class="inline-block" style="width: ' + width/2 + 'px"></div>');
		r.width += width;
		return {width:width, height:height};
	}
	
	processNode(sTree,0);
	
	var fragments = [];
	rows = rows.reverse();	//Reverse the order of the rows so that terminals are on the bottom
	
	// Reduce the two-dimensional array to a one dimensional array.
	for (i = 0; i < rows.length; i++) {
		//Add the line row unless we're at the root node
		if(i>0){
			fragments.push('<div>');
			fragments.push(rows[i].lineRow.join(''));
			fragments.push('</div>');
		}
		//Add the content row
		fragments.push('<div>');
		fragments.push(rows[i].contentRow.join(''));
		fragments.push('</div>');
	}
	return fragments.join('');
}




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
	
	//Open the tree making GUI 
	document.getElementById('startTreeUIButton').addEventListener('click', function(){
		document.getElementById('treeUI').style.display = 'block';
	});
	
	//Set up the table...
	document.getElementById('goButton').addEventListener('click', function(){
		// Get the string of terminals
		var terminalString = spotForm.sTreeTerminals.value;
		var terminalList = terminalString.trim().split(/\s+/);
		
		/*//Check for duplicate words
		var occurrences = {};
		var dedupedTerminals = [];
		for(var i=0; i<terminalList.length; i++){
			var t = terminalList[i];
			//If this is the first occurrence of t, don't append an index
			if(!occurrences.hasOwnProperty(t)){
				dedupedTerminals.push(t);
				occurrences[t] = 1;
			}
			// If we've seen t before, then add an index to it such that the 2nd occurrence of t
			// becomes t_1.
			else{
				dedupedTerminals.push(t+'_'+occurrences[t]);
				occurrences[t] = occurrences[t] + 1;
			}
		}
		
		//Make the js tree (a dummy tree only containing the root CP)
		treeUIsTree = {
			"id":"CP1",
			"cat":"cp",
			"children":[]
		};
		//Add the provided terminals
		for(var i=0; i<dedupedTerminals.length; i++){
			treeUIsTree.children.push({
				"id":dedupedTerminals[i],
				"cat":"x0"
			});
		}
		
		console.log(treeUIsTree);*/
		
		treeUIsTree = UTree.fromTerminals(terminalList);
		
		//Make a table based on the dummy tree
		document.getElementById('treeTableContainer').innerHTML = treeUIsTree.toHtml(); // jsTreeToHtml(treeUIsTree);
	});
	
	document.getElementById('treeTableContainer').innerHTML = (new UTree({
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
	})).toHtml();
	
	function updateJStreeFromHtml(){
		
	}
	
	//Look at the html tree and turn it into a JSON tree. Put the JSON in the following textarea.
	document.getElementById('htmlToJsonTreeButton').addEventListener('click',function(){
		
	});
});
