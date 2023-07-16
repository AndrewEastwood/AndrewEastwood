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
    if (this.isRoot) {
      // last and is root
      if (!this.next) {
        this.root.targets[this._id]
        this.root = null;
        return null;
      }
      const delEl = this.root;
      this.root = this.next ?? null;

      this.root.isRoot = true;

    } else if (this.isTail) {
      this.prev.next = this.next;
      this.prev.isTail = this.prev
    } else {

    }
    // delete this.root.targets[this._id];
    // Object.assign(this, this.next ?? {});
    // this.isTail = !this.next;
    // this.isRoot = !this.prev;
    // this.next = this.next?.next ?? null;
    // this.root.size--;
    return this;
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
const ln1 = ListNode.create(1).link(2).link(3).link(4).link(5).getHead();

// Good to know!
// to get the middle node
// u have to maintain two pointers
// the firtst interates the nodes one-by-one
// rather then the second one goes x2 times faster
// this means that the faster pointer will reach the
// end of the list excatly when the first pointer
// is pointing the middle of the list


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

deleteMiddle(ln1)
