/** 
 * Functions for handling sending the user's inputs on interface1.html to makeTableau() and for downloading it.
 */

//downloads an element to the user's computer. Originally defined up by saveTextAs()
function saveAs(blob, name) {
	var a = document.createElement("a");
	a.display = "none";
	a.href = URL.createObjectURL(blob);
	a.download = name;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}