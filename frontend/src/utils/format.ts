export const round = (value: number, precision: number) => {
  var multiplier = Math.pow(10, precision || 0);
  return Number(Math.round(value * multiplier) / multiplier);
}