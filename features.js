"use strict";

var currentLife;
var hintCount;
var hintActive;

function life() {
  var lives = document.querySelector(".lives");
  currentLife--;
  switch (currentLife) {
    case 2:
      lives.innerText = "💗💗";
      break;
    case 1:
      lives.innerText = "💗";
      break;
    case 0:
      lives.innerText = "";
      gameOver();
      break;
    default:
      break;
  }
}

function expandShown(board, row, col) {
  if (board[row][col].minesAroundCount > 0) {
    // if the cell that i clicked on have a value higher then 0, return...
    return;
  }
  board[row][col].isShown = true;
  for (var i = row - 1; i <= row + 1; i++) {
    for (var j = col - 1; j <= col + 1; j++) {
      if (row === i && col === j) continue;
      if (i < 0 || i >= board[0].length || j < 0 || j >= board.length) {
        continue;
      }
      if (
        board[i][j].minesAroundCount === EMPTY &&
        board[i][j].isShown === false
      ) {
        expandShown(board, i, j);
      }
      {
        board[i][j].isShown = true;
        var elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.style.backgroundColor = "#AF8C9D";
        renderCell({ i: i, j: j }, board[i][j].minesAroundCount);
      }
    }
  }
}

function hintTimes() {
  var hintTimes = document.querySelector(".hint");
  console.log(hintTimes);
  hintCount--;

  switch (hintCount) {
    case 2:
      hintTimes.innerText = "💡💡";
      hint();
      hintActive = true;
      document.querySelector(".helperMessage").innerText =
        "cell and its neighbors are revealed for a second and the clicked hint disappears!";
      setTimeout(function () {
        document.querySelector(".helperMessage").innerText = "";
      }, 5500);

      break;
    case 1:
      hintTimes.innerText = "💡";
      hint();
      hintActive = true;
      break;
    case 0:
      hintTimes.innerText = "";
      hint();
      hintActive = true;
      break;
    default:
      break;
  }
}

function hint(board, rowIdx, colIdx, elCell) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      var elCell = document.querySelector(`.cell-${i}-${j}`);
      elCell.style.backgroundColor = "#c5c981";
      renderCell(
        { i: i, j: j },
        board[i][j].isMine ? MINE : board[i][j].minesAroundCount
      );
      setTimeout(hideElement, 2000, i, j, elCell, board);
    }
  }

  function hideElement(i, j, elCell, board) {
    elCell.style.backgroundColor = "#999999";
    renderCell({ i: i, j: j }, EMPTY);
  }
}
