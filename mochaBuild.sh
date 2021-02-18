#build script to create a test file for mocha
source testBuild.sh
cat build/test.js build/top.js build/constraints.js > test/test.js