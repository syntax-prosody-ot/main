function matchAnyPCat(){
    var stree1 ={
        "id": "CP1",
        "cat": "cp",
        "children": [ { "id": "a", "cat": "x0"},
        {"cat": "cp", "id": "XP_4", "children": [ {"id": "b", "cat": "x0"}, { "id": "c", "cat": "x0"} ] } ]
        };
        
       // CPs can be matched to phis
       // ptree1 = (a (b c)) (where parentheses stand for the edges of nodes with cat: 'phi')
       // ptree2 = ((a b) c)
       // matchSP(stree1, ptree1, 'cp', {anyPCat:true}) = 0
       // matchSP(stree1, ptree2, 'cp', {anyPCat:true}) = 1
        
    var stree2 = {
        "id": "CP1",
        "cat": "cp",
        "children": [ {"cat": "xp", "id": "XP_8", "children": [ {"id": "a", "cat": "x0"} ] },
        { "cat": "xp", "id": "XP_9", "children": [ {"id": "b", "cat": "x0"} ] },
        { "cat": "xp", "id": "XP_10", "children": [ {"id": "c", "cat": "x0"} ] } ]
    };
        
       // XPs can be matched by words:
        matchSP(stree2, ptree1, 'xp', {anyPCat:true}) = 0
        
       // Violations still happen when ids don't match:
       // ptree3 = (x, y, z);
        matchSP(stree2, ptree3, 'xp', {anyPCat:true}) = 4
}

matchAnyPCat();