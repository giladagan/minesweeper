"use strict";

var timeBegan = null,
  timeStopped = null,
  stoppedDuration = 0,
  started = null;

/////////////////////////////////////////////////

// THE TIMER FUNCTION

function start() {
  // we initialize the time Began with new Date
  if (timeBegan === null) {
    timeBegan = new Date();
  }
  // if timeStopped is truthy , we take the stopped duration and add the new date and the we cut the timeStopped .
  if (timeStopped !== null) {
    stoppedDuration += new Date() - timeStopped;
  }

  // started stores  the ID of the interval, in order to stop the timer we have to clear 'started'
  started = setInterval(clockRunning, 10);
}

function reset() {
  clearInterval(started);
  stoppedDuration = 0;
  timeBegan = null;
  timeStopped = null;
  document.getElementById("display-area").innerHTML = "00:00";
}

function stop() {
  timeStopped = new Date();
  clearInterval(started);
}

function clockRunning() {
  var currentTime = new Date(),
    timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
    min = timeElapsed.getUTCMinutes(),
    sec = timeElapsed.getUTCSeconds();
  document.getElementById("display-area").innerHTML =
    (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
}
