/** Test function for treeTrimmingTest.html */

function treeTrimmingTest(){
    describe('Tree Trimming Tests', function() {
        it('Does nothing if tree is OK', function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
            }));
        });
        it('Removes silent terminals', function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
                                "id": "d",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }));
        });
        it('Removes terminals with invalid categories', function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
                                "id": "d",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }));
        });
        it('Removes silent and invalid terminals', function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "XP_6",
                        "children": [
                            {
                                "id": "d",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }));
        });
        it("Removes instances of recursion", function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
            }));
        });
        it("Removes instances of recursion after silent terminal removal", function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
                    }
                ]
            }));
        });
        it("Removes instances of recursion after invalid terminal removal", function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
                    }
                ]
            }));
        });
        it("Removes instances of recursion after silent and invalid terminal removal", function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
                    }
                ]
            }));
        });
        it('Leaves embedded CPs', function() {
            assert.equal(JSON.stringify(removeSpecifiedNodes({
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
            },'silent')),JSON.stringify({
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
            }));
        });
    });
};

treeTrimmingTest();