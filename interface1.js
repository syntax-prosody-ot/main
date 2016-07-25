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
		
	});
	
	function jsTreeToHtml(sTree){
		var rows = [];
		
		function processNode(node, leftOffset){
			var hasChildren = node.children && node.children.length;
			var width = 0, height = 0;	//height counts how many levels up from the terminals this node is
			if(hasChildren){
				for(var i=0; i<node.children.length; i++){
					var childResult = processNode(node.children[i], leftOffset+width);
					width += childResult.width;
					height = Math.max(childResult.height, height);
				}
				//Add one to the height to take the current row into account.
				height += 1;
			}
			//TODO add html for this node.
			return {width:width, height:height};
		}
		
		processNode(sTree,0);
		//TODO join html fragments and return the joined string
		//return 
	}
});
