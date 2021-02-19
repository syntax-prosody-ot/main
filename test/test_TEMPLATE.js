//Template for test functions

function myTestFunctionName(){
    describe('"Describe" blocks show up as headers', function() {
        it('"It" blocks show up as individual tests', function() {
            let comment = 'The callback functions for "describe" and "it" provide useful scopes';
            assert(true == true, "If this test failed, it would be very bad and show this message");
            assert.equal(true, true, "A failure of this test would be equally bad");
            assert.notEqual(true, false); //you don't need to specify a failure message
        });
        it('"It" blocks are independed of each other', function() {
            assert(pCat.isHigher('alpha', 'beta'), 'This error does not affect other "it" blocks');
            assert.isTrue(false, "though it does affect other assertions in the same block");
        });
        it("Some usefull assertions for SPOT:", function() {
            assert.strictEqual(true, true, "true === true");
            assert.notStrictEqual("true", true, '"true" !== true');
            assert.deepEqual({id: 'one'}, {id: 'one'}, "this works recursively (for trees)");
        });
    });
    it('"Describe" blocks aren\'t strictly speaking necessary', function() {
        assert.isOk('Though "it" blocks are necessary');
    });
}

//myTestFunctionName();
//Call the test function at the end of the file so that it actually executes in mocha testing in the terminal.