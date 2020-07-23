/* Assign a violation for every node in sTree of category sCat
whose d edge is not aligned with the d edge of a node in pTree
of the prosodic category corresponding to s

For every sCat node s in sTree, find a node p in pTree of the proper category
such that the first (for align-left) leaf dominated by s has the same id as
the first leaf dominated by p.
*/

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
*	nonMinProsody: If true, the prosodic match must be non-minimal. Passed to hasMatch.
*	customPairings: A mapping of custom pairings. Passed to catsMatch.
*	*/
function alignSP(sTree, pTree, sCat, d, options){
	options = options || {};
	console.log("align options");
	console.log(options);
	var getEdge = (d==="left") ? getLeftEdge : getRightEdge;
	var vCount = 0;
	
	walkTree(sTree, function(sNode){
		markMinMax(sNode);
		if((sNode.cat !== sCat)
			|| (options.requireLexical && sNode.func)
			|| (options.requireOvertHead && sNode.silentHead)
			|| (options.maxSyntax && !sNode.isMax)
			|| (options.minSyntax && !sNode.isMin)
			|| (options.nonMaxSyntax && sNode.isMax)
			|| (options.nonMinSyntax && sNode.isMin))	 // only go further if sNode has the category we're interested in
			return;
		var sEdge = getEdge(sNode);
		if(!sEdge)
			sEdge = sNode;	// If sNode is a leaf (which it probably shouldn't be but depending on the tree might be),
								// then look for a p-node that matches sNode itself. TODO is this a good idea?
		var noMatch = true;
		markMinMax(pTree);
		walkTree(pTree, function(pNode){
			if(!catsMatch(sCat, pNode.cat)
				|| (options.maxProsody && !pNode.isMax)
				|| (options.minProsody && !pNode.isMin)
				|| (options.nonMaxProsody && pNode.isMax)
				|| (options.nonMinProsody && pNode.isMin))
				return;
			var pEdge = getEdge(pNode);
			if(!pEdge)
				pEdge = pNode;	//I'm assuming the leaves are words...
			if(sEdge.id === pEdge.id){
				noMatch = false;
				return DONT_WALK_SUBTREES;
			}
		});
		if(noMatch){
				vCount++;
		}

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

function alignLeft(sTree, pTree, sCat, options){
	options = options || {};
	return alignSP(sTree, pTree, sCat, 'left', options);
}

function alignRight(sTree, pTree, sCat, options){
	options = options || {};
	return alignSP(sTree, pTree, sCat, 'right', options);
}


function alignLeftPS(sTree, pTree, cat, options){
	options = options || {};
	return alignPS(sTree, pTree, cat, 'left', options);
}

function alignRightPS(sTree, pTree, cat, options){
	options = options || {};
	return alignPS(sTree, pTree, cat, 'right', options);
}

// custom align functions
function alignLeftCustom(sTree, pTree, cat, options){
	return alignSP(sTree, pTree, cat, 'left', options);
}
function alignRightCustom(sTree, pTree, cat, options){
	return alignSP(sTree, pTree, cat, 'right', options);
}
function alignLeftPSCustom(sTree, pTree, cat, options){
	return alignPS(sTree, pTree, cat, 'left', options);
}
function alignRightPSCustom(sTree, pTree, cat, options){
	return alignPS(sTree, pTree, cat, 'right', options);
}
function alignFocus(sTree, pTree, cat, d){
	var getEdge = (d==="left") ? getLeftEdge : getRightEdge;
	var vCount = 0;
	walkTree(sTree, function(sNode){
		if(!sNode.foc)	 // only go further if sNode is a focus node
			return;
		var sEdge = getEdge(sNode);
		if(!sEdge)
			sEdge = sNode;	// If sNode is a leaf (which it probably shouldn't be but depending on the tree might be),
								// then look for a p-node that matches sNode itself. TODO is this a good idea?
		var noMatch = true;
		walkTree(pTree, function(pNode){
			//!catsMatch(sCat, pNode.cat)
			if(pNode.cat !== cat)
				return;
			var pEdge = getEdge(pNode);
			if(!pEdge) 
				pEdge = pNode;	//I'm assuming the leaves are words...
			if(sEdge.id === pEdge.id){
				noMatch = false;
				return false;
			}
		});
		if(noMatch)
			vCount++;
	});
	return vCount;

}
function alignFocLeft(sTree, pTree, cat){
	return alignFocus(sTree, pTree, cat, 'left');
}
function alignFocRight(sTree, pTree, cat){
	return alignFocus(sTree, pTree, cat, 'right');
}
function wrap(sTree, pTree, cat){
	options = options || {};
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
function wrapPS(sTree, pTree, cat){
	return wrap(pTree, sTree, cat);
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
