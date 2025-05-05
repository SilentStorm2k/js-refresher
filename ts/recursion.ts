function fibs(num: number): number[] {
	const ret: number[] = [];
	let a = 0,
		b = 1;
	for (let i = 0; i < num; i++) {
		ret.push(a);
		const temp = a;
		a = b;
		b += temp;
	}
	return ret;
}

function fibsRec(num: number): number[] {
	const arr: number[] = [];
	function fibsRecHelper(a: number, b: number) {
		if (num == 0) return;
		else {
			arr.push(a);
			num -= 1;
			fibsRecHelper(b, a + b);
		}
	}
	fibsRecHelper(0, 1);
	return arr;
}

console.log(fibs(8));
console.log(fibsRec(8));

function mergeSort(arr: number[]): number[] {
	if (arr.length == 1) return [...arr];
	// split step
	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));

	// merge step
	const ret: number[] = [];
	let i = 0,
		j = 0;
	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) ret.push(left[i++]);
		else ret.push(right[j++]);
	}
	while (i < left.length) ret.push(left[i++]);
	while (j < right.length) ret.push(right[j++]);
	return ret;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));

export {};
