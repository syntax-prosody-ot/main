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
		console.warn("Neither argument to catsMatch was a valid syntactic category:", aCat, bCat);	//TODO this gives a false positive warning every time Match PS runs on a tree whose leaves don't have categories.
		return false;
	}
}


/*
//defines the prosodic hierarchy
var pCat = ["i", "phi", "w"];
pCat.isHigher = function (type1, type2){
//Function that compares two prosodic types and returns whether type1 is higher in the prosodic hierarchy than type2
	return (pCat.indexOf(type1) < pCat.indexOf(type2));
}
//pCat(type1).isHigherThan(type2)
*/

