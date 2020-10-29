cat constraints/*.js > build/constraints.js
cat build/constraints.js *.js test/*.js > build/test.js
cat build/test.js lib/test/*.js > build/spot.js
