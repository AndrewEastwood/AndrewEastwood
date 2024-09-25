// https://leetcode.com/problems/reverse-bits/description/

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var memo = {};
var reverseBits = function(n) {
  if (n in memo) { return memo[n]; }
  memo[n] = 0;
  const binStr = n.toString(2).padStart(32, '0');
  const { length } = binStr;
  let bitResult = 0;
  for (let i = 0, pow = 0; i < length; i++, pow++) {
    bitResult = (2 ** pow) * (+binStr[i]);
    memo[n] += bitResult;
  }
  return memo[n];
};
