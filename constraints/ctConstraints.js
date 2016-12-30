function isInArray(myArray, x)
{
	var answer = false;
	for(var i = 0; i < myArray.length; i++)
	{
		if(x == myArray[i])
		{
			answer = true;
		}
	}
	return answer;
};

function getNodes(myTree)
{
	var nodes = [];
	nodes.push(myTree);
	if(myTree.children && myTree.children.length)
	{
		for(var x = 0; x < myTree.children.length; x++)
		{
			var xNodes = getNodes(myTree.children[x]);
			for(var y = 0; y < xNodes.length; y++)
			{
				nodes.push(xNodes[y]);
			}
		}
	}
	return nodes;
};

// x immediately dominates y
function imDom(x,y)
{
	var check = false;
	if(x.children && x.children.length)
	{
		for(var i = 0; i < x.children.length; i++)
		{
			var currentKid = x.children[i];
			if(currentKid == y)
			{
				var check = true;
			}
		}
	};
	return check;
};

// Intended to replace imDom
function isParentOf(x,y){
	return (x.children || []).indexOf(y) >= 0;
}

//Returns parent of goal-node in within tree, if one exists. Else returns false.
function getParent(myTree,goal)
{
	var par = false;
	if(imDom(myTree, goal) == true)
	{
		par = myTree;
	}
	else
	{
		if(myTree.children && myTree.children.length)
		{
			for(var j = 0; j < myTree.children.length; j++)
			{
				var nextNode = myTree.children[j];
				if(getParent(nextNode, goal) != "")
				{
					par = getParent(nextNode, goal);
				}
			}
		}
	}
	return par;
};

//Returns the non-silent terminals c-commanded by node x within tree.
function commands(myTree,x)
{
	var domain = [];
	var xParent = getParent(tree,x);
	if(hasParent(myTree,x) && (xParent.children.length > 1))
	{
		for(var i = 0; i < xParent.children.length; i++)
		{
			var current = xParent.children[i];
			if(current != x)
			{
				var currentNodes = getNodes(current);
				for(var j = 0; j < currentNodes.length; j++)
				{
					var z = currentNodes[j];
					if(!z.silent && !z.children)
					{
						domain.push(z);
					}
				}
			}
		}
	};
	return domain;
};

function hasParent(myTree, x)
{
	if(getParent(myTree, x) == "false")
	{
		return false;
	}
	else
	{
		return true;
	}
};

function getPhis(pTree)
{
	var phiArray = [];
	var nodes = getNodes(pTree);
	for(var i = 0; i < nodes.length; i++)
	{
		var current = nodes[i];
		if(current.cat == "phi")
		{
			phiArray.push(current);
		}
	};
	return phiArray;
};

function phiMates(ptree,x,y)
{
	var answer = false;
	var phis = getPhis(ptree);
	for(var i = 0; i < phis.length; i++)
	{
		var currentPhi = phis[i];
		var nodes = currentPhi.children;
		var hasX = false;
		var hasY = false;
		for(var j = 0; j < nodes.length; j++)
		{
			var k = nodes[j];
			if(k.id == x.id)
			{
				var hasX = true;
			}
			if(k.id == y.id)
			{
				var hasY = true;
			}
			if(hasX && hasY)
			{
				break;
			}
		};
		if(hasX && hasY)
		{
			var answer = true;
			break;
		}
	};
	return answer;
};

function sharePhi(ptree,x,y)
{
	var answer = false;
	var phis = getPhis(ptree);
	for(var i = 0; i < phis.length; i++)
	{
		var currentPhi = phis[i];
		var nodes = getNodes(currentPhi);
		var hasX = false;
		var hasY = false;
		for(var j = 0; j < nodes.length; j++)
		{
			var k = nodes[j];
			if(k.id == x.id)
			{
				var hasX = true;
			}
			if(k.id == y.id)
			{
				var hasY = true;
			}
			if(hasX && hasY)
			{
				break;
			}
		};
		if(hasX && hasY)
		{
			var answer = true;
			break;
		}
	};
	return answer;
};

function group(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var currentLeaf = sLeaves[i];
		var comSet = commands(sTree,currentLeaf);
		for(var j = 0; j < comSet.length; j++)
		{
			var currentCommandee = comSet[j];
			if(!sharePhi(pTree,currentLeaf,currentCommandee))
			{
				vcount++;
			}
		}
	}
	return vcount;
};

function groupMin(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var currentLeaf = sLeaves[i];
		var comSet = commands(sTree,currentLeaf);
		for(var j = 0; j < comSet.length; j++)
		{
			var currentCommandee = comSet[j];
			if(!phiMates(pTree,currentLeaf,currentCommandee))
			{
				vcount++;
			}
		}
	}
	return vcount;
};

//Assumes x is a non-silent leaf. Returns next non-silent leaf.
function nextLeaf(tree,x)
{
	var next = [];
	var leaves = getLeaves(tree);
	for(var i = 0; i < leaves.length-1; i++)
	{
		if(leaves[i] == x)
		{
			var j = leaves[i+1];
			next.push(j);
			break;
		}
	}
	return next;
};

//NB: ASSUMES x AND y ARE TERMINALS! Will return false if one of the nodes is non-terminal, even if it actually c-commands the other.
function mutualNonCommand(tree,x,y)
{
	var cx = commands(tree,x);
	var cy = commands(tree,y);
	if(!isInArray(cx,y) && !isInArray(cy,x))
	{
		return true;
	}
	else
	{
		return false;
	};
};

function splitNMC(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var current = sLeaves[i];
		if(nextLeaf(sTree,current).length)
		{
			var next = nextLeaf(sTree,current)[0];
			if(mutualNonCommand(sTree,current,next) && sharePhi(pTree,current,next))
			{
				vcount++;
			}
		}
	}
	return vcount;
};

function splitNMCmin(sTree,pTree)
{
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	for(var i = 0; i < sLeaves.length; i++)
	{
		var current = sLeaves[i];
		if(nextLeaf(sTree,current).length)
		{
			var next = nextLeaf(sTree,current)[0];
			if(mutualNonCommand(sTree,current,next) && phiMates(pTree,current,next))
			{
				vcount++;
			}
		}
	}
	return vcount;
};
