#build script to create a test file for mocha
source testBuild.sh
cat build/top.js build/constraints.js build/test.js > test/compiledTest/test.js #excludes interface.js since this runs from the console