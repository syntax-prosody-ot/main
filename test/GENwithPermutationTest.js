//test for input management and generating actual permutations with functions in genWithMovement.js

//const { assert } = require("chai");

function logCand(cand){
    for(let i in cand){
        console.log(parenthesizeTree(cand[i][1]))
    }
}

function genWithPermutationTest(){
    
    describe("GENwithPermutation handles different types of word argument", function(){
        it("words string with clitic", function(){
            var wordsResult = GENwithPermutation({}, 'a b-clitic', {obeysNonrecursivity:true, obeysExhaustivity:['i']});
            assert.equal(JSON.stringify(wordsResult), '[[{},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"syll","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"syll","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi8","cat":"phi","children":[{"cat":"syll","id":"b"}]},{"id":"phi7","cat":"phi","children":[{"cat":"w","id":"a"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi9","cat":"phi","children":[{"cat":"syll","id":"b"},{"cat":"w","id":"a"}]}]}]]');
        });
        it("words string without clitic", function(){
            var wordsResult = GENwithPermutation({}, 'a b', {obeysNonrecursivity:true, obeysExhaustivity:true});
            assert.equal(JSON.stringify(wordsResult), '[[{},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"w","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"b"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"a"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"b"},{"cat":"w","id":"a"}]}]}]]');
        });
        it("words array of strings", function(){
            var wordsResult = GENwithPermutation({}, ['a', 'b'], {obeysNonrecursivity:true, obeysExhaustivity:true});
            assert.equal(JSON.stringify(wordsResult), '[[{},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"w","id":"b"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"b"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"a"}]}]}],[{},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"b"},{"cat":"w","id":"a"}]}]}]]');
        });
        it("no words string, just stree", function(){
            var st = {id:'root', cat:'cp', children:[{cat:'x0', id:'a'}, {cat:'x0', id:'b'}]};
            var options = {obeysNonrecursivity:true, obeysExhaustivity:true};
            var x = GENwithPermutation(st, '', options);
            var expectedResultString = '[[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"b"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"w","id":"b"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"b"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"a"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"b"},{"cat":"w","id":"a"}]}]}]]';
            var expectedResult = JSON.parse(expectedResultString);
            assert.deepEqual(x, expectedResult,  JSON.stringify(x, null, 4) + '\n' + JSON.stringify(expectedResult, null, 4))//messageGEN(x, expectedResult, options)); //something's wrong with this deepEqual comparison -- visual comparison reveals no differences
        });

        it("stree with clitic", function(){
            var x = GENwithPermutation({id:'root', cat:'cp', children:[{cat:'x0', id:'a'}, {cat:'clitic', id:'b'}]}, '', {obeysNonrecursivity:true, obeysHeadedness:true});
            var expectedResultString = [[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"cat":"w","id":"a"},{"id":"phi2","cat":"phi","children":[{"cat":"syll","id":"b"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"cat":"syll","id":"b"}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"w","id":"a"}]},{"id":"phi2","cat":"phi","children":[{"cat":"syll","id":"b"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"w","id":"a"},{"cat":"syll","id":"b"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"cat":"syll","id":"b"},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"a"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"syll","id":"b"}]},{"cat":"w","id":"a"}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi3","cat":"phi","children":[{"cat":"syll","id":"b"}]},{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"a"}]}]}],[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"cat":"clitic","id":"b"}]},{"id":"root","cat":"i","children":[{"id":"phi4","cat":"phi","children":[{"cat":"syll","id":"b"},{"cat":"w","id":"a"}]}]}]];
            assert.equal(JSON.stringify(x), expectedResultString);
        })
    });
    /*describe("GEN handles duplicates", function(){
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
    */
    
}

genWithPermutationTest();