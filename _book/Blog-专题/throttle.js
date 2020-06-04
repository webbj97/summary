/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-06-03 15:59:26
 */
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