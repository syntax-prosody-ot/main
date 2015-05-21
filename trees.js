/*****************
* Some trees
******************/

//An example of a prosodic tree
var prostree0 = {
	"id": "phi0",
	"cat":"phi",
	"children": [
		{
			"id":"phi1",
			"cat": "phi",
			"children":[{"id":"w1", "cat":"w"}]
		},
		{
			"id":"phi2",
			"cat":"phi",
			"children":[{"id":"w2", "cat":"w"},{"id":"w3", "cat":"w"}]
		}
	]
};

//An example of a syntactic tree
var syntree0 = {
	"id": "CP",
	"cat": "clause",
	"children": [
		{
			"id":"TP", 
			"cat":"xp",
			"children":[{"id":"NP", "cat":"x0"}, {"id":"VP", "cat":"x0"}]
		}
	]
};

//TREES FOR TESTING TYPE-INSENSITIVE MATCH

var syntree1 = {
	"id" : "X",
	"cat" : "xp",
	"children" : [
		{
			"id" : "Y", 
			"cat" : "xp",
			"children" :
				[
					{"id" : "a", "cat" : "x0"},
					{"id" : "b", "cat" : "x0"}
				]
		},
		{
			"id" : "Z", 
			"cat" : "xp",
			"children":
				[{"id" : "c", "cat" : "x0"}]
		}
	]
};

var prostree1 = {
	"id" : "phi0",
	"cat" : "phi",
	"children" : 
	[
		{
			"id" : "phi1",
			"cat" : "phi",
			"children" : [{"id" : "a", "cat" : "w"}, {"id" : "b", "cat" : "w"}]
		},
		{
			"id" : "phi2",
			"cat" : "phi",
			"children" : [{"id" : "c"}]
		}
	]
};

var prostree2 = {
	"id" : "phi0",
	"cat" : "phi",
	"children" : 
	[
		{
			"id" : "phi1",
			"cat" : "phi",
			"children" : [{"id" : "a", "cat" : "w"}]
		},
		{
			"id" : "phi2",
			"cat" : "phi",
			"children" : [{"id" : "b", "cat" : "w"}, {"id" : "c", "cat" : "w"}]
		}
	]
};

var prostree3 = {
	"id" : "phi0",
	"cat" : "phi",
	"children" : 
	[
		{"id" : "phi1", "cat" : "phi", "children" : [{"id" : "a", "cat" : "w"}]},
		{"id" : "phi2", "cat" : "phi", "children" : [{"id" : "b", "cat" : "w"}]},
		{"id" : "phi3", "cat" : "phi", "children" : [{"id" : "c", "cat" : "w"}]}
	]
};

/*EqualSisters violations: should get 
- 1 violation from equalSistersFirstPrivilege
- 2 violations from equalSistersPairwise
- 2 violations from equalSistersAdj
*/
var unequalSisters1 = {
	"id": "phi0",
	"cat": "phi",
	"children":[
		{"id" : "phi1", "cat" : "phi", "children" : [{"id" : "a", "cat" : "w"}]},
		{"id" : "compoundW", "cat" : "w", "children" : [{"id" : "b", "cat" : "w"}, {"id" : "b1", "cat" : "w"}]},
		{"id" : "phi2", "cat" : "phi", "children" : [{"id" : "c", "cat" : "w"}]}
	]
};

/*EqualSisters violations: should get 
- 2 violations from equalSistersFirstPrivilege
- 4 violations from equalSistersPairwise
- 2 violations from equalSistersAdj
*/
var unequalSisters2 = {
	"id": "phi0",
	"cat": "phi",
	"children":[
		{"id" : "phi1", "cat" : "phi", "children" : [{"id" : "a", "cat" : "w"}]},
		{"id" : "compoundW1", "cat" : "w", "children" : [{"id" : "b", "cat" : "w"}, {"id" : "b1", "cat" : "w"}]},
		{"id" : "compoundW2", "cat" : "w", "children" : [{"id" : "b2", "cat" : "w"}, {"id" : "b3", "cat" : "w"}]},
		{"id" : "phi2", "cat" : "phi", "children" : [{"id" : "c", "cat" : "w"}]}
	]
};

/*EqualSisters violations: should get 
- 2 violations from equalSistersFirstPrivilege
- 4 violations from equalSistersPairwise
- 3 violations from equalSistersAdj
*/
var unequalSisters3 = {
	"id": "phi0",
	"cat": "phi",
	"children":[
		{"id" : "phi1", "cat" : "phi", "children" : [{"id" : "a", "cat" : "w"}]},
		{"id" : "compoundW1", "cat" : "w", "children" : [{"id" : "b", "cat" : "w"}, {"id" : "b1", "cat" : "w"}]},
		{"id" : "phi2", "cat" : "phi", "children" : [{"id" : "c", "cat" : "w"}]},
		{"id" : "compoundW2", "cat" : "w", "children" : [{"id" : "d", "cat" : "w"}, {"id" : "d1", "cat" : "w"}]}
	]
};

