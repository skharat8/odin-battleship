import createGameBoard from "./gameBoard.js";

test("create empty game board", () => {
  const gameBoard = createGameBoard();

  expect(gameBoard.getGameBoard()).toHaveLength(10);
  expect(gameBoard.getGameBoard()[0]).toHaveLength(10);

  const firstCell = gameBoard.getCell(0, 0);
  const lastCell = gameBoard.getCell(9, 9);
  const randomMiddleCell = gameBoard.getCell(3, 7);

  expect(firstCell).toBeUndefined();
  expect(lastCell).toBeUndefined();
  expect(randomMiddleCell).toBeUndefined();
});

test("place a ship in first row", () => {
  const gameBoard = createGameBoard();

  const shipLength = 3;
  const [row, col] = [0, 4];
  gameBoard.placeShip(row, col, shipLength, "X");

  const ship = gameBoard.getCell(0, 4);

  expect(gameBoard.getNumShips()).toBe(1);
  expect(ship.length).toBe(3);
  expect(gameBoard.getCell(0, 5)).toBe(ship);
  expect(gameBoard.getCell(0, 6)).toBe(ship);
  expect(gameBoard.getCell(0, 7)).toBeUndefined();
});

test("place a ship outside valid bounds", () => {
  const gameBoard = createGameBoard();

  const shipLength = 3;
  const [row, col] = [3, 8];
  gameBoard.placeShip(row, col, shipLength, "X");

  expect(gameBoard.getNumShips()).toBe(0);
  expect(gameBoard.getCell(3, 8)).toBeUndefined();
  expect(gameBoard.getCell(3, 9)).toBeUndefined();
});

test("place a ship where one already exists", () => {
  const gameBoard = createGameBoard();

  const shipLength = 2;
  const [row, col] = [3, 6];
  gameBoard.placeShip(row, col, shipLength, "X");
  gameBoard.placeShip(row, col + 1, shipLength, "X");

  const ship = gameBoard.getCell(3, 6);

  expect(gameBoard.getNumShips()).toBe(1);
  expect(ship.length).toBe(2);
  expect(gameBoard.getCell(3, 7)).toBe(ship);
  expect(gameBoard.getCell(3, 8)).toBeUndefined();
});
