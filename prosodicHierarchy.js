//An array of pairs to define which syntactic categories "match" which prosodic categories.
//For theory comparison, we'll want one array for each theory.
var categoryPairings = {
	"clause": "i",
	"cp": "i",
	"xp": "phi",
	"x0": "w"
};


//Evaluates whether two nodes have corresponding categories.
function catsMatch(aCat, bCat){
	if(aCat === undefined && bCat === undefined)
		return true;	//vacuously true if both nodes are leaves (with no category)
	else if(categoryPairings.hasOwnProperty(aCat))
		return categoryPairings[aCat] === bCat;
	else if(categoryPairings.hasOwnProperty(bCat))
		return categoryPairings[bCat] === aCat;
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
	try {
		if (i < 0)
			throw new Error(cat + ' is not a prosodic category');
	}
	catch(err) {
		displayError(err.message, err);
	}
	return pCat[i+1];
}

//function that returns the prosodic category that is one level higher than the given category
pCat.nextHigher = function(cat){
	var i = pCat.indexOf(cat);
	try {
		if (i < 0)
			throw new Error(cat + ' is not a prosodic category');
	}
	catch(err) {
		displayError(err.message, err);
	}
	if (i === 0){
		displayError(cat + ' is the highest prosodic category');
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
