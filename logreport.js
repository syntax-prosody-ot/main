var logLines = [];
function logreport(line){
    logLines.push(['<span class="report-line segment-', lastSegmentId, (lastSegmentId >= nextSegmentToReveal) ? ' segment-hidden' : '', '">', line, '<br></span>'].join(''));
    flushLog();
}
logreport.debug = function() {
    if (logreport.debug.on)
        return logreport.call(this, Array.prototype.slice.call(arguments));
}
logreport.debug.on = false; //set this to true to get logging from match, equalsisters, binarity, makeTableau, and possibly others

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