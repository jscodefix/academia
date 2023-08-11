/*

test code taken from https://gist.github.com/bcawrse/04a17dae7f534de1da214a1c05614305

MODIFICATIONS:
230801 jscodefix original version
 */
import { arrayFlatten } from './array-flatten.mjs';
//const flatten = require('./array-flatten.mjs', null , null);

describe('array-flatten.mjs', () => {
  test('arrayFlatten() throws exception', () => {
    expect(() => { arrayFlatten() }).toThrow(TypeError);
  });
  test('arrayFlatten(undefined) throws exception', () => {
    expect(() => { arrayFlatten(undefined) }).toThrow(TypeError);
  });
  test('arrayFlatten(5) throws exception', () => {
    expect(() => { arrayFlatten(5) }).toThrow(TypeError);
  });
  test('arrayFlatten(\'z\') throws exception', () => {
    expect(() => { arrayFlatten('z') }).toThrow(TypeError);
  });
  test('arrayFlatten([]) = []', () => {
    expect(arrayFlatten([]))
      .toEqual([]);
  });
  test('arrayFlatten([1, 2, [], 4]) = [1, 2, 4]', () => {
    expect(arrayFlatten([1, 2, [], 4]))
      .toEqual([1, 2, 4]);
  });
  test('arrayFlatten([1, 2, 3, 4]) = [1, 2, 3, 4]', () => {
    expect(arrayFlatten([1, 2, 3, 4]))
      .toEqual([1, 2, 3, 4]);
  });
  test('arrayFlatten([[1, 2, [3]], 4]) = [1, 2, 3, 4]', () => {
    expect(arrayFlatten([[1, 2, [3]], 4]))
      .toEqual([1, 2, 3, 4]);
  });
  test('arrayFlatten([1, 2, [1, 2, 3]] = [1, 2, 1, 2, 3]', () => {
    expect(arrayFlatten([1, 2, [1, 2, 3]]))
      .toEqual([1, 2, 1, 2, 3]);
  });
  test('arrayFlatten([1, 2, [1, 2, 3]] != [1, 1, 2, 2, 3]', () => {
    expect(arrayFlatten([1, 2, [1, 2, 3]]))
      .not.toEqual([1, 1, 2, 2, 3]);
  });
  test('arrayFlatten([1, 2, [3, 2, 1, [1, 2, 3, 4, 5], 1, 2, 3], 3, 4, 5]) = [1, 2, 3, 2, 1, 1, 2, 3, 4, 5, 1, 2, 3, 3, 4, 5]', () => {
    expect(arrayFlatten([1, 2, [3, 2, 1, [1, 2, 3, 4, 5], 1, 2, 3], 3, 4, 5]))
      .toEqual([1, 2, 3, 2, 1, 1, 2, 3, 4, 5, 1, 2, 3, 3, 4, 5]);
  });
  test('arrayFlatten([[[1], 2]]) = [1, 2]', () => {
    expect(arrayFlatten([[[1], 2]]))
      .toEqual([1, 2]);
  });
});
