//test function for annotateTonesTest.html

function annotateTonesTest(){
    describe("accentFromId converts id to boolean accent attribute", function(){

		it("id:'a' results in accent:true", function(){
			let x = {id:'a', cat:'w'};
			assert(accentFromId(x).accent, "accentFromId(x) did not set accent:true");
		});
		it("id: 'a_2' results in accent:true", function(){
			let x = {id:'a_2', cat:'w'};
			assert.equal(accentFromId(x).accent, true);
		});
		it("id:'u' results in accent:false", function(){
			let x = {id:'u', cat:'w'};
			assert.equal(accentFromId(x).accent, false);
		});
		it("id:'c' results in accent:false", function(){
			let x = {id:'c', cat:'w'};
			assert.equal(accentFromId(x).accent, false);
		});
	});

	describe("accent attributes determine tone marking for addJapaneseTones", function(){
		it("{accent:true, id:'word', cat: 'w'} gets tone H*L", function(){
			var y = {accent:true, id:'word', cat: 'w'};
			assert.equal(addJapaneseTones(y).tones, "H*L");
		});
		it("{accent:false, id:'word', cat: 'w'} gets continuation tone -", function(){
			let y = {accent:false, id:'word', cat: 'w'};
			assert.equal(addJapaneseTones(y).tones, "-");
		});
	});

	describe("GEN handles accents", function(){
		it("accent:true in sTree results in accents in GEN() output", function(){
			it("", function(){
				let sTree = {id:'root', cat:'xp', children:[{id:'x', accent:true, cat: 'x0'}, {id:'y', accent:false, cat: 'x0'}]};
				let cands = GEN(sTree, '');
				let firstPTree = {"id":"root","cat":"i","children":[
							{"cat":"w","accent":true,"id":"x"},
							{"id":"phi2","cat":"phi","children":[{"cat":"w","id":"y"}]
						}
					]
				};
				assert.deepEqual(cands[0][1], firstPTree);
			})
		});
		it("GEN({}, 'x y-accent') creates ptrees with accents", function(){
			let cands = GEN({}, 'x y-accent');
			var firstPTree = {
				"id":"root",
				"cat":"i",
				"children":[{"cat":"w","id":"x"},
					{"id":"phi2","cat":"phi","children":[
						{"cat":"w","accent":true,"id":"y"}]
					}
				]
			};
			assert.deepEqual(cands[0][1], firstPTree);
		});
	});

	describe("accent:true in any tree results in .a appended to its id in the parenthesized representation", function(){
		it("{id:'a', cat:'w'} is parenthesized as a", function(){
			let x = {id:'a', cat:'w', accent:true};
			assert.equal(parenthesizeTree(x), "a");
		});
		it("{id:'a_2', cat:'w'} is parenthesized as a_2", function(){
			let x = {id:'a_2', cat:'w', accent: true};
			assert.equal(parenthesizeTree(x), "a_2");
		});
		it("{id:'u', cat:'w', accent:true} is parenthesized as u.a", function(){
			let x = {id:'u', cat:'w', accent:true};
			assert.equal(parenthesizeTree(x), "u.a");
		});
		it("{id:'u', cat:'w', accent:false} is parenthesized as u", function(){
			let x = {id:'u', cat:'w', accent:false};
			assert.equal(parenthesizeTree(x), "u");
		});
		it("{id:'kokoro', cat:'w', accent:true} is parenthesized as kokoro.a", function(){
			let x = {id:'kokoro', cat:'w', accent:true};
			assert.equal(parenthesizeTree(x), "kokoro.a");
		});
	});

}

annotateTonesTest();