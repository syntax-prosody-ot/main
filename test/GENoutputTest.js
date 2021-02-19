stree = {
    "id": "CP1",
    "cat": "cp",
    "children": [
        {
            "id": "a",
            "cat": "x0"
        },
        {
            "id": "b",
            "cat": "x0"
        },
        {
            "id": "c",
            "cat": "x0"
        }
    ]
}

GEN = window.GEN;

function GENoutputTest(){
    describe('Number of Candidates Produced by GEN for Three Terminals', function() {
        it('Phi-wrapped', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: false
                }).length, 24, "");
        });
        it('Non-Unary Phi Wrapped', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: true
                }).length, 3, "");
        });
        it('Non-Recursive', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 13, "");
        });
        it('Non-Unary Non-Recursive', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 4, "");
        });
        it('Headed Non-Recursive', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 12, "");
        });
        it('Non-Unary Non-Exhaustive Non-Recursive', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 3, "");
        });
        it('Strict Layering', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 4, "");
        });
        it('Non-Unary Strict Layering', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 1, "");
        });
        it('Unrestricted GEN', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 48, "");
        });
        it('Non-Unary Unrestricted Gen', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 6, "");
        });
        it('Headed Recursion', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 47, "");
        });
        it('Headed Non-Unary Recursion', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 5, "");
        });
        it('Exhaustive Recursion', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 33, "");
        });
        it('Non-Unary Exhaustive Recursion', function() {
            assert.equal(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 3, "");
        });
    });


    describe('Checking Trees Output by GEN for Three Terminals', function() {
        it('Phi-wrapped', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: false
                })), o01, "");
        });
        it('Non-Unary Phi Wrapped', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: true
                })), o02, "");
        });
        it('Non-Recursive', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o03, "");
        });
        it('Non-Unary Non-Recursive', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o04, "");
        });
        it('Headed Non-Recursive', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o05, "");
        });
        it('Non-Unary Non-Exhaustive Non-Recursive', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o06, "");
        });
        it('Strict Layering', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                })), o07, "");
        });
        it('Non-Unary Strict Layering', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                })), o08, "");
        });
        it('Unrestricted GEN', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o09, "");
        });
        it('Non-Unary Unrestricted Gen', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o10, "");
        });
        it('Headed Recursion', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o11, "");
        });
        it('Headed Non-Unary Recursion', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o12, "");
        });
        it('Exhaustive Recursion', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                })), o13, "");
        });
        it('Non-Unary Exhaustive Recursion', function() {
            assert.equal(JSON.stringify(GEN({},'a b c', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                })), o14, "");
        });
    });


    describe('Number of Candidates Produced by GENwithCliticMovement', function() {
        it('Phi-wrapped', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: false
                }).length, 0, "");
        });
        it('Non-Unary Phi Wrapped', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: true
                }).length, 0, "");
        });
        it('Non-Recursive', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 13*3, "");
        });
        it('Non-Unary Non-Recursive', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 4*3, "");
        });
        it('Headed Non-Recursive', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 22, "");
        });
        it('Non-Unary Non-Exhaustive Non-Recursive', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 3*3, "");
        });
        it('Strict Layering', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 0, "");
        });
        it('Non-Unary Strict Layering', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 0, "");
        });
        it('Unrestricted GEN', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 48*3, "");
        });
        it('Non-Unary Unrestricted Gen', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 6*3, "");
        });
        //The normal formula for this would be S(n)*2^(n+1) - 1. Since there is a clitic (phonological syllable, not word), it cannot be directly dominated by a phi. The term 2^(n+1) is based on the fact that each terminal may or may not be dominated directly by a phi, mathematically described by multiplying the total number of trees by 2 (phi on or phi off). Since the clitics cannot be directly dominated by a phi, there is one less multiplication by two, so the formula becomes S(n)*2^n - 1. Also since the clitic is allowed to shift, there are three different terminal orderings, so the total number of trees is (S(n)*2^n - 1)*3.  At three terminals this is 23*3 or 69 (lol).
        it('Headed Recursion', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 23*3, "");
        });
        it('Headed Non-Unary Recursion', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 5*3, "");
        });
        it('Exhaustive Recursion', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 0, "");
        });
        it('Non-Unary Exhaustive Recursion', function() {
            assert.equal(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 0, "");
        });
    });


    describe('Checking Trees Output by GENwithCliticMovement', function() {
        it('Phi-wrapped', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: false
                })), o15, "");
        });
        it('Non-Unary Phi Wrapped', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: true
                })), o16, "");
        });
        it('Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o17, "");
        });
        it('Non-Unary Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o18, "");
        });
        it('Headed Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o19, "");
        });
        it('Non-Unary Non-Exhaustive Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o20, "");
        });
        it('Strict Layering', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                })), o21, "");
        });
        it('Non-Unary Strict Layering', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                })), o22, "");
        });
        it('Unrestricted GEN', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o23, "");
        });
        it('Non-Unary Unrestricted Gen', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o24, "");
        });
        it('Headed Recursion', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o25, "");
        });
        it('Headed Non-Unary Recursion', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o26, "");
        });
        it('Exhaustive Recursion', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                })), o27, "");
        });
        it('Non-Unary Exhaustive Recursion', function() {
            assert.equal(JSON.stringify(GENwithCliticMovement({},'a b c-clitic', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                })), o28, "");
        });
    });


    describe('Number of Candidates Produced by GENwithPermutation', function() {
        it('Phi-wrapped', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: false
                }).length, 24*6, "");
        });
        it('Non-Unary Phi Wrapped', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: true
                }).length, 3*6, "");
        });
        it('Non-Recursive', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 13*6, "");
        });
        it('Non-Unary Non-Recursive', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 4*6, "");
        });
        it('Headed Non-Recursive', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 12*6, "");
        });
        it('Non-Unary Non-Exhaustive Non-Recursive', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 3*6, "");
        });
        it('Strict Layering', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 4*6, "");
        });
        it('Non-Unary Strict Layering', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 1*6, "");
        });
        it('Unrestricted GEN', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 48*6, "");
        });
        it('Non-Unary Unrestricted Gen', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 6*6, "");
        });
        it('Headed Recursion', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 47*6, "");
        });
        it('Headed Non-Unary Recursion', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 5*6, "");
        });
        it('Exhaustive Recursion', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                }).length, 33*6, "");
        });
        it('Non-Unary Exhaustive Recursion', function() {
            assert.equal(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                }).length, 3*6, "");
        });
    });


    describe('Checking Trees Output by GENwithPermutation', function() {
        it('Phi-wrapped', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: false
                })), o29, "");
        });
        it('Non-Unary Phi Wrapped', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: true, 
                noUnary: true
                })), o30, "");
        });
        it('Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o31, "");
        });
        it('Non-Unary Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o32, "");
        });
        it('Headed Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o33, "");
        });
        it('Non-Unary Non-Exhaustive Non-Recursive', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o34, "");
        });
        it('Strict Layering', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                })), o35, "");
        });
        it('Non-Unary Strict Layering', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: true, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                })), o36, "");
        });
        it('Unrestricted GEN', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o37, "");
        });
        it('Non-Unary Unrestricted Gen', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: false, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o38, "");
        });
        it('Headed Recursion', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: false
                })), o39, "");
        });
        it('Headed Non-Unary Recursion', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: false, 
                requireRecWrapper: false, 
                noUnary: true
                })), o40, "");
        });
        it('Exhaustive Recursion', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: false
                })), o41, "");
        });
        it('Non-Unary Exhaustive Recursion', function() {
            assert.equal(JSON.stringify(GENwithPermutation(stree,'', {
                obeysHeadedness: true, 
                obeysNonrecursivity: false, 
                obeysExhaustivity: true, 
                requireRecWrapper: false, 
                noUnary: true
                })), o42, "");
        });
    });
}

GENoutputTest();