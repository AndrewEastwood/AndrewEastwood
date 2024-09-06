/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} node
 * @param {number[]} node
 * @param {number} node
 * @return {number[][]}
 */
var levelOrder = function(node, groups = [], level = 0) {
  if (!node) { return []; }
  groups[level] = groups[level] || [];
  groups[level].push(node.val);
  let idx = 0;
  let childPtr = node.children[idx];
  while (childPtr) {
    levelOrder(childPtr, groups, level + 1);
    childPtr = node.children[++idx];
  }
  return groups;
};
