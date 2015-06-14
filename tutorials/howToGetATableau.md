Tutorial: how to get a tableau in SPOT
======================================

Make your input syntactic tree
----------------------------------
SPOT needs trees to be written in a particular format in JavaScript. See the tree tutorial for details on how to do this. Example trees can be see in the trees folder.

Save your tree in a .js file, and put that file in the trees folder. For purposes of this tutorial, I'll call the input syntactic tree stree and assume it's saved in the file mytree.js.


Make your output prosodic candidates
------------------------------------
You can also manually define your prosodic trees, or you can use the GEN() function to have SPOT generate them for you.


Load your scripts into matchprototype.html
------------------------------------------
For the html file to see all the variables (like trees) and functions (like constraints) that we have defined, they must be loaded into the html file. To do load a script myscript.js into matchprototype.html:

1. Open matchprototype.html in your favorite html editor, and scroll way down, past all the css, until you get to a block of lines that say things like:

		<script src="constraints/match.js"></script>
		<script src="trees/match.js"></script>

	These are a little above

		<script>
			function runDemo(){
				...
			};
		</script>

2. Add a line for every file that you added. For example, if you want to refer to mytree.js, a file which you put in the trees folder, plus a constraint that you defined and saved in the file myNewConstraint.js in the constraints folder, you should add the following lines to the html file, right near the other script-loading lines:

		<script src="trees/mytree.js"></script>
		<script src="constraints/myNewConstraint.js"></script>
	
	The first line tells the html file to look in the trees folder for a file called mytree.js, and load the contents of that file as a JavaScript script. The second line tells it to look in the constraints folder for a file called myNewConstraint.js, and load its content as a JavaScript script.
	
3. Build a variable for your candidate set. Each candidate is a pair [syntactic_input, prosodic_output]. Therefore, the candidate set consists of an array of pairs (i.e., an array of arrays), so it will have the form [ [a, b], [a, c], [a, d], ...] where a is the syntactic input and b, c, d are the prosodic output candidates. (You can use multiple distinct syntactic inputs in one candidates set if you want, but this tutorial follows the more typical tableau-making convention and only considers a single input.) 

	To define the candidate set, you have two options:

	* Manually define the candidate set. Suppose you are only interested in evaluating four prosodic trees, and you've already written them up in the file mytree.js with the variable names ptree1, ptree2, ptree3, and ptree4. And suppose further that you're interested in the syntactic input stree, also in the file mytree.js. You can make these trees into a candidate set by putting them in an array, which we'll call myCandidateSet:
		
			var myCandidateSet1 = [[stree, ptree1], [stree, ptree2], [stree, ptree3], [stree, ptree4]];

	* Automatically generate the candidate set using the function GEN. Suppose you want to consider all posible phonological phrasings of the string of words "ideas sleep furiously".
	
			var myCandidateSet2 = GEN(stree, "ideas sleep furiously");
	
	This line creates an array of input-output pairs, where stree is the input and the 48 possible phonological phrasings of "ideas sleep furiously".
	
4. Build a variable for your constraint set. This will also be an array; let's call it myConstraintSet. Suppose the constraints you're interested in are Match-SP(XP, Phi), Match-PS(Phi, XP), and EqualSisters. You'll have to look at the .js files in the constraints folder to see the names of the SPOT functions for these constraints. Put these names into the array of constraints as strings (in ""). To specify a category, add it to the constraint name, separating it with a -:

		var myConstraintSet1 = ["matchSP-xp", "matchPS-phi", "equalSistersAdj-phi"];	
	
	Note that the left-to-right order in which you list the constraints is the left-to-right order in which they will appear in the tableau.

5. Inside the runDemo function, call makeTableau on your candidate set and constraint set, and call writeTableau to display the results. If you use the second candidate set discussed above, the code will look like this:

		var myCandidateSet2 = GEN(stree, "ideas sleep furiously");
		var myConstraintSet1 = ["matchSP-xp", "matchPS-phi", "equalSistersAdj-phi"];
		
		function runDemo()
		{
			writeTableau(makeTableau(myCandidateSet2, myConstraintSet1));
			revealNextSegment();
        	lastSegmentId++;
		}	
			
	If you want to write multiple tableaux to the screen, just include multiple calls to writeTableau(makeTableau(...)) with the various candidate- and constraint-sets you're interested in.
	
		var myCandidateSet1 = [[stree, ptree1], [stree, ptree2], [stree, ptree3], [stree, ptree4]];
		var myCandidateSet2 = GEN(stree, "ideas sleep furiously");
		var myConstraintSet1 = ["matchSP-xp", "matchPS-phi", "equalSistersAdj-phi"];
		
		function runDemo()
		{
			writeTableau(makeTableau(myCandidateSet1, myConstraintSet1));
			writeTableau(makeTableau(myCandidateSet2, myConstraintSet1));
			revealNextSegment();
        	lastSegmentId++;
		}
		
	The lines "revealNextSegment(); lastSegmentId++;" cause everything preceding them to be displayed. So if you want all the tableaux to show up at once, just include them once at the end of runDemo(). But if you'd like the tableaux to appear one at a time, then put "revealNextSegment(); lastSegmentId++;" after each tableau. Then you'll have to hit the space bar to get the subsequent tableau(x) to display.
	
6. Save the html file and open it in a browser!	Don't forget to hit the space bar if you set things up to display one tableau at a time.
