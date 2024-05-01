const gameController = (() => {
  // IIFE gameBoard
  const gameBoard = (() => {
    let board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    const addMove = (x, y, symbol) => {
      if (board[x][y] === "") {
        board[x][y] = symbol;
      }
    };
    const getBoard = () => {
      return board;
    };

    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j] = "";
        }
      }
    };

    const isFull = () => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === "") {
            return false;
          }
        }
      }
      return true;
    };

    const toString = () => {
      let arrayString = "";
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === "") {
            arrayString += "_ ";
          } else {
            arrayString += board[i][j] + " ";
          }
        }
        arrayString += "\n"; // Add a newline character after each row
      }
    };

    return { addMove, getBoard, isFull, toString, resetBoard };
  })();
  const players = [
    {
      id: "player1",
      score: 0,
      symbol: "X",
    },
    {
      id: "player2",
      score: 0,
      symbol: "O",
    },
  ];

  let currentPlayer = players[0];
  let turns = 0;
  let games = 0;
  let gameStatus = "active";

  const getPlayers = () => {
    return players;
  };

  const getActivePlayer = () => {
    return currentPlayer;
  };

  const switchPlayer = () => {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
  };

  const newGame = () => {
    turns = 0;
    gameStatus = "active";
    if (games % 2 === 0) {
      currentPlayer = players[0];
    } else {
      currentPlayer = players[1];
    }

    gameBoard.resetBoard();
    gameController.display();
  };
  const checkWinner = () => {
    const board = gameBoard.getBoard();
    let result = {
      win: false,
      tie: false,
    };

    let diagonalToCheckOne = [];
    let diagonalToCheckTwo = [];

    for (let i = 0; i < board.length; i++) {
      let rowToCheck = board[i];

      let columnToCheck = [];
      for (let j = 0; j < board.length; j++) {
        columnToCheck[j] = board[j][i];
      }

      if (
        rowToCheck.every((item) => item === currentPlayer.symbol) ||
        columnToCheck.every((item) => item === currentPlayer.symbol)
      ) {
        result.win = true;
      }
      diagonalToCheckOne[i] = board[i][i];
      diagonalToCheckTwo[i] = board[i][board.length - 1 - i];
    }
    if (
      diagonalToCheckOne.every((item) => item === currentPlayer.symbol) ||
      diagonalToCheckTwo.every((item) => item === currentPlayer.symbol)
    ) {
      result.win = true;
    }

    if (gameBoard.isFull() && !result.win) {
      result.tie = true;
    }

    return result;
  };

  const playRound = (row, col) => {
    gameBoard.addMove(row, col, currentPlayer.symbol);
    gameController.display();
    if (checkWinner().win) {
      currentPlayer.score++;
      games++;
      gameStatus = "win";
    } else if (checkWinner().tie) {
      games++;
      gameStatus = "tie";
    } else {
      switchPlayer();
      turns++;
    }
  };

  const getBoard = () => {
    return gameBoard.getBoard();
  };

  const getGameStatus = () => {
    return gameStatus;
  };

  return {
    playRound,
    newGame,
    getPlayers,
    getActivePlayer,
    getBoard,
    display: gameBoard.toString,
    getGameStatus,
  };
})();

function renderGame() {
  const game = gameController;
  const board = game.getBoard();
  const players = game.getPlayers();

  const boardContainer = document.querySelector(".gameBoard");
  boardContainer.addEventListener("click", boardClickHandler);

  const updateCurrentPlayer = () => {
    const currentPlayer = document.querySelector(".currentPlayer p");
    currentPlayer.innerText = `Current Player: ${
      game.getActivePlayer().symbol
    }`;
  };

  updateCurrentPlayer();

  const renderScore = () => {
    const score1 = document.querySelector(".player1 p");
    score1.innerText = `Score: ${players[0].score}`;
    const score2 = document.querySelector(".player2 p");
    score2.innerText = `Score: ${players[1].score}`;
  };

  renderScore();

  const renderBoard = (() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.column = j;
        cell.dataset.row = i;
        cell.textContent = board[i][j];
        boardContainer.appendChild(cell);
      }
    }
  })();

  function boardClickHandler(event) {
    const cellClicked = event.target;
    const rowClicked = cellClicked.dataset.row;
    const colClicked = cellClicked.dataset.column;

    if (
      rowClicked !== undefined &&
      colClicked !== undefined &&
      board[rowClicked][colClicked] === "" &&
      game.getGameStatus() === "active"
    ) {
      game.playRound(rowClicked, colClicked);
      updateCurrentPlayer();
      updateBoard();
    }
  }

  const updateBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.querySelector(
          `[data-row="${i}"][data-column="${j}"]`
        );
        cell.textContent = board[i][j];
      }
    }
    if (game.getGameStatus() === "win") {
      const currentPlayer = document.querySelector(".currentPlayer p");
      currentPlayer.innerText = `Winner: ${game.getActivePlayer().symbol}`;
      restartGameBtn.textContent = "New game";
    } else if (game.getGameStatus() === "tie") {
      const currentPlayer = document.querySelector(".currentPlayer p");
      currentPlayer.innerText = `Tie Game!`;
      restartGameBtn.textContent = "New game";
    } else {
      updateCurrentPlayer();
      restartGameBtn.textContent = "Restart Game";
    }

    renderScore();
  };

  const restartGameBtn = document.querySelector(".game-btn");
  restartGameBtn.addEventListener("click", (event) => {
    game.newGame();
    updateBoard();
  });
}

renderGame();
