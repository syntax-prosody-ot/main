// Tim, Su and Max workin' on a headedness constraint

function headedness(stree, ptree, cat){
    //code here
    //should return integer
    function getsViolation(node, category) {
        let result = true;
        for (child of node.children) {
            if(child.cat == category || node.cat == pCat.nextLower(node.cat)) {
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

    let violations = 0;
    cat = cat || true;

    if(ptree.children && ptree.children.length && getsViolation(ptree, cat)) {
        violations ++;
    }

    if(ptree.children && ptree.children.length){
        for(child of ptree.children){
            violations += headedness(stree, child, cat);
        }
    }

    return violations;
}