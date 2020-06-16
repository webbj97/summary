/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-05-12 15:22:10
 */

console.log(1);

function father() {
    console.log(2);
    (function child() {
        console.log(3);
    }());
    console.log(4);
}
father();

console.log(5);
