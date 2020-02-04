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
   - showTones: set to addJapaneseTones, addIrishTones_Elfner, etc. to annotate the tree with appropriate tones and show them in its parenthesization
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
		console.log(node);
		var nonTerminal = (node.children instanceof Array) && node.children.length;
		console.log(nonTerminal);

		if (showNewCats && !parens.hasOwnProperty(node.cat)){
			//console.log(parens);
			parens[node.cat] = ["["+node.cat+" ", "]"];
		}
		// for (item in node){
		// 	if (item == "id" || item == "cat" || item == "children"){
		// 		continue;
		// 	}
		// 	if (node[item]){
		// 		if (toneTree.length == 0){
		// 			toneTree.push(item);
		// 		}
		// 		else{
		// 			toneTree[0] += '.' + item;
		// 		}
		// 	}
		// 	// console.log(item);
		// 	// console.log(node[item]);
		// }
		var visible = invisCats.indexOf(node.cat) === -1 && parens.hasOwnProperty(node.cat);
		console.log(visible);
		// if (nonTerminal) {
		// 	//console.log(parTree);
		// 	if (visible) {
		// 		console.log(showTones);
		// 		if(showTones){
		// 			// console.log("passed");
		// 			// console.log(node["func"]);
		// 			// console.log("node");
		// 			//console.log(node);
		// 			if (node["func"] && node["silentHead"]){
		// 				console.log("both");
		// 				parTree.push(parens[node.cat][0] + " f.sh");
		// 			}
		// 			else if (node["func"]){
		// 				console.log("func");
		// 				parTree.push(parens[node.cat][0] + " f");
		// 			}
		// 			else if (node["silentHead"]){
		// 				console.log("sh");
		// 				parTree.push(parens[node.cat][0] + " sh");
		// 			}
		// 			else{
		// 				console.log("none");
		// 				parTree.push(parens[node.cat][0]);//pushes the right parens
		// 			}
				
					
		// 		}
		// 		else{
		// 			if (node["func"] && node["silentHead"]){
		// 				console.log("both");
		// 				parTree.push(parens[node.cat][0] + " f.sh");
		// 			}
		// 			else if (node["func"]){
		// 				console.log("func");
		// 				parTree.push(parens[node.cat][0] + " f");
		// 			}
		// 			else if (node["silentHead"]){
		// 				console.log("sh");
		// 				parTree.push(parens[node.cat][0] + " sh");
		// 			}
		// 			else{
		// 				console.log("none");
		// 				parTree.push(parens[node.cat][0]);//pushes the right parens
		// 			}
		// 		}
		if (nonTerminal) {
			if (visible) {
				if (node["func"] && node["silentHead"]){
					console.log("both");
					parTree.push(parens[node.cat][0] + "f.sh ");
				}
				else if (node["func"]){
					console.log("func");
					parTree.push(parens[node.cat][0] + "f ");
				}
				else if (node["silentHead"]){
					console.log("sh");
					parTree.push(parens[node.cat][0] + "sh ");
				}
				else{
					parTree.push(parens[node.cat][0]);
				}//pushes the right parens}
				
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
		}
		//terminal but visible 
		else if (visible) {
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
	//console.log(tree);
	processNode(tree);
	//console.log(tree);
	//console.log(parTree);
	// console.log(toneTree);
	guiTree = parTree.join('');
	if(showTones)
		guiTree = guiTree + '\n' + toneTree.join('');
	return guiTree;
}
