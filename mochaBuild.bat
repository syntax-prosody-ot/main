call testBuild.bat
mkdir test\compiledTest
type build\top.js build\constraints.js build\test.js 1>test\compiledTest\test.js 2>NUL