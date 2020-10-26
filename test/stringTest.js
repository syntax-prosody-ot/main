// Interface testing with mocha and chai

var assert;

function setUpStringTest(){
    mocha.setup('bdd');
    mocha.checkLeaks();
    assert = chai.assert;

    const mochaDiv = document.createElement("div");
    mochaDiv.setAttribute("id", "mocha");

    const notResults = document.getElementsByClassName("not-results")[0];

    notResults.insertBefore(mochaDiv, notResults.firstChild);
}

function runStringTest() {
    setUpStringTest();

    describe("String Generation save/load/clear test", function(){
        var testSettings = '';
        var numOfInputs = 0;
        const arbitraryStrings = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", 
            "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua"];
        var unusedStrings, listDiv, inputs;


        beforeEach(function() {
            unusedStrings = arbitraryStrings.slice();
            listDiv = document.getElementById("listOfTerminals");
            inputs = listDiv.getElementsByTagName("input");

            changeInputTabs('goButton', 'inputButton');
        });

        it("Save with one string", function(){
            for(let input of inputs) {
                if(input.type === 'text') {
                    numOfInputs ++;
                    input.value = unusedStrings.pop();
                }
            }
            let savedString = record_analysis();
            testSettings = JSON.parse(savedString).myTrees;

            for(let i = 0; i < numOfInputs.length; i++){
                let regex = new RegExp(arbitraryStrings[arbitraryStrings.length - i]);
                assert(savedString.search(regex) > 0, "Input number " + i + " was not saved");
            }
        });

        it("Clear with one string", function() {
            clearAnalysis();
            for(let input of inputs) {
                assert(input.value == '', input.name + " is not cleared");
            }
        });

        it("Load with one string", function() {
            my_built_in_analysis({}, false, testSettings, []);
            for(let input of inputs) {
                assert(input.value === unusedStrings.pop(), input.name + " did not load correctly");
            }
        });

        it("Save with two strings", function() {
            document.getElementById("addList").click();
            for(let input of inputs) {
                if(input.type === 'text') {
                    numOfInputs ++;
                    input.value = unusedStrings.pop();
                }
            }
            let savedString = record_analysis();
            testSettings = JSON.parse(savedString).myTrees;

            for(let i = 0; i < numOfInputs.length; i++){
                let regex = new RegExp(arbitraryStrings[arbitraryStrings.length - i]);
                assert(savedString.search(regex) > 0, "Input number " + i + " was not saved");
            }
        });
        it("Clear with two string", function() {
            clearAnalysis();
            for(let input of inputs) {
                assert(input.value == '', input.name + " is not cleared");
            }
        });

        it("Load with two string", function() {
            my_built_in_analysis({}, false, testSettings, []);
            for(let input of inputs) {
                assert(input.value === unusedStrings.pop(), input.name + " did not load correctly");
            }
        });
    });

    mocha.run();
}
