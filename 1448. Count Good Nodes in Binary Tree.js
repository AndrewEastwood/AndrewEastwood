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
var goodNodes = function(root) {
  let goodNodesCount = 0;
  let walkTree = (node, pathMax = -1 * 2 ** 31) => {
    if (!node) { return; }
    walkTree(node.left, node.val > pathMax ? node.val : pathMax);
    walkTree(node.right, node.val > pathMax ? node.val : pathMax);
    //console.log(pathMax, node.val);
    if (pathMax <= node.val) {
      goodNodesCount++;
    }
  };
  walkTree(root);
  return goodNodesCount;
};
