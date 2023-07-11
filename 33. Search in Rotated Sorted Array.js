/*

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.


Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
 

Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  if (nums[0] === target) { return 0; }
  if (nums.at(-1) === target) { return nums.length - 1; }

  const pivotAt = findPivot(nums);
  console.log('pivot=', pivotAt, 'pivotVal', nums[pivotAt]);

  if (pivotAt === -1) { return searchBinary(nums, target); }
  if (nums[pivotAt] === target) { return pivotAt; }
  

  if (nums[0] <= target && target <= nums[pivotAt - 1]) {
    // search [0...pivot]
    return searchBinary(nums.slice(0, pivotAt), target);
  }
  // search [pivot...n]
  const result = searchBinary(nums.slice(pivotAt), target);
  return result >= 0 ? result + pivotAt : -1;
};

const searchBinary = (nums, val) => {
  console.log('searchBinary', nums, val);
  const _search = (nums, left, right) => {
    const mid = left + Math.floor((right - left) / 2);
    if (left > right) {
      return -1;
    }
    if (nums[mid] === val) { return mid; }
    if (val < nums[mid]) {
      return _search(nums, left, mid - 1);
    }
    return _search(nums, mid + 1, right);
  }

  return _search(nums, 0, nums.length - 1);
}

const findPivot  = (nums) => {
  const _search = (nums, left, right) => {
    if (left === right) { return left; }
    
    if (left > right) { return -1; }

    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] > nums[mid + 1]) { return mid + 1; }
    if (nums[mid - 1] > nums[mid] && nums[mid] < nums[mid + 1]) { return mid; }

    if (nums[mid] > nums[right]) {
      return _search(nums, mid + 1, right);
    }
    return _search(nums, left, mid - 1);
  }

  return _search(nums, 0, nums.length - 1);
}
