"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMap = HashMap;
const linkedList_1 = require("./linkedList");
function HashMap(loadFactor = 0.75) {
    const minCapacity = 16;
    let capacity = minCapacity;
    let size = 0;
    let keyBuckets = [];
    let valueBuckets = [];
    const shrinkFactor = 3;
    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++)
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        return hashCode % capacity;
    }
    function set(key, value) {
        const idx = hash(key);
        if (keyBuckets[idx] == undefined) {
            keyBuckets[idx] = new linkedList_1.LinkedList();
            valueBuckets[idx] = new linkedList_1.LinkedList();
        }
        const idxInBucket = keyBuckets[idx]?.find(key);
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
        const currentEntries = entries();
        capacity *= 2;
        clear();
        for (const [key, value] of currentEntries)
            set(key, value);
    }
    function shrink() {
        const currentEntries = entries();
        capacity = Math.floor(capacity / 2);
        clear();
        for (const [key, value] of currentEntries)
            set(key, value);
    }
    function get(key) {
        const bucketIdx = hash(key);
        const idx = keyBuckets[bucketIdx].find(key);
        if (idx != null)
            return valueBuckets[bucketIdx].at(idx);
        return null;
    }
    function has(key) {
        const bucketIdx = hash(key);
        return keyBuckets[bucketIdx].contains(key);
    }
    function remove(key) {
        const bucketIdx = hash(key);
        const idx = keyBuckets[bucketIdx].find(key);
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
        let keys = [];
        for (let i = 0; i < capacity; i++) {
            let curNode = keyBuckets[i]?.headNode();
            while (curNode) {
                keys.push(curNode.value);
                curNode = curNode.next;
            }
        }
        return keys;
    }
    function values() {
        let values = [];
        for (let i = 0; i < capacity; i++) {
            let curNode = valueBuckets[i]?.headNode();
            while (curNode) {
                values.push(curNode.value);
                curNode = curNode.next;
            }
        }
        return values;
    }
    function entries() {
        let entires = [];
        for (let i = 0; i < capacity; i++) {
            let keyNode = keyBuckets[i]?.headNode();
            let valNode = valueBuckets[i]?.headNode();
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
        for (let i = 0; i < capacity; i++)
            console.log(i, keyBuckets[i]?.toString(), valueBuckets[i]?.toString());
    }
    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
        print,
    };
}
function test() {
    const test = HashMap(); // or HashMap() if using a factory
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
