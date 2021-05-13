function weakStartTest(){
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
                cat: "w",
                id:"w"
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
                        cat: "w",
                        id:"w"
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
    describe("weakStartTest.html", function(){
        describe('Simple Case', function() {
            it('ptree1: ', function() {
                assert.equal(weakStartLocal('', ptree1, ''), 0);
            });
            it('ptree2: ', function() {
                assert.equal(weakStartLocal('', ptree2, ''), 0);
            });
            it('ptree3: ', function() {
                assert.equal(weakStartLocal('', ptree3, ''), 1);
            });
        });
        describe('Advanced Case', function() {
            it('ptree4: ', function() {
                assert.equal(weakStartLocal('', ptree4, ''), 2);
            });
            it('ptree5: ', function() {
                assert.equal(weakStartLocal('', ptree5, ''), 0);
            });
            it('ptree6: ', function() {
                assert.equal(weakStartLocal('', ptree6, ''), 6);
            });
        });
    });
}