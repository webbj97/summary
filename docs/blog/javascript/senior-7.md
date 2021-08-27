# JavaScript专题（七）让人头疼的类型转换

## 前言

在了解类型转换之前，如果你对 Js 的基本类型仍存在疑惑，不妨看看这篇文章哦～[JavaScript 中的基本数据类型](https://blog.csdn.net/jbj6568839z/article/details/107151991)

强制类型转换常常为人诟病，但实际上很多时候它们是非常有用的，有些强制类型转换可以明确告诉我们哪里发生了类型转换，有助于提高代码可读性和可维护性。但有些却发生在我们看不见的地方，所以我们今天来讨论一下平时常见的类型转换运算和操作～

## 一、类型转换是什么？

我们都知道变量的类型由它存储的值的类型来决定，所以将值从一种类型转换为另一种类型通常称为类型转换（type-casting），而它也可以根据某些特点分成两类——显示类型转换和强制类型转换。

**显示类型转换**

显式类型转换主要是指通过 String、Number、Boolean 等构造方法转换相应的字符串、数字、布尔值

```js
const str = String(1);
const num = Number("123.3"); //number:123.3
```

这是显式的情况——类型的转换的动作是由我们主动发起的。

#### 1.2 隐式类型转换

**有意思的事**

```js
const newStr1 = 1 + "str"; // '1str'
const newStr2 = "hello" + [89, 150.156, "mike"]; // 'hello89,150.156,mike'
```

如果是做 C++、Java 以及其他强类型语言的同学写到类似的组合，应该就会报错了，但在 Js 中不会。

既然隐式类型转换会一直存在下去，我们就要接受它并去了解它的优缺点！

## 二、转换的基本规则

有些数据类型之间的转换，会经历“多道工序”，我们尽量先介绍“工序”少的～

#### 2.1 原始值转字符串

我们使用 String 函数将类型转换成字符串类型，如果 `String` 函数不传参数，返回空字符串，如果有参数，调用 `ToString(value)`，而 `ToString` 也给了一个对应的结果表。表如下：

**规则：**

| 参数类型  | 返回                                                     |
| --------- | -------------------------------------------------------- |
| Undefined | "undefined"                                              |
| Null      | "null"                                                   |
| Boolean   | 如果参数是 true，返回 "true"。参数为 false，返回 "false" |
| Number    | 结果有很多种，例如 NaN 和 Infinity                       |
| String    | 返回与之相等的值                                         |

**举例：**

```js
console.log(String()); // 空字符串
console.log(String(undefined)); // undefined
console.log(String(null)); // null
console.log(String(false)); // false
console.log(String(true)); // true

// Number
console.log(String(0)); // 0
console.log(String(-0)); // 0
console.log(String(NaN)); // NaN
console.log(String(Infinity)); // Infinity
console.log(String(-Infinity)); // -Infinity
console.log(String(1)); // 1
```

#### 2.2 原始值转数字

有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作`ToNumber`，类似 ToString，它也有一定的转换规则：

| 参数类型  | 返回                                       |
| --------- | ------------------------------------------ |
| true      | 1                                          |
| false     | 0                                          |
| undefined | NaN                                        |
| null      | 0                                          |
| String    | 返回与之相等的值，但如果处理失败则返回 NaN |

```js
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(undefined)); // NaN
console.log(Number("余光")); // NaN
console.log(Number("1")); // 1
```

#### 2.3 原始值转布尔

我们使用 `Boolean 函数`将类型转换成布尔类型，在 JavaScript 中，只有 **6 种** 值可以被转换成`false`，其他都会被转换成`true`。

```js
console.log(Boolean()); // false
console.log(Boolean(false)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean(+0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean("")); // false
```

#### 2.4 原始值转对象

原始值到对象的转换非常简单，原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的**包装对象**。

`null` 和 `undefined` 属于例外，当将它们用在期望是一个对象的地方都会造成一个类型错误 (TypeError) 异常，而不会执行正常的转换。

```js
var a = 1;
console.log(typeof a); // number
var b = new Number(a);
console.log(typeof b); // object
```

## 三、对象转字符串和数字

#### 3.0 对象转布尔值

3.0 这一小节是我认为值得一提，但篇幅较少的一点：

对象到布尔值的转换非常简单：所有对象(包括数组和函数)都转换为 `true`。对于包装对象也是这样，举个例子：

```js
console.log(Boolean(new Boolean(false))); // true
```

#### 3.1 对象的 toString 和 valueOf

这是一个不太常见的操作，或者说现象，但我们也不能忽略它。

1. 对象=>字符串
2. 对象=>数字

转换都是通过调用**待转换对象**的一个方法来完成的，在 Js 中，一般待转换对象拥有两个方法：

1. toString
2. valueOf

**toString**

所有的对象除了`null`和`undefined`之外的任何值都具有`toString`方法，通常情况下，它和使用`String`方法返回的结果一致。

在[JavaSciprt 专题之类型检测](https://blog.csdn.net/jbj6568839z/article/details/108130316)中我们提到过`Object.prototype.toString` 方法会根据这个对象的[[class]]内部属性，返回由 "[object " 和 class 和 "]" 三个部分组成的字符串。举个例子：

```js
const obj = { name: "余光" };
obj.toString(); // "[object Object]"

obj.toString === Object.prototype.toString; // true
```

我们已经验证了 => 对象调用 toString 方法是调用其构造函数原型上的方法

其他数据类型的 toString 方法也都有自己的特点：

- 数组：将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。
- 函数：返回源代码字符串。

```js
[1, 2, 3, 4].toString(); // "1,2,3,4"
[].toString(); // ""

function func() {
  console.log();
}
func.toString(); // "function func () { console.log() }"
```

**valueOf**

valueOf 方法返回这个对象本身，数组、函数、正则简单的继承了这个默认方法，也会返回对象本身。日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数。

```js
var date = new Date(2017, 4, 21);
console.log(date.valueOf()); // 1495296000000
```

#### 3.2 对象转字符串和数字的基本规则

在我们知道了 toString()和 valueOf()这两个方法后，来看看转换的规则，即什么时候用：[ES5 规范 9.8](http://es5.github.io/#x9.8)

| 参数类型 | 结果                                                                       |
| -------- | -------------------------------------------------------------------------- |
| Object   | 1. primValue = ToPrimitive(input, String) <br> 2. 返回 ToString(primValue) |

所谓的 ToPrimitive 方法，其实就是输入一个值，然后返回一个一定是基本类型的值。

我们总结一下，当我们用 String 方法转化一个值的时候：

1. 基本类型：参照 “原始值转字符” 的对应表
2. 引用类型：调用一个`ToPrimitive`方法，将其转为基本类型，然后再参照 “原始值转字符” 的对应表进行转换。

其实，从对象到数字的转换也是一样：

| 参数类型 | 结果                                                                       |
| -------- | -------------------------------------------------------------------------- |
| Object   | 1. primValue = ToPrimitive(input, Number) <br> 2. 返回 ToNumber(primValue) |

注意：转字符和数字的时候处理略有不同～

#### 3.3 ToPrimitive

那接下来就要看看 ToPrimitive 了，[ES5 规范 9.1](http://es5.github.io/#x9.1)

这个返回原始值的方法接受一个输入参数 和一个可选的参数来表示转换类型：

1. input，表示要处理的输入值
   - 如果传入的 input 是 Undefined、Null、Boolean、Number、String 类型，直接返回该值。
2. PreferredType，非必填，表示希望转换成的类型，有两个值可以选，Number 或者 String。
   - 当不传入 PreferredType 时，如果 input 是日期类型，相当于传入 String，否则，都相当于传入 Number。

**如果是 ToPrimitive(obj, Number)，处理步骤如下：**

- 如果 obj 为 基本类型，直接返回
- 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
- 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
- 否则，JavaScript 抛出一个类型错误异常。

**如果是 ToPrimitive(obj, String)，处理步骤如下：**

- 如果 obj 为 基本类型，直接返回
- 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
- 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
- 否则，JavaScript 抛出一个类型错误异常。

所以总结下，对象转字符串(就是 Number() 函数)可以概括为：

**举个例子：**

```js
console.log(Number({})); // NaN
console.log(Number({ a: 1 })); // NaN

console.log(Number([])); // 0
console.log(Number([0])); // 0
console.log(Number([1, 2, 3])); // NaN
console.log(
  Number(function() {
    var a = 1;
  })
); // NaN
console.log(Number(/\d+/g)); // NaN
console.log(Number(new Date(2010, 0, 1))); // 1262275200000
console.log(Number(new Error("a"))); // NaN
```

**注意：**

- 转换对象时，你会发现它变成了 NaN，所以
- 在这个例子中，`[]`和`[0]`都返回了 0

  - 当我们 Number([]) 的时候，先调用 [] 的 valueOf 方法，此时返回 []；
  - 因为返回了一个对象，所以又调用了 toString 方法；
  - 此时返回一个空字符串，接下来调用 ToNumber 这个规范上的方法；
  - 等价于 `Number([].valueOf().toString())`，结果为 0；

- `[1, 2, 3]` 却返回了一个 NaN：
  - 当我们 Number([]) 的时候，先调用 `[1,2,3]` 的 `valueOf` 方法，此时返回 [1,2,3]；
  - 因为返回了一个对象，所以又调用了 toString 方法；
  - 此时"1,2,3"，接下来调用 ToNumber 这个规范上的方法；
  - 等价于 `Number([1,2,3].valueOf().toString())`，结果为 NaN；

## 四、涉及到类型转换的运算符

读到这里我们对类型转换有了一定的概念，现在我们再来看看在运算中常见的类型转换问题。

#### 4.1 一元操作符 +

`+a` 运算符显式地将后面的变量 a 保存的数据转换为数字，不是字符串拼接。
查看 ES5 规范 [11.4.6](http://es5.github.io/#x11.4.6)，会调用 ToNumber 处理该值，相当于 Number('1')，最终结果返回数字 1。

```js
const a = "1.1";
const b = 5 + +a;
console.log(b); // 6.6
```

上面的代码应该是我们经常用到的，当我们知道一个字段是字符串但希望它是数字时，一般会这么做～

我们一起验证下下面这些类型

```js
console.log(+[]); // 0
console.log(+["1"]); // 1
console.log(+["1", "2", "3"]); // NaN
console.log(+{}); // NaN
```

既然是调用 ToNumber 方法我们在之前的小节中提到过

- 如果 obj 为基本类型，直接返回
- 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
- 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
- 否则，JavaScript 抛出一个类型错误异常。
- 以 +[] 为例，[] 调用 valueOf 方法，返回一个空数组，因为不是原始值，调用 toString 方法，返回 ""。
- 得到返回值后，然后再调用 ToNumber 方法，"" 对应的返回值是 0，所以最终返回 0。

#### 4.2 一元操作符 ！

一元运算符`!`显式地将值强制类型转换为布尔值。但是它同时还**将真值反转为假值**（或者将假值反转为真值）。

```js
const a = 1;
const b = "str";
const c = [1, 2, 3];

console.log(!a); // false
console.log(!b); // false
console.log(!c); // false

console.log(!0); // true
console.log(!""); // true
console.log(![]); //false

console.log(![]); //false
console.log(!undefined); // true
console.log(!null); // true
```

同样的 `!!` 会讲其他类型转成对应的 bool 值

！和 + 运算符是我们最常用的两种显式类型转换运算符，之后我们再看看那些不经意间就被转换类型的操作～

## 五、常见的类型转换操作

#### 5.1 字符串和数字之间

```js
const num = 1;
const str = "200";

console.log(num + str); // '1200'
```

这段代码大家应该都知道结果，但是其中的原理是否和大家想的一样呢？

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

console.log(arr1 + arr2); // 1,23,4
```

两个数组的结果为什么也是个字符串？

**原因**

[ES5 规范 11.6.1 中](http://es5.github.io/#x11.6.1)提到，如果某个操作数是字符串或者能通过以下步骤转换为字符串，+将进行拼接操作

如果其中的一个操作数是**引用类型**，则首先对其进行`ToPrimitive`操作（第三小节有提）

**总结**

简单来说就是，如果`+`的其中一个操作数是字符串（或者通过以上步骤可以得到字符串），则执行字符串拼接；否则执行数字加法。

#### 5.2 被转换成布尔值的操作

现在我们来看看到布尔值的隐式强制类型转换，它最为常见也最容易搞错。相对布尔值，数字和字符串操作中的隐式强制类型转换还算比较明显。

下面的情况会发生布尔值隐式强制类型转换。

- if (..)语句
  - 括号内的条件为`true`时执行操作；
- for ( let i = 0; i < 10; i++ )
  - 语句中的条件判断表达式即 i < 10 为`true`
- while (..)和 do..while(..)
  - 循环中的条件判断表达式为`true`;
- 三目运算 `? ：`；
- 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数；

#### 5.3 == 和 ===

谈到类型转换，一定绕不开 `==` 和 `===`。

`==`用于比较两个值是否相等，当要比较的两个值类型不一样的时候，就会发生类型的转换。

在[ES5 规范 11.9.5 中](http://es5.github.io/#x11.9.5)

当执行 x == y 时：

- 如果 x 与 y 是同一类型：
  - x 是 Undefined，返回 true
  - x 是 Null，返回 true
  - x 是数字：
    - x 是 NaN，返回 false
    - y 是 NaN，返回 false
    - x 与 y 相等，返回 true
    - x 是+0，y 是-0，返回 true
    - x 是-0，y 是+0，返回 true
  - x 是字符串，完全相等返回 true,否则返回 false
  - x 是布尔值，x 和 y 都是 true 或者 false，返回 true，否则返回 false
  - x 和 y 指向同一个对象，返回 true，否则返回 false
- x 是 null 并且 y 是 undefined，返回 true
- x 是 undefined 并且 y 是 null，返回 true
- x 是数字，y 是字符串，判断 x == ToNumber(y)
- x 是字符串，y 是数字，判断 ToNumber(x) == y
- x 是布尔值，判断 ToNumber(x) == y
- y 是布尔值，判断 x ==ToNumber(y)
- x 不是字符串或者数字，y 是对象，判断 x == ToPrimitive(y)
- x 是对象，y 不是字符串或者数字，判断 ToPrimitive(x) == y

#### 参考

- [JavaScript 深入之头疼的类型转换(下)](https://github.com/mqyqingfeng/Blog/issues/164)
- 《你不知道的 Js》


## 写在最后

**JavaScript 系列：**

1. [《JavaScript 内功进阶系列》（已完结）](https://blog.csdn.net/jbj6568839z/article/details/103161970)
2. [《JavaScript 专项系列》（持续更新）](https://blog.csdn.net/jbj6568839z/category_10204368.html)

**关于我**

- 花名：余光（沉迷 JS，虚心学习中）
- WX：j565017805

**其他沉淀**

- [Js 版 LeetCode 题解](https://webbj97.github.io/leetCode-Js/)
- [前端进阶笔记](https://webbj97.github.io/summary/)
- [我的 CSDN 博客](https://yuguang.blog.csdn.net/)
- [我的 GitHub](https://github.com/webbj97/)

如果您看到了最后，对文章有任何建议，都可以在评论区留言

这是[文章所在 GitHub 仓库的传送门](https://github.com/webbj97/summary)，如果真的对您有所帮助，希望可以点个 star，这是对我最大的鼓励 ～

<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
