/*defines brackets used in tableau for various categories*/
var categoryBrackets = {
	"i": "{}",
	"cp": "{}",
	"xp": "[]",
	"phi": "()",
	"x0": ["[x0 ","]"],
	"w": ["(w ", ")"],
	"clitic": ["",""],
	"syll": ["",""]
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
		}
		//	parTree.push(node.id.split('_')[0]);
	}

	processNode(tree);
	guiTree = parTree.join('');
	if(showTones)
		guiTree = guiTree + '\n' + toneTree.join('');
	return guiTree;
}
