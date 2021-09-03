<template><p>// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。</p>
<p>// 示例：</p>
<p>// 输入：1-&gt;2-&gt;4, 1-&gt;3-&gt;4
// 输出：1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4</p>
<p>var mergeTwoLists = function(l1, l2) {
let head = new Node('head');</p>
<pre><code>let prev = head;
while(l1 !== null &amp;&amp; l2 !== null){
    if(l1.val &lt; l2.val){
        prev.next = l1;
        l1 = l1.next; // l1 的指向后移1位
    }else{
        prev.next = l2;
        l2 = l2.next; // l2 的指向后移1位
    }
    prev = prev.next;
}
// 当有一个链表先到达尾部后，剩下的接在末尾即可，也可能无空余节点，链接一个null
prev.next = l1 === null ? l2 : l1;
return head.next;
</code></pre>
<p>}</p>
</template>
