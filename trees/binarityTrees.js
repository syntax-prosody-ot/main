//Violates gradient BinMax ONCE; violates categorical BinMax ONCE.

var pTree3words = {
	"id":"phi0",
	"cat":"phi",
	"children":
		[
			{
				"id":"word1",
				"cat":"w"
			},
			{
				"id":"word2",
				"cat":"w"
			},
			{
				"id":"word3",
				"cat":"w"
			}
		]
};

//Violates gradient BinMax TWICE; violates categorical BinMax ONCE.

var pTree4words = {
	"id":"phi0",
	"cat":"phi",
	"children":
	[
		{
			"id":"word1",
			"cat":"w"
		},
		{
			"id":"word2",
			"cat":"w"
		},
		{
			"id":"word3",
			"cat":"w"
		},
		{
			"id":"word4",
			"cat":"w"
		}
	]
};

//Violates gradient BinMax TWICE; violates categorical BinMax ONCE. But both phis violate Truckenbrodt's Binarity: gradient BinMax2Words 4x, regular 2x.
var pTree4wordsRec = {
	"id":"phi0",
	"cat":"phi",
	"children": [
		{"id":"phi1",
		"cat":"phi",
		"children":
		[
			{
				"id":"word1",
				"cat":"w"
			},
			{
				"id":"word2",
				"cat":"w"
			},
			{
				"id":"word3",
				"cat":"w"
			},
			{
				"id":"word4",
				"cat":"w"
			}
		]}
	]
};

//Violates gradient BinMax TWICE; violates categorical BinMax ONCE. 
//But all 3 phis violate Truckenbrodt's Binarity: gradient BinMax2Words 6x, regular 3x.
var pTree4words2xRec = {
	"id":"phi0",
	"cat":"phi",
	"children": [
	{
		"id":"phi1",
		"cat":"phi",
		"children": [
		{
			"id":"phi2",
			"cat":"phi",
			"children":
			[
				{"id":"word1","cat":"w"},
				{"id":"word2","cat":"w"},
				{"id":"word3","cat":"w"},
				{"id":"word4","cat":"w"}
			]
		}
		]
	}
	]
};
