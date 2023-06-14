/*

Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 104].
0 <= Node.val <= 105
 

Note: This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {

  // fast cheks
  if (!root) { return 0; }


  let values = [];
  const collectValues = (head) => {
    if (head.left) { collectValues(head.left); }
    values.push(head.val);
    if (head.right) { collectValues(head.right); }
  }
  collectValues(root);

  let diff = 2 ** 31;
  for (let i = 0; i < values.length - 1; i++) {
    diff = Math.min(diff, Math.abs(values[i] - values[i + 1]))
  }
  console.log(values);
  
  return diff;
};
