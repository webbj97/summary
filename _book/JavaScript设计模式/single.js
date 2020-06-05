// /*
//  * @desc: 单例模式
//  * @Author: 余光
//  * @Email: webbj97@163.com
//  * @Date: 2020-06-04 13:56:34
//  */
// // 实现1
// var CreateDiv = (function () {
//     var instance;

//     var CreateDiv = function (html) {
//         if(instance){
//             return instance;
//         }
//         this.html = html;
//         this.init();
//         console.log('this:', this);
//         return instance = this;
//     };

//     CreateDiv.prototype.init = function () {
//         var div = document.createElement('div');
//         div.innerHTML = this.html;
//         document.body.appendChild(div);
//     };

//     return CreateDiv;
// })();

// var a = new CreateDiv('a');
// var b = new CreateDiv('b');


// /* 用代理实现单例模式
//     * 抽离创建节点的方法
//     * 引入代理类（缓存代理的应用之一）
// */
// var CreateDiv = function (html) {
//     this.html = html;
//     this.init();
// }

// CreateDiv.prototype.init = function () {
//     var div = document.createElement('div');
//     div.innerHTML = this.html;
//     document.body.appendChild(div);
// }

// var ProxySingleCreateDiv = (function () {
//     var instance; // 定义实例
//     return function (html) {
//         if(!instance){
//             instance = new CreateDiv(html)
//         }
//         return instance;
//     }
// })()

// var a = new ProxySingleCreateDiv('a')

// js中的单例模式
// var a = {};
// 使用命名空间

var nameSpace = {
    a:function () {
        console.log('1:', 1);
    },
    b:function () {
        console.log('2:', 2);
    }
};

nameSpace.a()
// 动态的创建命名空间

var MyApp = {};
MyApp.namespace = function (name) {
    var parts = name.split('.');
    var current = MyApp;
    for(var i in parts){
        if(!current[parts[i]]){
            current[parts[i]] = {};
        }
        current = current[parts[i]]
    }
};

MyApp.namespace('event');
MyApp.namespace('dom.style');


function Person(name) {
    this.name = name;
}

function show(name) {
    this.name = name;
};
var showName = show('yuguang');

var person = new Person('yuguang')

function Person(name) {
    this.name = name
}
