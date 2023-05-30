/*

Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result.
Note:

Only the space character ' ' is considered a whitespace character.
Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.


*/

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let result = [];
    let isNegative = null;
    let idx = 0;
    let chrCode;
    const min = (-2) ** 31;
    const max = 2 ** 31 - 1;
    do {
      chrCode = s.charCodeAt(idx++);
      if (chrCode === 45) {
        if (result.length === 0 && isNegative === null) { isNegative = true; }
        else { break; }
      }
      else if (chrCode === 43) {
        if (result.length === 0 && isNegative === null) { isNegative = false; }
        else { break; }
      }
      else if (chrCode >= 48 && chrCode <= 57) { result.push(chrCode - 48); }
      else if (chrCode === 32) {
        if (result.length === 0 && isNegative === null) { continue; }
        else { break; }
      }
      else { break; }
    } while (true);

    let r = result.reduce((r, v, idx, d) => {
      return r + v * 10 ** (d.length - idx - 1);
    }, 0) * (isNegative ? -1 : 1);

    if (isNegative && r < min) {
      r = min;
    }
    if (!isNegative && r > max) {
      r = max;
    }

    return r;
};
