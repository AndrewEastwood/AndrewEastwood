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
