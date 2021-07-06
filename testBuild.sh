source jsbuild.sh #create constraints.js, top.js, and spot.js
cat test/*.js  test/frontend_testing/*.js > build/test.js
cat build/test.js lib/test/*.js >> build/spot.js