"use strict";
/////  Factory Function - Players  /////
function player(name, symbol) {
  const getName = name;
  const getSymbol = symbol;
  return { getName, getSymbol };
}

/////  Module - GameBoard /////
const gameBoard = (() => {
  const gameBoardContainer = document.querySelector(".gameboard-container");
  const gameStatus = document.querySelector(".game-status");

  const player1 = player(`${prompt("Enter player 1 name", "Player 1")}`, "X");
  const player2 = player(`${prompt("Enter player 2 name", "Player 2")}`, "O");

  let gameActive = true;

  const board = ["", "", "", "", "", "", "", "", ""];

  gameStatus.textContent = `${player1.getName} begins: ${player1.getSymbol}`;
  // Populate tic-tac-toe grid
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("gb-cell");
    div.setAttribute("data-cell", i);
    gameBoardContainer.appendChild(div);
  }

  return { board, gameStatus, player1, player2, gameActive };
})();

const gbCell = document.querySelectorAll(".gb-cell");

/////  Game Logic  /////
const gameRules = (() => {
  const resetBtn = document.querySelector(".game-reset");
  const players = [gameBoard.player1, gameBoard.player2];
  let activePlayer = players[0];
  ///// Counting X and O marker function
  const countMarkers = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  // Eventlistener for each cell //
  gbCell.forEach((cell) =>
    cell.addEventListener("click", function () {
      /// Function to enter selection into Gameboard.board array
      if (gameBoard.gameActive === true) {
        if (
          gameBoard.board[`${cell.getAttribute("data-cell")}`] === "X" ||
          gameBoard.board[`${cell.getAttribute("data-cell")}`] === "O"
        ) {
          alert("Spot has been taken");
        } else {
          gameBoard.board[`${cell.getAttribute("data-cell")}`] =
            activePlayer.getSymbol;
        }
        ///// Logic to determine activePlayer
        if (
          countMarkers(gameBoard.board, "X") ===
          countMarkers(gameBoard.board, "O")
        ) {
          activePlayer = players[0];
          gameBoard.gameStatus.textContent = `${players[0].getName}'s turn: ${players[0].getSymbol}`;
        } else {
          activePlayer = players[1];
          gameBoard.gameStatus.textContent = `${players[1].getName}'s turn: ${players[1].getSymbol}`;
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
      let a = gameBoard.board[winCondition[0]];
      let b = gameBoard.board[winCondition[1]];
      let c = gameBoard.board[winCondition[2]];
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
        gameBoard.gameStatus.textContent = `${players[0].getName} has won!`;
        gameBoard.gameActive = false;
        return;
      } else {
        gameBoard.gameStatus.textContent = `${players[1].getName} has won!`;
        gameBoard.gameActive = false;
        return;
      }
    }
    // Game Draw Logic
    if (!gameBoard.board.includes("")) {
      console.log("draw");
      gameBoard.gameStatus.textContent = `Game Over - DRAW!!!`;
      gbCell.forEach((cell) => {
        cell.style.backgroundColor = "grey";
      });
      gameBoard.gameActive = false;
      return;
    }
  }
  function displaySymbols() {
    document.querySelectorAll(".gb-cell").forEach((cell) => {
      cell.innerHTML = `<span>${
        gameBoard.board[cell.getAttribute("data-cell")]
      }</span>`;
    });
  }
  // Reset function
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault;
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    displaySymbols();
    activePlayer = gameRules.players[0];
    gameBoard.gameActive = true;
    gbCell.forEach((cell) => {
      cell.style.backgroundColor = "";
    });
    gameBoard.gameStatus.textContent = `${players[0].getName} begins: ${players[0].getSymbol}`;
    console.log(gameRules.players);
    console.log(gameRules.activePlayer.getSymbol);
  });

  // return //
  return { activePlayer, players, displaySymbols };
})();
