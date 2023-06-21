/*

Given a string s, return the string after replacing every uppercase letter with the same lowercase letter.


Example 1:

Input: s = "Hello"
Output: "hello"
Example 2:

Input: s = "here"
Output: "here"
Example 3:

Input: s = "LOVELY"
Output: "lovely"
 

Constraints:

1 <= s.length <= 100
s consists of printable ASCII characters.

*/

/**
 * @param {string} s
 * @return {string}
 */
var toLowerCase = function(s) {
  // A..Z => 65..90
  // a..z => 97..122
  // Upper to lower diff is 32
  return s.split('')
    .map(c => {
      if (65 <= c.charCodeAt() && c.charCodeAt() <= 90) {
        return String.fromCharCode(c.charCodeAt() + 32);
      }
      return c;
    })
    .join('');
};
