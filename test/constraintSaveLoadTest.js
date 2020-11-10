//Interface Testing with Mocha and Chai

function runConstraintTest(skipSetUp) {
    if(!skipSetUp) {setUpInterfaceTest();}

    function ensureChecked(element) {
        /*takes an HTML DOM element,
          sets to "checked" if checkbox and unchecked with click()
          returns whether initially checked
        */
        let checked = true;
        if(element.type && element.type === "checkbox" && !element.checked){
            element.click();
            checked = false;
        }
        assert(!(element.type && element.type === "checkbox" && !element.checked),
            "".concat(element.name, ">>", element.value, " is not behaving properly"));
        return checked;
    }

    function constraintSaveTest(constraints, categories = []) {

        let defaultString = record_analysis();
        let searchTerms = {}; //perhapse a class would be better, but there is only one instance
        
        searchTerms.content = {};

        searchTerms.add = function(term) {
            if(searchTerms.content[term]) {
                searchTerms.content[term].expected ++;
            }
            else {
                let initialMatches = [...defaultString.matchAll(new RegExp(term, 'g'))].length;
                searchTerms.content[term] = {
                    initial: initialMatches,
                    expected: initialMatches + 1,
                };
            }
        }

        for(let constraint of constraints) {
            ensureChecked(constraint);
            searchTerms.add(constraint.value);
        }

        for(let category of categories) {
            if(!ensureChecked(category)) {
                //this assumes there is one and only one default category per constraint
                searchTerms.add(category.name.split('-')[1]);
            }
        }

        let savedString = record_analysis();
        let saveObject = JSON.parse(savedString);
        //object is more usefull than string later on

        for(let term of Object.keys(searchTerms.content)){
            let regex = new RegExp(term, 'g');
            assert([...savedString.matchAll(regex)].length === searchTerms.content[term].expected,
                term + " was not saved!");
        }

        return saveObject;
    }

    describe("Layering and Structure Save/Load/Clear", function() {
        let savedConstraints, constraints, categories;
        beforeEach(function() {
            constraints = document.querySelectorAll(
                '#layering_and_structure_fieldset [name="constraints"]');
            categories = document.querySelectorAll(
                '#layering_and_structure_fieldset [name^="category-"]');
        });

        it("Save", function() {
            savedConstraints = constraintSaveTest(constraints, categories).myCon;
            //assert(false, "This is to remind Max that this test should be failing right now");
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

    describe("Pitch accent Save/Load/Clear", function() {
        let savedConstraints, constraints;
        beforeEach(function() {
            constraints = document.querySelectorAll(
                '#pitch_accent_fieldset [name="constraints"]');
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