source jsbuild.sh
cat interface1.html test/frontend_testing/frontend.html > test/frontend_testing/test.html
sed -i "" 's|build/spot.js|../../build/spot.js|g' test/frontend_testing/test.html
sed -i "" 's|build/built_in_trees.js|../../build/built_in_trees.js|g' test/frontend_testing/test.html
sed -i "" 's|lib/test/mocha.min.js|../../lib/test/mocha.min.js|g' test/frontend_testing/test.html
sed -i "" 's|lib/test/chai.min.js|../../lib/test/chai.min.js|g' test/frontend_testing/test.html
sed -i "" 's|spot.css|../../spot.css|g' test/frontend_testing/test.html
sed -i "" 's|lib/test/mocha.css|../../lib/test/mocha.css|g' test/frontend_testing/test.html
sed -i "" 's|images/favicon.ico|../../images/favicon.ico|g' test/frontend_testing/test.html
sed -i "" 's|images/logo.png|../../images/logo.png|g' test/frontend_testing/test.html