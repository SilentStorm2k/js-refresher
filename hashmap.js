"use strict";
exports.__esModule = true;
exports.HashMap = void 0;
var linkedList_1 = require("./linkedList");
function HashMap(loadFactor) {
    if (loadFactor === void 0) { loadFactor = 0.75; }
    var minCapacity = 16;
    var capacity = minCapacity;
    var size = 0;
    var keyBuckets = [];
    var valueBuckets = [];
    var shrinkFactor = 3;
    function hash(key) {
        var hashCode = 0;
        var primeNumber = 31;
        for (var i = 0; i < key.length; i++)
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        return hashCode % capacity;
    }
    function set(key, value) {
        var _a;
        var idx = hash(key);
        if (keyBuckets[idx] == undefined) {
            keyBuckets[idx] = new linkedList_1.LinkedList();
            valueBuckets[idx] = new linkedList_1.LinkedList();
        }
        var idxInBucket = (_a = keyBuckets[idx]) === null || _a === void 0 ? void 0 : _a.find(key);
        // this key already exists, only need to update it now
        if (idxInBucket != null) {
            valueBuckets[idx].removeAt(idxInBucket);
            valueBuckets[idx].insertAt(value, idxInBucket);
        }
        // this key does not exists, create it and
        else {
            keyBuckets[idx].append(key);
            valueBuckets[idx].append(value);
            size += 1;
        }
        if (size >= capacity * loadFactor)
            grow();
    }
    function grow() {
        var currentEntries = entries();
        capacity *= 2;
        clear();
        for (var _i = 0, currentEntries_1 = currentEntries; _i < currentEntries_1.length; _i++) {
            var _a = currentEntries_1[_i], key = _a[0], value = _a[1];
            set(key, value);
        }
    }
    function shrink() {
        var currentEntries = entries();
        capacity = Math.floor(capacity / 2);
        clear();
        for (var _i = 0, currentEntries_2 = currentEntries; _i < currentEntries_2.length; _i++) {
            var _a = currentEntries_2[_i], key = _a[0], value = _a[1];
            set(key, value);
        }
    }
    function get(key) {
        var bucketIdx = hash(key);
        var idx = keyBuckets[bucketIdx].find(key);
        if (idx != null)
            return valueBuckets[bucketIdx].at(idx);
        return null;
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
            valueBuckets[bucketIdx].removeAt(idx);
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
        valueBuckets = [];
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
    function values() {
        var _a;
        var values = [];
        for (var i = 0; i < capacity; i++) {
            var curNode = (_a = valueBuckets[i]) === null || _a === void 0 ? void 0 : _a.headNode();
            while (curNode) {
                values.push(curNode.value);
                curNode = curNode.next;
            }
        }
        return values;
    }
    function entries() {
        var _a, _b;
        var entires = [];
        for (var i = 0; i < capacity; i++) {
            var keyNode = (_a = keyBuckets[i]) === null || _a === void 0 ? void 0 : _a.headNode();
            var valNode = (_b = valueBuckets[i]) === null || _b === void 0 ? void 0 : _b.headNode();
            while (keyNode && valNode) {
                if (keyNode.value && valNode.value)
                    entires.push([keyNode.value, valNode.value]);
                keyNode = keyNode.next;
                valNode = valNode.next;
            }
        }
        return entires;
    }
    function print() {
        var _a, _b;
        for (var i = 0; i < capacity; i++)
            console.log(i, (_a = keyBuckets[i]) === null || _a === void 0 ? void 0 : _a.toString(), (_b = valueBuckets[i]) === null || _b === void 0 ? void 0 : _b.toString());
    }
    return {
        set: set,
        get: get,
        has: has,
        remove: remove,
        length: length,
        clear: clear,
        keys: keys,
        values: values,
        entries: entries,
        print: print
    };
}
exports.HashMap = HashMap;
function test() {
    var test = HashMap(); // or HashMap() if using a factory
    test.set("apple", "red");
    test.set("banana", "yellow");
    test.set("carrot", "orange");
    test.set("dog", "brown");
    test.set("elephant", "gray");
    test.set("frog", "green");
    test.set("grape", "purple");
    test.set("hat", "black");
    test.set("ice cream", "white");
    test.set("jacket", "blue");
    test.set("kite", "pink");
    test.set("lion", "golden");
    console.log(test.length());
    console.log(test.keys());
    console.log(test.values());
    console.log(test.entries());
    console.log(test.print());
    console.log("REMOVING lion", test.remove("lion"));
    console.log("REMOVING hat", test.remove("hat"));
    console.log("Removing frong", test.remove("frong"));
    console.log("Removing frog", test.remove("frog"));
    console.log("REMOVING ELEPHANT", test.remove("elephant"));
    test.print();
    console.log(test.remove("frog"));
    console.log(test.remove("grape"));
    console.log(test.remove("hat"));
    console.log(test.remove("ice cream"));
    console.log(test.remove("jacket"));
    console.log(test.remove("kite"));
    console.log(test.entries());
    console.log(test.print());
    console.log(test.length());
    test.clear();
    test.set("ice cream", "white");
    test.set("jacket", "blue");
    test.set("kite", "pink");
    test.set("lion", "golden");
    console.log(test.entries());
    test.set("lion", "black");
    console.log(test.has("lion"), test.get("lion"));
    test.print();
    console.log(test.length());
}
test();
