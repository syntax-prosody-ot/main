function balancedSistersAdj(stree, ptree, cat){
    console.log(ptree);
    var vcount = 0;
    if ((!ptree.children) || ptree.children.length < 2){
        return vcount;
    }

    else{
        for(var i = 0; i < ptree.children.length-1; i++){
            var sister1 = ptree.children[i];
            var sister2 = ptree.children[i+1];
            //Make sure there is a defined children array for each sister under consideration
            if(!sister1.children){
                sister1.children = [];
            } 
            if(!sister2.children){
                sister2.children = [];
            }

            //Assign a violation if the sisters do not have the same number of children
            if(sister1.children.length != sister2.children.length){
                vcount++;
            }
    
        }
        
        for(var j = 0; j<ptree.children.length; j++){
            vcount += balancedSistersAdj(stree, ptree.children[j], cat);
        }

        return vcount;
    }
}