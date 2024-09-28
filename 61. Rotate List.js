/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  if (!head) { return null; }
  if (!k) { return head; }

  let tailPtr = head;
  let size = 1;
  while (tailPtr.next) {
    tailPtr = tailPtr.next;
    size++;
  }

  if (size === k) {
    return head;
  }

  tailPtr.next = head;

  // console.log('headPtr', head.val);
  // console.log('tailPtr', tailPtr.val);
  // console.log('list size', size);
  // console.log('rotate by', k);

  let tmpPtr = head;
  let shiftCount = size - k % size
  while (--shiftCount) {
    tmpPtr = tmpPtr.next;
  }

  const newHeadPtr = tmpPtr.next;
  tmpPtr.next = null;

  return newHeadPtr;
};
