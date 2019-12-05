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