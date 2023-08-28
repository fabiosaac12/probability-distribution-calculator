export enum CalculateTypes {
  equal = "equal",
  greaterThan = "greaterThan",
  lessThan = "lessThan",
  greaterOrEqualThan = "greaterOrEqualThan",
  lessOrEqualThan = "lessOrEqualThan",
}

export const calculateTypeLabels: Record<string, string> = {
  equal: "Igual a",
  greaterThan: "Mayor que",
  lessThan: "Menor que",
  greaterOrEqualThan: "Mayor o igual que",
  lessOrEqualThan: "Menor o igual que",
};
