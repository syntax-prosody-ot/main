/* For the specified lexical item(s), which are assumed to  be clitics (category is not checked),
*  assign a violation for every terminal that intervenes between the left edge of the tree
*  and the lexical item. 
*/

function alignLeftClitic(stree, ptree, clitic){
    if(ptree.cat !== "i" && ptree.cat !== 'iota'){
        console.warn("You are calling alignLeftClitic on a tree that is not rooted in i");
    }
    var leaves = getLeaves(ptree);
    var cliticPos = leaves.findIndex(function(element){return element.id===clitic;});
    if(cliticPos < 0){
        console.warn("The specificed clitic "+clitic+" was not found in this tree");
        cliticPos = 0;
    }
    return cliticPos;
}