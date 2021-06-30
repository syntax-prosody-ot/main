README for frontend testing
================

#Files contributing to the frontend test:
----------------

Build Script - frontendBuild.sh/frontendBuild.bat
----------------
These scripts are called from the console by developers and in automated testing to build test files for testing interface1.html.

Script contents:

* source testBuild.sh - front-end testing uses things from testBuild.sh
* cat command copies interface1.html and frontend.html files to a new file, test.html. Note that placing does matters. interface1.html should be copied first and therefore, should be the first argument of cat command and then the rest can be copied
* sed command just replaces directory of src and href tags in html so that things are referencing the right files and the right directory path is listed. 

Build test names - frontend.html
----------------
This file contains html and calls to test functions that actually manage the mocha tests of frontend functionality. It is concatenated with interface1.html by the build script to create test.html.

* displays mocha testing in test.html in 'save-load-section'. Note this location can be changed if you like, but for individual tests from interface1.html DO NOT change the mocha code.
* collects all function names starting with '_r' (which all frontend tests should start with, this is the function in frontend testing that contains mocha tests) into an array of test functions
* For each function in the array: 
	* runs the function
	* runs clearAll() and clearTableau() so that tests don't interfere with each other

setUpMocha.js - function setUpMocha(tag, arg)
----------------
This script defines setUpMocha(), a function that sets up mocha for frontend tests being run from the console. It is included in the build files and called from each run<testname>Test() function, such as runStringInputValidationTest() in stringInputValidationTest.js.

Arguments:

* tag is the html tag or html class place where you want your mocha test to appear. It's optional and the default is "save-load-section".
* index is the index for the class tag. It's optional and the default is 0. 
* arg is the string that tells whether tag input is html tag or html class. It's optional and the default is "tag".

test.html
----------------
The test file created by frontendBuild.sh. Open it in the browser to see the results of the frontend testing for all tests.

* To update it, run frontendBuild.sh, which will compile frontend.html and interface1.html together.

Github actions - test-spot-frontend.yml
----------------
* Installs mocha-headless-chrome which uses mocha and puppeteer and runs frontendBuild.sh build script. 
* It will automatically generate frontend tests in headless-chrome and gets the results.

#How to add a new frontend test:
----------------
Do not add anything to frontend.html when creating tests unless specifically making changes to it. Testing is done with headless Chrome, currently using just mocha. It is also possible to add on other testing packages such as puppeteer. Examples of test files are stringInputValidationTest.js and stringTest.js in test/frontend_testing

To add a new frontend test, begin by creating a .js file with the two functions described below ( \_r<> and run<>). In the templates below, <> means to replace that part with the name of your particular test. Save the file in the directory main/test/frontend_testing

If all is set up correctly, calls to these functions will be added to test.html when you run the build script frontendBuild.sh or frontendBuild.bat.

Part 1: Set up mocha tests
----------------
* Write a test function whose name is prefixed with “\_r” so that it will be picked up by the code in main/test/frontend_testing/frontend.html and added to the compiled list of mocha frontend tests to run in automated testing.
* This function should contain all the describe() and it() statements of the actual test.
* It is important that the name of the function that contains mocha tests starts with \_r

		function _r<>() {
			describe("my test description", function(){
				it("individual test description", function(){
					assert(...)
				}
			}
		}

Part 2: Set up the function being run on interface1.html
----------------
* For running individual test suites manually on the interface, write a function that runs both the setUp<>() and _r<>() functions. This can be called from the console of interface1.html, if the build file spot.js has been built using testBuild.sh or testBuild.bat (rather than the default jsbuild.sh / jsbuild.bat). 

		function run<>() {
		     setUpMocha(tag, arg);  //setUp mocha
		     _r<>();    //call the mocha tests
		     mocha.run();   //run mocha tests
		}

Running the test on interface1.html
----------------
* On Chrome, right-click on Inspect on interface1.html page and go to console. 
* Call run<>() and hit Enter

