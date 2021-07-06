call jsbuild.bat
type test\*.js test/frontend_testing/*.js 1>build\test.js 2>NUL
type build\test.js lib\test\*.js >> build\spot.js