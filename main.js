"use strict";

const EMPTY = " ";
const MINE = "💣";

var cellCount;
var gBoard;
var gLevel;
var gGame;

function initGame() {
  document.querySelector(".emoji").innerText = "😀";
  document.querySelector(".lives").innerText = "💗💗💗";
  document.querySelector(".hint").innerText = "💡💡💡";

  hintActive = false;
  hintCount = 3;
  currentLife = 3;
  reset();
  startGame();
  gBoard = buildBoard();
  cellCount = gBoard.length * gBoard.length;
  getRandomEmptyCell(gBoard);
  randLocateMines(gBoard);
  renderBoard(gBoard, ".board-container");
}

function startGame() {
  gLevel = {
    SIZE: 4,
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
      cell.minesAroundCount =
        setMinesNegsCount(gBoard, i, j) > 0
          ? setMinesNegsCount(gBoard, i, j)
          : EMPTY; // if setMinesNegsCount value is > 0 then return value else return empty cell.

      // if the cell property isShown is true, display the cell, else display EMPTY!
      var cellDispaly = cell.isShown ? cell : EMPTY;

      const className = `cell cell-${i}-${j}`;

      strHTML += `<td  oncontextmenu="addFlag(event,this, ${i}, ${j})" onClick="cellClicked(this, ${i}, ${j})" class="${className}">${cellDispaly}</td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";

  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
  console.log(hintActive);
  if (hintActive) {
    hint(gBoard, i, j, elCell);
    return (hintActive = false);
  }
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  if (gGame.isOn === false) {
    // if the game is over every click on the cell wont do any effect
    return;
  }
  if (gBoard[i][j].isMine && gBoard[i][j].isShown) {
    // if the cell is already opened and its a mine, return... dont decrease life
    return;
  }

  if (gBoard[i][j].isMarked) {
    // if the is marked , return...  dont change the cell, keep it marked.
    return;
  }

  // when we click a cell isShown = true and shown count increase.
  gBoard[i][j].isShown = true;
  gGame.shownCount++;

  if (gGame.shownCount === 1) {
    //start the timer only when shown count === 1 , to prevent start the timer every time we click a cell
    start();
  }

  elCell.innerHTML = gBoard[i][j].isMine ? MINE : gBoard[i][j].minesAroundCount; // if isMine is true , the print gonna be the MINE , if isMine false print gonna be the minescount

  if (gBoard[i][j].isMine) {
    new Audio("audio/mineExplosion.wav").play();
    life(); // decrease life by 1
    return (elCell.style.backgroundColor = "red");
  } else if (gBoard[i][j].isShown) {
    elCell.style.backgroundColor = "#AF8C9D";
  }
  expandShown(gBoard, i, j);
  victory();
}

function gameOver() {
  // stops the timer, end the game.
  revealMines(gBoard);
  document.querySelector(".emoji").innerText = "🤯";
  stop();
  return (gGame.isOn = false);
}

function victory() {
  if (
    gGame.markedCount === minesCount &&
    gGame.shownCount === cellCount - minesCount
  ) {
    document.querySelector(".emoji").innerText = "😎";
    gGame.isOn = false;
    stop();
  }
}

// change the game diff and restart the entire game.
function changeGameDiff(ev) {
  reset();
  initGame();
  gLevel.SIZE = parseInt(ev.id);
  gBoard = buildBoard();
  cellCount = gBoard.length * gBoard.length;
  gMines = resetMines();
  getRandomEmptyCell(gBoard);
  randLocateMines(gBoard);
  renderBoard(gBoard, ".board-container");
}
