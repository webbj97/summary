<template><h1 id="_1-二分查找-easy" tabindex="-1"><a class="header-anchor" href="#_1-二分查找-easy" aria-hidden="true">#</a> 1.二分查找（easy）</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p><a href="https://leetcode-cn.com/problems/binary-search/" target="_blank" rel="noopener noreferrer">LeetCode：704.二分查找<OutboundLink/></a></p>
<p>给定一个  <code>n</code>  个元素有序的（升序）整型数组  <code>nums</code> 和一个目标值  <code>target</code>  ，写一个函数搜索  nums  中的 target，如果目标值存在返回下标，否则返回 -1。</p>
<p><strong>示例:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>你可以假设 nums  中的所有元素是不重复的。</p>
<h2 id="二、二分法解题" tabindex="-1"><a class="header-anchor" href="#二、二分法解题" aria-hidden="true">#</a> 二、二分法解题</h2>
<p>二分查找是一种基于比较目标值和数组中间元素的教科书式算法。</p>
<ul>
<li>如果目标值等于中间元素，则找到目标值。</li>
<li>如果目标值较小，继续在左侧搜索。</li>
<li>如果目标值较大，则继续在右侧搜索。</li>
</ul>
<p>时间复杂度：<code>O(logN)</code>。
空间复杂度：<code>O(1)</code>。</p>
<h2 id="三、基础模版i" tabindex="-1"><a class="header-anchor" href="#三、基础模版i" aria-hidden="true">#</a> 三、基础模版I</h2>
<ol>
<li>确定初始的左右边界:
<ul>
<li><code>left</code>: 0</li>
<li><code>right</code>: nums.length-1</li>
<li><code>mid</code>: (left + (right - left) &gt;&gt; 1)</li>
</ul>
</li>
<li>如果中间元素值<code>nums[mid]</code> &lt; target：证明中间值左侧包括中间值都不符合要求，可以直接排除，<code>left = mid + 1</code></li>
<li>如果中间元素值<code>nums[mid]</code>：证明中间值右侧包括中间值都不符合要求，可以直接排除，<code>right = mid - 1</code></li>
<li>如果中间元素值<code>nums[mid]</code> = target：直接返回<code>mid</code>的下标</li>
<li>重新定义了左右边界，也需要重新计算中间值，我们需要继续进行范围的排除</li>
<li>定义搜索的条件，应该是搜索区间都不为空，即<code>left &lt;= right</code></li>
</ol>
<h2 id="四、js题解" tabindex="-1"><a class="header-anchor" href="#四、js题解" aria-hidden="true">#</a> 四、Js题解</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">search</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 初始左边界</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 初始右边界</span>
  <span class="token comment">// 如果left > right 证明整个数组结束了仍没有找到目标值</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//防止溢出</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">></span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 目标值大于中值，则中间左侧可以抛弃了</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 目标值小于中值，则中间右侧可以抛弃了</span>
      right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="三、写在最后" tabindex="-1"><a class="header-anchor" href="#三、写在最后" aria-hidden="true">#</a> 三、写在最后</h2>
<p>上面的代码就是二分法模板 I，看过我的二分法总结的同学应该知道，凭借这套模版以及对应的分析，类似的问题应该难不住你了。</p>
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
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
