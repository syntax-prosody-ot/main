/* Assign a violation for every node whose leftmost daughter constituent is of type k
*  and is lower in the prosodic hierarchy than its sister constituent immediately to its right: *(Kn Kn-1)
*  Elfner's StrongStart.
*/

function strongStart_Elfner(s, ptree, k){
	console.log("strongStart_Elfner call");

	//base case: ptree is a leaf or only has one child
	if((!ptree.children) || (ptree.children.length<2)){
		return 0;
	}

	//recursive case: ptree dominates at least two nodes
	var vcount = 0;
	var leftmostCat = ptree.children[0].cat;
	var sisterCat = ptree.children[1].cat;
	
	//console.log(leftmostCat);
	//console.log(sisterCat);
	//console.log(pCat.isLower(leftmostCat, sisterCat));

	if((leftmostCat === k) && (pCat.isLower(leftmostCat, sisterCat)))
	{
		vcount++;
		//console.log("strongStart_Elfner violation: "+ptree.children[0]+" "+ptree.children[1]);
	}
	
	for(var i=0; i<ptree.children.length; i++){
		child = ptree.children[i];
		vcount += strongStart_Elfner(s, child, k);
	}
	
	return vcount;
}
