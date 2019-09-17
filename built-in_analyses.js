/* Built-in Analyses */

/* Function to check all of the boxes for a buil-in constaint set in the UI
 * takes an array of objects with the properties "name" and "cat"
 * "name" is the name of a constraint as it is called in SPOT (ie "alignLeft")
 * "cat" is the category which that constraint should be called on (ie "xp")
*/
function built_in_con(input){
  // fetch all of the constraints
  var all_SPOT_con = document.getElementsByName("constraints");
  var input_cats; //for fetching the constraints category inputs
  //finds checkboxes for the constraints given in input and sets checked="checked"
  for(var x = 0; x < input.length; x++){
    for(var y = 0; y < all_SPOT_con.length; y++){
      if(input[x].name === all_SPOT_con[y].value){
        all_SPOT_con[y].checked="checked";
      }
    }
    try{
      //fetch the category elements for the current constraint
      input_cats = document.getElementsByName("category-" + input[x].name);
      for(var z = 0; z < input_cats.length; z++){
        /* all of the constraints have a default category, but the built-in
         * might cal, for a different category. This code clears out the
         * default categories. If checked is set to "built_in", it will not be
         * cleared out because this code has already checked that box, meaning
         * the built-in calls the same constraint for two categories (eg.
         * alignLeft-xp and alignLeft-x0).
        */
        if(input_cats[z].checked && input_cats[z].checked !== "built_in"){
          input_cats[z].checked = false;
        }
        if(input_cats[z].value === input[x].cat){
          input_cats[z].checked = "built_in";
        }
      }
    }
    catch(err){
      console.error("Unable to find category options for " + input[x].name);
    }
  }

}

//Irish, as analysed in Elfner (2012), with some useful trees
function built_in_Irish(){
  built_in_con([{name: "matchSP", cat:"xp"}, {name: "strongStart_Elfner", cat: "phi"}, {name: "binMinBranches", cat: "phi"}, {name: "binMaxBranches", cat: "phi"}]);
  document.getElementById("mapping_constraints").attributes.class.value = "open";
  document.getElementById("binarity_constraints").attributes.class.value = "open";
  document.getElementById("horizantal_constraints").attributes.class.value = "open";
  document.getElementById("treeUI").style.display = "block";
  document.getElementById("stree-textarea").value = JSON.stringify(irish_trees);
  var toneButtons = document.getElementsByName("toneOptions");
  for(var x = 0; x < toneButtons.length; x++){
    if(toneButtons[x].value="addIrishTones_Elfner"){
      toneButtons[x].setAttribute("checked", true);
    }
    else{
      toneButtons[x].setAttribute("checked", false);
    }
  }
}
