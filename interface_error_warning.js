/**
 * ERROR AND WARNING FUNCTIONS used on interface1.html
 */


// Function that closes error and warning messages in interface
function closeButton() {
	var close = document.getElementsByClassName("closebtn");
	var i;

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.opacity = "0";
			setTimeout(function() {
				div.style.display = "none";
			}, 600);
		}
	}
}

//Display a red Error! box at the top of the page
function displayError(errorMsg, error) {
	if(error !== undefined) {
		console.error(error);
	}
	else {
		console.error("Error: " + errorMsg);
	}

	var spotForm = document.getElementById('spotForm');
	if (!spotForm) {
		alert("Error: " + errorMsg);
		return;
	}

	var div = document.getElementById("error");
	div.children[2].innerHTML = errorMsg;
	div.style.display = "block";
	div.style.opacity = "100";
	closeButton();
}

// Display orange Warning! box at the top of the page
function displayWarning(warnMsg) {
	console.warn("Warning: " + warnMsg);

	var spotForm = document.getElementById('spotForm');
	if (!spotForm) {
		alert("Warning: " + warnMsg);
		return;
	}

	var div = document.getElementById("warning");
	div.children[2].innerHTML = warnMsg;
	div.style.display = "block";
	div.style.opacity = "100";
	closeButton();
}