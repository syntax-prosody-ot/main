// Interface testing with mocha and chai
mocha.setup("bdd"); //brings "describe", "it", etc. into global namespace
var assert = chai.assert; 

//let divd = document.getElementById("spotForm")["genStringsInput"].value;
//divd = "a";
//console.log(divd);
//console.log(spotForm.genStringsInput.value);
//document.getElementById("spotForm")["genStringsInput"].value

//genStringsInput = list of terminal input
//genStringsMin = list of terminal min
//genStringsMax = list of terminal max

//inputToGenAuto = string of terminal input

describe("Generate trees", function() {
    it("Generate combinations and permutations not added", function() {
        document.getElementById("spotForm")["genStringsInput"].value = "";
        document.getElementById("spotForm")["genStringsInput"].length = undefined;
        document.getElementById("stringGeneration").classList = [""];
        genTerminalStrings(); //add that generate tree button was clicked instead
    });
    it("Generate combinations and permutations closed", function() {
        document.getElementById("spotForm")["genStringsInput"].value = "j";
        document.getElementById("spotForm")["genStringsMin"].value = 3;
        document.getElementById("spotForm")["genStringsMax"].value = 3;
        document.getElementById("spotForm")["genStringsInput"].length = undefined;
        document.getElementById("stringGeneration").classList = [""];
        genTerminalStrings(); //add that generate tree button was clicked instead
    });
    for(let i = 0; i < 11; i++){
        it("Generate number: " + i, function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j"
            document.getElementById("spotForm")["genStringsMin"].value = i;
            document.getElementById("spotForm")["genStringsMax"].value = i;
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });
    }
});

describe("Generate terminal strings", function() {
    it("Input not added", function() {
        document.getElementById("spotForm")["genStringsInput"].value = "";
        document.getElementById("spotForm")["genStringsInput"].length = undefined;
        document.getElementById("stringGeneration").classList = ["open"];
        genTerminalStrings(); //add that generate tree button was clicked instead
    });
    for(let i = 0; i < 11; i++){
        it("Generate number: " + i, function() {
            document.getElementById("spotForm")["genStringsInput"].value = "j"
            document.getElementById("spotForm")["genStringsMin"].value = i;
            document.getElementById("spotForm")["genStringsMax"].value = i;
            document.getElementById("spotForm")["genStringsInput"].length = undefined;
            document.getElementById("stringGeneration").classList = ["open"];
            genTerminalStrings(); //add that generate tree button was clicked instead
        });
    }
});

mocha.run();
