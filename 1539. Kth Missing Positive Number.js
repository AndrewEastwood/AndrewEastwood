/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
    let mappedIndexces = [];
    for (let i = 0; i < arr.length; i++) {
        mappedIndexces[arr[i]] = 1;
    }
    mappedIndexces.length++;
    let ptr = 0;
    while (k-- >= 0) {
        while (mappedIndexces[ptr++]);
    }
    return ptr - 1;
};
