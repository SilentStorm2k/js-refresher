"use strict";
exports.__esModule = true;
var TreeNode = /** @class */ (function () {
    function TreeNode(data, left, right) {
        this.data = data;
        this.left = left !== null && left !== void 0 ? left : null;
        this.right = right !== null && right !== void 0 ? right : null;
    }
    return TreeNode;
}());
var Tree = /** @class */ (function () {
    function Tree(arr, comparator) {
        var _this = this;
        this.prettyPrint = function (node, prefix, isLeft) {
            if (prefix === void 0) { prefix = ""; }
            if (isLeft === void 0) { isLeft = true; }
            if (node === null) {
                return;
            }
            if (node.right !== null) {
                _this.prettyPrint(node.right, "".concat(prefix).concat(isLeft ? "│   " : "    "), false);
            }
            console.log("".concat(prefix).concat(isLeft ? "└── " : "┌── ").concat(node.data));
            if (node.left !== null) {
                _this.prettyPrint(node.left, "".concat(prefix).concat(isLeft ? "    " : "│   "), true);
            }
        };
        this.root = this.buildTree(arr, 0, arr.length - 1);
        this.comparator = comparator;
    }
    Tree.prototype.buildTree = function (arr, low, high) {
        if (low > high)
            return null;
        var mid = Math.floor((low + high) / 2);
        var newNode = new TreeNode(arr[mid]);
        newNode.left = this.buildTree(arr, low, mid - 1);
        newNode.right = this.buildTree(arr, mid + 1, high);
        return newNode;
    };
    Tree.prototype.insert = function (data) {
        var cur = this.root;
        while (cur) {
            // inserted data is less than/eq to cur node data
            if (this.comparator(data, cur.data) <= 0) {
                if (!cur.left) {
                    cur.left = new TreeNode(data);
                    break;
                }
                else
                    cur = cur.left;
            }
            else {
                if (!cur.right) {
                    cur.right = new TreeNode(data);
                    break;
                }
                else
                    cur = cur.right;
            }
        }
    };
    Tree.prototype["delete"] = function (data) {
        var cur = this.root;
        var prev = null;
        while (cur) {
            if (this.comparator(data, cur.data) == 0) {
                // delete operation goes here
                this.deleteNode(prev, cur);
                return true;
            }
            prev = cur;
            if (this.comparator(data, cur.data) < 0)
                cur = cur.left;
            else
                cur = cur.right;
        }
        return false;
    };
    Tree.prototype.find = function (value) {
        var cur = this.root;
        while (cur && cur.data != value) {
            if (this.comparator(cur.data, value) > 0)
                cur = cur.left;
            else
                cur = cur.right;
        }
        if (cur && cur.data == value)
            return cur;
        else
            return null;
    };
    Tree.prototype.levelOrder = function (cb) {
        var q = new Queue();
        if (this.root)
            q.push(this.root);
        while (!q.isEmpty()) {
            var node = q.pop();
            if (node)
                cb(node.data);
            if (node === null || node === void 0 ? void 0 : node.left)
                q.push(node.left);
            if (node === null || node === void 0 ? void 0 : node.right)
                q.push(node.right);
        }
    };
    Tree.prototype.inOrder = function (cb) {
        var cur = this.root;
        this.inOrderDfs(cur, cb);
    };
    Tree.prototype.preOrder = function (cb) {
        var cur = this.root;
        this.preOrderDfs(cur, cb);
    };
    Tree.prototype.postOrder = function (cb) {
        var cur = this.root;
        this.postOrderDfs(cur, cb);
    };
    Tree.prototype.depth = function (val) {
        var depth = 0;
        var cur = this.root;
        while (cur && this.comparator(cur.data, val) != 0) {
            if (this.comparator(cur.data, val) > 0)
                cur = cur.left;
            else
                cur = cur.right;
            depth += 1;
        }
        if (cur && this.comparator(cur.data, val) == 0)
            return depth;
        return null;
    };
    Tree.prototype.height = function (val) {
        var cur = this.find(val);
        if (!cur)
            return null;
        return this.getHeight(cur, 0) - 1;
    };
    Tree.prototype.getHeight = function (cur, height) {
        if (!cur)
            return height;
        return (1 +
            Math.max(this.getHeight(cur.left, height), this.getHeight(cur.right, height)));
    };
    Tree.prototype.deleteNode = function (prev, cur) {
        // node to be deleted has 2 children
        if (cur.right && cur.left)
            cur.data = this.deleteSmallest(cur, cur.right);
        // node to be deleted is a leaf node
        else if (this.isLeaf(cur)) {
            if (this.comparator(prev.data, cur.data) < 0)
                prev.right = null;
            else
                prev.left = null;
        }
        // node to be deleted has 1 child
        else {
            if (cur.left) {
                if (this.comparator(prev.data, cur.data) < 0)
                    prev.right = cur.left;
                else
                    prev.left = cur.left;
            }
            else {
                if (this.comparator(prev.data, cur.data) > 0)
                    prev.left = cur.right;
                else
                    prev.right = cur.right;
            }
        }
    };
    Tree.prototype.deleteSmallest = function (prev, cur) {
        while (cur.left) {
            prev = cur;
            cur = cur.left;
        }
        var smallest = cur.data;
        if (this.isLeaf(cur)) {
            if (this.comparator(prev.data, cur.data) > 0)
                prev.left = null;
            else
                prev.right = null;
        }
        else {
            if (this.comparator(prev.data, cur.data) > 0)
                prev.left = cur.right;
            else
                prev.right = cur.right;
        }
        return smallest;
    };
    Tree.prototype.inOrderDfs = function (cur, cb) {
        if (!cur)
            return;
        this.inOrderDfs(cur.left, cb);
        cb(cur.data);
        this.inOrderDfs(cur.right, cb);
    };
    Tree.prototype.preOrderDfs = function (cur, cb) {
        if (!cur)
            return;
        cb(cur.data);
        this.preOrderDfs(cur.left, cb);
        this.preOrderDfs(cur.right, cb);
    };
    Tree.prototype.postOrderDfs = function (cur, cb) {
        if (!cur)
            return;
        this.postOrderDfs(cur.left, cb);
        this.postOrderDfs(cur.right, cb);
        cb(cur.data);
    };
    Tree.prototype.isLeaf = function (node) {
        return !node.left && !node.right;
    };
    return Tree;
}());
var Queue = /** @class */ (function () {
    function Queue() {
        this.elements = [];
    }
    Queue.prototype.push = function (element) {
        this.elements.push(element);
    };
    Queue.prototype.pop = function () {
        var _a;
        return (_a = this.elements.shift()) !== null && _a !== void 0 ? _a : null;
    };
    Queue.prototype.isEmpty = function () {
        return this.elements.length == 0;
    };
    return Queue;
}());
var arr = [1, 2, 3, 4, 5, 6, 7];
var newTree = new Tree(arr, function (a, b) { return a - b; });
newTree.prettyPrint(newTree.root);
newTree.insert(9);
newTree.insert(3.5);
newTree.insert(4.5);
newTree.prettyPrint(newTree.root);
console.log(newTree["delete"](9));
newTree.prettyPrint(newTree.root);
newTree.insert(9);
console.log("deleting 7", newTree["delete"](7));
newTree.prettyPrint(newTree.root);
console.log("deleting 5", newTree["delete"](5));
newTree.prettyPrint(newTree.root);
console.log("deleting 2", newTree["delete"](2));
newTree.prettyPrint(newTree.root);
console.log("deleting 3", newTree["delete"](3));
newTree.prettyPrint(newTree.root);
console.log("deleting 9", newTree["delete"](9));
newTree.prettyPrint(newTree.root);
console.log("deleting 6", newTree["delete"](6));
newTree.prettyPrint(newTree.root);
newTree["delete"](1);
console.log("deleting 2", newTree["delete"](2));
newTree.prettyPrint(newTree.root);
console.log("Rebuilding Tree:");
newTree = new Tree(arr, function (a, b) { return a - b; });
newTree.prettyPrint(newTree.root);
var res = [];
newTree.levelOrder(function (ele) { return res.push(ele); });
console.log("LEVEL ORDER", res);
res = [];
newTree.inOrder(function (ele) { return res.push(ele); });
console.log("INORDER", res);
res = [];
newTree.preOrder(function (ele) { return res.push(ele); });
console.log("PREORDER", res);
res = [];
newTree.postOrder(function (ele) { return res.push(ele); });
console.log("POSTORDER", res);
console.log("Height of 4", newTree.height(4));
console.log("Height of 5", newTree.height(5));
console.log("Height of 2", newTree.height(2));
console.log("Height of unknown", newTree.height(99));
console.log("deleting 4", newTree["delete"](4));
newTree.prettyPrint(newTree.root);
console.log("deleting 5", newTree["delete"](5));
newTree.prettyPrint(newTree.root);
console.log("deleting 2", newTree["delete"](2));
newTree.prettyPrint(newTree.root);
console.log("Height of 6", newTree.height(6));
console.log("Depth of 6", newTree.depth(6));
console.log("Depth of 7", newTree.depth(7));
console.log("Depth of 1", newTree.depth(1));
console.log(newTree.find(3));
newTree.levelOrder(function (ele) { return console.log(ele); });
