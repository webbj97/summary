# JavaScript基础（总结）你真的了解Js吗

> 灵感来自Amandeep Singh大佬的文章，也是我第一次翻译英文技术文章（仅翻译了前言和题目），问题主要考察的是作用域、this指向、立即执行函数、变量提升相关知识点，我在翻译加上了自己的思考和回答，如果有错误欢迎大家指正！

选择这篇文章作为前端内功系列的期中总结，为了贴合前面总结的知识点，我仅保留了部分题目，希望能引发自己和大家的思考，加油～

希望大家可以将答案写在评论区下方，增加参与感，我也会在下一篇文章中给出问题的答案。

## 目录

* <a href="#1">一、前言</a>
* <a href="#2">二、问题</a>
* <a href="#3">三、答案解析</a>
* <a href="#4">写在最后</a>

<h2 id="1">一、前言</h2>

JavaScript是一种非常有趣的语言，我们都因为它的某些性质而爱上了它。
对于JavaScript来说，浏览器就是大本营，并且它们可以一起很好的为我们服务。

在Js中，有一些概念是容易被人们忽视的，甚至曾因为它们而吃过苦头。例如：原型、闭包、事件循环仍然是大部分开发者会可以绕开的“晦涩”的领域。

正如我们所知道的，不掌握细节是一件危险的事情，很可能导致你犯错。

让我们玩一个小游戏，我会问你几个问题，而你需要试着去回答它们。如果你不知道答案，或者问题超过了你的知识范围，不妨大胆的给出猜测。
记录下你的回答，并在之后检查你的答案，每答对一道题，就给自己一分，让我们开始吧！

<h2 id="">二、开始答题</h2>

阅读完问题后大家可以停下来思考一下，再看看我的回答与分析，看看我们呼应上没有《手动狗头》～

#### 问题一：在浏览器中，下面代码会输出什么？

```js
var a = 10;
function foo(){
    console.log(a); // qustion
    var a = 20;
}
foo();
```

**我的分析**

上述代码等价于：

```js
foo(){
    var a;
    console.log(a);
    a = 20
}
var a
a = 10
```

**我的答案**

输出：undefined，正如上面分析得一样：

1. 执行foo函数，函数作用域内 `a变量提升到作用域顶部`
2. 打印a，此时`a变量已声明但未赋值`，为undeined
3. 函数内a变量赋值，执行结束a变量销毁
4. 函数外变量执行


**核心问题**

* 变量提升及优先级问题
* [作用域](https://blog.csdn.net/jbj6568839z/article/details/106618708)

不要慌，变量提升会在之后作为JS专题系列的文章与大家见面～

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200710181418842.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

#### 问题二：如果上一题中的var声明改为let声明结果会一样吗？

```js
var a = 10;
function foo(){
    console.log(a); // qustion
    let a = 20;
}
foo();
```

**我的分析**

上述代码等价于：

```js
foo(){
    console.log(a);
    let a = 20;
}
var a
a = 10
```

**我的答案**
```
输出：ReferenceError报错
典型暂时性死区问题:
函数作用域因为let的声明而成为了一个块级作用域，且let声明的变量不会提升，并且在它声明之前使用变量即报错
```
**核心问题**

* let声明
* 变量提升

#### 问题三：还是和上面类似的问题，这次结果是什么？

```js
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

**我的分析**

同样是作用域问题，我们来分析一下：

1. 全局作用域 ：var name = ‘world!’； 没什么问题
2. 立即指向函数内自成作用域：if判断为
	- `var name` // 此时name为undefined，声明为定义
	- `if ( typeof name === ‘undefined’)` 判断成立
	- `name = 'Jack'`
	- `console.log('Goodbye' + name )`


**我的答案**

```
输出：“Goodbye Jack”
```

**核心问题**

* [作用域](https://blog.csdn.net/jbj6568839z/article/details/106618708)
* [立即执行函数](https://blog.csdn.net/jbj6568839z/article/details/106824296)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200710182804878.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

#### 问题四：新数组中将包含哪些元素？

```js
var arr = [];
for(var i = 0; i < 3; i++) {
    arr.push(() => i);
}
var newArr = arr.map(el => el());
console.log(newArr); // ??
```

**我的分析**

经典问题的变形：
1. for循环向arr中添加了三个返回i的匿名函数
2. arr数组遍历，分别将函数执行后的返回值返回
3. 返回新数组

**我的答案**

```
输出：[3, 3, 3]
```

**核心问题**

* [作用域](https://blog.csdn.net/jbj6568839z/article/details/106618708)
* 数组map方法

#### 问题五：下面代码的xGetter结果是什么？

```js
var x = 10;
var foo = {
    x: 90,
    getX: function() {
        return this.x;
    }
};
foo.getX(); // prints 90
var xGetter = foo.getX;
xGetter(); // prints ??
```

**我的分析**

读一遍代码：经典的this指向问题

1. foo的属性getX保存了一个匿名函数
2. getX中保存的一个匿名函数的引用赋值给了xGetter
3. 这里抓住重点：
    - 当函数作为对象的方法调用时，this指向当前对象
    - 当函数作为普通函数调用时，this指向全局对象——window

这里有疑惑的同学推荐大家看一下[《this、call、apply详解，系列（一）》](https://blog.csdn.net/jbj6568839z/article/details/106479511)

**我的答案**

```
输出： 10
```

**核心问题**

* [this指向分析](https://blog.csdn.net/jbj6568839z/article/details/106479511)


<h2 id="3">三、答案解析</h2>

现在，我们试着从上至下回答一下所有的问题，在揭开它们神秘的面纱过程中，我会给大家一些简要的说明。

#### 问题一：在浏览器中，下面代码会输出什么？
```js
var a = 10;
function foo(){
    console.log(a); // qustion
    var a = 20;
}
foo();
```

**答案：undefined**

**分析：**

在JavaScript中，被var关键字声明的变量会被提升，并在对应的内存中分配一个`undefined`，但真正的赋值操作却发生在赋值代码所在的位置，同样的`var`变量声明是在函数作用域中，而`let`和`const`声明的是在块级作用域中。所以下面的代码过程是这样的：

```js
var a = 10; // 全局作用域
function foo() {
	// var 声明会被提升到当前作用域的顶部
	// 例如var a;
	console.log(a); // 输出undefined，因为它已经声明，但为定义
	// 而实际的赋值操作这在这一行才进行的 a = 20
	var a = 20; // 函数内作用域
}
```

**核心问题：**

* 变量提升及优先级问题（下篇文章，敬请期待～）
* [作用域](https://blog.csdn.net/jbj6568839z/article/details/106618708)


#### 问题二：如果上一题中的var声明改为let声明结果会一样吗？

```js
var a = 10;
function foo(){
    console.log(a); // qustion
    let a = 20;
}
foo();
```

**答案： ReferenceError: a is not defined.**

**分析：**


let和const允许声明者在当前（作用域）块内使用该变量。与var不同，这些变量被提升到当前作用域顶部，而是具有所谓的暂时性死区问题（TDZ）。尝试在变量声明钱中访问这些变量将引发`ReferenceError`，因此只能在执行到达函数声明之后对其进行访问。
```js
var a = 10; // 全局作用域
function foo() {
	// 进入函数作用域，并且产生暂时性死区（TDZ）
	// 在a被声明之前，会引发错误
    console.log(a); // ReferenceError
	// 暂时性死区关闭, 'a' is initialised with value of 20 here only
    let a = 20;
}
```

下表概述了在JavaScript中使用的不同关键字相关的**提升行为**和**作用域**(credit: [Axel Rauschmayer's blog](https://twitter.com/rauschma) post).

#### 问题三：还是和上面类似的问题，这次结果是什么？
```js
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

**答案：Goodbye Jack**

**分析：**

var声明的变量在函数作用域中进行了提升，但是它的赋值操作并没有，所以在赋值前，它被分配为`undefined`。



#### 问题四：新数组中将包含哪些元素？

```js
var arr = [];
for(var i = 0; i < 3; i++) {
    arr.push(() => i);
}
var newArr = arr.map(el => el());
console.log(newArr); // ??
```


**答案：[3, 3, 3]**

**分析：**

在for循环中使用var关键字声明循环的下标，将为该变量创建一个存储空间，并不断更新这个存储空间存储的值
```js
// Misunderstanding scope:thinking that block-level scope exist here
var array = [];
for (var i = 0; i < 3; i++) {
  // 箭头函数返回的确实是变量i的值
  // 他们是同一个值！！！
  array.push(() => i);
}
var newArray = array.map(el => el());
console.log(newArray); // [3, 3, 3]
```
如果你使用`let`来声明变量`i`，每一个的声明都存在不同的块级作用域中，所以个循环都会是一个新的独立的绑定。

```js
// Using ES6 block-scoped binding
var array = [];
for (let i = 0; i < 3; i++) {
  // 这次每个i都被保存在一个独立的块中，相当于当前数据的切片
  array.push(() => i);
}
var newArray = array.map(el => el());
console.log(newArray); // [0, 1, 2]
```

解决上面的问题也可以使用闭包：
```js
let array = [];
for (var i = 0; i < 3; i++) {
  array[i] = (function(x) {
    return function() {
      return x;
    };
  })(i);
}
const newArray = array.map(el => el());
console.log(newArray); // [0, 1, 2]
```
#### 问题五：下面代码的xGetter结果是什么？

```js
var x = 10;
var foo = {
    x: 90,
    getX: function() {
        return this.x;
    }
};
foo.getX(); // prints 90
var xGetter = foo.getX;
xGetter(); // prints ??
```

**答案：10**

**分析：**

```js
var x = 10; // x存在于全局作用域，等价于 window.x = 10;
var foo = {
  x: 90,
  getX: function() {
    return this.x;
  }
};
foo.getX(); // 输出90 当函数作为对象的方法被调用时，this指向该对象
let xGetter = foo.getX; // 注意 原本的匿名函数有了别名叫xGetter，并且它被保存到了全局
xGetter(); // prints 10
```

要得到`foo.x`的值，我们需要手动绑定this的指向

```js
let getFooX = foo.getX.bind(foo); // 将getX的作用域绑定到foo上
getFooX(); // prints 90
```

这里有疑惑的同学推荐大家看一下[《this、call、apply详解，系列（一）》](https://blog.csdn.net/jbj6568839z/article/details/106479511)！！！


##### 到这里，五道题就全部分析完了，如果都答对了，允许你骄傲3秒钟。这会让你了解他们背后的原理，发现自己的不足，并且更好的使用它们。如果你喜欢这篇文章，不妨点个赞，留个言吧～


### 参考
* [So you think you know JavaScript?](https://dev.to/aman_singh/so-you-think-you-know-javascript-5c26)



<h2 id="4">写在做后</h2>

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200710182916535.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

`前端内功进阶系列已经第十篇了，这是本系列的最后一篇`，同时也在这里向大家预告下一系列——`《Js专项专题系列》`。

为了能让大家参与感更加强烈，希望大家可以在评论区写下自己心中的答案，一起进步～

**JavaScript内功系列：**

1. [this、call、apply详解，系列（一）](https://blog.csdn.net/jbj6568839z/article/details/106479511)
2. [从原型到原型链，系列（二）](https://blog.csdn.net/jbj6568839z/article/details/106555301)
3. [从作用域到作用域链，系列（三）](https://blog.csdn.net/jbj6568839z/article/details/106618708)
4. [JavaScript中的执行上下文（四）](https://blog.csdn.net/jbj6568839z/article/details/106668345)
5. [JavaScript中的变量对象（五)](https://blog.csdn.net/jbj6568839z/article/details/106793254)
6. [JavaScript之自执行函数表达式（六）](https://blog.csdn.net/jbj6568839z/article/details/106824296)
7. [JavaScript中的闭包，给自己一场重生（七）](https://blog.csdn.net/jbj6568839z/article/details/106940646)
8. [参数传递(求值策略)（八）](https://blog.csdn.net/jbj6568839z/article/details/107111529)
9. [JavaScript中的的数据类型（九）](https://blog.csdn.net/jbj6568839z/article/details/107151991)
10. 本文（系列完结）

**本《JavaScript基础内功》系列将全部更新在[Gitbook中](https://webbj97.github.io/summary/)，如果对您有帮助，就点个star鼓励一下吧～**

**关于我**

* 花名：余光
* WX：j565017805
* 沉迷JS，水平有限，虚心学习中

**其他沉淀**

* [JavaScript版LeetCode题解](https://webbj97.github.io/leetCode-Js/)
* [前端进阶笔记](https://webbj97.github.io/summary/)
* [CSDN](https://yuguang.blog.csdn.net/)


如果您看到了最后，不妨收藏、点赞、关注一下吧！您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！

<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>



