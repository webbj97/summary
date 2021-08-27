# JavaScript基础（七）闭包

> 闭包——非常重要但又难以掌握的概念，理解闭包可以看作是某种意义上的重生——《你不知道的Js》
> 虽然关于闭包，虽然大家可能已经看腻了，但我仍要试着去总结下它！！！


## 目录

* <a href="#1">前言</a>
* <a href="#2">一、什么是闭包？</a>
* <a href="#3">二、分析闭包</a>
* <a href="#4">三、经典问题</a>
* <a href="#5">写在最后</a>

<h2 id="1">前言</h2>

大家在阅读这篇文章之前，不妨先阅读一下我的前面几篇文章作为前置知识：

* [JavaScript中的作用域（系列三）](https://blog.csdn.net/jbj6568839z/article/details/106618708)
* [JavaScript重的执行上下文（系列四）](https://blog.csdn.net/jbj6568839z/article/details/106668345)
* [JavaScript之深入变量对象（系列五）](https://blog.csdn.net/jbj6568839z/article/details/106793254)

<h2 id="2">一、什么是闭包</h2>

顾名思义，遇见问题先问为什么是我们一贯的思维方式，我们尝试回答一下：

1. 闭包就是函数内部的子函数—— `等于没说`
2. 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。——`靠谱`
3. 闭包就是能够读取其他函数内部变量的函数，在本质上是函数内部和函数外部链接的桥梁——`靠谱`
4. 函数和对其周围状态（词法环境）的引用捆绑在一起构成闭包（closure）——`很靠谱`

我们试着用代码来描述一下上面的回答，看看你最**中意**哪一个～

#### 1.1 闭包是函数内部的子函数

先看这段代码：

```js
function foo(params) {
    var a = '余光';

    function bar() {
        console.log(a);
    }
    bar()
}

foo(); // 余光
```

基于词法作用域的查找规则，`bar函数`可以成功的打印`a`变量，并且它也是`foo`的子函数，但严格来说它并没有清晰的表达出闭包这一概念，说它表达的是**嵌套函数可以访问声明于大外部作用域的变量**更准确一些。

#### 1.2 闭包就是能够读取其他函数内部变量的函数，在本质上是函数内部和函数外部链接的桥梁
再来看下面的例子：

```js
function foo(params) {
    var a = '余光';

    function bar() {
        console.log(a);
    }
    return bar;
}

var res = foo();
res(); // 余光
```

结果一致，这是因为此时`res`是执行`foo`函数时返回的`bar`引用，bar函数得以保存了它饿词法环境。

#### 1.3 函数和对其周围状态（词法环境）的引用捆绑在一起构成闭包（closure）
我们来看下面代码：
```js
var name = '余光';

function foo() {
  console.log(name); // 余光
}

foo(); //余光
```
foo的上下文被静态的保存了下来，而且是在该函数创建的时候就保存了。下面我们来验证一下：

```js
var name = '余光';

function foo() {
  console.log(name); // 余光
}

(function (func) {
    var name = '老王';

    func()
})(foo); // 余光
```

这里我们就可以理解——函数被创建后就形成了闭包，他们保存了上层上下文的作用域链，并且保存在`[[scope]]`中，如果你对`[[scope]]`的概念已经模糊了，不妨花几分钟看看[《JavaScript中的执行上下文》](https://blog.csdn.net/jbj6568839z/article/details/106668345)这篇文章。

#### 1.4 总结
**注意：闭包是函数内部的返回的子函数这句话本身没错**，但要看从什么角度出发：

ECMAScript中，闭包指的是：

1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2. 从实践角度：以下函数才算是闭包：
    - 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
    - 在代码中引用了自由变量

**总结：**

* 闭包代码块创建该代码块的上下文中数据的结合
* 闭包就是能够读取其他函数内部变量的函数，在本质上是函数内部和函数外部链接的桥梁
* 不同的角度对闭包的解释不同的

注意：这些并不是闭包的全部，就好像当你被问到——闭包是什么的时候，你的上述回答并不能结束这个话题，往往会引申出更多的话题。



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628143159683.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

<h2 id="3">二、尝试分析闭包</h2>

还是那段经典代码：

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo(); // local scope
```

首先我们要分析一下这段代码中执行上下文栈和执行上下文的变化情况。

1. 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
2. 全局执行上下文初始化
3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
4. checkscope 执行上下文初始化，创建变量对象、作用域链、this等
5. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
6. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
7. f 执行上下文初始化，创建变量对象、作用域链、this等
8. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628152924827.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

当 `f` 函数执行的时候，`checkscope` 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 `checkscope` 作用域下的 `scope` 值呢？


当我们了解了具体的执行过程后，我们知道 f 执行上下文维护了一个作用域链：

因为这个作用域链：
*  `f 函数`依然可以读取到 `checkscopeContext.AO` 的值；
* 当 `f 函数`引用了 `checkscopeContext.AO` 中的值的时候，即使 `checkscopeContext` 被销毁了，JavaScript 依然会让 `checkscopeContext.AO` 活在内存中;
* `f 函数`依然可以通过 `f 函数`的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

多么浪漫的思想——只要你需要我，那我我本应该被销毁，你也能找到我～

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628173236105.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

<h2 id="4">三、经典问题</h2>


#### 3.1 多个对象引用同一个[[Scope]]，你遇到过吗？
直接上代码：

```js
var child1;
var child2;
function parent() {
    var x = 1;

    child1 = function () {
        console.log(++x)
    };
    child2 = function () {
        console.log(--x)
    };
}
parent();
child1(); // 2
child1(); // 3
child2(); // 2
```

大家可能不理解，`child1`和`child`他们两个函数在创建后都保存了上层上下文，万万没想到，**同一个上下文创建的闭包是共用一个`[[scope]]`属性的**，某个闭包对其中[[Scope]]的变量做修改会影响到其他闭包对其变量的读取。

#### 3.2 闭包轻松解决的经典问题

大家一定对下面这段代码很眼熟：
```js
var arr = []
for(var i = 0; i < 10; i++){
    arr[i] = function () {
        console.log(i)
    }
}
arr[0](); // 10
arr[1](); // 10
arr[2](); // 10
arr[3](); // 10
```

我们这么解释它：**同一个上下文中创建的闭包是共用一个[[Scope]]属性的**。

因此上层上下文中的变量`i`是可以很容易就被改变的。

arr[0],arr[1]...arr[9]他们共用一个[[scope]]，最终执行的时候结果当然一样。

**如何利用闭包来解决这个问题呢？**

```js
var arr = []
for(var i = 0; i < 10; i++){
    arr[i] = (function (i) {
        return function () {
            console.log(i);
        }
    })(i)
}
arr[0](); // 0
arr[1](); // 1
arr[2](); // 2
arr[3](); // 3
```

我们通过立即执行匿名函数的方式隔离了作用域，当执行 arr[0] 函数的时候，arr[0] 函数的作用域链发生了改变：
```js
arr[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
```
匿名函数执行上下文的AO为：
```js
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```

我们看到，这时函数的`[[Scope]]`属性就有了真正想要的值了，为了达到这样的目的，我们不得不在`[[Scope]]`中创建额外的变量对象。要注意的是，在返回的函数中，如果要获取`i`的值，那么该值还是会是10。

#### 3.3 总结
* 函数内的所有内部函数都共享一个父作用域，因此创建的闭包是共用的。
* 利用闭包隔离作用域的特性可以解决共享作用域的问题

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628181744114.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)

## 参考

* [深入理解JavaScript](https://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html)
* 《你不知道的JavaScript》

<h2 id="5">写在最后</h2>

**JavaScript内功系列：**

1. [this、call、apply详解，系列（一）](https://blog.csdn.net/jbj6568839z/article/details/106479511)
2. [从原型到原型链，系列（二）](https://blog.csdn.net/jbj6568839z/article/details/106555301)
3. [从作用域到作用域链，系列（三）](https://blog.csdn.net/jbj6568839z/article/details/106618708)
4. [JavaScript中的执行上下文（四）](https://blog.csdn.net/jbj6568839z/article/details/106668345)
5. [JavaScript中的变量对象（五)](https://blog.csdn.net/jbj6568839z/article/details/106793254)
6. [JavaScript之自执行函数表达式（六）](https://blog.csdn.net/jbj6568839z/article/details/106824296)
7. 本文
8. javaScript中函数的参数传递详解

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
