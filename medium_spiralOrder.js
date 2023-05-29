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
