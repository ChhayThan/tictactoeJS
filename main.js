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
    return arrayString;
  };

  return { addMove, getBoard, isFull, toString };
})();

const gameController = (() => {
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
    if (games % 2 === 0) {
      currentPlayer = players[0];
    } else {
      currentPlayer = players[1];
    }

    resetBoard();
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
    console.log(gameBoard.toString());

    if (checkWinner().win) {
      currentPlayer.score++;
      games++;
      console.log(
        `WINNER IS: Player ${currentPlayer.symbol} with a score of: ${currentPlayer.score} `
      );
    } else if (checkWinner().tie) {
      games++;
      console.log(`TIE GAME!`);
    } else {
      switchPlayer();
      turns++;
    }
  };

  const resetBoard = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        gameBoard.addMove(i, j, "");
      }
    }
  };

  const getBoard = () => {
    return gameBoard.getBoard();
  };

  return { playRound, newGame, getPlayers, getActivePlayer, getBoard };
})();

gameController.playRound(0, 1);
gameController.playRound(0, 2);
gameController.playRound(0, 0);
gameController.playRound(1, 2);
gameController.playRound(1, 1);
gameController.playRound(2, 2);
