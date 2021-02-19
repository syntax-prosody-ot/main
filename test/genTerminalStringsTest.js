//genTerminalStringsTest.js

function genTerminalStringsTest(){
    var T3 = ['a', 'b', 'c'];

    var T4 = ['a', 'u'];

    describe('terminal strings drawn from [a, b, c]', function () {
      it('Min: 2, Max: 2,', function () {
        var test1 = ["a a", "a b", "a c", "b a", "b b", "b c", "c a", "c b", "c c"];
        assert.deepEqual(generateTerminalStrings(T3, 2, 2), test1);
      });

      it('Min: 3, Max: 3,', function () {
        var test2 = ["a a a", "a a b", "a a c", "a b a", "a b b", "a b c", "a c a",
          "a c b", "a c c", "b a a", "b a b", "b a c", "b b a", "b b b", "b b c", "b c a",
          "b c b", "b c c", "c a a", "c a b", "c a c", "c b a", "c b b", "c b c", "c c a",
          "c c b", "c c c"];
        assert.deepEqual(generateTerminalStrings(T3, 3, 3), test2);
      });

      it('Min:2, Max: 3,', function () {
        var test3 = ["a a", "a b", "a c", "b a", "b b", "b c", "c a", "c b", "c c",
          "a a a", "a a b", "a a c", "a b a", "a b b", "a b c", "a c a", "a c b", "a c c",
          "b a a", "b a b", "b a c", "b b a", "b b b", "b b c", "b c a", "b c b", "b c c",
          "c a a", "c a b", "c a c", "c b a", "c b b", "c b c", "c c a", "c c b", "c c c"];
        assert.deepEqual(generateTerminalStrings(T3, 2, 3), test3);
      });
    });

    describe('terminal strings drawn from [a, u]', function () {
      it('Min: 2, Max: 2,', function () {
        var test4 = ["a a", "a u", "u a", "u u"];
        assert.deepEqual(generateTerminalStrings(T4, 2, 2), test4);
      });

      it('Min: 3, Max 3,', function () {
        var test5 = ["a a a", "a a u", "a u a", "a u u", "u a a", "u a u", "u u a", "u u u"];
        assert.deepEqual(generateTerminalStrings(T4, 3, 3), test5);
      });

      it('Min: 4, Max: 4,', function () {
        var test6 = ["a a a a", "a a a u", "a a u a", "a a u u", "a u a a", "a u a u", "a u u a",
          "a u u u", "u a a a", "u a a u", "u a u a", "u a u u", "u u a a", "u u a u", "u u u a", "u u u u"];
        assert.deepEqual(generateTerminalStrings(T4, 4, 4), test6);
      });

      it('Min: 2, Max: 4,', function () {
        var test7 = ["a a", "a u", "u a", "u u", "a a a", "a a u", "a u a", "a u u", "u a a", "u a u", "u u a",
          "u u u", "a a a a", "a a a u", "a a u a", "a a u u", "a u a a", "a u a u", "a u u a", "a u u u", "u a a a",
          "u a a u", "u a u a", "u a u u", "u u a a", "u u a u", "u u u a", "u u u u"];
        assert.deepEqual(generateTerminalStrings(T4, 2, 4), test7);
      });
    });

    //console.log(generateTerminalStrings(T4, 3, 3));
}

genTerminalStringsTest();