# JavaScript专题（五）深浅拷贝

> 了解拷贝背后的过程，避免不必要的错误，Js专题系列之深浅拷贝，我们一起加油～

## 一、拷贝示例

当我们在操作数据之前，可能会遇到这样的情况：

1. 会经常改动一组数据，但可能会用到原始数据
2. 我需要两组一样的数据，但我不希望改动一个另一个随之改动
3. 我需要对数据操作前后进行对比
4. ...

当我们遇到类似需要场景时，首先想到的就是拷贝它，殊不知拷贝也大有学问哦～

下面简单的例子，你是否觉得熟悉？

#### 1.1 基本类型拷贝示例

```js
var str = 'How are you';
var newStr = str;
newStr = 10

console.log(str); // How are you
console.log(newStr); // 10
```

大家都能想到，字符串是基本类型，它的值保存在栈中，在对它进行拷贝时，其实是为新变量开辟了新的空间。 `str`和`newStr`就好比两个一模一样的房间，布局一致却毫无关联。

#### 1.2 引用类型拷贝示例

```js
var data = [1, 2, 3, 4, 5];
var newData = data;
newData[0] = 100;

console.log(data[0]); // 100
console.log(newData[0]); // 100
```

类似的代码段，但这次我们使用数组这个引用类型举例，你会发现修改赋值后的数据，原始数据也跟着改变了，这显然不满足我们的需要。本篇文章就来聊一聊**引用数据拷贝的学问**。

**如果大家对Js的数据类型存在着疑问，不妨看看[《JavaScript中的基本数据类型》](https://blog.csdn.net/jbj6568839z/article/details/107151991)**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200812185110705.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)


## 二、浅拷贝

拷贝的划分都是针对引用类型来讨论的，浅拷贝——顾名思义，浅拷贝就是“浅层拷贝”，实际上只做了表面功夫：

```js
var arr = [1, 2, 3, 4];
var newArr = arr;

console.log(arr, newArr); // [1,2,3,4] [1,2,3,4]
newArr[0] = 100;
console.log(arr, newArr) // [100,2,3,4] [100,2,3,4]
```

不发生事情（操作）还好，一旦对新数组进行了操作，两个变量中所保存的数据都会发生改变。

发生这类情况的原因也是因为`引用类型`的基本特性：

* 存储在变量处的值是一个指针（point），指向存储对象的内存地址。赋值给新变量相当于配了一把新钥匙，房间并没有换。

数组中的slice和concat都会返回一个新数组，我们一起来试一下：

```js
var arr = [1,2,3,4];
var res = arr.slice();

// 或者
res = arr.concat()

res[0] = 100;
console.log(arr); // [1,2,3,4]
```

这个问题这么快就解决了？虽然对这一层数据进行了这样的的处理后，确实解决了问题，但！

```js
var arr = [ { age: 23 }, [1,2,3,4] ];
var newArr = arr.concat();

arr[0].age = 18;
arr[1][0] = 100;

console.log(arr) // [ {age: 18}, [100,2,3,4] ]
console.log(newArr) // [ {age: 18}, [100,2,3,4] ]
```

果然事情没有那么简单，这也是因为数据类型的不同。

`JS` 不允许我们直接操作内存中的地址，也就是说不能操作对象的内存空间，所以，我们对对象的操作都只是在操作它的引用而已。

既然`浅拷贝`达不到我们的要求，本着**效率**的原则，我们找找有没有帮助我们实现`深拷贝`的方法。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200812185132249.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)


## 三、深拷贝的方法？

数据的方法失败了，还有没有其他办法？我们需要实现真正意义上的拷贝出独立的数据。

#### 3.1 JSON

这里我们利用JSON的两个方法，`JSON.stringify()`，`JSON.parse() `来实现最简洁的深拷贝

```js
var arr = ['str', 1, true, [1, 2], {age: 23}]

var newArr = JSON.parse( JSON.stringify(arr) );
newArr[3][0] = 100;
console.log(arr); // ['str', 1, true, [1, 2], {age: 23}]
console.log(newArr); // ['str', 1, true, [100, 2], {age: 23}]
```

这个方法应该是实现深拷贝最简洁的方法，但是，**它仍然存在问题**，我们先来看看刚才都做了些什么：

1. 定义一个包含都过类型的数组`arr`
2. JSON.stringify(arr), 将一个 JavaScript 对象或值转换为 `JSON 字符串`
3. JSON.parse(xxx), 方法用来解析JSON字符串，构造由字符串描述的`值或对象`

**理解：**

我们可以理解为，将原始数据转换为`新字符串`，再通过`新字符串`还原为一个`新对象`，这中改变数据类型的方式，间接的绕过了拷贝对象引用的过程，也就谈不上影响原始数据。

**限制：**

这种方式成立的根本就是保证数据在“中转”时的完整性，而`JSON.stringify()`将值转换为相应的`JSON格式`时也有缺陷：

* undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
* 函数、undefined 被单独转换时，会返回 undefined，
    - 如JSON.stringify(function(){})
    - JSON.stringify(undefined)
* 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
* NaN 和 Infinity 格式的数值及 null 都会被当做 null。
* 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

所以当我们拷贝函数、undefined等`stringify`转换有问题的数据时，就会出错，我们在实际开发中也要结合实际情况使用。

**举一反三：**

既然是通过改变数据类型来绕过拷贝引用这一过程，那么单纯的数组深拷贝是不是可以通过现有的几个API来实现呢？

```js
var arr = [1,2,3];
var newArr = arr.toString().split(',').map(item => Number(item))
newArr[0] = 100;
console.log(arr); // [1,2,3]
console.log(newArr); // [100,2,3]
```

注意，此时仅能对包含纯数字的数组进行深拷贝，因为：

1. toString无法正确的处理对象和函数
2. Number无法处理 false、undefined等数据类型

但我愿称它为**纯数字数组深拷贝**！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200812185156608.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)


#### 3.2 Object.assign()

有的人会认为`Object.assign()`，可以做到深拷贝，我们来看一下

```js
var obj = {a: 1, b: { c: 2 } }
var newObj = Object.assign({}, obj)

newObj.a = 100;
newObj.b.c = 200;
console.log(obj); // {a: 1, b: { c: 200 } }
console.log(newObj) // {a: 100, b: { c: 200 } }
```

神奇，第一层属性没有改变，但第二层却同步改变了，这是为什么呢？

因为 Object.assign()拷贝的是（可枚举）属性值。

假如源值是一个对象的引用，它仅仅会复制其引用值。[MDN传送门](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

## 四、自己实现深浅拷贝

既然现有的方法无法实现深拷贝，不妨我们自己来实现一个吧～

#### 4.1 浅拷贝

我们只需要将所有属性即其嵌套属性原封不动的复制给新变量一份即可，抛开现有的方法，我们应该怎么做呢？


```js
var shallowCopy = function(obj) {
    if (typeof obj !== 'object') return;

    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

我们只需要将所有属性的引用拷贝一份即可～

#### 4.2 深拷贝

相信大家在实现深拷贝的时候都会想到递归，同样是判断属性值，但如果当前类型为`object`则证明需要继续递归，直到最后

```js
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```

我们用白话来解释一下`deepCopy`都做了什么

```js
const obj = [1, { a: 1, b: { name: '余光'} } ];
const resObj = deepCopy(obj);
```

* 读取 `obj`，创建 第一个newObj
    - 判断类型为 `[]`
    - key为 `0` (`for in` 以任意顺序遍历，我们假定按正常循序遍历)
    - 判断不是引用类型，直接复制
    - key为 `1`
    - 判断是引用类型
    - 进入递归，重新走了一遍刚才的流程，只不过读取的是`obj[1]`

另外请注意递归的方式虽然可以深拷贝，但是在性能上肯定不如浅拷贝，大家还是需要结合实际情况来选择。

## 参考

* [冴羽大大的Js系列](https://github.com/mqyqingfeng/Blog)
* [lodash.js](https://www.lodashjs.com/docs/lodash.cloneDeep)


## 写在最后

下篇预告：如果准确判断一个对象的类型

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


