function ListNode(val) {
  this._id;
  this.root = this;
  this.val = (val===undefined ? 0 : val)
  this.next = null;
  this.prev = null;
  this.isRoot = true;
  this.isTail = true;
  this.link = (val) => {
    this.root.size++;
    this.next = new ListNode(val);
    this.next._id = "#" + (this.root.size - 1);
    this.next.root = this.root;
    this.next.prev = this;
    this.next.isRoot = false;
    this.isTail = false;
    this.root.targets[this.next._id] = this.next;
    return this.next;
  }
  this.delete = () => {
    // delete this
    // no prev ( we are root )
    if (!this.prev) {
      this.root = this.next;
      this.root.isRoot = true;
    } else {
      this.prev.next = this.next;
      this.prev.isTail = this.prev
    }
    delete this.root.targets[this._id];
    this.root.size--;
    return this.next;
  }
  this.getHead = () => this.root;
}
ListNode.create = (val) => {
  let root = new ListNode(val);
  root._id = '#0';
  root.size = 1;
  root.targets = { [root._id]: root, };
  return root;
}

// make some liked list
const ln1 = ListNode.create(1).link(2).link(3).link(4).link(5).head();


var deleteMiddle = function(head) {
  const listSize = (pt, s = 1) => pt.next ? listSize(pt.next, s + 1) : s;

  let curr = head;
  let prev = null;
  let seenCount = 0;
  const midIdx = Math.floor(listSize(head) / 2);

  console.log('midIdx', midIdx);

  while (curr) {
    debugger;
    console.log(curr.val);
    curr.prev = prev;
    prev = curr;
    curr = curr.next;
    seenCount++;
    if (seenCount === midIdx) {
      prev = curr;
      curr = curr.next;
      // break;
    }
  }

  // while (prev) {
  //   prev = prev.prev;
  // }
  return head;
};
