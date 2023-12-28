import createShip from "./ship.js";

test("hit the ship", () => {
  const ship = createShip(2);
  ship.hit();

  expect(ship.getHitCount()).toBe(1);
});

test("enough hits to sink the ship", () => {
  const ship = createShip(2);
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBeTruthy();
});

test("too few hits to sink the ship", () => {
  const ship = createShip(2);
  ship.hit();

  expect(ship.isSunk()).toBeFalsy();
});
