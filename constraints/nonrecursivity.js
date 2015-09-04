/****************
* Function that implements Nonrecursivity, version 1:
* "Assign a violation for every node of category x dominated 
* by another node of category x"
******************/

function nonRec1(s, parent, cat){
//Assumes trees that obey Layering.
	
	//Base case: if parent is a terminal, return 0 violations.
	if (!parent.children){
		return 0;
	}
	
	//Recursive case: if parent is non_terminal, find out how many violations are in each of the subtrees rooted in its children
	var vcount = 0;
	var child;
	
	for (var i=0; i < parent.children.length; i++){
		child = parent.children[i];
		if (parent.cat===cat && child.cat===cat){
			vcount++;
		}		
		vcount+=nonRec1(child, cat);
	}
	return vcount;
}
