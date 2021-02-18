source jsbuild.sh
cat test/*.js > build/test.js
cat build/test.js lib/test/*.js >> build/spot.js