
function matchAnyTesting(){
    var sTree = {
        cat: "cp",
        id: "root",
        children: [
            {
                cat: "xp",
                id:"xp1",
                children: [
                    {
                        cat:"x0",
                        id: "one"
                    }
                ]
            },
            {
                cat: "cp",
                id: "xp2",
                children: [
                    {
                        cat: "xp",
                        id:"xp3",
                    },
                    {
                        cat: "xp",
                        id: "xp4",
                        silentHead: true,
                        children: [
                            {
                                cat:"x0",
                                id: "three-silent"
                            },
                            {
                                cat:'x0',
                                id:'four'
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
describe("matchAnyTesting.html", function() {
    describe('Tableau 1: Testing "any" Syntactic category', function() {
        it('matchSP-xp', function() {
            assert.equal(matchSP(sTree, pTree, "xp"), 3);
        });
        it('matchSP-cp', function() {
            assert.equal(matchSP(sTree, pTree, "cp"), 2);
        });
        it('matchSP-any', function() {
            assert.equal(matchSP(sTree, pTree, "any"), 5);
        });
    });
});
}

matchAnyTesting();