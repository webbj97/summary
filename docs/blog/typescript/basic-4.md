# 【Typescript入门】之什么是元组和枚举

## 一、元组

> 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

### 1.1 认识元组

定义一对值分别为string 和 number 的元组：

let tom: [string, number] = ['Tom', 25];
当赋值或访问一个已知索引的元素时，会得到正确的类型：

let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2);
也可以只赋值其中一项：

let tom: [string, number];
tom[0] = 'Tom';
但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。

let tom: [string, number];
tom = ['Tom', 25];
let tom: [string, number];
tom = ['Tom'];

// Property '1' is missing in type '[string]' but required in type '[string, number]'.
越界的元素§
当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
参考§
Basic Types # Tuple（中文版）
«  字符串字面量类型