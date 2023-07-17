/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  const walk = (nodeA, nodeB) => {
    if (!nodeA && !nodeB) { return true; }
    if (nodeA?.val !== nodeB?.val) { return false; }
    return walk(nodeA.left, nodeB.left) && walk(nodeA.right, nodeB.right);
  }
  return walk(p ,q);
};


isSameTree([10,5,15], [10,5,null,null,15]); // false
