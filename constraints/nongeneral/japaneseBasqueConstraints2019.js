function equalSistersAdj_2(s, pparent, c){
	var vCount = 0;
	if(pparent.children && pparent.children.length)
	//pTree is non-terminal
	{
		for(var i=0; i < pparent.children.length; i++){
			var child = pparent.children[i];
			if(i<pparent.children.length-1)
			{
				var sister = pparent.children[i+1];
				if(child.cat != sister.cat)
				{
					if(hasPhiChild(child) && !hasPhiChild(sister))
					{
						vCount++;
					};
					if(!hasPhiChild(child) && hasPhiChild(sister))
					{
						vCount++;
					};
				}
			}
			vCount += equalSistersAdj_2(s, child, c);
		}
	}
	return vCount;
}
	
function hasPhiChild(p)
{
	var answer = false;
	if(p.children && p.children.length)
	{
		for(var i = 0; i < p.children.length; i++)
		{
			var child = p.children[i];
			if(child.cat == "phi")
			{
				var answer = true;
				break;
			};
		};
	};
	return answer;
}

//This will only work properly
//if the only CP node in the tree is the ROOT node!
//It will also work if the tree is just rooted in XP.
function matchXPmax(sParent, pTree, sCat)
{
	var vcount = 0;
	if((sParent.cat === 'xp') && !hasMatch(sParent, pTree)){
		vcount++;
		logreport.debug("\tVIOLATION: "+sParent.id+" has no match!");
	}
	if(((sParent.cat === 'cp') || (sParent.cat === 'clause')) && sParent.children && sParent.children.length)
	{
		for(var i = 0; i  < sParent.children.length; i++)
		{
			var child = sParent.children[i];
			if((child.cat === 'xp') && !hasMatch(child, pTree))
			{
				vcount++;
			};
		};
	};
	return vcount;
}
	
function noPostAccW(s, pParent, c){
	var vCount = 0;
	if(pParent.children && pParent.children.length)
	{
		for(var i=0; i < pParent.children.length; i++){
			var child = pParent.children[i];
			if((i<pParent.children.length-1) && hasAccFeature(child))
			{
				var sister = pParent.children[i+1];
				if(sister.cat == "w")
				{
					vCount++;
				}
			}
			vCount += noPostAccW(s, child, c);
		}
	}
	return vCount;
}
		
function hasAccFeature(pTree)
{
	var a = false;
	var leaves = getLeaves(pTree);
	if(!pTree.children)
	{
		if(pTree.accent == "a")
		{
			var a = true;
		};
	};
	for(var i = 0; i < leaves.length; i++)
	{
		var leaf = leaves[i];
		//I'm being lazy and assuming accent is already specified! Should change this later.
		if(leaf.accent == "a")
		{
			var a = true;
			break;
		};
	};
	return a;
}

function matchPS_nmin(sTree, pParent, pCat)
{
	return matchSP_nmin(pParent, sTree, pCat);
}

function matchSP_nmin(sParent, pTree, sCat)
{
	if(sParent.cat === sCat)
		logreport.debug("\tSeeking match for "+sParent.id + " in tree rooted in "+pTree.id);
	var vcount = 0;

	if((sParent.cat === sCat) && !hasMatch(sParent, pTree)){
		if(sParent.children.length >= 2)
		{
			vcount++;
			logreport.debug("\tVIOLATION: "+sParent.id+" has no match!");
		}
	}

	if(sParent.children){	
		for(var i = 0; i < sParent.children.length; i++)
		{
			var sChild = sParent.children[i];
			vcount += matchSP_nmin(sChild, pTree, sCat);
		}
	}
	return vcount;
}