
//Produces an array of arrays representing a tableau

function makeTableau(candidateSet, constraintSet, options){
	//all options passed to makeTableau are passed into parenthesizeTree, so make
	//sure your options in dependent functions have unique names from other funcs
	options = options || {};
	var tableau = [];
	//Make a header for the tableau, containing all the constraint names.
	//First element is empty, to correspond to the column of candidates.
	var sTree = candidateSet[0] ? candidateSet[0][0] : '';
	if (sTree instanceof Object) {
		var sOptions = {}; //must not include tone options
		for (var op in options){
			if (op != "showTones" && op != "addTones"){
				sOptions[op] = options[op]; //don't copy in tone options
			}
		}
		sTree = parenthesizeTree(sTree, sOptions); //JSON.stringify(sTreeName);
	}
	var header = [sTree];
	for(var i=0; i<constraintSet.length; i++){
		header.push(constraintSet[i]);
	}
	tableau.push(header);

	var getCandidate = options.inputTypeString ? function(candidate) {return candidate;} : globalNameOrDirect;

	//Assess violations for each candidate.
	for(var i = 0; i < candidateSet.length; i++){
		var candidate = candidateSet[i];
		var ptreeStr = options.inputTypeString ? candidate[1] : parenthesizeTree(globalNameOrDirect(candidate[1]), options);
		var tableauRow = [ptreeStr];
		for(var j = 0; j < constraintSet.length; j++){

			var [constraint, cat] = constraintSet[j].split('-');
			//var numViolations = runConstraint(constraintAndCat[0], candidate[0], candidate[1], constraintAndCat[1]); ++lastSegmentId; // show log of each constraint run
			var oldDebugOn = logreport.debug.on;
			logreport.debug.on = false;
			var numViolations = globalNameOrDirect(constraint)(getCandidate(candidate[0]), getCandidate(candidate[1]), cat); logreport.debug.on = oldDebugOn; // don't show the log of each constraint run
			tableauRow.push(numViolations);
		}
		tableau.push(tableauRow);
	}
	return tableau;
}

function tableauToCsv(tableau, separator, options) {
    options = options || {};
	if (!(tableau instanceof Array) || !tableau.length)
		return '';
	var lines = [];
	var synTree = tableau[0][0];
    if(!options.noHeader){
        lines.push('');  // empty first row for regexes
        var headerRow = ['', '', ''].concat(tableau[0].slice(1, tableau[0].length));
        lines.push(headerRow.join(separator));
    }
	var lineBreakRegex = /\n/g;
	for (var i = 1; i < tableau.length; i++) {
		var row = [(i === 1) ? synTree : '', tableau[i][0], ''].concat(tableau[i].slice(1, tableau[i].length));
		for (var j = 0; j < row.length; j++) {
			if (typeof row[j] === 'string') {
				row[j] = '"' + row[j] + '"';
			}
		}
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
	htmlChunks.push('<th></th>');
	for (var j = 0; j < headers.length; j++) {
		htmlChunks.push('<th>');
		htmlChunks.push(headers[j]);
		htmlChunks.push('</th>');
	}
	htmlChunks.push('</tr></thead><tbody>');
	for (var i = 1; i < tableau.length; i++) {
		htmlChunks.push('<tr>');
		htmlChunks.push('<td>' + i + '.</td>');
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
