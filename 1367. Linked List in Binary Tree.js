/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function(head, root) {
  if (!head && !root) { return true; }
  if (!head.next && !root.left && !root.right) { return head.val === root.val; }

  // setup bi-directional list
  let tailNode = head;
  let tmpNode = head;
  let pathSize = 0;
  while (true) {
    if (tailNode.next) {
      tailNode = tailNode.next;
      tailNode.parent = tmpNode;
      tmpNode = tailNode;
    } else {
      break;
    }
    pathSize++;
  }

  // traverse tree
  let treeLevel = 0;
  const queue = [];
  root ? queue.push({
    ...root,
    parent: null
  }) : void 0;
  while (queue.length) {
    node = queue.pop();
    if (node.val === tailNode.val && treeLevel >= pathSize) {
      // walk upwards
      let nodeUp = node;
      let matcherNode = tailNode;
      while (nodeUp && matcherNode && nodeUp.val === matcherNode.val) {
        nodeUp = nodeUp.parent;
        matcherNode = matcherNode.parent;
      }
      // all matching nodes were spotted
      if (!matcherNode) {
        return true;
      }
    }
    node?.right ? queue.push({
      ...node.right,
      parent: node,
    }) : void 0;
    node?.left ? queue.push({
      ...node.left,
      parent: node,
    }) : void 0;
    treeLevel++;
  }

  return false;
};
