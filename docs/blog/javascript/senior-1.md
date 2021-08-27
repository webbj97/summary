
# JavaScript专题（一）变量与函数提升

> 相信阅读完[《前端进阶系列》](https://blog.csdn.net/jbj6568839z/article/details/103161970)的朋友们已经对Js中经典的知识点有所了解。本系列的第一篇选择了一个值得讨论的问题——变量提升，我们会从遇到问题、分析问题、解决问题、例题测试的方式加深大家对变量提升的认知，一起加油！

## 前言

本篇文章是《JavaScript专项进阶系列》的第一篇文章，全系列大概会包含例如：

* 防抖节流
* 扁平化
* 深浅拷贝
* 数组去重
* 排序
* ...

等等经典的专项知识点。取名为**专项进阶**是因为它们在很多场合的“出镜率高”很高，为了避免化身`google内容搜索师`，《JavaScript专项进阶系列》诞生了！！！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715170621440.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

## 一、有趣的现象

按照大家的常识，JavaScript代码在执行是一定是自上而下的，你需要输出一个字符串，当然需要提前声明一个`保存string类型的变量`。如果深奥的道理我都能懂，于是我阅读了下面的代码。

#### 1.1 我以为的开局

```js
var str = '123';
console.log(str); // 123
```

我们调换一下代码的位置在再看：

```js
console.log(str); // undefined
var str = '123';
```

**我好像找到规律了!!!**

当我看完了前两段代码并且进行了“深度思考”后，我好像找到规律了，那就是：在当前代码块后函数中，在变量声明和初始化`之前`使用变量，会拿不到正确的值。

<p align=center>
<img width="60%" src="https://img-blog.csdnimg.cn/20200716110537792.jpg" />
</p>

#### 1.2 实际上是这样的

带着上面的“结论”我来到了这里

```js
var val = '余光';

(function(){
    console.log(val); // 余光
})();
```

果然如此！，在**变量声明和初始化之后**耶稣也阻挡不了我拿到val的值，我说的！！！

当我看到下面一段代码时，我已经产生了动摇，此事必要蹊跷。

```js
var val = '余光';

(function(){
    console.log(val); // undefined
    var val = '测试';
})();
```

Ps：如果大家立即执行函数存在疑问，不妨看看[《JavaScript之深入理解立即调用函数表达式（IIFE）》](https://blog.csdn.net/jbj6568839z/article/details/106824296)吧～

这...我怂了，是什么原因导致这样的现象发生的呢？Js又是如果处理的呢？

<p align=center>
<img width="60%" src="https://img-blog.csdnimg.cn/20200716111555639.jpg" />
</p>

## 二、Js的预解析


在当前的作用域内，无论在哪里变量声明，在幕后，都会进行一次看不见的移动。

注意：**仅声明被“移动”**。即声明和赋值在某些时候被动分开了。而这次看不见的移动实际上就是`Js在编译阶段的解析`。

来看一段《你知不知道的Js》中经典的例子：

```js
name = '余光'; // 未添加关键字（未声明），name为全局变量，，即window.name = '余光'
var name; // 再次声明name，此时name未进行初始化，它的值是undefined吗？
console.log(name); // ？
```

结果是成功打印“余光”，这样**看不见的移动**就发生在Js预解析（编译）之中。

#### 2.1 核心：预解析

为了搞明白这个核心问题，我们需要回顾一下，引擎会在解释JavaScript代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来。感兴趣的小伙伴可以阅读[《JavaScript中的变量对象》](https://blog.csdn.net/jbj6568839z/article/details/106793254)和[《从作用域到作用域链》](https://blog.csdn.net/jbj6568839z/article/details/106618708)这两篇文章哦～

因此，发生这样的事情，包括`变量`和`函数`在内的所有声明都会在任何代码被执行前首先被处理。当你看到`var a = 2`；时，可能会认为这是一个声明。但JavaScript实际上会将其看成两个声明：var a；和a = 2;。

* 第一个定义声明是在编译阶段进行的。
* 第二个赋值声明会被留在原地等待执行阶段。

即代码是这样写的：

```js
// 我们看到的代码：
var name = '余光';
```

但Js会将它解析成：

```js
// 声明(Declaration)
var name; // 声明但未初始化，所以分配 undefined

// 初始化(Initialization)
name = '余光'; // 初始化（赋值）
```

所以本小结的一段代码应该这样分析：

```js
var name; // 声明name提到作用域顶部，并被分配了一个undefined
name = '余光'; // 进行初始化操作
console.log(name); // '余光'
```

#### 2.2 注意：只有声明被提升了

**只有声明会被提升，而赋值和其他代码逻辑会在执行到代码的位置时才会生效**。所以会有下面的问题：

```js
foo();

function foo(){
    console.log(name); // undefined
    var name = '余光';
}
```

函数被提升了，自然可以正常执行，但变量仅仅是声明被提升了。

#### 2.3 每个作用域都会进行提升操作

还是上面的代码：

```js
foo();

function foo(){
    console.log(name); // undefined
    var name = '余光';
}
```

实际它在编译时是这样的：

```js
function foo(){
    var name; // 声明
    console.log(name); // undefined
    name = '余光'; // 初始化
}
foo(); // 函数执行
```

<p align=center>
    <img width="60%" src="https://img-blog.csdnimg.cn/20200716134005198.jpg" />
</p>

## 三、提升之间的优先级

既然我们知道了`变量`和`函数`会被提升，他们之间又是如何判断优先级的呢？

##### 3.1 函数会被首先提升，然后才是变量

我们分析下面的代码：

```js
foo();

var foo; // 1

function foo(){
    console.log('余光');
}

foo = function(){
    console.log('小李');
}
```

本着函数优先提升的原则，他会被解析成这样：

```js
function foo(){
    console.log('余光');
}

foo(); // 余光

foo = function(){
    console.log('小李');
}
```

注意，`var foo` 因为是一个重复声明，且优先级`低于函数声明`所以它被忽略掉了。


#### 3.2 函数字面量不会进行函数提升

最直观的例子，就是在函数字面量前调用该函数：

```js
foo();

var foo = function(){
    console.log(1);
}
// TypeError: foo is not a function
```

这段程序中：

1. 变量标识符`foo()`被提升并分配给所在作用域（在这里是全局作用域），因此foo()**不会导致ReferenceError**。
2. 然后就是执行foo，foo此时并没有赋值（注意变量被提升了）。由于对undefined值进行函数调用而导致非法操作，因此抛出TypeError异常。


## 四、ES6和小结

ES6新增了两个命令`let`和`const`，用来声明变量，有关它们完整的概念我会在《ES6基础系列》中总结，提起它们，是因为**变量提升在它们身上不会存在**。

##### 4.1 变量提升是可以规避的

let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。

在变量提升上，const和let一样，只在声明所在的块级作用域内有效，也不会变量提升


#### 4.2 小结

1. 变量提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部，但变量的初始化不会提升；
2. 函数提升：函数声明可以被看作是函数的整体被提升到了代码的顶部，但函数字面量表达式并不会引发函数提升；
3. 函数提升优先与变量提升；
4. let和const可以有效的规避变量提升

最后提炼一下《你不知道的JS》中的一段话：**JavaScript引擎并不总是按照代码的顺序来进行解析。在编译阶段，无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理，这个过程被称为提升。声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。**

<p align=center>
<img width="60%" src="https://img-blog.csdnimg.cn/20200716184711721.jpg" />
</p>

## 参考

* 你不知道的Js（上）

## 写在最后

**JavaScript系列：**

1. [《JavaScript内功进阶系列》（已完结）](https://blog.csdn.net/jbj6568839z/article/details/103161970)
2. [《JavaScript专项系列》（持续更新）](https://blog.csdn.net/jbj6568839z/category_10204368.html)

**关于我**

* 花名：余光（沉迷JS，虚心学习中）
* WX：j565017805

**其他沉淀**

* [Js版LeetCode题解](https://webbj97.github.io/leetCode-Js/)
* [前端进阶笔记](https://webbj97.github.io/summary/)
* [我的CSDN博客](https://yuguang.blog.csdn.net/)

如果您看到了最后，对文章有任何建议，都可以在评论区留言，如果真的对您有所帮助，也希望您能点个star，这是对我最大的鼓励！

<!-- 给这[GitHub，仓库传送门](https://github.com/webbj97/summary)点个star，这是对我最大的鼓励 -->

<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>

