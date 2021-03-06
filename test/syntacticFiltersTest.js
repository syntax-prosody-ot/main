

//testing syntacticFiltersTest.html
function syntacticFiltersTest(){
     //ContainsAdjunctTest
     var s = {
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "id": "a",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "b",
                        "cat": "x0"
                    },
                    {
                        "cat": "xp",
                        "id": "XP_7",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_9",
                                "children": [
                                    {
                                        "id": "c",
                                        "cat": "x0"
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "XP_8",
                                "children": [
                                    {
                                        "id": "d",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "e",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    

    //Contains Adjunct automated test
    describe("syntacticFiltersTest.html", function(){
    describe('Adjunct Test: [a [b [c]]]', function () {
        it('does not contain an adjunct', function () {
            var x = {
        "id": "root",
        "cat": "xp",
        "children": [
            {
                "cat": "x0",
                "id": "a"
            },
            {
                "cat": "xp",
                "id": "xp2",
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
    }
            assert.equal(containsAdjunct(x), false);
        });
    });

    describe('[[a] [b [c]]]', function () {
        it('contains an adjunct', function () {
            var y = {
        "id": "root",
        "cat": "xp",
        "children": [
            {
                "cat": "xp",
                "id": "xp6",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "xp2",
                "children": [
                    {
                        "id": "b",
                        "cat": "x0"
                    },
                    {
                        "id": "xp0",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "c",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    }
            assert.equal(containsAdjunct(y), true);
        });
    });

    describe('[[a] b [c]]', function () {
        it('does not contain an adjunct', function () {
            var z = {
        "id": "root",
        "cat": "xp",
        "children": [
            {
                "cat": "xp",
                "id": "xp6",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    }
                ]
            },
            {
                "cat": "x0",
                "id": "b"
            },
            {
                "cat": "xp",
                "id": "xp0",
                "children": [
                    {
                        "id": "c",
                        "cat": "x0"
                    }
                ]
            }
        ]
    }
            assert.equal(containsAdjunct(z), false);
        });
    });

    describe(parenthesizeTree(s), function () {
        it('contains an adjunct', function () {
            assert.equal(containsAdjunct(s), true);
        });
    });


    // ThreeXPs automated test
    describe('ThreeXPs Test:', function () {
        it('[[a] [b] [c]] contains an XP with three XP children', function () {
            var x1 = {
        "id": "CP1",
        "cat": "xp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_5",
                "children": [
                    {
                        "id": "a",
                        "cat": "xp"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "b",
                        "cat": "xp"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "b",
                        "cat": "xp"
                    }
                ]
            }
        ]
    }
            assert.equal(threeXPs(x1), true);
        });

        it('[[a] [b]] does not contain an XP with three XP children', function () {
            var y1 = {
        "id": "CP1",
        "cat": "xp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_5",
                "children": [
                    {
                        "id": "a",
                        "cat": "xp"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "b",
                        "cat": "xp"
                    }
                ]
            }
        ]
    }
            assert.equal(threeXPs(y1), false);
        });

        it('[a [b] [c]] does not contain an XP with three XP children', function () {
            var z1 = {
        "id": "CP1",
        "cat": "xp",
        "children": [
            {
                "id": "a",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "b",
                        "cat": "xp"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "c",
                        "cat": "xp"
                    }
                ]
            }
        ]
    }
            assert.equal(threeXPs(z1), false);
        });
    });


    var x = {
        "id": "CP1",
        "cat": "xp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_5",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "id": "b",
                        "cat": "x0"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_6",
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

    console.log("x = ", parenthesizeTree(x));
    console.log("checkMirror(x,{}) = ", checkMirror(x, {}));
    // false
    console.log("expected: ", false)
    console.log("\n")

    console.log("mirrorImages(x, [x]) = ", mirrorImages(x, [x]));
    // false
    console.log("expected: ", false)
    console.log("\n")

    //y = [[[a] b] [c [d]]]
    var y =     {
            "id": "CP1",
            "cat": "xp",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_5",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "XP_7",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "id": "b",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "c",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "XP_8",
                            "children": [
                                {
                                    "id": "d",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    console.log("y = ", parenthesizeTree(y));
    console.log("mirrorImages(x, [y, x]) = ", mirrorImages(x, [y, x]));
    //false
    console.log("expected: ", false)
    console.log("\n")

    //z = [ [[a] b] [c d] ]
    var z =
        {
            "id": "CP1",
            "cat": "xp",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_5",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "XP_7",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "id": "b",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "XP_6",
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
    console.log("z = ", parenthesizeTree(z));
    //z2 = [ [a b] [c [d]] ] - should be a mirror of z
    var z2 = 
        {
            "id": "CP1",
            "cat": "xp",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_5",
                    "children": [
                        {
                            "id": "a",
                            "cat": "x0"
                        },
                        {
                            "id": "b",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "c",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "XP_9",
                            "children": [
                                {
                                    "id": "d",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                }
            ]
        }


    //CheckMirror automated test
    describe('checkMirror: check for if trees are mirror images of each other', function() {
            it(parenthesizeTree(x) + ' is not a mirror image of {}', function() {
                assert.equal(checkMirror(x, {}), false);
            });

            it(parenthesizeTree(z2) + ' is a mirror image of ' + parenthesizeTree(z), function() {
                assert.equal(checkMirror(z, z2), true);
            });

            it(parenthesizeTree(z) + ' is a mirror image of ' + parenthesizeTree(x), function() {
                assert.equal(checkMirror(z, x), false);
            });

            it(parenthesizeTree(x) + ' is not a mirror image of ' + parenthesizeTree(z), function() {
                assert.equal(checkMirror(x, z), false);
            });

            it(parenthesizeTree(z2) + ' is not a mirror image of ' + parenthesizeTree(y), function() {
                assert.equal(checkMirror(z2, y), false);
            });

            it(parenthesizeTree(y) + ' is not a mirror image of ' + parenthesizeTree(x), function() {
                assert.equal(checkMirror(y, x), false);
            });
        });

    describe('mirrorImages: Returns true if sTree is a mirror of an earlier tree in sTreeList. Returns false if Stree is not a mirror image of an earlier tree in sTreeList', function() {
            it(parenthesizeTree(x) + " is not a mirror image of any tree that precedes it in the list ["+parenthesizeTree(x)+"]", function() {
                assert.equal(mirrorImages(x, [x]), false);
            });

            it(parenthesizeTree(x) + " is not a mirror image of any tree that precedes it in the list ["+[parenthesizeTree(y), parenthesizeTree(x)].join(', ')+"]", function() {
                assert.equal(mirrorImages(x, [y, x]), false);
            });

            it(parenthesizeTree(z2) + " is a mirror image of any tree that precedes it in the list ["+[parenthesizeTree(x), parenthesizeTree(y), parenthesizeTree(z), parenthesizeTree(z2)].join(', ')+"]", function() {
                assert.equal(mirrorImages(z2, [x,y, z, z2]), true);
            });

            it(parenthesizeTree(z) + " is not a mirror image of any tree that precedes it in the list ["+[parenthesizeTree(x), parenthesizeTree(y), parenthesizeTree(z), parenthesizeTree(z2)].join(', ')+"]", function() {
                assert.equal(mirrorImages(z, [x,y, z, z2]), false);
            });

            it(parenthesizeTree(z2) + " is not a mirror image of any tree that precedes it in the list ["+[parenthesizeTree(y), parenthesizeTree(z2)].join(', ')+"]", function() {
                assert.equal(mirrorImages(z2, [y, z2]), false);
            });
        });
        
        //headAlignTest
        
    var badTree1 =
    {
    "id": "root",
    "cat": "cp",
    "children":
    [
    {
    "id": "xp31",
    "cat": "xp",
    "children":
    [
        {
        "id": "a",
        "cat": "x0"
        },
        {
        "id": "xp17",
        "cat": "xp",
        "children":
        [
            {
            "id": "xp15",
            "cat": "xp",
            "children":
            [
                {
                "id": "b",
                "cat": "x0"
                }
            ]
            },
            {
            "id": "c",
            "cat": "x0"
            }
        ]
        }
    ]
    }
    ]
    }

    var noRootBadTree1 =
    {
    "id": "xp31",
    "cat": "xp",
    "children":
    [
    {
    "id": "a",
    "cat": "x0"
    },
    {
    "id": "xp17",
    "cat": "xp",
    "children":
    [
        {
        "id": "xp15",
        "cat": "xp",
        "children":
        [
            {
            "id": "b",
            "cat": "x0"
            }
        ]
        },
        {
        "id": "c",
        "cat": "x0"
        }
    ]
    }
    ]
    }

    var goodTree1 =
    {
    "id": "root",
    "cat": "cp",
    "children":
    [
    {
    "id": "xp30",
    "cat": "xp",
    "children":
    [
        {
        "id": "a",
        "cat": "x0"
        },
        {
        "id": "xp16",
        "cat": "xp",
        "children":
        [
            {
            "id": "b",
            "cat": "x0"
            },
            {
            "id": "xp14",
            "cat": "xp",
            "children":
            [
                {
                "id": "c",
                "cat": "x0"
                }
            ]
            }
        ]
        }
    ]
    }
    ]
    }

    var noRootGoodTree1 =
    {
    "id": "xp30",
    "cat": "xp",
    "children":
    [
    {
    "id": "a",
    "cat": "x0"
    },
    {
    "id": "xp16",
    "cat": "xp",
    "children":
    [
        {
        "id": "b",
        "cat": "x0"
        },
        {
        "id": "xp14",
        "cat": "xp",
        "children":
        [
            {
            "id": "c",
            "cat": "x0"
            }
        ]
        }
    ]
    }
    ]
    }

    var badTree2 =
    {
    "id": "root",
    "cat": "cp",
    "children":
    [
    {
    "id": "xp39",
    "cat": "xp",
    "children":
    [
        {
        "id": "xp20",
        "cat": "xp",
        "children":
        [
            {
            "id": "a",
            "cat": "x0"
            }
        ]
        },
        {
        "id": "xp17",
        "cat": "xp",
        "children":
        [
            {
            "id": "xp15",
            "cat": "xp",
            "children":
            [
                {
                "id": "b",
                "cat": "x0"
                }
            ]
            },
            {
            "id": "c",
            "cat": "x0"
            }
        ]
        }
    ]
    }
    ]
    }

    var noRootBadTree2 =
    {
    "id": "xp39",
    "cat": "xp",
    "children":
    [
    {
    "id": "xp20",
    "cat": "xp",
    "children":
    [
        {
        "id": "a",
        "cat": "x0"
        }
    ]
    },
    {
    "id": "xp17",
    "cat": "xp",
    "children":
    [
        {
        "id": "xp15",
        "cat": "xp",
        "children":
        [
            {
            "id": "b",
            "cat": "x0"
            }
        ]
        },
        {
        "id": "c",
        "cat": "x0"
        }
    ]
    }
    ]
    }

    var goodTree2 =
    {
    "id": "root",
    "cat": "cp",
    "children":
    [
    {
    "id": "xp38",
    "cat": "xp",
    "children":
    [
        {
        "id": "xp20",
        "cat": "xp",
        "children":
        [
            {
            "id": "a",
            "cat": "x0"
            }
        ]
        },
        {
        "id": "xp16",
        "cat": "xp",
        "children":
        [
            {
            "id": "b",
            "cat": "x0"
            },
            {
            "id": "xp14",
            "cat": "xp",
            "children":
            [
                {
                "id": "c",
                "cat": "x0"
                }
            ]
            }
        ]
        }
    ]
    }
    ]
    }

    var noRootGoodTree2 =
    {
    "id": "xp38",
    "cat": "xp",
    "children":
    [
    {
    "id": "xp20",
    "cat": "xp",
    "children":
    [
        {
        "id": "a",
        "cat": "x0"
        }
    ]
    },
    {
    "id": "xp16",
    "cat": "xp",
    "children":
    [
        {
        "id": "b",
        "cat": "x0"
        },
        {
        "id": "xp14",
        "cat": "xp",
        "children":
        [
            {
            "id": "c",
            "cat": "x0"
            }
        ]
        }
    ]
    }
    ]
    }

    var side = "left";
    var strict = "strict";
    // strict = undefined;

    //automated test
    describe('HeadAlignTest: goodTree1: ' + parenthesizeTree(goodTree1), function() {
            it('headsOnWrongSide(goodTree1, left, strict): Expected Value: False', function() {
                assert.equal(headsOnWrongSide(goodTree1, side, strict), false);
            });
        });

    describe('goodTree2: ' + parenthesizeTree(goodTree2), function() {
            it('headsOnWrongSide(goodTree2, left, strict): Expected Value: False', function() {
                assert.equal(headsOnWrongSide(goodTree2, side, strict), false);
            });
        });

    describe('noRootGoodTree1: ' + parenthesizeTree(noRootGoodTree1), function() {
            it('headsOnWrongSide(noRootGoodTree1, left, strict): Expected Value: False', function() {
                assert.equal(headsOnWrongSide(noRootGoodTree1, side, strict), false);
            });
        });

    describe('noRootGoodTree2: ' + parenthesizeTree(noRootGoodTree2), function() {
            it('headsOnWrongSide(noRootGoodTree2, left, strict): Expected Value: False', function() {
                assert.equal(headsOnWrongSide(noRootGoodTree2, side, strict), false);
            });
        });

    describe('badTree1: ' + parenthesizeTree(badTree1), function() {
            it('headsOnWrongSide(badTree1, left, strict): Expected Value: True', function() {
                assert.equal(headsOnWrongSide(badTree1, side, strict), true);
            });
        });

    describe('badTree2: ' + parenthesizeTree(badTree2), function() {
            it('headsOnWrongSide(badTree2, left, strict): Expected Value: True', function() {
                assert.equal(headsOnWrongSide(badTree2, side, strict), true);
            });
        });

    describe('noRootBadTree1: ' + parenthesizeTree(noRootBadTree1), function() {
            it('headsOnWrongSide(noRootBadTree1, left, strict): Expected Value: True', function() {
                assert.equal(headsOnWrongSide(noRootBadTree1, side, strict), true);
            });
        });

    describe('noRootBadTree2: ' + parenthesizeTree(noRootBadTree2), function() {
            it('headsOnWrongSide(noRootBadTree2, left, strict): Expected Value: True', function() {
                assert.equal(headsOnWrongSide(noRootBadTree2, side, strict), true);
            });
        });
    });
}
syntacticFiltersTest();