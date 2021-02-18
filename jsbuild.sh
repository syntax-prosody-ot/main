cat constraints/*.js > build/constraints.js
cat interface_JS/*.js > build/interface.js
cat *.js > build/top.js
cat build/constraints.js build/interface.js build/top.js > build/spot.js

