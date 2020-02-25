/****************
* Function that implements ExhaustivityParent, version 1:
* "Assign a violation per every parent-child pair (x,y) such that x is of PH-level n and y is of PH-level n-m, m >= 2."
* Assigns violations based on distance between categories on PH, but otherwise category-insensitive.
* "Vertically categorical"; greater distance between parent and child on PH does not result in higher vcount.
******************/

function exhaustParent(s, ptree){
//Assumes trees that obey Layering.
	
	//Base case: if parent is a terminal, return 0 violations.
	if (!ptree.children){
		return 0;
	}
	
	//Recursive case: if parent is non_terminal, find out if there are any violations in each of the subtrees rooted in its children.

	if(ptree.children && ptree.children.length){
		var vcount = 0;
		var child;
		for (var i=0; i < ptree.children.length; i++){
			child = ptree.children[i];
			if (ptree.cat!==child.cat && pCat.nextLower(ptree.cat)!==child.cat){
				vcount++;
			}
			vcount += exhaustParent(s, child);
			//exhaust(s, child);
		}
		if (vcount > 0){
			return 1;
		}
		else{
			return vcount;
		}
		
	}
};