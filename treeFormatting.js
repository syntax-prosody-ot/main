//takes a prosodic tree and returns a string version where phi boundaries are marked with '(' ')'
function parenthesizeTree(tree){
	var parTree = [];
	
	function processNode(node){
		if(node.cat==='phi' || node.cat === 'iota'){
			if (node.cat === 'phi')
				parTree.push('(');
			if(node.children instanceof Array){
				for(var i=0; i<node.children.length; i++){
					processNode(node.children[i]);
					if(i<node.children.length-1)
						parTree.push(' ');
				}
			}
			if (node.cat === 'phi')
				parTree.push(')');
		}
		else if(node.cat==='w')
			parTree.push(node.id);
		//	parTree.push(node.id.split('_')[0]);
	}
	
	processNode(tree);
	return parTree.join('');
}
