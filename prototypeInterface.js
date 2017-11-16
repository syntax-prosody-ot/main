
var lastSegmentId = 0, nextSegmentToReveal = 0;


var logLines = [];
function logreport(line){
    logLines.push(['<span class="report-line segment-', lastSegmentId, (lastSegmentId >= nextSegmentToReveal) ? ' segment-hidden' : '', '">', line, '<br></span>'].join(''));
    flushLog();
}
logreport.debug = function() {
    if (logreport.debug.on)
        return logreport.call(this, Array.prototype.slice.call(arguments));
}
logreport.debug.on = true;

var resultsContainer;
function flushLog() {
    if (resultsContainer) {
        var fragment = document.createElement('div');
        fragment.innerHTML = logLines.join('');
        resultsContainer.appendChild(fragment);
        logLines = [];
    } else {
        console.error('Tried to flush log before window loaded.');
    }
}

function writeTableau(tableauContent) {
    if (resultsContainer) {
        var tableauContainer = document.createElement('div');

        tableauContainer.innerHTML =  '<h2 style="margin-bottom: 5px">Tableau</h2>';	

        var textareaNote = document.createElement('strong');
        textareaNote.innerHTML = 'For copying and pasting into OTWorkplace: ';
        tableauContainer.appendChild(textareaNote);

        var textarea = document.createElement('textarea');
        textarea.className = 'tableau-textarea';
        textarea.value = tableauToCsv(tableauContent, '\t');
        textarea.readOnly = true;
        tableauContainer.appendChild(textarea);
		tableauContainer.appendChild(document.createElement('p'));
        tableauContainer.className += ' segment-' + lastSegmentId;
        if (lastSegmentId >= nextSegmentToReveal)
            tableauContainer.className += ' segment-hidden';
        onRevealSegment[lastSegmentId] = function() {
            textarea.focus();
            textarea.select();
        }

        var htmlTableauContainer = document.createElement('div');
        htmlTableauContainer.innerHTML = tableauToHtml(tableauContent);
        tableauContainer.appendChild(htmlTableauContainer);	

        resultsContainer.appendChild(tableauContainer);

    } else {
        console.error('Tried to write tableau before window loaded.');
    }
}

window.addEventListener('load', function(){
    resultsContainer = document.getElementById('results-container');
    if(typeof runDemo === 'function')
        runDemo();
});


var onRevealSegment = {};

function revealNextSegment() {
    if (nextSegmentToReveal > lastSegmentId)
        return;
    var elements = document.getElementsByClassName('segment-' + nextSegmentToReveal);
    for (var i = 0; i < elements.length; i++)
        elements[i].className = elements[i].className.replace('segment-hidden', '');

    if (onRevealSegment[nextSegmentToReveal])
        onRevealSegment[nextSegmentToReveal]();

    // window.scrollTo(0, document.body.scrollHeight); //TODO: scroll to top of last segment, not bottom

    nextSegmentToReveal++;
}

document.addEventListener('keyup', function(event) {
    if (event.keyCode === 32)
        revealNextSegment();
});


//Given a string that is the name of a (global) object, returns the object itself.
//Given an object, returns that object.
function globalNameOrDirect(nameOrObject) {
    return (typeof nameOrObject === 'string') ? window[nameOrObject] : nameOrObject;
}

function runConstraint(constraint, sname, pname, cat, expectedViolations) {
    var pTree = globalNameOrDirect(pname);
    logreport(['<span class="main-report-line">Running ', constraint, '(', (cat || ''), ') on (', sname, ', ', parenthesizeTree(pTree), ')', (expectedViolations == null) ? '' : [' - Expected Violations: <span class="expected-violation-count">', expectedViolations, '</span>'].join(''), '</span>'].join(''));
    var violationCount = globalNameOrDirect(constraint)(globalNameOrDirect(sname), pTree, cat);
    logreport(['<span class="main-report-line" style="background-color: white">Actual Violations: <span class="actual-violation-count">', violationCount, '</span></span><br/><br/>'].join(''));
    return violationCount;
}
