"use strict";

var gMines = [];
var minesCount;
var minesFound = 0;

function randLocateMines(gBoard) {
  minesCount = 0;
  for (var i = 0; i < gBoard.length; i++) {
    var randomPos = getRandomEmptyCell(gBoard);
    gBoard[randomPos.i][randomPos.j].isMine = true;
    minesCount++;
  }
  return minesCount;
}

function getRandomEmptyCell(board) {
  const emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var pos = { i: i, j: j };
      if (!emptyCells.includes(pos)) {
        emptyCells.push(pos);
      }
    }
  }
  //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX
  var randomIdx = getRandomInt(0, emptyCells.length - 1);
  return emptyCells[randomIdx];
}

function revealMines(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].isMine) {
        board[i][j].isShown = true;
        renderCell({ i: i, j: j }, MINE);
      }
    }
  }
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
