import createGameBoard from "./gameBoard.js";

let gameBoard;

beforeEach(() => {
  gameBoard = createGameBoard();
});

test("create empty game board", () => {
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
  const shipLength = 3;
  const [row, col] = [3, 8];
  gameBoard.placeShip(row, col, shipLength, "X");

  expect(gameBoard.getNumShips()).toBe(0);
  expect(gameBoard.getCell(3, 8)).toBeUndefined();
  expect(gameBoard.getCell(3, 9)).toBeUndefined();
});

test("place a ship where one already exists", () => {
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

describe("board with 2 ships placed", () => {
  beforeEach(() => {
    let shipLength = 2;
    let [row, col] = [3, 6];
    gameBoard.placeShip(row, col, shipLength, "X");

    shipLength = 3;
    [row, col] = [5, 7];
    gameBoard.placeShip(row, col, shipLength, "Y");
  });

  test("receive successful attack", () => {
    gameBoard.receiveAttack(3, 6);

    const ship1 = gameBoard.getCell(3, 6);
    const ship2 = gameBoard.getCell(5, 7);
    expect(ship1.getHitCount()).toBe(1);
    expect(ship2.getHitCount()).toBe(0);

    expect(gameBoard.getCellStatus(3, 6)).toBe(gameBoard.status.HIT);
    expect(gameBoard.getCellStatus(3, 7)).toBe(gameBoard.status.NOT_TARGETED);
  });

  test("receive missed attack", () => {
    gameBoard.receiveAttack(2, 6);

    const ship1 = gameBoard.getCell(3, 6);
    const ship2 = gameBoard.getCell(5, 7);
    expect(ship1.getHitCount()).toBe(0);
    expect(ship2.getHitCount()).toBe(0);

    expect(gameBoard.getCellStatus(2, 6)).toBe(gameBoard.status.MISSED);
  });

  test("receive successful attacks and sink ship", () => {
    gameBoard.receiveAttack(3, 6);
    gameBoard.receiveAttack(3, 7);

    const ship1 = gameBoard.getCell(3, 6);
    const ship2 = gameBoard.getCell(5, 7);
    expect(ship1.getHitCount()).toBe(2);
    expect(ship2.getHitCount()).toBe(0);

    expect(gameBoard.getCellStatus(3, 6)).toBe(gameBoard.status.HIT);
    expect(gameBoard.getCellStatus(3, 7)).toBe(gameBoard.status.HIT);
    expect(ship1.isSunk()).toBeTruthy();
  });
});
