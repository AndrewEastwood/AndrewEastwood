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
    this.root.targets[this.root.size - 1] = this.next;
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
    }
    this.root.size--;
    return this.next;
  }
  this.head = () => this.root;
}
ListNode.create = (val) => {
  let root = new ListNode(val);
  root._id = '#0';
  root.size = 1;
  root.targets = { root, };
  return root;
}

// make some liked list
const ln1 = ListNode.create(1).link(2).link(3).link(4).link(5).head()
