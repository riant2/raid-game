export function random(min: number, max: number) {
  return ~~(Math.random() * (max + 1 - min) + min);
}
