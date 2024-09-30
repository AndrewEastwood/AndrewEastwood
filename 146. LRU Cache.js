/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this._capacity = capacity;
  this._store = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (this._store.has(key)) {
    const value = this._store.get(key);
    this._store.delete(key);
    this._store.set(key, value);
    return value;
  }
  return -1;
};

/** 
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  // alloc new element when capacity, otherwise replace the lowest element
  if (this._store.has(key)) {
    this._store.delete(key);
  } else if (this._store.size >= this._capacity) {
    const unusedKey = this._store.keys().next().value;
    this._store.delete(unusedKey);
  }
  this._store.set(key, value);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
