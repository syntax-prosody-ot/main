// Example 1:
// {id: 'rootw', cat: 'w', children:
// [ {id: 'nonhead', cat: 'w', size: 3},
// {id: 'head', cat: 'w', head: true, size: 2}
// ]
// }
// --> no violation

var x = {
        "id": "rootw",
        "cat": "w",
        "children": [
            {
                "cat": "w",
                "id": "nonhead",
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
                    }
                ]
            },
            {
                "cat": "w",
                "id": "head",
                "children": [
                    {
                        "id": "c",
                        "cat": "w",
                    },
                    {
                        "id": "d",
                        "cat": "w"
                    }
                ]
            }
        ]
    }

    var x2 = {
            "id": "rootw",
            "cat": "w",
            "children": [
                {
                    "cat": "w",
                    "id": "nonhead",
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
                        }
                    ]
                },
                {
                    "cat": "w",
                    "id": "head",
                    "children": [
                        {
                            "id": "c",
                            "cat": "w",
                        },
                        {
                            "id": "d",
                            "cat": "w"
                        }
                    ]
                }
            ]
        }

// Example 2:
// {id: 'rootw', cat: 'w', children:
// [ {id: 'nonhead', cat: 'w', size: 2},
// {id: 'head', cat: 'w', head: true, size: 3}
// ]
// }
// --> one violation

var y = {
        "id": "rootw",
        "cat": "w",
        "children": [
            {
                "cat": "w",
                "id": "nonhead",
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
                "cat": "w",
                "id": "head",
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
                    },
                ]
            }
        ]
    }

    var y2 = {
            "id": "rootw",
            "cat": "w",
            "children": [
                {
                    "cat": "w",
                    "id": "nonhead",
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
                    "cat": "w",
                    "id": "head",
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
                        },
                    ]
                }
            ]
        }

// Example 3:
// {id: 'rootphi', cat: 'phi', children:
// [ {id: 'nonhead', cat: 'w', size: 2},
// {id: 'head', cat: 'w', head: true, size: 3}
// ]
// }
// --> no violation when cat = 'w'. (This would incur a violation if cat: 'phi')

var z = {
        "id": "rootphi",
        "cat": "phi",
        "children": [
            {
                "cat": "w",
                "id": "nonhead",
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
                "cat": "w",
                "id": "head",
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
                    },
                ]
            }
        ]
    }

    var z2 = {
        "id": "rootphi",
        "cat": "phi",
        "children": [
            {
                "cat": "w",
                "id": "nonhead",
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
                "cat": "w",
                "id": "head",
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
                    },
                ]
            }
        ]
    }

// Example 4:
// {id: 'rootw', cat: 'w', children:
// [ {id: 'nonhead', cat: 'w', size: 2},
// {id: 'head', cat: 'w', head: true, size: 3}
// ]
// }
// --> one violation

var a = {
        "id": "rootw",
        "cat": "w",
        "children": [
            {
                "cat": "w",
                "id": "nonhead",
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
                "cat": "w",
                "id": "FFF_1"
            }
        ]
    }

var b = {
        "id": "rootw",
        "cat": "w",
        "children": [
            {
                "cat": "w",
                "id": "FFF_1"
            },
            {
                "cat": "w",
                "id": "nonhead",
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
            }     
        ]
    }

var xMin = {
            "id": "rootw",
            "cat": "w",
            "children": [
                {
                    "cat": "w",
                    "id": "nonhead",
                    "children": [
                        {
                            "id": "aa",
                            "cat": "w"
                        },
                        {
                            "id": "b",
                            "cat": "w"
                        },
                        {
                            "id": "c",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "w",
                    "id": "head",
                    "children": [
                        {
                            "id": "cc",
                            "cat": "w",
                        },
                        {
                            "id": "d",
                            "cat": "w"
                        }
                    ]
                }
            ]
        };

var s = null;

function binMaxHeadTest(){
  describe("binMaxHeadTest.html", function() {
      describe('binMaxHead: Head Binarity Constraint for Japanese Compounds. Right head marking.', function() {
          it('binMaxHead(s, x, w, r),    x =   ' + parenthesizeTree(x, {showHeads:true}) + ' --> Expected Violations: 0', function() {
              assert.equal(binMaxHead(s, x, 'w'), 0);
          });
          it('binMaxHead(s, y, w, r),    y =   ' + parenthesizeTree(y, {showHeads:true}) + ' --> Expected Violations: 1', function() {
             assert.equal(binMaxHead(s,y,'w'), 1);
          });
          it('binMaxHead(s, z, w, r),    z =   ' + parenthesizeTree(z, {showHeads:true}) + ' --> Expected Violations: 0', function() {
             assert.equal(binMaxHead(s, z, 'w'), 0);
          });
          it('binMaxHead(s, z, phi, r),    z =   ' + parenthesizeTree(z, {showHeads:true}) + ' --> Expected Violations: 1', function() {
             assert.equal(binMaxHead(s, z, 'phi'), 1);
          });
          it('binMaxHead(s, a, w, r),    a =   ' + parenthesizeTree(a, {showHeads:true}) + ' --> Expected Violations: 1', function() {
             assert.equal(binMaxHead(s, a, 'w'), 1);
          });
      });
      describe('binMaxHead: Left head marking', function() {
          it('binMaxHead(s, x, w, l),    x =   ' + parenthesizeTree(x, {showHeads:true}) + ' --> Expected Violations: 1', function() {
              assert.equal(binMaxHead(s, x2, 'w', {side: "left"}), 1);
          });
          it('binMaxHead(s, y, w, l),    y =   ' + parenthesizeTree(y, {showHeads:true}) + ' --> Expected Violations: 0', function() {
             assert.equal(binMaxHead(s,y2,'w', {side: "left"}), 0);
          });
          it('binMaxHead(s, z, w, l),    z =   ' + parenthesizeTree(z, {showHeads:true}) + ' --> Expected Violations: 0', function() {
             assert.equal(binMaxHead(s, z2, 'w', {side: "left"}), 0);
          });
          it('binMaxHead(s, z, phi, l),    z =   ' + parenthesizeTree(z, {showHeads:true}) + ' --> Expected Violations: 0', function() {
             assert.equal(binMaxHead(s, z2, 'phi', {side: "left"}), 0);
          });
          it('binMaxHead(s, a, w, l),    a =   ' + parenthesizeTree(a, {showHeads:true}) + ' --> Expected Violations: 1', function() {
             assert.equal(binMaxHead(s, b, 'w', {side: "left"}), 1);
          });
      });

      describe('binMaxHead(minimal), heads on left', function(){
        it('binMinHead(s, {(a)*(b c)}, "i"), one violation', function(){
            var itree = {
                cat:'i', 
                id:'root', 
                children:[
                    {cat:'phi', children:[{cat:'w', id:'a'}]},
                    {cat:'phi', children:[{cat:'w', id:'b'}, {cat:'w', id:'c'}]}
                ]
            };
            assert.equal(binMaxHead(s, itree, 'i', {side:'left', minimal:true}), 1);
            assert.equal(binMinHead(s, itree, 'i', {side:'left'}), 1);
        });

        it('binMinHead(s, {(a*)(b* c)}, "phi"), two violations', function(){
            var itree = {
                cat:'i', 
                id:'root', 
                children:[
                    {cat:'phi', children:[{cat:'w', id:'a'}]},
                    {cat:'phi', children:[{cat:'w', id:'b'}, {cat:'w', id:'c'}]}
                ]
            };
            assert.equal(binMaxHead(s, itree, 'i', {side:'left', minimal:true}), 1);
        });

        it('binMinHead(s, xMin, "w"),    xMin =   ' + parenthesizeTree(markHeads(xMin, 'left'), {showHeads:true}) + ' --> Expected Violations: 0', function() {
            assert.equal(binMaxHead(s, xMin, 'w', {side:'left', minimal:true}),0);
        });

        var yMin = {
                    "id": "rootw",
                    "cat": "w",
                    "children": [
                        {
                            "cat": "w",
                            "id": "nonhead",
                            "children": [
                                {
                                    "id": "F",
                                    "cat": "Ft"
                                }
                            ]
                        },
                        {
                            "cat": "w",
                            "id": "head",
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
                                },
                            ]
                        }
                    ]
                }

        it('binMinHead(s, yMin, "w"),    yMin =   ' + parenthesizeTree(markHeads(yMin, 'left'), {showHeads:true}) + ' --> Expected Violations: 3', function() {
            assert.equal(binMaxHead(s,yMin,'w', {side:'left', minimal:true}), 3);
        });
        it('binMinHead(s, z, "w"),    z =   ' + parenthesizeTree(markHeads(z, 'left'), {showHeads:true}) + ' --> Expected Violations: 2', function() {
            assert.equal(binMaxHead(s, z, 'w', {side:'left', minimal:true}), 2);
        });
        it('binMinHead(s, z, "phi"),    z =   ' + parenthesizeTree(z, {showHeads:true}) + ' --> Expected Violations: 0', function() {
            assert.equal(binMaxHead(s, z, 'phi', {side:'left', minimal:true}), 0);
        });

        var bMin = {
            "id": "rootw",
            "cat": "w",
            "children": [
                {
                    "cat": "w",
                    "id": "lefthead",
                    "children": [
                        {
                            "id": "FFF_2",
                            "cat": "w"
                        },
                        {
                            "id": "b",
                            "cat": "w"
                        }
                    ]
                },
                {
                    "cat": "w",
                    "id": "FFF_1"
                }
            ]
        };

        it('binMinHead(s, bMin, "w"),    bMin =   ' + parenthesizeTree(bMin, {showHeads:true}) + ' --> Expected Violations: 0', function() {
            assert.equal(binMaxHead(s, bMin, 'w', {side:'left', minimal:true}), 0);
            assert.equal(binMinHead(s, bMin, 'w', {side:'left'}), 0);
        });
    });

  });
};

binMaxHeadTest();
