		
		var a2n = {
    "id": "NP2",
    "cat": "xp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "NP1",
            "children": [
                {
                    "id": "a_1",
                    "cat": "x0"
                },
                {
                    "id": "n",
                    "cat": "x0"
                }
            ]
        }
    ]
};

var a2n_CS = GEN(a2n, 'a a n', {obeysExhaustivity:true});

	var a3n = {
    "id": "NP3",
    "cat": "xp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "NP2",
            "children": [
                {
                    "id": "a_1",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "NP1",
                    "children": [
                        {
                            "id": "a_2",
                            "cat": "x0"
                        },
                        {
                            "id": "n",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
};

var a3n_CS = GEN(a3n, 'a a a n', {obeysExhaustivity: true});

var a2np = {
    "id": "NP2",
    "cat": "xp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "NP1",
            "children": [
                {
                    "id": "a_1",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "NP",
                    "children": [
                        {
                            "id": "n",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
};

var a2np_CS = GEN(a2np, 'a a n', {obeysExhaustivity:true});

var a3np = {
    "id": "NP3",
    "cat": "xp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "NP2",
            "children": [
                {
                    "id": "a_1",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "NP1",
                    "children": [
                        {
                            "id": "a_2",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "NP",
                            "children": [
                                {
                                    "id": "n",
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
		
var a3np_CS = GEN(a3np, 'a a a n', {obeysExhaustivity:true});
		
		var ap2np = {
    "id": "NP3",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "AP1",
            "children": [
                {
                    "id": "a",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "NP2",
            "children": [
                {
                    "cat": "xp",
                    "id": "AP2",
                    "children": [
                        {
                            "id": "a_1",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "NP1",
                    "children": [
                        {
                            "id": "n",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
};

var ap2np_CS = GEN(ap2np, 'a a n', {obeysExhaustivity:true});

var ap3np = {
    "id": "NP4",
    "cat": "cp",
    "children": [
        {
            "cat": "xp",
            "id": "AP",
            "children": [
                {
                    "id": "a",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "NP3",
            "children": [
                {
                    "cat": "xp",
                    "id": "AP1",
                    "children": [
                        {
                            "id": "a_1",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "NP2",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "AP2",
                            "children": [
                                {
                                    "id": "a_2",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "cat": "xp",
                            "id": "NP1",
                            "children": [
                                {
                                    "id": "n",
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

var ap3np_CS = GEN(ap3np, 'a a a n', {obeysExhaustivity:true});
		
		var nnvLCC = {
    "id": "vp",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "NP",
            "children": [
                {
                    "id": "n",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "NP1",
            "children": [
                {
                    "id": "n_1",
                    "cat": "x0"
                }
            ]
        },
        {
            "id": "v",
            "cat": "x0"
        }
    ]
};

	var nnvLCC_CS = GEN(nnvLCC, 'n n v', {obeysExhaustivity:true});


	var nnvEV = {
    "id": "VP2",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "VP1",
            "children": [
                {
                    "cat": "xp",
                    "id": "NP",
                    "children": [
                        {
                            "id": "n",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "NP1",
                    "children": [
                        {
                            "id": "n_1",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        },
        {
            "id": "v",
            "cat": "x0"
        }
    ]
};

var nnvEV_CS = GEN(nnvEV, 'n n v', {obeysExhaustivity:true});

		
		var vnnLCC = {
    "id": "VP",
    "cat": "xp",
    "children": [
        {
            "id": "v",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "NP",
            "children": [
                {
                    "id": "n",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "NP1",
            "children": [
                {
                    "id": "n_1",
                    "cat": "x0"
                }
            ]
        }
    ]
};
		
	var vnnLCC_CS = GEN(vnnLCC, 'v n n', {obeysExhaustivity:true});
		
	var vnnEV = {
    "id": "VP1",
    "cat": "xp",
    "children": [
        {
            "id": "v",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "VP2",
            "children": [
                {
                    "cat": "xp",
                    "id": "NP",
                    "children": [
                        {
                            "id": "n",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "NP1",
                    "children": [
                        {
                            "id": "n_1",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
};

var vnnEV_CS = GEN(vnnEV, 'v n n', {obeysExhaustivity:true});

		
		var svio = {
    "id": "CP",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "SP",
            "children": [
                {
                    "id": "s",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "Cbar",
            "children": [
                {
                    "id": "v",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "IP",
                    "children": [
                        {
                            "id": "i",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "OP",
                    "children": [
                        {
                            "id": "o",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
};

var svio_CS = GEN(svio, 's v i o', {obeysExhaustivity:true});
		
		var riceOfPeople = {
    "id": "NP",
    "cat": "xp",
    "children": [
        {
            "id": "rice",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "NP",
            "children": [
                {
                    "id": "ofPeople",
                    "cat": "x0"
                } 
            ]
        }
    ]
};

var riceOfPeople_CS = GEN(riceOfPeople, 'rice ofPeople', {obeysExhaustivity:true});

var riceRotted = {
    "id": "TP",
    "cat": "func",
    "children": [
        {
            "cat": "xp",
            "id": "NP",
            "children": [
                {
                    "id": "rice",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "VP",
            "children": [
                {
                    "id": "rotted",
                    "cat": "x0"
                }
            ]
        }
    ]
};

var riceRotted_CS = GEN(riceRotted, 'rice rotted', {obeysExhaustivity:true});


var gaveShellMamboondo = {
    "id": "VP",
    "cat": "xp",
    "children": [
        {
            "id": "gave",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "NP1",
            "children": [
                {
                    "id": "shell",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "NP2",
            "children": [
                {
                    "id": "mamboondo",
                    "cat": "x0"
                }
            ]
        }
    ]
};

var gaveShellMamboondo_CS = GEN(gaveShellMamboondo, 'gave shell mamboondo', {obeysExhaustivity:true});


var shellOfBishopLarge  = {
    "id": "NP2",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "NP1",
            "children": [
                {
                    "id": "shell",
                    "cat": "x0"
                },
                {
                    "id": "ofBishop",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "AP",
            "children": [
                {
                    "id": "large",
                    "cat": "x0"
                }
            ]
        }
    ]
};

var shellOfBishopLarge_CS = GEN(shellOfBishopLarge, 'shell ofBishop large', {obeysExhaustivity:true});

var gaveMamboondoCoverFriday = {
    "id": "VP2",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "VP1",
            "children": [
                {
                    "id": "gave",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "NP1",
                    "children": [
                        {
                            "id": "mamboondo",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "NP2",
                    "children": [
                        {
                            "id": "cover",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "xp",
            "id": "AdvP",
            "children": [
                {
                    "id": "friday",
                    "cat": "x0"
                }
            ]
        }
    ]
};

var gaveMamboondoCoverFriday_CS = GEN(gaveMamboondoCoverFriday, 'gave mamboondo cover friday', {obeysExhaustivity:true});


var manWetAte = {
    "id": "NP3",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "NP2",
            "children": [
                {
                    "cat": "xp",
                    "id": "NP1",
                    "children": [
                        {
                            "id": "man",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "AP",
                    "children": [
                        {
                            "id": "wet",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "xp",
            "id": "RC",
            "children": [
                {
                    "id": "ate",
                    "cat": "x0"
                }
            ]
        }
    ]
};

var manWetAte_CS = GEN(manWetAte, 'man wet ate', {obeysExhaustivity:true});

		
		var zyx = {
    "id": "XP",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "YP",
            "children": [
                {
                    "id": "z",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "ZP",
            "children": [
                {
                    "id": "y",
                    "cat": "x0"
                }
            ]
        },
        {
            "id": "x",
            "cat": "x0"
        }
    ]
};

var zyx_CS = GEN(zyx, 'z y x', {obeysExhaustivity:true});
	
		var xyz = {
    "id": "XP",
    "cat": "xp",
    "children": [
        {
            "id": "x",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "YP",
            "children": [
                {
                    "id": "y",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "ZP",
            "children": [
                {
                    "id": "z",
                    "cat": "x0"
                }
            ]
        }
    ]
};

var xyz_CS = GEN(xyz, 'x y z', {obeysExhaustivity:true});

	var uuuLeft = {
    "id": "XP3",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP2",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP1",
                    "children": [
                        {
                            "id": "u",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "u_1",
                    "cat": "x0"
                }
            ]
        },
        {
            "id": "u_2",
            "cat": "x0"
        }
    ]
};
	var uuuLeft_CS = GEN(uuuLeft, 'u u u', {obeysExhaustivity:true});

	var aaaLeft = {
    "id": "XP3",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP2",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP1",
                    "children": [
                        {
                            "id": "a",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "a_1",
                    "cat": "x0"
                }
            ]
        },
        {
            "id": "a_2",
            "cat": "x0"
        }
    ]
};

var aaaLeft_CS = GEN(aaaLeft, 'a a a', {obeysExhaustivity:true});


	var uuuuFour = {
    "id": "XP4",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP3",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP2",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "XP1",
                            "children": [
                                {
                                    "id": "u",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "id": "u_1",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "u_2",
                    "cat": "x0"
                }
            ]
        },
        {
            "id": "u_3",
            "cat": "x0"
        }
    ]
};

var uuuuFour_CS = GEN(uuuuFour, 'u u u u', {obeysExhaustivity:true})

var aaaaFour = {
    "id": "XP4",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP3",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP2",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "XP1",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "id": "a_1",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "a_2",
                    "cat": "x0"
                }
            ]
        },
        {
            "id": "a_3",
            "cat": "x0"
        }
    ]
};

var aaaaFour_CS = GEN(aaaaFour, 'a a a a', {obeysExhaustivity:true});