// test function for alignWrapAutoTest.html

function alignWrapAutoTest(){

    describe('Test Set 1: Tests L/R align for all/only Syntactic Subcategories', function() {

            let l = "left";
            let r = "right";

            it('AlignLeft', function() {
                assert.equal(alignSP(stree1, ptree1, "xp", l), 0, messageAlign(stree1, ptree1, l));
                assert.equal(alignSP(stree1, ptree2, "xp", l), 4, messageAlign(stree1, ptree2, l));
            });
            it('L maxSyntax', function() {
                let options = {"maxSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxSyntax', function() {
                let options = {"nonMaxSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L minSyntax', function() {
                let options = {"minSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMinSyntax', function() {
                let options = {"nonMinSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxSyntax minSyntax', function() {
                let options = {"maxSyntax": true, "minSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxSyntax nonMinSyntax', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxSyntax minSyntax', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxSyntax nonMinSyntax', function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 0, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });

            it('AlignRight', function() {
                assert.equal(alignSP(stree1, ptree1, "xp", r), 0, messageAlign(stree1, ptree1, r));
                assert.equal(alignSP(stree1, ptree2, "xp", r), 4, messageAlign(stree1, ptree2, r));
            });
            it('R maxSyntax', function() {
                let options = {"maxSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxSyntax', function() {
                let options = {"nonMaxSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R minSyntax', function() {
                let options = {"minSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMinSyntax', function() {
                let options = {"nonMinSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxSyntax minSyntax', function() {
                let options = {"maxSyntax": true, "minSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxSyntax nonMinSyntax', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxSyntax minSyntax', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxSyntax nonMinSyntax', function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
        });

        describe('Test Set 2: Tests L/R align for all/only Prosodic Subcategories', function() {

            let l = 'left';
            let r = 'right';

            it('L maxProsody', function() {
                let options = {"maxProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 2, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxProsody', function() {
                let options = {"nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 2, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });
            it('L minProsody', function() {
                let options = {"minProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 2, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMinProsody', function() {
                let options = {"nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 2, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxProsody minProsody', function() {
                let options = {"maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 3, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxProsody nonMinProsody', function() {
                let options = {"maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 3, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });    
            it('L nonMaxProsody minProsody', function() {
                let options = {"nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 3, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxProsody nonMinProsody', function() {
                let options = {"nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", l, options), 3, messageAlign(stree1, ptree1, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 4, messageAlign(stree1, ptree2, l, options));
            });

            it('R maxProsody', function() {
                let options = {"maxProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxProsody', function() {
                let options = {"nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 1, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
            it('R minProsody', function() {
                let options = {"minProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 0, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMinProsody', function() {
                let options = {"nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 1, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxProsody minProsody', function() {
                let options = {"maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 3, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxProsody nonMinProsody', function() {
                let options = {"nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 1, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
            
            it('R nonMaxProsody minProsody', function() {
                let options = {"nonMinProsody": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 1, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxProsody nonMinProsody', function() {
                let options = {"nonMinProsody": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree1, "xp", r, options), 1, messageAlign(stree1, ptree1, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 4, messageAlign(stree1, ptree2, r, options));
            });
        });

        describe('Test Set 3: maxSyntax', function() {

            let l = 'left';
            let r = 'right';

            it('L maxProsody', function() {
                let options = {"maxSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 1, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 1, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 0, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 0, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));

            });
            it('L nonMaxProsody', function() {
                let options = {"maxSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 0, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 0, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 2, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 2, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L minProsody', function() {
                let options = {"maxSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 2, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 0, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 2, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 0, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 0, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 1, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 0, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 2, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxProsody minProsody', function() {
                let options = {"maxSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 2, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 2, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 2, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 0, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 1, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 1, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 0, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 2, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });    
            it('L nonMaxProsody minProsody', function() {
                let options = {"maxSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 2, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 0, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 2, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 2, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", l, options), 0, messageAlign(stree1, ptree14, l, options));
                assert.equal(alignSP(stree1, ptree13, "xp", l, options), 2, messageAlign(stree1, ptree13, l, options));
                assert.equal(alignSP(stree1, ptree12, "xp", l, options), 2, messageAlign(stree1, ptree12, l, options));
                assert.equal(alignSP(stree1, ptree11, "xp", l, options), 2, messageAlign(stree1, ptree11, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 2, messageAlign(stree1, ptree2, l, options));
            });

            it('R maxProsody', function() {
                let options = {"maxSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 1, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 1, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 0, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 0, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxProsody', function() {
                let options = {"maxSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 0, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 0, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 0, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 2, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R minProsody', function() {
                let options = {"maxSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 0, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 0, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 0, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 0, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 0, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 1, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 0, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 2, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxProsody minProsody', function() {
                let options = {"maxSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 2, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 2, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 2, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 0, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 0, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 0, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 0, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 2, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            
            it('R nonMaxProsody minProsody', function() {
                let options = {"maxSyntax": true, "nonMinProsody": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 1, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 1, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 0, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 2, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinProsody": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree14, "xp", r, options), 0, messageAlign(stree1, ptree14, r, options));
                assert.equal(alignSP(stree1, ptree13, "xp", r, options), 2, messageAlign(stree1, ptree13, r, options));
                assert.equal(alignSP(stree1, ptree12, "xp", r, options), 2, messageAlign(stree1, ptree12, r, options));
                assert.equal(alignSP(stree1, ptree11, "xp", r, options), 2, messageAlign(stree1, ptree11, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 2, messageAlign(stree1, ptree2, r, options));
            });
        });

        describe('Test Set 4: nonMaxSyntax', function() {

            let l = 'left';
            let r = 'right';

            it("L maxProsody", function() {
                let options = {"nonMaxSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 2, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 2, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 0, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 2, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L minProsody", function() {
                let options = {"nonMaxSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 2, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 2, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 2, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 2, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 2, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 2, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 2, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 2, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 2, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 2, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 2, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 2, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });

            it("R maxProsody", function() {
                let options = {"nonMaxSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 0, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 2, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R minProsody", function() {
                let options = {"nonMaxSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 0, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 2, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 2, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 2, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 0, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 2, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 2, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 2, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 2, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 2, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 2, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
        });

        describe('Test Set 5: minSyntax', function() {
            let l = 'left';
            let r = 'right';

            it("L maxProsody", function() {
                let options = {"minSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 1, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 1, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 0, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 0, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody", function() {
                let options = {"minSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 0, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 0, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 2, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 2, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L minProsody", function() {
                let options = {"minSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 2, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 0, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 2, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 0, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody minProsody", function() {
                let options = {"minSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 2, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 2, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 2, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 0, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody minProsody", function() {
                let options = {"minSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 2, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 0, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 2, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 2, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMinProsody", function() {
                let options = {"minSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 0, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 1, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 0, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 2, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody nonMinProsody", function() {
                let options = {"minSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 1, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 1, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 0, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 2, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody nonMinProsody", function() {
                let options = {"minSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", l, options), 0, messageAlign(stree1, ptree26, l, options));
                assert.equal(alignSP(stree1, ptree25, "xp", l, options), 2, messageAlign(stree1, ptree25, l, options));
                assert.equal(alignSP(stree1, ptree24, "xp", l, options), 2, messageAlign(stree1, ptree24, l, options));
                assert.equal(alignSP(stree1, ptree23, "xp", l, options), 2, messageAlign(stree1, ptree23, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });

            it("R maxProsody", function() {
                let options = {"minSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 1, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 1, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 0, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 0, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody", function() {
                let options = {"minSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 0, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 0, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 0, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 2, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R minProsody", function() {
                let options = {"minSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 0, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 0, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 0, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 0, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody minProsody", function() {
                let options = {"minSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 2, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 2, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 2, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 0, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody minProsody", function() {
                let options = {"minSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 0, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 0, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 0, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 2, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMinProsody", function() {
                let options = {"minSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 0, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 1, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 0, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 2, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody nonMinProsody", function() {
                let options = {"minSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 1, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 1, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 0, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 2, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody nonMinProsody", function() {
                let options = {"minSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree26, "xp", r, options), 0, messageAlign(stree1, ptree26, r, options));
                assert.equal(alignSP(stree1, ptree25, "xp", r, options), 2, messageAlign(stree1, ptree25, r, options));
                assert.equal(alignSP(stree1, ptree24, "xp", r, options), 2, messageAlign(stree1, ptree24, r, options));
                assert.equal(alignSP(stree1, ptree23, "xp", r, options), 2, messageAlign(stree1, ptree23, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
        });

        describe('Test Set 6: nonMinSyntax', function() {

            let l = 'left';
            let r = 'right';

            it("L maxProsody", function() {
                let options = {"nonMinSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody", function() {
                let options = {"nonMinSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 0, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 2, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L minProsody", function() {
                let options = {"nonMinSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody minProsody", function() {
                let options = {"nonMinSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 2, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 2, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 2, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody minProsody", function() {
                let options = {"nonMinSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 2, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMinProsody", function() {
                let options = {"nonMinSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 2, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody nonMinProsody", function() {
                let options = {"nonMinSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 2, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody nonMinProsody", function() {
                let options = {"nonMinSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", l, options), 2, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", l, options), 2, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", l, options), 2, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 2, messageAlign(stree1, ptree2,  l, options));
            });

            it("R maxProsody", function() {
                let options = {"nonMinSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 2, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 2, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 0, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody", function() {
                let options = {"nonMinSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 0, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 2, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R minProsody", function() {
                let options = {"nonMinSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 0, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 0, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody minProsody", function() {
                let options = {"nonMinSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 2, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 2, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 2, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 0, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody minProsody", function() {
                let options = {"nonMinSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 0, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 2, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMinProsody", function() {
                let options = {"nonMinSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 2, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 2, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody nonMinProsody", function() {
                let options = {"nonMinSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 2, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 2, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 2, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody nonMinProsody", function() {
                let options = {"nonMinSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9,  "xp", r, options), 2, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8,  "xp", r, options), 2, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7,  "xp", r, options), 2, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 2, messageAlign(stree1, ptree2,  r, options));
            });
        });

        describe('Test Set 7: maxSyntax minSyntax', function() {
            
            let l = 'left';
            let r = 'right';

            it('L maxProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 1, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 1, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 0, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 0, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 0, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 0, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 1, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 1, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L minProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 1, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 0, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 1, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 0, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxProsody minProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "maxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 1, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 1, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 1, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 0, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxProsody minProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 1, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 0, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 1, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 1, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMinProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 0, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 1, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 0, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 1, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L maxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMinProsody":true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 1, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 1, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 0, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 1, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });
            it('L nonMaxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", l, options), 0, messageAlign(stree1, ptree6, l, options));
                assert.equal(alignSP(stree1, ptree5, "xp", l, options), 1, messageAlign(stree1, ptree5, l, options));
                assert.equal(alignSP(stree1, ptree4, "xp", l, options), 1, messageAlign(stree1, ptree4, l, options));
                assert.equal(alignSP(stree1, ptree3, "xp", l, options), 1, messageAlign(stree1, ptree3, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp", l, options), 1, messageAlign(stree1, ptree2, l, options));
            });

            it('R maxProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 0, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 0, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 0, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 0, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 0, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 0, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 0, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 1, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R minProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 0, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 0, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 0, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 0, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxProsody minProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "maxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 1, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 1, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 1, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 0, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxProsody minProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 0, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 0, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 0, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 1, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMinProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 0, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 0, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 0, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 1, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R maxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMinProsody":true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 0, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 0, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 0, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 1, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
            it('R nonMaxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree6, "xp", r, options), 0, messageAlign(stree1, ptree6, r, options));
                assert.equal(alignSP(stree1, ptree5, "xp", r, options), 1, messageAlign(stree1, ptree5, r, options));
                assert.equal(alignSP(stree1, ptree4, "xp", r, options), 1, messageAlign(stree1, ptree4, r, options));
                assert.equal(alignSP(stree1, ptree3, "xp", r, options), 1, messageAlign(stree1, ptree3, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp", r, options), 1, messageAlign(stree1, ptree2, r, options));
            });
        });

        describe('Test Set 8: maxSyntax nonMinSyntax', function() {
            
            let l = 'left';
            let r = 'right';

            it('L maxProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 0, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 0, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 0, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 0, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMaxProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 0, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 0, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L minProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 0, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 0, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L maxProsody minProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "maxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 0, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMaxProsody minProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 1, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 0, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 0, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 0, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 0, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L maxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMinProsody":true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 0, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 0, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 0, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMaxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", l, options), 0, messageAlign(stree1, ptree10, l, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  l, options), 1, messageAlign(stree1, ptree9,  l, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  l, options), 1, messageAlign(stree1, ptree8,  l, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  l, options), 1, messageAlign(stree1, ptree7,  l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });

            it('R maxProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 1, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 1, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 0, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMaxProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 0, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 1, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R minProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 0, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 0, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R maxProsody minProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "maxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 1, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 1, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 1, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 0, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMaxProsody minProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 0, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 1, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 1, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 1, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R maxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMinProsody":true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 1, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 1, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 0, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 1, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMaxProsody nonMinProsody', function() {
                let options = {"maxSyntax": true, "nonMinSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree10, "xp", r, options), 0, messageAlign(stree1, ptree10, r, options));
                assert.equal(alignSP(stree1, ptree9, "xp",  r, options), 1, messageAlign(stree1, ptree9,  r, options));
                assert.equal(alignSP(stree1, ptree8, "xp",  r, options), 1, messageAlign(stree1, ptree8,  r, options));
                assert.equal(alignSP(stree1, ptree7, "xp",  r, options), 1, messageAlign(stree1, ptree7,  r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
        });

        describe('Test Set 9: nonMaxSyntax minSyntax', function() {
            
            let l = 'left';
            let r = 'right';

            it('L maxProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 1, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 1, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 0, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 0, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMaxProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 0, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 0, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 1, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 1, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L minProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 1, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 0, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 1, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 0, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L maxProsody minProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "maxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 1, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 1, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 1, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 0, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMaxProsody minProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 1, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 0, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 1, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 1, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMinProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 0, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 1, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 0, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 1, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L maxProsody nonMinProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMinProsody":true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 1, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 1, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 0, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 1, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it('L nonMaxProsody nonMinProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", l, options), 0, messageAlign(stree1, ptree18, l, options));
                assert.equal(alignSP(stree1, ptree17, "xp", l, options), 1, messageAlign(stree1, ptree17, l, options));
                assert.equal(alignSP(stree1, ptree16, "xp", l, options), 1, messageAlign(stree1, ptree16, l, options));
                assert.equal(alignSP(stree1, ptree15, "xp", l, options), 1, messageAlign(stree1, ptree15, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });

            it('R maxProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 0, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 0, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 0, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 0, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMaxProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 0, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 0, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 0, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 1, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R minProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 0, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 0, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 0, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 0, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R maxProsody minProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "maxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 1, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 1, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 1, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 0, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMaxProsody minProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "minProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 0, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 0, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 0, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 1, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMinProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 0, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 0, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 0, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 1, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R maxProsody nonMinProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMinProsody":true, "maxProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 0, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 0, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 0, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 1, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it('R nonMaxProsody nonMinProsody', function() {
                let options = {"nonMaxSyntax": true, "minSyntax": true, "nonMaxProsody":true, "nonMinProsody":true};
                assert.equal(alignSP(stree1, ptree18, "xp", r, options), 0, messageAlign(stree1, ptree18, r, options));
                assert.equal(alignSP(stree1, ptree17, "xp", r, options), 1, messageAlign(stree1, ptree17, r, options));
                assert.equal(alignSP(stree1, ptree16, "xp", r, options), 1, messageAlign(stree1, ptree16, r, options));
                assert.equal(alignSP(stree1, ptree15, "xp", r, options), 1, messageAlign(stree1, ptree15, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
        });

        describe('Test Set 10: nonMaxSyntax nonMinSyntax', function() {
            
            let l = 'left';
            let r = 'right';

            it("L maxProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 0, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 0, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 0, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 0, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it("L minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 0, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 0, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 0, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 0, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 0, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 0, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it("L maxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 1, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 0, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });
            it("L nonMaxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", l, options), 0, messageAlign(stree1, ptree22, l, options));
                assert.equal(alignSP(stree1, ptree21, "xp", l, options), 1, messageAlign(stree1, ptree21, l, options));
                assert.equal(alignSP(stree1, ptree20, "xp", l, options), 1, messageAlign(stree1, ptree20, l, options));
                assert.equal(alignSP(stree1, ptree19, "xp", l, options), 1, messageAlign(stree1, ptree19, l, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  l, options), 1, messageAlign(stree1, ptree2,  l, options));
            });

            it("R maxProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 0, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 1, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it("R minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 0, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 1, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 1, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 1, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 0, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody minProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true, "minProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 1, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 1, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it("R maxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "maxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 0, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 0, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 1, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
            it("R nonMaxProsody nonMinProsody", function() {
                let options = {"nonMaxSyntax": true, "nonMinSyntax": true, "nonMaxProsody": true, "nonMinProsody": true};
                assert.equal(alignSP(stree1, ptree22, "xp", r, options), 0, messageAlign(stree1, ptree22, r, options));
                assert.equal(alignSP(stree1, ptree21, "xp", r, options), 1, messageAlign(stree1, ptree21, r, options));
                assert.equal(alignSP(stree1, ptree20, "xp", r, options), 1, messageAlign(stree1, ptree20, r, options));
                assert.equal(alignSP(stree1, ptree19, "xp", r, options), 1, messageAlign(stree1, ptree19, r, options));
                assert.equal(alignSP(stree1, ptree2, "xp",  r, options), 1, messageAlign(stree1, ptree2,  r, options));
            });
        });

        describe('Test Set 11: Tests Wrap', function() {
            it('Wrap', function() {
                assert.equal(wrap(stree1, ptree1, "xp"), 0, message(stree1, ptree1));
                assert.equal(wrap(stree1, ptree2, "xp"), 4, message(stree1, ptree2));
            });
        });

        
        var stree1 =  {
        "id": "root",
        "cat": "cp",
        "children": [
            {
                "cat": "xp",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "cat": "xp",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "x0"
                            },
                            {
                                "cat": "xp",
                                "id": "minNonmax",
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
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "xp",
                "id": "minMax",
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
            }
        ]
    };
            
            
    var ptree1 =  {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "c",
                                        "cat": "w"
                                    },
                                    {
                                        "id": "d",
                                        "cat": "w"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "id": "f",
                        "cat": "w"
                    }
                ]
            }
        ]
    };

    var ptree2 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "id": "Mismatch",
                "cat": "w"
            }
        ]
    };


    var ptree3 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "id": "f",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    
    var ptree4 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "f",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    
    var ptree5 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "d",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "w"
                            },
                            {
                                "id": "f",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree6 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "d",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "f",
                                        "cat": "w"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    
    var ptree7 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxMin",
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
                    },
                    {
                        "id": "d",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    
    var ptree8 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "id": "a",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonmaxMin",
                        "children": [
                            {
                                "id": "b",
                                "cat": "w"
                            },
                            {
                                "id": "c",
                                "cat": "w"
                            },
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree9 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonmaxMin",
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
                            },
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    },
                    {
                        "id": "e",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    
    var ptree10 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonmaxNonmin",
                        "children": [
                            {
                                "id": "a",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "nonmaxMin",
                                "children": [
                                    {
                                        "id": "b",
                                        "cat": "w"
                                    },
                                    {
                                        "id": "c",
                                        "cat": "w"
                                    },
                                    {
                                        "id": "d",
                                        "cat": "w"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "e",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    
    var ptree11 =  {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
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
                    },
                    {
                        "id": "d",
                        "cat": "w"
                    }
                ]
            },
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "id": "f",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    
    var ptree12 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "x0"
                            },
                            {
                                "id": "c",
                                "cat": "x0"
                            },
                            {
                                "id": "d",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "x0"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "f",
                                "cat": "x0"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    
    
    var ptree13 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "cat": "phi",
                        "id": "minNonmax",
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
                            },
                            {
                                "id": "d",
                                "cat": "x0"
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
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
                    }
                ]
            }
        ]
    };
    
    
    var ptree14 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "a",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "b",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "c",
                                        "cat": "x0"
                                    },
                                    {
                                        "id": "d",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "f",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree15 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "c",
                        "cat": "w"
                    },
                    {
                        "id": "d",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    var ptree16 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "c",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    
    var ptree17 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "b",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "c",
                                "cat": "w"
                            },
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    
    var ptree18 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "b",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "c",
                                "cat": "w"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "d",
                                        "cat": "w"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree19 =    {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "b",
                        "cat": "w"
                    },
                    {
                        "id": "c",
                        "cat": "w"
                    },
                    {
                        "id": "d",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    var ptree20 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "b",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "c",
                                "cat": "w"
                            },
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree21 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "maxNonmin",
                "children": [
                    {
                        "id": "a",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "nonmaxMin",
                        "children": [
                            {
                                "id": "b",
                                "cat": "w"
                            },
                            {
                                "id": "c",
                                "cat": "w"
                            },
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree22 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "a",
                        "cat": "x0"
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "b",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
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
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree23 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "c",
                        "cat": "w"
                    },
                    {
                        "id": "d",
                        "cat": "w"
                    }
                ]
            },
            {
                "cat": "phi",
                "id": "minMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "id": "f",
                        "cat": "w"
                    }
                ]
            }
        ]
    };
    
    var ptree24 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "c",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            },
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "id": "e",
                        "cat": "w"
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "f",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree25 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "c",
                                "cat": "w"
                            },
                            {
                                "id": "d",
                                "cat": "w"
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "id": "minNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "w"
                            },
                            {
                                "id": "f",
                                "cat": "w"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    var ptree26 =     {
        "id": "root",
        "cat": "i",
        "children": [
            {
                "cat": "phi",
                "id": "nonminMax",
                "children": [
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "c",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "d",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cat": "phi",
                        "id": "nonminNonmax",
                        "children": [
                            {
                                "id": "e",
                                "cat": "x0"
                            },
                            {
                                "cat": "phi",
                                "id": "minNonmax",
                                "children": [
                                    {
                                        "id": "f",
                                        "cat": "x0"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

}

alignWrapAutoTest();