import { assert } from "console";
import * as R from "./random";
import * as util from "./util";

// import numjs from "numjs";

R.seed(1);

interface NeuronConstructorProps {
  length: number;
}

interface NeuronTrainProps {
  inputs: Array<{
    values: number[];
    result: number;
  }>;

  interactions: number;
}

export class Neuron {
  weights: number[];

  constructor({ length }: NeuronConstructorProps) {
    this.weights = Array.from({ length }, () => 2 * R.random() - 1);
  }

  sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
  }

  sigmoid_derivative(x: number[]) {
    return x.map((y) => y * (1 - y));
  }

  think(inputs: number[]) {
    assert(
      inputs.length === this.weights.length,
      "Input length must match weights length"
    );

    const output = inputs
      .map((input, i) => input * this.weights[i])
      .reduce((a, b) => a + b);

    return this.sigmoid(output);
  }

  train({ inputs, interactions }: NeuronTrainProps) {

    for (let i = 0; i < interactions; i++) {
      const outputs = [] as number[];
      const errors = [] as number[];

      inputs.forEach(({ values, result }) => {
        const output = this.think(values);
        const error = result - output;

        outputs.push(output);
        errors.push(error);
      });

      const sigmoidedDerivatedOutputs = this.sigmoid_derivative(outputs);
      const multipliedErrors = util.multiply(errors, sigmoidedDerivatedOutputs);

      const adjustments: number[] = [];
      
      inputs.forEach(({values}) => {
        const multipliedValues = util.multiply(values, multipliedErrors);
        const sum = multipliedValues.reduce((a, b) => a + b);
        adjustments.push(sum);
      })

      
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] += adjustments[i];
      }
    }
  }
}
