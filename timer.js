"use strict";

const elTime = document.querySelector(".stopwatch .timer");

let seconds = 0;
let interval = null;

// Update the timer
function timer() {
  seconds++;

  // Format our time
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds - hrs * 3600) / 60);
  let secs = seconds % 60;

  if (secs < 10) secs = "0" + secs;
  if (mins < 10) mins = "0" + mins;

  elTime.innerText = `${mins}:${secs}`;
}

function start() {
  if (interval) {
    return;
  }

  interval = setInterval(timer, 1000);
}

function stop() {
  clearInterval(interval);
  interval = null;
}

function reset() {
  stop();
  seconds = 0;
  elTime.innerText = "00:00";
}
