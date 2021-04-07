SPOT
====

SPOT (Syntax-Prosody in Optimality Theory) is a JavaScript-based application for linguists who are studying the syntax-prosody interface in the theoretical framework of Optimality Theory (Prince and Smolensky 1993). The goal of SPOT is to do for work on the syntax-prosody interface what OTWorkplace already does for metrical phonology -- to enable rigorous theoretical work, particularly typological investigations, theory comparison (e.g., Match vs Align), and refinements to the precise formulation of constraints. 

See https://spot.sites.ucsc.edu/ for news and updates.

Please contact the Jenny Bellik or Nick Kalivoda (UC Santa Cruz) if you would like to see a new constraint or feature added to SPOT, or for assistance in developing an analysis in SPOT.

Features
--------
* online access at <https://people.ucsc.edu/~jbellik/spot/interface1.html>
* automatic violation counting: for all constraints in the SPOT system
* automatic candidate generation: exhaustive generation of all prosodic or syntactic trees with a given set of terminals
* graphical user interface for building a JavaScript representation of the syntactic input tree(s)
* easy interface with OTWorkplace and other OT software: SPOT outputs .csv files that can be pasted into OTWorkplace, so as to take advantage of the typology, optima finding, and constraint ranking tools available there.

All the code for SPOT is available on Github: https://github.com/syntax-prosody-ot/main

How to install locally
----------------------
* Download the codebase using the green *Code* button at the top right corner of the page. 
* Unzip the file.
* Build: You can build locally by running the appropriate build script (main/jsbuild.sh in Unix systems, or main/jsbuild.bat). Or you can download precompiled build files from the build repository https://github.com/syntax-prosody-ot/SPOT_build and put them in main/build.
* Open main/interface1.html in Chrome or Firefox (Most other browsers, such as Safari, are okay, too, but Internet Explorer will not work.) to use the web interface locally.
* Or write your own analysis file, starting from the template for custom analyses located in main/SPOT_custom_analysis_template.html.


How to cite
-----------
Bellik, Jennifer, Ozan Bellik, Nick Kalivoda (2015-2021). Syntax-Prosody for OT. JavaScript application. <https://spot.sites.ucsc.edu/>




Below is some information for anyone interested in writing their own constraints:

Categories and the prosodic hierarchy
-------------------------------------
Prosodic and syntactic categories that our constraints recognize are defined in the array named categoryPairings (in the file prosodicHierarchy.js). For a node to be recognized by Match and other constraints that establish correspondence, the node's value for "cat" must be one of the categories listed in categoryPairings. 

Constraints
-----------
All constraint files are in the folder constraints. Each constraint is a function. Uniform argument structure must be maintained across all constraints so that makeTableau will work. The necessary argument structure is: (s, p, c), where

* s is the syntactic tree
* p is the prosodic tree
* c is the category the constraint targets

Though the argument structure is fixed, the names of the argments can vary from constraint to constraint, and it's not a problem if not all arguments are actually used in the function.

Every constraint is going to be a recursive function, since it needs to traverse the whole tree (possibly two trees, for interface constraints). 
