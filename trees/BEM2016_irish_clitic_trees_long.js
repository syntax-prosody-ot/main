// Bennett et al. (2016) Trees

var long_test = [
    {
        "id": "SigmaP",
        "cat": "xp",
        "children": [
            {
                "id": "thug",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "DP",
                "children": [
                    {
                        "id": "mo",
                        "cat": "x0"
                    },
                    {
                        "id": "mhathair",
                        "cat": "x0"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_13",
                "children": [
                    {
                        "cat": "xp",
                        "id": "DP",
                        "children": [
                            {
                                "id": "e",
                                "cat": "clitic"
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "PP_fhad_le_teach_na_scoile",
                        "children": [
                            {
                                "id": "fhad_le_teach",
                                "cat": "x0"
                            },
                            {
                                "id": "na_scoile",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]


var irish_clitic_trees = [
    {
        "id": "SigmaP",
        "cat": "xp",
        "children": [
            {
                "id": "thug",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "DP",
                "children": [
                    {
                        "id": "mo",
                        "cat": "x0"
                    },
                    {
                        "id": "mhathair",
                        "cat": "x0"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_13",
                "children": [
                    {
                        "cat": "xp",
                        "id": "DP",
                        "children": [
                            {
                                "id": "e",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "PP_fhad_le_teach_na_scoile",
                        "children": [
                            {
                                "id": "fhad",
                                "cat": "x0"
                            },
                            {
                                "id": "le",
                                "cat": "x0"
                            },
                            {
                                "id": "teach",
                                "cat": "x0"
                            },
                            {
                                "id": "na",
                                "cat": "x0"
                            },
                            {
                                "id": "scoile",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "vP",
        "cat": "xp",
        "children": [
            {
                "cat": "xp",
                "id": "vP",
                "children": [
                    {
                        "cat": "xp",
                        "id": "vP",
                        "children": [
                            {
                                "id": "e",
                                "cat": "x0"
                            },
                            {
                                "cat": "xp",
                                "id": "PP_do_mo_mhathair",
                                "children": [
                                    {
                                        "id": "do",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "mo",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "mhathair",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "PP_seachtain_o_shin",
                        "children": [
                            {
                                "id": "seachtain",
                                "cat": "x0"
                            },
                            {
                                "id": "o_shin",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "PP",
                "children": [
                    {
                        "id": "i",
                        "cat": "x0"
                    },
                    {
                        "id": "nDoire",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "SigmaP",
        "cat": "xp",
        "children": [
            {
                "id": "cuirfear",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "TP",
                "children": [
                    {
                        "cat": "xp",
                        "id": "vP",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "vP",
                                "children": [
                                    {
                                        "id": "e",
                                        "cat": "x0"
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "PP_i_reilg_na_Cruite_De_Mairt",
                                "children": [
                                    {
                                        "id": "i",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "reilg",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "na",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "Cruite",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "De",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "Mairt",
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
];


var irish_tree_noclitic = {
        "id": "SigmaP",
        "cat": "xp",
        "children": [
            {
                "id": "thug",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "DP",
                "children": [
                    {
                        "id": "mo",
                        "cat": "x0"
                    },
                    {
                        "id": "mhathair",
                        "cat": "x0"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_13",
                "children": [
                    {
                        "cat": "xp",
                        "id": "DP",
                        "children": [
                            {
                                "id": "clitic",
                                "cat": "clitic"
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "PP_fhad_le_teach_na_scoile",
                        "children": [
                            {
                                "id": "fhad",
                                "cat": "x0"
                            },
                            {
                                "id": "le",
                                "cat": "x0"
                            },
                            {
                                "id": "teach",
                                "cat": "x0"
                            },
                            {
                                "id": "na",
                                "cat": "x0"
                            },
                            {
                                "id": "scoile",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    };



var irish_clitic_trees_moving = [
   {
        "id": "SigmaP",
        "cat": "xp",
        "children": [
            {
                "id": "thug",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "DP",
                "children": [
                    {
                        "id": "mo",
                        "cat": "x0"
                    },
                    {
                        "id": "mhathair",
                        "cat": "x0"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_13",
                "children": [
                    {
                        "cat": "xp",
                        "id": "DP",
                        "children": [
                            {
                                "id": "e",
                                "cat": "clitic"
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "PP_fhad_le_teach_na_scoile",
                        "children": [
                            {
                                "id": "fhad",
                                "cat": "x0"
                            },
                            {
                                "id": "le",
                                "cat": "x0"
                            },
                            {
                                "id": "teach",
                                "cat": "x0"
                            },
                            {
                                "id": "na",
                                "cat": "x0"
                            },
                            {
                                "id": "scoile",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "vP",
        "cat": "xp",
        "children": [
            {
                "cat": "xp",
                "id": "vP",
                "children": [
                    {
                        "cat": "xp",
                        "id": "vP",
                        "children": [
                            {
                                "id": "e",
                                "cat": "clitic"
                            },
                            {
                                "cat": "xp",
                                "id": "PP_do_mo_mhathair",
                                "children": [
                                    {
                                        "id": "do",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "mo",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "mhathair",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "PP_seachtain_o_shin",
                        "children": [
                            {
                                "id": "seachtain",
                                "cat": "x0"
                            },
                            {
                                "id": "o",
                                "cat": "x0"
                            },
                            {
                                "id": "shin",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "PP",
                "children": [
                    {
                        "id": "i",
                        "cat": "x0"
                    },
                    {
                        "id": "nDoire",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "SigmaP",
        "cat": "xp",
        "children": [
            {
                "id": "cuirfear",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "TP",
                "children": [
                    {
                        "cat": "xp",
                        "id": "vP",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "vP",
                                "children": [
                                    {
                                        "id": "e",
                                        "cat": "clitic"
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "PP_i_reilg_na_Cruite_De_Mairt",
                                "children": [
                                    {
                                        "id": "i",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "reilg",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "na",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "Cruite",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "De",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "Mairt",
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
];

var irish_clitic_trees_combined = irish_clitic_trees.concat(irish_clitic_trees_moving);