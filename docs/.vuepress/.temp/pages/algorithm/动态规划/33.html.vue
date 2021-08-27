<template><h1 id="模版-i-搜索旋转排序数组-middle" tabindex="-1"><a class="header-anchor" href="#模版-i-搜索旋转排序数组-middle" aria-hidden="true">#</a> 模版 I - 搜索旋转排序数组（middle）</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p><a href="https://leetcode-cn.com/problems/search-in-rotated-sorted-array/" target="_blank" rel="noopener noreferrer">LeetCode：33.搜索旋转排序数组<OutboundLink/></a></p>
<p>给你一个整数数组 <code>nums</code> ，和一个整数 <code>target</code> 。</p>
<p>该整数数组原本是按升序排列，但输入时在预先未知的某个点上进行了旋转。（例如，数组  [0,1,2,4,5,6,7]  可能变为  [4,5,6,7,0,1,2] ）。</p>
<p>请你在数组中搜索  target ，如果数组中存在这个目标值，则返回它的索引，否则返回  -1 。</p>
<p><strong>示例：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="二、二分法解题" tabindex="-1"><a class="header-anchor" href="#二、二分法解题" aria-hidden="true">#</a> 二、二分法解题</h2>
<p>二分查找是一种基于比较目标值和数组中间元素的教科书式算法。</p>
<ul>
<li>如果目标值等于中间元素，则找到目标值。</li>
<li>如果目标值较小，继续在左侧搜索。</li>
<li>如果目标值较大，则继续在右侧搜索。</li>
</ul>
<p><strong>分析题型</strong></p>
<ul>
<li>我们的目标是找到最小值</li>
<li>相对于基础模版，我们拥有的数组不一定是升序的，所以我们要转换思路，将情况导向我们掌握的升序二分查找</li>
</ul>
<p><strong>修改模版</strong></p>
<p>根据模版I修改判断条件</p>
<ol>
<li>确定
<ul>
<li>left = 0;</li>
<li>right = nums.length - 1;</li>
<li>mid = left + ((right - left) &gt;&gt; 1);</li>
</ul>
</li>
<li>终止搜索条件为 left &lt;= right。</li>
<li>判断中间值是在有序区间内还是在无序区间内(因为只有 1 个转折点)
<ul>
<li>nums[mid] &gt; nums[left]，则 mid 在左侧升序区间</li>
<li>nums[mid] &lt; nums[left]，则 mid 在右侧升序区间</li>
</ul>
</li>
<li>继续判断 target 与有序区间的边界进行比较
<ul>
<li>确定 <code>mid</code> 在左侧升序区间，<code>target</code> 与左区间（<code>[left, mid]</code>）的最大值比较，即 <code>target &lt;= nums[mid]</code> &amp;&amp; <code>target &gt;= nums[left]</code> 时，<code>target</code> 在左侧区间，可以直接舍弃右侧部分，反之则舍弃左侧部分</li>
<li>确定 <code>mid</code> 在右侧升序区间，<code>target</code> 与右区间（<code>[mid, right]</code>）的最小值比较，即 <code>target &gt;= nums[mid]</code> &amp;&amp; <code>target &lt;=&gt; nums[right]</code> 时，<code>target</code> 在右侧区间，可以直接舍弃左侧部分，反之则舍弃右侧部分</li>
</ul>
</li>
</ol>
<p><strong>Javasciprt 代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">search</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 定义[left, right] 边界</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// [0, 1]</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
    <span class="token comment">// 如果左侧为升序排列</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">>=</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">>=</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> target <span class="token operator">&lt;</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果目标元素在升序排列中</span>
        right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 忽略右侧排列</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 忽略左侧排列</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果右侧为升序排列</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;=</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> target <span class="token operator">></span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 忽略左侧排列</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 忽略右侧排列</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="三、写在最后" tabindex="-1"><a class="header-anchor" href="#三、写在最后" aria-hidden="true">#</a> 三、写在最后</h2>
<p>本文是<code>二分查找-模版I</code>的最后一篇题解，不难发现，<code>模版I</code>相关的例题都是在基础二分查找的情况下，修改了某个条件，但这绝对不是所有情况，希望我们能一起去探索，共勉！</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励</p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷 JS，水平有限，虚心学习中</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">JavaScript 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
