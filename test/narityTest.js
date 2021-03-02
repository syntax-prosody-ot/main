function narityTest(){
    var fiveTree = {cat:'phi', id:'x', children:[{id:'w1', cat:'w'},{id:'w2', cat:'w'},{id:'w3', cat:'w'},{id:'w4', cat:'w'},{id:'w5', cat:'w'}]};

        describe('Compare violations of n-arity for '+parenthesizeTree(fiveTree)+', tests maximality only', function() {
            it('binMaxBranches(phi) assigns differing violations depending on argument n', function() {
                assert.equal(binMaxBranches({}, fiveTree, 'phi'), 1);
                assert.equal(binMaxBranches({}, fiveTree, 'phi', 3), 1);
                assert.equal(binMaxBranches({}, fiveTree, 'phi', 5), 0);
            });
            it('binMaxLeaves(phi) assigns differing violations depending on argument n', function() {
                assert.equal(binMaxLeaves({}, fiveTree, 'phi'), 1);
                assert.equal(binMaxLeaves({}, fiveTree, 'phi', 3), 1);
                assert.equal(binMaxLeaves({}, fiveTree, 'phi', 5), 0);
            });
            it('binMaxGradient(phi) assigns differing violations depending on argument n', function() {
                assert.equal(binMaxBranchesGradient({}, fiveTree, 'phi'), 3);
                assert.equal(binMaxBranchesGradient({}, fiveTree, 'phi', 3), 2);
                assert.equal(binMaxBranchesGradient({}, fiveTree, 'phi', 4), 1);
                assert.equal(binMaxBranchesGradient({}, fiveTree, 'phi', 5), 0);
            });
            it('min+max binarity do use n', function(){
                let comment = 'This is the only set of tests that uses binMin at all in this document';
                assert.equal(binBranches({}, fiveTree, 'phi', 5), 0);
                assert.equal(binBrGradient({}, fiveTree, 'phi', 5), 0);
                assert.equal(binLeaves({}, fiveTree, 'phi', 5), 0);
                assert.equal(binLeavesGradient({}, fiveTree, 'phi', 5), 0);
                //let comment = 'These tests show that they return different values if n!=5';
                assert.equal(binBranches({}, fiveTree, 'phi'), 1);
                assert.equal(binBrGradient({}, fiveTree, 'phi'), 3);
                assert.equal(binLeaves({}, fiveTree, 'phi'), 1);
                assert.equal(binLeavesGradient({}, fiveTree, 'phi'), 3);
            })
            it('maximal ternarity constraints work', function(){
                assert.equal(ternMaxBranches({}, fiveTree, 'phi'), 1);
                assert.equal(ternMaxLeaves({}, fiveTree, 'phi'), 1);
            });
        });
}
narityTest();