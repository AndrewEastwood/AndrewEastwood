/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  let ptr = head;
  let leftPartition = null;
  let leftTailPtr;
  let rightPartition = null;
  let righTailPtr;
  while (ptr) {
    if (ptr.val < x) {
      if (!leftPartition) {
        leftPartition = { ...ptr, next: null };
        leftTailPtr = leftPartition;
      } else {
        leftTailPtr.next = { ...ptr, next: null };
        leftTailPtr = leftTailPtr.next;
      }
    }
    if (ptr.val >= x) {
      if (!rightPartition) {
        rightPartition = { ...ptr, next: null };
        righTailPtr = rightPartition;
      } else {
        righTailPtr.next = { ...ptr, next: null };
        righTailPtr = righTailPtr.next;
      }
    }
    ptr = ptr.next;
  }

  if (leftTailPtr && rightPartition) {
    leftTailPtr.next = rightPartition;
  }

  return leftPartition ?? rightPartition;
};
