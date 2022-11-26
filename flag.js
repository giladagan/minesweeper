"use strict";

function removeFlag(elCell, i, j) {
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  gGame.markedCount--;
  gBoard[i][j].isMarked = false;
  elCell.innerText = EMPTY;
}

function addFlag(event, elCell, i, j) {
  event.preventDefault();
  if (gBoard[i][j].isShown) {
    // if the cell is already open, return...
    return;
  }
  start(); // not restarting every time because the only things that stops the timer is the restart() function..
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  if (gBoard[i][j].isMarked) {
    return removeFlag(elCell, i, j); // if the cell is marked and we click again on the right click , it will remove the flag and set isMarked = false
  }

  console.log(minesFound);

  // on right click add the flag and set isMarked to true.
  gBoard[i][j].isMarked = true;
  gGame.markedCount++;

  var strText = "";
  strText += `📍`;
  elCell.innerText = strText;
  victory();
}
