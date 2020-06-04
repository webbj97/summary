// 高阶函数

var isString = function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}

var isNumber = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
}

var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// 整合函数

var isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`;
    }
}

// 装饰者模式

Function.prototype.before = function (beforeFn) {
    var _this = this ; //存储当前调用函数
    return function () {
        beforeFn.apply(this, arguments);
        return _this.apply(this, arguments)
    }
}
Function.prototype.after = function (afterFn) {
    var _this = this; //存储当前调用函数
    return function () {
        var ret = _this.apply(this, arguments); // 先执行当前函数
        afterFn.apply(this, arguments); //执行后置函数
        return ret
    }
}

var show = function() {
    console.log('1:', 1);
}
var res = show.before(()=>{
    console.log('前置:',2)
}).after(()=>{
    console.log('后置:',3)
})
// res()

// 把this泛化，改变它的指向
// Function.prototype.uncurrying = function () {
//     var _this = this;
//     return function () {
//         var obj = Array.prototype.shift.call(arguments); // 拿出第一个参数
//         return _this.apply(obj, arguments); // 在this修正为obj，执行_this函数
//     };
// };

Function.prototype.uncurrying = function () {
    var _this = this;
    return function () {
        return Function.prototype.call.apply(_this, arguments)
    };
};

// var aobj = {
//     name: 'yuguang'
// };
// function aaa() {
//     console.log(this.name)
// }
// var aaa = aaa.uncurrying()
// aaa(aobj)



