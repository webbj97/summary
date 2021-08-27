<template><h1 id="_2-搜索插入的位置-easy" tabindex="-1"><a class="header-anchor" href="#_2-搜索插入的位置-easy" aria-hidden="true">#</a> 2.搜索插入的位置（easy）</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p><a href="https://leetcode-cn.com/problems/search-insert-position/" target="_blank" rel="noopener noreferrer">LeetCode：35.搜索插入的位置<OutboundLink/></a></p>
<p>给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。</p>
<p>你可以假设数组中无重复元素。</p>
<p><strong>示例 1:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入: [1,3,5,6], 5
输出: 2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>示例  2:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入: [1,3,5,6], 2
输出: 1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="二、题解一-二分法" tabindex="-1"><a class="header-anchor" href="#二、题解一-二分法" aria-hidden="true">#</a> 二、题解一（二分法）</h2>
<p>在一个排序的数组查找，我们可以使用<code>二分法</code></p>
<p>我们的目的是：查找一个下标<code>index</code>，我们要找的<code>target &lt;= nums[mid]</code>的第一个值。</p>
<p>如果找不到，就返回数组的长度</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>时间复杂度：O(log(n))
空间复杂度：O(1)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>分析模版</strong></p>
<ul>
<li>目标存在 对应<code>target === nums[mid]</code></li>
<li>目标不存在 对应<code>target &lt; nums[mid]</code>，即找到第一个比目标值大的，目标值将会加入此位置</li>
</ul>
<p><strong>Javasciprt 代码</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">searchInsert</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">//左边界</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 右边界</span>
  <span class="token keyword">let</span> ans <span class="token operator">=</span> len<span class="token punctuation">;</span> <span class="token comment">// 返回值，注意如果目标不在数组中，返回数组的长度</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mid <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> left<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;=</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 合并条件</span>
      <span class="token comment">// 证明左边界在数组内部</span>
      ans <span class="token operator">=</span> mid<span class="token punctuation">;</span> <span class="token comment">// 更新返回值</span>
      right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 既然已经保存了次目标值，就可以移除它的</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="三、题解二-暴力法" tabindex="-1"><a class="header-anchor" href="#三、题解二-暴力法" aria-hidden="true">#</a> 三、题解二（暴力法）</h2>
<p>提到暴力法，就是频繁的使用遍历，且没有所谓的“套路”，从上倒下透漏出的都是实在！</p>
<p><strong>时间复杂度：O(n)</strong>
<strong>空间复杂度：O(1)</strong></p>
<p><strong>思路</strong></p>
<ul>
<li>找到第一比 target 大的元素，它的下标，就是要答案。</li>
</ul>
<p><strong>实现</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">searchInsert</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">>=</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> len<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="四、写在最后" tabindex="-1"><a class="header-anchor" href="#四、写在最后" aria-hidden="true">#</a> 四、写在最后</h2>
<p>这是二分法解题的第二篇文章，与基础模版相比，它只是修改 <code>target === nums[mid]</code>这一个判定条件。</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励~</p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷JS，水平有限，虚心学习中</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">JavaScript版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN<OutboundLink/></a></li>
</ul>
<p>如果您看到了最后，不妨点个star吧，这就是对我最大的鼓励！</p>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
