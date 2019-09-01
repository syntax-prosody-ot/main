/*Trees for noShiftTest 8/30/2019 Max Tarlov */

var treeOne = { // [first[clitic third]]
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "id": "first",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "XP_4",
                "children": [
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    },
                    {
                        "id": "third",
                        "cat": "x0"
                    }
                ]
            }
        ]
    }

var treeTwo = { // [[first clitic][third[fourth fifth]]]
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "first",
                        "cat": "x0"
                    },
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_8",
                "children": [
                    {
                        "id": "third",
                        "cat": "x0"
                    },
                    {
                        "cat": "xp",
                        "id": "XP_7",
                        "children": [
                            {
                                "id": "fourth",
                                "cat": "x0"
                            },
                            {
                                "id": "fifth",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    }

var treeThree = { // [first[second third]]
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "id": "first",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "XP_4",
                "children": [
                    {
                        "id": "second",
                        "cat": "x0"
                    },
                    {
                        "id": "third",
                        "cat": "x0"
                    }
                ]
            }
        ]
    }

var treeFour = { // [[first clitic1][third[clitic2 fifth]]]
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "XP_6",
                "children": [
                    {
                        "id": "first",
                        "cat": "x0"
                    },
                    {
                        "id": "clitic1",
                        "cat": "clitic"
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "XP_8",
                "children": [
                    {
                        "id": "third",
                        "cat": "x0"
                    },
                    {
                        "cat": "xp",
                        "id": "XP_7",
                        "children": [
                            {
                                "id": "clitic2",
                                "cat": "clitic"
                            },
                            {
                                "id": "fifth",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    }

var treeFive = {
	"id": "clitic",
	"cat": "clitic"
}

var treeSix = { // [clitic[second third]]
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "id": "clitic",
                "cat": "clitic"
            },
            {
                "cat": "xp",
                "id": "XP_4",
                "children": [
                    {
                        "id": "second",
                        "cat": "x0"
                    },
                    {
                        "id": "third",
                        "cat": "x0"
                    }
                ]
            }
        ]
    }

var treeSeven = { // [first[second clitic]]
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "id": "first",
                "cat": "x0"
            },
            {
                "cat": "xp",
                "id": "XP_4",
                "children": [
                    {
                        "id": "second",
                        "cat": "x0"
                    },
                    {
                        "id": "clitic",
                        "cat": "clitic"
                    }
                ]
            }
        ]
    }

var treeEight =  { //[clitic1 second clitic2]
        "id": "CP1",
        "cat": "cp",
        "children": [
            {
                "id": "clitic1",
                "cat": "clitic"
            },
            {
                "id": "second",
                "cat": "x0"
            },
            {
                "id": "clitic2",
                "cat": "clitic"
            }
        ]
    }

var ptreeEightA = { //(second clitic1, clitic2)
	"id": "CP1",
	"cat": "i",
	"children": [
		{
				"id": "second",
				"cat": "w"
		},
			{
					"id": "clitic1",
					"cat": "syll"
			},
			{
					"id": "clitic2",
					"cat": "syll"
			}
	]
}

var ptreeEightB = { //(clitic1 clitic2 second)
        "id": "CP1",
        "cat": "i",
        "children": [
            {
                "id": "clitic1",
                "cat": "syll"
            },
            {
                "id": "clitic2",
                "cat": "syll"
            },
            {
                "id": "second",
                "cat": "w"
            }
        ]
    }

		var ptreeEightC = { //(clitic2 second clitic1)
		        "id": "CP1",
		        "cat": "i",
		        "children": [
		            {
		                "id": "clitic2",
		                "cat": "syll"
		            },
		            {
		                "id": "second",
		                "cat": "w"
		            },
		            {
		                "id": "clitic1",
		                "cat": "syll"
		            }
		        ]
		    }
