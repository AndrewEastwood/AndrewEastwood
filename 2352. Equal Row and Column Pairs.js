/*

Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.

A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

 

Example 1:


Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: There is 1 equal row and column pair:
- (Row 2, Column 1): [2,7,7]
Example 2:


Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
Output: 3
Explanation: There are 3 equal row and column pairs:
- (Row 0, Column 0): [3,1,2,2]
- (Row 2, Column 2): [2,4,2,2]
- (Row 3, Column 2): [2,4,2,2]
 

Constraints:

n == grid.length == grid[i].length
1 <= n <= 200
1 <= grid[i][j] <= 105

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function(grid) {
  let rowSums = grid.
    reduce((m, row) => {
      const rowKey = row.join();
      return {
        ...m,
        // set/increase same row occurance
        [rowKey]: (m[rowKey] || 0) + 1,
      };
    }, {});
  let matchCount = 0;
  let colKey = 0;
  for (let i = 0; i < grid.length; i++) {
    colKey = grid.map(row => row[i]).join();
    if (colKey in rowSums) {
      // add occurance when matching column is found
      matchCount = matchCount + rowSums[colKey];
    }
  }
  return matchCount;
};
