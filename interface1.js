
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
				var space = '<div class="inline-block" style="width: ' + (leftOffset-r.width) + 'px"></div>';
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

	//Open the tree making GUI 
	document.getElementById('startTreeUIButton').addEventListener('click', function(){
		document.getElementById('treeUI').style.display = 'block';
	});
	
	//Set up the table...?
	document.getElementById('goButton').addEventListener('click', function(){
		// Get the string of terminals
		var terminalString = spotForm.sTreeTerminals.value;
		var terminalList = terminalString.trim().split(/\s+/);
		
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
		var sTree = {
			"id":"CP1",
			"cat":"cp",
			"children":[]
		};
		//Add the provided terminals
		for(var i=0; i<dedupedTerminals.length; i++){
			sTree.children.push({
				"id":dedupedTerminals[i],
				"cat":"x0"
			});
		}
		
		console.log(sTree);
		
		//Make a table based on the dummy tree
		document.getElementById('treeTableContainer').innerHTML = jsTreeToHtml(sTree);
	});
	
	
});
