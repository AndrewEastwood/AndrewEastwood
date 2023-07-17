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
var minDepth = function(root) {
  let minH = root ? 1 * 2 ** 31 : 0;
  const walker = (node, lvl = 0) => {
    if (!node) { return; }
    walker(node.left, lvl + 1);
    walker(node.right, lvl + 1);
    if (!node.left && !node.right) {
      minH = Math.min(minH, lvl + 1);
    }
  }
  walker(root);
  return minH;
};

minDepth([3,9,20,null,null,15,7]); // 2
