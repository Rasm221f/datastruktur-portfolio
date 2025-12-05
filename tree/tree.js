class Tree {
  constructor(value) {
    this.root = new Node(value);
  }

  dump() {
    function visit(node, indent) {
      console.log(indent + node.value);
      for (let i = 0; i < node.childNodes.length; i++) {
        visit(node.childNodes[i], indent + "  ");
      }
    }

    if (this.root) {
      visit(this.root, "");
    }
  }

  addValue(value, parent = this.root) {
    const newNode = new Node(value);
    parent.appendChild(newNode);
    return newNode;
  }

  findValue(value) {
    function search(node, value) {
      if (!node) return null;
      if (node.value === value) return node;

      for (let i = 0; i < node.childNodes.length; i++) {
        const found = search(node.childNodes[i], value);
        if (found) return found;
      }
      return null;
    }

    return search(this.root, value);
  }

  removeValue(value) {
    const node = this.findValue(value);
    if (!node) return false;

    if (!node.parent) return false;

    node.parent.removeChild(node);
    return true;
  }
}
class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.childNodes = [];
  }

  firstChild() {
    return this.childNodes[0];
  }
  lastChild() {
    return this.childNodes[this.childNodes.length - 1];
  }
  hasChildNodes() {
    return this.childNodes.length > 0;
  }
  appendChild(node) {
    node.parent = this;
    const len = this.childNodes.length;
    this.childNodes[len] = node;
    return node;
  }
  removeChild(node) {
    let index = -1;
    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i] === node) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return null; // node not found among children
    }

    // shift elements left manually
    const removed = this.childNodes[index];
    for (let i = index; i < this.childNodes.length - 1; i++) {
      this.childNodes[i] = this.childNodes[i + 1];
    }
    this.childNodes.length = this.childNodes.length - 1;

    removed.parent = null;
    return removed;
  }
  replaceChild(newChild, oldChild) {
    // find index of oldChild
    let index = -1;
    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i] === oldChild) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return null; // oldChild not found
    }

    newChild.parent = this;
    oldChild.parent = null;
    this.childNodes[index] = newChild;

    return oldChild;
  }
}

module.exports = { Tree, Node };