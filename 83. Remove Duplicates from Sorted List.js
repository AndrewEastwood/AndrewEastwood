/*

Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Example 1:


Input: head = [1,1,2]
Output: [1,2]
Example 2:


Input: head = [1,1,2,3,3]
Output: [1,2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.

*/

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
var deleteDuplicates = function(head) {
    let walkedValues = new Set();
    let current = head;
    let cursor = head;

    if (!head) { return null; }
    if (!head.next) { return head; }

    walkedValues.add(head.val);

    while (cursor.next) {
      cursor = cursor.next;
      if (walkedValues.has(cursor.val)) {
        // trim last node
        if (!cursor.next) {
          current.next = null;
        }
        continue;
      }
      walkedValues.add(cursor.val);
      current.next = cursor;
      current = cursor;
    }
    return head;
};
