const gameBoard = () => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const addMove = (x, y, player) => {
    if (gameArray[index] === "") {
      board[x][y] = player.symbol;
    }
  };
  const getBoard = () => {
    return board;
  };

  return { addMove, getBoard };
};

const gameController = () => {
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

  const getPlayer = () => {
    return players;
  };
};
