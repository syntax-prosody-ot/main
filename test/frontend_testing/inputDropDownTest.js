// Interface testing with mocha and chai for input validation for string generation.
// Doesn't get auto-tested in the console at present because it requires the interface.

function _rInputDropDownTest() {
    describe("stringInputTest.js", function(){
        window.confirm = async function(){ //automatically returning true for confirm prompts
            return true;
        }
        describe("One Input Present", function() {
            this.timeout(15000); //timeout at 15000ms
            //override timeout - write done inside the parenthesis of function() 
            //setTimeout(done, #timeout time in ms) for the test you want to change timeout
            it("Automatic Tab", function() {
                document.getElementById('inputOptions').style.display = "block";
                document.getElementById("spotForm")["genStringsInput"].value = "j"
                document.getElementById("spotForm")["genStringsMin"].value = 1;
                document.getElementById("spotForm")["genStringsMax"].value = 3;
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings(); 
                assert.equal(document.getElementById("results-container").classList.value, "show-tableau", "Results are not showing up in tableau!");
            });
        });
    });
}

function runInputDropDownTest() {
    setUpMocha();
    _rInputDropDownTest();
    mocha.run();
}