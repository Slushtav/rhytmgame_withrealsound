export const NOTES = [
  1000, 2000, 3000, 4500, 6000, 7500
]; // waktu ms

export const HIT_WINDOW = 400; // toleransi timing
export const THRESHOLD = 60;

export function checkHit(currentTime, volume, noteTime) {
  const isOnTime =
    Math.abs(currentTime - noteTime) < HIT_WINDOW;

  const isLoudEnough = volume > THRESHOLD;

  return isOnTime && isLoudEnough;
}