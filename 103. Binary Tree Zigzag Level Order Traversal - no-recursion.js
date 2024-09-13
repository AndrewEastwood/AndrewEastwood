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
 * @return {number[][]}
 */

var zigzagLevelOrder = function(root) {
  if (!root) { return []; }

  let levelQueue = [];

  const generalQueue = [];

  const zigZagValues = [];

  const levelValues = [];

  let leftToRight = false;

  let node;

  // init Q
  generalQueue.push(root);
  while (generalQueue.length) {

    levelQueue = [...generalQueue];
    generalQueue.length = 0;
    levelValues.length = 0;

    while (levelQueue.length) {
      node = levelQueue.pop();
      levelValues.push(node.val);
      if (leftToRight) {
        node.right ? generalQueue.push(node.right) : void 0;
        node.left ? generalQueue.push(node.left) : void 0;
      } else {
        node.left ? generalQueue.push(node.left) : void 0;
        node.right ? generalQueue.push(node.right) : void 0;
      }
    }
    leftToRight = !leftToRight;
    zigZagValues.push([...levelValues]);
  }

  return zigZagValues;
};
