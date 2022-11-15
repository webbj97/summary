# TypeScript 交个朋友]]

## 官方文档

从零开始学习一项新技术时，在你真的产生疑惑之前，官方文档是你离不开的朋友和工具，就像你新买的家电，无论你多么熟悉它，总要翻翻说明书。

## JavaScript中那些“熟知”且苦恼的场景

拼写错误

```js
// 意外行为
const obj = { width: 10, height: 15 };

const area = obj.width * obj.heigth; // NaN
```

隐式类型转换

```js
if ("" == 0) {
  // 他们相等！但是为什么呢？？
}
if (1 < x < 3) {
  // x是 *任何* 值都为真！
}
```

大多数时候，我们都能很快的确认到问题，但十几个、几十个的before和after组合在一起，确实让人很苦恼。

## TypeScript: 静态类型检查器

前面我们提到，一些语言根本不允许那些错误的程序运行。在不运行代码的情况下检测其中的错误称为 静态检查 。根据被操作的值的种类来确定是什么错误和什么不是错误，这称为静态 类型 检查。

TypeScript 在执行之前，基于 值的类型 检查程序是否有错误。它是 静态类型检查器。例如，基于 obj 的 类型，TypeScript 在上面的最后一个示例中发现了一个错误：

const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?
Try
JavaScript 的类型化超集
不过，TypeScript 与 JavaScript 是什么关系呢？

语法
TypeScript 是 JavaScript 的 超集 ：因此 JS 语法是合法的 TS。语法是指我们编写文本以组成程序的方式。例如，这段代码有一个 语法 错误，因为它缺少一个 )：

let a = (4
')' expected.
Try
TypeScript 不会将任何 JavaScript 代码视为错误。这意味着你可以将任何有效的 JavaScript 代码放在 TypeScript 文件中，而不必担心它的确切编写方式。

类型
但是，TypeScript 是一个 类型化 的超集，意味着它添加了针对如何使用不同类型的值的规则。之前关于 obj.heigth 的错误不是 语法 错误，而是以不正确的方式使用了某种值（ 类型 ）。

再举一个例子，这段 JavaScript 代码可以在浏览器中运行，它 会 打印一个值：

console.log(4 / []);
该语法合法的程序打印出 Infinity 。但是，TypeScript 认为将数字除以数组是无意义的操作，并且会报错：

console.log(4 / []);
The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
Try
你可能 真的 想将数字除以数组，也许只是想看看会发生什么，但是在大多数时候，这是编程错误。TypeScript 的类型检查器旨在允许正确的程序通过，同时仍然捕获尽可能多的常见错误。（稍后，我们将学习如何配置 TypeScript，从而控制检查代码的严格程度。）

如果将某些代码从 JavaScript 文件移动到 TypeScript 文件，可能会出现 类型错误 ，具体取决于代码的编写方式。这些或许是代码真实存在的问题，或者 TypeScript 过于保守。在本指南中，我们将演示如何增添各种 TypeScript 语法来消除此类错误。

运行时行为
TypeScript 保留了 JavaScript 的 运行时行为 。例如，在JavaScript 中被零除的结果是 Infinity，而不是抛出运行时异常。原则上，TypeScript 绝不 改变 JavaScript 代码的运行时行为。

这意味着，如果将代码从 JavaScript 迁移到 TypeScript ，即使 TypeScript 认为代码有类型错误，也可以 保证 以相同的方式运行。

保持与 JavaScript 运行时行为相同是 TypeScript 的基本承诺。因为这意味着你可以轻松地在两种语言之间转换，而不必担心一些细微差别可能会使程序停止工作。

擦除类型
粗略地说，一旦 TypeScript 的编译器完成了检查代码的工作，它就会 擦除 类型以生成最终的“已编译”代码。这意味着一旦您的代码被编译，生成的普通 JS 代码便没有类型信息。

这也意味着 TypeScript 绝不会根据它推断的类型更改程序的 行为 。最重要的是，尽管您可能会在编译过程中看到类型错误，但类型系统自身与程序如何运行无关。

最后，TypeScript 不提供任何额外运行时库。你的程序会使用与 JavaScript 程序相同的标准库（或外部库）。因此你不需要学习其他专属于 TypeScript 的框架。

学习 JavaScript 和 TypeScript
我们经常看到这样的问题：“我该学习 JavaScript 还是 TypeScript？”。

答案是，不学习 JavaScript，就无法学习 TypeScript！TypeScript 共用了 JavaScript 的语法和运行时行为。因此，对JavaScript 的任何了解都可以帮助你学习 TypeScript 。

程序员可以使用很多很多资源来学习 JavaScript 。如果你正在编写 TypeScript，不应该 忽略这些资源。例如，带有 javascript 标签的 StackOverflow 问题大约比 typescript 标签的多20倍，但是 所有 javascript问题也适用于 TypeScript 。

如果你正在搜索“如何在 TypeScript 中对列表进行排序”之类的内容，请记住： TypeScript 是带有编译时类型检查器的 JavaScript 运行时 。在 TypeScript 中对列表进行排序的方式与在 JavaScript 中相同。如果你找到直接使用 TypeScript 的资源，那也很好，但解决运行时任务的日常问题时，不要局限地认为你需要特定于 TypeScript 的答案。


## 参考


* [面向编程初学者的 TypeScript](https://www.typescriptlang.org/zh/docs/handbook/typescript-from-scratch.html)
* [我是如何从零开始学TypeScript的](https://zhuanlan.zhihu.com/p/240069181)