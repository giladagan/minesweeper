"use strict";

const EMPTY = " ";
const MINE = "💣";

var gVictoryPoints = 0;
var gBoard;
var gLevel;
var gGame;
var gMines = [];

function initGame() {
  document.querySelector(".mode").innerText = "😀";
  reset();
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
  console.log(expandShown(gBoard, i, j));
  if (gGame.isOn === false) {
    return;
  }
  if (gBoard[i][j].isMarked) {
    // if the is marked , return...  dont change the cell.
    return;
  }
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  gBoard[i][j].isShown = true;
  gGame.shownCount++;
  console.log(gGame.shownCount);
  if (gGame.shownCount === 1) {
    start();
  }
  elCell.innerHTML = gBoard[i][j].isMine ? MINE : gBoard[i][j].minesAroundCount; // if isMine is true , the print gonna be the MINE , if isMine false print gonna be the minescount

  if (gBoard[i][j].isMine) {
    //  if the cell contains the mine, give that cell a background color of red and finish the game.
    elCell.style.backgroundColor = "red";
    gameOver(elCell, i, j);
  } else if (gBoard[i][j].isShown) {
    elCell.style.backgroundColor = "#AF8C9D";
  }
}

function expandShown(board, rowIdx, colIdx, elCell) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue;
      if (j < 0 || j >= board[0].length) continue;
      console.log(board, i, j);
    }
  }
}

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

function gameOver(elCell, i, j) {
  // stops the timer, end the game.
  document.querySelector(".mode").innerText = "🤯";
  stop();
  return (gGame.isOn = false);
}

function victory() {
  document.querySelector(".mode").innerText = "😎";
  gGame.isOn = false;
  alert("VICTORY!");
  stop();
}

// chnage the game diff and restart the entire game.
function changeGameDiff(ev) {
  reset();
  initGame();
  gLevel.SIZE = parseInt(ev.id);
  gBoard = buildBoard();
  gMines = resetMines();
  randLocateMines(gBoard);
  renderBoard(gBoard, ".board-container");
}

// fix victory
// expand cells
// show all mines when game over
// check the mines logic ???

///////////////////////////////
// var board = [[0,0,1,0],
//              [1,1,0,1],
//              [0,1,1,0],
//              [0,0,1,0],
// ]

// function openNeighbors(board, row, col, visitedElements) {
//     if (board[row][col] == 1) {
//       return
//     }
//     for (var i=row-1; i<=row+1; i++) {
//       for (var j = col - 1; j<= col+1; j++) {
//         if (row === i && col === j) continue
//         if ( i < 0 || i >= board[0].length || j < 0 || j >= board.length) {
//           continue
//         }
//           let elem = `${i},${j}`
//           if (!isVisited(visitedElements, i,j)) {
//             console.log(i,j)
//           }
//           if (board[i][j] == 0 && !isVisited(visitedElements, i,j)) {
//             console.log(`Opening board for ${i}, ${j}`)
//             addToVisited(visitedElements, i,j)
//             openNeighbors(board, i, j, visitedElements)
//           }
//       }
//     }
// }

// function isVisited(visited, i,j) {
//   let elem = `${i},${j}`
//   return visited.includes(elem)
// }

// function addToVisited(visited, i, j) {
//   let elem = `${i},${j}`
//   visited.push(elem)
// }

// console.log("==========")
// openNeighbors(board, 0, 0, [])
// // 1,0 ["0,0", "0,1"]
// // 1,1
// // 0,1 -> 0,2 1,2
// //               -> 0,3 1,3
