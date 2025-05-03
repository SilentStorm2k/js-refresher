"use strict";
exports.__esModule = true;
exports.HashSet = void 0;
var linkedList_1 = require("./linkedList");
function HashSet(loadFactor) {
    if (loadFactor === void 0) { loadFactor = 0.75; }
    var minCapacity = 16;
    var capacity = minCapacity;
    var size = 0;
    var keyBuckets = [];
    var shrinkFactor = 3;
    function hash(key) {
        var hashCode = 0;
        var primeNumber = 31;
        for (var i = 0; i < key.length; i++)
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        return hashCode % capacity;
    }
    function add(key) {
        var _a;
        var idx = hash(key);
        if (keyBuckets[idx] == undefined)
            keyBuckets[idx] = new linkedList_1.LinkedList();
        var idxInBucket = (_a = keyBuckets[idx]) === null || _a === void 0 ? void 0 : _a.find(key);
        // this key already exists, only need to update it now
        if (idxInBucket != null)
            return;
        // this key does not exists, create it and
        else {
            keyBuckets[idx].append(key);
            size += 1;
        }
        if (size >= capacity * loadFactor)
            grow();
    }
    function grow() {
        var currentEntries = keys();
        capacity *= 2;
        clear();
        for (var _i = 0, currentEntries_1 = currentEntries; _i < currentEntries_1.length; _i++) {
            var key = currentEntries_1[_i];
            if (key)
                add(key);
        }
    }
    function shrink() {
        var currentEntries = keys();
        capacity = Math.floor(capacity / 2);
        clear();
        for (var _i = 0, currentEntries_2 = currentEntries; _i < currentEntries_2.length; _i++) {
            var key = currentEntries_2[_i];
            if (key)
                add(key);
        }
    }
    function has(key) {
        var bucketIdx = hash(key);
        return keyBuckets[bucketIdx].contains(key);
    }
    function remove(key) {
        var bucketIdx = hash(key);
        var idx = keyBuckets[bucketIdx].find(key);
        if (idx != null) {
            keyBuckets[bucketIdx].removeAt(idx);
            size -= 1;
            if (size < capacity / shrinkFactor &&
                capacity / shrinkFactor >= minCapacity)
                shrink();
            return true;
        }
        return false;
    }
    function length() {
        return size;
    }
    function clear() {
        keyBuckets = [];
        capacity = Math.max(minCapacity, capacity);
        size = 0;
    }
    function keys() {
        var _a;
        var keys = [];
        for (var i = 0; i < capacity; i++) {
            var curNode = (_a = keyBuckets[i]) === null || _a === void 0 ? void 0 : _a.headNode();
            while (curNode) {
                keys.push(curNode.value);
                curNode = curNode.next;
            }
        }
        return keys;
    }
    function print() {
        var _a;
        for (var i = 0; i < capacity; i++)
            console.log(i, (_a = keyBuckets[i]) === null || _a === void 0 ? void 0 : _a.toString());
    }
    return {
        add: add,
        has: has,
        remove: remove,
        length: length,
        clear: clear,
        keys: keys,
        print: print
    };
}
exports.HashSet = HashSet;
function test() {
    var test = HashSet(); // or HashMap() if using a factory
    test.add("apple");
    test.add("banana");
    test.add("carrot");
    test.add("dog");
    test.print();
    console.log(test.keys());
    test.add("elephant");
    test.add("frog");
    test.add("grape");
    test.add("hat");
    test.add("ice cream");
    test.add("jacket");
    test.add("kite");
    test.add("lion");
    test.print();
    console.log(test.keys());
    test.remove("lion");
    test.remove("banana");
    test.remove("frog");
    console.log(test.keys());
    console.log(test.length());
}
// test();
