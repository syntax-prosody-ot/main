function weakStartTest(){
    var ptree1 = {
        cat: "i",
        id: "root",
        children: [
            {
                cat: "phi",
                id:"a",
            },
            {
                cat: "phi",
                id:"b"
            }
        ]
    }
    var ptree2 = {
        id: "root",
        cat: "i",
        children: [
            {
                cat: "w",
                id:"a",
            },
            {
                cat: "phi",
                id:"b"
            }
        ]
    }
    var ptree3 = {
        id: "root",
        cat: "i",
        children: [
            {
                cat: "phi",
                id:"a",
            },
            {
                cat: "w",
                id:"b"
            }
        ]
    }
    var ptree4 = {
        id: "root",
        cat: "i",
        children: [
            {
                cat: "phi",
                id:"phi",
                children:[
                    {
                        cat: "phi",
                        id:"a",
                    },
                    {
                        cat: "w",
                        id:"b"
                    }
                ]
            },
            {
                cat: "w",
                id:"w1",
                children:[
                    {
                        cat: "w",
                        id:"c",
                    },
                    {
                        cat: "w",
                        id:"w3",
                        children:[
                            {
                                cat: "phi",
                                id:"d"
                            },
                            {
                                cat: "phi",
                                id:"e"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    var ptree5 = {
        id: "root",
        cat: "i",
        children: [
            {
                cat: "phi",
                id:"phi1",
                children:[
                    {
                        cat: "phi",
                        id:"a"
                    },
                    {
                        cat: "phi",
                        id:"phi3",
                        children:[
                            {
                                cat: "w",
                                id:"b"
                            },
                            {
                                cat: "w",
                                id:"c"
                            }
                        ]
                    }
                ]
            },
            {
                cat: "phi",
                id:"phi4",
                children:[
                    {
                        cat: "w",
                        id:"d"
                    },
                    {
                        cat: "w",
                        id:"e"
                    }
                ]
            },
            {
                cat: "w",
                id:"w",
                children:[
                    {
                        cat: "w",
                        id:"f"
                    },
                    {
                        cat: "w",
                        id:"g"
                    }
                ]
            }
        ]
    }
    var ptree6 = {
        id: "root",
        cat: "i",
        children: [
            {
                cat: "phi",
                id:"phi",
                children:[
                    {
                        cat: "phi",
                        id:"a"
                    },
                    {
                        cat: "w",
                        id:"w",
                        children:[
                            {
                                cat: "phi",
                                id:"b"
                            },
                            {
                                cat: "w",
                                id:"c"
                            }
                        ]
                    }
                ]
            },
            {
                cat: "w",
                id:"w",
                children:[
                    {
                        cat: "phi",
                        id:"d"
                    },
                    {
                        cat: "w",
                        id:"e"
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
                                id:"f"
                            },
                            {
                                cat: "w",
                                id:"g"
                            }
                        ]
                    },
                    {
                        cat: "w",
                        id:"h"
                    }
                ]
            }
        ]
    }

    describe("weakStartTest.html", function(){
        describe('One-Layer Cases', function(){
            it('One-Layer Case:'+parenthesizeTree(ptree1), function() {
                assert.equal(weakStartLocal('', ptree1, ''), 0, parenthesizeTree(ptree1));
            });
            it('One-Layer Case: '+parenthesizeTree(ptree2), function() {
                assert.equal(weakStartLocal('', ptree2, ''), 0, parenthesizeTree(ptree2));
            });
            it('One-Layer Case: '+parenthesizeTree(ptree3), function() {
                assert.equal(weakStartLocal('', ptree3, ''), 1, parenthesizeTree(ptree3));
            });
        })
        describe('Multi-Layer Cases', function(){
            it('Multi-Layer Case: '+parenthesizeTree(ptree4), function() {
                assert.equal(weakStartLocal('', ptree4, ''), 2, parenthesizeTree(ptree4));
            });
            it('Multi-Layer Case: '+parenthesizeTree(ptree5), function() {
                assert.equal(weakStartLocal('', ptree5, ''), 0, parenthesizeTree(ptree5));
            });
            it('Multi-Layer Case: '+parenthesizeTree(ptree6), function() {
                assert.equal(weakStartLocal('', ptree6, ''), 6, parenthesizeTree(ptree6));
            });
        })
    });
}