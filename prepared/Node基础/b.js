// const moudleA = require('./a.js');

// console.log(moudleA);

var compress = function(chars) {
    let result = "";
    let sum = 1;
    for (let i = 0; i < chars.length - 1; i++) {
        if (chars[i] == chars[i + 1]) {
            sum++;
        } else {
            result = result + chars[i] + sum;
            sum = 1;
        }
    }
    result = result + chars[chars.length - 1] + sum;
    return result.length < chars.length ? result.split('') : chars;
}

console.log('compress:', compress(["a","a","b","b","c","c","c"]));