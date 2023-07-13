/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function(head) {
  const listSize = (pt, s = 1) => pt.next ? listSize(pt.next, s + 1) : s;

  let curr = head;
  let seenCount = 0;
  let size = listSize(head);
  const midIdx = Math.floor(size / 2);

  // basic checks
  if (size === 0) { return null; }
  if (size === 1) { return null; }
  if (size === 2) {
    head.next = null;
    return head;
  }

  console.log('midIdx', midIdx);

  while (curr) {
    seenCount++;
    if (seenCount === midIdx) {
      curr.next = curr.next.next ?? null;
      curr = curr.next;
    } else {
      curr = curr.next;
    }
  }

  return head;
};
