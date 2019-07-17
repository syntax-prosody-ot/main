/*defines brackets used in tableau for various categories*/
var categoryBrackets = {
	"i": "{}",
	"cp": "{}",
	"xp": "[]",
	"phi": "()",
	"x0": ["[x0 ","]"],
	"w": ["(w ", ")"]
};

/* Function that takes a [default=prosodic] tree and returns a string version where phi boundaries are marked with '(' ')'
   Possible options:
   - invisibleCategories: by default, i does not receive a visualization
   - parens: default mappings in categoryBrackets can be overwritten with a map
   - showTones: set to true to display whatever tones are in the tree
	 (only useful if the tree has been annotated with tones, as by the function addJapaneseTones in annotate_tones.js)
*/
function parenthesizeTree(tree, options){
	var parTree = [];
	var toneTree = [];
	options = options || {};
	var invisCats = options.invisibleCategories || [];
	var showTones = options.showTones || false;
	var parens = options.parens || categoryBrackets;
	//categoryBrackets is defined in prosodicHierarchy.js

	function processNode(node){
		var nonTerminal = (node.children instanceof Array) && node.children.length;
		var visible = invisCats.indexOf(node.cat) === -1;
		if (nonTerminal) {
			if (visible) {
				parTree.push(parens[node.cat][0]);//pushes the right perens
				//parTree.push(parens[0]);
				if(showTones){
					toneTree.push(parens[0]);
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
				if(showTones)
					toneTree.push(parens[1]);
			}
		} else if (visible) {
			parTree.push(node.id);
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
