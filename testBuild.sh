source jsbuild.sh
cat test/*.js lib/test/*.js > build/test.js
cat build/test.js >> build/spot.js
