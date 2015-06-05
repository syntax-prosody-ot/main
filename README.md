SPOT
====

SPOT (Syntax-Prosody in Optimality Theory) is a JavaScript-based application for linguists who are studying the syntax-prosody interface in the theoretical framework of Optimality Theory (Prince and Smolensky 1993). The goal of SPOT is to do for work on the syntax-prosody interface what OTWorkplace already does for metrical phonology -- to enable rigorous theoretical work, particularly typological investigations and theory comparison. 

Features
--------
* automatic violation counting: for all constraints in the SPOT system
* automatic candidate generation: exhaustive generation of all prosodic trees with a given number of terminals
* easy interface with OTWorkplace: SPOT outputs .csv files that can be pasted into OTWorkplace, so as to take advantage of the typology, optima finding, and constraint ranking tools available there.

All the code for SPOT is available on Github: https://github.com/syntax-prosody-ot/main

How to cite
-----------
Bellik, J., O. Bellik, N. Kalivoda (2015). Syntax-Prosody for OT. JavaScript application. <https://github.com/syntax-prosody-ot>


FAQs
----
[coming soon]


Installing
----------
If you already have a web-browser that lets you view most websites without any problems, you almost certainly already have JavaScript and don't need to install anything in order to use SPOT. Just download all the files in https://github.com/syntax-prosody-ot/main. To use SPOT, open the html file with the browser of your choice (Chrome, Mozilla Firefox, Safari, etc -- may not work in older versions of Internet Explorer).


Interface
----------
The current interface consists of html output to the browser, based on calls to the function writeTableau(makeTableau([candidate set], [constraint set])) in runDemo. 

For example:

	var candidateSet = [['sTreeCoord','pTreeA'], ['sTreeCoord','pTreeB'], ['sTreeCoord','pTreeC']];
	var constraintSet = ['equalSistersAdj','matchSP-clause', 'matchPS-i'];
	writeTableau(makeTableau(candidateSet, constraintSet));

has the constraint set: equalSistersAdj, matchSP(clause), matchPS(i)
and the candidate set: [['sTreeCoord','pTreeA'], ['sTreeCoord','pTreeB'], ['sTreeCoord','pTreeC']]
The functions writeTableau and makeTableau are defined in tableauMaker.js.

Note that candidates consist of pairs of trees, the first being the input syntactic tree (such as sTreeCoord in the first candidate) and the second being the output candidate prosodic tree (pTreeA in the first candidate). Therefore the array of candidates is an array of pairs, that is, an array of arrays. Each array is deliminated with [].

The output to the browser comes in three forms, in the following order:

* output from each cell of the tableau (row by row, left to right), consisting of the following:
	* the constraint and the candidate it was called on, plus the number of expected violations if you enter this number (useful for testing purposes)
	* processing info. from the constraint, expressing the function's progress through the trees and where violations are found.
	* the output: number of violations actually found
* a visual representation of the tableau in traditional OT format (but without any selection of optima)
* a tab-separated .csv file which can be copied and pasted into OTWorkplace

In order to run your desired candidate set and constraint set, you'll need to make sure that both the trees you're interested in and the constraints you want to use are in JavaScript (.js) files. If you created new .js files for any of your trees or constraints, be sure to put those files in the same directory as the other SPOT files, and load your scripts into the .html file:

<script src="yourScriptNameHere.js"></script>

Then go into the function runDemo() in the .html file, and add these lines for your candidate set and constraint set:

	writeTableau(makeTableau([yourInputOutputCandidatesHere], [yourConstraintsHere]]))
	lastSegmentId++;
	logreport('<br><hr>');
	
If you're using a large number of constraints or candidates, it's a good idea to define variables for them outside the runDemo() function (e.g., right above the line function runDemo()). Then you can succinctly refer to your candidate set and constraint set in your call to makeTableau.

	var myCandidates = [[syntree1, prostree1], [syntree1, prostree2], [syntree2, prostree1]];
	var myConstraints = ["matchPS-phi", "matchSP-xp", "binMinBranches", "equalSistesAdj"];

Trees
-----
Trees can be entered in the trees.js file. Or you can create an additional .js file and load it into the .html file using script tags. Put your trees in the trees folder.

For example: 

	<script src="trees/trees.js"></script> 

loads the trees.js file. 

	<script src="trees/myTrees.js"></script>
	
will load the file myTrees.js (which you could create). Make sure to put this in the same folder as the matchprototype.html file so it's accessible.

Sample trees can be seen in the trees.js file. The boundaries of each node are represented with {}. 

Every non-terminal node must have the attributes 
* "id": a string of your choice representing the syntactic or prosodic label of the node (for ease of reference). Avoid giving multiple nodes in your tree the same id because SPOT currently assumes ids are unique but doesn't sanitize the input to ensure uniqueness.
* "cat": a string representing the syntactic or prosodic category of the node. See Categories and the prosodic hierarchy. 
* "children": an array [] of child nodes, ordered left to right. Each node is an object and so should be contained in {}, and have the attributes id, cat and children (if non-terminal).

Terminal nodes need only have "id" defined, but it's a good idea to also define their categories (cat) since error handling for lack of category definition is not entirely reliable at present.

NOTE: Match constraints require an exact match in the terminals dominated by corresponding nodes; therefore silent syntactic terminals that do not have phonological exponents need to have an extra attribute silent: true.

Categories and the prosodic hierarchy
-------------------------------------
Prosodic and syntactic categories that our constraints recognize are defined in the array named categoryPairings (in the file prosodicHierarchy.js). For a node to be recognized by Match and other constraints that establish correspondence, the node's value for "cat" must be one of the categories listed in categoryPairings. 

However, as far as the purely prosodic constraints are concerned, nodes can have any category.

Constraints
-----------
All constraint files are in the folder constraints. Each constraint is a function. Uniform argument structure must be maintained across all constraints so that makeTableau will work. The necessary argument structure is: (s, p, c), where

* s is the syntactic tree
* p is the prosodic tree
* c is the category the constraint targets

Though the argument structure is fixed, the names of the argments can vary from constraint to constraint, and it's not a problem if not all arguments are actually used in the function.

Every constraint is going to be a recursive function, since it needs to traverse the whole tree (possibly two trees, for interface constraints). 


Trouble-shooting
----------------
If things aren't working as expected, the first step is to check the JavaScript console and see if the program has crashed somewhere. Go into your browser's menu and display the JavaScript console. It may be under Tools, View > Developer Tools, ...

