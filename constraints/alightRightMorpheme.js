/* For the specified lexical item(s), which are assumed to be clitics (category is not checked),
*  assign a violation for every terminal that intervenes between the right edge of the tree
*  and the lexical item.
*/

function alignRightMorpheme(stree, ptree, clitic){
    if(ptree.cat !== "i" && ptree.cat !== 'iota'){
        console.warn("You are calling alignLeftClitic on a tree that is not rooted in i");
    }
    clitic = clitic.split(';');
    var leaves = getLeaves(ptree);
    var cliticPos = leaves.findIndex(function(element){return clitic.indexOf(element.id) >= 0;});
    if(cliticPos < 0){
        console.warn("The specified clitic "+clitic+" was not found in this tree");
        cliticPos = 0;
    }
    return leaves.length - cliticPos;
}
