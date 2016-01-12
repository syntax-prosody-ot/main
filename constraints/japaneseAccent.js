
/*
Defined in Ito & Mester (2013) as: "Every accented word must be the head of a (minimal) phi
Assign a violation for each prosodic word that is not the head of a minimal phi."

Operationalized as:
For each phi, look at all children. If at least one child is a phi, then the current node is a non-minimal phi, 
so assign a violation for every A (= w [+accent]) in the array of children. 
If no child is a phi, let aCount = the number of A in the children array, and assign (aCount-1) violations."

Notes:
- Assumes accent as a separate attribute of a word. TODO fix Gen do add this; currently testing by assuming accent is specified in word id. ex. a_1, a_2, u_3
- As currently implemented, assumes no recursive phonological words.
*/


function accentAsHead(s, p, c){
	var vCount = 0;
	var child;
	
	//Base case: p is a leaf.
	if(!p.children || !p.children.length)
		return vCount;
	
	//Recursive case: p is a non-leaf.
	
	
	var aCount = 0;
	for(i=0; i<p.children.length; i++){
		child = p.children[i];
		if(!child.accent){
			child.accent = child.id.split('_')[0]	//If accent isn't defined, try to get it from the node's id.
		}
		
		//if an accented word is discovered...
		if(child.cat==="w" && child.accent==="a"){
			aCount++;
			//console.log("child.id ("+child.id+") is an accented word. aCount = "+aCount);
		}
		
		vCount += accentAsHead(s,child,c);
	}
		
	// Case 1: p is a minimal phi. Assign a violation for every accented word except the first
	// by incrementing the violation count by one less than the total number of accented words (or 0 if there are none).
	if((p.cat==="phi") && isMinimal(p) && aCount>0){
		vCount += (aCount-1);
	}
	
	// Case 2: p is not a minimal phi (i.e. it's an iota, non-minimal phi, or w)
	// 			-> Assign a violation for every accented word. 
	else
		vCount += aCount;
	
	return vCount;
}

/*
Defined in Ito&Mester(2013) as: "No accentual lapse. Assign a violation for every fully L-toned w."

Operationalized as: 
"For every U (= w[-accent]), assign a violation if U is non-initial (i.e. index of U in the children array > 0) and preceded by A in phi (i.e. there is an A in the children array with index greater than indexOf(U))."

TODO find out if there is an accent for the beginning of iota -- i.e. should the initial U *not* receive a violation as well...???

ANSWER: Assuming words can be immediately dominated by intonational phrases (i.e. violable Exhaustivity):

	iota( U ... ) : If the U receives a high tone by virtue of being at the left edge of the iota, 
	then it shouldn't receive a violation. (Otherwise, it should.) =====> Seems correct. [*Which* does????]

	iota( phi(U) U ) : What about a U immediately dominated by iota that is preceded by 
	a U that receives a high tone by virtue of being first in a phi?
	======> There would be no fall, hence no violation of NoLapse-L.

	iota( phi(A) U ) : We assume the U here does receive a violation (i.e. is all L's) since the A contributes a fall.
	======> Yes, that sounds right.

	For each phi, assign a violation for every U that is a) non-initial b) preceded an A (within the maximal phi).

*/
function noLapseL(s, p, c){
	if(!p.children || !p.children.length)
	{
		return 0;
	}
	
	var vCount = 0;
	
	for(var i=0; i<p.children.length; i++){
		//Case 1: we're in a phi
		if(p.c==="phi"){
		
		}
		
		//Case 2: we're in an iota
		//Case 3: we're in a recursive w??
	}
	
	return vCount;
}
