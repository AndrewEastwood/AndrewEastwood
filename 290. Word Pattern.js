/*

Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

 

Example 1:

Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Example 2:

Input: pattern = "abba", s = "dog cat cat fish"
Output: false
Example 3:

Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
 

Constraints:

1 <= pattern.length <= 300
pattern contains only lower-case English letters.
1 <= s.length <= 3000
s contains only lowercase English letters and spaces ' '.
s does not contain any leading or trailing spaces.
All the words in s are separated by a single space.

*/

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    // map char to word
    let wordToChar = Object.create(null);
    let charToWords = Object.create(null);
    let words = s?.split(' ') ?? [];

    if (pattern?.length !== words.length) { 
       return false;
    }

    // each word gets its own char
    // and each char gets own word
    // but we break this loop when we get
    // unmatching situiation
    for (let idx in words) {
      if (words[idx] in wordToChar && wordToChar[words[idx]] !== pattern[idx]) {
        return false;
      }
      if (pattern[idx] in charToWords && charToWords[pattern[idx]] !== words[idx]) {
        return false;
      }
      wordToChar[words[idx]] = pattern[idx];
      charToWords[pattern[idx]] = words[idx];
    }

    return true;
};
