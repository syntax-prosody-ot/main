/********************
* Some implementations of EqualSisters (Myrberg 2013)
* Myrberg introduces this constraint but doesn't actually define 
* how to count violations if there are more than 2 sisters.
* TODO does the degree of prosodic inequality make a difference to the severity of the violation?
*********************/

/* EqualSisters: looks at the category of the first sister, and assigns a violation 
* for every one of its sisters that doesn't share its category
* A definition probably no one wants but which is not ruled out by the "definitions" that appear in papers
* Markedness only -- just looks at prosody
* s and c are just there to fill out the argument structure for tableau-izing purposes.
*/
function equalSistersFirstPrivilege(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		var cat1 = parent.children[0].cat;
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(child.cat != cat1)
			{
				logreport.debug("\tVIOLATION: "+child.id+" and "+parent.children[0].id+" are unequal.");
				vCount++;
			}
			vCount += equalSistersFirstPrivilege(s, child, c);
		}
	}
	return vCount;
}

/*EqualSisters: assigns a violation for every (unordered) pair of sisters whose categories don't match
* Probably no one wants this version, either. Predicts "majority rules" effects.
* Markedness only -- just looks at prosody
* s and c are just there to fill out the argument structure for tableau-izing purposes.
*/

function equalSistersPairwise(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		var sisters = parent.children;
		for(var i=0; i < sisters.length; i++){
			var child = sisters[i];
			for(var j=i; j < sisters.length; j++){
				var sister = sisters[j];
				if(child.cat != sister.cat)
				{
					logreport.debug("\tVIOLATION: "+child.id+" and "+sister.id+" are unequal.");
					vCount++;
				}
			}
			vCount += equalSistersPairwise(s, child, c);
		}
	}
	return vCount;
}

//EqualSisters: assigns a violation for every pair of adjacent sister nodes that are not of the same prosodic category
//This is probably the version that actually makes sense.
//Markedness only -- just looks at prosody
//s and c are just there to fill out the argument structure for tableau-izing purposes.
function equalSistersAdj(s, parent, c){
	var vCount = 0;
	if(parent.children && parent.children.length)
	//pTree is non-terminal
	{
		logreport.debug("\tchecking equality of children of "+parent.id);
		for(var i=0; i < parent.children.length; i++){
			var child = parent.children[i];
			if(i<parent.children.length-1)
			{
				var sister = parent.children[i+1];
				if(child.cat != sister.cat)
				{
					logreport.debug("\tVIOLATION: "+child.id+" and "+sister.id+" are unequal.");
					vCount++;
				}
			}
			vCount += equalSistersAdj(s, child, c);
		}
	}
	return vCount;
}