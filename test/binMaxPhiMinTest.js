//binMaxPhiMinTest.js

//Introduce variables for use here and in binMaxPhiMinTest.html
var s = undefined;
var c = 'phi';

// Example 1
// ( chihoo [[ken satsu] choo] ) = ( w [w F] )
// --> no violation: only 2 minimal words in the phi
var tree1 = {
	"id":"phi0",
	"cat":"phi",
	"children":
		[
			{
				"id":"word1",
				"cat":"w"
      },
      {
        "id":"word2",
				"cat":"w"
      },
      {
        "id":"clitic1",
				"cat":"foot"
      }
		]
};

// Example 2
// ( chihoo [ [ koo kyoo][dan tai] ] ) = (w [w w] )
// --> violation: 3 minimal words in the phi
var tree2 = {
	"id":"phi0",
	"cat":"phi",
	"children":
		[
			{
				"id":"word1",
				"cat":"w"
      },
      {
        "id":"word2",
				"cat":"w"
      },
      {
        "id":"word3",
				"cat":"w"
      }
		]
};

// Example 3
// ( chihoo ([ [ koo kyoo][dan tai] ]) ) = (w ([w w]) )
// --> no violation: 3 minimal words in the non-minimal phi, but only 2 minimal words (w) in the minimal phi
var tree3 = {
	"id":"phi0",
	"cat":"phi",
	"children":
		[
      {
        "id":"word1",
        "cat":"w"
      },
			{
				"id":"phi1",
				"cat":"phi",
        "children":
          [
            {
              "id":"word2",
      				"cat":"w"
            },
            {
              "id":"word3",
      				"cat":"w"
            }
          ]
			}
		]
};

// Example 4
// 1 violation
var tree4 = {
	"id":"phi0",
	"cat":"phi",
	"children":
		[
      {
        "id":"word1",
        "cat":"w"
      },
			{
				"id":"phi1",
				"cat":"phi",
        "children":
          [
            {
              "id":"word2",
      				"cat":"w"
            },
            {
              "id":"word3",
      				"cat":"w"
            },
            {
              "id":"word4",
      				"cat":"w"
            }
          ]
			}
		]
};

function binMaxPhiMinTest(){
    
    describe('Tree1: ( chihoo [[ken satsu] choo] ) = ( w [w F] ) ', function() {
            it('binMax_minLeaves(s, tree1, c), Expected Violations: 0', function() {
                assert.equal(binMax_minLeaves(s, tree1, c), 0);
            });
        });
		
    describe('Tree2: ( chihoo [ [ koo kyoo][dan tai] ] ) = (w [w w] ) ', function() {
            it('binMax_minLeaves(s, tree2, c) Expected Violations: 1', function() {
                assert.equal(binMax_minLeaves(s, tree2, c), 1);
            });
        });
		
    describe('Tree3: ( chihoo ([ [ koo kyoo][dan tai] ]) ) = (w ([w w]) ) ', function() {
            it('binMax_minLeaves(s, tree3, c) Expected Violations: 0', function() {
                assert.equal(binMax_minLeaves(s, tree3, c), 0);
            });
        });
		
    describe('Tree4: ' + parenthesizeTree(tree4), function() {
            it('binMax_minLeaves(s, tree4, c) Expected Violations: 1', function() {
                assert.equal(binMax_minLeaves(s, tree4, c), 1);
            });
        });
}

binMaxPhiMinTest();