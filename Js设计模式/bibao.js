/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-06-03 10:36:10
 */
// 简单的实现一个类型检测 字符串、数组、数字
// var Type = {}
// for(var i = 0, type; type = ['String', 'Array', 'Number'][i++]; ){
//     (function (type) {
//         Type[`is${type}`] = function (obj) {
//             return Object.prototype.toString.call(obj) === `[object ${type}]`;
//         }
//     })(type)
// };

// var extent = function () {
//     var value = 0;
//     return {
//         call: function () {
//             value++
//             console.log(value)
//         }
//     }
// }
// var ext = extent()
// ext.call()
// ext.call()
// ext.call()

// function Extent() {
//     this.value = 0
// }
// Extent.prototype.call = function () {
//     this.value++
//     console.log('this.value:', this.value);
// }
// var extent = new Extent()
// extent.call()
// extent.call()
// extent.call()

// var extent = {
//     value: 0,
//     call: function () {
//         this.value++;
//         console.log(this.value)
//     }
// };
// extent.call()
// extent.call()
// extent.call()

// 命令模式

Function.prototype.bind = function (obj) {
    var _this = this; // 保存调用bind的函数
    var obj = obj || window; // 确定被指向的this
    return function(){
        return _this.apply(obj, arguments); // 修正this的指向
    }
};

var obj = {
    name: 1,
    getName: function(){
        console.log(this.name)
    }
};

var func = function(){
    console.log(this.name);
}.bind(obj);

func(); // 1
