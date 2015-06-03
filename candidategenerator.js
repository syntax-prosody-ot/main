function GEN(words){
	return addPhiWrapped(gen(words));
}

function gen(words){
	var candidates = [];
	if(!(words instanceof Array))
		throw new Error(words+" is not a list of words.");	
	
	//Base case: 0 words
	if(words.length === 0){
		candidates.push('');
		return candidates;
	}
	
	
	
	//Recursive case: at least 1 word. Consider all candidates where the first i words are grouped together
	for(var i = 1; i <= words.length; i++){
	
		//Case 1: the first i words attach directly to iota (no phi wrapping)
		
		var leftside = words.slice(0,i).join(' ');
		var rightsides = addPhiWrapped(gen(words.slice(i, words.length)));
		//Combine the non-phi-wrapped leftside with all the possible rightsides that have a phi at their left edge (or are empty)
		for(var j = 0; j<rightsides.length; j++){
			if(!rightsides[j] || rightsides[j][0] === '(')
			{
				var cand = leftside+rightsides[j];
				candidates.push(cand);
			}
		}
		
		
		//Case 2: the first i words are wrapped in a phi
		if(i<words.length){
			var phiLeftsides = gen(words.slice(0,i));
			for(var k = 0; k<phiLeftsides.length; k++)
			{
				for(var j = 0; j<rightsides.length; j++)
				{
					cand = '('+phiLeftsides[k]+')'+rightsides[j];
					candidates.push(cand);
				}
			} 
		}
		
	}
	
	return candidates;
}

//Takes a list of candidates and doubles it to root each of them in a phi
function addPhiWrapped(candidates){
	var origLen = candidates.length;
	for(var i=0; i<origLen; i++){
		if(candidates[i])
			candidates.push('('+candidates[i]+')');
	}
	return candidates;
}
