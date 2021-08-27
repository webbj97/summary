# JavaScript专题（二）数组去重

> 相信当部分开发同学都会遇到这个问题，它的答案有很多种，但是想要真的的回答好这个问题却比较难，我们今天来看看应该怎么回答这个问题。
> 本文篇幅较长，不妨收藏下来慢慢阅读～

## 一、双层循环

```js
const unique = (arr)=>{
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] === arr[j]){
                arr.splice(j, 1); // 移除重复元素
                j--; // 修正下标
            }
        }
    }
    return arr;
};

const unique = (arr)=>{
    var arr = [1, '1', '1', 1, 2, true, false, true, 3, 2, 2, 1];
    var newArr = [];
    for(let i = 0; i < arr.length; i++){
        for(var j = 0; j < newArr.length; j++){ // 注意var声明的j
            if(arr[i] === newArr[j]) break; // 新数组已存在当前值
        }
        if(j === newArr.length){ // 此时j和newArr长度相等，没有被中断
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

unique([1, '1', '1', 1, 2, true, false, true, 3, 2, 2, 1]); // [ 1, '1', 2, true, false, 3 ]
```

**核心点：**

* 时间复杂度：`O(n^2)`
* 上面的两种方法都是两次循环遍历，处理方式略有不同
* 上述实现方式确实不是最佳选择，但它胜在兼容性好啊～

## 二、indexOf和includes

#### 2.1 indexOf简化一层循环判断

**核心点：**

* 如果需要返回原数组，则可以在`indexOf`方法找到重复项时（不等于它首次出现的位置）时利用`splice`移除
* `indexOf`：返回在数组中可以找到一个给定元素的`第一个索引`，如果不存在，则返回-1。
* `indexOf(ele, fromIndex)`
    - ele：要查找的元素
    - fromIndex：查找元素的起始位置，默认为0，允许负数，-2表示从倒数第二个元素开始查找
    - 返回一个下标（number）

**代码：**

```js
const unique = (arr) => {
    var res = [];
    for (let i = 0; i < arr.length; i++){
        if(res.indexOf(arr[i]) === -1 ){
            res.push(arr[i]);
        }
    }
    return res;
}
```

#### 2.2 includes简化一层循环判断

**核心点：**

* 具体的是要返回原数组还是新数组大家可以自行组合～
* `includes`：用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回`false`
* `includes(ele, fromIndex)`
    - ele：要查找的元素
    - fromIndex：指定索引处开始查找。默认为 0，如果为负值，从末尾开始往前跳 `fromIndex` 的绝对值个索引。。
    - 返回结果（bool）

**代码：**

```js
const unique = (arr) => {
    var res = [];
    for (let i = 0; i < arr.length; i++){
        if(!res.includes(arr[i])){
            res.push(arr[i]);
        }
    }
    return res;
}
```

#### 2.3 indexOf和includes对于当前场景的选择

在这里我们推荐使用includes来查找元素：

**返回值可以直接作为if的条件语句，简洁**

```js
if(res.indexOf(arr[i]) !== -1 ){ todo }

// or

if(res.includes(arr[i])){ todo }
```

**识别`NaN`**

如果数组中有`NaN`，你又正好需要判断数组是否有存在`NaN`，这时你使用`indexOf`是无法判断的，你必须使用`includes`这个方法。

```js
var arr = [NaN, NaN];
arr.indexOf(NaN); // -1
arr.includes(NaN); // true
```

**识别`undefined`**

如果数组中有`undefined`值，`includes`会认为**空的值是undefined**，而`indexOf`不会。


```js
var arr = new Array(3);
console.log(arr.indexOf(undefined)); //-1
console.log(arr.includes(undefined)) //true
```


## 三、排序去重

**核心点：**

* 数组排序后，相同的元素会相邻，所以如果当前元素与它的相邻元素不同，就存入到新数组中；
* 相比于indexOf，只需要一层循环；
* concat会拼接数组，并返回新数组；
* sort()排序是通过按照转换为的`字符串的各个字符的Unicode位点`进行排序。所以很难保证它的准确性；

**代码：**

```js
var arr = [1, 1, '1'];

function unique(arr) {
    var res = [];
    var sortedArr = arr.concat().sort();
    var last;
    for (var i = 0; i < sortedArr.length ; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || last !== sortedArr[i]) {
            res.push(sortedArr[i])
        }
        last = sortedArr[i]; // 记录上一个值
    }
    return res;
}

console.log(unique(array));
```

## 四、filter

**核心点：**

* filter：方法创建一个新数组, 其包含通过所提供`函数实现的测试`的所有元素（返回测试函数成立的元素）
* `filter(callback, thisArg)`：
    - callback接受三个参数：element-当前正在处理的元素，index-当前元素索引，array-调用了filter的数组本身
    - thisArg：执行 callback 时，用于 this 的值。
利用filter我们可以在代码层面简化一下外层循环：

**代码：**

```js
var arr = [1, 2, 1, 1, '1'];

const unique = function (arr) {
    var res = arr.filter(function(item, index, arr){
        return arr.indexOf(item) === index;
    })
    return res;
}
console.log(unique(arr)); // [ 1, 2, '1' ]
```

结合排序的思路：

```js
var arr = [1, 2, 1, 1, '1'];

const unique = function (arr) {
    return arr.concat().sort().filter(function(item, index, arr){
        return !index || item !== arr[index - 1]
    })
}

console.log(unique(arr));
```

## 五、键值对（key-value）

前面提到的几种方式总结下来大致分为

1. 非排序数组，两次遍历判断（遍历、查询）
2. 排序数组，相邻元素比较

我们再提出一种方式，利用Object对象 key-value的方式，来统计数组中元素出现的个数，初步判断逻辑也有两种

拿`[1,1,1,2,2,3,'3']`举例：

1. 统计每个元素出现的次数，obj：{1: 3, 2: 2, 3: 3}, 返回这个`obj`的`key`而不管他们的`value`
2. 只元素首次出现，再次出现则证明他是重复元素

#### 5.1 统计次数

```js
var arr = [1, 2, 1, 1, '1', 3, 3];

const unique = function(arr) {
    var obj = {};
    var res = [];
    arr.forEach(item => {
        if (!obj[item]) {
            obj[item] = true;
            res.push(item);
        }
    });
    return res;
}
console.log(unique(arr)); // [1, 2, 3]
```

#### 5.2 结合filter

```js
var arr = [1, 2, 1, 1, '1'];

const unique = function(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}
console.log(unique(arr)); // [1, 2]
```

#### 5.3 key: value存在的问题

对象的属性是字符串类型的，即本身`数字1`和`字符串‘1’`是不同的，但保存到对象中时会发生隐式类型转换，导致去重存在一定的隐患。

考虑到string和number的区别（typeof 1 === 'number'， typeof '1' === 'string'），

所以我们可以使用 `typeof item + item` 拼成字符串作为 key 值来避免这个问题：


```js
var arr = [1, 2, 1, 1, '1', 3, 3, '2'];

const unique = function(arr) {
    var obj = {};
    var res = [];
    arr.forEach(item => {
        if (!obj[typeof item + item]) {
            obj[typeof item + item] = true;
            res.push(item);
        }
    });
    return res;
}
console.log(unique(arr)); // [ 1, 2, '1', 3, '2' ]
```

## 六、ES6

随着 ES6 的到来，去重的方法又有了进展，比如我们可以使用 Set 和 Map 数据结构。

#### 6.1 Set

Set：它允许你存储任何类型的唯一值，无论是原始值或者是对象引用

**代码：**

```js
var arr = [1, 2, 1, '1', '2'];

const unique = function(arr) {
   return Array.from(new Set(arr));
}

console.log(unique(arr)); // [ 1, 2, '1', '2' ]
```

**简化1：**

```js
function unique(array) {
    return [...new Set(array)];
}
```

**简化2：**

```js
var unique = (a) => [...new Set(a)]
```

#### 6.2 Map

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。
* Map.prototype.has(key)：返回一个布尔值，表示Map实例是否包含键对应的值。
* Map.prototype.set(key, value)：设置Map对象中键的值。返回该Map对象。

```js
function unique (arr) {
    const newMap = new Map()
    return arr.filter((a) => !newMap.has(a) && newMap.set(a, 1));
}
```

写到这里比较常规的数组去重方法就总结的差不多了，如果需要更强大的去重方法，我们需要对他们进行组合，而且因为场景的不同，我们所实现的方法并不一定能涵盖到

## 七、一些问题

上面几个去重的方法，在针对数字、字符串、特殊字符、undefined、NaN的表现各不相同。

```js
1 === 1 // true
undefined === undefined // true
'str' === 'str' // true
1 === '1' // false
NaN === NaN // false
```

这还不算数组保存多个对象时的去重，所以场景不同我们的选择不同，加油～

## 参考

* [JavaScript专题之数组去重](https://github.com/mqyqingfeng/Blog/issues/27);
* [掘金——七种去重方法](https://juejin.im/post/5aed6110518825671b026bed)

## 写在最后

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