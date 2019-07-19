/* Function that takes a prosodic tree and returns a version annotated it with the phonological tones that it would have in Japanese or Lekeitio Basque.
Tones:
	A -> H*L
	left edge of phi -> LH on initial word. NB Here if there are multiple left-aligned phis, only one LH is annotated.
	H following H*L within a maximal phi -> !H (downstep)
Arguments:
	ptree = a prosodic tree
	parentCat = prosodic category of ptree's parent
	afterA = is there a preceding accent in this phi?
*/
function addJapaneseTones(ptree){
	
	function addJapaneseTonesInner(ptree, parentCat, afterA, firstInPhi){
		//Iota: No tonal diagnostics; just call recursively on the children
		if(ptree.cat==='i'){
			if(ptree.children && ptree.children.length){
				for(var child in ptree.children)
				{
					child = addJapaneseTonesInner(ptree.children[child], ptree.cat, false)[0];
				}
			}
		}
		//Phi: domain for downstep
		else if(ptree.cat==='phi'){
			//Non-maximal phi following a pitch-drop is assigned a downstepped LH
			if(parentCat === 'phi' && afterA && !firstInPhi){
				ptree.tones = 'L!H';
			}
			//Otherwise, LH is not downstepped
			else if(!firstInPhi){
				ptree.tones = 'LH';
			}
			
			if(ptree.children && ptree.children.length){			
				for(var child in ptree.children)
				{
					outputs = addJapaneseTonesInner(ptree.children[child], ptree.cat, afterA, child==0);
					child = outputs[0];
					afterA = outputs[1];
				}
			}
		}
		
		else if(ptree.cat === 'w'){
			//Unaccented w
			if(!ptree.accent){
				ptree.accent = ptree.id.split('_')[0];
			}
			if(ptree.accent === 'A' || ptree.accent === 'a'){
				ptree.tones = 'H*L';
				if(afterA)
					ptree.tones = '!H*L';
				afterA = true;
			}
			//Accented w
			else{
				ptree.tones = '-';
			}
			//this is only necessary if we have recursive prosodic words...
			// if(
			// outputs = addJapaneseTonesInner(child, ptree.cat, afterA);
			// child = outputs[0];
			// afterA = outputs[1];
		}
		
		else{
			console.log("Unrecognized prosodic category"+ptree.cat);
			ptree.tones = '-';
		}
		
		return [ptree, afterA];
	}
	
	return addJapaneseTonesInner(ptree)[0];
}