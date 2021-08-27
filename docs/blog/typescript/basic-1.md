# 【Typescript入门】之基本类型在TypeScript中的应用

> TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
> TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。

<img src="https://img-blog.csdnimg.cn/ea9cdc30f83d43d99c5a10b7e76d5a0f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="100%" />

相信大家经常会问到为什么会有Ts，我该不该学习Ts，在知乎上这样的问题也会受到大家广泛的关注，而我的回答是，该去了解，因为了解Ts不会像我们学习英语那样“痛苦”，如果TypeScript能够解决你的问题，那就继续深入的学习吧，本系列的第一篇文章也不会有太深奥的理论，花一些时间了解一下给出自己的判断吧～

话不多说，我们先来从基本类型入手，走进Ts的大门！<font color="red">系列文章，收藏不走丢哦</font>

![在这里插入图片描述](https://img-blog.csdnimg.cn/0e89e4457f3243199adc51f43d6035af.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)


## 一、原始数据类型

JavaScript的类型分为两种：原始数据类型和对象类型。

原始数据类型包括：

* 布尔值
* 数值
* 字符串
* null
* undefined
* 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt。

### 1.1 布尔值

布尔值是最基础的数据类型，在TypeScript中，使用`boolean` 定义布尔值类型：

```ts
let visible: boolean = false;
```

注意；在TypeScript中，`boolean`是JavaScript中的基本类型，而`Boolean`是JavaScript中的构造函数。

### 1.2 数值

使用number来定义数值类型：

```ts
let age: number = 100;
```

### 1.3 字符串

使用`string`来定义字符串类型：

```Ts
const name: string = '余光';
const templateName = `hi ${name}!`
```

### 1.4 空值

JavaScript没有空值（Void）的概念，在TypeScript中，可以用`void`表示没有任何返回值的函数：

```ts
function alertName(): void {
    alert('My name is Tom');
}
```

声明一个`void`类型的变量没有什么用，因为你只能将它赋值为undefined和null：

```ts
let unusable: void = 1;
```

<img src="https://img-blog.csdnimg.cn/6c68bc6018f243b28cc0ec2ede6cb54a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="50%" />

### 1.5 Null 和 Undefined

在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

```ts
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说undefined类型的变量，可以赋值给number类型的变量：

```ts
// 严格模式下，会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;
```

### 注意

1. 声明变量的数据类型为 void 时，非严格模式下，变量的值可以为 undefined 或 null。而严格模式下，变量的值只能为 undefined。
2. 严格模式下：`let num: number = undefined;`会报错

![在这里插入图片描述](https://img-blog.csdnimg.cn/3f292f9f460046c9a4a6e65c245c45f6.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)


## 二、任意值

任意值`Any`用来表示允许赋值为任意类型。

先来看下面的代码

```ts
let age:number = 100;

age = '余光'
```

<img src="https://img-blog.csdnimg.cn/082700e3f127434c87e8187c4ecbaf3f.png" width="50%" />

类型检测会提前帮我们规避一些不必要的风险，大家在平时也一定会遇到类型不匹配这样的错误，如果是`any`类型，则允许被赋值为任意类型。

```ts
let age:any = 100;

age = '余光'
```

### 2.1 任意值的属性和方法

在任意值上访问任何属性都是允许的：

```ts
let anyThing: any = 'todo';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也允许调用任何方法：

```ts
let anyThing: any = '余光';
anyThing.toString();
```

可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

### 2.2 未声明类型的变量

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

```ts
let something;
something = 'str';
something = 7;
something.name = '余光';

// 等价于

let something: any;
something = 'str';
something = 7;
something.name = '余光';
```

### 2.3 注意

经过前面两点（尤其是第二点）的描述，你会发现如果给变量添加了`any`的声明，那么Typescript就变成了Anyscript了，那岂不是一夜回到了解放前？

理论上我们尽量不使用any，就好像才出现了const和let之后，我们进来避免试用var一样。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b6dc499ae4834147a444455a65f30567.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)


## 三、类型推论

> 如果没有明确的指定类型，那么TypeScript会依照类型**推论**（Type Inference）的规则推断出一个类型。

先来看看下面的代码：

```js
let age = 100;
age = '余光'; // 不能将类型“string”分配给类型“number”
```

<img src="https://img-blog.csdnimg.cn/1f52a88a2f0e477ca71aa0a4cc073997.png" width="50%" />

这是因为Ts会在没有明确指定类型的时候，根据赋值时数据类型推测出一个指定类型，这就是**类型推论**。

### 注意

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成`any`类型而完全不被类型检查。

## 四、联合类型

> 联合类型（Union Types）表示取值可以为多种类型中的一种。

第一、二小节提到了基本类型的怎么指定的，如果你希望一个变量的类型是可选的可以试用any，但还有更好的方式就是明确指定几个类型——联合类型

```ts
let category: string | number;
category = 'seven';
category = 7;
category = true; // 不能将类型“boolean”分配给类型“string | number”。
```

联合类型使用 | 分隔每个类型。表示允许设置的类型

### 注意

当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```js
function getLength(something: string | number): number {
    return something.length;
}
```

<img src="https://img-blog.csdnimg.cn/1f859671f0fd41438cc1bf6cebc468d3.png" />

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型，所以也会遇到上面问题

```ts
let val: string | number;
val = 'seven';
console.log(val.length); // 5
val = 7;
console.log(val.length); // 类型“number”上不存在属性“length”
```

此时如果你细心，你会发现：val是联合类型，而不会因为赋值而导致type类型变化

## 写在最后

本篇文章是《Typescript基础入门》第一篇，到这里就结束了，主要带大家了解一下基本类型在Ts中的表现，你看绝大部分概念我们都可以吸收，写起来虽然会有些别扭，但也不是特别难以接受，会不会更有信心了解下去了！我们共勉～

下一篇文章我们来聊一聊引用（对象、数组）类型在Ts中又会有什么不同呢？

- 花名：余光
- WX：j565017805
- 邮箱：webbj97@163.com

### 其他沉淀

- [Github: Js版LeetCode题解](https://webbj97.github.io/leetCode-Js/)
- [前端进阶笔记](https://webbj97.github.io/summary/)
- [CSDN博客汇总](https://yuguang.blog.csdn.net/)

<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>


