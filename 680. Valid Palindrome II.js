/*

Given a string s, return true if the s can be palindrome after deleting at most one character from it.


Example 1:

Input: s = "aba"
Output: true
Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
Example 3:

Input: s = "abc"
Output: false
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.

*/

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {

  const isPalindrome = t => {
    let l = 0, r = t.length - 1;
    if (t.length === 0 || t.length === 1) { return true; }
    while (l < r && t[l] === t[r]) {
      l++;
      r--;
    }
    return t[l] === t[r];
  }

  // immediate check
  if (isPalindrome(s)) { return true; }

  let leftChars = '';
  let rightChars= '';
  // inspect missmatch char
  for (let l = 0, r = s.length - 1; l <= r;) {
    // left & right are equal
    if (s[l] === s[r]) {
      leftChars += s[l];
      rightChars = s[r] + rightChars;
      l++;
      r--;
      continue;
    }

    if (isPalindrome(leftChars + s.slice(l, r) + rightChars)) {
      return true;
    }

    if (isPalindrome(leftChars + s.slice(l + 1, r + 1) + rightChars)) {
      return true;
    }

    return false;
  }

  return true;
};
