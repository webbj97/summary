var quickSort = function(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    // 取一个中间值
    const mid = arr.length >> 1;
    var pivot = arr.splice(mid, 1)[0];
    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    return quickSort(left).concat([pivot], quickSort(right));
};
