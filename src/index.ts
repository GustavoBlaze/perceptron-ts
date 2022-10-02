import { Perceptron } from "./perceptron";
import * as R from "./random";

R.seed(1);
const perceptron = new Perceptron({length: 3});

const inputs = [
  {
    values: [0, 0, 1],
    expected: 0,
  },
  {
    values: [1, 1, 1],
    expected: 1,
  },
  {
    values: [1, 0, 1],
    expected: 1,
  },
  {
    values: [0, 1, 1],
    expected: 0,
  },
];

console.time("train");

perceptron.train({
  inputs,
  interactions: 15000,
});

console.timeEnd("train");

console.log({
  weights: perceptron.weights,
});

const table: any = [];

inputs.forEach((input) => {
  const output = perceptron.think(input.values);

  table.push({
    input: input.values,
    output,
  });
});

console.table(table);
