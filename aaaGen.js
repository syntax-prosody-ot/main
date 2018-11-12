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
	if((x == "H") || (x == "L") || (x == "m"))
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
		if(okay)
		{
			cset.push([string,cur]);
		};
	};
	return cset;
};