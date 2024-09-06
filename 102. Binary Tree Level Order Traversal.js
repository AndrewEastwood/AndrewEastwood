/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} node
 * @param {number[]} values
 * @param {number} level
 * @return {number[][]}
 */
var levelOrder = function(node, values = [], level = 0) {
  if (!node) { return values; }
  values[level] = values[level] || [];
  values[level].push(node.val);
  // left node
  levelOrder(node?.left, values, level + 1);
  // right node
  levelOrder(node?.right, values, level + 1);
  return values;
};
