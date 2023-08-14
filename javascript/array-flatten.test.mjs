/*

test code taken from https://gist.github.com/bcawrse/04a17dae7f534de1da214a1c05614305

MODIFICATIONS:
230801 jscodefix original version
 */
import {arrayFlatten} from './array-flatten.mjs';
//const flatten = require('./array-flatten.mjs', null , null);  // CommonJS modules

describe('array-flatten()', () => {
  describe('error conditions', () => {
    test('with no argument throws TypeError exception', () => {
      expect(() => arrayFlatten()).toThrow(TypeError);
    });
    test('with undefined throws TypeError exception', () => {
      expect(() => arrayFlatten(undefined)).toThrow(TypeError);
    });
    test('with a number throws TypeError exception', () => {
      expect(() => arrayFlatten(5)).toThrow(TypeError);
    });
    test('with a string throws TypeError exception', () => {
      expect(() => arrayFlatten('z')).toThrow(TypeError);
    });
    test('with an object throws TypeError exception', () => {
      expect(() => arrayFlatten({x: 1})).toThrow(TypeError);
    });
    test('with array containing an object throws TypeError exception', () => {
      expect(() => arrayFlatten([1, {x: 2}, 3])).toThrow(TypeError);
    });
  });

  test('with empty array returns an empty array', () => {
    expect(arrayFlatten([])).toEqual([]);
  });
  test('returns same array that is already flattened', () => {
    expect(arrayFlatten([1, -2, 3.33, .4e-3])).toEqual([1, -2, 3.33, .4e-3]);
  });
  test('flattens a simple nested array of arrays', () => {
    expect(arrayFlatten([1, 2, [3, [4, 5]], 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test('flattens empty array elements by removing them', () => {
    expect(arrayFlatten([1, 2, [], 4])).toEqual([1, 2, 4]);
  });
  test('arrayFlatten([[1, 2, [3]], 4]) = [1, 2, 3, 4]', () => {
    expect(arrayFlatten([[1, 2, [3]], 4])).toEqual([1, 2, 3, 4]);
  });
  test('arrayFlatten([1, 2, [1, 2, 3]] = [1, 2, 1, 2, 3]', () => {
    expect(arrayFlatten([1, 2, [1, 2, 3]])).toEqual([1, 2, 1, 2, 3]);
  });
  test('does not sort integer elements', () => {
    expect(arrayFlatten([1, 2, [1, 2, 3]])).not.toEqual([1, 1, 2, 2, 3]);
  });
  test('handles deeply nested arrays', () => {
    expect(arrayFlatten([1, 2, [3, 2, 1, [1, 2, 3, 4, 5], 1, 2, 3], 3, 4, 5]))
      .toEqual([1, 2, 3, 2, 1, 1, 2, 3, 4, 5, 1, 2, 3, 3, 4, 5]);
  });
  test('handles identity nesting', () => {
    expect(arrayFlatten([[[1], 2]])).toEqual([1, 2]);
  });
});
