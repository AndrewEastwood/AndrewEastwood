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
 * @return {boolean}
 */
var isValidBST = function(root) {
  const walk = (node, min, max) => {
    if (!node) { return true; }

    // the left node with min...max ranges
    const l = walk(node.left, min, node.val - 1);

    if (min > node.val || node.val > max) {
      return false;
    }

    // the right node with min...max ranges
    const r = walk(node.right, node.val + 1, max);
    return l && r;
  }

  // fast check
  if (!root) { return true; }
  if (!root.left && !root.right) { return true; }

  return walk(root, -1 * 2 ** 31, 2 ** 31);
};

isValidBST([32,26,47,19,null,null,56,null,27]); // false
isValidBST([2,1,3]); // true
