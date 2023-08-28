import { EXP } from "../../constants/exp";

export const exponentialGreaterThan = (frequency: number, t: number) => {
  const alpha = 1 / frequency;

  return EXP ** (-alpha * t);
};

export const exponentialLessThan = (frequency: number, t: number) => {
  return 1 - exponentialGreaterThan(frequency, t);
};
