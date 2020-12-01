var merge = function(intervals) {
    if (intervals === null || !intervals.length || !intervals[0].length) return [];
    const rows = intervals.length,
        cols = 2;
    const arr = [];
    let row = 0;

    while (row < rows - 1) {
        console.log(intervals[row])
        if (intervals[row][1] >= intervals[row + 1][0]) {
            arr.push([intervals[row][0], intervals[row + 1][1]])
        } else {
            arr.push(intervals[row])
        }

    }
    return arr;
};

console.log(merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18]
]))