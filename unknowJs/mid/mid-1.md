# 你不知道的JS（一）类型
> 本系列第一篇，目标是系统的过一遍你不知道的JS系列（分上、中、下三部分）

## 1.1 类型

撇开学术界对类型定义的分歧，为什么说 JavaScript 是否有类型也很重要呢?

要正确合理地进行`类型转换`，我们必须掌握 JavaScript 中的各个类型及其内在行为。几乎所有的 JavaScript 程序都会涉及某种形式的`强制类型转换`，处理这些情况时我们需要有充分的把握和自信。

如果要将 42 作为 string 来处理，比如获得其中第二个字符 "2"，就需要将它从 number (强制类型)转换为 string。

这看似简单，但是强制类型转换形式多样。有些方式简明易懂，也很安全，然而稍不留 神，就会出现意想不到的结果。

全面掌握 JavaScript 的类型之后，我们旨在改变对强制类型转换的成见，看到它的好处并 且意识到它的缺点被过分夸大了。现在先让我们来深入了解一下值和类型。

## 1.2 内置类型
JavaScript 有七种内置类型:
* 空值(null)
* 未定义(undefined)
* 布尔值( boolean)
* 数字(number)
* 字符串(string)
* 对象(object)
* 符号(symbol，ES6 中新增)

最基础的检测方式就是通过 `typeof`运算符来查看值的类型，它返回的是类型的字符串值。但请注意！！！，它也不是万能的

```js
typeof undefined  === 'undefined'; // true
typeof true === 'boolean'; // true
typeof 42 === 'number'; // true
typeof "42" === 'string'; // true
typeof { life: 42 }  === "object"; // true
// ES6中新加入的类型
typeof Symbol() === "symbol"; // true
```
以上的检测结果都是正确的，但是对 `null` 检测时

```js
typeof null === "object"; // true
```

而对数组的检测也是如此

```js
typeof [1,2,3] === "object"; // true
```

我们在这里来一句总结，`数组`可以被称为 object 的一个 “子类型”，`null`可以被称为空对象。

## 1.3 值和类型

JavaScript 中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。

换个角度来理解就是，JavaScript 不做“类型强制”;也就是说，语言引擎不要求变量总是持有与其初始值同类型的值。一个变量可以现在被赋值为字符串类型值，随后又被赋值为 数字类型值。

### 1.3.1 undefined和undeclared
变量在未持有值的时候为 undefined。此时 typeof 返回 "undefined":

```js
var a;
typeof a; // "undefined"
var b = 42;
var c;
```

已在`作用域中声明但还没有赋值的变量`，是 **undefined** 的。相反，还`没有在作用域中声明过的变量`，是 **undeclared** 的。

```js
var a;
a; // undefined
b; // ReferenceError: b is not defined
```

### 1.3.2 typeof Undeclared
该安全防范机制对在浏览器中运行的 JavaScript 代码来说还是很有帮助的，因为多个脚本 文件会在共享的全局命名空间中加载变量。

