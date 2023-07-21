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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const walk = (node, v = []) => {
    if (!node) { return v; }
    v.push(node.val);
    walk(node.left, v);
    walk(node.right, v);
    return v;
  }
  return walk(root);
};

preorderTraversal([1, null, 2, 3]); // [1,2,3]
