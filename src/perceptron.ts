import { assert } from "console";
import * as R from "./random";

type ConstructorProps = {
  length: number; // number of weights
};

type SingleThinkProps = {
  values: number[];
  expected: number;
};

type TrainProps = {
  inputs: SingleThinkProps[];
  interactions: number;
};

export class Perceptron {
  weights: number[];

  constructor({ length }: ConstructorProps) {
    this.weights = Array.from({ length }, () => 2 * R.random() - 1); // Mantein weights between -1 and 1
  }

  /***
   * Activation function
   */
  sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
  }

  /***
   * Calculate the output of the perceptron
   */
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

  /***
   * Train the perceptron with a single input
   */
  singleTrain({ values, expected }: SingleThinkProps) {
    const output = this.think(values);
    const error = expected - output;

    for (let i = 0; i < this.weights.length; i++) {
      const adjustment = error * output * values[i];
      this.weights[i] += adjustment;
    }
  }

  /***
   * Train the perceptron with multiple inputs and interactions
   */
  train({ inputs, interactions }: TrainProps) {
    for (let i = 0; i < interactions; i++) {
      inputs.forEach(this.singleTrain.bind(this));
    }
  }
}
