function alignLeftClitic(stree, ptree, clitic){
    if(ptree.cat !== "i" && ptree.cat !== 'iota'){
        console.log("Warning: you are calling alignLeftClitic on a tree that is not rooted in i");
    }
    var leaves = getLeaves(ptree);
    var cliticPos = leaves.findIndex(function(element){return element.id===clitic;});
    if(cliticPos < 0){
        throw new Error("The specificed clitic "+clitic+" was not found in this tree");
    }
    return cliticPos;
}