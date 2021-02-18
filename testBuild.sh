source jsbuild.sh
cat test/*.js lib/test/*.js > build/test.js
cat build/test.js >> build/spot.js

cp build/spot.js test/test.js