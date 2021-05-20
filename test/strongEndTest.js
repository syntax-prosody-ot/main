function strongEndTest(){
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
        cat: "i",
        id: "root",
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
                        id:"phi2",
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
                id:"phi",
                children:[
                    {
                        cat: "i",
                        id:"d"
                    },
                    {
                        cat: "i",
                        id:"e"
                    }
                ]
            },
            {
                cat: "i",
                id:"i",
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
        cat: "i",
        id: "root",
        children: [
            {
                cat: "phi",
                id:"phi1",
                children:[
                    {
                        cat: "phi",
                        id:"phi2"
                    },
                    {
                        cat: "w",
                        id:"w1",
                        children:[
                            {
                                cat: "phi",
                                id:"a"
                            },
                            {
                                cat: "w",
                                id:"b"
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
                        cat: "phi",
                        id:"c"
                    },
                    {
                        cat: "w",
                        id:"d"
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
                                id:"e"
                            },
                            {
                                cat: "w",
                                id:"f"
                            }
                        ]
                    },
                    {
                        cat: "w",
                        id:"g"
                    }
                ]
            }
        ]
    }
    
    describe("strongEndTest.html", function(){
        describe('StrongEndLocal, One-Layer Case', function(){
            it('No violations: '+parenthesizeTree(ptree1), function() {
                assert.equal(strongEndLocal('', ptree1, ''), 0, parenthesizeTree(ptree1));
            });
            it('No violations: '+parenthesizeTree(ptree2), function() {
                assert.equal(strongEndLocal('', ptree2, ''), 0, parenthesizeTree(ptree2));
            });
            it('1 violation: '+parenthesizeTree(ptree3), function() {
                assert.equal(strongEndLocal('', ptree3, ''), 1, parenthesizeTree(ptree3));
            });
        })
        describe('StrongEndLocal, Multi-Layer Case', function(){
            it('2 violations: '+parenthesizeTree(ptree4), function() {
                assert.equal(strongEndLocal('', ptree4, ''), 2, parenthesizeTree(ptree4));
            });
            it('No violations: '+parenthesizeTree(ptree5), function() {
                assert.equal(strongEndLocal('', ptree5, ''), 0, parenthesizeTree(ptree5));
            });
            it('6 violations: '+parenthesizeTree(ptree6), function() {
                assert.equal(strongEndLocal('', ptree6, ''), 6, parenthesizeTree(ptree6));
            });
        })
        /*
        describe('Parameterizing StrongEnd to a category', function(){
            it('3 violations: StrongEnd(phi), '+parenthesizeTree(ptree6), function() {
                assert.equal(strongEndLocal('', ptree6, 'phi'), 3, parenthesizeTree(ptree6));
            });
            it('2 violations: StrongEnd(w), '+parenthesizeTree(ptree6), function() {
                assert.equal(strongEndLocal('', ptree6, 'w'), 2, parenthesizeTree(ptree6));
            });
            it('0 violations: StrongEnd(i), '+parenthesizeTree(ptree6), function() {
                assert.equal(strongEndLocal('', ptree6, 'i'), 2, parenthesizeTree(ptree6));
            });
        })*/
    });
}