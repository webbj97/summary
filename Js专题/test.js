// Array.prototype.newFindIndex = function(callback) {
//     const _arr = this;
//     const len = _arr.length;
//     for (let i = 0; i < len; i++) {
//         if (callback(_arr[i], i, _arr)) {
//             return i;
//         }
//     }
//     return -1;
// }

// Array.prototype.newFindlastIndex = function(callback) {
//     const _arr = this;
//     const len = _arr.length;
//     for (let i = len - 1; i >= 0; i--) {
//         if (callback(_arr[i], i, _arr)) {
//             return i;
//         }
//     }
//     return -1;
// }

// /**
//  * @private
//  * @param {Array} array 数组
//  * @param {Function} predicate 要执行的判断函数
//  * @param {boolean} [fromRight] 从右向左查找
//  * @returns {number} 返回第一个符合条件元素的下标或-1
//  */
// function baseFindIndex(array, predicate, fromRight) {
//     const { length } = array;
//     let index = fromRight ? length : -1

//     while ((fromRight ? index-- : ++index < length)) {
//         if (predicate(array[index], index, array)) {
//             return index
//         }
//     }
//     return -1;
// }


// const array1 = [5, 12, 8, 130, 44];
// const isLargeNumber = (element) => element > 13;
// console.log(array1.newFindIndex(isLargeNumber));


// function sortIndex(array, value) {
//     let low = 0,
//         high = array.length
//     while (low < high) {
//         let mid = Math.floor((low + high) / 2);
//         if (array[mid] < value) {
//             low = mid + 1;
//         } else {
//             high = mid;
//         }
//     }
//     return high
// }

function createIndexOf(dir) {
    return function(array, value, fromIndex) {
        // 设定开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。
        let length = array == null ? 0 : array.length;
        let i = 0;
        if (!length) return -1
        if (fromIndex >= length) return -1;
        if (typeof fromIndex === 'number') {
            if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            } else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if (array[idx] === item) return idx;
        }
        return -1;
    }
}