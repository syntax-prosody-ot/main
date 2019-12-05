/* File for built-in analysis syntax tree inputs
 *
 * This file gets loaded directly into interface1.html so make sure your
 * variable names don't conflict with other global variables.
 *
 * Define one variable per analysis as a single object or as an array of objects
 * just like you would input into the manual tree entry in the interface.
 */
var irish_trees = [{
    "id": "SigmaP",
    "cat": "xp",
    "children": [
        {
            "id": "V",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "DPs",
            "children": [
                {
                    "id": "N",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "AP",
                    "children": [
                        {
                            "id": "A",
                            "cat": "x0"
                        }
                    ]
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
            "id": "V",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "TP",
            "children": [
                {
                    "cat": "xp",
                    "id": "DPs",
                    "children": [
                        {
                            "id": "Ns",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "AP",
                            "children": [
                                {
                                    "id": "As",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "DPo",
                    "children": [
                        {
                            "id": "No",
                            "cat": "x0"
                        }
                    ]
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
            "id": "V",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "TP",
            "children": [
                {
                    "cat": "xp",
                    "id": "DPs",
                    "children": [
                        {
                            "id": "Ns",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "DPo",
                    "children": [
                        {
                            "id": "No",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "AP",
                            "children": [
                                {
                                    "id": "Ao",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
  },
  {
    "id": "SigmaP",
    "cat": "cp",
    "children": [
        {
            "id": "V",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "TP",
            "children": [
                {
                    "cat": "xp",
                    "id": "DPs",
                    "children": [
                        {
                            "id": "Ns",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "APs",
                            "children": [
                                {
                                    "id": "As",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                },
                {
                    "cat": "xp",
                    "id": "DPo",
                    "children": [
                        {
                            "id": "No",
                            "cat": "x0"
                        },
                        {
                            "cat": "xp",
                            "id": "APo",
                            "children": [
                                {
                                    "id": "Ao",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}];

var kinyambo_trees = [
    {
        "id":"TP",
        "cat":"xp",
        "children":
            [{
                    "id":"NP",
                    "cat":"xp",
                    "children":
                        [
                            {
                                "id":"workers",
                                "cat":"x0"
                            }
                        ]
                },
                {
                    "id":"Tbar",
                    "cat":"xbar",
                    "children":
                        [
                            {
                                "id":"VP",
                                "cat":"xp",
                                "children":
                                    [
                                        {
                                            "id":"helped",
                                            "cat":"x0"
                                        }
                                    ]
                            }
                        ]
                }
            ]
        },
    {
        "id":"TP",
        "cat":"xp",
        "children":
            [
                {
                    "id":"vP",
                    "cat":"xp",
                    "children":
                        [
                            {
                                "id":"show",
                                "cat":"x0"
                            },
                            {
                                "id":"VP",
                                "cat":"xp",
                                "children":
                                    [
                                        {
                                            "id":"NP-IO",
                                            "cat":"xp",
                                            "children":
                                                [
                                                    {
                                                        "id":"workers",
                                                        "cat":"x0"
                                                    }
                                                ]
                                        },
                                        {
                                            "id":"Vbar",
                                            "cat":"xbar",
                                            "children":
                                                [
                                                    {
                                                        "id":"NP-DO",
                                                        "cat":"xp",
                                                        "children":
                                                            [
                                                                {
                                                                    "id":"dog",
                                                                    "cat":"x0"
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
    },
    {
        "id":"TP",
        "cat":"xp",
        "children":
            [
                {
                    "id":"NP1",
                    "cat":"xp",
                    "children":
                        [
                            {
                                "id":"NP2",
                                "cat":"xp",
                                "children":
                                    [
                                        {
                                            "id":"workers",
                                            "cat":"x0"
                                        }
                                    ]
                            },
                            {
                                "id":"AP",
                                "cat":"xp",
                                "children":
                                    [
                                        {
                                            "id":"mature",
                                            "cat":"x0"
                                        }
                                    ]
                            }
                        ]
                },
                {
                    "id":"Tbar",
                    "cat":"xbar",
                    "children":
                        [
                            {
                                "id":"VP",
                                "cat":"xp",
                                "children":
                                    [
                                        {
                                            "id":"helped",
                                            "cat":"x0"
                                        }
                                    ]
                            }
                        ]
                }
            ]
    },
    {
        "id":"TP",
        "cat":"xp",
        "children":
            [
                {
                    "id":"vP1",
                    "cat":"xp",
                    "children":
                        [
                            {
                                "id":"vP2",
                                "cat":"xp",
                                "children":
                                    [
                                        {
                                            "id":"give",
                                            "cat":"x0"
                                        },
                                        {
                                            "id":"VP",
                                            "cat":"xp",
                                            "children":
                                                [
                                                    {
                                                        "id":"NP-IO",
                                                        "cat":"xp",
                                                        "children":
                                                            [
                                                                {
                                                                    "id":"worker",
                                                                    "cat":"x0"
                                                                }
                                                            ]
                                                    },
                                                    {
                                                        "id":"Vbar",
                                                        "cat":"xbar",
                                                        "children":
                                                            [
                                                                {
                                                                    "id":"NP-DO",
                                                                    "cat":"xp",
                                                                    "children":
                                                                        [
                                                                            {
                                                                                "id":"chair",
                                                                                "cat":"x0"
                                                                            }
                                                                        ]
                                                                }
                                                            ]
                                                    }
                                                ]
                                        }
                                    ]
                            },
                            {
                                "id":"AdvP",
                                "cat":"xp",
                                "children":
                                    [
                                        {
                                            "id":"slowly",
                                            "cat":"x0"
                                        }
                                    ]
                            }
                        ]
                }
            ]
    }
];

var chamorro_clitic_trees = 
   [
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "DP_silent",
                "silentHead": true,
                "children": [
                    {
                        "cat": "xp",
                        "id": "XP_7",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_4",
                                "children": [
                                    {
                                        "id": "aguaguat",
                                        "cat": "x0"
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "XP_5",
                                "children": [
                                    {
                                        "id": "na_patgun",
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
                "id": "XP_6",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "DP_silent",
                "silentHead": true,
                "children": [
                    {
                        "cat": "xp",
                        "id": "XP_7",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_4",
                                "children": [
                                    {
                                        "id": "man-suetti-n_taotao",
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
                "id": "XP_6",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "VP",
                "children": [
                    {
                        "id": "malagu'",
                        "cat": "x0"
                    },
                    {
                        "cat": "xp",
                        "id": "DP_silent",
                        "silentHead": true,
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_8",
                                "children": [
                                    {
                                        "cat": "xp",
                                        "id": "XP_5",
                                        "children": [
                                            {
                                                "id": "nuebu",
                                                "cat": "x0"
                                            }
                                        ]
                                    },
                                    {
                                        "cat": "xp",
                                        "id": "XP_6",
                                        "children": [
                                            {
                                                "id": "na_kareta",
                                                "cat": "x0"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_7",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "ma'a'nao",
                        "cat": "x0"
                    },
                    {
                        "cat": "xp",
                        "id": "DP_silent",
                        "silentHead": true,
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_4",
                                "children": [
                                    {
                                        "id": "cha'ka",
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
                "id": "XP_7",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "DP_silent",
                "silentHead": true,
                "children": [
                    {
                        "cat": "xp",
                        "id": "XP_4",
                        "children": [
                            {
                                "id": "ma'estro-nna",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "XP_5",
                        "children": [
                            {
                                "id": "si_Carmen",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "DP_silent",
                "silentHead": true,
                "children": [
                    {
                        "cat": "xp",
                        "id": "XP_9",
                        "children": [
                            {
                                "cat": "cp",
                                "id": "CP",
                                "children": [
                                    {
                                        "cat": "xp",
                                        "id": "VP",
                                        "children": [
                                            {
                                                "id": "mas",
                                                "cat": "x0"
                                            },
                                            {
                                                "cat": "xp",
                                                "id": "VP",
                                                "children": [
                                                    {
                                                        "id": "ya-hu",
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
                                "id": "XP_10",
                                "children": [
                                    {
                                        "id": "na_taotao",
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
                "id": "XP_11",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "DP_silent",
                "silentHead": true,
                "children": [
                    {
                        "cat": "xp",
                        "id": "XP_11",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_6",
                                "children": [
                                    {
                                        "id": "i_mas",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "amku'",
                                        "cat": "x0"
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "XP_10",
                                "children": [
                                    {
                                        "cat": "xp",
                                        "id": "XP_8",
                                        "children": [
                                            {
                                                "id": "na_chi'lu-hu",
                                                "cat": "x0"
                                            }
                                        ]
                                    },
                                    {
                                        "cat": "xp",
                                        "id": "XP_9",
                                        "children": [
                                            {
                                                "id": "palao'an",
                                                "cat": "x0"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_7",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
        /*{
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "DP_silent",
                "silentHead": true,
                "children": [
                    {
                        "cat": "xp",
                        "id": "XP_11",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_6",
                                "silentHead": true,
                                "children": [
                                    {
                                        "id": "i_mas",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "amku'",
                                        "cat": "x0"
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "XP_10",
                                "children": [
                                    {
                                        "cat": "xp",
                                        "id": "XP_8",
                                        "children": [
                                            {
                                                "id": "na_chi'lu-hu",
                                                "cat": "x0"
                                            }
                                        ]
                                    },
                                    {
                                        "cat": "xp",
                                        "id": "XP_9",
                                        "children": [
                                            {
                                                "id": "palao'an",
                                                "cat": "x0"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_7",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },*/
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_9",
                "children": [
                    {
                        "cat": "xp",
                        "id": "DP_silent",
                        "silentHead": true,
                        "children": [
                            {
                                "cat": "xp",
                                "id": "XP_8",
                                "children": [
                                    {
                                        "cat": "xp",
                                        "id": "XP_6",
                                        "children": [
                                            {
                                                "id": "ginin_San_Roque",
                                                "cat": "x0"
                                            }
                                        ]
                                    },
                                    {
                                        "cat": "xp",
                                        "id": "XP_7",
                                        "children": [
                                            {
                                                "id": "na_songsung",
                                                "cat": "x0"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_10",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    },
                    {
                        "cat": "cp",
                        "id": "TP",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "DP_silent",
                                "silentHead": true,
                                "children": [
                                    {
                                        "cat": "xp",
                                        "id": "NP",
                                        "children": [
                                            {
                                                "id": "patgon-na",
                                                "cat": "x0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "DP",
                                "children": [
                                    {
                                        "id": "clitic",
                                        "cat": "clitic"
                                    }
                                ]
                            }
                        ]
                    },
    {
        "id": "TP",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "NP",
                "children": [
                    {
                        "cat": "xp",
                        "id": "NP",
                        "children": [
                            {
                                "id": "famalao'an",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "PP",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "DP",
                                "children": [
                                    {
                                        "id": "ginin_todus",
                                        "cat": "x0"
                                    },
                                    {
                                        "cat": "xp",
                                        "id": "DP",
                                        "children": [
                                            {
                                                "id": "i_islas",
                                                "cat": "x0"
                                            },
                                            {
                                                "id": "gi_Pasifika",
                                                "cat": "x0"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "DP",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    }
    /*{
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "TP",
                "children": [
                    {
                        "cat": "xp",
                        "id": "TopP",
                        "children": [
                            {
                                "id": "si_Miguel",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "cat": "xp",
                        "id": "TP",
                        "children": [
                            {
                                "cat": "xp",
                                "id": "DP_silent",
                                "silentHead": true,
                                "children": [
                                    {
                                        "cat": "xp",
                                        "id": "NP",
                                        "children": [
                                            {
                                                "id": "patgon-na",
                                                "cat": "x0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "cat": "xp",
                                "id": "DP",
                                "children": [
                                    {
                                        "id": "clitic",
                                        "cat": "clitic"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }*/
];