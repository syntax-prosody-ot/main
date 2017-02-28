/* var patterns = [
    [[{}],[{}]],
    [[{}],[{},{}]],
    [[{},{}],[{}]],
    [[{},{}],[{},{}]],
    [[{}],[[{}],[{}]]],
    [[{}],[[{}],[{},{}]]],
    [[{}],[[{},{}],[{}]]],
    [[{},{}],[[{}],[{}]]],
    [[{}],[[{},{}],[{},{}]]],
    [[{},{}],[[{}],[{},{}]]],
    [[{},{}],[[{},{}],[{}]]],
    [[{},{}],[[{},{}],[{},{}]]],
    [[[{}],[{}]],[{}]],
    [[[{}],[{}]],[{},{}]],
    [[[{}],[{},{}]],[{}]],
    [[[{},{}],[{}]],[{}]],
    [[[{}],[{},{}]],[{},{}]],
    [[[{},{}],[{}]],[{},{}]],
    [[[{},{}],[{},{}]],[{}]],
    [[[{},{}],[{},{}]],[{},{}]]
];*/


/*
[
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_2",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_2",
                        "cat": "x0"
                    },
                    {
                        "id": "f_3",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    },
                    {
                        "id": "f_2",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_3",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    },
                    {
                        "id": "f_2",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_3",
                        "cat": "x0"
                    },
                    {
                        "id": "f_4",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            },
                            {
                                "id": "f_4",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            },
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_4",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    },
                    {
                        "id": "f_2",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_4",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            },
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_4",
                                "cat": "x0"
                            },
                            {
                                "id": "f_5",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    },
                    {
                        "id": "f_2",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_4",
                                "cat": "x0"
                            },
                            {
                                "id": "f_5",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    },
                    {
                        "id": "f_2",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            },
                            {
                                "id": "f_4",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_5",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_1",
                        "cat": "x0"
                    },
                    {
                        "id": "f_2",
                        "cat": "x0"
                    }
                ]
            },
            {
                "id": "XP3",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            },
                            {
                                "id": "f_4",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP5",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_5",
                                "cat": "x0"
                            },
                            {
                                "id": "f_6",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_3",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_3",
                        "cat": "x0"
                    },
                    {
                        "id": "f_4",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            },
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_4",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            },
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_4",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_2",
                                "cat": "x0"
                            },
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_4",
                        "cat": "x0"
                    },
                    {
                        "id": "f_5",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            },
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_4",
                        "cat": "x0"
                    },
                    {
                        "id": "f_5",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            },
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            },
                            {
                                "id": "f_4",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_5",
                        "cat": "x0"
                    }
                ]
            }
        ]
    },
    {
        "id": "XP1",
        "cat": "xp",
        "children": [
            {
                "id": "XP2",
                "cat": "xp",
                "children": [
                    {
                        "id": "XP3",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_1",
                                "cat": "x0"
                            },
                            {
                                "id": "f_2",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "id": "XP4",
                        "cat": "xp",
                        "children": [
                            {
                                "id": "f_3",
                                "cat": "x0"
                            },
                            {
                                "id": "f_4",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "XP5",
                "cat": "xp",
                "children": [
                    {
                        "id": "f_5",
                        "cat": "x0"
                    },
                    {
                        "id": "f_6",
                        "cat": "x0"
                    }
                ]
            }
        ]
    }
]
*/