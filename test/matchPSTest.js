//matchPSTest

function matchPSTest(){
    var stree1 =  {
        "id": "root",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "cat": "xp",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "x0"
                            },
                            {
                                "cat": "xp",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "c",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "d",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "minMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "x0"
                    },
                    {
                        "id": "f",
                        "cat": "x0"
                    }
                ]
            }
        ]
    };
	var stree2 =  {
        "id": "root",
        "cat": "cp",
        "children": [
            {
                "cat": "cp",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "cat": "cp",
                        "children": [
                            {
                                "id": "b",
                                "cat": "x0"
                            },
                        ]
                    }
                ]
            },
            {
                "cat": "cp",
                "children": [
                    {
                        "id": "c",
                        "cat": "x0"
                    },
                ]
            },
            {
                "cat": "cp",
                "children": [
                    {
                        "id": "d",
                        "cat": "x0"
                    },
                    {
                        "id": "e",
                        "cat": "x0"
                    },
                    {
                        "id": "f",
                        "cat": "x0"
                    }
                ]
            }

        ]
    };
			
	var ptree1 =  {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "c",
                                        "cat": "w"
                                    },
                                    {
                                        "id": "d",
                                        "cat": "w"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "id": "f",
                        "cat": "w"
                    }
                ]
            }
        ]
    };

describe("matchPSTest.html", function() {
    describe('Tableau 1: Tests all/only Syntactic Subcategories', function() {
        it('matchPS', function() {
            assert.equal(matchPS(stree1, ptree1, "phi"), 0, message(stree1, ptree1));
            assert.equal(matchPS(stree2, ptree1, "phi"), 4, message(stree2, ptree1));
        });
        it('maxProsody', function() {
            let options = {"maxProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 2, message(stree2, ptree1, options));
        });
        it('nonMaxProsody', function() {
            let options = {"nonMaxProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 2, message(stree2, ptree1, options));
        });
        it('minProsody', function() {
            let options = {"minProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 2, message(stree2, ptree1, options));
        });
        it('minProsody maxProsody', function() {
            let options = {"maxProsody": true, "minProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 1, message(stree2, ptree1, options));
        });
        it('minProsody nonMaxProsody', function() {
            let options = {"nonMaxProsody": true, "minProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 1, message(stree2, ptree1, options));
        });
        it('nonMinProsody', function() {
            let options = {"nonMinProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 2, message(stree2, ptree1, options));
        });
        it('maxProsody nonMinProsody', function() {
            let options = {"nonMinProsody": true, "maxProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 1, message(stree2, ptree1, options));
        });
        it('nonMaxProsody nonMinProsody', function() {
            let options = {"nonMinProsody": true, "nonMaxProsody": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 0, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 1, message(stree2, ptree1, options));
        });
    });

    describe('Tableau 2: Tests all/only Prosodic Subcategories', function() {
        it('maxSyntax', function() {
            let options = {"maxSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 2, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
        it('nonMaxSyntax', function() {
            let options = {"nonMaxSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 2, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
        it('minSyntax', function() {
            let options = {"minSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 2, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
        it('maxSyntax minSyntax', function() {
            let options = {"maxSyntax": true, "minSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 3, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
        it('nonMSyntax minSyntax', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 3, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
        it('nonMinSyntax', function() {
            let options = {"nonMinSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 2, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
        it('maxSyntax nonMinSyntax', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 3, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
        it('nonMaxSyntax nonMinSyntax', function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true};
            assert.equal(matchPS(stree1, ptree1, "phi", options), 3, message(stree1, ptree1, options));
            assert.equal(matchPS(stree2, ptree1, "phi", options), 4, message(stree2, ptree1, options));
        });
    });
});
var myConstraintSet = ['matchPS-i', 'matchPS-phi', 'matchPS-w'];//, 'binMinBranches-phi', 'binMaxBranches-phi'];
var myTableau = makeTableau(GEN(stree1, 'a b c'), myConstraintSet);
return myTableau;
}