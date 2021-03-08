call treeBuild.bat
type constraints\*.js 1>build\constraints.js 2>NUL
type interface_JS\*.js 1>build\interface.js 2>NUL
type *.js 1>build\top.js 2>NUL
type build\constraints.js build\interface.js build\top.js 1>build\spot.js 2>NUL
