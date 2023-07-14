// DFS Variations
const walkerInOrder = (node, pathSum = 0, p = []) => {
  if (!node) { return; }
  walkerInOrder(node.left, pathSum + node.val, [...p, node.val]);
  console.log('in-order', node.val);
  walkerInOrder(node.right, pathSum + node.val, [...p, node.val]);
};
const walkerPreOrder = (node, pathSum = 0, p = []) => {
  if (!node) { return; }
  console.log('pre-order', node.val);
  walkerPreOrder(node.left, pathSum + node.val, [...p, node.val]);
  walkerPreOrder(node.right, pathSum + node.val, [...p, node.val]);
};
const walkerPostOrder = (node, pathSum = 0, p = []) => {
  if (!node) { return; }
  walkerPostOrder(node.left, pathSum + node.val, [...p, node.val]);
  walkerPostOrder(node.right, pathSum + node.val, [...p, node.val]);
  console.log('post-order', node.val);
};


// BFS
