var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function fibs(num) {
    var ret = [];
    var a = 0, b = 1;
    for (var i = 0; i < num; i++) {
        ret.push(a);
        var temp = a;
        a = b;
        b += temp;
    }
    return ret;
}
function fibsRec(num) {
    var arr = [];
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
        return __spreadArray([], arr, true);
    // split step
    var mid = Math.floor(arr.length / 2);
    var left = mergeSort(arr.slice(0, mid));
    var right = mergeSort(arr.slice(mid));
    // merge step
    var ret = [];
    var i = 0, j = 0;
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
