export default class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  #createNode(data) {
    return { data, next: null };
  }

  printList() {
    let current = this.head;
    const result = [];
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }

  add(data) {
    const newNode = this.#createNode(data);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== null) current = current.next;
    current.next = newNode;
  }

  get(index) {
    const node = this.getNode(index);
    return node ? node.data : null;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    const node = this.getLastNode();
    return node ? node.data : null;
  }

  set(index, data) {
    const node = this.getNode(index);
    if (node) node.data = data;
  }

  insert(index, data) {
    const newNode = this.#createNode(data);

    // Insert at head or into empty list
    if (index <= 0 || this.head === null) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    // Walk to node just before target index
    let current = this.head;
    let count = 0;
    while (current !== null && count < index - 1) {
      current = current.next;
      count++;
    }

    // If index is beyond end, append at end
    if (current === null) {
      this.add(data);
      return;
    }

    newNode.next = current.next;
    current.next = newNode;
  }

  remove(index) {
    if (this.head === null) return;

    if (index <= 0) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let count = 0;
    while (current.next !== null && count < index - 1) {
      current = current.next;
      count++;
    }

    if (current.next !== null) {
      current.next = current.next.next;
    }
  }

  removeLast() {
    if (this.head === null) return;
    if (this.head.next === null) {
      this.head = null;
      return;
    }
    let current = this.head;
    while (current.next.next !== null) current = current.next;
    current.next = null;
  }

  removeFirst() {
    if (this.head === null) return;
    this.head = this.head.next;
  }

  size() {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  clear() {
    this.head = null;
  }

  getNode(index) {
    let current = this.head;
    let count = 0;
    while (current !== null) {
      if (count === index) return current;
      current = current.next;
      count++;
    }
    return null;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    if (this.head === null) return null;
    let current = this.head;
    while (current.next !== null) current = current.next;
    return current;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    if (this.head === null || node === this.head) return null;
    let current = this.head;
    while (current !== null) {
      if (current.next === node) return current;
      current = current.next;
    }
    return null;
  }

  insertBefore(node, data) {
    const newNode = this.#createNode(data);
    if (this.head === node) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current !== null) {
      if (current.next === node) {
        newNode.next = current.next;
        current.next = newNode;
        return;
      }
      current = current.next;
    }
  }

  insertAfter(node, data) {
    if (!node) return;
    const newNode = this.#createNode(data);
    newNode.next = node.next;
    node.next = newNode;
  }

  removeNode(node) {
    if (this.head === null || !node) return;
    if (this.head === node) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current !== null) {
      if (current.next === node) {
        current.next = node.next;
        return;
      }
      current = current.next;
    }
  }
}
