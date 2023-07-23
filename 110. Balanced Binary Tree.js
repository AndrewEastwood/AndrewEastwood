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
var isBalanced = function (root) {
  const walker = (node) => {
    if (!node) {
      return 0;
    }
    const l = walker(node.left);
    if (l === -1) { return -1; }
    const r = walker(node.right);
    if (r === -1) { return -1; }

    if (Math.abs(l - r) > 1) {
      return -1;
    }

    return Math.max(l, r) + 1;
  }

  if (!root) { return true; }
  if (!root.left && !root.right) { return true; }

  const result = walker(root);

  return result !== -1;
};
