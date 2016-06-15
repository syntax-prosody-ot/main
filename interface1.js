window.addEventListener('load', function(){

	var spotForm = document.getElementById('spotForm');

    spotForm.onsubmit=function(e){
    	if (e.preventDefault) e.preventDefault();
    	
		
    	//Build a list of checked constraints.
		var constraintSet = [];
		for(var i=0; i<spotForm.constraints.length; i++){
			var constraintBox = spotForm.constraints[i];
			if(constraintBox.checked)
				constraintSet.push(constraintBox.value);
		}
		
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
});
