"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Tree.prototype.delete = function (data) {
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
    Tree.prototype.deleteSmallest = function (parent, cur) {
        while (cur.left) {
            parent = cur;
            cur = cur.left;
        }
        var smallest = cur.data;
        if (this.isLeaf(cur)) {
            if (this.comparator(parent.data, cur.data) > 0)
                parent.left = null;
            else
                parent.right = null;
        }
        else {
            if (this.comparator(parent.data, cur.data) > 0)
                parent.left = cur.right;
            else
                parent.right = cur.right;
        }
        return smallest;
    };
    Tree.prototype.isLeaf = function (node) {
        return !node.left && !node.right;
    };
    return Tree;
}());
var arr = [1, 2, 3, 4, 5, 6, 7];
var newTree = new Tree(arr, function (a, b) { return a - b; });
newTree.prettyPrint(newTree.root);
newTree.insert(9);
newTree.insert(3.5);
newTree.insert(4.5);
newTree.prettyPrint(newTree.root);
console.log(newTree.delete(9));
newTree.prettyPrint(newTree.root);
newTree.insert(9);
console.log("deleting 7", newTree.delete(7));
newTree.prettyPrint(newTree.root);
console.log("deleting 5", newTree.delete(5));
newTree.prettyPrint(newTree.root);
console.log("deleting 2", newTree.delete(2));
newTree.prettyPrint(newTree.root);
console.log("deleting 3", newTree.delete(3));
newTree.prettyPrint(newTree.root);
console.log("deleting 9", newTree.delete(9));
newTree.prettyPrint(newTree.root);
console.log("deleting 6", newTree.delete(6));
newTree.prettyPrint(newTree.root);
newTree.delete(1);
console.log("deleting 2", newTree.delete(2));
newTree.prettyPrint(newTree.root);
console.log("Rebuilding Tree:");
newTree = new Tree(arr, function (a, b) { return a - b; });
newTree.prettyPrint(newTree.root);
console.log("deleting 4", newTree.delete(4));
newTree.prettyPrint(newTree.root);
console.log("deleting 5", newTree.delete(5));
newTree.prettyPrint(newTree.root);
console.log("deleting 2", newTree.delete(2));
newTree.prettyPrint(newTree.root);
console.log(newTree.find(3));
