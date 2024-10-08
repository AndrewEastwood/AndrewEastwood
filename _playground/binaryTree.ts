function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;

  return {
    val: this.val,
    left: this.left,
    right: this.right,
  };
}

type TTreeNode = ReturnType<typeof TreeNode>;
type TTreeWalkFn = (node: TTreeNode) => void;

// v[3,2,5,4,1]
// # 0 1 2 3 4
//
//       [#0](3)
//      /    \
//   [#1](2) [#2](5)
//  /   \
//[#3](4)  [#4](1)

// the root nodes always larger than itrs child nodes
type THeapifyCompareFn = (a: number, b: number) => boolean;
const heapifyLoopForward = (
  data: number[],
  compareFn?: THeapifyCompareFn,
  offset = 0
) => {
  // the largest el is on top
  const { length: n } = data;
  const _comparator = compareFn ?? ((curr, next) => curr < next);
  for (let i = offset; i < n; i++) {
    // loop back through parent nodes
    let childNodeIndex = i + offset;
    let parentNodeIdx = Math.ceil(childNodeIndex / 2) - 1 + offset;
    // [2,|3,4|,5,1,6,7|,8,9,0,10,null,null|]
    //  ^  ^    ^ ^      ^ ^
    //     2     3        5 ... <= parent nodes
    // the [i]th index goes till the end of the data
    // means that we passed previous nodes.
    // to resolve previous parent nodes
    // we use the following fn: (i / 2) and round up (ceil) and - 1
    // therefore: the value 3 is at #1 and the value 4 is at #2
    // the parent node, which is 2 is at #0
    // so: (#1 / 2) => 0.5 => ceil => 1 - 1 => 0
    // and (#2 / 2) => 1 => ceil => 1 - 1 => 0
    // this is why we use ceil and -1, to get the exact prent index
    // The rest is just easy comparation and swap
    while (
      childNodeIndex > offset &&
      _comparator(data[childNodeIndex], data[parentNodeIdx])
    ) {
      // swap; move child to the upper level
      [data[parentNodeIdx], data[childNodeIndex]] = [
        data[childNodeIndex],
        data[parentNodeIdx],
      ];
      childNodeIndex = parentNodeIdx;
      parentNodeIdx = Math.ceil(childNodeIndex / 2) - 1;
    }
  }
  return data;
};

// the same as heapifyLoopForward but we traverse
// the tree from the last element of the last but one layer
// of the tree to the root tree element
const heapifyLoopBack = (
  data: number[],
  compareFn?: THeapifyCompareFn,
  offset = 0
) => {
  // the root node is (index/2) - 1
  // the L node is: (index*2) + 1
  // the R node is: (index*2) + 2
  // the offset shout chnage the top of the heap
  const { length } = data;
  const n = length - offset;
  const lastIndexOfTheSecondLast = offset + Math.floor(n / 2) - 1;
  const getLChildIdx = (idx) => 2 * idx + 1;
  const _comparator = compareFn ?? ((curr, next) => curr < next);

  for (let i = lastIndexOfTheSecondLast; i >= offset; i--) {
    let currIdx = i;

    while (true) {
      let lIdx = getLChildIdx(currIdx);
      let rIdx = getLChildIdx(currIdx) + 1;
      let swapIdx = null;

      if (lIdx < n && _comparator(data[lIdx], data[currIdx])) {
        swapIdx = lIdx;
      }

      if (
        lIdx < n &&
        ((swapIdx === null && _comparator(data[rIdx], data[currIdx])) ||
          (swapIdx !== null && _comparator(data[rIdx], data[lIdx])))
      ) {
        swapIdx = rIdx;
      }

      if (swapIdx === null) {
        break;
      } else {
        [data[swapIdx], data[currIdx]] = [data[currIdx], data[swapIdx]];
        currIdx = swapIdx;
      }
    }
  }
};

const sortHeapify = (data: number[], asc = false, useDownAlgo = true) => {
  const tmStart = performance.now();
  const { length: n } = data;
  let offset = 0;
  const result = [];
  while (offset < n) {
    useDownAlgo
      ? heapifyLoopBack(data, (a, b) => (asc ? a < b : a > b))
      : heapifyLoopForward(data, (a, b) => (asc ? a < b : a > b));
    
    offset++;
    result.push(data.shift());
  }
  console.log(` (took ${performance.now() - tmStart}ms.)`);
  return data;
};

const bigTestData = new Array(2 ** 10)
  .fill(0)
  .map((v) => Math.ceil(Math.random() * 2 ** 5));
/* console.log(bigData); */
document.write('heapifyUp: ' + heapifyLoopForward([8, 2, 1, 4, 5, 3]));
document.write('<br><br>');
document.write('heapifyDown: ' + heapifyLoopBack([8, 2, 1, 4, 5, 3]));
document.write('<br><br>');
document.write('sortHeapify as down:' + sortHeapify(bigData));
document.write('<br><br>');
document.write('sortHeapify as up:' + sortHeapify(bigData, false, false));

sortHeapify([8, 2, 1, 4, 5, 3]);

sortHeapify([
  41,
  20,
  65,
  11,
  29,
  50,
  91,
  null,
  null,
  null,
  32,
  null,
  null,
  72,
  99,
]);

class BinSearchTree {
  private _root: TTreeNode;

  private constructor() {}

  static empty() {
    const tree = new BinSearchTree();
    return tree;
  }

  static fromArray(nodeValues: number[]) {
    const tree = BinSearchTree.empty();
    for (let i = 0; i < nodeValues.length; i++) {
      tree.add(nodeValues[i]);
    }
    return tree;
  }

  private traverse(hooks?: {
    onPre?: TTreeWalkFn;
    onIn?: TTreeWalkFn;
    onPost?: TTreeWalkFn;
  }) {
    const walker = (n?: TTreeNode) => {
      if (!n) {
        return;
      }
      hooks?.onPre?.(n);
      walker(n.left);
      hooks?.onIn?.(n);
      walker(n.right);
      hooks?.onPost?.(n);
    };
    walker(this._root);
  }

  walkByPreOrder() {
    const result = [];
    this.traverse({ onPre: (n) => result.push(n.val) });
    return result;
  }

  // always sorted way
  walkByInOrder() {
    const result = [];
    this.traverse({ onIn: (n) => result.push(n.val) });
    return result;
  }

  walkByPostOrder() {
    const result = [];
    this.traverse({ onPost: (n) => result.push(n.val) });
    return result;
  }

  add(val: number) {
    const _insertor = (node?: TTreeNode) => {
      if (!node) {
        return new TreeNode(val);
      }
      if (node.val > val) {
        node.left = _insertor(node.left, val);
      } else {
        node.right = _insertor(node.right, val);
      }
      return node;
    };
    if (!this._root) {
      this._root = new TreeNode(val);
    } else {
      _insertor(this._root, val);
    }
    return this;
  }

  delete(val: number) {
    // some readings: https://www.geeksforgeeks.org/deletion-in-binary-search-tree/
    const _deletor = (node?: TTreeNode) => {
      if (!node) {
        return null;
      }

      if (val < node.val) {
        node.left = _deletor(node.left);
        return node;
      }

      if (val > node.val) {
        node.right = _deletor(node.right);
        return node;
      }

      // delete goes here
      // since the node is the exact one

      // the leaf node with no branches
      if (!node.left && !node.right) {
        // the deleted node has no branches
        node = null;
        return null;
      }

      // the case when the node has no the left branch
      // but does have the right one
      //     \
      //     [4]  <---deleting node
      //    x   \
      //        [next]
      if (!node.left) {
        // then we have to
        // backup the next path (which is the right branch)
        const nextConnection = node.right;
        // delete the current node
        node = null;
        // and return the next node
        return nextConnection;
      }

      // the same as the previous, but
      // for the left node
      //     \
      //     [4]  <---deleting node
      //    /   x
      // [next]
      if (!node.right) {
        const nextConnection = node.left;
        node = null;
        return nextConnection;
      }

      // uhh, the case, when the node
      // has both, right and left sub-trees
      //     \
      //     [4]  <---deleting node (the leaf parent)
      //    /   \
      //  [L]   [R]  <--- the leaf (no child nodes)
      //
      // ... so, we go to the R and will try to find
      // the raplacement for the node [4]
      // since the [4] must be raplaced with the value
      // which is greater than [L] and less than [R]
      let leafParent = node;
      // we go right first
      let leaf = node.right;
      // and then we keep left all the way down
      while (leaf.left) {
        leafParent = leaf;
        leaf = leaf.left;
      }

      // Delete the leaf. Since the leaf
      // is always left child of its parent
      // we can safely make leaf's right
      // right child as left of its parent.
      // If there is no succ, then assign
      // succ->right to succParent->right
      if (leafParent === node) {
        //     \
        //     [4]  <--- deleting node (same is the leaf parent)
        //    /   \
        //  [L]   [R]  <--- the leaf (no child nodes)
        leafParent.right = null;
      } else {
        //     \
        //     [4]  <---deleting node
        //    /   \
        //  [L]   [R]  <--- (the leaf parent)
        //        / \
        //      [x] [y]
        //       ^------- the leaf (no child nodes)
        leafParent.left = null;
      }

      // take the leaf value and
      // set it to the node
      node.val = leaf.val;
      // and safely drop the leaf
      leaf = null;
      return node;
    };
    _deletor(val);
    return this;
  }

  getHeight() {
    const _h = (n: TTreeNode) => {
      if (!n) {
        return 0;
      }
      return Math.max(_h(n.left), _h(n.right)) + 1;
    };
    return _h(this._root);
  }

  isBalanced() {
    const _isBalanced = (n) => {
      if (!n) {
        return 0;
      }
      const l = _isBalanced(n.left);
      if (l === -1) {
        return -1;
      }
      const r = _isBalanced(n.right);
      if (r === -1 || Math.abs(l - r) > 1) {
        return -1;
      }
      return Math.max(l, r) + 1;
    };
    return _isBalanced(this._root) > 0;
  }
}

console.log('BinSearchTree Sandbox');
const bt = BinSearchTree.fromArray([
  9, 4, 7, 3, 6, 2, 1, 0, 10, 14, 11, 15, 12, 13,
]);

// use https://visualgo.net/en/bst

bt.delete(4);
console.log('walkByInOrder', bt.walkByInOrder(), bt);

bt.delete(14);
console.log('walkByInOrder', bt.walkByInOrder(), bt);

// const dummyTree = new TreeNode(0, new TreeNode(1, new TreeNode(3), new TreeNode(4)), new TreeNode(2))

/*
         0
       /   \
      1     2
     / \
    3   4
*/

// DFS Variations
const walkerInOrder = (node) => {
  if (!node) {
    return;
  }
  walkerInOrder(node.left);
  console.log('in-order', node.val);
  walkerInOrder(node.right);
};
walkerInOrder(dummyTree);
// 3, 1, 4, 0, 2

const walkerPreOrder = (node) => {
  if (!node) {
    return;
  }
  console.log('pre-order', node.val);
  walkerPreOrder(node.left);
  walkerPreOrder(node.right);
};
walkerPreOrder(dummyTree);
// 0, 1, 3, 4, 2

const walkerPostOrder = (node) => {
  if (!node) {
    return;
  }
  walkerPostOrder(node.left);
  walkerPostOrder(node.right);
  console.log('post-order', node.val);
};
walkerPostOrder(dummyTree);
// 3, 4, 1, 2, 0

// BFS
const walkerBFS = (node) => {
  const q = [];
  if (node) {
    q.push(node);
  }
  while (q.length) {
    const item = q.shift();
    console.log('bfs', item.val);
    if (item.left) {
      q.push(item.left);
    }
    if (item.right) {
      q.push(item.right);
    }
  }
};
walkerBFS(dummyTree);
// 0, 1, 2, 3, 4


// it flattens the tree nodes
const flattenTree = (node, values = [], nodeIndex = 0) => {
  if (!node) { return values; }
  values[nodeIndex] = node.val;
  // left node
  flattenTree(node?.left, values, nodeIndex * 2 + 1);
  // right node
  flattenTree(node?.right, values, nodeIndex * 2 + 2);
  return values
}

// it groups by level
const groupByLevelsTree = (node, values = [], level = 0) => {
  if (!node) { return values; }
  values[level] = values[level] || [];
  values[level].push(node.val);
  // left node
  groupByLevelsTree(node?.left, values, level + 1);
  // right node
  groupByLevelsTree(node?.right, values, level + 1);
  return values
}
