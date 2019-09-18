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
