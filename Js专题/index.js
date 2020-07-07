var reg = /\w+\.(png|jpg|jpeg|psd)/
var str1 = 'test.jpg'
var str2 = 'test.jpeg'
var str3 = 'test.aaa.psd'
var str4 = 'test..png'
var str5 = 'test..aaa'
console.log(reg.test(str1));
console.log(reg.test(str2));
console.log(reg.test(str3));
console.log(reg.test(str4));
console.log(reg.test(str5));
