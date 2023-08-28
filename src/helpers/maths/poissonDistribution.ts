import { EXP } from "../../constants/exp";
import { factorial } from "./factorial";

export const poissonEqualTo = (lambda: number, x: number) => {
  return (EXP ** -lambda * lambda ** x) / factorial(x);
};

export const poissonLessThan = (lambda: number, x: number) => {
  let result = 0;

  for (let xi = 0; xi < x; xi++) {
    result += poissonEqualTo(lambda, xi);
  }

  return result;
};

export const poissonGreaterThan = (lambda: number, x: number) => {
  return 1 - poissonLessThan(lambda, x + 1);
};

export const poissonLessOrEqualThan = (lambda: number, x: number) => {
  return poissonLessThan(lambda, x + 1);
};

export const poissonGreaterOrEqualThan = (lambda: number, x: number) => {
  return poissonGreaterThan(lambda, x - 1);
};
