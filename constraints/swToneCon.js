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

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

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
	if((x == "H") || (x == "L") || (x == "R") || (x == "F") || (x == "m") || (x == "A"))
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
	var minv = ["H", "L"];
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
	var minv = ["H", "L"];
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

function atlWord(ur,string)
{
	var h = alignT(string,"H","word","left");
	var l = alignT(string,"L","word","left");
	return h+l;
};

function atlSyl(ur,string)
{
	var h = alignT(string,"H","syl","left");
	var l = alignT(string,"L","syl","left");
	return h+l;
};

function atlFtHd(ur,string)
{
	var h = alignT(string,"H","sylX","left");
	var l = alignT(string,"L","sylX","left");
	return h+l;
};

function atrWord(ur,string)
{
	var h = alignT(string,"H","word","right");
	var l = alignT(string,"L","word","right");
	return h+l;
};

function atrSyl(ur,string)
{
	var h = alignT(string,"H","syl","right");
	var l = alignT(string,"L","syl","right");
	return h+l;
};

function atrFtHd(ur,string)
{
	var h = alignT(string,"H","sylX","right");
	var l = alignT(string,"L","sylX","right");
	return h+l;
};

function ahlWord(ur,string)
{
	return alignT(string,"H","word","left");
};

function ahlSyl(ur,string)
{
	return alignT(string,"H","syl","left");
};

function ahlFtHd(ur,string)
{
	return alignT(string,"H","sylX","left");
};

function ahrWord(ur,string)
{
	return alignT(string,"H","word","right");
};

function ahrSyl(ur,string)
{
	return alignT(string,"H","syl","right");
};

function ahrFtHd(ur,string)
{
	return alignT(string,"H","sylX","right");
};

function allWord(ur,string)
{
	return alignT(string,"L","word","left");
};

function allSyl(ur,string)
{
	return alignT(string,"L","syl","left");
};

function allFtHd(ur,string)
{
	return alignT(string,"L","sylX","left");
};

function alrWord(ur,string)
{
	return alignT(string,"L","word","right");
};

function alrSyl(ur,string)
{
	return alignT(string,"L","syl","right");
};

function alrFtHd(ur,string)
{
	return alignT(string,"L","sylX","right");
};


function noHighT(ur,string)
{
	return star("H",string);
};

function noLowT(ur,string)
{
	return star("L",string);
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

function crisp_sT(ur,string)
{
	var h = crispEdge(string,"H","syl");
	var l = crispEdge(string,"L","syl");
	return h+l;
};

function crisp_sH(ur,string)
{
	var h = crispEdge(string,"H","syl");
	return h;
};

function crisp_sL(ur,string)
{
	var l = crispEdge(string,"L","syl");
	return l;
};

function kjMax(ur,string)
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

function kjDep(ur,string)
{
	var vcount = 0;
	var tTier = getTonalTier(string);
	if((string[0] == "h") && (tTier.length > 1))
	{
		vcount = (tTier.length)-1;
	};
	if((string[0] == "h") && (tTier == "L"))
	{
		vcount = 1;
	};
	if(string[0] == "f")
	{
		if(tTier.length > 2)
		{
			vcount = (tTier.length)-2;
		};
		if(tTier == "LH")
		{
			vcount = 1;
		};
	};
	return vcount;
};

function noHL(ur,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(string[i] == "H" && string[i+1] == "L")
		{
			vcount++;
		};
	};
	return vcount;
};

function noLH(ur,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(string[i] == "L" && string[i+1] == "H")
		{
			vcount++;
		};
	};
	return vcount;
};

function noLL(ur,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(string[i] == "L" && string[i+1] == "L")
		{
			vcount++;
		};
	};
	return vcount;
};

function noXH(ur,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(isMora(string[i]) && string[i+1] == "H")
		{
			vcount++;
		};
	};
	return vcount;
};

function kj_HtoM(ur,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if((string[i] == "H") && (moraAfter(i,string) == string[i]))
		{
			vcount++;
		}
	};
	return vcount;
};

function kj_LtoM(ur,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if((string[i] == "L") && (moraAfter(i,string) == string[i]))
		{
			vcount++;
		}
	};
	return vcount;
};

function kj_TtoM(ur,string)
{
	var vcount = 0;
	for(var i = 0; i < string.length; i++)
	{
		if(isMora(string[i]) && (moraAfter(i,string) == string[i]))
		{
			vcount++;
		}
	};
	return vcount;
};


//ALTERNATE UNIVERSE

var au_sen = "h:2";
var au_san = "f:2";
var au_nagasaki = "h:1111";
var au_kagosima = "f:1111";
var au_nagasakiken = "h:11112";
var au_kagosimaken = "f:11112";
var au_furansu = "h:121";
var au_wasinton = "f:122";

var auInputs = [au_sen, au_san, au_nagasaki, au_kagosima, au_nagasakiken, au_kagosimaken, au_furansu, au_wasinton];

function auPrep_isSyl(string)
{
	if(string == "m" || string == "n" || string == "O" || string == "P" || string == "q" || string == "r" || string == "S" || string == "T" || string == "u" || string == "V" || string == "w" || string == "X")
	{
		return true;
	}
	else
	{
		return false;
	};
};

function auPrep_isHeavy(string)
{
	if(string == "n" || string == "P" || string == "r" || string == "T" || string == "u" || string == "V" || string == "w" || string == "X")
	{
		return true;
	}
	else
	{
		return false;
	};
};

function auPrep_isHead(string)
{
	if(string == "O" || string == "P" || string == "S" || string == "T" || string == "V" || string == "X")
	{
		return true;
	}
	else
	{
		return false;
	};
};

function auGen(string)
{
	var stringMinus = string.substring(2);
	var prep = auPrep(stringMinus);
	var cset = [];
	var cset2 = [];
	for(var i = 0; i < prep.length; i++)
	{
		var cur = auTonify(prep[i]);
		for(var j = 0; j < cur.length; j++)
		{
			if(cur[j] == "'")
			{
				var mained = cur.substring(0,j).concat("^").concat(cur.substring(j+1));
				cset.push([string,mained]);
			};
		};
	};
	for(var i = 0; i < cset.length; i++)
	{
		var cur = cset[i];
		if((auMax(cur[0],cur[1]) == 0) && (auRightmost(cur[0],cur[1]) == 0) && (au_mTroch(cur[0],cur[1]) == 0))
		{
			cset2.push(cur);
		};
	};
	return cset2;
};

function auTonify(string)
{
	var toned = string;
	toned = toned.replace(/q/g,".H");
	toned = toned.replace(/S/g,".'H");
	toned = toned.replace(/m/g,".L");
	toned = toned.replace(/O/g,".'L");
	toned = toned.replace(/r/g,".HH");
	toned = toned.replace(/T/g,".'HH");
	toned = toned.replace(/n/g,".LL");
	toned = toned.replace(/P/g,".'LL");
	toned = toned.replace(/u/g,".HL");
	toned = toned.replace(/V/g,".'HL");
	toned = toned.replace(/w/g,".LH");
	toned = toned.replace(/X/g,".'LH");
	toned = toned.replace(/-\./g, "-");
	return toned;
};

function auPrep(string)
{
	var toFilter = aStar(["m", "n", "O", "P", "q", "r", "S", "T", "u", "V", "w", "X"], string.length);
	var faithful = [];
	var parenSet = [];
	var dashed = [];
	var singlyHeaded = [];
	var periodized = [];
	for(var i = 0; i < toFilter.length; i++)
	{
		var cur = toFilter[i];
		var curBad = false;
		for(var j = 0; j < cur.length; j++)
		{
			if((string[j] == 1) && auPrep_isHeavy(cur[j]))
			{
				curBad = true;
			};
			if(curBad)
			{
				break;
			};
		};
		for(var m = 0; m < cur.length; m++)
		{
			if((string[m] == 2) && !auPrep_isHeavy(cur[m]))
			{
				curBad = true;
			};
			if(curBad)
			{
				break;
			};
		};
		if(!curBad)
		{
			faithful.push(cur);
		};
	};
	for(var k = 0; k < faithful.length; k++)
	{
		var cur = faithful[k];
		var forParenSet = mmParen(cur,1,2);
		for(var n = 0; n < forParenSet.length; n++)
		{
			parenSet.push(forParenSet[n]);
		};
	};
	for(var o = 0; o < parenSet.length; o++)
	{
		var toHyph = parenSet[o];
		for(var p = 0; p < toHyph.length; p++)
		{
			if(p == 0)
			{
				toHyph = "-".concat(toHyph.substring(1));
			};
			if((p > 0) && (toHyph[p] == ")"))
			{
				toHyph = toHyph.substring(0,p).concat("-").concat(toHyph.substring(p+1));
			};
		};
		for(var q = 0; q < toHyph.length; q++)
		{
			if(toHyph[q] == "(")
			{
				toHyph = toHyph.substring(0,q).concat(toHyph.substring(q+1));
			};
		};
		dashed.push(toHyph);
	};
	for(var r = 0; r < dashed.length; r++)
	{
		var cur = dashed[r];
		var curBad = false;
		for(var s = 0; s < cur.length; s++)
		{
			if(auPrep_isHead(cur[s]) && auPrep_isHead(cur[s+1]))
			{
				curBad = true;
			};
			if(isLetter(cur[s]) && isLetter(cur[s+1]) && !auPrep_isHead(cur[s]) && !auPrep_isHead(cur[s+1]))
			{
				curBad = true;
			};
			if(curBad)
			{
				break;
			};
		};
		if(!curBad)
		{
			singlyHeaded.push(cur);
		};
	};
	return singlyHeaded;
};


//ALTERNATE UNIVERSE CON and helper functions

//no monomoraic feet
function auBinMin(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		var cur = sr[i];
		var rb = sr[i+3];
		if(footLeftEdge(cur) && footRightEdge(rb))
		{
			vcount++;
		};
	};
	return vcount;
};

//cat from {"f", "hf", "w"}
//should add syllable, ft-head, main ft-head
function auAlignT(sr,tone,cat,d)
{
	var vcount = 0;
	if(cat == "f")
	{
		if(d == "left")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(sr[i] == tone && (moraBefore(i,sr) == oppositeT(tone)) && ((sr.substring(0,i).indexOf("'") > -1) || (sr.substring(0,i).indexOf("^") > -1)))
				{
					for(var j = i-1; j >= 0; j--)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if(footLeftEdge(sr,j))
						{
							break;
						};
					};
				};
			};
		};
		if(d == "right")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(sr[i] == tone && (moraAfter(i,sr) == oppositeT(tone)) && ((sr.substring(i).indexOf("'") > -1) || (sr.substring(i).indexOf("^") > -1)))
				{
					for(var j = i+1; j < sr.length; j++)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if(footRightEdge(sr,j))
						{
							break;
						};
					};
				};
			};
		};
	};
	if(cat == "hf")
	{
		if(d == "left")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(sr[i] == tone && ((moraBefore(i,sr) == oppositeT(tone))) && (sr.substring(0,i).indexOf("^") > -1))
				{
					for(var j = i-1; j >= 0; j--)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if(mainFootLeftEdge(sr,j))
						{
							break;
						};
					};
				};
			};
		};
		if(d == "right")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(sr[i] == tone && (moraAfter(i,sr) == oppositeT(tone)) && (sr.substring(i).indexOf("^") > -1))
				{
					for(var j = i+1; j < sr.length; j++)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if(mainFootRightEdge(sr,j))
						{
							break;
						};
					};
				};
			};
		};
	};
	if(cat == "w")
	{
		if(d == "left")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(sr[i] == tone && (moraBefore(i,sr) == oppositeT(tone)))
				{
					for(var j = i-1; j >= 0; j--)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
					};
				};
			};
		};
		if(d == "right")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if((sr[i] == tone) && (moraAfter(i,sr) == oppositeT(tone)))
				{
					for(var j = i+1; j < sr.length; j++)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
					};
				};
			};
		};
	};
	return vcount;
};

function auAlignLeft_f_T(ur,sr)
{
	return auAlignPros(sr,"f","H","left")+auAlignPros(sr,"f","L","left");
};

function auAlignLeft_f_H(ur,sr)
{
	return auAlignPros(sr,"f","H","left");
};

function auAlignLeft_f_L(ur,sr)
{
	return auAlignPros(sr,"f","L","left");
};

function auAlignLeft_hf_H(ur,sr)
{
	return auAlignPros(sr,"hf","H","left");
};

function auAlignLeft_hf_L(ur,sr)
{
	return auAlignPros(sr,"hf","L","left");
};

function auAlignRight_f_T(ur,sr)
{
	return auAlignRight_f_H(ur,sr)+auAlignRight_f_L(ur,sr);
};

function auAlignRight_f_H(ur,sr)
{
	return auAlignPros(sr,"f","H","right");
};

function auAlignRight_f_L(ur,sr)
{
	return auAlignPros(sr,"f","L","right");
};

function auAlignRight_hf_H(ur,sr)
{
	return auAlignPros(sr,"hf","H","right");
};

function auAlignRight_hf_L(ur,sr)
{
	return auAlignPros(sr,"hf","L","right");
};

function auAlignLeft_hm_T(ur,sr)
{
	return auAlignPros(sr, "hm", "H", "left")+auAlignPros(sr, "hm", "L", "left");
};

function auAlignLeft_hm_H(ur,sr)
{
	return auAlignPros(sr, "hm", "H", "left");
};

function auAlignLeft_hm_L(ur,sr)
{
	return auAlignPros(sr, "hm", "L", "left");
};

//here


function  auAlignRight_hm_T(ur,sr)
{
	return auAlignRight_hm_H(ur,sr)+auAlignRight_hm_L(ur,sr);
};


function auAlignRight_hm_H(ur,sr)
{
	return auAlignPros(sr, "hm", "H", "right");
};

function auAlignRight_hm_L(ur,sr)
{
	return auAlignPros(sr, "hm", "L", "right");
};

//cat from {"f", "hf", "hm"}
//should add syllable, ft-head, main ft-head
function auAlignPros(sr,cat,tone,d)
{
	var vcount = 0;
	
	if(cat == "f")
	{
		if(d == "left")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(footLeftEdge(sr,i) && (moraAfter(i,sr) != tone))
				{
					for(var j = i-1; j >= 0; j--)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraBefore(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
				if(footLeftEdge(sr,i) && (moraAfter(i,sr) == tone) && (moraBefore(i,sr) == tone))
				{
					for(var j = i-1; j >= 0; j--)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraBefore(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
			};
		};
		if(d == "right")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(footRightEdge(sr,i) && (moraBefore(i,sr) != tone))
				{
					for(var j = i+1; j < sr.length; j++)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraAfter(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
				if(footRightEdge(sr,i) && (moraBefore(i,sr) == tone) && (moraAfter(i,sr) == tone))
				{
					for(var j = i+1; j < sr.length; j++)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraAfter(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
			};
		};
	};
	if(cat == "hf")
	{
		if(d == "left")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(mainFootLeftEdge(sr,i) && (moraAfter(i,sr) != tone))
				{
					for(var j = i-1; j >= 0; j--)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraBefore(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
				if(mainFootLeftEdge(sr,i) && (moraAfter(i,sr) == tone) && (moraBefore(i,sr) == tone))
				{
					for(var j = i-1; j >= 0; j--)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraBefore(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
			};
		};
		if(d == "right")
		{
			for(var i = 0; i < sr.length; i++)
			{
				if(mainFootRightEdge(sr,i) && (moraBefore(i,sr) != tone))
				{
					for(var j = i+1; j < sr.length; j++)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraAfter(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
				if(mainFootRightEdge(sr,i) && (moraBefore(i,sr) == tone) && (moraAfter(i,sr) == tone))
				{
					for(var j = i+1; j < sr.length; j++)
					{
						if(isMora(sr[j]))
						{
							vcount++;
						};
						if((sr[j] == tone) && (moraAfter(j,sr) == oppositeT(tone)))
						{
							break;
						};
					};
				};
			};
		};
	};
	if(cat == "hm")
	{
		var hmIndex = sr.indexOf("^")+1;
		var headMora = sr[hmIndex];
		if(d == "left")
		{
			if((headMora != tone) || (moraBefore(hmIndex,sr) == tone))
			{
				for(var i = hmIndex-1; i >= 0; i--)
				{
					if(isMora(sr[i]))
					{
						vcount++;
					};
					if((sr[i] == tone) && (moraBefore(i,sr) != tone))
					{
						break;
					};
				};
			};
		};
		if(d == "right")
		{
			if((headMora != tone) && (moraAfter(hmIndex,sr) == tone))
			{
				for(var i = hmIndex+1; i < sr.length; i++)
				{
					if(isMora(sr[i]))
					{
						vcount++;
					};
					if((sr[i] == tone) && (moraAfter(i,sr) != tone))
					{
						break;
					};
				};
			};
		};
	};
	return vcount;
};

function isHeadMora(i,sr)
{
	if(isMora(i,sr) && (sr[i-1] == "^"))
	{
		return true;
	}
	else
	{
		return false;
	};
};

//helper function that determines if an edge is crisp for a certain tone
function isCrispEdgeFor(sr,i,tone)
{
	if((moraBefore(i,sr) == tone) && (moraAfter(i,sr) == tone))
	{
		return false;
	}
	else
	{
		return true;
	};
};

//THE f-left VERSIONS
function auAlignLeft_T_f(ur,sr)
{
	return auAlignT(sr,"H","f","left")+auAlignT(sr,"L","f","left");
};

function auAlignLeft_H_f(ur,sr)
{
	return auAlignT(sr,"H","f","left");
};

function auAlignLeft_L_f(ur,sr)
{
	return auAlignT(sr,"L","f","left");
};

//THE hf-left VERSIONS
function auAlignLeft_T_hf(ur,sr)
{
	return auAlignT(sr,"H","hf","left")+auAlignT(sr,"L","hf","left");
};

function auAlignLeft_H_hf(ur,sr)
{
	return auAlignT(sr,"H","hf","left");
};

function auAlignLeft_L_hf(ur,sr)
{
	return auAlignT(sr,"L","hf","left");
};


//THE w-left VERSIONS
function auAlignLeft_T_w(ur,sr)
{
	return auAlignT(sr,"H","w","left")+auAlignT(sr,"L","w","left");
};

function auAlignLeft_H_w(ur,sr)
{
	return auAlignT(sr,"H","w","left");
};

function auAlignLeft_L_w(ur,sr)
{
	return auAlignT(sr,"L","w","left");
};

//THE f-right VERSIONS
function auAlignRight_T_f(ur,sr)
{
	return auAlignT(sr,"H","f","right")+auAlignT(sr,"L","f","right");
};

function auAlignRight_H_f(ur,sr)
{
	return auAlignT(sr,"H","f","right");
};

function auAlignRight_L_f(ur,sr)
{
	return auAlignT(sr,"L","f","right");
};

//THE hf-left VERSIONS
function auAlignRight_T_hf(ur,sr)
{
	return auAlignT(sr,"H","hf","right")+auAlignT(sr,"L","hf","right");
};

function auAlignRight_H_hf(ur,sr)
{
	return auAlignT(sr,"H","hf","right");
};

function auAlignRight_L_hf(ur,sr)
{
	return auAlignT(sr,"L","hf","right");
};

//THE w-left VERSIONS
function auAlignRight_T_w(ur,sr)
{
	return auAlignT(sr,"H","w","right")+auAlignT(sr,"L","w","right");
};

function auAlignRight_H_w(ur,sr)
{
	return auAlignT(sr,"H","w","right");
};

function auAlignRight_L_w(ur,sr)
{
	return auAlignT(sr,"L","w","right");
};


function mainFootLeftEdge(string,i)
{
	var fle = false;
	if(string[i] == "-")
	{
		for(var j = i+1; j < string.length; j++)
		{
			if(string[j] == "^")
			{
				fle = true;
				break;
			};
			if(string[j] == "-")
			{
				break;
			};
		};
	};
	return fle;
};

function footLeftEdge(string,i)
{
	var fle = false;
	if(string[i] == "-")
	{
		for(var j = i+1; j < string.length; j++)
		{
			if((string[j] == "'") || (string[j] == "^"))
			{
				fle = true;
				break;
			};
			if(string[j] == "-")
			{
				break;
			};
		};
	};
	return fle;
};

function mainFootRightEdge(string,i)
{
	var fle = false;
	if(string[i] == "-")
	{
		for(var j = i-1; j >= 0; j--)
		{
			if(string[j] == "^")
			{
				fle = true;
				break;
			};
			if(string[j] == "-")
			{
				break;
			};
		};
	};
	return fle;
};


function footRightEdge(string,i)
{
	var fle = false;
	if(string[i] == "-")
	{
		for(var j = i-1; j >= 0; j--)
		{
			if((string[j] == "'") || (string[j] == "^"))
			{
				fle = true;
				break;
			};
			if(string[j] == "-")
			{
				break;
			};
		};
	};
	return fle;
};

function auMax(ur,sr)
{
	var vcount = 0;
	var tTier = getTonalTier(sr);
	if((ur[0] == "h") && (tTier.indexOf("H") == -1))
	{
		vcount++;
	};
	if((ur[0] == "f") && (tTier.indexOf("H") == -1))
	{
		vcount++;
	};
	if((ur[0] == "f") && (tTier.indexOf("L") == -1))
	{
		vcount++;
	};
	if((ur[0] == "f") && (tTier == "LH"))
	{
		vcount++;
	};
	return vcount;
};

function auDep(ur,sr)
{
	var vcount = 0;
	var tTier = getTonalTier(sr);
	if((ur[0] == "h") && (tTier.length > 1))
	{
		vcount = (tTier.length)-1;
	};
	if((ur[0] == "h") && (tTier == "L"))
	{
		vcount = 1;
	};
	if(ur[0] == "f")
	{
		if(tTier.length > 2)
		{
			vcount = (tTier.length)-2;
		};
		if(tTier == "LH")
		{
			vcount = 1;
		};
	};
	return vcount;
};

function auCrisp_sT(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "H" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "H")
		{
			vcount++;
		};
		if(sr[i] == "H" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "'" && sr[i+3] == "H")
		{
			vcount++;
		};
		if(sr[i] == "L" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "L")
		{
			vcount++;
		};
		if(sr[i] == "L" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "'" && sr[i+3] == "L")
		{
			vcount++;
		};
	};
	return vcount;
};

function auCrisp_sH(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "H" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "H")
		{
			vcount++;
		};
		if(sr[i] == "H" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "'" && sr[i+3] == "H")
		{
			vcount++;
		};
	};
	return vcount;
};

function auCrisp_sL(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "L" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "L")
		{
			vcount++;
		};
		if(sr[i] == "L" && ((sr[i+1] == "-") || (sr[i+1] == ".")) && sr[i+2] == "'" && sr[i+3] == "L")
		{
			vcount++;
		};
	};
	return vcount;
};

function auCrisp_mT(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(isMora(sr[i]) && (sr[i] == moraAfter(i,sr)))
		{
			vcount++;
		};
	};
	return vcount;
};

function auCrisp_mH(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "H" && moraAfter(i,sr) == "H")
		{
			vcount++;
		};
	};
	return vcount;
};

function auCrisp_mL(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "L" && moraAfter(i,sr) == "L")
		{
			vcount++;
		};
	};
	return vcount;
};

function auAFL(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(footLeftEdge(sr,i))
		{
			vcount += au_sCount(sr.substring(0,i));
		};
	};
	return vcount;
};

function auAFR(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(footRightEdge(sr,i))
		{
			vcount += au_sCount(sr.substring(i));
		};
	};
	return vcount;
};

function auInitialFt(ur,sr)
{
	var vcount = 0;
	if(!footLeftEdge(sr,0))
	{
		vcount++;
	};
	return vcount;
};

function auRightmost(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "^")
		{
			for(var j = i+1; j < sr.length; j++)
			{
				if(sr[j] == "'")
				{
					vcount++;
				};
			};
		};
	};
	return vcount;
};

function auParse(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length-1; i++)
	{
		if(sr[i] == "-" && !footLeftEdge(sr,i))
		{
			vcount++;
		};
	};
	return vcount;
};

function au_noLink_H_unparsedM(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length-1; i++)
	{
		if(sr[i] == "-" && !footLeftEdge(sr,i) && moraAfter(i,sr) == "H")
		{
			vcount++;
		};
		if(sr[i] == "-" && !footLeftEdge(sr,i) && (sr[i+1] == "H") && (sr[i+2] == "H"))
		{
			vcount++;
		};
	};
	return vcount;
};

function au_sCount(string)
{
	var sCount = 0;
	for(var i = 0; i < string.length-1; i++)
	{
		if(string[i] == "." || string[i] == "-")
		{
			sCount++;
		};
	};
	return sCount;
};

function au_mTroch(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		//check for iambs
		if(footLeftEdge(sr,i) && sr[i+1] != "'" && sr[i+1] != "^")
		{
			vcount++;
		};
		//check for bad trochees
		if(footLeftEdge(sr,i) && (sr[i+1] == "'" || sr[i+1] == "^"))
		{
			//check for light+heavy trochee
			if(sr[i+3] == "." && isMora(sr[i+4]) && isMora(sr[i+5]))
			{
				vcount++;
			};
			//check for heavy+heavy trochee
			if(sr[i+4] == "." && isMora(sr[i+5]) && isMora(sr[i+6]))
			{
				vcount++;
			};
			//check for heavy+light trochee
			if(sr[i+4] == "." && isMora(sr[i+5]) && sr[i+6] == "-")
			{
				vcount++;
			};
		};
	};
	return vcount;
};

function au_ftBinT(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(footLeftEdge(sr,i))
		{
			var tcount = 0;
			for(var j = i+1; j < sr.length; j++)
			{
				if(isMora(sr[j]) && moraBefore(j,sr) == oppositeT(sr[j]))
				{
					tcount++;
				};
				if(sr[j] == "-")
				{
					break;
				};
			};
			if(tcount > 2)
			{
				vcount++;
			};
		};
	};
	return vcount;
};

//FROM parentheses.html

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function lcountToParen(string,start)
{
	var lcount = 0;
	for(var i = start+1; i < string.length; i++)
	{
		if(isLetter(string[i]))
		{
			lcount++;
		};
		if(string[i] == ")")
		{
			break;
		};
	};
	return lcount;
};

function mmParen(string,min,max)
{
	var allParens = ubParens(string);
	var good = [];
	for(var i = 0; i < allParens.length; i++)
	{
		var cur = allParens[i];
		var curBad = false;
		for(var j = 0; j < cur.length; j++)
		{
			if(cur[j] == "(" && lcountToParen(cur,j) > max)
			{
				curBad = true;
			};
			if(cur[j] == "(" && lcountToParen(cur,j) < min)
			{
				curBad = true;
			};
			if(curBad)
			{
				break;
			};
		};
		if(!curBad)
		{
			good.push(cur);
		};
	};
	return good;
};

function ubParens(s)
{
	var final = [];
	var progress = [s];
	for(var i = 0; i < progress.length; i++)
	{
		var current = progress[i];
		var updates = ubpNextSteps(current);
		for(var j = 0; j < updates.length; j++)
		{
			var examine = updates[j];
			if(ubpFinished(examine))
			{
				final.push(examine);
			}
			else
			{
				progress.push(examine);
			}
		}
	}
	return final;
};

function ubpFinished(s)
{
	var a = false;
	if(ubpSuffix(s) == "")
	{
		var a = true;
	}
	return a;
};

function ubpPrefix(s)
{
	var prefix = "";
	var lcp = lastClosingP(s);
	if(lcp == 0)
	{
		var prefix = "";
	}
	else
	{
		var prefix = s.substring(0,lcp+1);
	};
	return prefix;
};

function ubpSuffix(s)
{
	var suffix = "";
	var left = ubpLeftover(s);
	var lcp = lastClosingP(s);
	if(left == s.length)
	{
		var suffix = s;
	}
	else
	{
		var suffix = s.substring(lcp+1,s.length);
	}
	return suffix;
};

function ubpNextSteps(s)
{
	var a = [];
	var prefix = ubpPrefix(s);
	var suffix = ubpSuffix(s);
	for(var i = 1; i <= suffix.length; i++)
	{
		var psuff = ubpParseNext(suffix,i);
		var word = prefix.concat(psuff);
		a.push(word);
	};
	return a;
};

function lastClosingP(string)
{
	var lcp = 0;
	for(var i = string.length-1; i >= 0; i--)
	{
		var c = string[i];
		if(c == ")")
		{
			var lcp = i;
			break;
		}
	};
	return lcp;
};

//Returns length of unparsed suffix.
function ubpLeftover(s)
{
	var len = s.length;
	var lin = len-1;
	var x = len;
	if(isIn(s,")"))
	{
		var y = lastClosingP(s);
		var x = (lin-y);
	};
	return x;
};

//Parses the next n UNparsed characters in string.
//If there aren't at least n unparsed characters at the end
//of the string, returns string unchanged.
function ubpParseNext(s,n)
{
	var len = s.length;
	var lin = len-1;
	var parsed = s;
	
	//If nothing is parsed yet.
	if(!isIn(s,")"))
	{
		if(n <= len)
		{
			var a = "(".concat(s.substring(0,n));
			var b = a.concat(")").concat(s.substring(n,len))
			var parsed = b;
		}
	}
	
	//If part of s is already parsed.
	if(isIn(s,")"))
	{
		var x = lastClosingP(s);
		var y = x+1;
		if(lin-x == n)
		{
			var a = s.substring(0,y);
			var b = s.substring(y,y+n);
			var c = a.concat("(");
			var d = c.concat(b);
			var parsed = d.concat(")");
		}
		if(lin-x > n)
		{
			var a = s.substring(0,y);
			var b = s.substring(y,y+n);
			var c = s.substring(y+n,len);
			var d = a.concat("(");
			var e = d.concat(b);
			var f = e.concat(")");
			var parsed = f.concat(c);
		}
	}
	
	return parsed;
};

function isIn(x,y)
{
	if(x.indexOf(y) > -1)
	{
		return true;
	}
	else
	{
		return false;
	};
};


//AESTHETIC

//just gives an output list, for copying into OTW; not for internal use
function pulchrify(cset)
{
	var pulchrified = [];
	for(var i = 0; i < cset.length; i++)
	{
		var cur = cset[i][1];
		cur = cur.replace(/-\^H-/g,"(H)");
		cur = cur.replace(/-\^L-/g,"(L)");
		cur = cur.replace(/-\^HH-/g,"(H\.H)");
		cur = cur.replace(/-\^LL-/g,"(L\.L)");
		cur = cur.replace(/-\^HL-/g,"(H\.L)");
		cur = cur.replace(/-\^LH-/g,"(L\.H)");
		cur = cur.replace(/-\^H\.H-/g,"(H\.H)");
		cur = cur.replace(/-\^L\.L-/g,"(L\.L)");
		cur = cur.replace(/-\^H\.L-/g,"(H\.L)");
		cur = cur.replace(/-\^L\.H-/g,"(L\.H)");
		cur = cur.replace(/-/g,"\.");
		pulchrified.push(cur);
	};
	return pulchrified;
};

//FRESH START

function fsGen(string)
{
	var stringMinus = string.substring(2);
	var prep = auPrep(stringMinus);
	var cset = [];
	var cset2 = [];
	for(var i = 0; i < prep.length; i++)
	{
		var cur = auTonify(prep[i]);
		for(var j = 0; j < cur.length; j++)
		{
			if(cur[j] == "'")
			{
				var mained = cur.substring(0,j).concat("^").concat(cur.substring(j+1));
				cset.push([string,mained]);
			};
		};
	};
	for(var i = 0; i < cset.length; i++)
	{
		var cur = cset[i];
		if((cur[1].indexOf("'") == -1) && (auMax(cur[0],cur[1]) == 0) && (auRightmost(cur[0],cur[1]) == 0) && (au_mTroch(cur[0],cur[1]) == 0))
		{
			cset2.push(cur);
		};
	};
	return cset2;
};

function fsAFR(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(footRightEdge(sr,i))
		{
			vcount += au_sCount(sr.substring(i));
		};
	};
	return vcount;
};

function fsAR_hm_T(ur,sr)
{
	var vcount = 0;
	var hmIn = sr.indexOf("^")+1;
	var hm = sr[hmIn];
	var post = sr.substring(hmIn+1);
	if(moraAfter(hmIn,sr) == hm)
	{
		for(var i = 0; i < post.length; i++)
		{
			if(isMora(post[i]))
			{
				vcount++;
			};
			if((post[i] == hm) && (moraAfter(i,post) == oppositeT(hm)))
			{
				break;
			};
		};		
	};
	return vcount;
};

function fsAR_hm_H(ur,sr)
{
	var vcount = 0;
	var hmIn = sr.indexOf("^")+1;
	var hm = sr[hmIn];
	var post = sr.substring(hmIn+1);
	if((post.indexOf("H") > -1) && ((hm == "L") || (moraAfter(hmIn,sr) == "H")))
	{
		for(var i = 0; i < post.length; i++)
		{
			if(isMora(post[i]))
			{
				vcount++;
			};
			if((post[i] == "H") && (moraAfter(i,post) == "L"))
			{
				break;
			};
		};
	};
	return vcount;
};

function fsAR_hm_L(ur,sr)
{
	var vcount = 0;
	var hmIn = sr.indexOf("^")+1;
	var hm = sr[hmIn];
	var post = sr.substring(hmIn+1);
	if((post.indexOf("L") > -1) && ((hm == "H") || (moraAfter(hmIn,sr) == "L")))
	{
		for(var i = 0; i < post.length; i++)
		{
			if(isMora(post[i]))
			{
				vcount++;
			};
			if((post[i] == "L") && (moraAfter(i,post) == "H"))
			{
				break;
			};
		};
	};
	return vcount;
};

function fsAL_hm_T(ur,sr)
{
	var vcount = 0;
	var hmIn = sr.indexOf("^")+1;
	var hm = sr[hmIn];
	var prev = sr.substring(0,hmIn);
	if(moraBefore(hmIn,sr) == hm)
	{
		for(var i = prev.length-1; i >= 0; i--)
		{
			if(isMora(prev[i]))
			{
				vcount++;
			};
			if((prev[i] == hm) && (moraBefore(i,prev) == oppositeT(hm)))
			{
				break;
			};
		};
	};
	return vcount;
};

function fsAL_hm_H(ur,sr)
{
	var vcount = 0;
	var hmIn = sr.indexOf("^")+1;
	var hm = sr[hmIn];
	var prev = sr.substring(0,hmIn);
	if((prev.indexOf("H") > -1) && ((hm == "L") || (moraBefore(hmIn,sr) == "H")))
	{
		for(var i = prev.length-1; i >= 0; i--)
		{
			if(isMora(prev[i]))
			{
				vcount++;
			};
			if((prev[i] == "H") && (moraBefore(i,prev) == "L"))
			{
				break;
			};
		};
	};
	return vcount;
};

function fsAL_hm_L(ur,sr)
{
	var vcount = 0;
	var hmIn = sr.indexOf("^")+1;
	var hm = sr[hmIn];
	var prev = sr.substring(0,hmIn);
	if((prev.indexOf("L") > -1) && ((hm == "H") || (moraBefore(hmIn,sr) == "L")))
	{
		for(var i = prev.length-1; i >= 0; i--)
		{
			if(isMora(prev[i]))
			{
				vcount++;
			};
			if((prev[i] == "L") && (moraBefore(i,prev) == "H"))
			{
				break;
			};
		};
	};
	return vcount;
};

//violated if the last tone in sr is different from the last tone in ur
function anchor_T_right(ur,sr)
{
	var vcount = 0;
	var tTier = getTonalTier(sr);
	var lastT = tTier.slice(-1);
	if((ur[0] == "h") && (lastT == "L"))
	{
		vcount++;
	};
	if((ur[0] == "f") && (lastT == "H"))
	{
		vcount++;
	};
	return vcount;
};

function noContourSyl(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(isMora(sr[i]) && (sr[i+1] == oppositeT(sr[i])))
		{
			vcount++;
		};
	};
	return vcount;
};

//last H is the accent

function accGen(string)
{
	var cset = [];
	var mcount = (string.split("m").length - 1);
	var dset = aStar(["L", "H"],mcount);
	for(var i = 0; i < dset.length; i++)
	{
		var dcur = dset[i];
		for(var j = 2; j < string.length; j++)
		{
			if(string[j] == ".")
			{
				dcur = dcur.substring(0,j-2).concat(".").concat(dcur.substring(j-2));
			};
		};
		for(var k = dcur.length-1; k >= 0; k--)
		{
			if(dcur[k] == "H")
			{
				dcur = dcur.replaceAt(k,"A");
			};
			if((dcur[k-1] == "L") && (moraAfter(k-1,dcur) == "A"))
			{
				break;
			};
		};
		if((dcur.indexOf("A") > -1) && (accMaxT(string,dcur) == 0))
		{
			cset.push([string,dcur]);
		};
	};
	return cset;
};

function accAR_A_w(ur,sr)
{
	var vcount = 0;
	for(var i = sr.length-1; i >= 0; i--)
	{
		if(sr[i] == "A")
		{
			for(var j = i+1; j < sr.length; j++)
			{
				if(isMora(sr[j]))
				{
					vcount++;
				};
			};
			break;
		};
	};
	return vcount;
};

function accAR_H_w(ur,sr)
{
	var vcount = 0;
	for(var i = sr.length-1; i >= 0; i--)
	{
		if(((sr[i] == "A") || (sr[i] == "H")) && (moraAfter(i,sr) == "L"))
		{
			for(var j = i+1; j < sr.length; j++)
			{
				if(isMora(sr[j]))
				{
					vcount++;
				};
			};
		};
	};
	return vcount;
};

function accAR_L_w(ur,sr)
{
	var vcount = 0;
	for(var i = sr.length-1; i >= 0; i--)
	{
		if((sr[i] == "L") && ((moraAfter(i,sr) == "H") || (moraAfter(i,sr) == "A")))
		{
			for(var j = i+1; j < sr.length; j++)
			{
				if(isMora(sr[j]))
				{
					vcount++;
				};
			};
		};
	};
	return vcount;
};

function accAR_T_w(ur,sr)
{
	return accAR_H_w(ur,sr)+accAR_L_w(ur,sr);
};


function accAL_T_w(ur,sr)
{
	return accAL_H_w(ur,sr)+accAL_L_w(ur,sr);
};

//left-alignment
function accAL_H_w(ur,sr)
{
	var vcount = 0;
	for(var i = sr.length-1; i >= 0; i--)
	{
		if(((sr[i] == "A") || (sr[i] == "H")) && (moraBefore(i,sr) == "L"))
		{
			for(var j = i-1; j >= 0; j--)
			{
				if(isMora(sr[j]))
				{
					vcount++;
				};
			};
		};
	};
	return vcount;
};

function accAL_L_w(ur,sr)
{
	var vcount = 0;
	for(var i = sr.length-1; i >= 0; i--)
	{
		if((sr[i] == "L") && (moraBefore(i,sr) == "H"))
		{
			for(var j = i-1; j >= 0; j--)
			{
				if(isMora(sr[j]))
				{
					vcount++;
				};
			};
		};
	};
	return vcount;
};

function accMaxT(ur,sr)
{
	var vcount = 0;
	if((ur[0] == "f") && (moraBefore(sr.length,sr) == "A"))
	{
		vcount++;
	};
	return vcount;
};

//assign a violation if A is not attached to SOME syllable-head (m1 of syl)
function hdLicA(ur,sr)
{
	var vcount = 0;
	var lic = false;
	for(var i = 0; i < sr.length; i++)
	{
		if((sr[i] == ".") && (sr[i+1] == "A"))
		{
			lic = true;
			break;
		};
	};
	if(!lic)
	{
		vcount++;
	};
	return vcount;
};

function accNCS(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "L" && ((sr[i+1] == "H") || (sr[i+1] == "A")))
		{
			vcount++;
		};
		if(sr[i+1] == "L" && ((sr[i] == "H") || (sr[i] == "A")))
		{
			vcount++;
		};
	};
	return vcount;
};

function peakA(ur,sr)
{
	var vcount = 0;
	var acount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "A")
		{
			acount++;
		};
	};
	if(acount > 1)
	{
		vcount = acount-1;
	};
	return vcount;
};


//for Andrew

function hasTgap(sr)
{
	var tg = false;
	for(var i = 0; i < sr.length; i++)
	{
		if((sr[i] == "L") && (sr[i+1] == "m"))
		{
			for(var j = i+2; j < sr.length; j++)
			{
				if(sr[j] == "L")
				{
					tg = true;
				};
				if(sr[j] == "H")
				{
					break;
				};
			};
		};
		if((sr[i] == "H") && (sr[i+1] == "m"))
		{
			for(var j = i+2; j < sr.length; j++)
			{
				if(sr[j] == "H")
				{
					tg = true;
				};
				if(sr[j] == "L")
				{
					break;
				};
			};
		};
	};
	return tg;
};

//every input string is prefixed with 0: or L:
function aaaGen(string)
{
	var iMoras = string.substring(2);
	var preset = aStar(["m", "H", "L"], iMoras.length);
	var cset = [];
	for(var i = 0; i < preset.length; i++)
	{
		var okay = true;
		var cur = preset[i];
		for(var j = 0; j < cur.length; j++)
		{
			if(((string[j] == "H") || (string[j] == "L")) && (string[j] != cur[j]))
			{
				okay = false;
				break;
			};
		};
		if(okay && !hasTgap(cur))
		{
			cset.push([string,cur]);
		};
	};
	return cset;
};

function aaaIdT(ur,sr)
{
	var vcount = 0;
	var clip = ur.substring(2);
	for(var i = 0; i < clip.length; i++)
	{
		if((clip[i] == "H" || clip[i] == "L") && clip[i] != sr[i])
		{
			vcount++;
		};
	};
	return vcount;
};

function aaaMaxT(ur,sr)
{
	var vcount = 0;
	var srTT = getTonalTier(sr);
	var urTT = getTonalTier(ur);
	if(srTT.length <= urTT.length)
	{
		if((srTT.length == urTT.length) && (srTT[0] != urTT[0]))
		{
			vcount++;
		};
		if(srTT.length < urTT.length)
		{
			
		};
	};
};

function getAllSubstrings(str) {
  var i, j, result = [];

  for (i = 0; i < str.length; i++) {
      for (j = i + 1; j < str.length + 1; j++) {
          result.push(str.slice(i, j));
      }
  }
  return result;
};