type constraints\*.js 1>build\constraints.js 2>NUL
type interface_JS\*.js 1>build\interface.js 2>NUL
type build\constraints.js *.js test\*.js 1>build\test.js 2>NUL
type build\test.js lib\test\*.js build\interface.js 1>build\spot.js 2>NUL
