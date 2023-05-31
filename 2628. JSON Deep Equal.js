/*

Given two objects o1 and o2, check if they are deeply equal.

For two objects to be deeply equal, they must contain the same keys, and the associated values must also be deeply equal.
Two objects are also considered deeply equal if they pass the === equality check.

You may assume both objects are the output of JSON.parse. In other words, they are valid JSON.

Please solve it without using lodash's _.isEqual() function.

 

Example 1:

Input: o1 = {"x":1,"y":2}, o2 = {"x":1,"y":2}
Output: true
Explanation: The keys and values match exactly.
Example 2:

Input: o1 = {"y":2,"x":1}, o2 = {"x":1,"y":2}
Output: true
Explanation: Although the keys are in a different order, they still match exactly.
Example 3:

Input: o1 = {"x":null,"L":[1,2,3]}, o2 = {"x":null,"L":["1","2","3"]}
Output: false
Explanation: The array of numbers is different from the array of strings.
Example 4:

Input: o1 = true, o2 = false
Output: false
Explanation: true !== false
 

Constraints:

1 <= JSON.stringify(o1).length <= 105
1 <= JSON.stringify(o2).length <= 105
maxNestingDepth <= 1000

*/

/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
var areDeeplyEqual = function(o1, o2) {
    let eq = typeof o1 === typeof o2;
    if (!eq) {
      return eq;
    } else if (typeof o1 === 'number' && isNaN(o1)) {
      eq = eq && isNaN(o2);
    } else if (typeof o1 === 'string') {
      eq = eq && o1 === o2;
    } else if (Array.isArray(o1) && Array.isArray(o2)) {
      eq = eq && o1.reduce((_eq, v, idx) => _eq && areDeeplyEqual(v, o2[idx]), o1.length === o2.length);
    } else if (!Array.isArray(o1) && !Array.isArray(o2) && typeof o1 === 'object') {
      for (let key in o1) {
        eq = eq && areDeeplyEqual(o1[key], o2[key]);
        if (!eq) { break; }
      }
    } else {
      eq = eq && o1 === o2;
    }

    return eq;
};
