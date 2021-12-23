const arr = [
    [1, 2],
    [1, 3],
    [0, 1],
];

const newArr = new Array(arr.length).fill([])
for (const [index, val] of arr) {
    newArr[index] = [...newArr[index], val];
}

console.log(newArr);
// [ [ 1 ], [ 2, 3 ], [] ]
