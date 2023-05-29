/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
    const uniqSet1 = new Set(nums1);
    const uniqSet2 = new Set(nums2);
    return [[...uniqSet1].filter(v => !uniqSet2.has(v)), [...uniqSet2].filter(v => !uniqSet1.has(v))];
};
