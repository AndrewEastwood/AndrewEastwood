// loop through the array forward
// pick the next min value [j], which is smaller than [i]th value
// swap them [i]<=>[j], and move the [i] to the next one
// Best/Worst: O(N^2)
// 3,4,5,1,8,9
// ^ ^ | |
// ^   ^ |
// ^     ^ <--- swap because [j](1) is less then the [i](3)
// 1,4,5,3,8,9
//   ^ ^ and so on
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
