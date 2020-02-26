/* For the specified lexical item(s), which are assumed to be clitics (category is not checked),
*  assign a violation for every terminal that intervenes between the right edge of the tree
*  and the lexical item.
*/

function alignMorpheme(stree, ptree, clitic, direction){
    if (direction === "left"){
        return alignRightMorpheme(stree,ptree,clitic);
    }
    else{
        return alignLeftMorpheme(stree,ptree,clitic);
    }
}
