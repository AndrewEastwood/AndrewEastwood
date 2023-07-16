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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
  const matchedPaths = [];
  const walker = (node, path = [], pathSum = 0) => {
    if (!node) {
      return; 
    }
    walker(node.left, [...path, node.val], pathSum + node.val);
    walker(node.right, [...path, node.val], pathSum + node.val);
    if (!node.left && !node.right && pathSum + node.val === targetSum) {
      matchedPaths.push([...path, node.val]);
    }
  }
  walker(root);
  return matchedPaths;
};

pathSum([5,4,8,11,null,13,4,7,2,null,null,5,1], 22); // [[5,4,11,2],[5,8,4,5]]
