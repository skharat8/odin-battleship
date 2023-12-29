import createShip from "./ship.js";

export default function createGameBoard() {
  const MAX_ROWS = 10;
  const MAX_COLS = 10;
  let numShips = 0;

  const gameBoard = [...Array(MAX_ROWS)].map(() => Array(MAX_COLS));

  const isValid = (row, col) =>
    row >= 0 && row < MAX_ROWS && col >= 0 && col < MAX_COLS;

  const getGameBoard = () => gameBoard;
  const getNumShips = () => numShips;
  const getCell = (row, col) => gameBoard[row][col];

  const canShipBePlaced = (row, col, shipLength, axis) => {
    if (axis === "Y") {
      for (let i = row; i < row + shipLength; i++) {
        if (!isValid(i, col) || gameBoard[col][i] !== undefined) return false;
      }
    } else if (axis === "X") {
      for (let j = col; j < col + shipLength; j++) {
        if (!isValid(row, j) || gameBoard[row][j] !== undefined) return false;
      }
    } else {
      throw new Error(`Invalid axis, can only be X or Y: ${axis}`);
    }

    return true;
  };

  const placeShip = (row, col, shipLength, axis) => {
    if (!canShipBePlaced(row, col, shipLength, axis)) return;

    const ship = createShip(shipLength);

    if (axis === "Y") {
      for (let i = row; i < row + shipLength; i++) {
        gameBoard[i][col] = ship;
      }
    } else if (axis === "X") {
      for (let j = col; j < col + shipLength; j++) {
        gameBoard[row][j] = ship;
      }
    }

    numShips += 1;
  };

  return { getCell, getGameBoard, placeShip, getNumShips };
}
