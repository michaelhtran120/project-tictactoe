"use strict";

const gbCell = document.querySelectorAll(".gb-cell");
const gameStatus = document.querySelector(".game-status");
let gameActive = true;

/////  Factory Function - Players  /////
function playerFactory(name, symbol) {
  const players = [];
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
}

const Player0 = {
  name: "Player 1",
  symbol: "X",
};

const Player1 = {
  name: "Player 2",
  symbol: "O",
};
const players = [Player0, Player1];
let activePlayer = players[0];

/////  Module - GameBoard /////
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const resetBtn = document.querySelector(".game-reset");

  // Reset function
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault;
    Gameboard.board = ["", "", "", "", "", "", "", "", ""];
    displaySymbols();
    activePlayer = players[0];
    gameActive = true;
    gbCell.forEach((cell) => {
      cell.style.backgroundColor = "";
    });
  });

  return { board };
})();

/////  Game Logic  /////
const GameRules = (() => {
  //   const gbCell = document.querySelectorAll(".gb-cell");

  ///// Counting X and O marker function
  const countMarkers = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  // Eventlistener for each cell //
  gbCell.forEach((cell) =>
    cell.addEventListener("click", function () {
      /// Function to enter selection into Gameboard.board array
      if (gameActive === true) {
        if (
          Gameboard.board[`${cell.getAttribute("data-cell")}`] === "X" ||
          Gameboard.board[`${cell.getAttribute("data-cell")}`] === "O"
        ) {
          //do nothing
        } else {
          Gameboard.board[`${cell.getAttribute("data-cell")}`] =
            activePlayer.symbol;
        }
        ///// Logic to determine activePlayer
        if (
          countMarkers(Gameboard.board, "X") ===
          countMarkers(Gameboard.board, "O")
        ) {
          activePlayer = players[0];
          gameStatus.textContent = `Player 1's turn: 'X'`;
        } else {
          activePlayer = players[1];
          gameStatus.textContent = `Player 2's turn: 'O'`;
        }
        displaySymbols();
        checkWinner();
      } else {
      }
    })
  );
  function checkWinner() {
    let roundWon = false;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = Gameboard.board[winCondition[0]];
      let b = Gameboard.board[winCondition[1]];
      let c = Gameboard.board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        gbCell[winCondition[0]].style.backgroundColor = "green";
        gbCell[winCondition[1]].style.backgroundColor = "green";
        gbCell[winCondition[2]].style.backgroundColor = "green";
        break;
      }
    }
    if (roundWon) {
      if (activePlayer === players[1]) {
        console.log(`${players[0].name} is the winner`);
        gameStatus.textContent = `${players[0].name} has won`;
        gameActive = false;
        return;
      } else {
        console.log(`${players[1].name} is the winner`);
        gameStatus.textContent = `${players[1].name} has won`;
        gameActive = false;
        return;
      }
    }
    // Game Draw Logic
    if (!Gameboard.board.includes("")) {
      console.log("draw");
      gameStatus.textContent = `Game Over - DRAW`;
      gbCell.forEach((cell) => {
        cell.style.backgroundColor = "grey";
      });
      gameActive = false;
      return;
    }
  }

  // return //
})();

function displaySymbols() {
  document.querySelectorAll(".gb-cell").forEach((cell) => {
    cell.innerHTML = `<span>${
      Gameboard.board[cell.getAttribute("data-cell")]
    }</span>`;
  });
}
