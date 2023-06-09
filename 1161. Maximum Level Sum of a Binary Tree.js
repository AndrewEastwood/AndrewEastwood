/*

Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

Example 1:


Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
Example 2:

Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-105 <= Node.val <= 105

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
var maxLevelSum = function(root) {
  let levelToSum = {};

  // fast checks
  if (!root) { return 0; }
  if (!root.left && !root.right) { return 1; }

  const walkTree = (head, level = 1) => {
    levelToSum[level] = levelToSum[level] || 0;
    if (head.left) {
      walkTree(head.left, level + 1);
    }
    if (head.right) {
      walkTree(head.right, level + 1);
    }
    levelToSum[level] += head.val;
  }

  walkTree(root);

  let maxLevelSum = -1 * 2 ** 31;
  let maxLevelSumIndex = 1;
  Object
    .entries(levelToSum)
    .forEach(entry => {
      if (entry[1] > maxLevelSum) {
        maxLevelSum = entry[1];
        maxLevelSumIndex = entry[0];
      }
    });
  return maxLevelSumIndex;
};
