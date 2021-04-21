
function matchAnyTesting(){
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
describe("matchAnyTesting.html", function() {
    describe('Tableau 1: Testing "any" Syntactic category', function() {
        it('matchSP-xp', function() {
            assert.equal(matchSP(sTree, pTree, "xp"), 2);
        });
        it('matchSP-cp', function() {
            assert.equal(matchSP(sTree, pTree, "cp"), 2);
        });
        it('matchSP-any', function() {
            assert.equal(matchSP(sTree, pTree, "any"), 8);
        });
    });
});
//add writeTabelau
var con1 = ['matchSP-xp','matchSP-cp', 'matchSP-any'];
window.addEventListener("load",function(){
	writeTableau(makeTableau(GEN(sTree,'xp cp'), con1));
	revealNextSegment();
	});
}

matchAnyTesting();