import { LinkedList } from "./linkedList";

function HashSet(loadFactor: number = 0.75) {
	const minCapacity = 16;
	let capacity: number = minCapacity;
	let size: number = 0;
	let keyBuckets: LinkedList<string>[] = [];
	const shrinkFactor = 3;
	function hash(key: string): number {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++)
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		return hashCode % capacity;
	}
	function add(key: string) {
		const idx = hash(key);
		if (keyBuckets[idx] == undefined) keyBuckets[idx] = new LinkedList();

		const idxInBucket = keyBuckets[idx]?.find(key);
		// this key already exists, only need to update it now
		if (idxInBucket != null) return;
		// this key does not exists, create it and
		else {
			keyBuckets[idx].append(key);
			size += 1;
		}

		if (size >= capacity * loadFactor) grow();
	}
	function grow() {
		const currentEntries = keys();
		capacity *= 2;
		clear();
		for (const key of currentEntries) if (key) add(key);
	}
	function shrink() {
		const currentEntries = keys();
		capacity = Math.floor(capacity / 2);
		clear();
		for (const key of currentEntries) if (key) add(key);
	}
	function has(key: string) {
		const bucketIdx = hash(key);
		return keyBuckets[bucketIdx].contains(key);
	}
	function remove(key: string) {
		const bucketIdx = hash(key);
		const idx = keyBuckets[bucketIdx].find(key);
		if (idx != null) {
			keyBuckets[bucketIdx].removeAt(idx);
			size -= 1;
			if (
				size < capacity / shrinkFactor &&
				capacity / shrinkFactor >= minCapacity
			)
				shrink();
			return true;
		}
		return false;
	}
	function length(): number {
		return size;
	}
	function clear(): void {
		keyBuckets = [];
		capacity = Math.max(minCapacity, capacity);
		size = 0;
	}
	function keys(): Array<string | null> {
		let keys: Array<string | null> = [];
		for (let i = 0; i < capacity; i++) {
			let curNode = keyBuckets[i]?.headNode();
			while (curNode) {
				keys.push(curNode.value);
				curNode = curNode.next;
			}
		}
		return keys;
	}
	function print() {
		for (let i = 0; i < capacity; i++)
			console.log(i, keyBuckets[i]?.toString());
	}

	return {
		add,
		has,
		remove,
		length,
		clear,
		keys,
		print,
	};
}

export { HashSet };

function test() {
	const test = HashSet(); // or HashMap() if using a factory

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
