# 哈希表

## 一、概述

哈希表是一种使用哈希函数组织数据，以支持快速插入和搜索的数据结构。

有两种不同类型的哈希表：哈希集合和哈希映射。

* 哈希集合是集合数据结构的实现之一，用于存储非重复值。
* 哈希映射是映射 数据结构的实现之一，用于存储(key, value)键值对。

## 二、哈希表的原理

哈希表的关键思想是使用哈希函数将键映射到存储桶。更确切地说，

当我们插入一个新的键时，哈希函数将决定该键应该分配到哪个桶中，并将该键存储在相应的桶中；
当我们想要搜索一个键时，哈希表将使用相同的哈希函数来查找对应的桶，并只在特定的桶中进行搜索。
 

假设我们使用` y = x ％ 5 `作为哈希函数。让我们使用这个例子来完成插入和搜索策略：

<p align=center>
    <img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/09/06/screen-shot-2018-02-19-at-183537.png" width="60%">
</p>

* 插入：我们通过哈希函数解析键，将它们映射到相应的桶中。
    - 例如，1987 分配给桶 2，而 24 分配给桶 4。
* 搜索：我们通过相同的哈希函数解析键，并仅在特定存储桶中搜索。
    - 如果我们搜索 1987，我们将使用相同的哈希函数将1987 映射到 2。因此我们在桶 2 中搜索，我们在那个桶中成功找到了 1987。

#### 2.1 哈希函数

哈希函数是哈希表中最重要的组件，该哈希表用于将键映射到特定的桶。在上一篇文章中的示例中，我们使用 y = x % 5 作为散列函数，其中 x 是键值，y 是分配的桶的索引。

依赖这个哈希函数，我们要存储`7`和`12`时，你会发现他们指向的索引都是`2`，我们当然希望索引指向的key是唯一的，但很难找到这样完美的函数。

我们将一个**索引存储多个key**或多**个key指向一个索引**这种情况，称为冲突。

<p align=center>
    <img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/05/04/screen-shot-2018-05-04-at-145454.png" width="90%">
</p>


#### 2.2 冲突解决

理想情况下，如果我们的哈希函数是完美的一对一映射，我们将不需要处理冲突。不幸的是，在大多数情况下，冲突几乎是不可避免的。

冲突解决算法应该解决以下几个问题：

* 如何组织在同一个桶中的值？
* 如果为同一个桶分配了太多的值，该怎么办？
* 如何在特定的桶中搜索目标值？
* 根据我们的哈希函数，这些问题与桶的容量和可能映射到同一个桶的键的数目有关。

让我们假设存储最大键数的桶有 N 个键。

* 通常，如果 N 是常数且很小，我们可以简单地使用一个数组将键存储在同一个桶中。如果 N 是可变的或很大，我们可能需要使用高度平衡的二叉树来代替.。

## 三、设计哈希结构（不考虑冲突）

* `add(value)`：向哈希集合中插入一个值。
* `contains(value)`：返回哈希集合中是否存在这个值。
* `remove(value)`：将给定值从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。

```js
const hashSet = new MyHashSet();
hashSet.add(1);        
hashSet.add(2);        
hashSet.contains(1);    // 返回 true
hashSet.contains(3);    // 返回 false (未找到)
hashSet.add(2);          
hashSet.contains(2);    // 返回 true
hashSet.remove(2);          
hashSet.contains(2);    // 返回  false (已经被删除)

/**
 * Initialize your data structure here.
 */
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function delListNode(val, head) {
    let dummy = new ListNode(0, head); // 新建一个头指针，是防止要删除的是head
    let pre = dummy;
    while (pre.next) {
        if (pre.next.val === val) {
            pre.next = pre.next.next;
            break;
        }
        pre = pre.next;
    }
    return dummy.next;
};

function findInList(val, head) {
    let cur = head;
    while (cur) {
        if (cur.val === val) return true;
        cur = cur.next;
    }
    return false;
}

var MyHashSet = function() {
    this.arr = [];
    this.mod = 1000;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    if (this.contains(key)) return;

    let index = key % this.mod;
    let head = this.arr[index];
    let node = new ListNode(key);
    if (!head) {
        this.arr[index] = node;
    } else {
        node.next = head;
        this.arr[index] = node;
    }
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    if (!this.contains(key)) return;

    let index = key % this.mod;
    let head = this.arr[index];
    this.arr[index] = delListNode(key, head);
};


/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    let index = key % this.mod;
    let head = this.arr[index];

    return findInList(key, head);
};
```