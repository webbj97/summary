/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-06-03 15:59:26
 */
// function throttle(fn) {
//     var _self = fn; // 保存需要节流的函数
//     var timer;
//     return function () {
//         _this = this
//         if(timer) return false;
//         timer = setTimeout(() => {
//             clearTimeout(timer)
//             timer = null
//             _self.apply(_this, arguments)
//         }, 1000);
//     }
// }


function throttle(fn) {
    var _self = fn; // 保存需要节流的函数
    var timer;
    return function () {
        _this = this
        if(timer) return false;
        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
            _self.apply(_this, arguments)
        }, 1000);
    }
}

window.addEventListener('scroll', throttle( ()=>{console.log(1)} ))

function f() {
    var a = 1;

    a = 2;

    a = 3;
    var b = g();
    return b;

    function g() {
        console.log('this:', this);
        console.log('a:', a);
        return a;
    }
}