
function matchAllSCatsTesting(){
    var sTree = {
        cat: "cp",
        id: "root",
        children: [
            {
                cat: "xp",
                id:"xp",
                children: [
                    {
                        cat:"x0",
                        id: "x0",
                        children: [
                            {
                                cat: "x0",
                                id:"x0"
                            }
                        ]
                    }
                ]
            },
            {
                cat: "xp",
                id:"xp"
            },
            {
                cat: "cp",
                id: "cp",
                children: [
                    {
                        cat: "c0",
                        id:"c0",
                        children: [
                            {
                                cat: "c0",
                                id:"c0"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    var pTree =     {
        "id": "root",
        "cat": "i",
    };
describe("matchAllSCatsTesting.html", function() {
    describe('Tableau 1: Testing "any" Syntactic category', function() {
        it('matchSP-xp', function() {
            assert.equal(matchSP(sTree, pTree, "xp"), 2, message(sTree, pTree, 'xp'));
        });
        it('matchSP-cp', function() {
            assert.equal(matchSP(sTree, pTree, "cp"), 2, message(sTree, pTree, 'cp'));
        });
        it('matchSP-any', function() {
            assert.equal(matchSP(sTree, pTree, "any"), 8, message(sTree, pTree, 'any'));
        });
    });
});
//add writeTabelau
return sTree;
}

matchAllSCatsTesting();