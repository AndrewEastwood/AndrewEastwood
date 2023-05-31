/*

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters.
No two characters may map to the same character, but a character may map to itself.


Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true

*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    // set map; any char of the S gets mapped to char from the T
    let tCharsToSCharsMap = {};
    for (let cIdx in s) {
      // early break, when postion does not match
      if (s[cIdx] in tCharsToSCharsMap && tCharsToSCharsMap[s[cIdx]] !== t[cIdx]) {
        return false;
      }
      tCharsToSCharsMap[s[cIdx]] = t[cIdx];
    }

    // we need this reversed map of chars
    // for building the 'S' string
    let reverseMap = Object
      .entries(tCharsToSCharsMap)
      .reduce((r, v) => ({ ...r, [v[1]]: v[0], }), {});

    // build S from T using the reverse map;
    let newSbyT = '';
    for (let c of t) {
      newSbyT += reverseMap[c];
    }

    // compare
    return newSbyT === s;
};
