/* Binarity that cares about the number of branches */

//sensitive to the category of the parent only (2 branches of any type is acceptable)
function binMinBranches(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length===1){
			//logreport("VIOLATION: "+ptree.id+" has only one child");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){

			vcount += binMinBranches(s, ptree.children[i], cat);
		}
	}

	return vcount;
}

//This function stops counting the violations once it finds the first one
function binMinBranchesInit(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length===1){
			//logreport("VIOLATION: "+ptree.id+" has only one child");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			//these are some debugging print codes
			/*console.log("ptree.children.length: "+ ptree.children.length);
			console.log("i: "+ i);
			console.log(ptree.cat);
			console.log('vcount: '+vcount);
			console.log('word: '+ptree.id);
			*/
			if(i === 1){
				break;
			}
			vcount += binMinBranchesInit(s, ptree.children[i], cat);
		}

	}

	return vcount;
}
//sensitive to the category of the parent only (2 branches of any type is acceptable)
//categorical evaluation: 1 violation for every super-binary branching node
function binMaxBranches(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		if(ptree.cat === cat && ptree.children.length>2){
			//logreport("VIOLATION: "+ptree.id+" has "+ptree.children.length+" children!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBranches(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//A combined binarity constraint (branch-counting)
function binBranches(stree, ptree, cat){
	var minCount = binMinBranches(stree, ptree, cat);
	var maxCount = binMaxBranches(stree, ptree, cat);
	return minCount+maxCount;
}

/* Category-sensitive branch-counting constraint
* (first proposed by Kalivoda 2019 in "New Analysis of Irish Syntax-Prosody", ms.)
* Assign a violation for every node of category cat that immediately dominates
* more than 2 children of category cat-1
*/
function binMaxBrCatSensitive(s, ptree, cat){
	var vcount = 0;
	var childcat = pCat.nextLower(cat);
	if(ptree.children && ptree.children.length){
		var categorySensitiveBranchCount = 0;
		if(ptree.cat === cat && ptree.children.length>2){
			//logreport("VIOLATION: "+ptree.id+" has "+ptree.children.length+" children!");
			for(var j=0; j < ptree.children.length; j++){
				if(ptree.children[j].cat===childcat){
					categorySensitiveBranchCount++;
				}
			}
			if(categorySensitiveBranchCount>2){
				vcount++;
			}
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBrCatSensitive(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//sensitive to the category of the parent only (2 branches of any type is acceptable)
//gradient evaluation: assigns 1 violation for every child past the first 2 ("third-born" or later)
function binMaxBranchesGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		var numChildren = ptree.children.length;
		if(ptree.cat === cat && numChildren>2){
			var excessChildren = numChildren - 2;
			//logreport(excessChildren+ " VIOLATION(s): "+ptree.id+" has "+numChildren+" children!");
			vcount += excessChildren;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMaxBranchesGradient(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

function binBrGradient(s, ptree, cat){
	return binMaxBranchesGradient(s, ptree, cat)+binMinBranches(s, ptree, cat);
}

/*TRUCKENBRODT-STYLE BINARITY*/

/* Categorical BinMax (Leaves)
*	Assign one violation for every node of the prosodic category c such that this
* node dominates more than two nodes of the prosodic category immidately below c
* on the prosodic hierarchy.
*
* Parent-category-neutral version of:
* Sandalo & Truckenbrodt 2002: "Max-Bin: P-phrases consist of maximally two prosodic words"
* Assigns a violation for every node in ptree that dominates more than two prosodic words.
*/
function binMaxLeaves(s, ptree, c){
	var vcount = 0;
	//the category we are looking for:
	var target = pCat.nextLower(c);
	//pCat.nextLower defined in prosdic hierarchy.js
	//console.log("the target of binMaxLeaves is " + target);
	if(ptree.children && ptree.children.length){
		var targetDesc = getDescendentsOfCat(ptree, target);
		//console.log("there are " + targetDesc.length + " " + target + "s");
		if(ptree.cat === c && targetDesc.length > 2){
			vcount ++;
		}
		for(var i = 0; i < ptree.children.length; i++){
			vcount += binMaxLeaves(s, ptree.children[i], c);
		}
	}
	return vcount;
}

/* Gradiant BinMax (Leaves)
* I don't know how to define this constraint in prose, but it's binMaxLeaves as
* a gradient constraint instead of a categorical constraint.
*/
function binMaxLeavesGradient(s, ptree, c){
	var vcount = 0;
	//the category we are looking for:
	var target = pCat.nextLower(c);
	//pCat.nextLower defined in prosodicHierarchy.js
	if(ptree.children && ptree.children.length){
		var targetDesc = getDescendentsOfCat(ptree, target);
		if(ptree.cat === c && targetDesc.length > 2){
			vcount += targetDesc.length - 2; //this makes the constraint gradient
		}
		for(var i = 0; i < ptree.children.length; i++){
			vcount += binMaxLeavesGradient(s, ptree.children[i], c);
		}
	}
	return vcount;
}

/* BinMin (Leaves)
*	Assign one violation for every node of the prosodic category c such that this
* node dominates less than two nodes of the prosodic category immidately below c
* on the prosodic hierarchy.
*/

function binMinLeaves(s, ptree, c){
	var vcount = 0;
	//the category we are looking for:
	var target = pCat.nextLower(c);
	//pCat.nextLower defined in prosdic hierarchy.js
	if(ptree.children && ptree.children.length){
		var targetDesc = getDescendentsOfCat(ptree, target);
		if(ptree.cat === c && targetDesc.length < 2){
			vcount ++;
		}
		for(var i = 0; i < ptree.children.length; i++){
			vcount += binMinLeaves(s, ptree.children[i], c);
		}
	}
	return vcount;
}

//Combines the violations of maximal and minimal binarity (leaf-counting)
function binLeaves(s, ptree, c){
	return binMaxLeaves(s, ptree, c) + binMinLeaves(s, ptree, c);
}

function binLeavesGradient(s, ptree, c){
	return binMaxLeavesGradient(s, ptree, c) + binMinLeaves(s, ptree, c);
}

//Helper function: given a node x, returns all the descendents of x that have category cat.
//Since this function is designed for use on prosodic trees, it does not take silence into account.
function getDescendentsOfCat(x, cat){
	var descendents = [];
	//logreport("x.cat is "+x.cat+ ", cat is " +cat);
	if(x.children && x.children.length)
	//x is non-terminal
	{
		for(var y=0; y < x.children.length; y++){
			if(x.children[y].cat === cat){
				descendents.push(x.children[y]);
			}
			var yDescendents = getDescendentsOfCat(x.children[y], cat);
			for(var i=0; i < yDescendents.length; i++){
				descendents.push(yDescendents[i]);
			}
		}
	}
	/* this else if statement was double counting terminal nodes of category cat.
	 * removing it causes double counting to stop.
	else if(x.cat === cat)	// x is a terminal of the right category
	{
		descendents.push(x);
	}*/
	return descendents;
}

/*<legacyBinarityConstraints> (for backwards compatability with old test files)*/

//Parent-category-neutral version of:
//Sandalo & Truckenbrodt 2002: "Max-Bin: P-phrases consist of maximally two prosodic words"
//Assigns a violation for every node in ptree that dominates more than two prosodic words.
function binMax2Words(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length>2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMax2Words(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

//Gradient version of Truckenbrodt's Maximum Binarity
function binMax2WordsGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length>2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount += (wDesc.length - 2);
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMax2WordsGradient(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

function binMin2Words(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length<2){
			//logreport("VIOLATION: "+ptree.id+" only dominates "+wDesc.length+" words!");
			vcount++;
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMin2Words(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

function binMin2WordsGradient(s, ptree, cat){
	var vcount = 0;
	if(ptree.children && ptree.children.length){
		wDesc = getDescendentsOfCat(ptree, 'w');
		if(ptree.cat === cat && wDesc.length<2){
			//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
			vcount += (2-wDesc.length);
		}
		for(var i = 0; i<ptree.children.length; i++){
			vcount += binMin2WordsGradient(s, ptree.children[i], cat);
		}
	}
	return vcount;
}

function binMinLeaves_requireMaximal(s, ptree, c){
	markMinMax(ptree);
	var vcount = 0;
	//the category we are looking for:
	var target = pCat.nextLower(c);
	//pCat.nextLower defined in prosdic hierarchy.js
	if(ptree.children && ptree.children.length){
		var targetDesc = getDescendentsOfCat(ptree, target);
		if(ptree.cat === c && targetDesc.length < 2 && ptree.isMax){
			vcount ++;
		}
		for(var i = 0; i < ptree.children.length; i++){
			vcount += binMinLeaves_requireMaximal(s, ptree.children[i], c);
		}
	}
	return vcount;
}

/*</legacyBinarityConstraints>*/

/* Binarity constraints that care about the number of leaves
Note: relies on getLeaves.
In the future we might want to have structure below the level of the (terminal) word, e.g., feet
and in that case would need a type-sensitive implementation of getLeaves
*/

/*
	Head binarity for Japanese compounds
*/
function binMaxHead(s, ptree, cat) {
	markHeadsJapanese(ptree);
	var vcount = 0;

	// console.log(ptree)

	return vcount;
}
