//HELPER FUNCTIONS

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

function reverse(str){
  let reversed = "";    
  for (var i = str.length - 1; i >= 0; i--){        
    reversed += str[i];
  }    
  return reversed;
};

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

function getTonalTier(sr)
{
	var tTier = sr[0];
	for(var i = 1; i < sr.length; i++)
	{
		if(sr[i] != sr[i-1])
		{
			tTier = tTier.concat(sr[i]);
		};
	};
	return tTier;
};

//GEN

function aaaGen(ur)
{
	var mUr = ur.substring(2);
	if(ur[0] == "0")
	{
		var preset = aStar(["H", "L", "m", "X", "Y"], mUr.length);
	};
	if(ur[0] == "W")
	{
		var preset = aStar(["H", "L", "m", "W", "X", "Y"], mUr.length);
	};
	var cset = [];
	for(var i = 0; i < preset.length; i++)
	{
		var okay = true;
		var cur = preset[i];
		//check for H-gap
		if(/[HX]m+[HX]/.test(cur))
		{
			okay = false;
		};
		//check for L-gap
		if(/[LWY]m+[LWY]/.test(cur))
		{
			okay = false;
		};
		//check for W-doubling
		if(/W[HLmXY]+W/.test(cur))
		{
			okay = false;
		};
		//check for X-doubling
		if(/X[HLMWY]+X/.test(cur))
		{
			okay = false;
		};
		//check for Y-doubling
		if(/Y[HLmWX]+Y/.test(cur))
		{
			okay = false;
		};
		//no W after X or Y
		if(/[XY].*W/.test(cur))
		{
			okay = false;
		};
		//no X after Y
		if(/Y.*X/.test(cur))
		{
			okay = false;
		};
		//no HX
		if(/HX/.test(cur))
		{
			okay = false;
		};
		//no XH
		if(/XH/.test(cur))
		{
			okay = false;
		};
		//no L[YW]
		if(/L[YW]/.test(cur))
		{
			okay = false;
		};
		//no [YW]L
		if(/[YW]L/.test(cur))
		{
			okay = false;
		};
		
		//IDENTITY FILTER
		if(aaaIdentT(ur,cur) > 0)
		{
			okay = false;
		};
		
		if(okay)
		{
			cset.push([ur,cur]);
		};
	};
	return cset;
};

//CON

function aaaAlignLeftH(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(((sr[i] == "L") || (sr[i] == "W") || (sr[i] == "Y") || (sr[i] == "m")) && (sr[i+1] == "H" || sr[i+1] == "X"))
		{
			vcount += i+1;
		};
	};
	return vcount;
};

function aaaAlignLeftL(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(((sr[i] == "m") || (sr[i] == "H") || (sr[i] == "X")) && ((sr[i+1] == "L") || (sr[i+1] == "W") || (sr[i+1] == "Y")))
		{
			vcount += i+1;
		};
	};
	return vcount;
};

function aaaAlignLeftT(ur,sr)
{
	return aaaAlignLeftL(ur,sr)+aaaAlignLeftH(ur,sr);
};

function aaaAlignRightH(ur,sr)
{
	var rSr = reverse(sr);
	return aaaAlignLeftH(ur,rSr);
};

function aaaAlignRightL(ur,sr)
{
	var rSr = reverse(sr);
	return aaaAlignLeftL(ur,rSr);
};

function aaaAlignRightT(ur,sr)
{
	return aaaAlignRightL(ur,sr)+aaaAlignRightH(ur,sr);
};

function aaaNoMultiLinkH(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(((sr[i] == "H") || (sr[i] == "X")) && ((sr[i+1] == "H") || (sr[i+1] == "X")))
		{
			vcount++;
		};
	};
	return vcount;
};

function aaaNoMultiLinkL(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(((sr[i] == "L") || (sr[i] == "W") || (sr[i] == "Y")) && ((sr[i+1] == "L") || (sr[i+1] == "W") || (sr[i+1] == "Y")))
		{
			vcount++;
		};
	};
	return vcount;
};

function aaaNoMultiLinkT(ur,sr)
{
	return aaaNoMultiLinkL(ur,sr)+aaaNoMultiLinkH(ur,sr);
};

function aaaSpec(ur,sr)
{
	var vcount = 0;
	for(var i = 0; i < sr.length; i++)
	{
		if(sr[i] == "m")
		{
			vcount++;
		};
	};
	return vcount;
};

function aaaMaxH(ur,sr)
{
	var vcount = 0;
	if((ur.indexOf("X") > -1) && (sr.indexOf("X") == -1))
	{
		vcount++;
	};
	return vcount;
};

function aaaMaxL(ur,sr)
{
	var vcount = 0;
	if((ur.indexOf("W") > -1) && (sr.indexOf("W") == -1))
	{
		vcount++;
	};
	if((ur.indexOf("Y") > -1) && (sr.indexOf("Y") == -1))
	{
		vcount++;
	};
	return vcount;
};

function aaaMaxT(ur,sr)
{
	var vcount = 0;
	if((ur.indexOf("W") > -1) && (sr.indexOf("W") == -1))
	{
		vcount++;
	};
	if((ur.indexOf("X") > -1) && (sr.indexOf("X") == -1))
	{
		vcount++;
	};
	if((ur.indexOf("Y") > -1) && (sr.indexOf("Y") == -1))
	{
		vcount++;
	};
	return vcount;
};

function aaaDepH(ur,sr)
{
	var vcount = 0;
	var srTT = getTonalTier(sr);
	for(var i = 0; i < srTT.length; i++)
	{
		if(srTT[i] == "H")
		{
			vcount++;
		};
	};
	return vcount;
};

function aaaDepL(ur,sr)
{
	var vcount = 0;
	var srTT = getTonalTier(sr);
	for(var i = 0; i < srTT.length; i++)
	{
		if(srTT[i] == "L")
		{
			vcount++;
		};
	};
	return vcount;
};

function aaaDepT(ur,sr)
{
	var vcount = 0;
	var srTT = getTonalTier(sr);
	for(var i = 0; i < srTT.length; i++)
	{
		if((srTT[i] == "H") || (srTT[i] == "L"))
		{
			vcount++;
		};
	};
	return vcount;
};

function aaaIdentT(ur,sr)
{
	var vcount = 0;
	var mUr = ur.substring(2);
	for(var i = 0; i < mUr.length; i++)
	{
		if((mUr[i] != "m") && (mUr[i] != sr[i]))
		{
			vcount++;
		};
	};
	return vcount;
};