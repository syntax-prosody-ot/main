
//Produces an array of arrays representing a tableau

function makeTableau(candidateSet, constraintSet){
	var tableau = [];
	//Make a header for the tableau, containing all the constraint names.
	//First element is empty, to correspond to the column of candidates.
	var header = [[]];
	for(var i=0; i<constraintSet.length; i++){
		header.push(constraintSet[i]);
		//TODO turn function name into a string -- is this automatic?
	}
	tableau.push(header);
	
	//Assess violations for each candidate.
	for(var i = 0; i < candidateSet.length; i++){
		var candidate = candidateSet[i];
		var violations = [candidate];	//TODO how to get a better identifier for the candidate?
		for(var j = 0; j < constraintSet.length; j++){
			violations.push(constraintSet[j](candidate));		
			//TODO Adjust because candidates will most likely be PAIRS of trees: [sTree, pTree]
			//TODO Adjust to deal with the fact that not all constraints take the same parameters :(
			//Possible solution: change constraints to always take a pair of trees? (In non-interface constraints, s-tree will be disregarded.)
		}
		tableau.push(violations);
	}
	return tableau;
}
