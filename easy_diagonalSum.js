/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function(mat) {
    const rows = mat.length || 0;

    let leftSum = 0;
    let rightSum = 0;

    for (let i = 0, j = rows - 1; i < rows; i++, j--) {
        leftSum += mat[i][i];
        if (i !== j) {
            rightSum += mat[i][j];
        }
    }

    return leftSum + rightSum;
};
