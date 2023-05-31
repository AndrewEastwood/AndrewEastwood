/*

Given an object, return a valid JSON string of that object.
You may assume the object only inludes strings, integers, arrays, objects, booleans, and null.
The returned string should not include extra spaces. The order of keys should be the same as the order returned by Object.keys().

Please solve it without using the built-in JSON.stringify method.

Example 1:

Input: object = {"y":1,"x":2}
Output: {"y":1,"x":2}
Explanation: 
Return the JSON representation.
Note that the order of keys should be the same as the order returned by Object.keys().
Example 2:

Input: object = {"a":"str","b":-12,"c":true,"d":null}
Output: {"a":"str","b":-12,"c":true,"d":null}
Explanation:
The primitives of JSON are strings, numbers, booleans, and null.
Example 3:

Input: object = {"key":{"a":1,"b":[{},null,"Hello"]}}
Output: {"key":{"a":1,"b":[{},null,"Hello"]}}
Explanation:
Objects and arrays can include other objects and arrays.
Example 4:

Input: object = true
Output: true
Explanation:
Primitive types are valid inputs.
 

Constraints:

object includes strings, integers, booleans, arrays, objects, and null
1 <= JSON.stringify(object).length <= 105
maxNestingLevel <= 1000
all strings will only contain alphanumeric characters

*/

/**
 * @param {any} object
 * @return {string}
 */
var jsonStringify = function(object, key) {
  let result;
  if (object === null) {
    result = 'null'
  } else if (object === undefined) {
    result = 'undefined'
  } else if (Array.isArray(object)) {
    result = '[' + object.map((v) => jsonStringify(v)) + ']';
  } else if (typeof object === 'number') {
    result = object;
  } else if (typeof object === 'string') {
    result = `"` + object.replace(/([ \{ \[ \] \} ' \" ])/g, '\\$1') + `"`;
  } else if (typeof object === 'boolean') {
    result = object.toString();
  } else if (typeof object === 'object') {
    result = "{";
    for (let key in object) {
      result += jsonStringify(object[key], key);
      result += ',';
    }
    result = result.length > 1 ? result.substring(0, result.length - 1) : result;
    result += "}";
  }
  return typeof key !== 'undefined' ? `"${key}":${result}` : result;
};
