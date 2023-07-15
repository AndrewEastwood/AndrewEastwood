const sortMerge = function (nums1) {
  const merge = (left, right) => {
    const result = [];
    const { length:lenL } = left;
    const { length:lenR } = right;
    let lIdx = 0;
    let rIdx = 0;
    while (lenL > lIdx && lenR > rIdx) {
      if (left[lIdx] > right[rIdx]) {
        result.push(right[rIdx]);
        rIdx++;
      } else {
        result.push(left[lIdx]);
        lIdx++;
      }
    }
    // append what was not included at the loop above
    // means some leftovers are bigger then the added ones
    while (lenL > lIdx) {
      result.push(left[lIdx]);
      lIdx++;
    }
    while (lenR > rIdx) {
      result.push(right[rIdx]);
      rIdx++;
    }
    return result;
  }
  const partition = (arr) => {
    const { length } = arr;
    if (length > 1) {
      const mid = Math.floor(length / 2);
      const left = partition(arr.slice(0, mid));
      const right = partition(arr.slice(mid, length));
      arr = merge(left, right);
      console.log(left, right, '=>', arr)
    }
    return arr;
  }

  return partition(nums1);
}
