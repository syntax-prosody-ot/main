#build script to create a test file for mocha
source testBuild.sh
cat build/test.js build/top.js build/constraints.js > test/compiledTest/test.js #excludes interface.js since this runs from the console