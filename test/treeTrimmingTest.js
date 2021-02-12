stree1 = {
    "id": "T1",
    "cat": "cp",
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
};

stree2 = {
    "id": "T2",
    "cat": "cp",
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
                    "cat": "x0",
                    "silent": true
                },
                {
                    "id": "d",
                    "cat": "x0"
                }
            ]
        }
    ]
};

stree3 = {
    "id": "T3",
    "cat": "cp",
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
                    "cat": "bitcoin"
                },
                {
                    "id": "d",
                    "cat": "x0"
                }
            ]
        }
    ]
};

stree4 = {
    "id": "T4",
    "cat": "cp",
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
                    "cat": "x0",
                    "silent": true
                }
            ]
        },
        {
            "cat": "xp",
            "id": "XP_6",
            "children": [
                {
                    "id": "c",
                    "cat": "ethereum"
                },
                {
                    "id": "d",
                    "cat": "x0"
                }
            ]
        }
    ]
};

stree5 = {
    "id": "T5",
    "cat": "cp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_7",
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
                    "cat": "xp",
                    "id": "XP_5",
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
};

stree6 = {
    "id": "T6",
    "cat": "cp",
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
            "id": "XP_4",
            "children": [
                {
                    "id": "c",
                    "cat": "x0",
                    "silent": true
                }
            ]
        }
    ]
};

stree7 = {
    "id": "T7",
    "cat": "cp",
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
            "id": "XP_4",
            "children": [
                {
                    "id": "c",
                    "cat": "monero"
                }
            ]
        }
    ]
};

stree8 = {
    "id": "T8",
    "cat": "cp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_6",
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
            "id": "XP_5",
            "children": [
                {
                    "id": "c",
                    "cat": "x0",
                    "silent": true
                },
                {
                    "id": "d",
                    "cat": "dogecoin"
                }
            ]
        }
    ]
};

stree9 = {
    "id": "T9",
    "cat": "cp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_5",
            "children": [
                {
                    "cat": "cp",
                    "id": "XP_4",
                    "children": [
                        {
                            "id": "a",
                            "cat": "x0",
                            "silent": true
                        },
                        {
                            "cat": "xp",
                            "id": "XP_3",
                            "children": [
                                {
                                    "id": "b",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

describe('Tree Trimming Tests', function() {
    it('Does nothing if tree is OK', function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree1,'silent')),'{[a b] [c d]}');
    });
    it('Removes silent terminals', function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree2,'silent')),'{[a b] [d]}');
    });
    it('Removes terminals with invalid categories', function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree3,'silent')),'{[a b] [d]}');
    });
    it('Removes silent and invalid terminals', function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree4,'silent')),'{[a] [d]}');
    });
    it("Removes instances of recursion", function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree5,'silent')),'{[a b] [c d]}');
    });
    it("Removes instances of recursion after silent terminal removal", function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree6,'silent')),'{[a b]}');
    });
    it("Removes instances of recursion after invalid terminal removal", function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree7,'silent')),'{[a b]}');
    });
    it("Removes instances of recursion after silent and invalid terminal removal", function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree8,'silent')),'{[a b]}');
    });
    it('Leaves embedded CPs', function() {
        assert.equal(parenthesizeTree(removeSpecifiedNodes(stree9,'silent')),'{[{[b]}]}');
    });
});

