//Modifications:
//8-28-2020 Edward Shingler created functions ["notMutualCommand","dominates","pairExists","areAdjacent"] and constraints ["ccPhi","antiCCPhi","mutualSplit"]
//These constraints take an boolean argument called "adjacent" defaulted to false. If true, then each function only looks at adjacent words that would cause violations.

//DON'T FORGET TO INCLUDE ADJACENCY FOR ccPhi, antiCCPhi, mutualSplit
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
	var xParent = getParent(myTree,x);
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

function phiMates(ptree,cat,x,y)
{
	var answer = false;
	var phis = getDescendentsOfCat(ptree,cat);
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

function sharePhi(ptree,cat,x,y)
{
	var answer = false;
	var phis = getDescendentsOfCat(ptree,cat);
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

function dominates(node,x)
{
	var check = false;
	if(node.children && node.children.length)
	{
		for(var i = 0; i < node.children.length; i++)
		{
			var currentKid = node.children[i];
			if(currentKid.id == x.id)
			{
				var check = true;
				break;
			}
			else
			{
				var check = dominates(currentKid,x);
				if(check==true){break;};
			}
		}
	};
	return check;
};

//Assigns a violation for each c-pair whose elements do not reside together in at least one phi.
function group(sTree,pTree,cat,options)
{
	options = options || {};
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	cPairs = [];
	for(var i = 0; i < sLeaves.length; i++)
	{
		var currentLeaf = sLeaves[i];
		var comSet = commands(sTree,currentLeaf);
		for(var j = 0; j < comSet.length; j++)
		{
			if(!pairExists(cPairs, currentLeaf, comSet[j]))
			{
				if(!options.requireAdjacent || areAdjacent(sTree, currentLeaf, comSet[j], options))
				{
					cPairs.push([currentLeaf, comSet[j]]);
				}
			}
		}
	};
	for(var i = 0; i < cPairs.length; i++)
	{
		if(options.requireMin && !phiMates(pTree,cat,cPairs[i][0],cPairs[i][1]))
		{

		} else if(!sharePhi(pTree,cat,cPairs[i][0],cPairs[i][1]))
		{
			vcount++;
		}
	};
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

//Returns true if EITHER node does not command the other.
function notMutualCommand(tree,x,y)
{
	var cx = commands(tree,x);
	var cy = commands(tree,y);
	if(!isInArray(cx,y) || !isInArray(cy,x))
	{
		return true;
	}
	else
	{
		return false;
	};
};

//Checks if two leaves are adjacent
function areAdjacent(tree, x, y)
{
	if(nextLeaf(tree,x)[0]==y || nextLeaf(tree,y)[0]==x)
	{
		return true;
	};
	return false;
};

//Checks if an array has a pair of items
function pairExists(pairs, x, y)
{
			var check = false;
			for(var t = 0; t < pairs.length; t++)
			{
				var hasX = false;
				var hasY = false;
				for(var q = 0; q < pairs[t].length; q++)
				{
					if(x == pairs[t][q])
					{
						var hasX = true;
					}
					if(y == pairs[t][q])
					{
						var hasY = true;
					}
					if(hasX && hasY)
					{
						var check = true;
						return check;
					}
				}
			}
			return false;
};

//Reflects CC-ϕ constraint (Kalivoda 2018). Argument "adjacent" refers to whether or not violations apply to only adjacent words or words throughout the tree.
//cPair order is reversible, so is situations where two leaves mutually command, there is only one cPair.
//if adjacent == true then violations are only added if it occurs between adjacent words. This is reflective of Kalivoda (2018) constraint wording, but Kalivoda has expressed uncertainty about the significance of this adjacency specification.
function ccPhi(sTree,pTree,cat,options)
{
	options = options || {};
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	var phis = getDescendentsOfCat(pTree,cat);
	cPairs = [];
	//Create list of c-pairs
	for(var i = 0; i < sLeaves.length; i++)
	{
		var currentLeaf = sLeaves[i];
		var comSet = commands(sTree,currentLeaf);
		for(var j = 0; j < comSet.length; j++)
		{
			if(!pairExists(cPairs, currentLeaf, comSet[j]))
			{
				if(!options.requireAdjacent || areAdjacent(sTree, currentLeaf, comSet[j]))
				{
					cPairs.push([currentLeaf, comSet[j]]);
				}
			}
		}
	};
	//Assign violations based on c-pairs
	for(var k = 0; k < cPairs.length; k++)
	{
		for(var p = 0; p < phis.length; p++)
		{
			if(dominates(phis[p], cPairs[k][0]) && !dominates(phis[p], cPairs[k][1]))
			{
				vcount++;
			}
			if(!dominates(phis[p], cPairs[k][0]) && dominates(phis[p], cPairs[k][1]))
			{
				vcount++;
			}
		}
	};
	return vcount;
};

//Reflects ANTI-CC-ϕ constraint (Kalivoda 2018). Differs from MutualSplit in that violations apply when two nodes are mutually non-commanding. This is checked by the "mutualNonCommand" function, the only distinction between the two constraints.
//nonCPairs order is reversible, so is situations where two leaves mutually command, there is only one cPair.
function antiCCPhi(sTree,pTree,cat,options)
{
	options = options || {};
	var vcount = 0;
	var sLeaves = getLeaves(sTree);
	var phis = getDescendentsOfCat(pTree,cat);
	nonCPairs = [];
	for(var i = 0; i < sLeaves.length; i++)
	{
		for(var p = 0; p < sLeaves.length; p++)
		{
			if(sLeaves[i] != sLeaves[p] && !pairExists(nonCPairs, sLeaves[i], sLeaves[p]) 
			&& !(options.requireStrict && !notMutualCommand(sTree, sLeaves[i], sLeaves[p]))
			&& !(!options.requireStrict && !mutualNonCommand(sTree, sLeaves[i], sLeaves[p])))
			{
				if(!options.requireAdjacent || areAdjacent(sTree, sLeaves[i], sLeaves[p]))
				{
					nonCPairs.push([sLeaves[i], sLeaves[p]]);
				}
			}
		}
	};
	for(var k = 0; k < nonCPairs.length; k++)
	{
		var splitx = false;
		var splity = false;
		for(var p = 0; p < phis.length; p++)
		{
			if(dominates(phis[p], nonCPairs[k][0]) && !dominates(phis[p], nonCPairs[k][1]))
			{
				splitx = true;
			}
			if(!dominates(phis[p], nonCPairs[k][0]) && dominates(phis[p], nonCPairs[k][1]))
			{
				splity = true;
			}
		}
		if(!splitx)
		{
			vcount++;
		}
		if(!splity)
		{
			vcount++;
		}
	};
	return vcount;
	return vcount;
};