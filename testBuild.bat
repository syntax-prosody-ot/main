call jsbuild.bat
type test\*.js 1>build\test.js 2>NUL
type build\test.js lib\test\*.js >> build\spot.js