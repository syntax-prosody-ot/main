source testBuild.sh
cat interface1.html test/frontend_testing/frontend.html > test/frontend_testing/test.html
sed -i "" 's|src="|src="../../|g;s|" href="|" href="../../|g' test/frontend_testing/test.html