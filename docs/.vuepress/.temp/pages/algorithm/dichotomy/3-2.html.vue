<template><h1 id="_2-找到-k-个最接近的元素-middle" tabindex="-1"><a class="header-anchor" href="#_2-找到-k-个最接近的元素-middle" aria-hidden="true">#</a> 2.找到 K 个最接近的元素（middle）</h1>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p><a href="https://leetcode-cn.com/problems/find-k-closest-elements/" target="_blank" rel="noopener noreferrer">LeetCode658.找到 K 个最接近的元素<OutboundLink/></a></p>
<p>给定一个排序好的数组  arr ，两个整数 k 和 x ，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。</p>
<p>整数 a 比整数 b 更接近 x 需要满足：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>|a - x| &lt; |b - x| 或者
|a - x| == |b - x| 且 a &lt; b
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>示例 1：</p>
<p>输入：arr = [1,2,3,4,5], k = 4, x = 3
输出：[1,2,3,4]
示例 2：</p>
<p>输入：arr = [1,2,3,4,5], k = 4, x = -1
输出：[1,2,3,4]</p>
<p>提示：</p>
<p>1 &lt;= k &lt;= arr.length
1 &lt;= arr.length &lt;= 104
数组里的每个元素与 x 的绝对值不超过 104</p>
<h2 id="二、基础模版-iii" tabindex="-1"><a class="header-anchor" href="#二、基础模版-iii" aria-hidden="true">#</a> 二、基础模版 III</h2>
<p>因为我们的判断区间最少为 2 个元素，所以我们要注意循环的执行条件</p>
<ol>
<li>简单的判断边界： <code>nums.length === 0，return -1</code>；</li>
<li>定义初始的左右边界：<code>left = 0, right = nums.length - 1</code>；</li>
<li>确定执行条件：<code>left + 1 &lt; right</code>，这也意味着查找区间要存在 3 个元素；</li>
<li>向左查找时：<code>right = mid</code>；</li>
<li>向左查找时：<code>left = mid</code>；</li>
<li>判断剩下的两个元素哪个符合目标元素，并返回结果；</li>
</ol>
<h2 id="三、题解" tabindex="-1"><a class="header-anchor" href="#三、题解" aria-hidden="true">#</a> 三、题解</h2>
<p><strong>分析模版</strong></p>
<ul>
<li>我们的目标是：寻找目标值的起始下标和终止下标，但它是可能重复的</li>
<li>针对这样的情况，我们要将判断拆解成查找目标首次出现的位置，和最后一次出现的位置</li>
</ul>
<p><strong>JavaScript 代码</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">findClosestElements</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> k<span class="token punctuation">,</span> x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> k<span class="token punctuation">;</span> <span class="token comment">// 注意我们让出来k的值，当作我们的“备用值”</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">-</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>mid <span class="token operator">+</span> k<span class="token punctuation">]</span> <span class="token operator">-</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// x-arr[mid] > arr[mid+k]-x，arr[mid+k]的点一定距离目标值更近</span>
      <span class="token comment">// 且它距离arr[mid]是k个，证明arr[mid]一定不会存在与结果区间中，它也不可能是起始点</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 我们在移动满足条件的起始点</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// x-arr[mid] &lt;= arr[mid+k]-x，arr[mid]下标的点一定距离目标值更近</span>
      <span class="token comment">// 所以我们需要收缩右边界</span>
      right <span class="token operator">=</span> mid<span class="token punctuation">;</span> <span class="token comment">// 压缩右区间</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> left<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> left <span class="token operator">+</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="四、写在最后" tabindex="-1"><a class="header-anchor" href="#四、写在最后" aria-hidden="true">#</a> 四、写在最后</h2>
<p>本文是<code>二分查找-模版III</code> 的第最后一题，我会在之后将二分法的常见问题整理成完成的文档，我们一起加油～</p>
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
