// 多维数组
// 两两组合 -> 两 * n

let arrs = [
    ['red', 'yellow'],
    ['xl', 's'],
    ['n', 'o'],
    ['xx1', 'xx2']
]

const dcr = (arr) =>
    arr.reduce((prev, cur) => prev.length === 0 ?
        cur :
        prev
        .map(x => cur.map(y => x + '-' + y))
        .reduce((prev, cur) => prev.concat(cur), []),
        [])

console.log(dcr(arrs))