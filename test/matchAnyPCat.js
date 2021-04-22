function matchAnyPCat(){
    var stree1 ={
        "id": "CP1",
        "cat": "cp",
        "children": [ 
            { 
                "id": "a", 
                "cat": "x0"
            },
            {
                "cat": "cp", 
                "id": "XP_4", 
                "children": [ 
                    {
                        "id": "b", 
                        "cat": "x0"
                    }, 
                    { 
                        "id": "c", 
                        "cat": "x0"
                    } 
                ]    
            } 
        ]
    };
    var ptree1 = {
        "id": 'root',
        "cat": 'i',
        "children": [
            {
                "id": 'a',
                "cat": 'w',
            },
            {
                "id": 'cp',
                "cat": 'phi',
                "children": [
                    {
                        "id": 'b',
                        "cat": 'w',
                    },
                    {
                        "id": 'c',
                        "cat": 'w',
                    }
                ]
            }
        ]
    }; 

    var ptree2 = {
        "id": 'root',
        "cat": 'i',
        "children": [
            {
                "id": 'c',
                "cat": 'w',
            },
            {
                "id": 'cp',
                "cat": 'phi',
                "children": [
                    {
                        "id": 'a',
                        "cat": 'w',
                    },
                    {
                        "id": 'b',
                        "cat": 'w',
                    }
                ]
            }
        ]
    }; 
        
    var stree2 = {
        "id": "CP1",
        "cat": "cp",
        "children": [ 
            {
                "cat": "xp", 
                "id": "XP_8", 
                "children": [ 
                    {
                        "id": "a", 
                        "cat": "x0"
                    } 
                ] 
            },
            { 
                "cat": "xp", 
                "id": "XP_9", 
                "children": [ 
                    {
                        "id": "b", 
                        "cat": "x0"
                    } 
                ] 
            },
            {
                "cat": "xp", 
                "id": "XP_10", 
                "children": [ 
                    {
                        "id": "c", 
                        "cat": "x0"
                    } 
                ] 
            } 
        ]
    };

    var ptree3 = {
        "id": 'root',
        "cat": 'phi',
        "children": [
            {
                "id": 'xp',
                "cat": 'phi',
                "children": [
                    {
                        "id": 'x',
                        "cat": 'w'
                    },
                    {
                        "id": 'y',
                        "cat": 'w'
                    },
                    {
                        "id": 'z',
                        "cat": 'w'
                    }
                ]
            }
        ]
    }; 

    describe("matchAnyPCat.html", function() {
        describe('Tableau 1: matchSP-cp', function() {
            it('matchSP-cp', function() {
                assert.equal(matchSP(stree1, ptree1, 'cp', {anyPCat:true}), 0);
                assert.equal(matchSP(stree1, ptree2, 'cp', {anyPCat:true}), 1);
            });
        });
        describe('Tableau 2: matchSP-xp', function() {
            it('matchSP-xp', function() {
                assert.equal(matchSP(stree2, ptree1, 'xp', {anyPCat:true}), 0);
                assert.equal(matchSP(stree2, ptree3, 'xp', {anyPCat:true}), 4);
            });
        });
    });
}

matchAnyPCat();