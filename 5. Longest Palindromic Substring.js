/*

Given a string s, return the longest 
palindromic
 
substring
 in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.

*/

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s = '') {
    const variations = [];

    if (s.length === 1) { return s; }
    if (s.length === 2) { return s[0] === s[1] ? s : s[0]; }

    variations.push(s[0]);

    for (let i = 0; i < s.length; i++) {
        let rightOffset = 1;
        let leftOffset = 1;
        let tmpStr = '';
        if (s[i] === s[i + 1]) {
            tmpStr = s[i] + s[i + 1];
            rightOffset = 2;
            while (true) {
                if (s[i - leftOffset] && s[i - leftOffset] === s[i + rightOffset]) {
                    tmpStr = s[i - leftOffset] + tmpStr + s[i + rightOffset];
                    rightOffset++;
                    leftOffset++;
                } else {
                    break;
                }
            }
            tmpStr.length >= 2 ? variations.push(tmpStr) : void 0;
        }

        rightOffset = 1;
        leftOffset = 1;
        tmpStr = s[i];
        while (true) {
            if (s[i - leftOffset] && s[i - leftOffset] === s[i + rightOffset]) {
                tmpStr = s[i - leftOffset] + tmpStr + s[i + rightOffset];
                rightOffset++;
                leftOffset++;
            } else {
                break;
            }
        }
        tmpStr.length >= 2 ? variations.push(tmpStr) : void 0;
    }

    return variations.sort((a, b) => a.length - b.length).pop();
};
