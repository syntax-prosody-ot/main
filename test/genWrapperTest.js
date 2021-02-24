//test for input management in candidategenerator_wrapper


function genWrapperTest(){
    describe("GEN options checks", function(){
        it("PH test -- currently empty", function(){
            assert(true);
        })
    });
    describe("GEN handles different types of word argument", function(){
        it("words string", function(){
            var wordsResult = GEN({}, 'a b', {obeysNonrecursivity:true, obeysExhaustivity:true});
            assert.equal(JSON.stringify(wordsResult), '[[{},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"w","id":"b"}]}]}]]');
        });
        it("words array of strings", function(){
            var wordsResult = GEN({}, ['a', 'b'], {obeysNonrecursivity:true, obeysExhaustivity:true});
            assert.equal(JSON.stringify(wordsResult), '[[{},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"w","id":"b"}]}]}]]');
        });
        it("no words string, just stree", function(){
            var st = {id:'root', cat:'cp', children:[{cat:'x0', id:'a'}, {cat:'x0', id:'b'}]};
            var options = {obeysNonrecursivity:true, obeysExhaustivity:true};
            var x = GEN(st, '', options);
            var expectedResultString = '[[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"b"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"w","id":"b"}]}]}]]';
            var expectedResult = JSON.parse(expectedResultString);
            assert.deepEqual(x, expectedResult,  JSON.stringify(x, null, 4) + '\n' + JSON.stringify(expectedResult, null, 4))//messageGEN(x, expectedResult, options)); //something's wrong with this deepEqual comparison -- visual comparison reveals no differences
        });
    });
    describe("GEN handles duplicates", function(){
        it("words string with duplicates", function(){
            var result = GEN({}, 'a a', {obeysNonrecursivity:true, obeysExhaustivity:true});
            var expectedResult = [[{},{id:"root",cat:"i",children:[{id:"phi3",cat:"phi",children:[{cat:"w",id:"a"}]},{id:"phi2",cat:"phi",children:[{cat:"w",id:"a_1"}]}]}],[{},{id:"root",cat:"i",children:[{id:"phi4",cat:"phi",children:[{cat:"w",id:"a"},{cat:"w",id:"a_1"}]}]}]];
            assert.deepEqual(result, expectedResult);
        });
    });

    describe("GEN handles clitics in input", function(){
        describe("clitics in syntactic trees keep 'clitic' label", function(){
            it("words string with -clitic creates outputs with an x0 parent over a terminal with cat: clitic", function(){
                var result = GEN({}, 'a-clitic b', {syntactic: true});
                var aResultObj = result[0][1].children[0];
                assert.equal(aResultObj.cat, "x0"); //x0 layer above
                assert.equal(aResultObj.children[0].cat, "clitic"); //clitic layer below
            });
            it("stree with cat:clitic and options.syntactic:true creates outputs with an x0 parent over a terminal with cat:clitic", function(){
                var st = {id:'root', cat:'cp', children:[{cat:'clitic', id:'a'}, {cat:'x0', id:'b'}]};
                var result = GEN(st, '', {syntactic: true});
                var aResultObj = result[0][1].children[0];
                assert.equal(aResultObj.cat, "x0", JSON.stringify(aResultObj, null, 4)); //x0 layer above
                assert.equal(aResultObj.children[0].cat, "clitic"); //clitic layer below
            });
        });
        describe("GEN for prosodic trees renders input clitics as syllables", function(){
            it("words string with -clitic, prosodic trees", function(){
                var result = GEN({}, 'a-clitic b', {syntactic: false});
                var aResultObj = result[0][1].children[0];
                assert.equal(aResultObj.cat, "syll");
            });
            it("stree with cat:clitic creates outputs with cat:syll", function(){
                var st = {id:'root', cat:'cp', children:[{cat:'clitic', id:'a'}, {cat:'x0', id:'b'}]};
                var result = GEN(st, '', {syntactic: false});
                var aResultObj = result[0][1].children[0];
                assert.equal(aResultObj.cat, "syll");
            });
        });
    });
    
    describe("GEN handles accents in input", function(){
        it("GEN with accent in stree, no words specified", function(){

        });
        it("GEN with accent in words object", function(){

        });
    })
}

genWrapperTest();