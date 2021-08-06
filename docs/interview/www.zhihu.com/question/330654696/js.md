## ['1', '2', '3'].map(parseInt)

**解释：**

这道题考察的是parseInt的参数问题parseInt(字符串，进制)

永远要给出准确的进制值

**分析：**

```js
['1', '2', '3'].map(parseInt)
// 等价于

['1','2','3'].map((item, index)=>{
    return parseInt(item. index)
})

[
    return parseInt('1', 0),
    return parseInt('2', 1), 2 // 进制要在2-36之间
    return parseInt('3', 2) // 2进制下没有3这个数字，是非法的
]

//结果
[1, NaN, NaN]
```

## 1.对象的键名转换

```js
// example 1
var a={}, b='123', c=123;
a[b]='b';
a[c]='c';
console.log(a[b]);

// example 2
var a={}, b=Symbol('123'), c=Symbol('123');
a[b]='b';
a[c]='c';
console.log(a[b]);

// example 3
var a={}, b={key:'123'}, c={key:'456'};
a[b]='b';
a[c]='c';
console.log(a[b]);
```

**解释：**

* 对象的键名只能是字符串和 Symbol 类型。
* 其他类型的键名会被转换成字符串类型。
* 对象转字符串默认会调用 toString 方法

**分析：**

* `a[123]` 和 `a['123']` 都等价于 `a['123']`，所以第一个例子，会被覆盖，即`a[b] => a[c] === 'c'`
* Symbol类型的key都是唯一的，且不需要进行其他转换，所以 `a[b] === 'b'`
* b 和 c作为对象会被转换成字符串 => `[object object]`， 即`a[b] => a[c] === 'c'`

## 代码分析（立即执行函数）

简单改造下面的代码，使之分别打印 10 和 20

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();
```

**分析：**

```js
//改造1 通过传递参数的方式
var b = 10;
(function (first){
    // 改为匿名函数
    // 通过直传递
    console.log(first)
    b = 20;
    console.log(b)
})(b)

// 改造2
var b = 10;
(function b(){
    // 改为匿名函数
    // 通过直传递
    console.log(window.b) // 打印全局变量b
    var b = 20; // 函数内部var声明变量b
    console.log(b) // 输出函数内部的变量b
})(b)
```

## 代码分析（立即执行函数）

```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

## 代码分析（立即执行函数）

```js
var a = 10;
(function () {
    console.log(a) // 输出的是
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

**分析：**

1. `var a = 10` 在全局环境下声明的变量a
2. 在立即执行函数中，因为下方`var a = 20`，声明了局部变量a，并发生了变量提升，第一次输出a时，a变量**已经存在但是未被定义**（赋值）结果是 `undefined`;
3. 走到赋值语句 `a = 5`，局部变量的a值被改变
4. 打印 window.a，是全局作用域下的变量，`输出10`
5. 走到赋值语句 `a = 20`
6. 打印a，首先在当前作用域下寻找变量a，`输出20`


## 代码分析（运算符规则）

```js
1 + "1"

2 * "2"

[1, 2] + [2, 1]

"a" + + "b"
```

## 代码分析（数组API）

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

**分析：**

1. push 方法根据 length 属性来决定从哪里开始插入给定的值。push 是特意设计为通用的，可以在一个对象上工作，下列情况下会成为类数组：
    - 存在且是对象
    - 对象上的 `splice` 属性是函数类型
    - 对象上有 `length` 属性且为正整数
2. push会根据length的属性来给累数组对象添加属性，例如：
    - `obj.length = 0; obj.push(2); obj; //{0: 2}`
    - `obj.length = 2; obj.push(1); obj; //[empty × 2, 1, length: 3...]`

**结果：**

有了上面的分析，我们发现obj的length属性为2，即push方法会进行类似 `obj.push(1) => obj[obj.length++] = 1`的方式进行处理，所以最终结果是

`[empty × 2, 1, 2, splice: ƒ, push: ƒ]`

## 代码分析（sort）

使用 `sort()` 对数组 `[3, 15, 8, 29, 102, 22]` 进行排序，输出结果


**分析：**

1. sort的排序规则：不传参数时，通过比较元素的 Unicode 编码进行排序，即`charCodeAt()`
2. 传参数时： 提供比较函数


**结果：**

```js
[3, 15, 8, 29, 102, 22].sort((a, b)=> a-b); // [3, 8, 15, 22, 29, 102]

[3, 15, 8, 29, 102, 22].sort(); // [102, 15, 22, 29, 3, 8]
```


## 代码分析（立即执行函数）

```js
(function a(){
    a = 1;
    console.log(a)
})();

// 执行结果会返回function a，这是为什么？
```

* 我的理解是“ (function” ，没有以function开头，即它是求值，所以它是函数表达式
* 函数表达式的特点是不会被提升，即作用域外无法获取
* 变量a被定义到了外部，内部就返回函数a

 可以从 FunctionExpression 的 FunctionBody 里面引用 FunctionExpression 的 Identifier，以允许函数递归调用自身。然而不像 FunctionDeclaration，FunctionExpression 的 Identifier 不能被范围封闭的 FunctionExpression 引用，也不会影响它。