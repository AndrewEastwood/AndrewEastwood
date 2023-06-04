/*

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1:
   1   
  / \  
 2   2 
/ \ / \
3 4 4 3
Input: root = [1,2,2,3,4,4,3]
Output: true

Example 2:

  1   
 / \  
2   2 
 \   \
 3   3
 
Input: root = [1,2,2,null,3,null,3]
Output: false
 

Constraints:

The number of nodes in the tree is in the range [1, 1000].
-100 <= Node.val <= 100

*/

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
var isSymmetric = function(root) {
  return matcher(root, root);
};

var matcher = (leftHead, rightHead) => {
  let isSymmetric = true;

  // we need both nodes to be exist
  if (!leftHead || !rightHead) { return false; }

  if (leftHead.val !== rightHead.val) {
    return false;
  }

  // left + right outter pair [o][x] | [x][o]
  if (leftHead.left && rightHead.right) {
    isSymmetric = isSymmetric && matcher(leftHead.left, rightHead.right);
  } else {
    // keep it symmetric if no pair, otherwise, fail
    isSymmetric = !leftHead.left && !rightHead.right;
  }

  if (!isSymmetric) {
    return false;
  }

  // left + right inner pair [x][o] | [o][x]
  if (leftHead.right && rightHead.left) {
    isSymmetric = isSymmetric && matcher(leftHead.right, rightHead.left);
  } else {
    // keep it symmetric if no pair, otherwise, fail
    isSymmetric = !leftHead.right && !rightHead.left;
  }

  return isSymmetric;
}
