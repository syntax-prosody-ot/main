//mocha.setup("bdd"); //brings "describe", "it", etc. into global namespace
//mocha.checkLeaks();
var assert = require('chai').assert; //no one wants to type out "chai.assert" every time

function binarityTest(){
// For ptree = ((a b)(c d)),
    var ptree1 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "id": "sub-root",
                "cat": "phi",
                "children": [
                    {
                        "id": "super-terminal1",
                        "cat": "phi",
                        "children": [
                            {
                                "id": "a",
                                "cat": "w"
                            },

                            {
                                "id": "b",
                                "cat": "w"
                            }
                        ]
                    }, 
                    {
                        id: "super-terminal2",
                        "cat": "phi",
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
                    },
                ]
            }
        ]
    }

    //((((a)b)c)d))    //double check 
    var ptree2 = {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "children": [
                    {
                        "cat": "phi",
                        "children": [
                            {
                                "cat": "phi",
                                "children": [
                                    {
                                        "cat": "phi",
                                        "children": [
                                            {
                                                "id": "a",
                                                "cat": "w"
                                            },
                                        ]
                                    },
                                    {
                                        "id": "b",
                                        "cat": "w"
                                    },
                                ]
                            },
                            {
                                "id": "c",
                                "cat": "w"
                            },

                        ]
                    },
                    {
                        "id": "d",
                        "cat": "w"
                    },
                ]
            }
        ]
    };

    // ptree {a b c d}
    var ptree3 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "id": "a",
                "cat": "w"
            },
            {
                "id": "b",
                "cat": "w"
            },
            {
                "id": "c",
                "cat": "w"
            },
            {
                "id": "d",
                "cat": "w"
            }
        ]
    };

    //((abc)(def))
    var ptree4 = {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "children": [
                    {
                        "cat": "phi",
                        "children": [
                            {
                                "id": "a",
                                "cat": "w"
                            },
                            {
                                "id": "b",
                                "cat": "w"
                            },
                            {
                                "id": "c",
                                "cat": "w"
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "children": [
                            {
                                "id": "d",
                                "cat": "w"
                            },
                            {
                                "id": "e",
                                "cat": "w"
                            },
                            {
                                "id": "f",
                                "cat": "w"
                            }
                        ]
                    },
                ]
            }
        ]
    };

    //{(a)(b)(c)}
    var ptree5 = {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "i",
                "children": [
                    {
                        "cat": "phi",
                        "children": [
                            {
                                "id": "a",
                                "cat": "w"
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "children": [
                            {
                                "id": "b",
                                "cat": "w"
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "children": [
                            {
                                "id": "c",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };

    // ptree (a.syll b.syll c)
    var ptree6 =     {
        "id": "root",
        "cat": "phi",
        "children": [
                    {
                        "id": "a",
                        "cat": "syll"
                    },
                    {
                        "id": "b",
                        "cat": "syll"
                    },
                    {
                        "id": "c",
                        "cat": "w"
                    }
                ]
        };

    describe('binarityTest.html', function(){
        describe('Binarity Testing by Constraint (All Ptrees at once)', function() {

            it('binMaxLeaves(phi)', function() {
                assert.equal(binMaxLeaves({},ptree1,'phi'), 1, parenthesizeTree(ptree1));
                assert.equal(binMaxLeaves({},ptree2,'phi'), 2, parenthesizeTree(ptree2));
                assert.equal(binMaxLeaves({},ptree3,'phi'), 0, parenthesizeTree(ptree3));
                assert.equal(binMaxLeaves({},ptree4,'phi'), 3, parenthesizeTree(ptree4));
                assert.equal(binMaxLeaves({},ptree5,'phi'), 0, parenthesizeTree(ptree5));
            });

            it('binMaxBranches(phi)', function() {
                assert.equal(binMaxBranches({},ptree1,'phi'),0, parenthesizeTree(ptree1));
                assert.equal(binMaxBranches({},ptree2,'phi'),0, parenthesizeTree(ptree2));
                assert.equal(binMaxBranches({},ptree3,'phi'),0, parenthesizeTree(ptree3));
                assert.equal(binMaxBranches({},ptree4,'phi'),2, parenthesizeTree(ptree4));
                assert.equal(binMaxBranches({},ptree5,'phi'),0, parenthesizeTree(ptree5));
            });

            it('binMinLeaves(phi)', function() {
                assert.equal(binMinLeaves({},ptree1,'phi'), 0, parenthesizeTree(ptree1));
                assert.equal(binMinLeaves({},ptree2,'phi'), 1, parenthesizeTree(ptree2));
                assert.equal(binMinLeaves({},ptree3,'phi'), 0, parenthesizeTree(ptree3));
                assert.equal(binMinLeaves({},ptree4,'phi'), 0, parenthesizeTree(ptree4));
                assert.equal(binMinLeaves({},ptree5,'phi'), 3, parenthesizeTree(ptree5));
            });

            it('binMinBranches(phi)', function() {
                assert.equal(binMinBranches({},ptree1,'phi'), 0, parenthesizeTree(ptree1));
                assert.equal(binMinBranches({},ptree2,'phi'), 1, parenthesizeTree(ptree2));
                assert.equal(binMinBranches({},ptree3,'phi'), 0, parenthesizeTree(ptree3));
                assert.equal(binMinBranches({},ptree4,'phi'), 0, parenthesizeTree(ptree4));
                assert.equal(binMinBranches({},ptree5,'phi'), 3, parenthesizeTree(ptree5));
            });
        });

        describe(parenthesizeTree(ptree1) + ' Ptree1 Binarity Testing   ' , function() {

            it('binMaxLeaves(phi)', function() {
                assert.equal(binMaxLeaves({},ptree1,'phi'), 1);
            });

            it('binMaxBranches(phi)', function() {
                assert.equal(binMaxBranches({},ptree1,'phi'),0);
            });

            it('binMinLeaves(phi)', function() {
                assert.equal(binMinLeaves({},ptree1,'phi'), 0);
            });

            it('binMinBranches(phi)', function() {
                assert.equal(binMinBranches({},ptree1,'phi'), 0);
            });
        });

        
        describe(parenthesizeTree(ptree2) + ' Ptree2 Binarity Testing   ' , function() {

            it('binMaxLeaves(phi)', function() {
                assert.equal(binMaxLeaves({},ptree2,'phi'), 2);
            });

            it('binMaxBranches(phi)', function() {
                assert.equal(binMaxBranches({},ptree2,'phi'),0);
            });

            it('binMinLeaves(phi)', function() {
                assert.equal(binMinLeaves({},ptree2,'phi'), 1);
            });

            it('binMinBranches(phi)', function() {
                assert.equal(binMinBranches({},ptree2,'phi'), 1);
            });
        });

        describe(parenthesizeTree(ptree3) + ' Ptree3 Binarity Testing   ' , function() {

            it('binMaxLeaves(phi)', function() {
                assert.equal(binMaxLeaves({},ptree3,'phi'), 0);
            });

            it('binMaxBranches(phi)', function() {
                assert.equal(binMaxBranches({},ptree3,'phi'),0);
            });

            it('binMinLeaves(phi)', function() {
                assert.equal(binMinLeaves({},ptree3,'phi'), 0);
            });

            it('binMinBranches(phi)', function() {
                assert.equal(binMinBranches({},ptree3,'phi'), 0);
            });
        });

        describe(parenthesizeTree(ptree4) + ' Ptree4 Binarity Testing   ' , function() {


            it('binMaxLeaves(phi)', function() {
                assert.equal(binMaxLeaves({},ptree4,'phi'), 3);
            });

            it('binMaxBranches(phi)', function() {
                assert.equal(binMaxBranches({},ptree4,'phi'),2);
            });

            it('binMinLeaves(phi)', function() {
                assert.equal(binMinLeaves({},ptree4,'phi'), 0);
            });

            it('binMinBranches(phi)', function() {
                assert.equal(binMinBranches({},ptree4,'phi'), 0);
            });
        });

        describe(parenthesizeTree(ptree5) + ' Ptree5 Binarity Testing   ' , function() {
            // test on cat: phi
            it('binMaxLeaves(phi)', function() {
                assert.equal(binMaxLeaves({},ptree5,'phi'), 0);
            });

            it('binMaxBranches(phi)', function() {
                assert.equal(binMaxBranches({},ptree5,'phi'),0);
            });

            it('binMinLeaves(phi)', function() {
                assert.equal(binMinLeaves({},ptree5,'phi'), 3);
            });

            it('binMinBranches(phi)', function() {
                assert.equal(binMinBranches({},ptree5,'phi'), 3);
            });
            // test on cat: i
            it('binMaxLeaves(i): 2 violations bc 2 coextesive nodes of cat: i contain 3 phis', function() {
                assert.equal(binMaxLeaves({},ptree5,'i'), 2);
            });

            it('binMaxBranches(i)', function() {
                assert.equal(binMaxBranches({},ptree5,'i'),1);
            });

            it('binMinLeaves(i)', function() {
                assert.equal(binMinLeaves({},ptree5,'i'), 0);
            });

            it('binMinBranches(i): one violation bc of the vacuous recursion at the top', function() {
                assert.equal(binMinBranches({},ptree5,'i'), 1);
            });
        });

        describe(parenthesizeTree(ptree6) + ' Ptree6 Binarity Testing   ' , function() {

            it('binMaxLeaves(phi): no violations because there is only one node of category phi-1 = w', function() {
                assert.equal(binMaxLeaves({},ptree6,'phi'), 0);
            });

            it('binMaxBranches(phi): 1 violation bc there is a phi with 3 branches', function() {
                assert.equal(binMaxBranches({},ptree6,'phi'),1);
            });

            it('binMinLeaves(phi): 1 violation bc there is a phi with only one w', function() {
                assert.equal(binMinLeaves({},ptree6,'phi'), 1);
            });

            it('binMinBranches(phi): no violation bc the phi has >1 branch', function() {
                assert.equal(binMinBranches({},ptree6,'phi'), 0);
            });
        });
    });
}

binarityTest();