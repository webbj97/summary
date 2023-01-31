var arr = [1, 2, 1, 1, "1"];

const unique = function(arr) {
    return arr
        .concat()
        .sort()
        .filter((item, i, arr) => !i || item !== arr[i - 1]);
};

console.log(unique(arr));
