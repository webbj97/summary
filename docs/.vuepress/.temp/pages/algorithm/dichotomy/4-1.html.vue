<template><h1 id="pow-x-n" tabindex="-1"><a class="header-anchor" href="#pow-x-n" aria-hidden="true">#</a> pow(x, n)</h1>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p>实现  pow(x, n) ，即计算 x 的 n 次幂函数。</p>
<p><strong>示例 1:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入: 2.00000, 10
输出: 1024.00000
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>示例  2:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="题解" tabindex="-1"><a class="header-anchor" href="#题解" aria-hidden="true">#</a> 题解</h2>
<p><strong>解题思路</strong></p>
<ol>
<li>要判断 n 的正负，以确定我们的底是 x 还是 1/x</li>
<li>经过分析 <code>x^9 = x^4 * x^4 * x = (x^2 * x^2) * (x^2 * x^2) * x</code></li>
<li>判断 n 的奇偶性，已确定是否需要单独考虑
<ul>
<li>如果是奇数，那么需要多乘一次 x 本身，因为 Math.floor 向下取整，9 / 2=&gt; 4, 4 + 4 = 8，少了 1 个</li>
<li>如果是偶数，那么不需要考虑，直接降半即可</li>
</ul>
</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">x</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">n</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">myPow</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 分析n</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> x<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    x <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">/</span> x<span class="token punctuation">;</span>
    n <span class="token operator">=</span> <span class="token operator">-</span>n<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// x^7 = x^1 * x^2 * x^4</span>
  <span class="token comment">// x^9 = x^4 * x^4 * x = (x^2 * x^2) * (x^2 * x^2) * x</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>n <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// if(m是奇数，m的个位是1)，就多乘1次x，因为我们是做向下取整</span>
    <span class="token comment">// &amp;表示 2进制数字的相与</span>
    <span class="token comment">// 如果是奇数，拿x^9举例，那么第一次res = 1 * x，最后一次是1，res = x * x ^ 8</span>
    <span class="token comment">// 如果偶数，拿x^8举例，那么第一次res = 1 * x ^ 8</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>n <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> res <span class="token operator">*=</span> x<span class="token punctuation">;</span>
    n <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>n <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    x <span class="token operator">*=</span> x<span class="token punctuation">;</span> <span class="token comment">// x = x^2 底就要平方，每降一半，自己就要平方一次</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><strong>LeetCode 结果</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>执行用时：76 ms, 在所有 JavaScript 提交中击败了95.38%的用户
内存消耗：39.6 MB, 在所有 JavaScript 提交中击败了5.03%的用户
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="三、写在最后" tabindex="-1"><a class="header-anchor" href="#三、写在最后" aria-hidden="true">#</a> 三、写在最后</h2>
<p>本文是附加题，可能仅仅借助了二分思想中的一部分，加油！</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励</p>
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
