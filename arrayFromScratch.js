class TestArray {
  constructor() {
    this.data = {};
    this.length = 0;
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
  }

  pop() {
    const item = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    console.log(item);
  }

  get(index) {
    return this.data[index];
  }

  delete(index) {
    const item = this.data[index];
    delete this.data[index];
    this.shiftIndex(item);
  }

  shiftIndex(index) {
    for (let i = index; i < this.data.length; i++) {
      [i] = [this.data.length];
      this.data[i];
    }
    delete this.data[this.data.length - 1];
    this.length--;
  }
}

arr = new TestArray();
arr.push("first");
arr.push("second");
arr.push("last");
arr.delete(1);

console.log(arr);
