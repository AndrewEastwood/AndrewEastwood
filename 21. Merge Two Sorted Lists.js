/*

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.


Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.

*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  let [
    head, curr1, curr2
  ] = list1?.val >= list2?.val
      ? [list2, list1, list2?.next]
      : [list1, list1?.next, list2];

  let curr = head;
  let tmp;


  if (!list1 && list2) { return list2; }
  if (!list2 && list1) { return list1; }
  if (!head) { return null; }

  curr.next = null;

  while (curr1 && curr2) {
    if (curr1.val >= curr2.val) {
      curr.next = curr2;
      curr2 = curr2.next;
    } else {
      curr.next = curr1;
      curr1 = curr1.next;
    } 
    curr = curr.next;
  }

  if (curr1 || curr2) {
      curr.next = curr1 || curr2;
  }

  return head;
};
