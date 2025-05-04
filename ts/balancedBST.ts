class TreeNode<T> {
	data: T;
	left: TreeNode<T> | null;
	right: TreeNode<T> | null;
	constructor(data: T, left?: TreeNode<T>, right?: TreeNode<T>) {
		this.data = data;
		this.left = left ?? null;
		this.right = right ?? null;
	}
}

type Comparator<T> = (a: T, b: T) => number;

class Tree<T> {
	root: TreeNode<T> | null;
	comparator: Comparator<T>;
	constructor(arr: T[], comparator: Comparator<T>) {
		this.root = this.buildTree(arr, 0, arr.length - 1);
		this.comparator = comparator;
	}

	buildTree(arr: T[], low, high) {
		if (low > high) return null;

		const mid = Math.floor((low + high) / 2);
		const newNode = new TreeNode(arr[mid]);
		newNode.left = this.buildTree(arr, low, mid - 1);
		newNode.right = this.buildTree(arr, mid + 1, high);
		return newNode;
	}
	insert(data: T) {
		let cur = this.root;
		while (cur) {
			// inserted data is less than/eq to cur node data
			if (this.comparator(data, cur.data) <= 0) {
				if (!cur.left) {
					cur.left = new TreeNode(data);
					break;
				} else cur = cur.left;
			} else {
				if (!cur.right) {
					cur.right = new TreeNode(data);
					break;
				} else cur = cur.right;
			}
		}
	}
	delete(data: T) {
		let cur = this.root;
		let prev: TreeNode<T> | null = null;
		while (cur) {
			if (this.comparator(data, cur.data) == 0) {
				// delete operation goes here
				this.deleteNode(prev, cur);
				return true;
			}
			prev = cur;
			if (this.comparator(data, cur.data) < 0) cur = cur.left;
			else cur = cur.right;
		}
		return false;
	}
	find(value: T) {
		let cur = this.root;
		while (cur && cur.data != value) {
			if (this.comparator(cur.data, value) > 0) cur = cur.left;
			else cur = cur.right;
		}
		if (cur && cur.data == value) return cur;
		else return null;
	}
	levelOrder(cb: (val: T) => void) {
		let q = new Queue<TreeNode<T>>();
		if (this.root) q.push(this.root);
		while (!q.isEmpty()) {
			const node = q.pop();
			if (node) cb(node.data);
			if (node?.left) q.push(node.left);
			if (node?.right) q.push(node.right);
		}
	}
	inOrder(cb: (val: T) => void) {
		let cur = this.root;
		this.inOrderDfs(cur, cb);
	}
	preOrder(cb: (val: T) => void) {
		let cur = this.root;
		this.preOrderDfs(cur, cb);
	}
	postOrder(cb: (val: T) => void) {
		let cur = this.root;
		this.postOrderDfs(cur, cb);
	}
	private deleteNode(prev, cur) {
		// node to be deleted has 2 children
		if (cur.right && cur.left)
			cur.data = this.deleteSmallest(cur, cur.right);
		// node to be deleted is a leaf node
		else if (this.isLeaf(cur)) {
			if (this.comparator(prev.data, cur.data) < 0) prev.right = null;
			else prev.left = null;
		}
		// node to be deleted has 1 child
		else {
			if (cur.left) {
				if (this.comparator(prev.data, cur.data) < 0)
					prev.right = cur.left;
				else prev.left = cur.left;
			} else {
				if (this.comparator(prev.data, cur.data) > 0)
					prev.left = cur.right;
				else prev.right = cur.right;
			}
		}
	}

	private deleteSmallest(parent, cur) {
		while (cur.left) {
			parent = cur;
			cur = cur.left;
		}
		const smallest = cur.data;
		if (this.isLeaf(cur)) {
			if (this.comparator(parent.data, cur.data) > 0) parent.left = null;
			else parent.right = null;
		} else {
			if (this.comparator(parent.data, cur.data) > 0)
				parent.left = cur.right;
			else parent.right = cur.right;
		}
		return smallest;
	}

	private inOrderDfs(cur, cb: (val: T) => void) {
		if (!cur) return;
		this.inOrderDfs(cur.left, cb);
		cb(cur.data);
		this.inOrderDfs(cur.right, cb);
	}
	private preOrderDfs(cur, cb: (val: T) => void) {
		if (!cur) return;
		cb(cur.data);
		this.preOrderDfs(cur.left, cb);
		this.preOrderDfs(cur.right, cb);
	}
	private postOrderDfs(cur, cb: (val: T) => void) {
		if (!cur) return;
		this.postOrderDfs(cur.left, cb);
		this.postOrderDfs(cur.right, cb);
		cb(cur.data);
	}

	private isLeaf(node) {
		return !node.left && !node.right;
	}

	prettyPrint = (node, prefix = "", isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? "    " : "│   "}`,
				true
			);
		}
	};
}

class Queue<T> {
	private elements: T[] = [];
	push(element: T) {
		this.elements.push(element);
	}
	pop(): T | null {
		return this.elements.shift() ?? null;
	}
	isEmpty() {
		return this.elements.length == 0;
	}
}

export {};
const arr = [1, 2, 3, 4, 5, 6, 7];
let newTree = new Tree(arr, (a, b) => a - b);
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
newTree = new Tree(arr, (a, b) => a - b);
newTree.prettyPrint(newTree.root);
let res: number[] = [];
newTree.levelOrder((ele) => res.push(ele));
console.log("LEVEL ORDER", res);
res = [];
newTree.inOrder((ele) => res.push(ele));
console.log("INORDER", res);
res = [];
newTree.preOrder((ele) => res.push(ele));
console.log("PREORDER", res);
res = [];
newTree.postOrder((ele) => res.push(ele));
console.log("POSTORDER", res);

console.log("deleting 4", newTree.delete(4));
newTree.prettyPrint(newTree.root);

console.log("deleting 5", newTree.delete(5));
newTree.prettyPrint(newTree.root);

console.log("deleting 2", newTree.delete(2));
newTree.prettyPrint(newTree.root);

console.log(newTree.find(3));
newTree.levelOrder((ele) => console.log(ele));
