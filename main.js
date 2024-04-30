const gameBoard = () => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const addMove = (x, y, player) => {
    if (gameArray[index] === "") {
      board[x][y] = player;
    }
  };
  const getBoard = () => {
    return board;
  };

  return { addMove, getBoard };
};
