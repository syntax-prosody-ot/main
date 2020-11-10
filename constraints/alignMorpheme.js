/* For the specified lexical item(s), which are assumed to be clitics (category is not checked),
*  assign a violation for every terminal that intervenes between the right edge of the tree
*  and the lexical item.
*/

function alignMorpheme(stree, ptree, clitic, direction){
	if(ptree.cat !== "i" && ptree.cat !== 'iota'){
				displayWarning("You are calling alignMorpheme on a tree that is not rooted in i");
    }
    clitic = clitic.split(';');
    var leaves = getLeaves(ptree);
    var cliticPos = leaves.findIndex(function(element){return clitic.indexOf(element.id) >= 0;});
    if(cliticPos < 0){
				console.warn("alignMorpheme(): The specified morpheme "+clitic+" was not found in this tree");
        cliticPos = 0;
    }
    if (direction == "left"){
    	return cliticPos;
    }
    else{
    	return leaves.length - cliticPos - 1;
    }

}

/* For the specified lexical item(s), which are assumed to be clitics (category is not checked),
*  assign a violation for every terminal that intervenes between the left edge of the tree
*  and the lexical item.
*/

function alignLeftMorpheme(stree, ptree, clitic){
   return alignMorpheme(stree,ptree,clitic,"left");
}

/* For the specified lexical item(s), which are assumed to be clitics (category is not checked),
*  assign a violation for every terminal that intervenes between the right edge of the tree
*  and the lexical item.
*/

function alignRightMorpheme(stree, ptree, clitic){
    return alignMorpheme(stree, ptree, clitic,"right");
}
