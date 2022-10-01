export function multiply(a: number[], b: number[]) {
  var result = [];
  for (var i = 0; i < a.length; i++) {
    result[i] = a[i] * b[i];
  }
  return result;
}
