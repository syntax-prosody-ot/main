/*KEY FOR REPRESENTATIONS
	
	<	left of stressed syllable
	>   right of stressed syllable

	[	left of unstressed syllable
	]	right of any syllable

	H	mora linked to High
	L	mora linked to Low
	F	mora linked to High+Low
	R	mora linked to Low+High

The representations are unambiguous because the OCP is in force.
So, "HH" has 1 tone:  High+Low			"LL" has 1 tone:  Low+Low
	"HL" has 2 tones: High				"LH" has 2 tones: Low+High
	"HF" has 2 tones: High+Low			"LR" has 2 tones: Low+High
	"HR" has 3 tones: High+Low+High		"LF" has 3 tones: Low+High+Low
*/

//HELPER FUNCTIONS

function cross(x, y)
//x and y must be strings or arrays.
{
	var cArray = [];
	for(var i = 0; i < x.length; i++)
	{
		for(var k = 0; k < y.length; k++)
		{
			var string = x[i];
			var current = y[k];
			var string = string.concat(current);
			cArray.push(string);
		}
	};
	return cArray;
};

function aStar(alphabet, n)
{
	var pArray = alphabet;
	for(var i = 1; i < n; i++)
	{
		var pArray = cross(alphabet, pArray);
	};
	return pArray;
};

//says if a character is a mora
function isMora(x)
{
	if((x == "H") || (x == "L") || (x == "R") || (x == "F") || (x == "m"))
	{
		return true;
	}
	else
	{
		return false;
	};
};

//says if a character is a mora linked to 2 tones
function isContour(x)
{
	if((x == "R") || (x == "F"))
	{
		return true;
	}
	else
	{
		return false;
	};
};

function oppositeT(x)
{
	if(x == "H")
	{
		return "L";
	};
	if(x == "L")
	{
		return "H";
	};
};

//returns the first moraic character to the left of position i
function moraBefore(i,word)
{
	var mb = "";
	for(var j = (i-1); j > -1; j--)
	{
		var cur = word[j];
		if(isMora(cur))
		{
			mb = cur;
			break;
		};
	};
	return mb;
};

//returns the first moraic character to the right of position i
function moraAfter(i,word)
{
	var ma = "";
	for(var j = (i+1); j < word.length; j++)
	{
		var cur = word[j];
		if(isMora(cur))
		{
			ma = cur;
			break;
		};
	};
	return ma;
};

/*tone="H", returns "F"
  tone="L", returns "R"*/
function cStartingWith(tone)
{
	var a = "";
	if(tone == "H")
	{
		a = "F";
	};
	if(tone == "L")
	{
		a = "R";
	};
	return a;
};

/*tone="H", returns "R"
  tone="L", returns "F"*/
function cEndingWith(tone)
{
	var a = "";
	if(tone == "H")
	{
		a = "R";
	};
	if(tone == "L")
	{
		a = "F";
	};
	return a;
};

function mCountToEdge(string,i,cat,dir)
{
/* string	input string
   i		starting index
   cat		can be "word", "syl", or "sylX"
   dir		can be "left" or "right"
*/
	var mcount = 0;
	if(cat == "word")
	{
		//count to next # or edge of string, whichever closer
		if(dir == "left")
		{
			//go left until word boundary
			for(var j = i-1; j >= 0; j--)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if(cur == "#")
				{
					break;
				};
			};
		};
		if(dir == "right")
		{
			//go right until word boundary
			for(var j = i+1; j < string.length; j++)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if(cur == "#")
				{
					break;
				};
			};
		};
	};
	if(cat == "syl")
	{
		//count to the next [ or ]
		if(dir == "left")
		{
			//go left; counts # as syl-boundary
			for(var j = i-1; j >= 0; j--)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if((cur == "[") || (cur == "#") || (cur == "<"))
				{
					break;
				};
			};
		};
		if(dir == "right")
		{
			//go right; counts # as syl-boundary
			for(var j = i+1; j < string.length; j++)
			{
				var cur = string[j];
				if(isMora(cur))
				{
					mcount++;
				};
				if((cur == "]") || (cur == ">") || (cur == "#"))
				{
					break;
				};
			};
		};
	};
	if(cat == "sylX")
	{
		if(dir == "left")
		{
			var catExists = false;
			//check to see if there even is a < before i
			for(var j = i-1; j >= 0; j--)
			{
				var cur = string[j];
				if(cur == "<")
				{
					catExists = true;
					break;
				};					
			};
			if(catExists)
			{
				for(var j = i-1; j >= 0; j--)
				{
					var cur = string[j];
					if(isMora(cur))
					{
						mcount++;
					};
					if(cur == "<")
					{
						break;
					};
				};
			};
		};
		if(dir == "right")
		{
			var catExists = false;
			//check to see if there even is a > after i
			for(var j = i+1; j < string.length; j++)
			{
				var cur = string[j];
				if(cur == ">")
				{
					catExists = true;
					break;
				};
			};
			if(catExists)
			{
				for(var j = i+1; j < string.length; j++)
				{
					var cur = string[j];
					if(isMora(cur))
					{
						mcount++;
					};
					if(cur == ">")
					{
						break;
					};
				};
			};
		};

	};
	return mcount;
};

//GEN

function swToneGen(string)
{
	var candidates = [];
	var mcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(isMora(string[i]))
		{
			mcount++;
		};
	};
	var minv = ["H", "L", "R", "F", "m"];
	var nopunct = aStar(minv,mcount);
	for(var j = 0; j < nopunct.length; j++)
	{
		var inprep = nopunct[j];
		for(var l = 0; l < string.length; l++)
		{
			var cur = string[l];
			if(!isMora(cur))
			{
				inprep = inprep.substring(0,l).concat(cur).concat(inprep.substring(l));
			};
		};
		candidates.push(inprep);
	};
	return candidates;
};

function jToneGen(string)
{
	var candsForSpot = [];
	var candidates = [];
	var mcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(isMora(string[i]))
		{
			mcount++;
		};
	};
	var minv = ["H", "L", "R", "F", "m"];
	var nopunct = aStar(minv,mcount);
	for(var j = 0; j < nopunct.length; j++)
	{
		var inprep = nopunct[j];
		for(var l = 0; l < string.length; l++)
		{
			var cur = string[l];
			if(!isMora(cur))
			{
				inprep = inprep.substring(0,l).concat(cur).concat(inprep.substring(l));
			};
		};
		candidates.push(inprep);
	};
	for(var i = 0; i < candidates.length; i++)
	{
		var cur = candidates[i];
		var ioPair = [string,cur];
		candsForSpot.push(ioPair);
	};
	return candsForSpot;
};

function kjGen(string)
{
	var noGaps = [];
	var jset = jToneGen(string);
	for(var i = 0; i < jset.length; i++)
	{
		var cur = jset[i];
		if(!hasGap(cur))
		{
			noGaps.push(cur);
		};
	};
	return noGaps;
};

function hasGap(string)
{
	var gap = false;
	var prevT = "";
	var curT = "";
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if(((cur == "L") || (cur == "H")) && (prevT == cur) && (moraBefore(i,string) == "m"))
		{
			gap = true;
		};
		if((cur == "R") && (prevT == "L") && (moraBefore(i,string) == "m"))
		{
			gap = true;
		};
		if((cur == "F") && (prevT == "H") && (moraBefore(i,string) == "m"))
		{
			gap = true;
		};
		if(gap == true)
		{
			break;
		};
		if((cur == "H") || (cur == "R"))
		{
			prevT = "H";
		};
		if((cur == "L") || (cur == "F"))
		{
			prevT = "L";
		};
	};
	return gap;
};

function getTonalTier(string)
{
	var tTier = "";
	var ocpified = "";
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if((cur == "H") ||  (cur == "L"))
		{
			tTier = tTier.concat(cur);
		};
		if(cur == "R")
		{
			tTier = tTier.concat("LH");
		};
		if(cur == "F")
		{
			tTier = tTier.concat("HL");
		};
	};
	for(var j = 0; j < tTier.length; j++)
	{
		if(tTier[j] != tTier[j-1])
		{
			ocpified = ocpified.concat(tTier[j]);
		};
	};
	return ocpified;
};

//CONSTRAINTS

function atlWord(string)
{
	var h = alignT(string,"H","word","left");
	var l = alignT(string,"L","word","left");
	return h+l;
};

function atlSyl(string)
{
	var h = alignT(string,"H","syl","left");
	var l = alignT(string,"L","syl","left");
	return h+l;
};

function atrWord(string)
{
	var h = alignT(string,"H","word","right");
	var l = alignT(string,"L","word","right");
	return h+l;
};

function atrSyl(string)
{
	var h = alignT(string,"H","syl","right");
	var l = alignT(string,"L","syl","right");
	return h+l;
};

function ahlWord(string)
{
	return alignT(string,"H","word","left");
};

function ahlSyl(string)
{
	return alignT(string,"H","syl","left");
};

function ahrWord(string)
{
	return alignT(string,"H","word","right");
};

function ahrSyl(string)
{
	return alignT(string,"H","syl","right");
};

function allWord(string)
{
	return alignT(string,"L","word","left");
};

function allSyl(string)
{
	return alignT(string,"L","syl","left");
};

function alrWord(string)
{
	return alignT(string,"L","word","right");
};

function alrSyl(string)
{
	return alignT(string,"L","syl","right");
};


function alignT(string,tone,cat,dir)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if(dir == "left")
		{
			if((cur == tone) || (cur == cStartingWith(tone)))
			{
				var prevM = moraBefore(i,string);
				if((prevM != tone) && (prevM != cEndingWith(tone)))
				{
					vcount += mCountToEdge(string,i,cat,dir);
				};
			};
			if(cur == cEndingWith(tone))
			{
				vcount += mCountToEdge(string,i,cat,dir);
			};
		};
		if(dir == "right")
		{
			if((cur == tone) || (cur == cEndingWith(tone)))
			{
				var nextM = moraAfter(i,string);
				if((nextM != tone) && (nextM != cStartingWith(tone)))
				{
					vcount += mCountToEdge(string,i,cat,dir);
				}
			};
			if(cur == cStartingWith(tone))
			{
				vcount += mCountToEdge(string,i,cat,dir);
			};
		};
	};
	return vcount;
};

function star(tone,word)
{
	var vcount = 0;
	for(var i = 0; i < word.length; i++)
	{
		var cur = word[i];
		var prev = moraBefore(i,word);
		if((cur == tone) || (cur == cStartingWith(tone)))
		{
			if((prev != tone) && (prev != cEndingWith(tone)))
			{
				vcount++;
			};
		};
		if(cur == cEndingWith(tone))
		{
			vcount++;
		};
	};
	return vcount;
};

function toneToMora(tone,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		if((cur == tone) || (cur == cStartingWith(tone)))
		{
			var prev = moraBefore(i,string);
			if((prev == tone) || (prev == cEndingWith(tone)))
			{
				vcount++;
			};
		};
	};
	return vcount;
};

function moraToTone(string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if((string[i] == "R") || (string[i] == "F"))
		{
			vcount++;
		};
	};
	return vcount;
};

//cat must be syl or sylX. i should add  word, etc.
function crispEdge(string,tone,cat)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		var cur = string[i];
		var prev = moraBefore(i,string);
		var next = moraAfter(i,string);
		if(cat == "sylX")
		{
			if((cur == "<") || (cur == ">"))
			{
				if((prev == tone) || (prev == cEndingWith(tone)))
				{
					if((next == tone) || (next == cStartingWith(tone)))
					{
						vcount++;
					};
				};
			};
		};
		if(cat == "syl")
		{
			if((cur == "[") || (cur == "<"))
			{
				if((prev == tone) || (prev == cEndingWith(tone)))
				{
					if((next == tone) || (next == cStartingWith(tone)))
					{
						vcount++;
					};
				};
			};
		};
	};
	return vcount;
};

function kjCrispEdge(string)
{
	var h = crispEdge(string,"H","syl");
	var l = crispEdge(string,"L","syl");
	return h+l;
};


function kjDep(string)
{
	var vcount = 0;
	var max = kjMax(string);
	var ttier = getTonalTier(string);
	var tcount = ttier.length;
	if((string[0] == "h") && (max == 1))
	{
		vcount = tcount;
	};
	if((string[0] == "h") && (max == 0))
	{
		vcount = tcount-1;
	};
	if((string[0] == "f") && (max == 2))
	{
		vcount = tcount;
	};
	if((string[0] == "f") && (max == 1))
	{
		vcount = tcount-1;
	};
	if((string[0] == "f") && (max == 0))
	{
		vcount = tcount-2;
	};
	if(vcount < 0)
	{
		vcount = 0;
	};
	return vcount;
};

function kjMax(string)
{
	var vcount = 0;
	var tTier = getTonalTier(string);
	if((string[0] == "h") && (tTier.indexOf("H") == -1))
	{
		vcount++;
	};
	if(string[0] == "f")
	{
		if(tTier.length == 1)
		{
			vcount++;
		};
		if((tTier == "LH"))
		{
			vcount++;
		};
		if(tTier == "")
		{
			vcount += 2;
		};
	};
	return vcount;
};

function kjInputs(sMin,sMax)
{
	var kji = [];
	for(var i = sMin; i <= sMax; i++)
	{
		var sylProfs = aStar(["[m]", "[mm]"], i);
		for(var j = 0; j < sylProfs.length; j++)
		{
			kji.push("h:".concat(sylProfs[j]));
			kji.push("f:".concat(sylProfs[j]));
		};
	};
	return kji;
};

var kjForms = kjInputs(1,4);

//UNNECESSARY
function eMoraToTone(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(moraToTone(cset[i]));
	};
	return vcounts;
};

function evalCrisp(cset,tone,cat)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = crispEdge(cand,tone,cat);
		vcounts.push(j);
	};
	return vcounts;
};

function ekjCrisp(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(kjCrispEdge(cset[i]));
	};
	return vcounts;
};

function eATR(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = allTonesRight(cand);
		vcounts.push(j);
	};
	return vcounts;
};

function eATL(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = allTonesLeft(cand);
		vcounts.push(j);
	};
	return vcounts;
};

function ekjMax(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(kjMax(cset[i]));
	};
	return vcounts;
};

function ekjDep(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		vcounts.push(kjDep(cset[i]));
	};
	return vcounts;
};

//only works for markedness constraints
function evalAlignT(cset,tone,cat,dir)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = alignT(cand,tone,cat,dir);
		vcounts.push(j);
	};
	return vcounts;
};

function evalAlignAnyT(cset,cat,dir)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = alignT(cand,"H",cat,dir);
		var k = alignT(cand,"L",cat,dir);
		vcounts.push(j+k);
	};
	return vcounts;
};

function evalToneToMora(cset,tone)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = toneToMora(tone,cand);
		vcounts.push(j);
	};
	return vcounts;
};

function eToneToMora(cset)
{
	var vcounts = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cand = cset[i];
		var j = toneToMora("H",cand);
		var k = toneToMora("L",cand);
		vcounts.push(j+k);
	};
	return vcounts;
};

var nagasaki = swToneGen("h:[m][m][m][m]");
var kagosima = swToneGen("f:[m][m][m][m]");
var wasinton = swToneGen("f:[m][mm][mm]");
var nagasakiken = swToneGen("h:[m][m][m][m][mm]");
var kagosimaken = swToneGen("f:[m][m][m][m][mm]");
