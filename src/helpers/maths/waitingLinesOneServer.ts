import { round } from "./round";

export const getProbabilities = (po: number, rho: number, limit?: number) => {
  const probabilities: { n: number; pn: number; fn: number; "1-fn": number }[] =
    [];

  let fn = 0;

  for (
    let n = 0;
    limit
      ? n <= limit
      : round(probabilities[probabilities.length - 1]?.fn) !== 1;
    n++
  ) {
    const pn = po * rho ** n;

    fn += pn;

    probabilities.push({
      n,
      pn,
      fn,
      "1-fn": 1 - fn,
    });
  }

  return probabilities;
};

export const waitingLinesOneServerNoLimit = (lambda: number, mu: number) => {
  const rho = lambda / mu;
  const po = 1 - rho;
  const ls = rho / po;
  const lq = rho ** 2 / po;
  const ws = ls / lambda;
  const wq = lq / lambda;

  const probabilities = getProbabilities(po, rho);

  return { rho, po, ls, lq, ws, wq, probabilities };
};

export const waitingLinesOneServerWithLimit = (
  lambda: number,
  mu: number,
  limit: number
) => {
  const rho = lambda / mu;
  const po = (1 - rho) / (1 - rho ** (limit + 1));
  const ls =
    (rho * (1 - (limit + 1) * rho ** limit + limit * rho ** (limit + 1))) /
    ((1 - rho) * (1 - rho ** (limit + 1)));

  const probabilities = getProbabilities(po, rho);

  const effectiveLambda = lambda * (1 - probabilities[limit].pn);
  const lossLambda = lambda - effectiveLambda;
  const lq = ls - effectiveLambda / mu;
  const wq = lq / effectiveLambda;
  const ws = wq + 1 / mu;

  return {
    rho,
    po,
    ls,
    lq,
    ws,
    wq,
    effectiveLambda,
    lossLambda,
    probabilities,
  };
};
