// Interface testing with mocha and chai for input validation for string generation.
// Doesn't get auto-tested in the console at present because it requires the interface.

var assert; 

function setUp(){
    mocha.setup("bdd");
    mocha.checkLeaks();
    assert = chai.assert;

    const mochaDiv = document.createElement("div");
    mochaDiv.setAttribute("id", "mocha");

    const notResults = document.getElementsByClassName("spotBlock")[2];
    notResults.insertBefore(mochaDiv, notResults.firstChild);
}

function runStringInputValidationTest() {
    //setUp();
    describe("stringInputValidationTest.js", function(){
        window.confirm = async function(){ //automatically returning true for confirm prompts
            return true;
        }
        describe("Generate trees", function() {
            this.timeout(15000); //timeout at 15000ms
            //override timeout - write done inside the parenthesis of function() 
            //setTimeout(done, #timeout time in ms) for the test you want to change timeout
            it("Generate combinations and permutations not added", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "";
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = [""];
                genTerminalStrings(); 
                assert.equal(document.getElementById("warning").style.display, "none", "Displayed warning when there is none!");
            });

            it("Generate combinations and permutations closed", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j";
                document.getElementById("spotForm")["genStringsMin"].value = 3;
                document.getElementById("spotForm")["genStringsMax"].value = 3;
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = [""];
                genTerminalStrings();
                assert.equal(document.getElementById("warning").style.display, "block", "Displayed warning not showing!");
            });

            for(let i = 0; i < 11; i++){
                it("Generate number: " + i, function() {
                    document.getElementById("error").style.display = "none";
                    document.getElementById("spotForm")["genStringsInput"].value = "j";
                    document.getElementById("spotForm")["genStringsMin"].value = i;
                    document.getElementById("spotForm")["genStringsMax"].value = i;
                    document.getElementById("spotForm")["genStringsInput"].length = undefined;
                    document.getElementById("stringGeneration").classList = ["open"];
                    genTerminalStrings();
                    if (i == 0 || i == 10){
                        assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
                    }else{
                        assert.equal(document.getElementById("error").style.display, "none", "Displayed error when there is none!");
                    }
                });
            }

            it("Generate no min or max present number", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j";
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings();
                assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
            });

            it("Generate min or max present not number", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j";
                document.getElementById("spotForm")["genStringsMin"].value = "j";
                document.getElementById("spotForm")["genStringsMax"].value = "j";
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings();
                assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
            });

            it("Generate min greater than max", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j"
                document.getElementById("spotForm")["genStringsMin"].value = 5;
                document.getElementById("spotForm")["genStringsMax"].value = 3;
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings();
                assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
            });
        });

        describe("Generate terminal strings", function() {
            this.timeout(15000);
            it("Input not added", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "";
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings(); 
                assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
            });

            for(let i = 0; i < 11; i++){
                it("Generate number: " + i, function() {
                    document.getElementById("error").style.display = "none";
                    document.getElementById("spotForm")["genStringsInput"].value = "j"
                    document.getElementById("spotForm")["genStringsMin"].value = i;
                    document.getElementById("spotForm")["genStringsMax"].value = i;
                    document.getElementById("spotForm")["genStringsInput"].length = undefined;
                    document.getElementById("stringGeneration").classList = ["open"];
                    genTerminalStrings();
                    if (i == 0 || i == 10){
                        assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
                    }else{
                        assert.equal(document.getElementById("error").style.display, "none", "Displayed error when there is none!");
                    }
                });
            }

            it("Generate no min or max present number", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j";
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings();
                assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
            });

            it("Generate min or max present not number", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j";
                document.getElementById("spotForm")["genStringsMin"].value = "j";
                document.getElementById("spotForm")["genStringsMax"].value = "j";
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings();
                assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
            });

            it("Generate min greater than max", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j"
                document.getElementById("spotForm")["genStringsMin"].value = 5;
                document.getElementById("spotForm")["genStringsMax"].value = 3;
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings();
                assert.equal(document.getElementById("error").style.display, "block", "Displayed error not showing!");
            });
        });
    });
    mocha.run();
}
