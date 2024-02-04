// Human vs human tic tac toe in p5.js
// Author: Hiro Lilley
// Date: Feb. 1, 2024

let rh;
let cw;
let board;
let currentPlayer;
let numEmpty;
let isPlaying;
let winner;

function setup() {
  createCanvas(400, 400);
  rh=height/3;
  cw=width/3;
  newBoard();
  currentPlayer = "X";
  isPlaying = true;
  winner = "";
}

function draw() {
  // clear the background
  strokeWeight(1);
  stroke(0,0,0);
  background(220);
  fill(220);
  
  // draw the gridlines
  line(0,rh,width,rh);
  line(0,rh*2,width,rh*2);
  line(cw,0,cw,height);
  line(cw*2,0,cw*2,height);
  
  // draw the moves
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      strokeWeight(1);
      stroke(0,0,0);
      if (getCell(col, row) == "X") {
        if (winner == "X") {
          strokeWeight(10);
          stroke(255,0,0);
        }
        // draw an "X"
        let x = col * cw + cw / 2;
        let y = row * rh + rh / 2;
        let d = cw / 2;
        line(x - d / 2, y - d / 2, x + d / 2, y + d / 2);
        line(x + d / 2, y - d / 2, x - d / 2, y + d / 2);
      } else if (getCell(col, row) == "O") {
        if (winner == "O") {
          strokeWeight(10);
          stroke(255,255,0);
        }
        // draw an "O"
        let x = col * cw + cw / 2;
        let y = row * rh + rh / 2;
        let d = cw / 2;
        circle(x, y, d)
      }
    }
  }
}

function mouseClicked() {
  if (isPlaying == false) {
    return;
  }
  
  // where did the player click?
  let col = floor(mouseX/cw);
  let row = floor(mouseY/rh);
  
  // is the player allowed to move here? 
  if (getCell(col,row) != "") {
    return;  
  }
  
  // store the players move
  setCell(col, row, currentPlayer);
  
  // is the game over?
  winner = checkWinner();
  if (winner != null) {
    isPlaying = false;
    // console.log("Player " + currentPlayer + " won!");
    return;
  }
  
  // otherwise its next players turn...
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function newBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  numEmpty = 9;
}

function getCell(col, row) {
  let index = col + row * 3;
  return board[index];
}

function setCell(col, row, value) {
  let index = col + row * 3;
  if (board[index] == "" && value != "") {
    numEmpty = numEmpty - 1;
  } else if (board[index] != "" && value == "") {
    numEmpty = numEmpty + 1;
  }
  board[index] = value;
}

function checkWinner() {
  //rows
  if (getCell(0,0) != "" && getCell(0,0) == getCell(1,0) && getCell(1,0) == getCell(2,0)) {
    return getCell(0,0);
  }
  if (getCell(0,1) != "" && getCell(0,1) == getCell(1,1) && getCell(1,1) == getCell(2,1)) {
    return getCell(0,1);
  }
  if (getCell(0,2) != "" && getCell(0,2) == getCell(1,2) && getCell(1,2) == getCell(2,2)) {
    return getCell(0,2);
  }
  // columns
  if (getCell(0,0) != "" && getCell(0,0) == getCell(0,1) && getCell(0,1) == getCell(0,2)) {
    return getCell(0,0);
  }
  if (getCell(1,0) != "" && getCell(1,0) == getCell(1,1) && getCell(1,1) == getCell(1,2)) {
    return getCell(1,0);
  }
  if (getCell(2,0) != "" && getCell(2,0) == getCell(2,1) && getCell(2,1) == getCell(2,2)) {
    return getCell(2,0);
  }
  // diagnals
  if (getCell(0,0) != "" && getCell(0,0) == getCell(1,1) && getCell(1,1) == getCell(2,2)) {
    return getCell(0,0);
  }
  if (getCell(2,0) != "" && getCell(2,0) == getCell(1,1) && getCell(1,1) == getCell(0,2)) {
    return getCell(2,0);
  }
  // tie
  if (numEmpty == 0) {
    return "";
  }
  // the game is still going
  return null;
}
