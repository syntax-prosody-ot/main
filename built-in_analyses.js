/* Built-in Analyses */

//Template for built in analyses
function my_built_in_analysis(){
  //Set up a built-in analysis in just a few easy steps
  /* Step 1: copy and rename this function, create a button that calls your
   * function in interface1.html
   */
  //Step 2: Define the constraint set. Use the following as an example
  built_in_con([{name: "matchSP", cat:"xp"}, {name: "strongStart_Elfner", cat: "w"}, {name: "binMinBranches", cat: "phi"}, {name: "binMaxBranches", cat: "phi"}]);
  //shows the tree UI
  document.getElementById("treeUI").style.display = "block";
  //Step 3: replace "myTreeHere" with your syntax tree(s). See also built-in_trees.js
  document.getElementById("stree-textarea").value = JSON.stringify(myTreeHere);
  // Step 4: (optional) If you want to annotate your tableaux with tones,
  //uncomment this block:
  /*
  var toneCheckbox = document.getElementById("annotatedWithTones");
  toneCheckbox.checked = true;
  console.log(toneCheckbox.checked);
  var toneButtons = toneCheckbox.parentNode.parentNode.getElementsByTagName("input");
  for(var x = 0; x < toneButtons.length; x++){
    toneButtons[x].parentNode.setAttribute("style", "display: table-cell");
    if(toneButtons[x].value==="addIrishTones_Elfner"){
      toneButtons[x].checked =  "checked";
    }
    else if (toneButtons[x] !== toneCheckbox){
      //we don't want multiple radio buttons to be checked, it gets confusing
      //this isn't doing what it is supposed to, I don't know why -Max 10/10/19
      toneButtons[x].checked = false;
      //toneButtons[x].removeAttribute("checked");
    }
  */
}

//Irish, as analysed in Elfner (2012), with some useful trees
function built_in_Irish(){
  //constraint set for built-in analysis
  built_in_con([{name: "matchSP", cat:"xp"}, {name: "strongStart_Elfner", cat: "w"}, {name: "binMinBranches", cat: "phi"}, {name: "binMaxBranches", cat: "phi"}]);
  //show the tree UI
  document.getElementById("treeUI").style.display = "block";
  //insert specified input to tree UI
  document.getElementById("stree-textarea").value = JSON.stringify(irish_trees);
  //exhaustivity options
  var exhaustivityBox = document.getElementById("exhaustivityBox");
  exhaustivityBox.checked = "checked";
  var exhaustivityDetail = exhaustivityBox.parentNode.parentNode.getElementsByTagName("td");
  for (var x = 0; x < exhaustivityDetail.length; x++){
    exhaustivityDetail[x].setAttribute("style", "display: table-cell");
  }

  //document.getElementById("exhaustivityDetailRow").style.display = "block";
  //some stuff for tones
  var toneCheckbox = document.getElementById("annotatedWithTones");
  toneCheckbox.checked = true;
  console.log(toneCheckbox.checked);
  var toneButtons = toneCheckbox.parentNode.parentNode.getElementsByTagName("input");
  for(var x = 0; x < toneButtons.length; x++){
    toneButtons[x].parentNode.setAttribute("style", "display: table-cell");
    if(toneButtons[x].value==="addIrishTones_Elfner"){
      toneButtons[x].checked =  "checked";
    }
    else if (toneButtons[x] !== toneCheckbox){
      //we don't want multiple radio buttons to be checked, it gets confusing
      //this isn't doing what it is supposed to, I don't know why -Max 10/10/19
      toneButtons[x].checked = false;
      //toneButtons[x].removeAttribute("checked");
    }
  }
}

/* Function to check all of the boxes for a buil-in constaint set in the UI
 * takes an array of objects with the properties "name" and "cat"
 * "name" is the name of a constraint as it is called in SPOT (ie "alignLeft")
 * "cat" is the category which that constraint should be called on (ie "xp")
*/
function built_in_con(input){
  //all of the fieldsets, which contain the constraint inputs
  var conFields = document.getElementsByTagName("fieldset");
  //for the constraint table rows which hide the category options
  var con_trs;
  //for the constraint and category checkboxes
  var con_boxes;

  //iterate over the inputs
  for(var i = 0; i < input.length; i++){
    //iterate over the fieldsets
    for(var x = 0; x < conFields.length; x++){
      //get all of the table rows in this fieldset
      con_trs = conFields[x].getElementsByTagName("tr");
      //iterate over the table rows in this fieldset
      for(var y = 0; y < con_trs.length; y++){
        //get checkboxes in this table row
        con_boxes = con_trs[y].getElementsByTagName("input");
        //check if constraint is in the current slot if the input
        //assumes that constraint is the first checkbox
        if(con_boxes[0].value === input[i].name){
          //select the constraint
          con_boxes[0].checked =  "checked";
          //open the fieldset
          conFields[x].setAttribute("class", "open")
          //reveal the categories
          con_trs[y].setAttribute("class", "constraint-checked")
          //iterate over the check boxes for cateogories
          //assumes that the constraint is the first check box
          for(var z = 1; z < con_boxes.length; z++){
            // select the category if the input calls for it
            if(con_boxes[z].value === input[i].cat){
              // see below comment re "checked" == "built_in"
              con_boxes[z].checked =  "built_in";
            }
            // deselect category unless already selected by built-in system
            else if(con_boxes[z].checked !== "built_in"){
              con_boxes[z].checked = false;;
              /* re "checked" == "built_in"
               * categories that have already been selected (eg. default
               * category for constraint) should be deselected, unless that
               * category has already been selected by the built-in system (ie.
               * both matchSP-xp and matchSP-x0 are desired). By setting
               * "checked" to "built_in", we can keep track of when this happens
               */
            }
          }
        }
      }
    }
  }
}
