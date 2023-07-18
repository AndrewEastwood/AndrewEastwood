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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const pathsToLeaves = [];
  const walk = (node, level = 0, path = []) => {
    if (!node) { return; }

    walk(node.left, level + 1, [...path, node.val]);
    walk(node.right, level + 1, [...path, node.val]);
    
    // post-order
    if (!node.left && !node.right) {
      pathsToLeaves.push([...path, node.val].join('->'))
    }
  }
  walk(root);
  return pathsToLeaves;
};

binaryTreePaths([1,2,3,null,5]);
// outputs:
// ["1->2->5","1->3"]
