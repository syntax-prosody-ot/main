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

var s = null;

function binMaxHeadTest(){
  describe("binMaxHeadTest.html", function() {
      describe('binMaxHead: Head Binarity Constraint for Japanese Compounds.', function() {
          it('binMaxHead(s, x, w),    x =   ' + parenthesizeTree(x) + ' --> Expected Violations: 0', function() {
              assert.equal(binMaxHead(s, x, 'w'), 0);
          });
          it('binMaxHead(s, y, w),    y =   ' + parenthesizeTree(y) + ' --> Expected Violations: 1', function() {
             assert.equal(binMaxHead(s,y,'w'), 1);
          });
          it('binMaxHead(s, z, w),    z =   ' + parenthesizeTree(z) + ' --> Expected Violations: 0', function() {
             assert.equal(binMaxHead(s, z, 'w'), 0);
          });
          it('binMaxHead(s, z, phi),    z =   ' + parenthesizeTree(z) + ' --> Expected Violations: 1', function() {
             assert.equal(binMaxHead(s, z, 'phi'), 1);
          });
          it('binMaxHead(s, a, w),    a =   ' + parenthesizeTree(a) + ' --> Expected Violations: 1', function() {
             assert.equal(binMaxHead(s, a, 'w'), 1);
          });
      });
  });
};

binMaxHeadTest();
