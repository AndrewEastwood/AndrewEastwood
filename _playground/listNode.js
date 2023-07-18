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
      const newTail = new ListNode(key);
      newTail.id = "#" + (this.size - 1);
      newTail.isTail = true;
      newTail.prev = this.tail;
      this.tail.isTail = false;
      this.tail.next = newTail;
      this.tail = newTail;
      this.size++;
      return service;
    },
    delete(key) {

    }
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
