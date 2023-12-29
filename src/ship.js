export default function createShip(length) {
  let numHits = 0;

  const getHitCount = () => numHits;
  const isSunk = () => numHits === length;

  const hit = () => {
    numHits += 1;
  };

  return { length, getHitCount, hit, isSunk };
}
