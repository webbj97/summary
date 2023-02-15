# 了解模块化

## 什么是模块化开发？

* 模块化开发最终的目的是将程序划分成一个个小的结构（模块）；
* 这个结构中编写属于自己的逻辑代码，有自己的作用域，不会影响到其他的结构；
* 这个结构可以将自己希望暴露的变量、函数、对象等导出给其结构使用；
* 也可以通过某种方式，导入另外结构中的变量、函数、对象等；

因为19年接触前端，模块化已经已经在 ES6 就有个跟标准的方案，所以之前并没有关注为什么会如此，Js又经历了哪些模块化方案走到今天。

无论你多么喜欢JavaScript，以及它现在发展的有多好，我们都需要承认在`Brendan Eich`用了10天写出JavaScript的时候，它都有很多的缺陷，就像一大多代码如果不拆分出来，那么维护变量作用域就是一个痛苦的问题。随着Js及其生态的发展，问题被发现自然也会被解决，就比如`模块化规范`一样，一次一次的改进。

先来看看第一阶段模块都做了什么？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./1.js"></script>
    <script src="./2.js"></script>
    <script src="./3.js"></script>
</body>
</html>

<!-- 1.js -->
var flag = true;
if (flag) {
  console.log("1的flag为true")
}
<!-- 2.js -->
var flag = false;
if (!flag) {
  console.log("2的flag为false")
}
<!-- 3.js -->
if (flag) {
    console.log("使用了1的flag");
}
```

当我们按顺序加载js文件的时候，相同的变量被再次声明赋值后很容易被影响，并且随着文件的增多，会变得无法控制。

解决上面的问题，通过立即执行函数来隔离作用域，可以最大程度避免变量的污染，但肉眼可见的问题：

1. html中会存在较多的 script 标签
2. 文件到处的变量，仍然存在被污染的情况

因此 AMD 和 CMD 规范出现了。

## AMD

> 异步模块定义,它的全称是Asynchronous Module Definition。

它是一种组织前端模块的方式AMD的理念可以用如下两个API概括：

* `define`
* `require`

define 方法用于定义一个模块，它接收三个参数：

1. module-name: 模块标识，可以省略。
2. array-of-dependencies: 所依赖的模块数组，可以省略。
3. module-factory-or-object: 模块的实现，或者一个JavaScript对象。
   1. 这个方法通过入参的方式将所依赖模块的输出依次取出，并在方法内使用，同时将返回值传递给依赖它的其他模块使用。

```js
// 省略标识
define(['Module1', 'Module2'], function (module1, module2) {
    // 依次取出
    var result1 = module1.exec();
    var result2 = module2.exec();
    return {
      result1: result1,
      result2: result2
    }
}); 
```

要知道不填写名称时，默认为文件名称

require 用于真正执行模块，通常AMD框架会以require方法作为入口，进行依赖关系分析并依次有序地进行加载// 入口文件

```js
require(['math'], function (math) {
　 math.sqrt(15)
});
```

可以看到 `define` 和 `require` 在依赖模块声明和接收方面是一样的，它们的区别在于define能自定义模块而require不能，require的作用是执行模块加载。

实现AMD的规范主流就是 `requireJS`

## CMD

> CMD即Common Module Definition，意为“通用模块定义”

和AMD不同的是，CMD没有提供前置的依赖数组，而是接收一个 factory 函数，这个factory函数包括3个参数

1. require: 一个方法标识符，调用它可以动态的获取一个依赖模块的输出
2. exports: 一个对象，用于对其他模块提供输出接口，例如:exports.name = "xxx"
3. module: 一个对象，存储了当前模块相关的一些属性和方法，其中module.exports属性等同于上面的exports

如下所示// CMD

```js
define(function (require, exports, module) {
    //依赖就近书写
    var module1 = require('Module1'); // 获取module1模块的输出对象
    var result1 = module1.exec(); // 执行方法
    // 输出自己想要输出的内容
    module.exports = {
      result1: result1,
    }
});

// AMD
define(['Module1'], function (module1) {
    var result1 = module1.exec();
    return {
      result1: result1,
    }
}); 
```

CMD && AMD的区别从上面的代码比较中我们可以得出AMD规范和CMD规范的区别一方面：

依赖的处理：

1. 在依赖的处理上AMD推崇依赖前置，即通过依赖数组的方式提前声明当前模块的依赖
2. CMD推崇依赖就近，在编程需要用到的时候通过调用require方法动态引入

输出：

1. AMD推崇通过返回值的方式对外输出
2. CMD推崇通过给module.exports赋值的方式对外输出  

与CMD规范密不可分的就是 sea.js，说来惭愧之前我并没有了解过

## CommonJS规范 && ES6

我们需要知道 CommonJS 是一个规范，CommonJS 是 Node.js 使用的模块化方式，而 import/export 则是ES6提出的模块化规范。它们的语法规则如下：

### CommonJs

```js
// 1.js
const foo = require('./2'); // 引入
console.log('foo:', foo); // { name: '余光' }

// 2.js
module.exports = {
    name: "余光",
};
```

### ES6

Node是CommonJS在服务器端一个具有代表性的实现；
Browserify是CommonJS在浏览器中的一种实现；
webpack打包工具具备对CommonJS的支持和转换（后面我会讲到）；
所以，Node中对CommonJS进行了支持和实现，让我们在开发node的过程中可以方便的进行模块化开发：

在Node中每一个js文件都是一个单独的模块；
这个模块中包括CommonJS规范的核心变量：exports、module.exports、require；
我们可以使用这些变量来方便的进行模块化开发；
前面我们提到过模块化的核心是导出和导入，Node中对其进行了实现：

exports和module.exports可以负责对模块中的内容进行导出；
require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

