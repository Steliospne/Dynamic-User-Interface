module.exports = class hashMap {
  static #bucketList = Array.from({ length: 16 }, () => null);
  static #entries_count = 0;
  static #load_factor = 0.75;

  static #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  static #position(key) {
    return Math.floor(this.#hash(key) % 16);
  }

  static set(key, value) {
    const hashCode = this.#position(key);
    // if (
    //   hashCode < 0 ||
    //   hashCode == undefined ||
    //   hashCode > this.#bucketList.length - 1
    // ) {
    //   const error = new RangeError();
    //   error.message = "index provided is out of range";
    //   throw error;
    // }
    if (this.#bucketList[hashCode] === null) this.#entries_count++;
    this.#bucketList[hashCode] = new Node(key, value);

    if (this.#entries_count > this.#bucketList.length * this.#load_factor) {
      const oldList = this.#bucketList;
      this.#bucketList = Array.from({ length: 16 * 2 }, () => null);

      for (let item of oldList) {
        if (item) {
          hashMap.set(item.key, item.value);
          this.#entries_count--;
        }
      }
    }
  }

  static get(key) {
    for (let item of this.#bucketList) {
      if (item) {
        return item.key === key ? item.value : null;
      }
    }
  }

  static has(key) {
    if (
      this.#bucketList[this.#position(key)] &&
      this.#bucketList[this.#position(key)].key === key
    )
      return true;
    return false;
  }

  static remove(key) {
    if (hashMap.has(key)) {
      this.#bucketList[this.#position(key)] = null;
      this.#entries_count--;
      return true;
    }
    return false;
  }

  static length() {
    return this.#entries_count;
  }

  static clear() {
    this.#bucketList = Array.from({ length: 16 }, () => null);
  }

  static keys() {
    const result = [];
    for (let item of this.#bucketList) {
      if (item) result.push(item.key);
    }
    return result;
  }

  static values() {
    const result = [];
    for (let item of this.#bucketList) {
      if (item) result.push(item.value);
    }
    return result;
  }

  static entries() {
    const result = [];
    for (let item of this.#bucketList) {
      if (item) result.push([item.key, item.value]);
    }
    return result;
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

