// var reg = /^(.).+(.)$/g

// var reg1 = /^(.)(.)$/ //第一个字符

// var reg2 = /^(.)+(.)$/

// console.log('1:',"这是一个测试文字".replace(reg, "$1***$2"));
// console.log('2:',"这是一个测试文字".replace(reg1, '**'));
// console.log('3:',"这是一个测试文字".replace(reg2, '$s1**$s2'));


// // item.name.replace(/^(.).+(.)$/, function(res){return res.replace(/./g, '*')})

// var reg = /abc+a/
// console.log('结果:', reg.test('abca'));

var reg = /iPhone(\sX|11)/
var data = 'iPhone11,8'
console.log(data.search(reg));

