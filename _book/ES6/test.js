const arr = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4]
];
const newArr = arr.map(([x, y]) => x + y);
console.log('newArr:', newArr);

function func({ name = '余光', age = 23, like = 'FE' }) {
    console.log(name, age, like);
}
const options = { name: '余光' }
func(options);