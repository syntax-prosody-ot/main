//An array of pairs to define which syntactic categories "match" which prosodic categories.
//For theory comparison, we'll want one array for each theory.
var categoryPairings = {
	"clause": "i",
	"cp": "i",
	"xp": "phi",
	"x0": "w"
};

function resetCategoryPairings(){
	categoryPairings = {
		"clause": "i",
		"cp": "i",
		"xp": "phi",
		"x0": "w"
	};


}
function setCategoryPairings(newCategoryPairings){
	categoryPairings = newCategoryPairings;

}
//Evaluates whether two nodes have corresponding categories.
function catsMatch(aCat, bCat){
	if(aCat === undefined && bCat === undefined)
		return true;	//vacuously true if both nodes are leaves (with no category)
	// aCat is the key
	else if(categoryPairings.hasOwnProperty(aCat)){
		// check if bCat is an array
		if (Array.isArray(bCat)){
			return bCat.includes(aCat);
		}
		else{
			return categoryPairings[aCat] === bCat;
		}
	}
	// bCat is the key
	else if(categoryPairings.hasOwnProperty(bCat)){
		// check if aCat is an array
		if (Array.isArray(aCat)){
			return aCat.includes(bCat);
		}
		else{
			return categoryPairings[bCat] === aCat;
	
		}
	}
	else
	{
		//console.warn("Neither argument to catsMatch was a valid syntactic category:", aCat, bCat);	//TODO this gives a false positive warning every time Match PS runs on a tree whose leaves don't have categories.
		return false;
	}
}

//defines the syntactic category hierarchy that we are working with
var sCat = ["cp", "xp", "x0"];

//defines the prosodic hierarchy
var pCat = ["u", "i", "phi", "w", "Ft", "syll"];

PH_PHI = {
	pCat : ["u", "i", "phi", "w", "Ft", "syll"],
	categoryPairings : {
		"clause": "i",
		"cp": "i",
		"xp": "phi",
		"x0": "w"
	}

};
PH_MAJMIN = {
	pCat : ["i", "MaP", "MiP", "w"],
	categoryPairings : {
		"clause": "i",
		"cp": "i",
		"xp": ["MaP", "MiP"],
		"x0": "w"
	}

};
//defines Major Minor Phrase prosodic hierarchy
var MaPMiPpCat = ["i", "MaP", "MiP", "w"];

function setPCat(newPCat){
	pCat = newPCat;

	pCat.isHigher = function(cat1, cat2){
		return (isHigher(pCat, cat1, cat2));
	}
	pCat.isLower = function (cat1, cat2){
		return (isLower(pCat, cat1, cat2));
	}
	pCat.nextLower = function(cat) {
		return nextLower(pCat, cat);
	}
	pCat.nextHigher = function(cat){
		return nextHigher(pCat, cat);
	}
}

function resetPCat(){
	//pCat = ["u", "i", "phi", "w", "Ft", "syll"];
	setPCat(["u", "i", "phi", "w", "Ft", "syll"]);
}
//Function that compares two prosodic categories and returns whether cat1 is higher in the prosodic hierarchy than cat2
function isHigher(pCat, cat1, cat2){
	return (pCat.indexOf(cat1) < pCat.indexOf(cat2));
}
pCat.isHigher = function(cat1, cat2){
	return (isHigher(pCat, cat1, cat2));
}
sCat.isHigher = function(cat1, cat2){
	return (isHigher(sCat, cat1, cat2));
}


// Functions that compare two prosodic/syntactic categories and returns true if cat 1 is lower in the prosodic hierarchy than cat2
function isLower(pCat, cat1, cat2){
	return (pCat.indexOf(cat1) > pCat.indexOf(cat2));
}
pCat.isLower = function (cat1, cat2){
	return (isLower(pCat, cat1, cat2));
}
sCat.isLower = function (cat1, cat2){
	return (isLower(sCat, cat1, cat2));
}

// Function that returns the prosodic category that is one level lower than the given category
pCat.nextLower = function(cat) {
	return nextLower(pCat, cat);
}
sCat.nextLower = function(cat) {
	return nextLower(sCat, cat);
}

function nextLower(pCat, cat){
	var i = pCat.indexOf(cat);
	if (i < 0){
		var errMsg = cat + ' is not a prosodic category in the currently defined prosodic hierarchy, '+pCat;
		displayError(errMsg);
		throw new Error(errMsg);
	}
	else if(i===pCat.length-1){
		displayError(cat + ' is the lowest category defined in the prosodic hierarchy; returning category '+cat);
		return cat;
	}
	return pCat[i+1];
}

//function that returns the prosodic category that is one level higher than the given category
pCat.nextHigher = function(cat){
	return nextHigher(pCat, cat);
}

sCat.nextHigher = function(cat){
	return nextHigher(sCat, cat);
}

function nextHigher(pCat, cat){
	var i = pCat.indexOf(cat);
	if (i < 0){
		var errMsg = cat + ' is not a prosodic category in the currently defined prosodic hierarchy, '+pCat;
		displayError(errMsg);
		throw new Error(errMsg);
	}
	if (i === 0){
		displayError(cat + ' is the highest category defined in the prosodic hierarchy; returning category '+cat);
		return cat;
	}
	return pCat[i-1];
}

//pCat(type1).isHigherThan(type2)

function nodeHasLowerCat(node1, node2){
	if(pCat.isLower(node1.cat, node2.cat)){
		return true;
	}
	else if(node1.cat===node2.cat && isMinimal(node1) && !isMinimal(node2)){
		return true;
	}
	else return false;
}

/* A function to return the paired category as defined in categoryPairings.
 * categoryPairings only returns prosodic categories given a syntactic category.
 * reversibleCatPairings also returns a syntactic category given a prosodic
 * category.
*/
function reversibleCatPairings(cat){
  if (categoryPairings[cat]){
    return categoryPairings[cat]; //just the same as calling categoryPairings
  }
  else {
    //get the property names of categoryPairings
    var props = Object.getOwnPropertyNames(categoryPairings);
    var propFound = false; //true when the category is paired
    for (var i = 0; i < props.length; i++){
      if (categoryPairings[props[i]] == cat){
        propFound = true;
        if (props[i] === "clause"){
          // rn categoryPairings has a property "clause" which maps to i
          return "cp"; // "cp" also maps to i, I think we want "cp"
        }
        //props[i] is the property that maps to cat
        return props[i];
      }
    }
    // if no matching category is found, return a custom error.
    if (!propFound){
      throw(new Error("" + cat + " is not a category defined in categoryPairings (see main/prosodicHierarchy.js)"));
    }
  }
}

// Function to check that every prosodic category in categoryPairings is in pCat
function checkProsodicHierarchy(pCat, categoryPairings){
	ret = true;
	for (category in categoryPairings){
		// check if category maps to multiple pairings 
		if (Array.isArray(categoryPairings[category])){
			console.log(categoryPairings[category]);
			for (pairing in categoryPairings[category]){
				if (!pCat.includes(categoryPairings[category][pairing])){
					ret = false;
					console.log(categoryPairings[category][pairing]);
					var prosodicMismatchMsg = "The category " + categoryPairings[category][pairing] + " from categoryPairings is not in pCat!\nCurrent pCat: "+pCat;
					displayError(prosodicMismatchMsg);
					//throw new Error(prosodicMismatchMsg);
				}
			}
		}
		else if(!pCat.includes(categoryPairings[category])){
			var errMsg = "The category " + categoryPairings[category] + " from categoryPairings is not in pCat!\nCurrent pCat: "+pCat;
			ret = false;
			displayError(errMsg);
			//throw new Error(errMsg);
		}
	}
	return ret;
}