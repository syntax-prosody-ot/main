var italian_adj_noun = {
    "id": "CP1",
    "cat": "cp",
    "func": true,
    "silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "DP",
            "func": true,
            "silentHead": false,
            "children": [
                {
                    "id": "unaMaggiore",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "NP",
                    "func": false,
                    "silentHead": false,
                    "children": [
                        {
                            "id": "sicurezza",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
};


var italian_noun_adj = {
    "id": "CP1",
    "cat": "cp",
    "func": true,
    "silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "DP",
            "func": true,
    		"silentHead": false,
            "children": [
                {
                    "id": "leCitta",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "AP",
                    "func": false,
					"silentHead": false,
                    "children": [
                        {
                            "id": "nordiche",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
};

var italian_noun_adv_adj = {
    "id": "CP1",
    "cat": "cp",
    "func": true,
    "silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "DP",
		    "func": true,
		    "silentHead": false,
            "children": [
                {
                    "id": "leCitta",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "AP",
			    	"func": false,
				    "silentHead": false,
                    "children": [
                        {
                            "cat": "xp",
                            "id": "AdvP",
    						"func": false,
    						"silentHead": false,
                            "children": [
                                {
                                    "id": "molto",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "cat": "xp",
                            "id": "AP",
						    "func": false,
						    "silentHead": false,
                            "children": [
                                {
                                    "id": "nordiche",
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

var italian_ditrans = {
    "id": "CP1",
    "cat": "cp",
    "func": true,
   	"silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "TP",
		    "func": false,
		   	"silentHead": false,
            "children": [
                {
                    "id": "daro",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "VP",
    				"func": true,
   					"silentHead": true,
                    "children": [
                        {
                            "cat": "xp",
                            "id": "DP",
                            "func": true,
   							"silentHead": false,
                            "children": [
                                {
                                    "id": "unLibro",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "cat": "xp",
                            "id": "PP",
                            "func": true,
   							"silentHead": false,
                            "children": [
                                {
                                    "id": "aGianni",
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

var italian_subj_verb = {
    "id": "CP",
    "cat": "cp",
    "func": true,
    "silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "DP",
            "func": true,
            "silentHead": false,
            "children": [
                {
                    "id": "laVerita",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "TP",
            "func": false,
            "silentHead": false,
            "children": [
                {
                    "id": "vince",
                    "cat": "x0"
                }
            ]
        }
    ]
};


var italian_noun_pp = {
    "id": "CP1",
    "cat": "cp",
    "func": true,
   	"silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "TP",
       		"func": false,
   	 		"silentHead": false,
            "children": [
                {
                    "id": "rimane",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "DP",
                    "func": true,
   	 				"silentHead": false,
                    "children": [
                        {
                            "id": "ilSapore",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "PP",
                        	"func": true,
   	 						"silentHead": false,
                            "children": [
                                {
                                    "id": "diCioccolata",
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

var italian_verb_do_1 = {
    "id": "CP1",
    "cat": "cp",
   	"func": true,
   	"silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "TP",
            "func": false,
   	 		"silentHead": false,
            "children": [
                {
                    "id": "hoMangiato",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "DP",
                    "func": true,
   	 				"silentHead": false,
                    "children": [
                        {
                            "id": "deiPasticcini",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "AP",
                            "func": false,
   	 						"silentHead": false,
                            "children": [
                                {
                                    "id": "ripieni",
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

var italian_verb_do_2 = {
    "id": "CP1",
    "cat": "cp",
    "func": true,
   	"silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "TP",
         	"func": false,
   	 		"silentHead": false,
            "children": [
                {
                    "id": "hoMangiato",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "DP",
                    "func": true,
   	 				"silentHead": false,
                    "children": [
                        {
                            "id": "deiPasticcini",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "AP",
                            "func": false,
   	 						"silentHead": false,
                            "children": [
                                {
                                    "id": "ripieni",
                                    "cat": "x0"
                                },
                                {
                                    "cat": "xp",
                                    "id": "PP",
                                    "func": true,
   	 								"silentHead": false,
                                    "children": [
                                        {
                                            "id": "diCioccolata",
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
    ]
};

var italian_verb_do_3 = {
    "id": "CP1",
    "cat": "cp",
    "func": true,
   	"silentHead": true,
    "children": [
        {
            "cat": "xp",
            "id": "TP",
            "func": true,
   	 		"silentHead": false,
            "children": [
                {
                    "id": "hoMangiato",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "DP",
                    "func": true,
   	 				"silentHead": false,
                    "children": [
                        {
                            "id": "deiPasticcini",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "AP",
                            "func": false,
   	 						"silentHead": false,
                            "children": [
                                {
                                    "id": "ripieni",
                                    "cat": "x0"
                                },
                                {
                                    "cat": "xp",
                                    "id": "PP",
                                    "func": true,
   	 								"silentHead": false,
                                    "children": [
                                        {
                                            "id": "diCioccolata",
                                            "cat": "x0"
                                        },
                                        {
                                            "cat": "xp",
                                            "id": "AP",
                                            "func": false,
   	 										"silentHead": false,
                                            "children": [
                                                {
                                                    "id": "amara",
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
            ]
        }
    ]
};
