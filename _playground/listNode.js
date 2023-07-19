function ListNode(val) {
  this.val = (val===undefined ? 0 : val)
  this.next = null;
  this.prev = null;
  this.isRoot = false;
  this.isTail = false;
}

ListNode.create = (val) => {
  let root = new ListNode(val);
  root._id = '#0';
  root.isRoot = true;
  root.isTail = true;
  const service = {
    head: root,
    tail: root,
    size: 1,
    add(key){
      const nextNode = new ListNode(key);
      nextNode.id = "#" + this.size;

      if (!this.head) {
        nextNode.isRoot = true;
        nextNode.isTail = true;
        this.head = nextNode;
        this.tail = nextNode;
        this.size = 1;
        return this;
      }

      nextNode.id = "#" + this.size;
      nextNode.isTail = true;
      nextNode.prev = this.tail;
      this.tail.isTail = false;
      this.tail.next = nextNode;
      this.tail = nextNode;
      this.size++;
      return service;
    },
    delete(key) {
      if (!this.head) { return this; }

      // removing the head node
      if (this.head.val === key) {
        this.head = this.head.next;
        if (this.head) {
          this.head.isRoot = true;
          this.head.isTail === !this.head.next;
          this.head.prev = null;
          if (this.head.isTail) {
            this.tail = this.head;
          }
        } else {
          this.tail = null;
        }
        this.size--;
        return this;
      }

      if (this.tail.val === key) {
        this.tail = this.tail.prev;
        this.tail.next = null;
        this.tail.isTail = true;
        this.tail.isRoot = !this.tail.prev;
        if (this.tail.isRoot) {
          this.head = this.tail;
        }
        this.size--;
        return this;
      }

      // delete middle node
      let pt = this.head;
      while (pt) {
        pt = pt.next;
        if (pt && pt.val === key) {
          const prev = pt.prev;
          const next = pt.next;
          prev.next = next;
          next.prev = prev;
          this.size--;
          break;
        }
      }

      return this;
    },
  };
  return service;
}

// make some liked list
const ln1 = ListNode.create(1).add(2).add(3).add(4).add(5);

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
