
// i> 44, 2, 1,66, 8,33, 2, 1, 0, 3,22 <j
//                   ^
//                 pivot
//    22, 2, 1,66, 8,33, 2, 1, 0, 3,44 | i=0;j=11 swap; i=1;j=10;
//    22, 2, 1, 3, 8,33, 2, 1, 0,66,44 | i=3;j=10 swap; i=4;j=9
//                               ^
//                          i reached j at #9
//                          so we return i (#9)
const sortQuick = function (nums1) {
  const partition = (arr, left, right) => {
    const pivotPos = Math.floor((right - left) / 2);
    const pivotVal = arr[pivotPos];
    let i = left, j = right;
    // i goes to the right, while j goes to the left
    // until they reach each other
    // left { [i]th elements .... [pivotVal] .... [j]th elements } right
    while (i <= j) {
      while (arr[i] < pivotVal) { i++; } // inspect the lefts; they have to be smaller than the pivot
      while (arr[j] > pivotVal) { j--; } // inspect the rights; they have to be larger than the pivot
      // here we reached where the [i]th is larger and the [j]th is smaller
      // then swap them
      if (i <= j) {
        [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
        // continue walk to the pivot
        i++;
        j--;
      }
    }
    return i;
  }
  const quick = (arr, left, right) => {
    const { length } = arr;
    if (length > 1) {
      let nextPivotIndex = partition(arr, left, right);
      if (left < nextPivotIndex - 1) {
        quick(arr, left, nextPivotIndex - 1);
      }
      // we have not reached the right yet
      if (nextPivotIndex + 1 < right) {
        quick(arr, nextPivotIndex + 1, right);
      }
    }
    return arr;
  }
  return quick(nums1, 0, nums1.length - 1);
}
