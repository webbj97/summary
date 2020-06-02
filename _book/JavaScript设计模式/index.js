var foo = {
    value: 1
}
function show(a, b) {
    console.log(this.value);
    console.log(a + b)
}

// Function.prototype.setCall = function (obj) {
//     console.log(this); // 此时this指向show
//     obj.func = this; // 将函数变成对象的内部属性
//     obj.func(obj.value) // 指定函数
//     delete obj.func // 删除函数，当做什么都没发生～
// }

Function.prototype.setCall = function (obj) {
    obj.fn = this; // 将函数变成对象的内部属性
    var args = [];
    for(let i = 1; i < arguments.length; i++){
        args.push('arguments[' + i + ']');
    }
    eval('obj.fn(' + args + ')'); // 传入参数
    delete obj.fn; // 删除函数，当做什么都没发生～
}

show.setCall(foo, 1, 2)