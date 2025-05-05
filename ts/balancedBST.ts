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
	private root: TreeNode<T> | null;
	private comparator: Comparator<T>;
	constructor(arr: T[], comparator: Comparator<T>) {
		this.root = this.buildTree(arr, 0, arr.length - 1);
		this.comparator = comparator;
	}

	buildTree(arr: T[], low: number, high: number) {
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
	depth(val: T) {
		let depth = 0;
		let cur = this.root;
		while (cur && this.comparator(cur.data, val) != 0) {
			if (this.comparator(cur.data, val) > 0) cur = cur.left;
			else cur = cur.right;
			depth += 1;
		}
		if (cur && this.comparator(cur.data, val) == 0) return depth;
		return null;
	}
	height(val: T) {
		let cur = this.find(val);
		if (!cur) return null;
		return this.getHeight(cur, 0) - 1;
	}
	private getHeight(cur: TreeNode<T> | null, height: number): number {
		if (!cur) return height;
		return (
			1 +
			Math.max(
				this.getHeight(cur.left, height),
				this.getHeight(cur.right, height)
			)
		);
	}
	isBalanced() {
		return this.isBalancedHelper(this.root);
	}
	rebalance() {
		const sortedValues: T[] = [];
		this.inOrder((element) => sortedValues.push(element));
		this.root = this.buildTree(sortedValues, 0, sortedValues.length - 1);
	}
	private isBalancedHelper(node: TreeNode<T> | null): boolean {
		let res = true; // vacuously
		if (node)
			res =
				Math.abs(
					this.getHeight(node.left, 0) - this.getHeight(node.right, 0)
				) <= 1 &&
				this.isBalancedHelper(node.left) &&
				this.isBalancedHelper(node.right);
		return res;
	}
	private deleteNode(prev: TreeNode<T> | null, cur: TreeNode<T>) {
		// node to be deleted has 2 children
		if (cur.right && cur.left)
			cur.data = this.deleteSmallest(cur, cur.right);
		// node to be deleted is a leaf node
		else if (this.isLeaf(cur) && prev) {
			if (this.comparator(prev.data, cur.data) < 0) prev.right = null;
			else prev.left = null;
		}
		// node to be deleted has 1 child
		else {
			if (prev) {
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
	}

	private deleteSmallest(prev: TreeNode<T>, cur: TreeNode<T>) {
		while (cur.left) {
			prev = cur;
			cur = cur.left;
		}
		const smallest = cur.data;
		if (this.isLeaf(cur)) {
			if (this.comparator(prev.data, cur.data) > 0) prev.left = null;
			else prev.right = null;
		} else {
			if (this.comparator(prev.data, cur.data) > 0) prev.left = cur.right;
			else prev.right = cur.right;
		}
		return smallest;
	}

	private inOrderDfs(cur: TreeNode<T> | null, cb: (val: T) => void) {
		if (!cur) return;
		this.inOrderDfs(cur.left, cb);
		cb(cur.data);
		this.inOrderDfs(cur.right, cb);
	}
	private preOrderDfs(cur: TreeNode<T> | null, cb: (val: T) => void) {
		if (!cur) return;
		cb(cur.data);
		this.preOrderDfs(cur.left, cb);
		this.preOrderDfs(cur.right, cb);
	}
	private postOrderDfs(cur: TreeNode<T> | null, cb: (val: T) => void) {
		if (!cur) return;
		this.postOrderDfs(cur.left, cb);
		this.postOrderDfs(cur.right, cb);
		cb(cur.data);
	}

	private isLeaf(node: TreeNode<T>) {
		return !node.left && !node.right;
	}

	prettyPrint = (
		node: TreeNode<T> | null = this.root ?? null,
		prefix = "",
		isLeft = true
	) => {
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

function test() {
	let seedArray = generateSortedArray(80);
	console.log(seedArray);
	let bTree = new Tree<number>(seedArray, (a, b) => a - b);
	console.log("Checking if balanced", bTree.isBalanced());
	let print: number[] = [];
	bTree.levelOrder((e) => print.push(e));
	console.log(print);
	print = [];
	bTree.preOrder((e) => print.push(e));
	console.log(print);
	print = [];
	bTree.postOrder((e) => print.push(e));
	console.log(print);
	print = [];
	bTree.inOrder((e) => print.push(e));
	console.log(print);

	const newElements = generateSortedArray(80, 101, 200);
	console.log("ADDING NEW ELEMENTS TO UNBALANCE");
	for (const element of newElements) bTree.insert(element);

	console.log("Checking if balanced", bTree.isBalanced());
	console.log("REBALANCING");
	bTree.rebalance();
	console.log("Checking if balanced", bTree.isBalanced());

	print = [];
	bTree.levelOrder((e) => print.push(e));
	console.log(print);
	print = [];
	bTree.preOrder((e) => print.push(e));
	console.log(print);
	print = [];
	bTree.postOrder((e) => print.push(e));
	console.log(print);
	print = [];
	bTree.inOrder((e) => print.push(e));
	console.log(print);
}

function generateSortedArray(
	size: number,
	min: number = 0,
	max: number = 100
): number[] {
	min = Math.ceil(min);
	max = Math.ceil(max);
	if (min >= max || max - min < size) throw Error("Invalid size min and max");
	const set = new Set<number>();
	while (set.size < size)
		set.add(Math.floor(Math.random() * (max - min + 1) + min));
	return [...set].sort((a, b) => a - b);
}

test();
