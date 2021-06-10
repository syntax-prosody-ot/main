// Interface testing with mocha and chai. Tests save/load/clear for string generation on the interface.
// Doesn't get auto-tested in the console at present because it requires the interface.

/*var assert;

function setUpStringTest(){
    mocha.setup('bdd');
    mocha.checkLeaks();
    assert = chai.assert;

    const mochaDiv = document.createElement("div");
    mochaDiv.setAttribute("id", "mocha");

    const notResults = document.getElementsByClassName("not-results")[0];

    notResults.insertBefore(mochaDiv, notResults.firstChild);
}*/

function runStringTest() {
   // setUpStringTest();

    describe("stringTest.js", function(){
        describe("String Generation save/load/clear test", function(){
            var testSettings = '';
            var numOfInputs = 0;
            const arbitraryStrings = ["9000", "9001", "9002", "9003", "9004", "9005",
             "9006", "9007", "9008", "9009"]; //strings you would not find anywhere else in the saved analysis
            var unusedStrings, listDiv, inputs; //assigned beforeEach below


            beforeEach(function() {
                //runs before each "it" block (hence, beforeEach)
                unusedStrings = arbitraryStrings.slice(); //shallow copy, fyi
                listDiv = document.getElementById("listOfTerminals");
                inputs = listDiv.getElementsByTagName("input"); //reset b/c inputs added/removed

                changeInputTabs('goButton', 'inputButton');
            });

            it("Save with one string", function(){
                for(let input of inputs) {
                    // assign an arbitrary string to each input
                    if(input.type === 'text') {
                        numOfInputs ++;
                        input.value = unusedStrings.pop();
                    }
                }
                let savedString = record_analysis();
                testSettings = JSON.parse(savedString).myTrees;
                //object is more usefull than string later on. should not change until "two strings" tests

                for(let i = 0; i < numOfInputs.length; i++){
                    //all we need to know now is that the arbitrary strings all ended up in the saved analysis
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
                //load earlier saved string
                my_built_in_analysis({}, false, testSettings, []);
                for(let input of inputs) {
                    //we know the order arbitraryStrings were assigned, check that the same order is preserved
                    assert(input.value === unusedStrings.pop(), input.name + " did not load correctly");
                }
            });

            it("Save with two strings", function() {
                /* All we have to do now is click the "add list of terminals" button to get
                   more terminal string inputs and run the exact same three testcases above.
                   I don't want to factor out the copied code, though, because then clicking
                   on the test case in mocha would be less useful.
                */
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
            it("Clear with two strings", function() {
                clearAnalysis();
                for(let input of inputs) {
                    assert(input.value == '', input.name + " is not cleared");
                }
            });

            it("Load with two strings", function() {
                my_built_in_analysis({}, false, testSettings, []);
                for(let input of inputs) {
                    assert(input.value === unusedStrings.pop(), input.name + " did not load correctly");
                }
            });
        });
    });

    mocha.run();
}
