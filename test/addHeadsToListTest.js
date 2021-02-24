function addHeadsToListTest(){
    describe("copyNode", function() {
            let testNode;
            beforeEach(function() {
                testNode = {
                    id: "root",
                    cat: "phi",
                    children: [
                        {id: "kid1", cat: "w",},
                        {id: "kid2", cat: "w",},
                        {
                            id: "intermediate",
                            cat: "phi",
                            children: [
                                {id: "kid3", cat: "w",},
                                {id: "kid4", cat: "w",},
                                {id: "kid5", cat: "w",},
                            ],
                        },
                    ],
                };
            });

            it("notEqual", function () {
                assert.notEqual(testNode, copyNode(testNode));
            });

            it("but deepEqual", function () {
                assert.deepEqual(testNode, copyNode(testNode));
            });

            it("and don't follow eachother", function () {
                let nodeCopy = copyNode(testNode);
                testNode.head = true;
                assert.isUndefined(nodeCopy.head);

                nodeCopy.cat = 'i';
                assert.equal(testNode.cat, 'phi');
            });

            it("Recursive copy", function () {
                assert.notEqual(testNode.children[0], copyNode(testNode).children[0]);
            });
        });

        describe("isHeaded", function() {
            let testNode;

            beforeEach(function() {
                testNode = {
                    id: "root",
                    cat: "phi",
                    children: [
                        {id: "kid1", cat: "w",},
                        {id: "kid2", cat: "w",},
                        {id: "kid3", cat: "w",},
                        {id: "kid4", cat: "w",},
                        {id: "kid5", cat: "w",},
                    ],
                };
            });

            it("Identifies left-headed node", function () {
                testNode.children[0].head = true;
                assert.isTrue(isHeaded(testNode));
            });

            it("Identifies right-headed node", function () {
                testNode.children[4].head = true;
                assert.isTrue(isHeaded(testNode));
            });
            it("Identifies middle-headed node", function () {
                testNode.children[2].head = true;
                assert.isTrue(isHeaded(testNode));
            });

            it("Identifies unheaded node", function () {
                assert.isFalse(isHeaded(testNode));
            });
        });

        describe("addLeftHead", function() {
            let testNode;

            beforeEach(function() {
                testNode = addLeftHead({
                    id: "root",
                    cat: "phi",
                    children: [
                        {id: "kid1", cat: "w",},
                        {id: "kid2", cat: "w",},
                        {id: "kid3", cat: "w",},
                        {id: "kid4", cat: "w",},
                        {id: "kid5", cat: "w",},
                    ],
                });
            });

            it("Result is Headed", function () {
                assert.isTrue(isHeaded(testNode));
            });
            
            it("Left node is head", function () {
                assert.isTrue(testNode.children[0].head);
            });

            it("Non-left nodes are not headed", function () {
                for(let child of testNode.children.slice(1)) {
                    assert.isUndefined(child.head);
                }
            });

            it("Does not break if given terminal", function () {
                assert.isOk(addLeftHead(testNode.children[4]));
            });

            it("Does not bread if given an already left-headed node", function () {
                assert.isOk(addLeftHead(testNode));
            });
        });

        describe("addRightHead", function() {
            let testNode;

            beforeEach(function() {
                testNode = addRightHead({
                    id: "root",
                    cat: "phi",
                    children: [
                        {id: "kid1", cat: "w",},
                        {id: "kid2", cat: "w",},
                        {id: "kid3", cat: "w",},
                        {id: "kid4", cat: "w",},
                        {id: "kid5", cat: "w",},
                    ],
                });
            });

            it("Result is Headed", function () {
                assert.isTrue(isHeaded(testNode));
            });
            
            it("Right node is head", function () {
                assert.isTrue(testNode.children[4].head);
            });

            it("Non-right nodes are not headed", function () {
                for(let child of testNode.children.slice(0, 4)) {
                    assert.isUndefined(child.head);
                }
            });

            it("Does not break if given terminal", function () {
                assert.isOk(addRightHead(testNode.children[0]));
            });

            it("Does not break if given an already right-headed node", function () {
                assert.isOk(addRightHead(testNode));
            });
        });

        describe("getMinimalNodes", function() {
            it("{(a) b}", function () {
                let testList = getMinimalNodes({id: 'root', cat: 'i', children: [
                    {
                        id: 'intermediate',
                        cat: 'phi',
                        children: [{id: "a", cat: "w",}],
                    },
                    {id: "b", cat: "w",},
                ]});
                assert.lengthOf(testList, 1);
                assert.equal(testList[0].children[0].id, 'a');
            });

            it("(a (b (c)))", function () {
                let testList = getMinimalNodes({
                    id: 'root',
                    cat: 'phi',
                    children: [
                        {id: 'a', cat: 'w'},
                        {
                            id: 'intermediate',
                            cat: 'phi',
                            children: [
                                {id: 'b', cat: 'w'},
                                {
                                    id: 'minimal',
                                    cat: 'phi',
                                    children: [
                                        {id: 'c', cat: 'w'}
                                    ]
                                }
                            ]
                        }
                    ]
                });
                assert.lengthOf(testList, 1);
                assert.equal(testList[0].children[0].id, 'c')
            });
        });

        describe("genHeadsForTree", function() {
            let testTrees = {
                '(a)': {id: 'root', cat: 'phi', children: [
                        {id: "a", cat: "w",},
                    ],
                },
                '(a b c)': {id: 'root', cat: 'phi', children: [
                        {id: "a", cat: "w",},
                        {id: "b", cat: "w",},
                        {id: "c", cat: "w",},
                    ],
                },
                '{(a) b}': {id: 'root', cat: 'i', children: [
                        {
                            id: 'intermediate',
                            cat: 'phi',
                            children: [{id: "a", cat: "w",}],
                        },
                        {id: "b", cat: "w",},
                    ],
                },
            };

            it("Correct length for (a): (a*)", function () {
                assert.lengthOf(genHeadsForTree(testTrees['(a)']), 1);
            });

            it("All headed for (a)", function () {
                for(let tree of genHeadsForTree(testTrees['(a)'])) {
                    assert.isTrue(isHeaded(tree));
                };
            });

            it("Original (a) unchanged", function () {
                node = testTrees['(a)'];
                assert.isUndefined(node.head);
            });

            it("Correct length of (a b c): (a* b c) and (a b c*)", function () {
                assert.lengthOf(genHeadsForTree(testTrees['(a b c)']), 2);
            });

            it("All headed for (a b c)", function () {
                for(let tree of genHeadsForTree(testTrees['(a b c)'])) {
                    assert.isTrue(isHeaded(tree));
                };
            });

            it("All one-headed for (a b c)", function () {
                let tree1, tree2;
                for(let tree of genHeadsForTree(testTrees['(a b c)'])) {
                    let numOfHeads = 0;
                    for(let terminal of tree.children) {
                        numOfHeads += terminal.head ? 1 : 0;
                    }
                    assert.equal(numOfHeads, 1);
                }
            });

            it("All unique for (a b c)", function () {
                let tree1, tree2;
                [tree1, tree2] = genHeadsForTree(testTrees['(a b c)']);
                assert.notDeepEqual(tree1, tree2);
            });

            it("Doesn't break when non-exhaustive", function () {
                assert.lengthOf(genHeadsForTree(testTrees['{(a) b}']), 1);
            });

            it("Works for {(a b) (c d) (e f) (g h) (i j)}", function () {
                var aj = {
                    "id": "CP1",
                    "cat": "cp",
                    "children": [
                        {
                            "cat": "phi",
                            "id": "XP_11",
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
                            "cat": "phi",
                            "id": "XP_12",
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
                        },
                        {
                            "cat": "phi",
                            "id": "XP_13",
                            "children": [
                                {
                                    "id": "e",
                                    "cat": "x0"
                                },
                                {
                                    "id": "f",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "cat": "phi",
                            "id": "XP_14",
                            "children": [
                                {
                                    "id": "g",
                                    "cat": "x0"
                                },
                                {
                                    "id": "h",
                                    "cat": "x0"
                                }
                            ]
                        },
                        {
                            "cat": "phi",
                            "id": "XP_15",
                            "children": [
                                {
                                    "id": "i",
                                    "cat": "x0"
                                },
                                {
                                    "id": "j",
                                    "cat": "x0"
                                }
                            ]
                        }
                    ]
                }
                var expectedAJoutputString = '[{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":true},{"id":"j","cat":"x0"}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":true},{"id":"h","cat":"x0"}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":true},{"id":"f","cat":"x0"}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":true},{"id":"d","cat":"x0"}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":true},{"id":"b","cat":"x0"}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]},{"id":"CP1","cat":"cp","children":[{"cat":"phi","id":"XP_11","children":[{"id":"a","cat":"x0","head":false},{"id":"b","cat":"x0","head":true}]},{"cat":"phi","id":"XP_12","children":[{"id":"c","cat":"x0","head":false},{"id":"d","cat":"x0","head":true}]},{"cat":"phi","id":"XP_13","children":[{"id":"e","cat":"x0","head":false},{"id":"f","cat":"x0","head":true}]},{"cat":"phi","id":"XP_14","children":[{"id":"g","cat":"x0","head":false},{"id":"h","cat":"x0","head":true}]},{"cat":"phi","id":"XP_15","children":[{"id":"i","cat":"x0","head":false},{"id":"j","cat":"x0","head":true}]}]}]';
                assert.equal(expectedAJoutputString, JSON.stringify(genHeadsForTree(aj)));
            });
        });

        describe("genHeadsForList", function() {
            let testTrees, testGENoutput, expectedOutput;
            beforeEach(function() {
                testTrees = [
                    {id: 'root', cat: 'phi', children: [
                        {id: 'supra-a', cat: 'phi', children: [
                            {cat: 'w', id: 'a'}
                        ]},
                        {cat: 'w', id: 'b'},
                        {id: 'supra-c', cat: 'phi', children: [
                            {cat: 'w', 'id': 'c'}
                        ]}
                    ]},
                    {id: 'root', cat: 'i', children: [
                        {id: 'supra-a', cat: 'phi', children: [
                            {cat: 'w', id: 'a'}
                        ]},
                        {cat: 'w', id: 'b'},
                        {id: 'supra-c', cat: 'phi', children: [
                            {cat: 'w', 'id': 'c'}
                        ]}
                    ]},
                ]
                testGENoutput = [[{}, testTrees[0]], [{}, testTrees[1]]]
                expectedOutput = [
                    {id: 'root', cat: 'phi', children: [
                        {id: 'supra-a', cat: 'phi', children: [
                            {cat: 'w', id: 'a', head: true}
                        ]},
                        {cat: 'w', id: 'b'},
                        {id: 'supra-c', cat: 'phi', children: [
                            {cat: 'w', 'id': 'c', head: true}
                        ]}
                    ]},
                    {id: 'root', cat: 'i', children: [
                        {id: 'supra-a', cat: 'phi', children: [
                            {cat: 'w', id: 'a', head: true}
                        ]},
                        {cat: 'w', id: 'b'},
                        {id: 'supra-c', cat: 'phi', children: [
                            {cat: 'w', 'id': 'c', head: true}
                        ]}
                    ]},
                ]
            });
            it("works for gen output (pairs of trees)", function () {
                var expectedPairsOutput = [];
                for(let i in expectedOutput){
                    expectedPairsOutput.push([{}, expectedOutput[i]]);
                }
                assert.deepEqual(expectedPairsOutput, genHeadsForList(testGENoutput));
            });

            it("works for list of trees", function () {
                assert.deepEqual(expectedOutput, genHeadsForList(testTrees));
            });
        });
}

addHeadsToListTest();