export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Private helper to make a node with public fields
  #createNode(data) {
    return { data, next: null, prev: null };
  }

  // ----- Debug / Utility -----

  printList() {
    const elements = [];
    let current = this.head;
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log("Doubly Linked List:", elements.join(" <-> "));
  }

  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  clear() {
    // Drop head & tail; GC will reclaim the chain
    this.head = null;
    this.tail = null;
  }

  // ----- Append / Prepend -----

  addLast(data) {
    const node = this.#createNode(data);
    if (!this.tail) {
      // empty list
      this.head = this.tail = node;
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  addFirst(data) {
    const node = this.#createNode(data);
    if (!this.head) {
      // empty list
      this.head = this.tail = node;
      return;
    }
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  // ----- Get / Set by index or ends -----

  get(index) {
    const n = this.getNode(index);
    return n ? n.data : null;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    return this.tail ? this.tail.data : null;
  }

  set(index, data) {
    const n = this.getNode(index);
    if (n) n.data = data;
  }

  // ----- Remove by ends / index -----

  removeFirst() {
    if (!this.head) return;
    if (this.head === this.tail) {
      // 1 node
      this.head = this.tail = null;
      return;
    }
    const newHead = this.head.next;
    newHead.prev = null;
    this.head.next = null; // (optional: help GC)
    this.head = newHead;
  }

  removeLast() {
    if (!this.tail) return;
    if (this.head === this.tail) {
      // 1 node
      this.head = this.tail = null;
      return;
    }
    const newTail = this.tail.prev;
    newTail.next = null;
    this.tail.prev = null; // (optional)
    this.tail = newTail;
  }

  remove(index) {
    const n = this.getNode(index);
    if (n) this.removeNode(n);
  }

  // ----- Node movement helpers -----

  makeLast(node) {
    if (!node || node === this.tail) return;

    // detach node
    if (node === this.head) {
      this.head = node.next;
      if (this.head) this.head.prev = null;
    } else {
      node.prev.next = node.next;
      if (node.next) node.next.prev = node.prev;
    }

    // attach at tail
    node.prev = this.tail;
    node.next = null;
    if (this.tail) this.tail.next = node;
    this.tail = node;

    if (!this.head) this.head = node;
  }

  makeFirst(node) {
    if (!node || node === this.head) return;

    // detach node
    if (node === this.tail) {
      this.tail = node.prev;
      if (this.tail) this.tail.next = null;
    } else {
      node.prev.next = node.next;
      if (node.next) node.next.prev = node.prev;
    }

    // attach at head
    node.next = this.head;
    node.prev = null;
    if (this.head) this.head.prev = node;
    this.head = node;

    if (!this.tail) this.tail = node;
  }

  // ----- Node getters -----

  getNode(index) {
    if (index < 0) return null;
    // Optional optimization: walk from head or tail depending on index vs size/2.
    // We won't compute size() just to decide; we’ll try from head straightforwardly.
    let i = 0;
    let current = this.head;
    while (current && i < index) {
      current = current.next;
      i++;
    }
    return current || null;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    return this.tail;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    return node ? node.prev : null;
  }

  // ----- Insert relative to node -----

  insertBeforeNode(node, data) {
    if (!node) return;
    if (node === this.head) {
      this.addFirst(data);
      return;
    }
    const newNode = this.#createNode(data);
    const prev = node.prev;

    // splice prev <-> newNode <-> node
    newNode.prev = prev;
    newNode.next = node;
    prev.next = newNode;
    node.prev = newNode;
  }

  insertAfterNode(node, data) {
    if (!node) return;
    if (node === this.tail) {
      this.addLast(data);
      return;
    }
    const newNode = this.#createNode(data);
    const next = node.next;

    // splice node <-> newNode <-> next
    newNode.next = next;
    newNode.prev = node;
    node.next = newNode;
    next.prev = newNode;
  }

  // ----- Remove by node -----

  removeNode(node) {
    if (!node) return;
    if (node === this.head && node === this.tail) {
      // only node
      this.head = this.tail = null;
      return;
    }
    if (node === this.head) {
      // remove head
      this.head = node.next;
      this.head.prev = null;
      node.next = null;
      return;
    }
    if (node === this.tail) {
      // remove tail
      this.tail = node.prev;
      this.tail.next = null;
      node.prev = null;
      return;
    }
    // middle
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = node.next = null;
  }

  // ----- Swap two nodes (relink, not just swapping data) -----

  swap(nodeA, nodeB) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;

    // Normalize: ensure nodeA comes before nodeB in the chain if possible (not required, but simplifies adjacent handling)
    // We'll just handle all cases directly.

    const aPrev = nodeA.prev;
    const aNext = nodeA.next;
    const bPrev = nodeB.prev;
    const bNext = nodeB.next;

    const aIsHead = nodeA === this.head;
    const aIsTail = nodeA === this.tail;
    const bIsHead = nodeB === this.head;
    const bIsTail = nodeB === this.tail;

    const adjacent = (aNext === nodeB) || (bNext === nodeA);

    if (adjacent) {
      // Handle adjacency carefully
      if (aNext === nodeB) {
        // A <-> B
        // link aPrev -> B
        if (aPrev) aPrev.next = nodeB; else this.head = nodeB;
        nodeB.prev = aPrev;

        // link A -> bNext
        if (bNext) bNext.prev = nodeA; else this.tail = nodeA;
        nodeA.next = bNext;

        // link B -> A
        nodeB.next = nodeA;
        nodeA.prev = nodeB;
      } else {
        // B <-> A
        // link bPrev -> A
        if (bPrev) bPrev.next = nodeA; else this.head = nodeA;
        nodeA.prev = bPrev;

        // link B -> aNext
        if (aNext) aNext.prev = nodeB; else this.tail = nodeB;
        nodeB.next = aNext;

        // link A -> B
        nodeA.next = nodeB;
        nodeB.prev = nodeA;
      }
      return;
    }

    // Non-adjacent: swap neighbors
    // Reattach nodeA in nodeB's spot
    if (bPrev) bPrev.next = nodeA; else this.head = nodeA;
    nodeA.prev = bPrev;

    if (bNext) bNext.prev = nodeA; else this.tail = nodeA;
    nodeA.next = bNext;

    // Reattach nodeB in nodeA's spot
    if (aPrev) aPrev.next = nodeB; else this.head = nodeB;
    nodeB.prev = aPrev;

    if (aNext) aNext.prev = nodeB; else this.tail = nodeB;
    nodeB.next = aNext;

    // heads/tails already corrected above via null checks
  }
}
