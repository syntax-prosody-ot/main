source jsbuild.sh
cat individualTests/*.js > build/test.js
cat build/test.js lib/test/*.js >> build/spot.js