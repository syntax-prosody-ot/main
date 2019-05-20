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