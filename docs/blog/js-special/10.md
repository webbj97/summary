# JavaScript专题（十）柯里化浅谈

::: tip
维基百科中对柯里化 (Currying) 的定义为：
在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
:::

**举个例子：**

```js
function add(a, b) {
  return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2); // 3

// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2); // 3
```

## 一、它都做了什么

它将页面内的


