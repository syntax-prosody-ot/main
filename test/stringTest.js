// Interface testing with mocha and chai

function setUpStringTest(){
    document.getElementsByTagName("head")[0].innerHTML += '\
        <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css">\
        <script src="https://unpkg.com/chai/chai.js"></script>\
        <script src="https://unpkg.com/mocha/mocha.js"></script>\
        <script class="mocha-init">\
            mocha.setup("bdd");\
            mocha.checkLeaks();\
        </script>\
    '

    const mochaDiv = document.createElement("div");
    mochaDiv.setAttribute("id", "mocha");

    const notResults = document.getElementsByClassName("not-results")[0];

    notResults.insertBefore(mochaDiv, notResults.firstChild);
}

function runStringTest() {
    describe("String Generation save/load/clear test", function(){
        for(let i = 1; i < 4; i++){
            it("Save with " + i + "string(s)", function(){

            });
            it("Clear with " + i + "string(s)", function(){

            });
            it("Load with " + i + "string(s)", function(){

            });
        }
    });
}
