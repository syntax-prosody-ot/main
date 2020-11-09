//Interface Testing with Mocha and Chai

function runConstraintTest(skipSetUp) {
    if(!skipSetUp) {setUpInterfaceTest();}
    describe("Pitch accent Save/Load/Clear", function() {
        let savedConstraints, constraints;

        beforeEach(function() {
            constraints = document.getElementById("pitch_accent_fieldset")
                .querySelectorAll('[name="constraints"]');
        });
        
        it("Save", function() {
            let values = [];
            for(let constraint of constraints) {
                constraint.click();
                values.push(constraint.value);
            }

            let savedString = record_analysis();
            savedConstraints = JSON.parse(savedString).myCon;
            //object is more usefull than string later on

            for(let value of values){
                let regex = new RegExp(value);
                assert(savedString.search(regex) > 0, value + " was not saved!");
            }
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