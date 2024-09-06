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
 * @param {number[]} groups
 * @param {number} level
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root, groups = [], level = 0) {
  if (!root) { return groups; }
  groups[level] = groups[level] || [];

  if (level % 2 === 0) {
    groups[level].push(root.val);
  } else {
    groups[level].unshift(root.val);
  }
  
  zigzagLevelOrder(root?.left, groups, level + 1);
  
  zigzagLevelOrder(root?.right, groups, level + 1);
  
  return groups;
};
