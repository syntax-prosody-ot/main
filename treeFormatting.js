//takes a [defualt=prosodic] tree and returns a string version where phi boundaries are marked with '(' ')'
function parenthesizeTree(tree, options){
	var parTree = [];
	options = options || {};
	var invisCats = options.invisibleCategories || ['i'];
	var parens = options.parens || '()';
	
	function processNode(node){
		var nonTerminal = (node.children instanceof Array) && node.children.length;
		var visible = invisCats.indexOf(node.cat) === -1;
		if (nonTerminal) {
			if (visible)
				parTree.push(parens[0]);
			for(var i=0; i<node.children.length; i++){
				processNode(node.children[i]);
				if(i<node.children.length-1)
					parTree.push(' ');
			}
			if (visible)
				parTree.push(parens[1]);
		} else if (visible) {
			parTree.push(node.id);
		}
		//	parTree.push(node.id.split('_')[0]);
	}
	
	processNode(tree);
	return parTree.join('');
}
