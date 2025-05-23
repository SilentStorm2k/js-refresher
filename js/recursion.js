"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fibs(num) {
    const ret = [];
    let a = 0, b = 1;
    for (let i = 0; i < num; i++) {
        ret.push(a);
        const temp = a;
        a = b;
        b += temp;
    }
    return ret;
}
function fibsRec(num) {
    const arr = [];
    function fibsRecHelper(a, b) {
        if (num == 0)
            return;
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
function mergeSort(arr) {
    if (arr.length == 1)
        return [...arr];
    // split step
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    // merge step
    const ret = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j])
            ret.push(left[i++]);
        else
            ret.push(right[j++]);
    }
    while (i < left.length)
        ret.push(left[i++]);
    while (j < right.length)
        ret.push(right[j++]);
    return ret;
}
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));
