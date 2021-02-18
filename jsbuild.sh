#basic build script for using the app
cat constraints/*.js > build/constraints.js #constraints.js is all the constraints
cat interface_JS/*.js > build/interface.js #interface.js is the code formerly in interface1.js
cat *.js > build/top.js #top.js is the code in the top level of the main directory
cat build/constraints.js build/interface.js build/top.js > build/spot.js #spot.js is everything put together

