function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

const dummyTree = new TreeNode(0, new TreeNode(1, new TreeNode(3), new TreeNode(4)), new TreeNode(2))

/*
         0
       /   \
      1     2
     / \
    3   4
*/

// DFS Variations
const walkerInOrder = (node) => {
  if (!node) { return; }
  walkerInOrder(node.left);
  console.log('in-order', node.val);
  walkerInOrder(node.right);
};
walkerInOrder(dummyTree);
// 3, 1, 4, 0, 2

const walkerPreOrder = (node) => {
  if (!node) { return; }
  console.log('pre-order', node.val);
  walkerPreOrder(node.left);
  walkerPreOrder(node.right);
};
walkerPreOrder(dummyTree);
// 0, 1, 3, 4, 2

const walkerPostOrder = (node) => {
  if (!node) { return; }
  walkerPostOrder(node.left);
  walkerPostOrder(node.right);
  console.log('post-order', node.val);
};
walkerPostOrder(dummyTree);
// 3, 4, 1, 2, 0


// BFS
const walkerBFS = (node) => {
  const q = [];
  if (node) { q.push(node); }
  while (q.length) {
    const item = q.shift();
    console.log('bfs', item.val);
    if (item.left) { q.push(item.left); }
    if (item.right) { q.push(item.right); }
  }
}
walkerBFS(dummyTree);
// 0, 1, 2, 3, 4
