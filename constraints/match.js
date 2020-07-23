/***********************
MATCH THEORY constraints
and their numerous helpers
************************/

function getLeaves(x)
//return a list of all the non-silent terminals dominated by a node
{
	var leaves = [];
	if(x.children && x.children.length)
	//x is non-terminal
	{
		for(var y=0; y < x.children.length; y++){
			var yLeaves = getLeaves(x.children[y]);
			for(var i=0; i < yLeaves.length; i++){
				leaves.push(yLeaves[i]);
			}
		}
	}
	else if(!x.silent)	// x is itself a non-silent terminal
	{
		leaves.push(x);
	}
	return leaves;
}

function sameIdsOrdered(a1, a2)
//helper function to compare two arrays of children
//since there isn't a built_in array comparator.
{
	if(a1.length !== a2.length)
		return false;

	var i = 0;
	while(i<a1.length){
		if(a1[i].id !== a2[i].id)
			return false;
		i++;
	}

	return true;
}

/* function to compare sets of terminals {A} and {B}. returns true iff for each
 * element in A, there is an element in B with the same value for the property
 * "id" and A and B are of the same lenght.
 * Order insensitive version of sameIdsOrdered.
 */
function sameIds(a1, a2){
	if (a1.length !== a2.length){
		return false;
	}
	for (var x = 0; x < a1.length; x ++){ // for each element in a1
		var y = 0;
		var matched = false; // keeps track of if a1[x] has a match in a2
		while (matched == false){//there is an element in a2 ...
			if (a2[y] && a1[x].id === a2[y].id){ // such that these elements have the same ids
				matched = true; // set matched to true
			}
			if (y == a2.length){ //matched is false for every element in a2
				return false;
			}
			y ++; //increment y
		}
	}
	// if nothing caused the function to return false ...
	return true;
}


function matchPS(sParent, pParent, pCat, options)
//Assign a violation for every prosodic node of type pCat in pParent that doesn't have a corresponding syntactic node in sTree,
//where "corresponding" is defined as: dominates all and only the same terminals, and has the corresponding syntactic category
//Assumes no null terminals.
//flipped options is necessary because otherwise the prosodic trees will be checked for maximality/minimality when maxSyntax, eg,
//is set to true. The same goes for the syntactic trees
{
	options = options || {};
	var sTree = sParent;
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
	return matchSP(pParent, sTree, pCat, flippedOptions);
}

/* matchSP = Match(Syntax, Prosody):
* Assign a violation for every syntactic node of type sCat in sParent that
* doesn't have a  corresponding prosodic node in pTree, where "corresponding"
* is defined as: dominates all and only the same terminals, and has the
* corresponding prosodic category.
* By default, assumes no null syntactic terminals.
*
* If sCat is 'any', syntactic category labels will be ignored.
*
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
*	anyPCat: if true, match with any prosodic category. Passed to hasMatch*/
function matchSP(inputTree, pTree, sCat, options)
{
	options = options || {};
	var sParent = inputTree;
	markMinMax(sParent);
	if(sParent.cat === sCat)
		logreport.debug("\tSeeking match for "+sParent.id + " in tree rooted in "+pTree.id);
	var vcount = 0;

	/*sParent needs to be matched only if it fulfills the following conditions:
	*  - it has the right category
	*  - either it is lexical (sParent.func is false) OR requireLexical is false
	*  - either it has an overt head (sParent.silent is false) OR requireOvertHead is false
	*/
	if((sCat === 'any' || (sParent.cat === sCat ))
	&& !(options.requireLexical && sParent.func)
	&& !(options.requireOvertHead && sParent.silentHead)
	&& !(options.maxSyntax && !sParent.isMax)
	&& !(options.minSyntax && !isMinimal(sParent))
	&& !(options.nonMaxSyntax && sParent.isMax)
	&& !(options.nonMinSyntax && isMinimal(sParent)))
	{
		if(!hasMatch(sParent, pTree, options)){
			vcount++;
			logreport.debug("\tVIOLATION: "+sParent.id+" has no match!");
		}
	}

	if(sParent.children){
		for(var i = 0; i < sParent.children.length; i++)
		{
			var sChild = sParent.children[i];
			vcount += matchSP(sChild, pTree, sCat, options);
		}
	}
	//console.log("in matchSP");
	return vcount;
}

function hasMatch(sNode, pTree, options)
//For a syntactic node sNode and a prosodic tree pTree, search the entire pTree
//to see if there is a node in pTree that has the same set of terminals as sNode,
//in the same order as sLeaves.
//Returns true for terminals assuming that there are no null syntactic terminals...
//Relies on sameIds for leaf comparisons and catMatches for category comparisons.

//options {maxProsody, minProsody, nonMaxProsody, nonMinProsody}
{

	var sLeaves = getLeaves(sNode);
	markMinMax(pTree);
	if((options.anyPCat || catsMatch(sNode.cat, pTree.cat))
	&& sameIds(getLeaves(pTree), sLeaves)
	&& !(options.requireLexical && pTree.func)
	&& !(options.requireOvertHead && pTree.silentHead)
	&& !(options.maxProsody && !pTree.isMax)
	&& !(options.minProsody && !isMinimal(pTree))
	&& !(options.nonMaxProsody && pTree.isMax)
	&& !(options.nonMinProsody && isMinimal(pTree)))
	{
		logreport.debug("\tMatch found: "+pTree.id);
		return true;
	}

	// If the current prosodic node is NOT the match:
	else if(!pTree.children || pTree.children.length===0)
	// current node is terminal
	{
		return false;
	}

	else
	//the current prosodic node is non-terminal (has children)
	{
		for(var i = 0; i < pTree.children.length; i++)
		//check each child to see if the match exists in the subtree rooted in that child
		{
			var child = pTree.children[i];
			if(hasMatch(sNode, child, options))
				return true;
		}
		return false;
	}
}

/*Various flavors of Match to be called more easily by makeTableau*/

function matchSP_LexicalHead(stree, ptree, cat, options){
	options = options || {};
	options.requireLexical = true;
	return matchSP(stree, ptree, cat, options);
}

function matchSP_OvertHead(stree, ptree, cat, options){
	options = options || {};
	options.requireOvertHead = true;
	return matchSP(stree, ptree, cat, options);
}

function matchSP_OvertLexicalHead(stree, ptree, cat, options){
	options = options || {};
	options.requireLexical = true;
	options.requireLexical = true;
	return matchSP(stree, ptree, cat, options);
}


/* Match-SP(scat-max, pcat-max): Assign a violation for every node of syntactic
 * category s that is not dominated by another node of category s in the
 * syntactic tree, and is not mapped to a corresponding prosodic node of
 * category p, where p=catMap(s), such that p is not dominated by another node
 * of category p.
 * ex. Match a maximal xp with a maximal phi.
 */

function matchMaxSP(sTree, pTree, sCat, options){
	options = options || {};
	options.maxSyntax = true;
	options.maxProsody = true;
	return matchSP(sTree, pTree, sCat, options);
}

/* Match-SP(scat-max, pcat). Same as matchMaxSP, except matching prosodic node
 * need not be maximal, only the syntactic node must be maximal to incur a
 * violation if no match is found.
 * ex. Match a maximal xp with any phi.
 */

function matchMaxSyntax(sTree, pTree, sCat, options){
	options = options || {};
	options.maxSyntax = true;
	return matchSP(sTree, pTree, sCat, options);
 }

 //Match all non-minimal syntactic nodes
function matchNonMinSyntax(sTree, pTree, sCat, options){
	options = options || {};
	options.nonMinSyntax = true;
	return matchSP(sTree, pTree, sCat, options);
}

//Match for custom match SP options
function matchCustomSP(sTree, pTree, sCat, options){
	options = options || {};
	return matchSP(sTree, pTree, sCat, options);
}

//Match for custom match PS options
function matchCustomPS(sTree, pTree, sCat, options){
	options = options || {};
	return matchPS(pTree, sTree, sCat, options);
}

//Match Maximal P --> S
//Switch inputs for PS matching:
function matchMaxPS(sTree, pTree, pCat, options){
	options = options || {};
	options.maxSyntax = true;
	options.maxProsody = true;
	return matchPS(pTree, sTree, pCat, options);
}

//Match P --> S version of matchMaxSyntax. See comment there for explanation
function matchMaxProsody(sTree, pTree, pCat, options){
	options = options || {};
	options.maxSyntax = true;
	return matchMaxSyntax(pTree, sTree, pCat, options);
}

//Match Min constraints

/* Match-SP(scat-min, pcat-min): Assign a violation for every node of syntactic
 * category s that does not dominate another node of category s in the
 * syntactic tree, and is not mapped to a corresponding prosodic node of
 * category p, where p=catMap(s), such that p does not dominate another node
 * of category p.
 * ex. Match a minimal xp with a minimal phi.
 */

//match a syntactic tree with a prosodic tree
function matchMinSP(s, ptree, cat, options) {
	options = options || {};
	options.minSyntax = true;
	options.minProsody = true;
  return matchSP(s, ptree, cat, options);
}

//match prosody tree with a syntax tree
function matchMinPS(s, ptree, cat, options) {
	options = options || {};
	options.minSyntax = true;
	options.minProsody = true;
  return matchPS(s, ptree, cat, options);
}
