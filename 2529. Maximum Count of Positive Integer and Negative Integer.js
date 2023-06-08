/*

Given an array nums sorted in non-decreasing order, return the maximum between the number of positive integers and the number of negative integers.

In other words, if the number of positive integers in nums is pos and the number of negative integers is neg, then return the maximum of pos and neg.
Note that 0 is neither positive nor negative.

Example 1:

Input: nums = [-2,-1,-1,1,2,3]
Output: 3
Explanation: There are 3 positive integers and 3 negative integers. The maximum count among them is 3.
Example 2:

Input: nums = [-3,-2,-1,0,0,1,2]
Output: 3
Explanation: There are 2 positive integers and 3 negative integers. The maximum count among them is 3.
Example 3:

Input: nums = [5,20,66,1314]
Output: 4
Explanation: There are 4 positive integers and 0 negative integers. The maximum count among them is 4.
 

Constraints:

1 <= nums.length <= 2000
-2000 <= nums[i] <= 2000
nums is sorted in a non-decreasing order.
 

Follow up: Can you solve the problem in O(log(n)) time complexity?

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function(nums) {
  const indexOfZeroStart = nums.indexOf(0);
  const indexOfZeroEnd = nums.lastIndexOf(0);

  // with 0 case
  if (indexOfZeroStart >= 0) {
    if (indexOfZeroEnd > indexOfZeroStart) {
      return Math.max(indexOfZeroStart, nums.length - indexOfZeroEnd - 1);
    }
    return Math.max(indexOfZeroStart, nums.length - indexOfZeroStart - 1);
  }

  // another way
  let skipNegatives = -1;
  while (nums[++skipNegatives] < 0);

  return Math.max(skipNegatives, nums.length - skipNegatives);
};
