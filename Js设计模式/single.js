// // 单例模式

// var Singleton = function(name, age) {
//     this.name = name;
//     this.age = age;
// }

// Singleton.prototype.getName = function() {
//     console.log(this.name);
// }

// Singleton.getInstance = function(name, age) {
//     if (!this.instance) {
//         this.instance = new Singleton(name, age)
//     }
//     return this.instance;
// }

// const a = Singleton.getInstance('余光', 20)
// const b = Singleton.getInstance('测试', 21)

// a.getName();
// b.getName();

//
// 用一个代理模式来控制单例，与创建类结合起来

const CreateDiv = function(html) {
    this.html = html;
    this.init();
}

CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

const proxySingle = (function() {
    var instance;
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }
        return instance;
    }
})();

var a = new proxySingle('1');
var b = new proxySingle('2');

console.log(a === b)