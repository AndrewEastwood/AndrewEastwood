/*

Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

 

Example 1:

Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.
Example 2:

Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.
Example 3:

Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
1 <= k <= s.length

*/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var isMatch = c => c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
var maxVowels = function(s, k) {
    var mxV = s.substring(0, k).split('').filter(isMatch).length;
    var tmpMxV = mxV;
    for (let start = 0, end = k; end < s.length; end++, start++) {
        if (isMatch(s[start])) {
            tmpMxV--;
        }
        if (isMatch(s[end])) {
            tmpMxV++;
        }
        mxV = Math.max(mxV, tmpMxV);
    }
    return mxV;
};
