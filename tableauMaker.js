
//Produces an array of arrays representing a tableau

function makeTableau(candidateSet, constraintSet){
	var tableau = [];
	//Make a header for the tableau, containing all the constraint names.
	//First element is empty, to correspond to the column of candidates.
	var header = [candidateSet[0] ? candidateSet[0][0] : ''];
	for(var i=0; i<constraintSet.length; i++){
		header.push(constraintSet[i]);
	}
	tableau.push(header);
	
	//Assess violations for each candidate.
	for(var i = 0; i < candidateSet.length; i++){
		var candidate = candidateSet[i];
		var violations = [parenthesizeTree(globalNameOrDirect(candidate[1]))];
		for(var j = 0; j < constraintSet.length; j++){
			var constraintAndCat = constraintSet[j].split('-');
			// var numViolations = runConstraint(constraintAndCat[0], candidate[0], candidate[1], constraintAndCat[1]); ++lastSegmentId; // show log of each constraint run
			var oldDebugOn = logreport.debug.on; logreport.debug.on = false; var numViolations = globalNameOrDirect(constraintAndCat[0])(globalNameOrDirect(candidate[0]), globalNameOrDirect(candidate[1]), constraintAndCat[1]); logreport.debug.on = oldDebugOn; // don't show the log of each constraint run
			violations.push(numViolations);
		}
		tableau.push(violations);
	}
	return tableau;
}

function tableauToCsv(tableau, separator) {
	if (!(tableau instanceof Array) || !tableau.length)
		return '';
	var lines = ['']; // empty first row for regexes
	var synTree = tableau[0][0];
	var headerRow = ['', '', ''].concat(tableau[0].slice(1, tableau[0].length));
	lines.push(headerRow.join(separator));
	for (var i = 1; i < tableau.length; i++) {
		var row = [(i === 1) ? synTree : '', tableau[i][0], ''].concat(tableau[i].slice(1, tableau[i].length));
		// TODO: handle special characters (i.e.: cell values containing either double quotes or separator characters) 
		lines.push(row.join(separator));
	}
	return lines.join('\n');
}

function tableauToHtml(tableau) {
	if (!(tableau instanceof Array))
		return '';
	var htmlChunks = ['<table class="tableau"><thead><tr>'];
	var headers = tableau[0] || [];
	for (var j = 0; j < headers.length; j++) {
		htmlChunks.push('<th>');
		htmlChunks.push(headers[j]);
		htmlChunks.push('</th>');
	}
	htmlChunks.push('</tr></thead><tbody>');
	for (var i = 1; i < tableau.length; i++) {
		htmlChunks.push('<tr>');
		for (var j = 0; j < tableau[i].length; j++) {
			htmlChunks.push(j ? '<td>' : '<td class="candidate">');
			htmlChunks.push(tableau[i][j]);
			htmlChunks.push('</td>');
		}
		htmlChunks.push('</tr>');
	}
	htmlChunks.push('</tbody></table>');
	return htmlChunks.join('');
}
