"use strict";

function randLocateMines(gBoard) {
  for (var i = 0; i < gBoard.length / 2; i++) {
    addMine();
  }
}

function addMine() {
  var randIdx = getRandomInt(0, gMines.length);
  var num = gMines[randIdx]; // [0,3,1,2]
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
