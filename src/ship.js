export default function createShip(length) {
  let numHits = 0;

  const getHitCount = () => numHits;
  const hit = () => ++numHits;
  const isSunk = () => numHits === length;

  return { getHitCount, hit, isSunk };
}
