/*

The string "PAYPALISHIRING" is written in a zigzag pattern on a given
number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
 

Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"
 

Constraints:

1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000

*/

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if (numRows <= 1) { return s; }

  let n = 0;
  let width = Math.ceil(s.length / 2);
  let rows = new Array(numRows).fill('').map(v => new Array(width).fill(''));

  for (let colIdx = 0; colIdx <= width && n < s.length; colIdx++) {
    // column fill
    if (colIdx % (numRows - 1) === 0) { 
      for (let i = 0; i < numRows; i++) {
        rows[i][colIdx] = s[n++] ?? '';
      }
    } else {
      // uphill fill
      for (let k = numRows - 2; k > 0; k--) {
        rows[k][colIdx] = s[n++] ?? '';
        colIdx++;
      }
      colIdx--;
    }
  }

  return rows.map(r => r.join('')).join('');
};
