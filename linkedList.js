"use strict";
exports.__esModule = true;
exports.LinkedList = void 0;
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this._head = new ListNode();
        this._tail = this._head;
        this._size = 0;
    }
    LinkedList.prototype.append = function (value) {
        var cur = this._tail;
        this._tail = new ListNode(value);
        cur.next = this._tail;
        this._size += 1;
        if (this._size == 1)
            this._head.next = this._tail;
    };
    LinkedList.prototype.prepend = function (value) {
        var cur = new ListNode(value);
        cur.next = this._head.next;
        this._head.next = cur;
        this._size += 1;
        if (this._size == 1)
            this._tail = cur;
    };
    LinkedList.prototype.size = function () {
        return this._size;
    };
    LinkedList.prototype.headNode = function () {
        return this._head.next;
    };
    LinkedList.prototype.head = function () {
        var _a, _b;
        return (_b = (_a = this._head.next) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : null;
    };
    LinkedList.prototype.tail = function () {
        var _a;
        return (_a = this._tail.value) !== null && _a !== void 0 ? _a : null;
    };
    LinkedList.prototype.at = function (index) {
        if (index >= 0 && index < this._size && this._head.next != null) {
            var cur = this._head.next;
            while (index > 0 && cur.next != null) {
                cur = cur === null || cur === void 0 ? void 0 : cur.next;
                index -= 1;
            }
            return cur.value;
        }
        else
            console.error("Index ".concat(index, " out of bounds"));
        return null;
    };
    LinkedList.prototype.pop = function () {
        if (this._size > 0 && this._head.next) {
            var cur = this._head.next;
            var retVal = this._tail.value;
            if (cur == this._tail)
                cur = this._head;
            else {
                while (cur.next != null && cur.next != this._tail)
                    cur = cur === null || cur === void 0 ? void 0 : cur.next;
                cur.next = null;
            }
            this._tail = cur;
            this._tail.next = null;
            this._size -= 1;
            return retVal;
        }
        else
            console.error("LinkedList already empty");
        return null;
    };
    LinkedList.prototype.contains = function (value) {
        var cur = this._head.next;
        while (cur != null) {
            if (cur.value == value)
                return true;
            cur = cur.next;
        }
        return false;
    };
    LinkedList.prototype.find = function (value) {
        var cur = this._head.next;
        var index = 0;
        while (cur != null) {
            if (cur.value == value)
                return index;
            cur = cur.next;
            index += 1;
        }
        return null;
    };
    LinkedList.prototype.toString = function () {
        var cur = this._head.next;
        var retStr = "";
        while (cur != null) {
            retStr += "( ".concat(cur.value, " ) -> ");
            cur = cur.next;
        }
        return retStr + "null";
    };
    LinkedList.prototype.insertAt = function (value, index) {
        var _a;
        if (index == 0)
            this.prepend(value);
        else if (index == this._size)
            this.append(value);
        else if (index > 0 && index < this._size) {
            var cur = this._head.next;
            var curIdx = 0;
            while (curIdx != index - 1 && cur) {
                curIdx += 1;
                cur = cur === null || cur === void 0 ? void 0 : cur.next;
            }
            if (cur) {
                var newNode = new ListNode(value, (_a = cur === null || cur === void 0 ? void 0 : cur.next) !== null && _a !== void 0 ? _a : undefined);
                cur.next = newNode;
                this._size += 1;
            }
            else
                console.error("SOMETHING BAD HAPPENED");
        }
        else
            console.error("Index ".concat(index, " is invalid for list of size ").concat(this._size));
    };
    LinkedList.prototype.removeAt = function (index) {
        var _a, _b, _c;
        if (this.size() == 1 || index == this.size())
            return this.pop();
        else if (index == 0) {
            var retVal = this.head();
            this._head.next = (_b = (_a = this._head.next) === null || _a === void 0 ? void 0 : _a.next) !== null && _b !== void 0 ? _b : null;
            return retVal;
        }
        else if (index > 0 && index < this._size) {
            var cur = this._head.next;
            var curIdx = 0;
            while (curIdx != index - 1 && cur) {
                curIdx += 1;
                cur = cur === null || cur === void 0 ? void 0 : cur.next;
            }
            if (cur === null || cur === void 0 ? void 0 : cur.next) {
                var retVal = cur.next.value;
                cur.next = (_c = cur.next) === null || _c === void 0 ? void 0 : _c.next;
                this._size -= 1;
                return retVal;
            }
            else
                console.error("SOMETHING BAD HAPPENED");
        }
        else
            console.error("Index ".concat(index, " is invalid for list of size ").concat(this._size));
        return this.head();
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var ListNode = /** @class */ (function () {
    function ListNode(value, next) {
        this.value = value !== null && value !== void 0 ? value : null;
        this.next = next !== null && next !== void 0 ? next : null;
    }
    return ListNode;
}());
// The following tests are written using Large Language Models:
// Simple assertion functions
function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error("\u274C FAIL: ".concat(message, " - Expected: ").concat(expected, ", Got: ").concat(actual));
    }
    else {
        console.log("\u2705 PASS: ".concat(message));
    }
}
function assertStrictEqual(actual, expected, message) {
    if (actual !== expected) {
        // Using strict inequality (===) might be better depending on T
        console.error("\u274C FAIL: ".concat(message, " - Expected: ").concat(expected, " (").concat(typeof expected, "), Got: ").concat(actual, " (").concat(typeof actual, ")"));
    }
    else {
        console.log("\u2705 PASS: ".concat(message));
    }
}
function assertTrue(condition, message) {
    if (!condition) {
        console.error("\u274C FAIL: ".concat(message, " - Expected condition to be true"));
    }
    else {
        console.log("\u2705 PASS: ".concat(message));
    }
}
function assertFalse(condition, message) {
    if (condition) {
        console.error("\u274C FAIL: ".concat(message, " - Expected condition to be false"));
    }
    else {
        console.log("\u2705 PASS: ".concat(message));
    }
}
function tests() {
    // ... (ListNode and LinkedList classes above) ...
    console.log("--- Starting LinkedList Tests ---");
    // Test Case 1: Basic Appending and Size
    var list = new LinkedList();
    list.append("dog");
    list.append("cat");
    list.append("parrot");
    assertEqual(list.size(), 3, "Size after appending 3 elements");
    assertEqual(list.head(), "dog", "Head after appending");
    assertEqual(list.tail(), "parrot", "Tail after appending");
    assertEqual(list.toString(), "( dog ) -> ( cat ) -> ( parrot ) -> null", "String representation after appending");
    // Test Case 2: Prepending
    list.prepend("bug"); // List: bug -> dog -> cat -> parrot
    assertEqual(list.size(), 4, "Size after prepending");
    assertEqual(list.head(), "bug", "Head after prepending");
    assertEqual(list.tail(), "parrot", "Tail after prepending"); // Tail should not change with prepend
    assertEqual(list.toString(), "( bug ) -> ( dog ) -> ( cat ) -> ( parrot ) -> null", "String representation after prepending");
    // Test Case 3: Adding more elements for comprehensive tests
    list.append("hamster"); // List: bug -> dog -> cat -> parrot -> hamster
    list.append("snake"); // List: bug -> dog -> cat -> parrot -> hamster -> snake
    list.append("turtle"); // List: bug -> dog -> cat -> parrot -> hamster -> snake -> turtle
    assertEqual(list.size(), 7, "Size after more appends and prepends");
    assertEqual(list.head(), "bug", "Head after mixed operations");
    assertEqual(list.tail(), "turtle", "Tail after mixed operations");
    assertEqual(list.toString(), "( bug ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null", "String representation after mixed operations");
    // Test Case 4: Testing at(index)
    console.log("\n--- Testing at(index) ---");
    assertEqual(list.at(0), "bug", "at(0)");
    assertEqual(list.at(1), "dog", "at(1)");
    assertEqual(list.at(2), "cat", "at(2)");
    assertEqual(list.at(3), "parrot", "at(3)");
    assertEqual(list.at(4), "hamster", "at(4)");
    assertEqual(list.at(5), "snake", "at(5)");
    assertEqual(list.at(6), "turtle", "at(6)");
    // Test out of bounds indices - your current implementation console.errors and returns null
    // We can test the return value. To test console.error, you'd need a framework or more complex custom setup,
    // but checking the null return value is sufficient for basic verification.
    assertEqual(list.at(7), null, "at(7) - out of bounds");
    assertEqual(list.at(-1), null, "at(-1) - out of bounds");
    // Test Case 5: Testing contains(value)
    console.log("\n--- Testing contains(value) ---");
    assertTrue(list.contains("bug"), "contains('bug')");
    assertTrue(list.contains("snake"), "contains('snake')");
    assertTrue(list.contains("turtle"), "contains('turtle')");
    assertFalse(list.contains("dolphin"), "contains('dolphin') - not in list");
    assertFalse(list.contains("zebra"), "contains('zebra') - not in list");
    // Test Case 6: Testing find(value)
    console.log("\n--- Testing find(value) ---");
    assertEqual(list.find("bug"), 0, "find('bug')");
    assertEqual(list.find("snake"), 5, "find('snake')");
    assertEqual(list.find("turtle"), 6, "find('turtle')");
    assertEqual(list.find("dolphin"), null, "find('dolphin') - not in list");
    assertEqual(list.find("zebra"), null, "find('zebra') - not in list");
    // Add a duplicate to test finding the first instance
    list.append("dog"); // List: bug -> ... -> turtle -> dog
    assertEqual(list.find("dog"), 1, "find('dog') - first instance");
    // Test Case 7: Testing pop()
    console.log("\n--- Testing pop() ---");
    assertEqual(list.pop(), "dog", "pop() - removing last element (dog)"); // Should remove the appended 'dog'
    assertEqual(list.size(), 7, "Size after pop");
    assertEqual(list.tail(), "turtle", "Tail after pop");
    assertEqual(list.toString(), "( bug ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null", "String after pop"); // Wait, something is wrong here. Pop should remove the tail, which is 'turtle'. Let's fix the list state for subsequent pops.
    // Reset the list or manage state carefully for pops
    // Let's create a new list for pop tests to keep it clean
    var popList = new LinkedList();
    popList.append("a");
    popList.append("b");
    popList.append("c"); // List: a -> b -> c
    assertEqual(popList.size(), 3, "Pop list initial size");
    assertEqual(popList.tail(), "c", "Pop list initial tail");
    assertEqual(popList.pop(), "c", "pop() from [a, b, c]"); // Should remove 'c'
    assertEqual(popList.size(), 2, "Pop list size after first pop");
    assertEqual(popList.tail(), "b", "Pop list tail after first pop");
    assertEqual(popList.toString(), "( a ) -> ( b ) -> null", "Pop list string after first pop");
    assertEqual(popList.pop(), "b", "pop() from [a, b]"); // Should remove 'b'
    assertEqual(popList.size(), 1, "Pop list size after second pop");
    assertEqual(popList.tail(), "a", "Pop list tail after second pop");
    assertEqual(popList.toString(), "( a ) -> null", "Pop list string after second pop");
    assertEqual(popList.pop(), "a", "pop() from [a]"); // Should remove 'a'
    assertEqual(popList.size(), 0, "Pop list size after third pop");
    assertEqual(popList.head(), null, "Pop list head after last pop");
    assertEqual(popList.tail(), null, "Pop list tail after last pop");
    assertEqual(popList.toString(), "null", "Pop list string after last pop (empty)");
    // Test popping from an empty list - your implementation console.errors and returns null
    assertEqual(popList.pop(), null, "pop() from empty list");
    assertEqual(popList.size(), 0, "Pop list size after popping from empty");
    // Test Case 8: Testing insertAt(value, index)
    console.log("\n--- Testing insertAt(value, index) ---");
    var insertList = new LinkedList();
    // Insert at index 0 (empty list)
    insertList.insertAt("first", 0); // List: first
    assertEqual(insertList.size(), 1, "insertAt(0) on empty size");
    assertEqual(insertList.head(), "first", "insertAt(0) on empty head");
    assertEqual(insertList.tail(), "first", "insertAt(0) on empty tail");
    assertEqual(insertList.toString(), "( first ) -> null", "insertAt(0) on empty string");
    // Insert at index 0 (non-empty list)
    insertList.insertAt("new first", 0); // List: new first -> first
    assertEqual(insertList.size(), 2, "insertAt(0) size");
    assertEqual(insertList.head(), "new first", "insertAt(0) head");
    assertEqual(insertList.tail(), "first", "insertAt(0) tail");
    assertEqual(insertList.toString(), "( new first ) -> ( first ) -> null", "insertAt(0) string");
    // Insert at the end (index size)
    insertList.insertAt("last", insertList.size()); // List: new first -> first -> last
    assertEqual(insertList.size(), 3, "insertAt(size) size");
    assertEqual(insertList.head(), "new first", "insertAt(size) head");
    assertEqual(insertList.tail(), "last", "insertAt(size) tail");
    assertEqual(insertList.toString(), "( new first ) -> ( first ) -> ( last ) -> null", "insertAt(size) string");
    // Insert in the middle
    insertList.insertAt("middle", 1); // List: new first -> middle -> first -> last
    assertEqual(insertList.size(), 4, "insertAt(middle) size");
    assertEqual(insertList.at(1), "middle", "insertAt(middle) value check");
    assertEqual(insertList.toString(), "( new first ) -> ( middle ) -> ( first ) -> ( last ) -> null", "insertAt(middle) string");
    insertList.insertAt("another middle", 3); // List: new first -> middle -> first -> another middle -> last
    assertEqual(insertList.size(), 5, "insertAt(another middle) size");
    assertEqual(insertList.at(3), "another middle", "insertAt(another middle) value check");
    assertEqual(insertList.toString(), "( new first ) -> ( middle ) -> ( first ) -> ( another middle ) -> ( last ) -> null", "insertAt(another middle) string");
    // Test invalid indices - your implementation console.errors and returns nothing/behaves unexpectedly
    // We can't easily check for console.error without a framework here, but we can check that
    // the list state (size and content) doesn't change unexpectedly for invalid indices.
    console.log("\n--- Testing insertAt(value, index) invalid indices ---");
    var insertInvalidList = new LinkedList();
    insertInvalidList.append("a");
    insertInvalidList.append("b"); // List: a -> b
    var initialSize = insertInvalidList.size();
    var initialString = insertInvalidList.toString();
    insertInvalidList.insertAt("invalid", -1); // Invalid negative index
    assertEqual(insertInvalidList.size(), initialSize, "insertAt(-1) size unchanged");
    assertEqual(insertInvalidList.toString(), initialString, "insertAt(-1) string unchanged");
    insertInvalidList.insertAt("invalid", 3); // Invalid index > size
    assertEqual(insertInvalidList.size(), initialSize, "insertAt(size + 1) size unchanged");
    assertEqual(insertInvalidList.toString(), initialString, "insertAt(size + 1) string unchanged");
    insertInvalidList.insertAt("invalid", 100); // Invalid index way too high
    assertEqual(insertInvalidList.size(), initialSize, "insertAt(very high) size unchanged");
    assertEqual(insertInvalidList.toString(), initialString, "insertAt(very high) string unchanged");
    // Test Case 9: Testing removeAt(value, index) - (Currently empty, placeholder)
    // When you implement removeAt, add tests here following the pattern above.
    // For example:
    console.log("\n--- Testing removeAt(index) ---");
    var removeList = new LinkedList();
    removeList.append("x");
    removeList.append("y");
    removeList.append("z"); // List: x -> y -> z
    // Assuming removeAt returns the value removed
    assertEqual(removeList.removeAt(1), "y", "removeAt(1) - middle");
    assertEqual(removeList.size(), 2, "removeAt(1) size");
    assertEqual(removeList.toString(), "( x ) -> ( z ) -> null", "removeAt(1) string");
    // ... add tests for removing head, tail, only element, empty list, invalid index ...
    console.log("\n--- Finished LinkedList Tests ---");
}
// tests();
