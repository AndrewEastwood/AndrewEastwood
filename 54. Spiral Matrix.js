/*

Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:


Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100

*/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const result = [];

    do {
        result.push(...(matrix.shift() ?? []));
        for (var i = 0; i < matrix.length; i++) {
            result.push(matrix[i].pop());
        }
        matrix = matrix.filter(v => v.length > 0);
        result.push(...(matrix.pop()?.reverse() ?? []));
        for (var i = matrix.length - 1; i >= 0 ; i--) {
            result.push(matrix[i].shift());
        }
        matrix = matrix.filter(v => v.length > 0);
    } while (matrix.length > 0)

    return result;
};
