//GENinputTest.js

function logTrees(message, trees){
    console.log(message, trees.length);
    for(var s in trees){
        console.log(parenthesizeTree(trees[s]));
    }
}

function GENinputTest(){
    describe("Default settings: Binary branching syntactic trees rooted in XP with recursive XPs, x0 terminals", function(){
		it("a b trees = [a [b]], [[a] b], [[a][b]]", function(){
			var shortTrees = sTreeGEN('a b');
			logTrees('ab trees', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("a b c trees = [a [b [c]]], [a [[b] c]], [a [[b] [c]]], [[a] [b [c]]], [[a] [[b] c]], [[a] [[b] [c]]], [[a [b]] c], [[a [b]] [c]], [[[a] b] c], [[[a] b] [c]], [[[a] [b]] c], [[[a] [b]] [c]]", function(){
			
			var abcTrees = sTreeGEN('a b c');
			logTrees('abc trees', abcTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp3","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp4","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp3","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp4","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"xp10","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp10","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"xp7","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp11","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp11","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"id":"xp7","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp12","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp12","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"xp7","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]';
			assert(JSON.stringify(abcTrees)===expectedTreeString);
		});
	
	});

	describe("Changing categories", function(){
		it("cp root", function(){
			var shortTrees = sTreeGEN('a b', {rootCategory:'cp'});
			logTrees('a b trees rooted in cp', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"cp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"root","cat":"cp","children":[{"id":"xp3","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"id":"root","cat":"cp","children":[{"id":"xp3","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"root","cat":"cp","children":[{"id":"xp4","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"}]}]}]},{"id":"root","cat":"cp","children":[{"id":"xp5","cat":"xp","children":[{"id":"xp3","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]}]},{"id":"root","cat":"cp","children":[{"id":"xp6","cat":"xp","children":[{"id":"xp3","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"}]}]}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("cp root, cp recursive, xp terminals", function(){
			var shortTrees = sTreeGEN('a b', {rootCategory:'cp', recursiveCategory:'cp', terminalCategory:'xp'});
			logTrees('a b trees rooted in cp with recursive cps, xp terminals', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"cp","children":[{"cat":"xp","id":"a"},{"id":"cp0","cat":"cp","children":[{"cat":"xp","id":"b"}]}]},{"id":"root","cat":"cp","children":[{"id":"cp1","cat":"cp","children":[{"cat":"xp","id":"a"}]},{"cat":"xp","id":"b"}]},{"id":"root","cat":"cp","children":[{"id":"cp1","cat":"cp","children":[{"cat":"xp","id":"a"}]},{"id":"cp0","cat":"cp","children":[{"cat":"xp","id":"b"}]}]},{"id":"root","cat":"cp","children":[{"cat":"xp","id":"a"},{"cat":"xp","id":"b"}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("xp root, x0 recursive", function(){
			var x0Trees = sTreeGEN('a b', {recursiveCategory:'x0', terminalCategory:'x0'});
			logTrees('x0 trees', x0Trees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"root","cat":"xp","children":[{"id":"x00","cat":"x0","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]}]}]';
			assert(JSON.stringify(x0Trees)===expectedTreeString);
		});

		it("x0 root", function(){
			var x0Trees = sTreeGEN('a b c', {rootCategory:'x0', recursiveCategory: 'x0', terminalCategory:'x0'});
			logTrees('x0 trees', x0Trees);
			var expectedTreeString = '[{"id":"root","cat":"x0","children":[{"cat":"x0","id":"a"},{"id":"x00","cat":"x0","children":[{"cat":"x0","id":"b"},{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"x0","children":[{"id":"x01","cat":"x0","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]';
			assert(JSON.stringify(x0Trees)===expectedTreeString);
		});
	
	});

	describe("Manipulating visiblity settings", function(){
		it("Treat non-branching XPs as X0s", function(){
			var shortTrees = sTreeGEN('a b c d', {noUnary:true});
			logTrees('ab trees', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"},{"cat":"x0","id":"d"}]}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp3","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"},{"cat":"x0","id":"c"}]},{"cat":"x0","id":"d"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"id":"xp5","cat":"xp","children":[{"cat":"x0","id":"c"},{"cat":"x0","id":"d"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp7","cat":"xp","children":[{"cat":"x0","id":"b"},{"cat":"x0","id":"c"}]}]},{"cat":"x0","id":"d"}]},{"id":"root","cat":"xp","children":[{"id":"xp10","cat":"xp","children":[{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]},{"cat":"x0","id":"d"}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("Bar levels are invisible", function(){
			
			var abcTrees = sTreeGEN('a b c', {noBarLevels:true});
			logTrees('abc trees', abcTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp3","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp4","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp3","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp4","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"xp10","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp10","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"xp7","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp11","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp11","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"id":"xp7","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp12","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp12","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"xp7","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]';
			assert(JSON.stringify(abcTrees)===expectedTreeString);
		});
	
	});

	describe("No adjunction", function(){
		it("a b trees without adjuncts = [a [b]], [[a] b]", function(){
			var shortTrees = sTreeGEN('a b', {noAdjuncts:true});
			logTrees('ab trees without adjuncts', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("a b c trees without adjuncts", function(){
			var abcTrees = sTreeGEN('a b c', {noAdjuncts:true});
			logTrees('abc trees without adjuncts', abcTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp3","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp10","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp11","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]';
			assert(JSON.stringify(abcTrees)===expectedTreeString);
		});
	
		it("a b c trees without adjuncts, invisible bar levels", function(){
			var abcTrees = sTreeGEN('a b c', {noAdjuncts:true, noBarLevels:true});
			logTrees('abc trees without adjuncts or bar levels', abcTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp3","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"c"}]}]},{"id":"root","cat":"xp","children":[{"id":"xp6","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp10","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp8","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"cat":"x0","id":"c"}]},{"id":"root","cat":"xp","children":[{"id":"xp11","cat":"xp","children":[{"id":"xp9","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]';
			assert(JSON.stringify(abcTrees)===expectedTreeString);
		});
	});

	describe("a b trees, with clitics", function(){
		it("XP clitics on left", function(){
			var shortTrees = sTreeGEN('a b', {addClitics:"left"});
			logTrees('ab trees with leftward clitics', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]},{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]}]},{"id":"root","cat":"xp","children":[{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]},{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("XP clitics on right", function(){
			var abcTrees = sTreeGEN('a b', {addClitics:'right'});
			logTrees('ab trees with rightward clitics', abcTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]}]},{"id":"root","cat":"xp","children":[{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]}]},{"id":"root","cat":"xp","children":[{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]}]}]';
			assert(JSON.stringify(abcTrees)===expectedTreeString);
		});

		it("X0 clitics on left", function(){
			var shortTrees = sTreeGEN('a b c', {addClitics:"left", cliticsAreBare:true});
			logTrees('a b c trees with bare leftward clitics', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"id":"x","cat":"clitic"},{"id":"root","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"},{"cat":"x0","id":"c"}]}]}]},{"id":"root","cat":"xp","children":[{"id":"x","cat":"clitic"},{"id":"root","cat":"xp","children":[{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"},{"cat":"x0","id":"b"}]},{"cat":"x0","id":"c"}]}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("XP clitics with invisible bar levels", function(){
			var shortTrees = sTreeGEN('a b', {addClitics:"left", cliticsInsideFirstRoot:true});
			logTrees('a b trees with leftward clitics inside', shortTrees);
			var expectedTreeString = '[{"id":"root","cat":"xp","children":[{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]},{"cat":"x0","id":"a"},{"id":"xp0","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"root","cat":"xp","children":[{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]},{"id":"xp1","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]}]';
			assert(JSON.stringify(shortTrees)===expectedTreeString);
		});

		it("XP clitics with CP root", function(){
			var cpTrees = sTreeGEN('a b', {addClitics:"right", rootCategory:'cp'});
			logTrees('XP clitics with CP root', cpTrees);
			var expectedTreeString = '[{"id":"root","cat":"cp","children":[{"id":"xp4","cat":"xp","children":[{"cat":"x0","id":"a"},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]}]},{"id":"root","cat":"cp","children":[{"id":"xp5","cat":"xp","children":[{"id":"xp3","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"cat":"x0","id":"b"}]},{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]}]},{"id":"root","cat":"cp","children":[{"id":"xp6","cat":"xp","children":[{"id":"xp3","cat":"xp","children":[{"cat":"x0","id":"a"}]},{"id":"xp2","cat":"xp","children":[{"cat":"x0","id":"b"}]}]},{"id":"dp","cat":"xp","children":[{"id":"x","cat":"clitic"}]}]}]';
			assert(JSON.stringify(cpTrees)===expectedTreeString);
		})
	
	});

}

GENinputTest();