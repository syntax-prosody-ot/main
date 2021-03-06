var  ptree_2phi_0v =
// Iota branches to two phis. each phi is binary, no violations
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_5",
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
            "cat": "phi",
            "id": "XP_6",
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
;
var ptree_3phi_1v =
//iota goes to three phis, the third phi has three words, incurring one violation
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_8",
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
            "cat": "phi",
            "id": "XP_9",
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
            "id": "XP_10",
            "children": [
                {
                    "id": "e",
                    "cat": "w"
                },
                {
                    "id": "f",
                    "cat": "w"
                },
                {
                    "id": "g",
                    "cat": "w"
                }
            ]
        }
    ]
}
;
var  ptree_2phi_1v  =
// iota branches to two phis, Right most phi as three w's. One violation
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_7",
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
            "cat": "phi",
            "id": "XP_6",
            "children": [
                {
                    "id": "c",
                    "cat": "w"
                },
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
;
var ptree_recurphi_0v =

// Recursive phi on the right. Right most phi has  two w's. No violations
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_7",
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
            "cat": "phi",
            "id": "XP_10",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_8",
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
                    "id": "XP_9",
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
}
;
var ptree_recurphi_0v_2 =

// iota branches to two phis. The right phi is recursive.  From that phi, the right phi has two words whereas the left phi has three. No violations
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_8",
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
            "cat": "phi",
            "id": "XP_11",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_9",
                    "children": [
                        {
                            "id": "c",
                            "cat": "w"
                        },
                        {
                            "id": "d",
                            "cat": "w"
                        },
                        {
                            "id": "e",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "XP_10",
                    "children": [
                        {
                            "id": "f",
                            "cat": "w"
                        },
                        {
                            "id": "g",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
}
;
var ptree_recurphi_1v =

// Recursive phi on the right. Right most phi has  three w's.  One violation

{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_10",
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
            "cat": "phi",
            "id": "XP_11",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_9",
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
                    "id": "XP_8",
                    "children": [
                        {
                            "id": "e",
                            "cat": "w"
                        },
                        {
                            "id": "f",
                            "cat": "w"
                        },
                        {
                            "id": "g",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
}
;
var ptree_multi_same_level_iotas =
{
    "id": "top",
    "cat": "phi",
    "children": [
        {
            "cat": "iota",
            "id": "i1",
            "children": [
                {
                    "cat": "phi",
                    "id": "p1",
                    "children": [
                        {
                            "id": "p1-1",
                            "cat": "w"
                        },
                        {
                            "id": "p1-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p2",
                    "children": [
                        {
                            "id": "p2-1",
                            "cat": "w"
                        },
                        {
                            "id": "p2-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p3",
                    "children": [
                        {
                            "id": "p3-1",
                            "cat": "w"
                        },
                        {
                            "id": "p3-2",
                            "cat": "w"
                        },
                        {
                            "id": "p3-3",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "iota",
            "id": "i2",
            "children": [
                {
                    "cat": "phi",
                    "id": "p4",
                    "children": [
                        {
                            "id": "p4-1",
                            "cat": "w"
                        },
                        {
                            "id": "p4-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p5",
                    "children": [
                        {
                            "id": "p5-1",
                            "cat": "w"
                        },
                        {
                            "id": "p5-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p6",
                    "children": [
                        {
                            "id": "p6-1",
                            "cat": "w"
                        },
                        {
                            "id": "p6-2",
                            "cat": "w"
                        },
                        {
                            "id": "p6-3",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "iota",
            "id": "i3",
            "children": [
                {
                    "cat": "phi",
                    "id": "p7",
                    "children": [
                        {
                            "id": "p7-1",
                            "cat": "w"
                        },
                        {
                            "id": "p7-2",
                            "cat": "w"
                        },
                        {
                            "id": "p7-3",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p8",
                    "children": [
                        {
                            "id": "p8-1",
                            "cat": "w"
                        },
                        {
                            "id": "p8-2",
                            "cat": "w"
                        },
                        {
                            "id": "p8-3",
                            "cat": "w"
                        },
                        {
                            "id": "p8-4",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "iota",
            "id": "i4",
            "children": [
                {
                    "cat": "phi",
                    "id": "p9",
                    "children": [
                        {
                            "id": "p9-1",
                            "cat": "w"
                        },
                        {
                            "id": "p9-2",
                            "cat": "w"
                        },
                        {
                            "id": "p9-3",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p10",
                    "children": [
                        {
                            "id": "p10-1",
                            "cat": "w"
                        },
                        {
                            "id": "p10-2",
                            "cat": "w"
                        },
                        {
                            "id": "p10-3",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
};
var ptree_multi_iotas_recursive =
{
    "id": "i1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "p1",
            "children": [
                {
                    "id": "w1",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "p2",
            "children": [
                {
                    "id": "w2",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "iota",
            "id": "i2",
            "children": [
                {
                    "cat": "phi",
                    "id": "p3",
                    "children": [
                        {
                            "id": "w3",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p4",
                    "children": [
                        {
                            "id": "w4",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "iota",
                    "id": "i3",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "p5",
                            "children": [
                                {
                                    "id": "w5",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "cat": "phi",
                            "id": "p6",
                            "children": [
                                {
                                    "id": "w6",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "cat": "iota",
                            "id": "i4",
                            "children": [
                                {
                                    "cat": "phi",
                                    "id": "p7",
                                    "children": [
                                        {
                                            "id": "w7",
                                            "cat": "w"
                                        }
                                    ]
                                },
                                {
                                    "cat": "phi",
                                    "id": "p8",
                                    "children": [
                                        {
                                            "id": "w8",
                                            "cat": "w"
                                        }
                                    ]
                                },
                                {
                                    "cat": "phi",
                                    "id": "p9",
                                    "children": [
                                        {
                                            "id": "w9",
                                            "cat": "w"
                                        },
                                        {
                                            "id": "w10",
                                            "cat": "w"
                                        },
                                        {
                                            "id": "w11",
                                            "cat": "w"
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
var ptree_no_iota =
{
    "id": "CP1",
    "cat": "iota",
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
        },
        {
            "id": "e",
            "cat": "w"
        }
    ]
};
var ptree_no_children =
{
    "id": "CP1",
    "cat": "iota",
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
        },
        {
            "id": "e",
            "cat": "w"
        }
    ]
};
var empty =
{
};

var ptree_multi_same_level_phis =
{
    "id": "top",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "i1",
            "children": [
                {
                    "cat": "phi",
                    "id": "p1",
                    "children": [
                        {
                            "id": "p1-1",
                            "cat": "w"
                        },
                        {
                            "id": "p1-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p2",
                    "children": [
                        {
                            "id": "p2-1",
                            "cat": "w"
                        },
                        {
                            "id": "p2-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p3",
                    "children": [
                        {
                            "id": "p3-1",
                            "cat": "w"
                        },
                        {
                            "id": "p3-2",
                            "cat": "w"
                        },
                        {
                            "id": "p3-3",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "phi",
            "id": "i2",
            "children": [
                {
                    "cat": "phi",
                    "id": "p4",
                    "children": [
                        {
                            "id": "p4-1",
                            "cat": "w"
                        },
                        {
                            "id": "p4-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p5",
                    "children": [
                        {
                            "id": "p5-1",
                            "cat": "w"
                        },
                        {
                            "id": "p5-2",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p6",
                    "children": [
                        {
                            "id": "p6-1",
                            "cat": "w"
                        },
                        {
                            "id": "p6-2",
                            "cat": "w"
                        },
                        {
                            "id": "p6-3",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "phi",
            "id": "i3",
            "children": [
                {
                    "cat": "phi",
                    "id": "p7",
                    "children": [
                        {
                            "id": "p7-1",
                            "cat": "w"
                        },
                        {
                            "id": "p7-2",
                            "cat": "w"
                        },
                        {
                            "id": "p7-3",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p8",
                    "children": [
                        {
                            "id": "p8-1",
                            "cat": "w"
                        },
                        {
                            "id": "p8-2",
                            "cat": "w"
                        },
                        {
                            "id": "p8-3",
                            "cat": "w"
                        },
                        {
                            "id": "p8-4",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "phi",
            "id": "i4",
            "children": [
                {
                    "cat": "phi",
                    "id": "p9",
                    "children": [
                        {
                            "id": "p9-1",
                            "cat": "w"
                        },
                        {
                            "id": "p9-2",
                            "cat": "w"
                        },
                        {
                            "id": "p9-3",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p10",
                    "children": [
                        {
                            "id": "p10-1",
                            "cat": "w"
                        },
                        {
                            "id": "p10-2",
                            "cat": "w"
                        },
                        {
                            "id": "p10-3",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
};
var ptree_multi_phis_recursive =
{
    "id": "i1",
    "cat": "phi",
    "children": [
        {
            "cat": "phi",
            "id": "p1",
            "children": [
                {
                    "id": "w1",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "p2",
            "children": [
                {
                    "id": "w2",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "i2",
            "children": [
                {
                    "cat": "phi",
                    "id": "p3",
                    "children": [
                        {
                            "id": "w3",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "p4",
                    "children": [
                        {
                            "id": "w4",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "i3",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "p5",
                            "children": [
                                {
                                    "id": "w5",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "cat": "phi",
                            "id": "p6",
                            "children": [
                                {
                                    "id": "w6",
                                    "cat": "w"
                                }
                            ]
                        },
                        {
                            "cat": "phi",
                            "id": "i4",
                            "children": [
                                {
                                    "cat": "phi",
                                    "id": "p7",
                                    "children": [
                                        {
                                            "id": "w7",
                                            "cat": "w"
                                        }
                                    ]
                                },
                                {
                                    "cat": "phi",
                                    "id": "p8",
                                    "children": [
                                        {
                                            "id": "w8",
                                            "cat": "w"
                                        }
                                    ]
                                },
                                {
                                    "cat": "phi",
                                    "id": "p9",
                                    "children": [
                                        {
                                            "id": "w9",
                                            "cat": "w"
                                        },
                                        {
                                            "id": "w10",
                                            "cat": "w"
                                        },
                                        {
                                            "id": "w11",
                                            "cat": "w"
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
var Jenny =
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
                    "id": "XP_4",
                    "children": [
                        {
                            "id": "a",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_8",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_5",
                    "children": [
                        {
                            "id": "b",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_9",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "c",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }
    ]
};

var jenny_2 = 
{
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_4",
            "children": [
                {
                    "id": "a",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_5",
            "children": [
                {
                    "id": "b",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_6",
            "children": [
                {
                    "id": "c",
                    "cat": "w"
                }
            ]
        }
    ]
}
