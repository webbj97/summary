<template><h1 id="_1-第一个错误的版本-easy" tabindex="-1"><a class="header-anchor" href="#_1-第一个错误的版本-easy" aria-hidden="true">#</a> 1.第一个错误的版本（easy）</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p><a href="https://leetcode-cn.com/problems/first-bad-version/" target="_blank" rel="noopener noreferrer">LeetCode：278.第一个错误的版本<OutboundLink/></a></p>
<p>你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。</p>
<p>假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。</p>
<p>你可以通过调用 <code>isBadVersion(version)</code> 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。</p>
<p><strong>示例:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>给定 n = 5，并且 version = 4 是第一个错误的版本。

调用 isBadVersion(3) -> false
调用 isBadVersion(5) -> true
调用 isBadVersion(4) -> true

所以，4 是第一个错误的版本。 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="二、二分法解题" tabindex="-1"><a class="header-anchor" href="#二、二分法解题" aria-hidden="true">#</a> 二、二分法解题</h2>
<p>二分查找是一种基于比较目标值和数组中间元素的教科书式算法。</p>
<ul>
<li>如果目标值等于中间元素，则找到目标值。</li>
<li>如果目标值较小，继续在左侧搜索。</li>
<li>如果目标值较大，则继续在右侧搜索。</li>
</ul>
<p>时间复杂度：<code>O(logN)</code>。
空间复杂度：<code>O(1)</code>。</p>
<h2 id="三、基础模版ii" tabindex="-1"><a class="header-anchor" href="#三、基础模版ii" aria-hidden="true">#</a> 三、基础模版II</h2>
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
<h2 id="四、题解" tabindex="-1"><a class="header-anchor" href="#四、题解" aria-hidden="true">#</a> 四、题解</h2>
<p><strong>分析模版</strong></p>
<ul>
<li>我们的目标是：寻找出错的版本
<ul>
<li>如果mid值出错，<code>证明出错的版本 &lt;= mid</code>，那么右侧就可以抛弃了</li>
<li>如果mid值没出错，<code>证明出错的版本 &gt; mid</code>，那么左侧就可以抛弃了</li>
</ul>
</li>
</ul>
<p>看基础模版II，<code>版本判断函数</code>在帮助我们判断<code>mid值右侧</code>是否有错误的值。</p>
<p><strong>Javasciprt 代码</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">function</span><span class="token punctuation">}</span></span> isBadVersion()
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">function</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">solution</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">isBadVersion</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>integer<span class="token punctuation">}</span></span> <span class="token parameter">n</span> Total versions
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>integer<span class="token punctuation">}</span></span> The first bad version
     */</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> min <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> max <span class="token operator">=</span> n<span class="token punctuation">;</span>
        <span class="token comment">// 因为mid = mid = max是结束的源头，所以不能相等</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>min <span class="token operator">&lt;</span> max<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">let</span> mid <span class="token operator">=</span> min <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isBadVersion</span><span class="token punctuation">(</span>mid<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 出错版本，可能是初始版本，所以保留</span>
                max <span class="token operator">=</span> mid<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                min <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> min<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>如果大家对 min &lt; max 存在疑问，可以看下面的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">solution</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">isBadVersion</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>integer<span class="token punctuation">}</span></span> <span class="token parameter">n</span> Total versions
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>integer<span class="token punctuation">}</span></span> The first bad version
     */</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> min <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> max <span class="token operator">=</span> n<span class="token punctuation">;</span>
        <span class="token keyword">let</span> ans<span class="token punctuation">;</span>
        <span class="token comment">// 因为mid = mid = max是结束的源头，所以不能相等</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>min <span class="token operator">&lt;=</span> max<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">let</span> mid <span class="token operator">=</span> min <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isBadVersion</span><span class="token punctuation">(</span>mid<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 出错版本，可能是初始版本，所以保存，同时跳过它</span>
                ans <span class="token operator">=</span> mid<span class="token punctuation">;</span>
                max <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 注意这里</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                min <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>两种解法一样，我们不需要过于纠结～</p>
<h2 id="五、写在最后" tabindex="-1"><a class="header-anchor" href="#五、写在最后" aria-hidden="true">#</a> 五、写在最后</h2>
<p>本文是二分查找-模版II 的第一题，后面的几道题的也算是本模版的微调版，加油～</p>
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
