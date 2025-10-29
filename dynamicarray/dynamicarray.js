import StaticArray from "./staticarray.js";    

let default_capacity = 5;

export default class DynamicArray {
  constructor(capacity = default_capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._arr = new StaticArray(this._capacity);
  }

  add(item) {
    if (this._length >= this._capacity) {
      this.grow();
    }
    this._arr.set(this._length, item);
    this._length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this._length) {
      throw new RangeError("Index out of bounds");
    }
    return this._arr.get(index);
  }

  set(index, item) {
    if (index < 0 || index >= this._length) {
      throw new RangeError("Index out of bounds");
    }
    this._arr.set(index, item);
  }

  size() {
    return this._length;
  }

  insert(index, item) {
    if (index < 0 || index > this._length) {
      throw new RangeError("Index out of bounds");
    }
    if (this._length >= this._capacity) {
      this.grow();
    }
    for (let i = this._length; i > index; i--) {
      this._arr.set(i, this._arr.get(i - 1));
    }
    this._arr.set(index, item);
    this._length++;
    return this;
  }

  capacity() {
    return this._capacity;
  }

  grow() {
    const new_capacity = this._capacity * 2;
    if (new_capacity <= this._capacity) {
      throw new Error("New capacity must be greater than current capacity");
    }
    const newArr = new StaticArray(new_capacity);
    for (let i = 0; i < this._length; i++) {
      newArr.set(i, this._arr.get(i));
    }
    this._arr = newArr;
    this._capacity = new_capacity;
    return this;
  }

  remove(index) {
    if (index < 0 || index >= this._length) {
      throw new RangeError("Index out of bounds");
    }
    for (let i = index; i < this._length - 1; i++) {
      this._arr.set(i, this._arr.get(i + 1));
    }
    this._length--;
    this._arr.set(this._length, undefined);
  }

  clear() {
    this._arr = new StaticArray(this._capacity);
    this._length = 0;
  }
}
