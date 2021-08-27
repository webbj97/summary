<template><h1 id="环形链表" tabindex="-1"><a class="header-anchor" href="#环形链表" aria-hidden="true">#</a> 环形链表</h1>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p>给定一个链表，判断链表中是否有环。</p>
<p>为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="解法一-快慢指针" tabindex="-1"><a class="header-anchor" href="#解法一-快慢指针" aria-hidden="true">#</a> 解法一（快慢指针）</h2>
<ul>
<li>一个有环的链表，比作一个环形跑道，跑的快的运动员迟早会再次和跑得慢的运动员相遇</li>
<li>慢指针一次移动 1 位，快指针一次移动 2 位，快指针如果跑道了终点，证明无环，否则一定会相遇</li>
<li>快指针比漫指针多走1位，不管成环的地方在哪里，两者一定会相遇</li>
</ul>
<p><strong>代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">hasCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>head <span class="token operator">||</span> <span class="token operator">!</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span> <span class="token comment">//头节点</span>
  <span class="token keyword">var</span> fast <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span> <span class="token comment">// 头节点后的第一个节点</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>slow <span class="token operator">!=</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> fast<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// fast走的快，有终点也是先一步到达终点</span>
    <span class="token punctuation">}</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span> <span class="token comment">// 走一步</span>
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span> <span class="token comment">// 走两步</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h5 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h5>
<p><img src="https://img-blog.csdnimg.cn/20200506112547981.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="题解二-set方法" tabindex="-1"><a class="header-anchor" href="#题解二-set方法" aria-hidden="true">#</a> 题解二 （set方法）</h2>
<h5 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h5>
<ul>
<li>遍历链表，放入 set 结构中，如果已经存在，则证明有环</li>
</ul>
<h5 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">hasCycle</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> setBox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>setBox<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      setBox<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
      head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h5 id="结果-1" tabindex="-1"><a class="header-anchor" href="#结果-1" aria-hidden="true">#</a> 结果</h5>
<p><img src="https://img-blog.csdnimg.cn/20191230184648891.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="三、写在最后" tabindex="-1"><a class="header-anchor" href="#三、写在最后" aria-hidden="true">#</a> 三、写在最后</h2>
<p>本文是链表-双指针思路的第一题，通过指针速度差异，来达到验证目的。</p>
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
