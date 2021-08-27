<template><h1 id="_3-x的平方根-easy" tabindex="-1"><a class="header-anchor" href="#_3-x的平方根-easy" aria-hidden="true">#</a> 3.x的平方根（easy）</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p><a href="https://leetcode-cn.com/problems/sqrtx/" target="_blank" rel="noopener noreferrer">LeetCode：69.x 的平方根<OutboundLink/></a></p>
<p>计算并返回  <code>x</code>  的平方根，其中  <code>x</code> 是非负整数。</p>
<p>由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入: 8
输出: 2
说明: 8 的平方根是 2.82842...,
     由于返回类型是整数，小数部分将被舍去。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="二、二分法解题" tabindex="-1"><a class="header-anchor" href="#二、二分法解题" aria-hidden="true">#</a> 二、二分法解题</h2>
<p>二分查找是一种基于比较目标值和数组中间元素的教科书式算法。</p>
<ul>
<li>如果目标值等于中间元素，则找到目标值。</li>
<li>如果目标值较小，继续在左侧搜索。</li>
<li>如果目标值较大，则继续在右侧搜索。</li>
</ul>
<p>时间复杂度：<code>O(logN)</code>。
空间复杂度：<code>O(1)</code>。</p>
<p><strong>分析模版</strong></p>
<ul>
<li>我们的目标是找到平方最接近目标数字的值</li>
<li>相对于基础模版，我们要知道的数字是逼近目标值的，即 <code>mid * mid &lt;= target</code>，大家是否感觉这道题和上一题几乎一模一样～</li>
</ul>
<p><strong>Javasciprt 代码</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">mySqrt</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 确定条件，k方 &lt;= x</span>
  <span class="token keyword">let</span> min <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 左边界</span>
  <span class="token keyword">let</span> max <span class="token operator">=</span> x<span class="token punctuation">;</span> <span class="token comment">// 右边界</span>
  <span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 存储结果值，因为它会逐渐逼近最终结果</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>min <span class="token operator">&lt;=</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> min <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mid <span class="token operator">*</span> mid <span class="token operator">&lt;=</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这里mid * mid = x 时，我仍然移动了左边界，并且跳过的mid，不要怕</span>
      <span class="token comment">// 它被保存在了temp中，知道返回它或被新的元素覆盖</span>
      temp <span class="token operator">=</span> mid<span class="token punctuation">;</span>
      min <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 忽略左测区间</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      max <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 忽略右侧区间</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> temp<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="三、写在最后" tabindex="-1"><a class="header-anchor" href="#三、写在最后" aria-hidden="true">#</a> 三、写在最后</h2>
<p>本文是二分查找-模版 I 的第三题，仅仅是修改与目标值之间的关系，我们一鼓作气拿下下一道题吧！</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励~</p>
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
