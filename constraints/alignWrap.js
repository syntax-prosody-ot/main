/* Assign a violation for every node in sTree of category sCat
whose d edge is not aligned with the d edge of a node in pTree
of the prosodic category corresponding to s

For every sCat node s in sTree, find a node p in pTree of the proper category
such that the first (for align-left) leaf dominated by s has the same id as
the first leaf dominated by p.

TODO Do we ever want to try to align x0 levels?? Or would we ever have an xp as a leaf?
TODO test this function.
*/
function alignLeft(sTree, pTree, sCat){
	return alignSP(sTree, pTree, sCat, 'left');
}

function alignRight(sTree, pTree, sCat){
	return alignSP(sTree, pTree, sCat, 'right');
}


/*
* Options (all boolean):
* requireLexical: To ignore non-lexical XPs give them an attribute func: true.
*	requireOvertHead: To ignore silently-headed XPs, give them an attribute silentHead: true
*	maxSyntax: If true, ignore non-maximal syntactic nodes (nodes of category c that are
*				dominated by another node of category c)
*	minSyntax: If true, ignore non-minimal syntactic nodes (nodes of category c that dominate
*				another node of category c)
*	nonMaxSyntax: If true, only look at non-maximal syntactic nodes
*	nonMinSyntax: If true, only look at non-minimal syntactic nodes
*	maxProsody: If true, the prosodic match needs to be maximal. Passed to hasMatch.
*	minProsody: If true, the prosodic match needs to be minimal. Passed to hasMatch.
*	nonMaxProsody: If true, the prosodic match must be non-maximal. Passed to hasMatch.
*	nonMinProsody: If true, the prosodic match must be non-minimal. Passed to hasMatch.*/
function alignSP(sTree, pTree, sCat, d, options){
	options = options || {};

	var getEdge = (d==="left") ? getLeftEdge : getRightEdge;
	var vCount = 0;
	walkTree(sTree, function(sNode){
		markMinMax(sNode);
		if(sNode.cat !== sCat
		&& !(options.requireLexical && sNode.func)
		&& !(options.requireOvertHead && sNode.silentHead)
		&& !(options.maxSyntax && !sNode.isMax)
		&& !(options.minSyntax && !isMinimal(sNode))
		&& !(options.nonMaxSyntax && sNode.isMax)
		&& !(options.nonMinSyntax && isMinimal(sNode)))	 // only go further if sNode has the category we're interested in
			return;
		var sEdge = getEdge(sNode);
		if(!sEdge)
			sEdge = sNode;	// If sNode is a leaf (which it probably shouldn't be but depending on the tree might be),
								// then look for a p-node that matches sNode itself. TODO is this a good idea?
		var noMatch = true;
		walkTree(pTree, function(pNode){
			markMinMax(pNode);
			if(!catsMatch(sCat, pNode.cat)
			&& !(options.maxProsody && !pNode.isMax)
			&& !(options.minProsody && !isMinimal(pNode))
			&& !(options.nonMaxProsody && pNode.isMax)
			&& !(options.nonMinProsody && isMinimal(pNode)))
				return;
			var pEdge = getEdge(pNode);
			if(!pEdge)
				pEdge = pNode;	//I'm assuming the leaves are words...
			if(sEdge.id === pEdge.id){
				noMatch = false;
				return false;
			}
			if(noMatch){
					vCount++;
			}
		});
	});
	return vCount;
}

function getLeftEdge(node){
	return getLeaves(node)[0];
}

function getRightEdge(node){
	var leaves = getLeaves(node);
	return leaves[leaves.length-1];
}

function alignPS(sTree, pTree, cat, d, options){
	options = options || {};
	var flippedOptions = {};
	flippedOptions.maxSyntax = options.maxProsody || false;
	flippedOptions.nonMaxSyntax = options.nonMaxProsody || false;
	flippedOptions.minSyntax = options.minProsody || false;
	flippedOptions.nonMinSyntax = options.nonMinProsody || false;
	flippedOptions.maxProsody = options.maxSyntax || false;
	flippedOptions.nonMaxProsody = options.nonMaxSyntax || false;
	flippedOptions.minProsody = options.minSyntax || false;
	flippedOptions.nonMinProsody = options.nonMinSyntax || false;
	flippedOptions.requireLexical = options.requireLexical || false;
	flippedOptions.requireOvertHead = options.requireOvertHead || false;
	return alignSP(pTree, sTree, cat, d, flippedOptions);
}

function alignLeftPS(sTree, pTree, cat, options){
	options = options || {};
	return alignPS(sTree, pTree, cat, 'left', options);
}

function alignRightPS(sTree, pTree, cat, options){
	options = options || {};
	return alignPS(sTree, pTree, cat, 'right', options);
}
function alignCustom(sTree, pTree, cat, options){
	options = options || {};
	return alignSP()
}
function wrap(sTree, pTree, cat){
	var vCount = 0;
	walkTree(sTree, function(sNode){
		if(sNode.cat !== cat)
			return;
		var noMatch = true;
		sLeaves = getLeaves(sNode);
		walkTree(pTree, function(pNode){
			if(!catsMatch(cat, pNode.cat))
				return;
			if(containsIds(getLeaves(pNode), sLeaves)){	// if the current pNode wraps our sNode
				noMatch = false;
				return false;	 // stop looking for a match
			}
		});
		if(noMatch)
			vCount++;
	});
	return vCount;
}

// Returns true if a contains b
// More precisely, if a contains a set of nodes whose ids are identical to the ids of the nodes in b.
function containsIds(a, b){
	for(var i=0; i<=(a.length-b.length); i++){
		var j=0;
		while((j<b.length)&&(a[i+j].id === b[j].id))
			j++;
		if(j===b.length)
			return true;
	}
	return false;
}
