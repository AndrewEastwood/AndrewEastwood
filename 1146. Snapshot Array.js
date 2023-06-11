/*

Implement a SnapshotArray that supports the following interface:

SnapshotArray(int length) initializes an array-like data structure with the given length. Initially, each element equals 0.
void set(index, val) sets the element at the given index to be equal to val.
int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id
 

Example 1:

Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
 

Constraints:

1 <= length <= 5 * 104
0 <= index < length
0 <= val <= 109
0 <= snap_id < (the total number of times we call snap())
At most 5 * 104 calls will be made to set, snap, and get.

*/

/**
 * @param {number} length
 */
var SnapshotArray = function(length) {
  /*

    {
      [index]: {
        _directSnapIds: [0, 1, 8],
        [snapId]: val,
        0: 0,
        1: 5,
        2,3,4,5,6,7: is 5 (same as #1),
        8: 6,
      },
      get (snapId = 3) {
        return 5; 5 is since snapId=1 till snapId=8
      }
    }

  */
  this.arrayLike = {};
  this.runtimeSnapShotId = 0;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function(index, val) {
  this.arrayLike[index] = this.arrayLike[index] || { _directSnapIds: [], };
  this.arrayLike[index][this.runtimeSnapShotId] = val;
  this.arrayLike[index]._directSnapIds[this.runtimeSnapShotId] = this.runtimeSnapShotId;
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function() {
  return this.runtimeSnapShotId++;
};

SnapshotArray.prototype.reset = function () { this.arrayLike = {}; this.runtimeSnapShotId = 0; }

/** 
 * @param {number} index 
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function(index, snap_id) {

  // no index in store -> default 0
  if (!(index in this.arrayLike)) { return 0; }

  const indexStore = this.arrayLike[index] || { };

  // exact match by snap id
  if (snap_id in indexStore) {
    return indexStore[snap_id];
  }

  // unknown snap id or greater then the latest one
  if (snap_id > indexStore._directSnapIds.at(-1) || snap_id > this.runtimeSnapShotId) {
    return indexStore[indexStore._directSnapIds.at(-1)];
  }

  // get the nearest value of sanpshot
  const prevDirectSetSnapId = indexStore._directSnapIds.slice().reverse().find(v => v <= snap_id);
  return indexStore[prevDirectSetSnapId] ?? 0;
};

/** 
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(0)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */
