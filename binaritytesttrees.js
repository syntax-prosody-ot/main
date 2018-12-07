//note: good should get 0 with BinMinBranchesInit
var good =  {
    "id": "CP1",
    "cat": "theta",
    "children": [
        {
            "cat": "phi",
            "id": "XP_4",
            "children": [
                {
                    "id": "A",
                    "cat": "w"
                },
                {
                    "id": "B",
                    "cat": "w"
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_5",
            "children": [
                {
                    "id": "C",
                    "cat": "w"
                }
            ]
        }
    ]
};

//bad should get one with BinMinBranchesInit
var bad = {
    "id": "CP1",
    "cat": "theta",
    "children": [
        {
            "cat": "phi",
            "id": "XP_5",
            "children": [
                {
                    "id": "C",
                    "cat": "w"
                }
            ]
        },

        {
            "cat": "phi",
            "id": "XP_4",
            "children": [
                {
                    "id": "A",
                    "cat": "w"
                },
                {
                    "id": "B",
                    "cat": "w"
                }
            ]
        }
    ]
};

//binmin = 3 binMininit = 1
var goodrecur2 = {
    "id": "CP1",
    "cat": "iota",
    "children": [
        {
            "cat": "phi",
            "id": "XP_4",
            "children": [
                {
                    "cat": "phi",
                    "id": "XP_6",
                    "children": [
                        {
                            "id": "A",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "phi",
                    "id": "XP_7",
                    "children": [
                        {
                            "id": "B",
                            "cat": "w"
                        }
                    ]
                }
            ]
        },
        {
            "cat": "phi",
            "id": "XP_5",
            "children": [
                {
                    "id": "C",
                    "cat": "w"
                }
            ]
        }
    ]
};