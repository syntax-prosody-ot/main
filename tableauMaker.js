
// Produces an array of arrays representing a tableau
// Options: GEN options and options for parenthesize trees
// trimStree option uses the trimmed version of the sTree
// showHeads: marks and shows the heads of Japanese compound words
	// in the future, this might get a string value specifying a language other than Japanese
// ph: prosodic hierarchy object with elements as follows:
// 	.pCat: custom pCat list to be passed to Gen
// 	.categoryPairings: custom category pairings to be passed to constraints
function makeTableau(candidateSet, constraintSet, options){
	//all options passed to makeTableau are passed into parenthesizeTree, so make
	//sure your options in dependent functions have unique names from other funcs
	options = options || {};
	
	var tableau = [];
	//Make a header for the tableau, containing all the constraint names.
	//First element is empty, to correspond to the column of candidates.
	var sTreeObject = candidateSet[0] ? candidateSet[0][0] : '';
	var sTree; /*keeping string and object seperate so the trimmed version can be
		added later, if necessary*/
	var trimmedTree;//this will be the (un)trimmed tree in EVAL, I just want to to
		//have wide scope so I can overwrite it a lot
	if (sTreeObject instanceof Object) {
		var sOptions = {}; //must not include tone options
		for (var op in options){
			if (op != "showTones" && op != "addTones"){
				sOptions[op] = options[op]; //don't copy in tone options
			}
		}
		sTree = parenthesizeTree(sTreeObject, sOptions); //JSON.stringify(sTreeName);
	}
	//Build a header for the tableau
	var header = [sTree];
	for(var i=0; i<constraintSet.length; i++){
		/* Split the constraint up into the function name, category, and
		*  any options, in that order. They should be separated by '-'.
		*/
		var conParts = constraintSet[i].split('-');
		var optionString = '';
		//If there are options, truncate their attribute names and append them to the constraint name.
		if(conParts[2] && conParts[2].length){
			var optionObj = JSON.parse(conParts[2]);
			var optionProperties = Object.getOwnPropertyNames(optionObj);
			for(var j in optionProperties){
				if(optionObj[optionProperties[j]]==true){
					var temp = optionProperties[j];
					if(temp.indexOf('require')>=0){
						temp = temp.slice('require'.length);
					}
					optionString += '-'+temp;
				}
			}
		}
		var cat = conParts[1] ? '('+conParts[1]+')' : ''
		var constraintOptionsCat = conParts[0]+optionString+cat;
		header.push(constraintOptionsCat);
	}

	if(options.trimStree){
		header[0] = header[0].concat(' trimmed: ', parenthesizeTree(trimRedundantNodes(sTreeObject)));
	}

	tableau.push(header);

	var getCandidate = options.inputTypeString ? function(candidate) {return candidate;} : globalNameOrDirect;
	
	checkPCat = JSON.parse(JSON.stringify(candidateSet.getPCat()));
	checkCategoryPairings = JSON.parse(JSON.stringify(candidateSet.getCategoryPairings()));

	setPCat(checkPCat);
	setCategoryPairings(checkCategoryPairings);
	
	// give a warning if there are categories from categoryPairings not present in pCat
	if (!checkProsodicHierarchy(checkPCat, checkCategoryPairings)){
		displayWarning("There are categories from categoryPairings missing from pCat!");
		//set pCat and categoryPairings to their default values
		resetPCat();
		resetCategoryPairings();
	}

	//Assess violations for each candidate.
	var numCand = candidateSet.length;

	for(var i = 1; i <= numCand; i++){
		var candidate = candidateSet[numCand-i];
		if(options.showHeads){candidate[1] = markHeadsJapanese(candidate[1]);}
		var ptreeStr = options.inputTypeString ? candidate[1] : parenthesizeTree(globalNameOrDirect(candidate[1]), options);
		var tableauRow = [ptreeStr];
		// the last element is the getter function that retrieves the category pairings received from GEN in candidategenerator.js
		for(var j = 0; j < constraintSet.length; j++){

			var [constraint, cat, conOptions] = constraintSet[j].split('-');
			if(!conOptions){
				conOptions = "{}";
			}
			//var numViolations = runConstraint(constraintAndCat[0], candidate[0], candidate[1], constraintAndCat[1]); ++lastSegmentId; // show log of each constraint run
			var oldDebugOn = logreport.debug.on;
			logreport.debug.on = false;
			trimmedTree = options.trimStree ? trimRedundantNodes(getCandidate(candidate[0])) : getCandidate(candidate[0]);
			//if options.catsMatch --> add it to myConOptions

			//options for this constraint:
			var myConOptions = JSON.parse(conOptions);
			
			var numViolations = globalNameOrDirect(constraint)(trimmedTree, getCandidate(candidate[1]), cat, myConOptions); logreport.debug.on = oldDebugOn; // don't show the log of each constraint run
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
	var trimRegEx = / trimmed: /; //for testing to see if there is a trimmed tree
	if (!(tableau instanceof Array))
		return '';
	var htmlChunks = ['<table class="tableau"><thead><tr>'];
	var headers = tableau[0] || [];
	htmlChunks.push('<th></th>');
	for (var j = 0; j < headers.length; j++) {
		htmlChunks.push('<th>');
		if(trimRegEx.test(headers[j])){
			headers[j] = headers[j].replace(' trimmed: ', '<br>trimmed: ');
		}
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
// check that every prosodic category in cateogry pairings is in pCat
function checkProsodicHierarchy(pCat, categoryPairings){
	for (category in categoryPairings){
		console.log(categoryPairings[category]);
		if (!pCat.includes(categoryPairings[category])){
			return false;
		}
	}
	return true;
}
