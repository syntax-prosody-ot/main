// Interface testing with mocha and chai
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
    setUp();
    describe("Generate trees", function() {
        it("Generate combinations and permutations not added - no warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "";
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = [""];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });

        it("Generate combinations and permutations closed - warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j";
            document.getElementById("spotForm")["genStringsMin"].value = 3;
            document.getElementById("spotForm")["genStringsMax"].value = 3;
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = [""];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });

        for(let i = 0; i < 11; i++){
            it("Generate number: " + i + " - no warning except input 0 or 10", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j";
                document.getElementById("spotForm")["genStringsMin"].value = i;
                document.getElementById("spotForm")["genStringsMax"].value = i;
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings(); //add that generate tree button was clicked instead
            });
        }

        it("Generate no min or max present number - warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j";
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });

        it("Generate min or max present not number - warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j";
            document.getElementById("spotForm")["genStringsMin"].value = "j";
            document.getElementById("spotForm")["genStringsMax"].value = "j";
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });

        it("Generate min greater than max - warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j"
            document.getElementById("spotForm")["genStringsMin"].value = 5;
            document.getElementById("spotForm")["genStringsMax"].value = 3;
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });
    });

    describe("Generate terminal strings", function() {
        it("Input not added", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "";
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });

        for(let i = 0; i < 11; i++){
            it("Generate number: " + i + " - no warning except input 0 or 10", function() {
                document.getElementById("spotForm")["genStringsInput"].value = "j"
                document.getElementById("spotForm")["genStringsMin"].value = i;
                document.getElementById("spotForm")["genStringsMax"].value = i;
                document.getElementById("spotForm")["genStringsInput"].length = undefined;
                document.getElementById("stringGeneration").classList = ["open"];
                genTerminalStrings(); //add that generate tree button was clicked instead
            });
        }

        it("Generate no min or max present number - warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j";
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });

        it("Generate min or max present not number - warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j";
            document.getElementById("spotForm")["genStringsMin"].value = "j";
            document.getElementById("spotForm")["genStringsMax"].value = "j";
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });

        it("Generate min greater than max - warning", function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j"
            document.getElementById("spotForm")["genStringsMin"].value = 5;
            document.getElementById("spotForm")["genStringsMax"].value = 3;
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });
    });
    mocha.run();
}
