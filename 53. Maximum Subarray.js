/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let runtimeMax = 0;
    let generalMax = -1 * 2 ** 31;
    for (let i = 0; i < nums.length; i++) {
      runtimeMax = Math.max(nums[i], runtimeMax + nums[i]);
      generalMax = Math.max(generalMax, runtimeMax);
    }
    return generalMax;
};
