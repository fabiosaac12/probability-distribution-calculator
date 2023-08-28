import { factorial } from "./factorial";
import { round } from "./round";

const getProbabilities = (
  rho: number,
  po: number,
  c: number,
  limit?: number
) => {
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
    let pn: number;

    if (n < c) {
      pn = (rho ** n / factorial(n)) * po;
    } else {
      pn = (rho ** n * po) / (c ** (n - c) * factorial(c));
    }

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

export const waitingLinesMultipleServersNoLimit = (
  lambda: number,
  mu: number,
  c: number
) => {
  const rho = lambda / mu;

  let po = 0;

  for (let n = 0; n <= c; n++) {
    if (n !== c) {
      po += rho ** n / factorial(n);
    } else {
      po += rho ** n / (factorial(c) * (1 - rho / c));
    }
  }

  po = 1 / po;

  const probabilities = getProbabilities(rho, po, c);

  const lq = (c * rho * probabilities[c].pn) / (c - rho) ** 2;
  const ls = rho + lq;
  const wq = lq / lambda;
  const ws = wq + 1 / mu;

  return { rho, po, ls, lq, ws, wq, probabilities };
};

export const waitingLinesMultipleServerWithLimit = (
  lambda: number,
  mu: number,
  c: number,
  limit: number
) => {
  const rho = lambda / mu;
  const rhoByC = rho / c;

  let po = 0;

  for (let n = 0; n <= c; n++) {
    if (n !== c) {
      po += rho ** n / factorial(n);
    } else {
      po +=
        rhoByC !== 1
          ? (rho ** n * (1 - rhoByC ** (limit - c + 1))) /
            (factorial(c) * (1 - rhoByC))
          : (rho ** c / factorial(c)) * (limit - c + 1);
    }
  }

  po = 1 / po;

  const probabilities = getProbabilities(rho, po, c, limit);

  const lq =
    rhoByC !== 1
      ? ((po * rho ** (c + 1)) / (factorial(c - 1) * (c - rho) ** 2)) *
        (1 -
          rhoByC ** (limit - c) -
          (limit - c) * rhoByC ** (limit - c) * (1 - rhoByC))
      : ((rho ** c * (limit - c) * (limit - c + 1)) / (2 * factorial(c))) * po;

  const effectiveLambda = lambda * (1 - probabilities[limit].pn);
  const lossLambda = lambda - effectiveLambda;
  const ls = lq + effectiveLambda / mu;
  const wq = lq / effectiveLambda;
  const ws = wq + 1 / mu;

  let inactiveServers = 0;

  for (let n = 0; n <= c; n++) {
    inactiveServers += (c - n) * probabilities[n].pn;
  }

  const activeServers = c - inactiveServers;

  return {
    rho,
    po,
    ls,
    lq,
    ws,
    wq,
    effectiveLambda,
    lossLambda,
    inactiveServers,
    activeServers,
    probabilities,
  };
};
