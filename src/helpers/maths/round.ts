export const round = (number: number) => {
  return Math.round((number + Number.EPSILON) * 1000000) / 1000000;
};
