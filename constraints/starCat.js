//Assign a violation for every node of category c in p.
//Truckebrodt (1995, 1999): *phi
function starCat(s, p, c){
	var occurances = 0;
	if (p.cat === c){
		occurances ++;
	};
	if (p.children){
		for (var i = 0; i < p.children.length; i ++){
			var child = p.children[i];
			occurances += starCat(s, child, c);
		}
	};
	return occurances;
}