import {Neuron} from "./neuron";

const neuron = new Neuron({length: 3});


console.time("train");
neuron.train({
  inputs: [
    {
      values: [0, 0, 1],
      result: 0,
    },
    {
      values: [1, 1, 1],
      result: 1,
    },
    {
      values: [1, 0, 1],
      result: 1,
    },
    {
      values: [0, 1, 1],
      result: 0,
    },
  ],
  interactions: 150000
})

console.timeEnd("train");

console.log({
  weights: neuron.weights,
});

console.log(neuron.think([0, 0, 1]))
console.log(neuron.think([1, 1, 1]))
console.log(neuron.think([1, 0, 1]))
console.log(neuron.think([0, 0, 1]))