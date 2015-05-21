//a and b stand for arbitrary terminal strings.

//Myrberg's coordination condition, as in her (16a).

var sTreeCoord = {
	"id": "CP1",
	"cat": "clause",
	"children": 
	[
		{
			"id": "CP2",
			"cat": "clause",
			"children": [{"id": "a"}]
		},
		{
			"id": "CP3",
			"cat": "clause",
			"children": [{"id": "b"}]
		}
	]	
};

//Myrberg's embedding condition, as in her (16b).

var sTreeEmbed = {
	"id": "CP1",
	"cat": "clause",
	"children": 
	[
		{
			"id": "CP2",
			"cat": "clause",
			"children": 
			[
				{"id": "a"}
			]
		},
		{"id": "b"}
	]
	
};

//Myrberg's [IntP IntP IntP] parse, as in her (26a).

var pTreeA = {
	"id": "IntP1",
	"cat": "i",
	"children": 
	[
		{
			"id": "IntP2",
			"cat": "i",
			"children": [{"id": "a"}]
		},
		{
			"id": "IntP3",
			"cat": "i",
			"children": [{"id": "b"}]
		}
	]	
};

//Myrberg's single-IntP parse, as in her (26b).

var pTreeB = {
	"id": "IntP1",
	"cat": "i",
	"children": 
	[
		{"id": "a"}, 
		{"id": "b"}
	]
};

//Myrberg's [IntP IntP PhonoP] parse, as in her (26c).

var pTreeC = {
	"id": "IntP1",
	"cat": "i",
	"children": 
	[
		{
			"id": "IntP2",
			"cat": "i",
			"children": [{"id": "a"}]
		},
		{
			"id": "PhonoP1",
			"cat": "phi",
			"children": [{"id": "b"}]
		}
	]	
};
