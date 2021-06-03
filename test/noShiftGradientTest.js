// example with moving x
function noShiftGradientTest(){
    console.log("a b c d X")
    var sorder1 = ["a", "b", "c", "d", "x"];

    // example with potential movers x,y
    sorder2 = ["a", "b", "c", "d", "x", "y"];
   
    // additional test cases
    sorder3 = ["a", "b", "c", "d", "x"];

    //automated test
    describe('noShiftGradientTest.html', function(){
        describe('Moving X, sorder = "a b c d X"', function() {
                it('No movement: porder = "a b c d X:"', function() {
                    var porder1 = ["a", "b", "c", "d", "x"];
                    assert.equal(noShiftGradient(sorder1, porder1), 0);
                });

                it('1 movement: porder = "a b c X d: "', function() {
                    porder2 = ["a", "b", "c", "x", "d"];
                    assert.equal(noShiftGradient(sorder1, porder2), 1);
                });

                it('2 movement: porder = "a b X c d: "', function() {
                    porder3 = ["a", "b", "x", "c", "d"];
                    assert.equal(noShiftGradient(sorder1, porder3), 2);
                });

                it('3 movement: porder = "a X b c d: "', function() {
                    porder4 = ["a", "x", "b", "c", "d"];
                    assert.equal(noShiftGradient(sorder1, porder4), 3);
                });

                it('4 movement: porder = "X a b c d: "', function() {
                    porder5 = ["x", "a", "b", "c", "d"];
                    assert.equal(noShiftGradient(sorder1, porder5), 4);
                });
            });

        describe('Potential Movers X,Y, sorder = "a b c d X Y"', function() {
            it('4 shifts in precedence relations: porder = "X a b c d Y: "', function() {
                porder6 = ["x", "a", "b", "c", "d", "y"];
                assert.equal(noShiftGradient(sorder2, porder6), 4);
            });

            it('5 Shifts in precedence relations: porder = "Y a b c d X: "', function() {
                porder7 = ["y", "a", "b", "c", "d", "x"];
                assert.equal(noShiftGradient(sorder2, porder7), 5);
            });

            it('8 Shifts in precedence relations: porder = "X Y a b c d: "', function() {
                porder8 = ["x", "y", "a", "b", "c", "d"];
                assert.equal(noShiftGradient(sorder2, porder8), 8);
            });

            it('9 Shifts in precedence relations: porder = "Y X a b c d: "', function() {
                porder9 = ["y", "x", "a", "b", "c", "d"];
                assert.equal(noShiftGradient(sorder2, porder9), 9);
            });
        });

        describe('Additional Tests, sorder = "a b c d X"', function() {
            it('10 Shifts in precedence relations: porder = "X d c b a: "', function() {
                pordera = ["x", "d", "c", "b", "a"];
                assert.equal(noShiftGradient(sorder3, pordera), 10);
            });

            it('1 Shift in precedence relations: porder = "b a c d x: "', function() {
                porderb = ["b", "a", "c", "d", "x"];
                assert.equal(noShiftGradient(sorder3, porderb), 1);
            });

            it('2 Shifts in precedence relations: porder = "c a b d x: "', function() {
                porderc = ["c", "a", "b", "d", "x"];
                assert.equal(noShiftGradient(sorder3, porderc), 2);
            });

            it('3 Shifts in rpecedence relations: porder = "d a b c X: "', function() {
                porderd = ["d", "a", "b", "c", "x"];
                assert.equal(noShiftGradient(sorder3, porderd), 3);
            });
        });
    });
}

noShiftGradientTest();