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
 * @return {string}
 */
var smallestFromLeaf = function(root) {
  const strings = [];
  const chars = [
    'a','b','c','d',
    'e','f','g','h',
    'i','j','k','l',
    'm','n','o','p',
    'q','r','s','t',
    'u','v','w','x',
    'y','z'
  ];
  const walker = (node, str = '') => {
    if (!node) { return };
    walker(node.left, chars[node.val] + str);
    walker(node.right, chars[node.val] + str);
    if (!node.left && !node.right) {
      strings.push(chars[node.val] + str);
    }
  }
  walker(root);
  return strings.sort().at(0);
};

smallestFromLeaf([0,1,2,3,4,3,4]); //"dba"
smallestFromLeaf([25,1,3,1,3,0,2]); //"adz"
