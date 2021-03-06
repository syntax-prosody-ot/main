
/* Assign a violation for every pair of adjacent sisters 
   with a parent of category cat
   that do not have the same number of children. 
*/
function balancedSistersAdj(stree, ptree, cat){
    var vcount = 0;
    if ((!ptree.children) || ptree.children.length === 0){
        return vcount;
    }

    else{
        if(ptree.cat===cat){
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
        }

        for(var j = 0; j<ptree.children.length; j++){
            vcount += balancedSistersAdj(stree, ptree.children[j], cat);
        }

        return vcount;
    }
}

/* Assign a violation for every set of sisters dominated by a node of category cat 
   that do not all have the same number of children.

   Update Oct. 2020: make category specification optional
*/
function balancedSisters(stree, ptree, cat){
    var vcount = 0;

    // Base case: no violation if there are no children
    if ((!ptree.children) || ptree.children.length === 0){
        return vcount;
    }

    else{
        if(!cat || ptree.cat===cat){
            
            // Base case: violation if the children have differing numbers of children
            var imbalanceFound = false;
            var i = 0;
            while(!imbalanceFound && i < ptree.children.length-1){
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
                    imbalanceFound = true;
                }
                i++;
            }
            if(imbalanceFound){
                vcount++;
            }
        }

        // Recurse for every subtree
        for(var j = 0; j<ptree.children.length; j++){
            vcount += balancedSisters(stree, ptree.children[j], cat);
        }

        return vcount;
    }
}

function getChildrenOfCat(ptree, cat){
    if ((!ptree.children) || ptree.children.length === 0)
        return [];
    
    var catChildren = [];
    for(var i in ptree.children){
        if(ptree.children[i].cat===cat)
            catChildren.push(ptree.children[i]);
    }
    return catChildren;
}

/* Assign a violation for every set of sisters of category cat 
   that do not all have the same number of children.
*/
function balSisChildCat(stree, ptree, cat){
    var vcount = 0;

    // Base case: no violation if there are no children
    if ((!ptree.children) || ptree.children.length === 0){
        return vcount;
    }

    // If there are children:
    else
    {     
        // Base case: violation if the children have differing numbers of children
        var imbalanceFound = false;
        var catChildren = getChildrenOfCat(ptree, cat);
        var i = 0;
        while(!imbalanceFound && i < catChildren.length-1){
            var sister1 = catChildren[i];
            var sister2 = catChildren[i+1];
            //Make sure there is a defined children array for each sister under consideration
            if(!sister1.children){
                sister1.children = [];
            } 
            if(!sister2.children){
                sister2.children = [];
            }

            //Assign a violation if the sisters do not have the same number of children
            if(sister1.children.length != sister2.children.length){
                imbalanceFound = true;
            }
            i++;
        }

        if(imbalanceFound){
            vcount++;
        }
        

        // Recurse for every subtree
        for(var j = 0; j<ptree.children.length; j++){
            vcount += balSisChildCat(stree, ptree.children[j], cat);
        }
        
        return vcount;
    }
}