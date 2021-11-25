const hh = [
    {
        name: 1,
        data: [111,2222,3333,444,555,666,777,888]
    },
    {
        name: 2,
        data: [111,2222,3333,444,555,666,777]
    },
    {
        name: 3,
        data: [111,2222,3333,444,555,666]
    },
]


// 最大长
let length = Math.max(...hh.map(({data}) => data.length))
console.log('lem:', length);
const twoArr = hh.map(({data}) => data.fill(0, length));
console.log('twoArr:', twoArr);
let arr = [];
for(let i = 0; i < length; i++){
    let index = 0;
    let sum = 0;
    while(index < twoArr.length){
        sum += twoArr[index][i]
        index++
    }
    console.log('sum:', sum);
    arr.push(sum)
}

console.log('arr:', arr);
