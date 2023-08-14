/*
This array flatten challenge was inspired by a React Denver Discord post (by Jeff B.?).
 */

export function arrayFlatten(input) {
  if ( !Array.isArray(input) ) {
    throw new TypeError();
  }

  let flattened = [];
  let inner_array = [];
  let element = input.shift();

  while ( element !== undefined ) {
    if ( typeof(element) === 'number' ) {
      flattened.push(element);
    } else {
      inner_array = arrayFlatten(element);
      inner_array.forEach((element) => {
        flattened.push(element)
      });
    }
    element = input.shift();
  }
  return flattened;
}
