/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-05-08 16:09:05
 */
// 设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。

// 在链表类中实现这些功能：

// get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
// addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
// addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
// addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
// deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。


// MyLinkedList linkedList = new MyLinkedList();
// linkedList.addAtHead(1);
// linkedList.addAtTail(3);
// linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
// linkedList.get(1);            //返回2
// linkedList.deleteAtIndex(1);  //现在链表是1-> 3
// linkedList.get(1);            //返回3

function Node(val) {
    this.val = val //保存当前值
    this.prev = null //记录前节点
    this.next = null //记录后节点
}

/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
    this.head = new Node('head') // 定义一个头节点，保证初始化时不为空
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    var cur = this.head
    var count = -1 // 因为创建了head这个哨兵节点，所以count下标默认尾-1
    if(index < 0) return -1;
    while(cur){
        if(count == index){
            return cur.val
        }
        cur = cur.next
        count++
    }
    return -1
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    var cur = this.head
    var node = new Node(val)
    // 要注意head节点后是不是存在节点
    if(cur.next){
        node.next = cur.next
        node.prev = cur

        cur.next.prev = node
        cur.next = node
    }else{
        cur.next = node
        node.prev = cur
    }
};


/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    var cur = this.head
    var node = new Node(val)
    // 只需要找到尾节点
    while(cur.next){
        cur = cur.next
    }
    cur.next = node
    node.prev = cur
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    var cur = this.head
    var node = new Node(val)
    var count = -1 // 因为创建了一个哨兵节点，所以记录下标
    if(index < 0){ // 插入位置<0时，直接加到头节点
        node.next = cur.next
        node.prev = cur

        cur.next.prev = node // 维护prev节点
        node.prev = cur //维护prev节点
        return;
    }
    while(cur){
        // 如果在链表中间匹配到
        if(count == index){
            node.next = cur // 添加节点next->当前节点
            node.prev = cur.prev // 添加节点prev-> 当前节点prev

            cur.prev.next = node // 前节点next->添加节点
            cur.prev = node // 前节点->添加节点
            return ;
        }
        // 如果走到了尾节点，且下标+1 = index = 数组长度
        if(!cur.next && count+1 == index){
            cur.next = node
            node.prev = cur
            return;
        }
        // 没走到尾节点 && 下标未匹配上，则向后跳
        cur = cur.next
        count++
    }
    return;
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    var cur = this.head
    var count = -1
    if(index < 0) return -1; // 下标无效
    while(cur){
        if(count == index){
            // 如果不是尾节点，如果改变cur.prev节点next的指向
            // 同时更新cur.next节点prev的指向，做到忽略cur节点
            if(cur.next){
                cur.prev.next = cur.next
                cur.next.prev = cur.prev
            }else{
                cur.prev.next = null
            }
            return;
        }
        cur = cur.next
        count++
    }
};

var link = new MyLinkedList()
link.addAtTail(1)
link.addAtTail(2)
link.addAtTail(3)
// link.deleteAtIndex(1)
console.log('link:', link);



