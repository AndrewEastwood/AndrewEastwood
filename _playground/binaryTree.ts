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

  static create(rootValue) {
    const tree = new BinTree();
    tree._root = new TreeNode(rootValue);
    return tree;
  }

  private constructor() {
    throw 'Use the BinTree.create() function';
  }

  traverse(hooks:{onPre?: TTreeWalkFn, onIn?: TTreeWalkFn, onPost?: TTreeWalkFn}) {
    const walker = (n: TTreeNode) => {
      onPre?.(n);
      walker(n.left);
      onIn?.(n);
      walker(n.right);
      onPost?.(n);
    };
    walker(this._root);
  }

  walkByPreOrder() {
    const result = [];
    this.traverse({ onPre:n => result.push(n.val) });
    return result;
  }

  walkByInOrder() {
    const result = [];
    this.traverse({onIn: n => result.push(n.val)});
    return result;
  }

  walkByPostOrder() {
    const result = [];
    this.traverse({onPost: n => result.push(n.val)});
    return result;
  }

  build(nodeValues: number[]) {}

  add(val: number) {
    const insert = (node: TTreeNode, val: number) => {
      if (node.val > val) {
        node.left = new TreeNode(val);
      } else {
        node.right = new TreeNode(val);
      }
      return node;
    };
    if (!this._root.left && !this._root.right) {
      insert(this._root, val);
    }
    return this;
  }

  delete(val: number) {
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
}

// BinTree.create();

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
