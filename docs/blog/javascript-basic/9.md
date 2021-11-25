# JavaScript基础（九）基本数据类型

> 在上一篇[JavaScript中的参数传递]()一文中，我们了解到了值传递、引用传递、共享传递，三种传递的第一层区别就在于传入参数的数据类型不同，所以这次，我们来讲讲Js中的数据类型。
> 本篇文章是根据《你不知道的Js》第一部分延伸扩展出来的。一个较基础的问题，它很适合放在整个面试的前几问，面试官会根据你的回答确定之后问题的走向，比如当你回答基本数据类型时少回答了一个`String`，那么面试官很可能就会问你`String都有哪些方法哦～`

## 目录：

* <a href="#1">一、类型</a>
* <a href="#2">二、数据类型分类</a>
* <a href="#3">三、常见问题</a>
* <a href="#4">写在最后</a>

<h2 id="1">一、类型</h2>

可能许多习惯了C++、C#这类静态语言（强类型）语言的小伙伴们在编写Js代码时，会很不习惯，因为相对于静态语言来说，Js甚至没有类型的”概念“。

而且Js中吐槽较多的恰恰就包含类型转换，在我们日常写代码时总是遇到或显示或隐示的类型转换，比如：

你要获取数字`123`的个位十位百位，你会怎么做？

* toSrting()后通过下标获取？
* 取整取余？

使用类型转换形式多样。有些方式简明易懂，也很安全，然而稍不留神，就会出现意想不到的结果。

为了学习和掌握类型转换，现在先让我们来深入了解一下值和类型。

#### 内置类型

JavaScript 拥有**动态类型**，这意味着相同的变量可用作不同的类型：类型是值的内部特征，它定义了值的行为，以使其区别于其他值。

**JavaScript中的内置类型:**

* null
* undefined
* 布尔值（boolean）
* 数字（number）
* 字符串（string）
* 对象（Object）
* symbol（ES6新增）

对于null和undefined大家一定不陌生，我们会在第三节简单的分析他们之前的区别。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707141653286.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

<h2 id="2">二、数据类型分类</h2>

除了**对象**，其他几个都是**基本类型**，这是因为声明变量时不同的内存分配而决定的：

#### 2.1 基本类型

JavaScript 中共有 6 种基本数据类型：`Undefined`、`Null`、`Boolean`、`Number`、`String`、`Symbol`。

`基本类型`存储在`栈（stack）中`，也就是说：

* 它们的值**直接存储在变量访问的位置**。
* 这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – `栈`中。
* 这样存储便于迅速查寻变量的值。
* 基本类型的值是按值访问的，且基本类型的值是不可变的。

```js
var str = "123hello321";
str.toUpperCase();     // 123HELLO321
console.log(str);      // 123hello321
```

**基本类型的比较是它们的值的比较：**

```js
var a = 1;
var b = true;
console.log(a == b);    // == 只进行值的比较
console.log(a === b);   // === 不仅进行值得比较，还要进行数据类型的比较
```

有关符号运算，优先级的问题，我觉得应该将它放在Js专题系列，单独讨论它们才能比较透彻，这里就不过多解释了。

来看下面的代码，我们用图示来分析它

```js
var a,b
a = 100;
b = a;
a = '字符串';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707105321216.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

#### 2.2 引用类型

`引用类型`存储在`堆（heap）`中的对象，也就是说:

* 存储在变量处的值是一个指针（point），指向存储对象的内存地址。
* 引用类型的值是按引用访问的，且引用类型的值是`可变`的。
* 变量存储的是可以打开保存数据的房间的`钥匙`
* `存储钥匙地址`的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。

除过上面的 6 种基本数据类型外，剩下的就是引用类型了，统称为 Object 类型。细分的话，有：

* Object
* Array
* Date
* RegExp
* Function
* ...

**引用类型的比较是引用的比较：**

```js
var obj1 = {};    // 新建一个空对象 obj1
var obj2 = {};    // 新建一个空对象 obj2
console.log(obj1 == obj2);    // false
console.log(obj1 === obj2);   // false
```

因为 obj1 和 obj2 分别引用的是存放在堆内存中的2个不同的对象，故变量 obj1 和 obj2 的值（引用地址）也是不一样的！

来看下面的代码，我们用图示来分析它

```js
var a = { name: '余光' };
var b;
b = a;
a.name = "yuguang";
b.age = 23;
var c = {
  name: '余光',
  age: 23
};
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707114641540.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

#### 2.3 小结

**基本类型**

* 栈内存中包括了变量的标识符和变量的值

**引用类型**

* 栈内存中保存了变量标识符和指向堆内存中该对象的指针
* 堆内存中保存了对象的内容

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707141806752.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

<h2 id="3">三、常见问题</h2>

#### 3.1 JavaScript中的变量是没有类型的

来看下面的例子：

```js
var a = 100; // 严格地说 变量a没有类型，它所保存的 100是数字类型的
typeof a === 'number'; // 其实检测是=>typeof 100

a = 'string'
typeof a === 'string'; // true
```

`变量a`可以随时持有任何类型的`值`。换个角度来理解就是，JavaScript不做“类型强制”；也就是说，语言引擎不要求变量总是持有与其初始值同类型的值。


#### 3.2 typeof检测不总是对的

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706185843137.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

需要注意的点：

**number**

```js
// 基本数学API和属性
typeof Math.LN2 === 'number'; // true  Math的属性
typeof Infinity === 'number'; // true 无穷
typeof NaN === 'number'; // true 特殊的数字类型，not a number
// 被强转称数字的其他数据类型
typeof Number('str') === 'number'; // Number('str') => NaN => number
```

**string**

```js
typeof (typeof 1) === 'string'; // typeof always returns a string
typeof String(1) === 'string'; // 强转成字符串
```

**布尔值**

```js
typeof Boolean(1) === 'boolean'; // 强制类型转换
typeof !!(1) === 'boolean'; // two calls of the ! (logical NOT) operator are equivalent to Boolean()
```

**Symble**

```js
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
```

**undefined**

一个没有被赋值的变量的数据类型是`undefined`(如果方法或者是语句中操作的变量没有被赋值，则会返回undefined) —— MDN

```js
typeof undefined === 'undefined';
```

**object**

```js
typeof { name: '余光' } === 'object';
```

**null**

值得我们注意恰恰是这个`null`,typeof 对它的处理返回的是`object`

```js
typeof null === 'object'; // true
```

**function**

typeof检测函数返回的也是object，这是因为从规范上看`function`实际上是`object`的一个子类型。

```js
// Functions
typeof function() {} === 'function';
typeof class C {} === 'function';
```

那么你还知道其他检测数据类型的方式吗？

#### 3.3 null和undefined

* null：特指对象的值未设置。它是 `JavaScript 基本类型` 之一。
    - 它不是全局对象的一个属性;
    - 在 API 中，null 常在返回类型应是一个对象，但没有关联的值的地方使用。
* undefined：表示声明但未被赋值的变量类型
    - 你可以使用`undefined`和严格相等或不相等操作符来决定一个变量是否拥有值。

**他们的区别：**

当检测 null 或 undefined 时，注意相等 `==`与`===`两个操作符的区别 ，前者会执行类型转换：

* typeof检测时两者的返回值不同
* 代表的含义不同

```js
typeof null        // "object" (因为一些以前的原因而不是'null')
typeof undefined   // "undefined"
null === undefined // false
null  == undefined // true
null === null // true
null == null // true
!null //true
isNaN(1 + null) // false
isNaN(1 + undefined) // true
```

<h2 id="4">写在最后</h2>

> 目前，前端内功系列已经是第九篇了，虚心接受大家的批评和指正，如果能对您有帮助，希望您关注、收藏、点赞一波哦～

**JavaScript内功系列：**

1. [this、call、apply详解，系列（一）](https://blog.csdn.net/jbj6568839z/article/details/106479511)
2. [从原型到原型链，系列（二）](https://blog.csdn.net/jbj6568839z/article/details/106555301)
3. [从作用域到作用域链，系列（三）](https://blog.csdn.net/jbj6568839z/article/details/106618708)
4. [JavaScript中的执行上下文（四）](https://blog.csdn.net/jbj6568839z/article/details/106668345)
5. [JavaScript中的变量对象（五)](https://blog.csdn.net/jbj6568839z/article/details/106793254)
6. [JavaScript之自执行函数表达式（六）](https://blog.csdn.net/jbj6568839z/article/details/106824296)
7. [JavaScript中的闭包，给自己一场重生（七）](https://blog.csdn.net/jbj6568839z/article/details/106940646)
8. [参数传递(求值策略)（八）](https://blog.csdn.net/jbj6568839z/article/details/107111529)
9. 本文
10. 你真的了解Js吗？（上）

**关于我**

* 花名：余光
* WX：j565017805
* 沉迷JS，水平有限，虚心学习中

**其他沉淀**

* [JavaScript版LeetCode题解](https://webbj97.github.io/leetCode-Js/)
* [前端进阶笔记](https://webbj97.github.io/summary/)
* [CSDN](https://yuguang.blog.csdn.net/)


如果您看到了最后，不妨收藏、点赞、评论一下吧！！！
持续更新，您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！

<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>




