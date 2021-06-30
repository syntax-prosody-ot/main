frontend testing README
================

Different files contributing to the frontend test
----------------

Build Script - frontendBuild.sh/frontendBuild.bat
----------------

* source testBuild.sh - will be using things from testBuild.sh
* cat command which copies interface1.html and frontend.html files to a file, note that placing does matters. interface1.html should be copied first and therefore, should be the first argument of cat command and then the rest can be copied
* sed command just replaces directory of src and href tags in html so that things are referencing the right files and the right directory path is listed. 

Build test names - frontend.html
----------------
* displays mocha testing in test.html in 'save-load-section', note this can be changed if you would like to but for individual tests from interface1.html DO NOT change the mocha code
* appends the function name starting with '_r' (which all frontend tests should start with, this is the function in frontend testing that contains mocha tests) to an array
* test functions are ran first then clearAll() and clearTableau() are ran after each tests so that tests don't get interfered

setUpMocha.js - setUpMocha(tag, arg); sets up mocha for tests
----------------
* tag is the html tag or html class place where you want your mocha test to appear. It's optional and the default is "save-load-section".
* index is the index for the class tag. It's optional and the default is 0. 
* arg is the string that tells whether tag input is html tag or html class. It's optional and the default is "tag".

test.html
----------------
* run frontendBuild.sh which will compile frontend.html and interface1.html together

Github actions - test-spot-frontend.yml
----------------
* Installs mocha-headless-chrome which uses mocha and puppeteer and runs frontendBuild.sh build script. It will automatically generate frontend tests in headless-chrome and gets the results.

How to add a new frontend test:
----------------
Do not add anything to frontend.html when creating tests unless specifically making changes to it. Testing is done with headless Chrome, currently, being using just mocha but can add on other testing packages such as puppeteer. Examples of test files are stringInputValidationTest.js and stringTest.js in test/frontend_testing

Create a .js file with the two functions described below (_r<> and run<>). In the templates below, <> means to replace that part with the name of your particular test. The file should be in the directory main/test/frontend_testing

Part 1: setting up mocha tests
----------------
* Write a test function whose name is prefixed with “_r” so that it will be picked up by the code in main/test/frontend_testing/frontend.html and added to the compiled list of mocha frontend tests to run in automated testing.
* This function should contain all the describe() and it() statements of the actual test.
* It is important that the function that contains mocha tests starts with _r

function _r<>() {\
     //tests\
}

Part 2: setting up function being run on interface1.html
----------------
* Running individual test suites manually on the interface, write a function that runs both the setUp<>() and _r<>() functions. This can be called from the console of interface1.html, if the build file spot.js has been built using testBuild.sh or testBuild.bat (rather than the default jsbuild.sh / jsbuild.bat). 

function run<>() {\
     setUpMocha(tag, arg);  //setUp mocha\
     _r<>();    //call the mocha tests\
     mocha.run();   //run mocha tests\
}

Running the test on interface1.html
----------------
* On Chrome, right-click on Inspect on interface1.html page and go to console. Call run<>() and enter

