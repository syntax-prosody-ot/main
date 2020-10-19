// Tim, Su and Max workin' on a headedness constraint

function headedness(stree, ptree, cat){
    //code here
    //should return integer
    function getsViolation(node) {
        if(ptree.children && ptree.children.length) {
            let result = true;
            for (let i = 0; i < node.children.length; i++) {
                let child = node.children[i];
                if(child.cat === node.cat || child.cat === pCat.nextLower(node.cat)) {
                    result = false;
                    /*  methods to know for categories on the hierarchy
                        pCat.isHigher
                        pCat.isLower
                        pCat.nextHigher
                        pCat.nextLower
                    */
                }
            }
            return result;
        }
        else {
            return false;
        }
    }

    function correctCategory(treeCat, constraintCat) {
        if(constraintCat) {
            return treeCat == constraintCat;
        }
        else {
            return true;
        }
    }

    let violations = 0;

    if(getsViolation(ptree) && correctCategory(ptree.cat, cat)) {
        violations ++;
    }

    if(ptree.children && ptree.children.length){
        for(child of ptree.children){
            violations += headedness(stree, child, cat);
        }
    }

    return violations;
}