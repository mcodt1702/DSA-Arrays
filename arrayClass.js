const Memory = require("./memory");
const memoryH = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memoryH.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memoryH.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memoryH.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    memoryH.copy(this.ptr, oldPtr, this.length);
    memoryH.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return memoryH.get(this.ptr + index);
  }
  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = memoryH.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memoryH.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memoryH.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    memoryH.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}
Array.SIZE_RATIO = 3;

arr = new Array();

console.log("MY ARRAY", arr);
arr.push("je");
arr.push("je");
console.log("MY ARRAY", arr);
arr.get(1);
arr.push("first");
arr.push("seconde");
arr.push("last");
console.log(arr.get(1));
