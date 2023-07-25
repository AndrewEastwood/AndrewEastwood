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

const heapifyUp = (data: number[]) => {};

const heapifyDown = (data: number[]) => {};

class BinTree {
  private _root: TTreeNode;

  static empty() {
    const tree = new BinTree();
    return tree;
  }

  static fromArray(nodeValues: number[]) {
    const tree = BinTree.empty();
    for (let i = 0; i < nodeValues.length; i++) {
      tree.add(nodeValues[i]);
    }
    return tree;
  }

  // private constructor() {
  //   throw 'Use the BinTree.empty() function';
  // }

  traverse(hooks?: {
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

      // Delete leaf. Since leaf
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

console.log('BinTree Sandbox');
const bt = BinTree.fromArray([9, 4, 7, 3, 6, 2, 1, 0, 10, 14, 11, 15, 12, 13]);

console.log('walkByInOrder', bt.walkByInOrder());

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
