const findPivot = nums => {
  const lookup = (nums, left, right) => {
    const midIdx = left + Math.floor((right - left) / 2);
    // check mid value and its
    if (left === right) { return left; }
    if (left > right) { return -1; }
    if (nums[midIdx] > nums[midIdx + 1]) { return midIdx + 1; }
    if (nums[midIdx - 1] > nums[midIdx] && nums[midIdx] < nums[midIdx + 1]) { return midIdx; }
  
    if (nums[midIdx] > nums[right]) {
      return lookup(nums, midIdx + 1, right);
    }
    return lookup(nums, left, midIdx - 1);
  }
  return lookup(nums, 0, nums.length);
}

// success:
findPivot([1,2,3,4,5,6,7,0], 0, 7)
findPivot([2,3,4,5,6,7,0,1], 0, 7)
findPivot([7,0,1,2,3,4,5,6], 0, 7)
findPivot([0,1,2,3,4,5,6,7], 0, 7)
findPivot([5,6,7,0,1,2,3,4], 0, 7)
