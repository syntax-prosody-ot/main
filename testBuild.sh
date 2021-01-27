cat constraints/*.js > build/constraints.js
cat build/constraints.js *.js test/*.js > build/test.js
cat interface_JS/*.js > build/interface.js
cat build/test.js lib/test/*.js build/interface.js > build/spot.js