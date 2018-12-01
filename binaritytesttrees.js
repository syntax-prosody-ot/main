//note: good should get 0 with BinMinBranchesInit
var good =  {
    "id": "CP1",
    "cat": "phi",
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
    "cat": "phi",
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