// comare current & next
// swap it
// shift pointers to +1
// keep until reach the end of the array
// each interation decrease scan path by 1
// becase the last elements are larger then the reamining ones
// Best O(N) / Worst: O(N^2)
const sortBubble = function(nums1) {
  const { length } = nums1;
  for (let i = 0; i < length; i++) {
    // here we go to the end of the array but
    // after each top-level interation
    // we reduce the ending,
    // because we have the biggest value there already
    // when the inner loop comletes
    for (let j = 0; j < length - 1 - i; j++)
      if (nums1[j] > nums1[j + 1]) {
        [ nums1[j], nums1[j + 1] ] = [ nums1[j + 1], nums1[j] ];
      }
  }
  return nums1;
};
