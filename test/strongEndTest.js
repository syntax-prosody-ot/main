function strongEndTest(){
    var ptree1 = {
        cat: "root",
        id: "i",
        children: [
            {
                cat: "phi",
                id:"phi",
            },
            {
                cat: "phi",
                id:"phi"
            }
        ]
    }
    var ptree2 = {
        cat: "root",
        id: "i",
        children: [
            {
                cat: "w",
                id:"w",
            },
            {
                cat: "phi",
                id:"phi"
            }
        ]
    }
    var ptree3 = {
        cat: "root",
        id: "i",
        children: [
            {
                cat: "phi",
                id:"phi",
            },
            {
                cat: "w",
                id:"w"
            }
        ]
    }
    var ptree4 = {
        cat: "root",
        id: "i",
        children: [
            {
                cat: "phi",
                id:"phi",
                children:[
                    {
                        cat: "phi",
                        id:"phi",
                    },
                    {
                        cat: "w",
                        id:"w"
                    }
                ]
            },
            {
                cat: "w",
                id:"w",
                children:[
                    {
                        cat: "w",
                        id:"w",
                    },
                    {
                        cat: "w",
                        id:"w",
                        children:[
                            {
                                cat: "phi",
                                id:"phi",
                            },
                            {
                                cat: "phi",
                                id:"phi"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    var ptree5 = {
        cat: "root",
        id: "i",
        children: [
            {
                cat: "phi",
                id:"phi",
                children:[
                    {
                        cat: "phi",
                        id:"phi"
                    },
                    {
                        cat: "phi",
                        id:"phi",
                        children:[
                            {
                                cat: "w",
                                id:"w"
                            },
                            {
                                cat: "w",
                                id:"w"
                            }
                        ]
                    }
                ]
            },
            {
                cat: "phi",
                id:"phi",
                children:[
                    {
                        cat: "i",
                        id:"i"
                    },
                    {
                        cat: "i",
                        id:"i"
                    }
                ]
            },
            {
                cat: "i",
                id:"i",
                children:[
                    {
                        cat: "w",
                        id:"w"
                    },
                    {
                        cat: "w",
                        id:"w"
                    }
                ]
            }
        ]
    }
    var ptree6 = {
        cat: "root",
        id: "i",
        children: [
            {
                cat: "phi",
                id:"phi",
                children:[
                    {
                        cat: "phi",
                        id:"phi"
                    },
                    {
                        cat: "w",
                        id:"w",
                        children:[
                            {
                                cat: "phi",
                                id:"phi"
                            },
                            {
                                cat: "w",
                                id:"w"
                            }
                        ]
                    }
                ]
            },
            {
                cat: "phi",
                id:"phi",
                children:[
                    {
                        cat: "phi",
                        id:"phi"
                    },
                    {
                        cat: "w",
                        id:"w"
                    }
                ]
            },
            {
                cat: "w",
                id:"w",
                children:[
                    {
                        cat: "phi",
                        id:"phi",
                        children:[
                            {
                                cat: "phi",
                                id:"phi"
                            },
                            {
                                cat: "w",
                                id:"w"
                            }
                        ]
                    },
                    {
                        cat: "w",
                        id:"w"
                    }
                ]
            }
        ]
    }
    describe("strongEndTest.html", function(){
        it('One-Layer Case: [root phi phi]', function() {
            assert.equal(strongEndLocal('', ptree1, ''), 0, parenthesizeTree(ptree1));
        });
        it('One-Layer Case: [root w phi]', function() {
            assert.equal(strongEndLocal('', ptree2, ''), 0, parenthesizeTree(ptree2));
        });
        it('One-Layer Case: [root phi w]', function() {
            assert.equal(strongEndLocal('', ptree3, ''), 1, parenthesizeTree(ptree3));
        });
        it('Multi-Layer Case: [root (phi w) (w w (w phi phi))]', function() {
            assert.equal(strongEndLocal('', ptree4, ''), 2, parenthesizeTree(ptree4));
        });
        it('Multi-Layer Case: [root (phi (w w)) (w w) {w w}]', function() {
            assert.equal(strongEndLocal('', ptree5, ''), 0, parenthesizeTree(ptree5));
        });
        it('Multi-Layer Case: [root (phi (w phi w)) (phi w) (w (phi w) w)]', function() {
            assert.equal(strongEndLocal('', ptree6, ''), 6, parenthesizeTree(ptree6));
        });
    });
}