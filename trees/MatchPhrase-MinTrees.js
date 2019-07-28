/* this file contains the trees for testing MatchPhrase-Min */
var stree_no_violations =
{
    "id": "CP1",
    "cat": "cp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_7",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "a",
                            "cat": "x0"
                        },
                        {
                            "id": "b",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "c",
                    "cat": "x0"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "XP_9",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_8",
                    "children": [
                        {
                            "id": "d",
                            "cat": "x0"
                        },
                        {
                            "id": "e",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        }
    ]
}

var ptree_no_violations = 
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_7",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "a",
                            "cat": "w"
                        },
                        {
                            "id": "b",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "id": "c",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_9",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_8",
                    "children": [
                        {
                            "id": "d",
                            "cat": "w"
                        },
                        {
                            "id": "e",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
}

var ptree_1v =
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_10",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_11",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "XP_12",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "id": "b",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "id": "c",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_9",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_8",
                    "children": [
                        {
                            "id": "d",
                            "cat": "w"
                        },
                        {
                            "id": "e",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
}

var stree_1v =
{
    "id": "CP1",
    "cat": "cp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_10",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_11",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "XP_12",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "id": "b",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "id": "c",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "xp",
            "id": "XP_9",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_8",
                    "children": [
                        {
                            "id": "d",
                            "cat": "w"
                        },
                        {
                            "id": "e",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
}

var stree_2v = 
{
    "id": "CP1",
    "cat": "cp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_7",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_8",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "XP_9",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "id": "b",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "c",
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
                    "id": "XP_11",
                    "children": [
                        {
                            "cat": "xp",
                            "id": "XP_12",
                            "children": [
                                {
                                    "id": "d",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "id": "e",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "f",
                    "cat": "x0"
                }
            ]
        }
    ]
}

ptree_2v =
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_7",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_8",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "XP_9",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "id": "b",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "id": "c",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_10",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_11",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "XP_12",
                            "children": [
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
                },
                {
                    "id": "f",
                    "cat": "w"
                }
            ]
        }
    ]
}

var ptree_0v =
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_7",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_8",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "XP_9",
                            "children": [
                                {
                                    "id": "a",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "id": "b",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "id": "c",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_10",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_11",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "XP_12",
                            "children": [
                                {
                                    "cat": "phi",
                                    "id": "XP_13",
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
                            "id": "e",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "id": "f",
                    "cat": "w"
                }
            ]
        }
    ]
}

