// walk from the current to 0 and compare
// Best O(N) / Worst: O(N^2)
// input: [6,3,1,5,0]
//           ^
//         start
// example of inner iteration:
// 3, 6,[1],5,0 | i=2,j=2,tmp=1
// 3,[6],6, 5,0 | j-- (j=1)
// 3, 3, 6, 5,0 | j-- (j=0,break)
// 1, 3, 6, 5,0 | set tmp at #0 pos (j==0)
const sortInsertion = function (nums1) {
  const { length } = nums1;
  let tmp, j;
  for (let i = 1; i < length; i++) {
    tmp = nums1[i]; // memo the value at [i]th position
    j = i; // set the second pointer
    // start comparing the memo with the prev elements
    // keep going until
    // we are not at 0 index and the prev el is bigger than the memoed one
    while (j > 0 && nums1[j - 1] > tmp) {
      // bring the previous bigger value
      // into the current position (shift to the right)
      // re-write [j] elements with the [j - n]
      // until the tmp, which is [i]th el
      // is less the [j]th element
      nums1[j] = nums1[j - 1];
      // reduce the index
      j--;
    }
    nums1[j] = tmp;
  }
  return nums1;
}
