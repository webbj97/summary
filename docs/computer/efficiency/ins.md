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
* `requiredefine`

define 方法用于定义一个模块，它接收两个参数：第一个参数是一个数组，表示这个模块所依赖的其他模块第二个参数是一个方法，这个方法通过入参的方式将所依赖模块的输出依次取出，并在方法内使用，同时将返回值传递给依赖它的其他模块使用。

```js
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

require 用于真正执行模块，通常AMD框架会以require方法作为入口，进行依赖关系分析并依次有序地进行加载// 入口文件
require(['math'], function (math) {
　 math.sqrt(15)
});