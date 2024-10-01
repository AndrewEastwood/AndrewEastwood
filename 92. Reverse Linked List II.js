/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  if (!head || !head.next) { return head; }
  if (left === right) { return head; }

  const leftExtraEdge = new ListNode(undefined, head);
  const rightExtraEdge = new ListNode();

  leftExtraEdge.val = undefined;
  rightExtraEdge.val = undefined;

  let ptr = leftExtraEdge;
  let prev = null;
  let walkedCount = 1;
  let rPtr = null;
  let reversedCount = right - left;

  do {
    if (walkedCount === right + 1) {
      rPtr = ptr;
    }
    ptr.prev = prev;
    prev = ptr;
    ptr = ptr.next ? ptr.next : ptr.next = { val: undefined, next: null };
    walkedCount++;
  } while (ptr.val !== undefined)

  const reverseList = (nodePtr, count = 0) => {
    // reverse list
    let tailPtr = nodePtr;
    let headPtr = nodePtr;
    let pulledNode;
    let newPrev;
    let tmp;
    while (headPtr.prev.prev && count--) {
      // pull out prev node
      pulledNode = headPtr.prev;
      newPrev = pulledNode.prev;
      // reset connections
      pulledNode.next = null;
      pulledNode.prev = null;
      // re-link new prev with current head
      newPrev.next = headPtr;
      headPtr.prev = newPrev;

      // insert tmp node after tail node
      // memo tail next node
      tmp = tailPtr.next;
      // insert pulled node after the tail
      tailPtr.next = pulledNode;
      // re-link connections with inserted node
      pulledNode.next = tmp;
      pulledNode.prev = tailPtr;
      tmp.prev = pulledNode;

      // shift tail pointer
      tailPtr = pulledNode;
    }
    return headPtr;
  }

  const newHead = reverseList(rPtr, reversedCount);

  let result;

  ptr = newHead;
  while (true) {
    if (ptr.next.val === undefined) {
      ptr.next = null;
      while (true) {
        if (ptr.prev.val === undefined) {
          ptr.prev = null;
          result = ptr;
          break;
        }
        ptr = ptr.prev;
      }
      break;
    }
    ptr = ptr.next;
  }

  return result;
};
