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

后面伴随着 babel 等编译工具和 webpack 等自动化工具的出现，AMD/CMD的出场率降低了，大家都习惯于用 CommonJS 和 ES6 的模块化方式编写代码了。

```js
// ES6
import { foo } from './foo'; // 输入
export const bar = 1;        // 输出
export default {
   name: '余光'
}

// CommonJS
const foo = require('./foo'); // 输入
module.exports = { 。         // 输出
    name: "余光",
}
```

但这种 import from 的引入方式，浏览器不能理解，但后来，编译工具 `babel` 的出现让这变成了可能

### babel的出现

`babel`是一个JavaScript 编译器，它让我们能够使用符合开发需求的编程风格去编写代码，然后通过babel的编译转化成对浏览器兼容良好的JavaScript。

Babel 的出现改变了我们的前端开发观点。它让我们意识到：对前端项目来说，开发的代码和生产的前端代码可以是不一样的，也应该是不一样的。

1. 在开发的时候，我们追求的是编程的便捷性和可阅读性。
2. 在生产中，我们追求的是代码对各种浏览器的兼容性。

Babel的工作流程可概括为三个阶段

1. Parse(解析): 通过词法分析和语法分析，将源代码解析成抽象语法树(AST)
2. Transform(转换)：对解析出来的抽象语法树做中间转换处理
3. Generate(生成)：用经过转换后的抽象语法树生成新的代码

上面提到的CMD/AMD方案，可以看作是“在线编译”方案，当浏览器加载js时，对应的模块才会开始分析，确定执行顺序，但是这样：

1. 页面的加载时间必然增加
2. 请求次数也会增加

### 一个新的方式

1. 我们可以通过工具，让它把组织模块的工作提前做好，在代码部署上线前就完成，从而节约页面加载时间
2. 使用工具进行代码合并，把多个script的代码合并到少数几个script里，减少http请求的数量

我们从 `在线处理`时代 走进了 `预处理`时代，其中典型的就是：典型的代表是2011年出现的`broswerify` 和2012年发明的`webpack`。他们的定位是类似的，为了解决上面的问题，随后webpack更胜一筹，逐渐成为主流的打包工具

## webpack

> 本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。 —— MDN

通过配置入口、出口、加载器、插件，webpack为我们输出对应的 bundle 静态文件

解决问题必然就衍生出新的问题，代码预编译后，合并的代码体积也会很大，请求的数量确实减少了，但单个script脚本加载的速度可能被增加了，如此一来，首屏加载会消耗很长时间并拖慢速度，可谓是物极必反。

### 代码拆分功能

webpack于是引入了代码拆分的功能(Code Splitting)来解决这个问题, 从全部打包后退一步：可以打包成多个包

这种代码拆分可通过webpack独特的插件机制完成。plugins字段是是一个数组，可接收不同的plugins实例，从而给webpack打包程序附加不同的功能，`CommonsChunkPlugin`就是一个实现代码拆分的插件。从 webpack4 开始，取而代之的是 `optimization.splitChunks`。

```js
// webpack.config.js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 这表明将选择哪些 chunk 进行优化
      minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
      maxInitialRequests: 30, // 入口点的最大并行请求数。
      enforceSizeThreshold: 50000,
    },
  },
};
```

### 按需加载

正如其字面意思，按需加载就是等到需要的时候才加载一部分模块。并不选择将其代码打包到首次加载的入口bundle中，而是等待触发的时机，届时才通过动态脚本插入的方式进行加载: 即创建script元素，添加脚本链接并通过appendChild加入到html元素中

例如我们需要实现一个功能，在点击某个按钮的时候，使用某个模块的功能。这时我们可以使用ES6的import语句动态导入，webpack会支持import的功能并实现按需加载

button.addEventListener('click',function(){
  import('./a.js').then(data => {
    // use data
  })
});