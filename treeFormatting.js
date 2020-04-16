/*defines brackets used in tableau for various categories*/
var categoryBrackets = {
	"i": "{}",
	"cp": "{}",
	"xp": "[]",
	"phi": "()",
	"x0": ["[","]"],
	"w": ["[", "]"],
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
   - showTones: set to addJapaneseTones, addIrishTones_Elfner, etc. to annotate the tree with appropriate tones and show them in its parenthesization
	 - showHeads: if true, mark heads with an astrisk
*/
function parenthesizeTree(tree, options){
	var parTree = [];
	var toneTree = [];
	options = options || {};
	var showNewCats = options.showNewCats || true;
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
				var tempLabel = parens[node.cat][0];
				if (node["func"]){
					tempLabel += ".f";
				}
				if (node["silentHead"]){
					tempLabel += ".sh";
				}
				if (node["foc"]){
					tempLabel += ".foc";
				}
				if (node["func"] || node["silentHead"] || node["foc"]){
					tempLabel += " ";
				}
				parTree.push(tempLabel);
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
				if(node.head && options.showHeads){
					parTree.push('*'); //marks head with a *
				}
				//parTree.push(parens[1]);
				if(showTones){
					toneTree.push(parens[node.cat][1]);
					//console.log(parens[node.cat]);
					//console.log(toneTree[toneTree.length-1]);
				}
			}
		}
		//terminal but visible
		else if (visible) {
			var tempLabel = node.id;
			if (node["func"]){
				tempLabel += ".f";
			}
			if (node["silentHead"]){
				tempLabel += ".sh";
			}
			if (node["foc"]){
				tempLabel += ".foc";
			}
			parTree.push(tempLabel);
			//parTree.push(node.id);
			if(node.cat!='w' && node.cat!='x0'){
				parTree.push('.'+node.cat);
			}
			if(node.head && options.showHeads){
				parTree.push("*");
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
