// loop through the array
// pick the next min value than is smaller of [i]th value
// swap it
// Best/Worst: O(N^2)
const sortSelection = function (nums1) {
  const { length } = nums1;
  let minIndex;
  for (let i = 0; i < length; i++) {
    minIndex = i;
    // inspect the rest and find the smaller value than the [i]th one
    for (let j = i; j < length; j++) {
      if (nums1[j] < nums1[minIndex]) {
        minIndex = j;
      }
    }
    // swap
    [ nums1[i], nums1[minIndex] ] = [ nums1[minIndex], nums1[i] ];
  }
  return nums1;
}
