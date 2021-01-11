cat constraints/*.js > build/constraints.js
cat interface_JS/*.js > build/interface.js
cat build/constraints.js build/interface.js *.js > build/spot.js

