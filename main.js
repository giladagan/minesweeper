"use strict";

const EMPTY = " ";
const MINE = "💣";

var gVictoryPoints = 0;
var gBoard;
var gLevel;
var gGame;
var gMines = [];

function initGame() {
  startGame();
  gBoard = buildBoard();
  gMines = resetMines();
  randLocateMines(gBoard);
  renderBoard(gBoard, ".board-container");
}

function startGame() {
  gLevel = {
    SIZE: 4,
    MINES: 2,
  };
  gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
  };
}

function buildBoard() {
  var size = gLevel.SIZE;
  const board = [];
  for (var i = 0; i < size; i++) {
    board[i] = [];
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  return board;
}

function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];

      // negs loop in order to print the negs count
      cell.minesAroundCount = setMinesNegsCount(gBoard, i, j);

      // if the cell property isShown is true, display the cell, else display EMPTY!
      var cellDispaly = cell.isShown ? cell : EMPTY;
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td oncontextmenu="addFlag(this, ${i}, ${j})" onClick="cellClicked(this, ${i}, ${j})" class="${className}">${cellDispaly}</td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";

  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function gameOver() {
  // stops the timer, end the game.
  gGame.isOn = false;
  alert("game over!");
  stop();
}

function victory(gBoard) {
  gGame.isOn = false;
  console.log(gVictoryPoints);
  alert("VICTORY!");
  stop();
}

function cellClicked(elCell, i, j) {
  if (gBoard[i][j].isMarked) {
    // if the is marked , return...  dont change the cell.
    return;
  }
  start();
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  gBoard[i][j].isShown = true;
  gGame.shownCount++;
  elCell.innerHTML = gBoard[i][j].isMine ? MINE : gBoard[i][j].minesAroundCount; // if isMine is true , the print gonna be the MINE , if isMine false print gonna be the minescount

  if (gBoard[i][j].isMine) {
    //  if the cell contains the mine, give that cell a background color of red and finish the game.
    elCell.style.backgroundColor = "red";

    gameOver();
  }
}

function removeFlag(elCell, i, j) {
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  gGame.markedCount--;
  gBoard[i][j].isMarked = false;
  elCell.innerText = EMPTY;
}

function addFlag(elCell, i, j) {
  if (gBoard[i][j].isShown) {
    // if the cell is already open, return...
    return;
  }
  start(); // not restarting every time because the only things that stops the timer is the restart() function..

  var elCell = document.querySelector(`.cell-${i}-${j}`);
  if (gBoard[i][j].isMarked) {
    return removeFlag(elCell, i, j); // if the cell is marked and we click again on the right click , it will remove the flag and set isMarked = false
  }

  // on right click add the flag and set isMarked to true.
  gBoard[i][j].isMarked = true;
  gGame.markedCount++;
  var strText = "";
  strText += `📍`;
  elCell.innerText = strText;
  if (gBoard[i][j].isMine === gBoard[i][j].isMarked) {
    gVictoryPoints++;
    if (gVictoryPoints === gBoard.length / 2) {
      victory();
    }
  }
}

// start mine functions

function randLocateMines(gBoard) {
  for (var i = 0; i < gBoard.length / 2; i++) {
    addMine();
  }
}

function addMine() {
  var randIdx = getRandomInt(0, gMines.length);
  var num = gMines[randIdx];
  gMines.splice(randIdx, 1);
  gBoard[num][randIdx].isMine = true;
}

function resetMines() {
  gMines = [];
  for (var i = 0; i < gBoard.length; i++) {
    gMines.push(i);
  }
  return gMines;
}

function setMinesNegsCount(board, rowIdx, colIdx) {
  var mineCount = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (board[i][j].isMine) mineCount++;
    }
  }
  //   console.log(mineCount);
  return mineCount;
}

// end mine functions

// chnage the game diff and restart the entire game.
function changeGameDiff(ev) {
  reset();
  console.log(ev);
  gLevel.SIZE = parseInt(ev.id);
  gBoard = buildBoard();
  gMines = resetMines();
  randLocateMines(gBoard);
  renderBoard(gBoard, ".board-container");
}
