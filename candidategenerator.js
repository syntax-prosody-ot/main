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
	
	var rootlessCand = addPhiWrapped(gen(leaves, options), options);
	
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

// conceptually, returns all possible parenthesizations of leaves that don't have a set of parentheses enclosing all of the leaves
// format: returns an array of parenthesizations, where each parenthesization is an array of children, where each child is
// either a phi node (with descendant nodes attached) or a leaf
function gen(leaves, options){
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

		//Case 1: the first i leaves attach directly to parent (no phi wrapping)
	
		var leftside = leaves.slice(0,i);
		var rightsides = addPhiWrapped(gen(leaves.slice(i, leaves.length), options), options);
		
		// for case 1, we don't need to check the left side for nonrecursivity, because it's all leaves
		
		//Combine the all-leaf leftside with all the possible rightsides that have a phi at their left edge (or are empty)
		for(var j = 0; j<rightsides.length; j++){
			if(!rightsides[j].length || rightsides[j][0].cat === 'phi')
			{
				var cand = leftside.concat(rightsides[j]);
				candidates.push(cand);
			}
		}
	
		
	
		//Case 2: the first i words are wrapped in a phi
		if(i<leaves.length){
			var phiLeftsides = gen(leaves.slice(0,i), options);
			for(var k = 0; k<phiLeftsides.length; k++)
			{
				var phiNode = phiify(phiLeftsides[k], options);
				if (!phiNode)
					continue;
				var leftside = [phiNode];
				
				for(var j = 0; j<rightsides.length; j++)
				{
					cand = leftside.concat(rightsides[j]);
					candidates.push(cand);
				}
			} 
		}
	
	}

	return candidates;
}

function topLevelRecursive(candidate) {
	for (var i = 0; i < candidate.length; i++) {
		var topNode = candidate[i];
		var topChildren = topNode.children || [];
		for (var j = 0; j < topChildren.length; j++)
			if (topNode.cat === topChildren[j].cat)
				return true;
	}
	return false;
}

function phiify(candidate, options){
	if (options && options.obeysNonrecursivity)
		for (var i = 0; i < candidate.length; i++)
			if (candidate[i].cat === 'phi')
				return null;
	return {id: 'phi'+(phiNum++), cat: 'phi', children: candidate};
}

//Takes a list of candidates and doubles it to root each of them in a phi
function addPhiWrapped(candidates, options){
	var origLen = candidates.length;
	for(var i=0; i<origLen; i++){
		if(candidates[i].length) {
			var phiNode = phiify(candidates[i], options);
			if (phiNode)
				candidates.push([phiNode]);
		}
	}
	return candidates;
}

})();
