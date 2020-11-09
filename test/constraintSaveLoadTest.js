//Interface Testing with Mocha and Chai

function runConstraintTest(skipSetUp) {
    if(!skipSetUp) {setUpInterfaceTest();}
    let savedConstraints, constraints;

    function constraintSaveTest(inputs) {
        let values = [];
        for(let input of inputs) {
            input.click();
            values.push(input.value);
        }

        let savedString = record_analysis();
        let saveObject = JSON.parse(savedString);
        //object is more usefull than string later on

        for(let value of values){
            let regex = new RegExp(value);
            assert(savedString.search(regex) > 0, value + " was not saved!");
        }

        return saveObject;
    }

    describe("Layering and Structure Save/Load/Clear", function() {
        //nothing yet
    });

    describe("Pitch accent Save/Load/Clear", function() {
        beforeEach(function() {
            constraints = document.getElementById("pitch_accent_fieldset")
                .querySelectorAll('[name="constraints"]');
        });

        it("Save", function() {
            savedConstraints = constraintSaveTest(constraints).myCon;
        });
        
        it("Clear", function () {
            clearAnalysis();
            for(let constraint of constraints){
                assert(!constraint.checked, constraint.value + " was not cleared!");
            }
        });

        it("Load", function () {
            my_built_in_analysis({}, false, {}, savedConstraints);
            for(let constraint of constraints) {
                assert(constraint.checked, constraint.value + " did not load!");
            }
        });
    });

    mocha.run();
}