call testBuild.bat
type interface1.html test\frontend_testing\frontend.html 1> test\frontend_testing\test.html 2>NUL

Rem This script doesn't quite work, because it does not do the find-and-replace to fix the relative paths to account for the frontend testing html file being in a different directory.
