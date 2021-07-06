source jsbuild.sh
cat test/addHeadsToListTest.js test/message_funcs.js test/frontend_testing/*.js > build/test.js
cat build/test.js lib/test/*.js >> build/spot.js

cat interface1.html test/frontend_testing/frontend.html > test/frontend_testing/test.html
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i "" 's|src="|src="../../|g;s|" href="|" href="../../|g' test/frontend_testing/test.html
else
  sed -i 's|src="|src="../../|g;s|" href="|" href="../../|g' test/frontend_testing/test.html
fi