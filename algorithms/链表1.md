<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-04-29 10:52:25
 -->

<h1 align=center>链表的原理及Js基本实现</h1>

> 虚心接受批评和指正，互相成就，共勉！

## 从这篇文章你会收获什么？
* 了解单链表和双链表的基本结构；
* 在单链表或双链表中实现遍历、插入和删除；
* 在链表中使用双指针技巧（快慢指针技巧）；
* 解决一些经典问题，例如反转链表；

**目录**
* <a href="#1">一、链表的由来及特点</a>
* <a href="#2">二、单链表</a>
	- <a href="#2-1">2.1、添加节点</a>
	- <a href="#2-2">2.2、删除节点</a>
* <a href="#3">三、设计链表</a>
* <a href="#4">四、链表基本操作即使用场景</a>
* <a href="#5">五、关于我</a>


<h2 id="0">链表的由来</h2>

## 一、链表的由来
我们接触最多的数据存储结构应该是数组了，在实际场景中它的出现频率极高，但是它并不能适于用所有情况。这也是的链表

**原因如下：**
* 在很多编程语言中，数组的长度是固定的，所以当数组已被数据填满时，再要加入新的元素就会非常困难。
* 在数组中的`添加`和`删除`元素很麻烦，因为需要将数组中的其他元素向前或向后平移。
* `JavaScript中`数组的主要问题是，它们被实现成了对象，与其他语言（比如 C++ 和 Java） 的数组相比，效率较低。

**为了解决上述问题**
如果你发现数组在实际使用时很慢，就可以考虑使用链表来替代它。除了对数据的随机访问，链表几乎可以用在任何可以使用一维数组的情况中，如果需要频繁的删除和添加操作，就主动考虑一下链表吧～

<h3 id="1-1">1.1 特点</h3>

**优点**

* 链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。
* 增加数据和删除数据很容易。
* 链表中的每个元素实际上是一个单独的对象，而所有对象都通过每个元素中的引用字段链接在一起。

**缺点？**
* 访问时间是线性的(而且难以管道化)，更快的访问，如随机访问，是不可行的。与链表相比，数组具有更好的缓存位置。
* 失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大

链表有很多种不同的类型：单向链表，双向链表以及循环链表。链表可以在多种编程语言中实现。下面出现的代码都是用Js实现的，如果不对的地方，欢迎大佬们指正，我们共勉。


<h2 id="2">二、单链表</h2>

单链表中的每个结点不仅包含值，还包含链接到下一个结点的引用字段。通过这种方式，单链表将所有结点按顺序组织起来。、

下面是一个单链表的例子：

<img src="https://img-blog.csdnimg.cn/20200430135707933.png" width="80%"></img>

当你得到了`head`节点，就得到了整个列表。

我们创建单一节点（Node）的操作应该是这样的：

```js
var Node = function(ele){
    this.ele = ele; // 保存当前节点的值
    this.next = null; // 保存指向下一个节点的地址
}
```

<h3 id="2-1">2.1 添加节点</h3>

就像给绳子打结一样，添加节点，就是在两个绳结之间，再打一个新结。

如果我们想在给定的结点 prev 之后添加新值，我们应该：
1. 创建要插入的Node——cur
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430140913796.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)
2. 将cur节点的`next`链接到next节点（pre的下一个节点）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430141224682.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)
3. 将pre的`next`链接到cur节点
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430141442914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

#### 在开头添加结点
众所周知，我们使用头结点（`head`）来代表整个列表。

因此，在列表开头添加新节点时更新头结点 head 至关重要。

1. 初始化一个新结点 `cur`；
2. 将新结点`cur`的`next`链接到我们的原始头结点 head.next节点
3. 将head节点的`next`链接到`cur`即可。
<img src="https://img-blog.csdnimg.cn/20200430144635700.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="80%"></img>

#### 在末尾添加节点
1. 创建新节点`cur`
1. 将链表的末尾节点的`next`链接到`cur`即可


<h3 id="2-2">2.2 删除节点</h3>

如果我们要删除指定的节点`cur`，该这么做：

1. 找到cur的上一个节点`prev`，及其下一个节点`prev.next`（要删除的节点）
2. 将`prev.next`链接让 `prev.next.next，即跳过删除节点。

<img src="https://img-blog.csdnimg.cn/20200430145550712.png" width="100%" />

注意：我们必须从头节点遍历至指定节点，删除节点的平均时间复杂度是`O(N)`

#### 删除末尾节点
1. 找到`next`节点链接为`null`的节点，以及它的前节点`prev`
2. `prev.next` 链接 `null` 即可


<h2 id="3">三、设计链表</h2>

以LeetCode的中的基础题为例，我们尝试用代换实现前文提过的思路。[707.设计链表](https://leetcode-cn.com/problems/design-linked-list/)
### 题目
设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。

在链表类中实现这些功能：

* get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
* addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
* addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
* addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
* deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。

**示例：**
```
MyLinkedList linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1);            //返回3
```

### Js版代码实现

```js
// 创建节点类
var Node = function(ele){
    this.ele = elel; // 保存当前节点的值
    this.next = null; // 保存的下一个节点的地址
}

/**
 * 链表构造函数
 */
var MyLinkedList = function() {
    this.head = new Node('head')
};

/**
 * 查询 index 位节点
 * @param {index} index
 * @return {Node} 返回节点 || null
 */
MyLinkedList.prototype.find = function (index) {
    var i = 0 // 记录下标
    var current = this.head //新节点->head节点
    while(current.next){
        if(i == index){
            return current.next
        }
        i++
        current = current.next
    }
    return null
};

/**
 * 查询 index 位节点的值
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    var _this = this
    var res = _this.find(index) // 利用find查找
    return res ? res.ele : -1
};

/**
 * 插入到链表首位
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    var current = this.head
    var node = new Node(val)
    node.next = current.next
    current.next = node
};

/**
 * 插入到链表首末位
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    var current = this.head
    while(current.next){
        current = current.next
    }
    var node = new Node(val)
    current.next = node
};

/**
 * 在 index 位置插入值为 val 的节点
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if(index < 0){
        this.addAtHead(val) // 下标小于链表0，则插入头部
        return;
    }
    var current = this.head
    var i = 0
    while(current.next){
        if(i == index){
            var node = new Node(val)
            node.next = current.next
            current.next = node
            return;
        }
        i++
        current = current.next
    }

    this.addAtTail(val) // 下标超过链表长度，则插入末尾
    return;
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */

MyLinkedList.prototype.deleteAtIndex = function(index) {
    if(index < 0) return;
    var i = 0
    var current = this.head
    while(current.next){
        if(i == index){
            current.next = current.next.next
            return;
        }
        i++
        current = current.next
    }
};
```

为了方便操作，我们主动创建了一个节点为头节点，实际存储过程中是完全不需要的。


<h2 id="4">四、链表的基本使用场景</h2>

* 对线性表的长度或者规模难以估计；
* 频繁做插入删除操作；
* 构建动态性比较强的线性表

### 链表的基本操作
**1.创建节点**
```js
// Node类
function Node(element) {
    this.element = element;
    this.next = null;
}
```
**2.创建链表**
```js
function LList() {
    console.log('---创建---')
    this.head = new Node("head");
    this.find = find; //查找指定节点
    this.insert = insert; //插入节点
    this.remove = remove; //删除节点
    this.display = display; //打印链表
    this.findNextEle = findNextEle; //查找存储指定节点的节点
}
```
**3.查找目标节点**
```js
function find(item) {
    var currNode = this.head; //创建一个节点，并将头节点指向它
    while (currNode.element != item) {
        currNode = currNode.next; // 如果currNode的值不是我们找的值，向下查找
    }
    return currNode;
}
```
**4.添加操作**
```js
function insert(newElement, item) {
    var newNode = new Node(newElement); // 创建要插入的节点
    var current = this.find(item); //找到要插入的节点
    newNode.next = current.next; //要添加位置节点的next -> 查找到节点的next
    current.next = newNode; // 被缇娜家位置的节点
}
```
**5.查找存储目标节点的节点**
```js
function findNextEle(item) {
    var currNode = this.head
    while (!(currNode.next == null) && (currNode.next.element != item)) {
        currNode = currNode.next
    }
    return currNode
}
```
**6.删除操作**
```js
function remove(item) {
    console.log('---删除---',item)
    var preNode = this.findNextEle(item) //找到存储着《待删除节点》的节点
    if (!(preNode.next == null)) {
        preNode.next = preNode.next.next // 存储着 《待删除节点》.next -> .next.next
    }
}
```
**7.打印操作**
```js
function display() {
    var currNode = this.head
    while (!(currNode.next == null)) {
        console.log(currNode.next.element,currNode.next.next)
        currNode = currNode.next
    }
}
```

**测试数据**
```js
var testCities = new LList()
testCities.insert('北京', 'head')
testCities.insert('上海', '北京')
testCities.insert('广州', '上海')
testCities.insert('深圳', '广州')
testCities.display()
testCities.remove('广州');
testCities.display()
```
## 总结
* 链表的特点，优缺点。
* 链表的插入、删除思想
* 如何实现一个链表类，并且支持必要的操作
* 链表得实际场景的应用

<h2 id="5">关于我</h2>

* 19年毕业的前端开发
* 沉迷Js、热衷开源（菜鸟一个）
* 邮箱：webbj97@163.com

##### 瞧一瞧（求Star！！！）
* LeetCode题解Javascript版本：[Gitbook版本传送门](https://webbj97.github.io/leetCode-Js/)
* LeetCode题解Javascript版本：[CSDN传送门](https://blog.csdn.net/jbj6568839z/article/details/103808459)
* 前端进阶笔记：[Gitbook传送门](https://webbj97.github.io/summary/)


下一篇我们会总结一下双指针在链表中的作用，未完待续...