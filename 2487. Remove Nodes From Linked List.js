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
var removeNodes = function(head) {
  let tip = head;
  let tail = head;
  let prev = null;
  while (true) {
    tail.prev = prev;
    prev = tail;
    tail = tail.next;
    if (!tail) {
      tail = prev;
      break;
    }
  }

  // reverse order
  let ptr = tail;
  let lastMax = tail.val;
  while (ptr) {
    ptr = ptr.prev;
    if (!ptr) {
      break;
    }
    if (lastMax > ptr.val) {
      if (!ptr.prev) {
        head = head.next;
      } else {
        ptr.prev.next = ptr.next;
      }
    } else {
      lastMax = ptr?.val;
    }
  }

  return head;
};
