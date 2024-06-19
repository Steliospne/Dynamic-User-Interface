const Node = require("./node.js");

class linkedList {
  static #list = [];

  static append(value) {
    const node = new Node();
    node.value = value;
    if (this.#list.length == 0) {
      this.#list.push(node);
    } else {
      this.#list[this.#list.length - 1].nextNode = node;
      this.#list.push(node);
    }
  }

  static prepend(value) {
    const node = new Node();
    node.value = value;
    if (this.#list.length == 0) {
      this.#list.push(node);
    } else {
      this.#list.unshift(node);
      node.nextNode = this.#list[1];
    }
  }

  static at(index) {
    return !index
      ? "Expected input value empty"
      : index < 0
      ? "Out of range"
      : index > this.#list.length
      ? "Out of range"
      : this.#list[index];
  }

  static pop() {
    this.#list.pop();
  }

  static contains(value) {
    return this.#list.some((element) => element.value == value);
  }

  static find(value) {
    let temp = [];
    for (let el of this.#list) {
      if (el.value == value) {
        temp.push(this.#list.indexOf(el));
      } else {
        continue;
      }
    }
    if (temp.length == 1) return temp[0];
    if (temp.length !== 0) return temp;
    return null;
  }

  static toString() {
    let temp = "";
    this.#list.forEach((el) => {
      temp += `(${el.value}) -> `;
    });
    temp += "null";
    return temp;
  }

  static insertAt(value, index) {
    if (index < 0 || index == undefined || index > this.#list.length - 1) {
      const error = new RangeError()
      error.message = "index provided is out of range"
      throw error;
    }

    const node = new Node();
    node.value = value;

    if (index == 0) {
      this.#list.unshift(node);
    } else if (index == this.#list.length - 1) {
      this.#list.push(node);
    } else {
      const leftSplit = this.#list.slice(0, index);
      const rightSplit = this.#list.slice(index);
      node.nextNode = rightSplit[0];
      leftSplit[leftSplit.length - 1].nextNode = node;
      leftSplit.push(node);
      this.#list = leftSplit.concat(rightSplit);
    }
  }

  static removeAt(index) {
    if (index < 0 || index == undefined || index > this.#list.length - 1) {
      const error = new RangeError()
      error.message = "index provided is out of range"
      throw error;
    }

    if (index == 0) {
      this.#list.shift();
    } else if (index == this.#list.length - 1) {
      this.#list.pop();
      this.#list[this.#list.length - 1].nextNode = null;
    } else {
      this.#list = this.#list.filter((el) => this.#list.indexOf(el) !== index);
      this.#list[index - 1].nextNode = this.#list[index];
    }
  }

  static head() {
    return this.#list.length == 0 ? "Empty" : this.#list[0];
  }

  static tail() {
    return this.#list.length == 0 ? "Empty" : this.#list[this.#list.length - 1];
  }

  static size() {
    return this.#list.length;
  }

  static debug() {
    return this.#list;
  }
}

// console.log(linkedList.head());
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.insertAt(5, -1);
console.log(linkedList.contains(0));
console.log(linkedList.find(1));
console.log(linkedList.toString());
console.log(linkedList.debug());

// linkedList.removeAt();
console.log(linkedList.debug());

// console.log(linkedList.tail());
// console.log(linkedList.size());
// console.log(linkedList.at(1));
// console.log(linkedList.at());

// linkedList.append(2);
// console.log(linkedList.head());
