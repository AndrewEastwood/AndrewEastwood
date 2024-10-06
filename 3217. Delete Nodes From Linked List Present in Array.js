/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function(nums, head) {
  if (!head) { return head; }

  let excludeValues = new Set(nums);
  while (excludeValues.has(head.val)) {
    head = head.next;
  }

  let ptr = head;
  while (ptr) {
    if (ptr.next) {
      if (excludeValues.has(ptr.next.val)) {
        ptr.next = ptr.next.next;
      } else {
        ptr = ptr.next;
      }
    } else {
      break;
    }
  }

  return head;
};
