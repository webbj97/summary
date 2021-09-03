<template><h1 id="环形链表ii" tabindex="-1"><a class="header-anchor" href="#环形链表ii" aria-hidden="true">#</a> 环形链表II</h1>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p>给定一个链表，判断链表中是否有环。</p>
<p>为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="题解-快慢指针" tabindex="-1"><a class="header-anchor" href="#题解-快慢指针" aria-hidden="true">#</a> 题解（快慢指针）</h2>
<ul>
<li>一个有环的链表，比作一个环形跑道，跑的快的运动员迟早会再次和跑得慢的运动员相遇</li>
<li>慢指针一次移动 1 位，快指针一次移动 2 位，快指针如果跑道了终点，证明无环，否则一定会相遇</li>
<li>快指针比漫指针多走1位，不管成环的地方在哪里，两者一定会相遇</li>
</ul>
<p>我们简单的推导一下：</p>
<ul>
<li>起点-&gt;成环点距离：<code>a</code></li>
<li>节点内相遇点，距离节点起始位置距离：<code>b</code></li>
<li>环的长度：<code>c</code></li>
<li>慢指针在环内走了<code>n1</code>圈</li>
<li>快指针在环内走了<code>n2</code>圈</li>
</ul>
<p><strong>推导：</strong></p>
<ol>
<li>慢指针一次一步，相遇时经过了：<code>a + b + c * n1</code>;</li>
<li>快指针一次二步，相遇时经过了: <code>a + b + c * n2</code>;</li>
</ol>
<p>因为要计算的是相对位置，所以n1、n2的取值完全不影响相对位置，所以取最理想情况<code>n1 = 0; n2 = 1</code>;</p>
<p>如果我们将n1、n2设置为0，那只有一种情况，就是环在起点，<code>a = b = 0</code>;</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>( a + b ) * 2 = ( a + b + c)  =>  a = c - b
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>结论：</strong></p>
<p>这样我们就得到了，起点-&gt;成环点 === 相遇点-&gt;成环点</p>
<p><strong>代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">head</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">detectCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> slow <span class="token operator">=</span> head<span class="token punctuation">,</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>fast <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果 快指针 走到终点，证明无环</span>
        slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">===</span> slow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 新指针在起点，快指针在相遇点</span>
            <span class="token comment">// 起点->成环点 === 相遇点->成环点</span>
            <span class="token comment">// 两个节点再次相遇时，一定在成环点</span>
            <span class="token keyword">var</span> start <span class="token operator">=</span> head<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>start <span class="token operator">!==</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                start <span class="token operator">=</span> start<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> fast<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="三、写在最后" tabindex="-1"><a class="header-anchor" href="#三、写在最后" aria-hidden="true">#</a> 三、写在最后</h2>
<p>本文是链表-双指针思路的第二题，通过指针速度差异，来达到验证目的。其中包含了一系列的思考，刚接触的同学可以自己动手画一画。加油！</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励～</p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷 JS，水平有限，虚心学习中</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/algorithm/" target="_blank" rel="noopener noreferrer">JS 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
