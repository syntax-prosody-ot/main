var assert;

function setUpMocha(tag = "save-load-section", index = 0, arg = "tag"){
    mocha.setup('bdd');
    assert = chai.assert;

    const mochaDiv = document.createElement("div");
    mochaDiv.setAttribute("id", "mocha");

    var notResults;
    if (arg === "tag"){
        notResults = document.getElementById(tag); 
    }else{
        notResults = document.getElementsByClassName(tag)[index];
    }
    notResults.insertBefore(mochaDiv, notResults.firstChild);
}