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