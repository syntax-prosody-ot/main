/*TRUCKENBRODT-STYLE BINARITY for the maximal prosodic category*/
// After Nick Van Handel's SPOT2 presentation

//Parent-category-neutral version of:
//Sandalo & Truckenbrodt 2002: "Max-Bin: P-phrases consist of maximally two prosodic words"
//Assigns a violation for every node in ptree that dominates more than two prosodic words.
function binMax2Words_maxPCat(s, ptree, cat){
	
	function binMax_maxPCat_inner(ptree, cat, parentCat){
		var vcount = 0;
		if(ptree.children && ptree.children.length){
			wDesc = getDescendentsOfCat(ptree, 'w');
			if(ptree.cat === cat && isMaximal(ptree, parentCat) && wDesc.length>2){
				//logreport("VIOLATION: "+ptree.id+" dominates "+wDesc.length+" words!");
				vcount++;
			}
			
			var parentCat = ptree.cat;
			for(var i = 0; i<ptree.children.length; i++){
				vcount += binMax_maxPCat_inner(ptree.children[i], cat, parentCat);
			}
		}
		return vcount;
	}
	
	return binMax_maxPCat_inner(ptree, cat, 'utterance');
}
