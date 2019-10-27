/*defines brackets used in tableau for various categories*/
var categoryBrackets = {
	"i": "{}",
	"cp": "{}",
	"xp": "[]",
	"phi": "()",
	"x0": ["[x0 ","]"],
	"w": ["(w ", ")"],
	"clitic": ["",""],
	"syll": ["",""],
	"Ft": ["", ""],
	"u": ["{u ", "}"]
};

/* Function that takes a [default=prosodic] tree and returns a string version where phi boundaries are marked with '(' ')'
   Possible options:
   - invisibleCategories: by default, every category in categoryBrackets gets a bracket
   - parens: default mappings in categoryBrackets can be overwritten with a map
   - showNewCats: if true, annotate categories that aren't found in categoryBrackets with [cat ], where cat is the new category
   - showTones: set to true to display whatever tones are in the tree
	 (only useful if the tree has been annotated with tones, as by the function addJapaneseTones in annotate_tones.js)
*/
function parenthesizeTree(tree, options){
	var parTree = [];
	var toneTree = [];
	options = options || {};
	var showNewCats = options.showNewCats || false;
	var invisCats = options.invisibleCategories || [];
	var showTones = options.showTones || false;
	var parens = options.parens || Object.assign({}, categoryBrackets);

	if(options.showTones){
		tree = window[options.showTones](tree);
	}

	function processNode(node){
		var nonTerminal = (node.children instanceof Array) && node.children.length;
		if (showNewCats && !parens.hasOwnProperty(node.cat)){
			parens[node.cat] = ["["+node.cat+" ", "]"];
		}
		var visible = invisCats.indexOf(node.cat) === -1 && parens.hasOwnProperty(node.cat);
		if (nonTerminal) {
			if (visible) {
				parTree.push(parens[node.cat][0]);//pushes the right parens
				//parTree.push(parens[0]);
				if(showTones){
					toneTree.push(parens[node.cat][0]);
					if(node.tones){
						toneTree.push(node.tones);
						toneTree.push(' ');
						var toneStringLength = node.tones.length+1;
						parTree.push(' '.repeat(toneStringLength));
					}
				}
			}
			for(var i=0; i<node.children.length; i++){
				processNode(node.children[i]);
				if(i<node.children.length-1){
					parTree.push(' ');
					if(showTones){
						toneTree.push(' ');
					}
				}
			}
			if (visible){
				parTree.push(parens[node.cat][1]);
				//parTree.push(parens[1]);
				if(showTones){
					toneTree.push(parens[node.cat][1]);
					//console.log(parens[node.cat]);
					//console.log(toneTree[toneTree.length-1]);
				}
			}
		} else if (visible) {
			parTree.push(node.id);
			if(node.cat!='w' && node.cat!='x0'){
				parTree.push('.'+node.cat);
			}
			if(showTones && node.tones){
				toneTree.push(node.tones);
				var toneIdDiff = node.tones.length - node.id.length;
				if(toneIdDiff > 0)
					parTree.push(' '.repeat(toneIdDiff));
				if(toneIdDiff < 0)
					toneTree.push(' '.repeat(-toneIdDiff));
			}
			if(showTones && !node.tones){
				toneTree.push(' '.repeat(node.id.length))
			}
		}
		//	parTree.push(node.id.split('_')[0]);
	}

	processNode(tree);
	guiTree = parTree.join('');
	if(showTones)
		guiTree = guiTree + '\n' + toneTree.join('');
	return guiTree;
}

/* function to remove silent heads from a tree. Takes a (syntactic) tree as
 * the input. This is recursive, like everything else that parses trees in SPOT
 */
function trimSilentTerminals(inputTree){
	var tree = inputTree; //getting around pass by reference
	if(tree.children && tree.children.length){
		//iterate over tree's children
		for(var i = 0; i < tree.children.length; i++){
			var child = tree.children[i];
			if(child.silent && !(child.children && child.children.length)){
				tree.children.splice(i, 1); //remove child if it is silent and terminal
				if(tree.children.length === 0){
					tree.children = false; //children shouldn't really be an array any more
				}
			}
			else if(child.children && child.children.length){
				child = trimSilentTerminals(child); //recursive function call
			}
		}
	}
	return tree;
}

/* function to remove redundant nodes. A node is redundant iff it dominates all
 * and only the set of terminals that are dominated by one of its children of
 * the same category, eg. [[arbitrary terminals]]
 */
function trimRedundantNodes(inputTree){
	var tree = trimSilentTerminals(inputTree); //getting around pass by reference and trimming tree
	console.log(tree);
	console.log(tree.children && tree.children.length ? true : false);
	if(tree.children && tree.children.length){
		console.log("checking");
		for (var i = 0; i < tree.children.length; i++){
			var child = tree.children[i];
			if(child.children && child.children.length){
				child = trimRedundantNodes(child); //recursive function call
			}
			if (sameIds(tree, child)){
				//tree node is redundant, get rid of it
				tree = child;
			}
		}
	}
	return tree;
}
