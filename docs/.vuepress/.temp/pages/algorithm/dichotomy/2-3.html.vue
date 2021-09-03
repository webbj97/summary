<template><h1 id="_3-寻找旋转排序数组中的最小值-middle" tabindex="-1"><a class="header-anchor" href="#_3-寻找旋转排序数组中的最小值-middle" aria-hidden="true">#</a> 3.寻找旋转排序数组中的最小值（middle）</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p><a href="https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/" target="_blank" rel="noopener noreferrer">153. 寻找旋转排序数组中的最小值<OutboundLink/></a></p>
<p>假设按照升序排序的数组在预先未知的某个点上进行了旋转。例如，数组  [0,1,2,4,5,6,7] 可能变为  [4,5,6,7,0,1,2] 。</p>
<p>请找出其中最小的元素。</p>
<p><strong>示例</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入：nums = [4,5,6,7,0,1,2]
输出：0

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>注意</strong></p>
<ul>
<li>nums 中的所有整数都是 唯一 的</li>
<li>nums 原来是一个升序排序的数组，但在预先未知的某个点上进行了旋转</li>
<li>最终目的是找到拐点，因为一个递增序列的旋转，拐点即最小</li>
</ul>
<h2 id="二、基础模版-ii" tabindex="-1"><a class="header-anchor" href="#二、基础模版-ii" aria-hidden="true">#</a> 二、基础模版 II</h2>
<ol>
<li>确定初始的左右边界:
<ul>
<li><code>left</code>: 0</li>
<li><code>right</code>: nums.length-1</li>
<li><code>mid</code>: (left + (right - left) &gt;&gt; 1)</li>
</ul>
</li>
<li>查找条件需要访问元素的直接右邻居。</li>
<li>使用元素的右邻居来确定是否满足条件，并决定是向左还是向右。</li>
<li>保证查找空间在每一步中至少有 2 个元素。</li>
<li>需要进行后处理。 当你剩下 1 个元素时，循环 / 递归结束。 需要评估剩余元素是否符合条件。</li>
</ol>
<h2 id="三、题解" tabindex="-1"><a class="header-anchor" href="#三、题解" aria-hidden="true">#</a> 三、题解</h2>
<p><strong>Javasciprt 代码</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">findMin</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 与nums[right]比较是因为，是递增序列</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">></span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 中间值 > 末尾 = 证明拐点在右侧，递增区间在左侧，不用看左侧了</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      right <span class="token operator">=</span> mid<span class="token punctuation">;</span>
      <span class="token comment">// 中间值 &lt; 末尾 = 右侧是递增序列，右侧较大的区间可以忽略</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="四、写在最后" tabindex="-1"><a class="header-anchor" href="#四、写在最后" aria-hidden="true">#</a> 四、写在最后</h2>
<p>本文是二分查找-模版 II 的最后一题，接下来我们将面对更大的挑战，加油～</p>
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
