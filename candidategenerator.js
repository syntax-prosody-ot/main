(function() {
var phiNum = 0;
var wNum = 0;

//takes a list of words and returns the candidate set of trees (JS objects)
window.GEN = function(sTree, words, options){
	options = options || {};
	
	if(typeof words === "string")
		words = words.split(' ');
	
	var leaves = [];
	phiNum = wNum = 0;
	for(var i=0; i<words.length; i++){
		leaves.push(omegafy(words[i]));
	}
	
	var rootlessCand = addPhiWrapped(gen(leaves));
	
	var candidates = [];
	for(var i=0; i<rootlessCand.length; i++){
		var iota = iotafy(rootlessCand[i]);
		if (options.obeysHeadedness && !ioataIsHeaded(iota))
			continue;
		candidates.push([sTree, iota]);
	}
	return candidates;
}

function ioataIsHeaded(ioata) {
	var children = ioata.children || [];
	for (var i = 0; i < children.length; i++)
		if (children[i].cat === 'phi')
			return true;
	console.log(children);
	return false;
}

function iotafy(candidate){
	return {id: 'iota', cat: 'iota', children: candidate};
}

function omegafy(word){
	return {id: word+'_'+(wNum++), cat: 'w'};
}

function gen(leaves){
	var candidates = [];	//each candidate will be an array of siblings
	if(!(leaves instanceof Array))
		throw new Error(leaves+" is not a list of leaves.");	
	
	//Base case: 0 leaves
	if(leaves.length === 0){
		candidates.push([]);
		return candidates;
	}
	
	
	
	//Recursive case: at least 1 word. Consider all candidates where the first i words are grouped together
	for(var i = 1; i <= leaves.length; i++){
	
		//Case 1: the first i leaves attach directly to iota (no phi wrapping)
		
		var leftside = leaves.slice(0,i);
		var rightsides = addPhiWrapped(gen(leaves.slice(i, leaves.length)));
		//Combine the non-phi-wrapped leftside with all the possible rightsides that have a phi at their left edge (or are empty)
		for(var j = 0; j<rightsides.length; j++){
			if(!rightsides[j].length || rightsides[j][0].cat === 'phi')
			{
				var cand = leftside.concat(rightsides[j]);
				candidates.push(cand);
			}
		}
		
		
		//Case 2: the first i words are wrapped in a phi
		if(i<leaves.length){
			var phiLeftsides = gen(leaves.slice(0,i));
			for(var k = 0; k<phiLeftsides.length; k++)
			{
				for(var j = 0; j<rightsides.length; j++)
				{
					var leftParent = phiify(phiLeftsides[k]);
					cand = [leftParent].concat(rightsides[j]);
					candidates.push(cand);
				}
			} 
		}
		
	}
	
	return candidates;
}

function phiify(candidate){
	return {id: 'phi'+(phiNum++), cat: 'phi', children: candidate}
}

//Takes a list of candidates and doubles it to root each of them in a phi
function addPhiWrapped(candidates){
	var origLen = candidates.length;
	for(var i=0; i<origLen; i++){
		if(candidates[i].length)
			candidates.push([phiify(candidates[i])]);
	}
	return candidates;
}




/*
* Versions of Gen that don't make objects, just strings with parentheses
*/
function GENparen(words){
	return addPhiWrapped(genparen(words));
}

function genparen(words){
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
		var rightsides = addPhiWrapped(genparen(words.slice(i, words.length)));
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
			var phiLeftsides = genparen(words.slice(0,i));
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
function addPhiWrappedparen(candidates){
	var origLen = candidates.length;
	for(var i=0; i<origLen; i++){
		if(candidates[i])
			candidates.push('('+candidates[i]+')');
	}
	return candidates;
}
})();
