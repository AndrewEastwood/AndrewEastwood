/*

Given a positive integer num represented as a string, return the integer num without trailing zeros as a string.

Example 1:

Input: num = "51230100"
Output: "512301"
Explanation: Integer "51230100" has 2 trailing zeros, we remove them and return integer "512301".
Example 2:

Input: num = "123"
Output: "123"
Explanation: Integer "123" has no trailing zeros, we return integer "123".
 

Constraints:

1 <= num.length <= 1000
num consists of only digits.
num doesn't have any leading zeros.

*/

/**
 * @param {string} num
 * @return {string}
 */
var removeTrailingZeros = function(num) {
  if (num.length === 0) { return ""; }
  if (num === "0".repeat(num.length)) { return ""; }
  if (num.at(-1) !== "0") { return num; }

  let lastNonZeroChar = num.length - 1;
  while(num[lastNonZeroChar--] === '0');

  return num.substring(0, lastNonZeroChar + 2);
};
