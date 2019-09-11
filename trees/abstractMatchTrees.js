// [a[bc]]
var tree_3w_1 = {
    "id": "XP_1",
    "cat": "xp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "XP_4",
            "children": [
                {
                    "id": "b",
                    "cat": "x0"
                },
                {
                    "id": "c",
                    "cat": "x0"
                }
            ]
        }
    ]
};

// [[ab]c]
var tree_3w_2 = {
    "id": "XP_1",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_4",
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
};

//  [a[b[cd]]]
var tree_4w_1 = {
    "id": "XP_7",
    "cat": "xp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "XP_5",
            "children": [
                {
                    "id": "b",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "XP_6",
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
};

// [a[[bc]d]]
var tree_4w_2 = {
    "id": "XP_7",
    "cat": "xp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "cat": "xp",
            "id": "XP_5",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "b",
                            "cat": "x0"
                        },
                        {
                            "id": "c",
                            "cat": "x0"
                        }
                    ]
                },
                {
                    "id": "d",
                    "cat": "x0"
                }
            ]
        }
    ]
};

// [[ab][cd]]
var tree_4w_3 = {
    "id": "XP_7",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_5",
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
            "cat": "xp",
            "id": "XP_6",
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
};

// [[a[bc]]d]
var tree_4w_4 = {
    "id": "XP_7",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_5",
            "children": [
                {
                    "id": "a",
                    "cat": "x0"
                },
                {
                    "cat": "xp",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "b",
                            "cat": "x0"
                        },
                        {
                            "id": "c",
                            "cat": "x0"
                        }
                    ]
                }
            ]
        },
        {
            "id": "d",
            "cat": "x0"
        }
    ]
};

// [[[ab]c]d]
var tree_4w_5 = {
    "id": "XP_7",
    "cat": "xp",
    "children": [
        {
            "cat": "xp",
            "id": "XP_6",
            "children": [
                {
                    "cat": "xp",
                    "id": "XP_5",
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
            "id": "d",
            "cat": "x0"
        }
    ]
};

var five_w_trees = [
    {
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_8",
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
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "cat": "xp",
                        "id": "XP_8",
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
                "id": "XP_7",
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
];



