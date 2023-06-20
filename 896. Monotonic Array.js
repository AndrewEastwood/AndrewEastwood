/*

An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].

Given an integer array nums, return true if the given array is monotonic, or false otherwise.

Example 1:

Input: nums = [1,2,2,3]
Output: true
Example 2:

Input: nums = [6,5,4,4]
Output: true
Example 3:

Input: nums = [1,3,2]
Output: false
 

Constraints:

1 <= nums.length <= 105
-105 <= nums[i] <= 105

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function(nums) {
  const isIncreasing = nums.at(0) < nums.at(-1);
  let lastVal = nums.at(0);

  for (let i = 1; i < nums.length; i++) {
    if (isIncreasing) {
      if (nums[i] >= lastVal) {
        lastVal = nums[i];
        continue;
      }
      return false;
    } else {
      if (lastVal >= nums[i]) {
        lastVal = nums[i];
        continue;
      }
      return false;
    }
  }
  return true;
};
