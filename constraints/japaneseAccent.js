
/*
Defined in Ito & Mester (2013) as: "Every accented word must be the head of a (minimal) phi
Assign a violation for each prosodic word that is not the head of a minimal phi."

Operationalized as:
For each node, look at all children. If at least one child is a phi, then assign a violation for every A (= w [+accent]) in the array of children. 
If no child is a phi, let aCount = the number of A in the children array, and assign (aCount-1) violations."

Notes:
- Assumes accent as a separate attribute of a word. TODO fix Gen do add this; currently testing by assuming accent is specified in word id. ex. a_1, a_2, u_3
- As currently implemented, assumes no recursive phonological words.
*/
var accentCalls = 0;

function accentAsHead(s, p, c){
	var vCount = 0;
	var child;
	accentCalls++;	
	// look at all non-terminal nodes
	if(p.children && p.children.length){
		// is one of the children a phi?
		var hasPhi = false;
		for(var i=0; i<p.children.length; i++){
			child = p.children[i];
			if(child.cat=="phi")
			{
				hasPhi = true;
				vCount += accentAsHead(s, child, c);
			}
		}
		
		// if there is a phi in the current children array
		if(hasPhi){
			for(i=0; i<p.children.length; i++){
				child = p.children[i];
				child.accent = child.id.split('_')[0]	//for testing while Gen hasn't been modified to include accents!
				if(child.cat=="w" && child.accent=="a"){
					vCount++;
					console.log("child.id ("+child.id+") is an accented word that isn't a head. vCount = "+vCount);
				}
			}
		}
		// no phi in the current children array
		else{
			var aCount = 0;
			for(i=0; i<p.children.length; i++){
				child = p.children[i];
				child.accent = child.id.split('_')[0]	//for testing while Gen hasn't been modified to include accents!
				if(child.cat==="w" && child.accent==="a"){
					aCount++;
					//console.log("child.id ("+child.id+") is an accented word. aCount = "+aCount);
				}
			}
			vCount += (aCount-1);
		}
	}
	
	return vCount;
}

/*
Defined in Ito&Mester(2013) as: "No accentual lapse. Assign a violation for every fully L-toned w."

Operationalized as: 
"For every U (= w[-accent]), assign a violation if U is non-initial (i.e. index of U in the children array > 0) and preceded by A in phi (i.e. there is an A in the children array with index greater than indexOf(U))."

For each iota, assign a violation for every immediately dominated U. TODO find out if there is an accent for the beginning of iota -- i.e. should the initial U *not* receive a violation as well...???
For each phi, assign a violation for every U that is a) non-initial b) preceded an A (within the maximal phi).

*/
function lapse(s, p, c){
	if(!p.children || !p.children.length)
	{
		return 0;
	}
	
	var vCount = 0;
	
	for(var i=0; i<p.children.length; i++){
		
	}
	
	return vCount;
}
