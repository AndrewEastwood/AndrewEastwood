/*

You are given two strings s and t.

String t is generated by random shuffling string s and then add one more letter at a random position.

Return the letter that was added to t.

 

Example 1:

Input: s = "abcd", t = "abcde"
Output: "e"
Explanation: 'e' is the letter that was added.
Example 2:

Input: s = "", t = "y"
Output: "y"
 

Constraints:

0 <= s.length <= 1000
t.length == s.length + 1
s and t consist of lowercase English letters.

*/

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
  const [largerStr, smallerStr] = s.length > t.length ? [s, t] : [t, s];
  const charMap = {};

  for (let char of largerStr) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  for (let char of smallerStr) {
    charMap[char]--;
    if (charMap[char] === 0) {
      delete charMap[char];
    }
  }

  console.log(Object.keys(charMap)[0])

  return Object.keys(charMap)[0];
};
