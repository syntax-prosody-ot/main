//matchTest

function matchTest(){
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

	var ptree2 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "id": "Mismatch",
                "cat": "w"
            }
        ]
    };


	var ptree3 =     {
        "id": "root",
        "cat": "i",
        "children": [
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
    
    
	var ptree4 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "f",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    
    var ptree5 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "d",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
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
            }
        ]
    };
    
    var ptree6 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "d",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "f",
                                        "cat": "w"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
	
	
	var ptree7 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxMin",
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
            }
        ]
    };
    
    
	var ptree8 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "id": "a",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonmaxMin",
                        "children": [
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
                    }
                ]
            }
        ]
    };
    
    var ptree9 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonmaxMin",
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
                    },
                    {
                        "id": "e",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    
    var ptree10 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonmaxNonmin",
                        "children": [
                            {
                                "id": "a",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "nonmaxMin",
                                "children": [
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
                            }
                        ]
                    },
                    {
                        "id": "e",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    
	var ptree11 =  {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
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
    
    
    var ptree12 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "x0"
                            },
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
            },
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "x0"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "f",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    
    
    var ptree13 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "a",
                                "cat": "x0"
                            },
                            {
                                "id": "b",
                                "cat": "x0"
                            },
                            {
                                "id": "c",
                                "cat": "x0"
                            },
                            {
                                "id": "d",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
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
            }
        ]
    };
    
    
    var ptree14 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "a",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "b",
                                        "cat": "x0"
                                    },
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
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "f",
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
    
    var ptree15 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
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
    };
    
    var ptree16 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "c",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    
    var ptree17 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
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
    };
    
    
    var ptree18 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "b",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "c",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "d",
                                        "cat": "w"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree19 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
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
            }
        ]
    };
    
    var ptree20 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
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
    };
    
    var ptree21 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "id": "a",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonmaxMin",
                        "children": [
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
                    }
                ]
            }
        ]
    };
    
    var ptree22 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
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
            }
        ]
    };
    
	var ptree23 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
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
    
    var ptree24 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "c",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "f",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree25 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
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
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
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
            }
        ]
    };
    
    var ptree26 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "c",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "d",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "f",
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
	
    describe('Tableau 1: Tests all/only Syntactic Subcategories', function() {
        it('matchSP', function() {
            assert.equal(matchSP(stree1, ptree1, "xp"), 0, message(stree1, ptree1));
            assert.equal(matchSP(stree1, ptree2, "xp"), 4, message(stree1, ptree2));
        });
        it('maxSyntax', function() {
            let options = {"maxSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 2, message(stree1, ptree2, options));
        });
        it('nonMaxSyntax', function() {
            let options = {"nonMaxSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 2, message(stree1, ptree2, options));
        });
        it('minSyntax', function() {
            let options = {"minSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 2, message(stree1, ptree2, options));
        });
        it('minSyntax maxSyntax', function() {
            let options = {"maxSyntax": true, "minSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('minSyntax nonMaxSyntax', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('nonMinSyntax', function() {
            let options = {"nonMinSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 2, message(stree1, ptree2, options));
        });
        it('maxSyntax nonMinSyntax', function() {
            let options = {"nonMinSyntax": true, "maxSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('nonMaxSyntax nonMinSyntax', function() {
            let options = {"nonMinSyntax": true, "nonMaxSyntax": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 0, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
    });

    describe('Tableau 2: Tests all/only Prosodic Subcategories', function() {
        it('maxProsody', function() {
            let options = {"maxProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 2, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
        it('nonMaxProsody', function() {
            let options = {"nonMaxProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 2, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
        it('minProsody', function() {
            let options = {"minProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 2, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
        it('maxProsody minProsody', function() {
            let options = {"maxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 3, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
        it('nonMProsody minProsody', function() {
            let options = {"nonMaxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 3, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
        it('nonMinProsody', function() {
            let options = {"nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 2, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
        it('maxProsody nonMinProsody', function() {
            let options = {"maxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 3, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
        it('nonMaxProsody nonMinProsody', function() {
            let options = {"nonMaxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree1, "xp", options), 3, message(stree1, ptree1, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 4, message(stree1, ptree2, options));
        });
    });
    
    describe('Tableau 3: maxSyntax, minSyntax', function() {
        it('maxProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 1, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 1, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 0, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 0, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('nonMaxProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 0, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 0, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 1, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 1, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('minProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 1, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 0, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 1, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 0, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('maxProsody minProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "maxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 1, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 1, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 1, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 0, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('nonMaxProsody minProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 1, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 0, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 1, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 1, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('nonMinProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 0, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 1, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 0, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 1, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('maxProsody nonMinProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "nonMinProsody":true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 1, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 1, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 0, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 1, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
        it('nonMaxProsody nonMinProsody', function() {
            let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree6, "xp", options), 0, message(stree1, ptree6, options));
            assert.equal(matchSP(stree1, ptree5, "xp", options), 1, message(stree1, ptree5, options));
            assert.equal(matchSP(stree1, ptree4, "xp", options), 1, message(stree1, ptree4, options));
            assert.equal(matchSP(stree1, ptree3, "xp", options), 1, message(stree1, ptree3, options));
            assert.equal(matchSP(stree1, ptree2, "xp", options), 1, message(stree1, ptree2, options));
        });
    });    
    
    describe('Tableau 4: maxSyntax nonMinSyntax', function() {
        it('maxProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 0, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 0, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 0, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 0, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('minProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 0, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 0, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('maxProsody minProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "maxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 0, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody minProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 0, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMinProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 0, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 0, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('maxProsody nonMinProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMinProsody":true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 0, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody nonMinProsody', function() {
            let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 0, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9, "xp",  options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8, "xp",  options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7, "xp",  options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
    }); 
    
    describe('Tableau 5: maxSyntax', function() {
        it('maxProsody', function() {
            let options = {"maxSyntax": true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 2, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 2, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 0, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 0, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody', function() {
            let options = {"maxSyntax": true, "nonMaxProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 0, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 0, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 2, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 2, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it('minProsody', function() {
            let options = {"maxSyntax": true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 2, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 0, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 2, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 0, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it('maxProsody minProsody', function() {
            let options = {"maxSyntax": true, "maxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 2, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 2, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 2, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 0, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody minProsody', function() {
            let options = {"maxSyntax": true, "nonMaxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 2, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 0, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 2, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 2, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it('nonMinProsody', function() {
            let options = {"maxSyntax": true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 0, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 2, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 0, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 2, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it('maxProsody nonMinProsody', function() {
            let options = {"maxSyntax": true, "nonMinProsody":true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 2, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 2, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 0, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 2, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it(' nonMaxProsody nonMinProsody', function() {
            let options = {"maxSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree14, "xp", options), 0, message(stree1, ptree14, options));
            assert.equal(matchSP(stree1, ptree13, "xp", options), 2, message(stree1, ptree13, options));
            assert.equal(matchSP(stree1, ptree12, "xp", options), 2, message(stree1, ptree12, options));
            assert.equal(matchSP(stree1, ptree11, "xp", options), 2, message(stree1, ptree11, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
    }); 
    
    describe('Tableau 6: nonMaxSyntax minSyntax', function() {
        it('maxProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 1, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 1, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 0, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 0, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 0, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 0, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 1, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 1, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('minProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 1, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 0, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 1, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 0, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('maxProsody minProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "maxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 1, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 1, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 1, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 0, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody minProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "minProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 1, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 0, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 1, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 1, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMinProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 0, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 1, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 0, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 1, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('maxProsody nonMinProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMinProsody":true, "maxProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 1, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 1, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 0, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 1, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it('nonMaxProsody nonMinProsody', function() {
            let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
            assert.equal(matchSP(stree1, ptree18, "xp", options), 0, message(stree1, ptree18, options));
            assert.equal(matchSP(stree1, ptree17, "xp", options), 1, message(stree1, ptree17, options));
            assert.equal(matchSP(stree1, ptree16, "xp", options), 1, message(stree1, ptree16, options));
            assert.equal(matchSP(stree1, ptree15, "xp", options), 1, message(stree1, ptree15, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
    });
    
    describe("Tableau 7: nonMaxSyntax nonMinSyntax", function() {
        it("maxProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 0, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 0, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 0, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 0, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it("minProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 0, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 0, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it("maxProsody minProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 0, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody minProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 0, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it("nonMinProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 0, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 0, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it("maxProsody nonMinProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 0, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody nonMinProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 0, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 1, message(stree1, ptree2,  options));
        });
    });
    
    describe("Tableau 8: nonMaxSyntax", function() {
        it("maxProsody", function() {
            let options = {"nonMaxSyntax": true, "maxProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 2, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 2, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMaxProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 0, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 2, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("minProsody", function() {
            let options = {"nonMaxSyntax": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("maxProsody minProsody", function() {
            let options = {"nonMaxSyntax": true, "maxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 2, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 2, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 2, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 1, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody minProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMaxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 1, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 2, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMinProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 2, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 2, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("maxProsody nonMinProsody", function() {
            let options = {"nonMaxSyntax": true, "maxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 2, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 2, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 1, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 2, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody nonMinProsody", function() {
            let options = {"nonMaxSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree22, "xp", options), 1, message(stree1, ptree22, options));
            assert.equal(matchSP(stree1, ptree21, "xp", options), 2, message(stree1, ptree21, options));
            assert.equal(matchSP(stree1, ptree20, "xp", options), 2, message(stree1, ptree20, options));
            assert.equal(matchSP(stree1, ptree19, "xp", options), 2, message(stree1, ptree19, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
    });
    
    describe("Tableau 9: minSyntax", function() {
        it("maxProsody", function() {
            let options = {"minSyntax": true, "maxProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 2, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 2, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 0, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 0, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody", function() {
            let options = {"minSyntax": true, "nonMaxProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 0, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 0, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 2, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 2, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("minProsody", function() {
            let options = {"minSyntax": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 2, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 0, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 2, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 0, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("maxProsody minProsody", function() {
            let options = {"minSyntax": true, "maxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 2, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 2, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 2, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 0, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody minProsody", function() {
            let options = {"minSyntax": true, "nonMaxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 2, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 0, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 2, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 2, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMinProsody", function() {
            let options = {"minSyntax": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 0, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 2, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 0, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 2, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("maxProsody nonMinProsody", function() {
            let options = {"minSyntax": true, "maxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 2, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 2, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 0, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 2, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody nonMinProsody", function() {
            let options = {"minSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree26, "xp", options), 0, message(stree1, ptree26, options));
            assert.equal(matchSP(stree1, ptree25, "xp", options), 2, message(stree1, ptree25, options));
            assert.equal(matchSP(stree1, ptree24, "xp", options), 2, message(stree1, ptree24, options));
            assert.equal(matchSP(stree1, ptree23, "xp", options), 2, message(stree1, ptree23, options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
    });
    
    describe("Tableau 10: nonMinSyntax", function() {
        it("maxProsody", function() {
            let options = {"nonMinSyntax": true, "maxProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 2, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 2, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody", function() {
            let options = {"nonMinSyntax": true, "nonMaxProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 0, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 2, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2, "xp",  options), 2, message(stree1, ptree2,  options));
        });
        it("minProsody", function() {
            let options = {"nonMinSyntax": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2,  "xp", options), 2, message(stree1, ptree2,  options));
        });
        it("maxProsody minProsody", function() {
            let options = {"nonMinSyntax": true, "maxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 2, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 2, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 2, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 1, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2,  "xp", options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody minProsody", function() {
            let options = {"nonMinSyntax": true, "nonMaxProsody": true, "minProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 1, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 2, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2,  "xp", options), 2, message(stree1, ptree2,  options));
        });
        it("nonMinProsody", function() {
            let options = {"nonMinSyntax": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 2, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 2, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2,  "xp", options), 2, message(stree1, ptree2,  options));
        });
        it("maxProsody nonMinProsody", function() {
            let options = {"nonMinSyntax": true, "maxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 2, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 2, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 1, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 2, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2,  "xp", options), 2, message(stree1, ptree2,  options));
        });
        it("nonMaxProsody nonMinProsody", function() {
            let options = {"nonMinSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
            assert.equal(matchSP(stree1, ptree10, "xp", options), 1, message(stree1, ptree10, options));
            assert.equal(matchSP(stree1, ptree9,  "xp", options), 2, message(stree1, ptree9,  options));
            assert.equal(matchSP(stree1, ptree8,  "xp", options), 2, message(stree1, ptree8,  options));
            assert.equal(matchSP(stree1, ptree7,  "xp", options), 2, message(stree1, ptree7,  options));
            assert.equal(matchSP(stree1, ptree2,  "xp", options), 2, message(stree1, ptree2,  options));
        });
    });

}

matchTest();