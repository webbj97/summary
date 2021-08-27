<template><h1 id="统计有序矩阵中的负数" tabindex="-1"><a class="header-anchor" href="#统计有序矩阵中的负数" aria-hidden="true">#</a> 统计有序矩阵中的负数</h1>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p>给你一个  m * n  的矩阵  grid，矩阵中的元素无论是按行还是按列，都以非递增顺序排列。</p>
<p>请你统计并返回  grid  中 负数 的数目。</p>
<p><strong>示例：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入：grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
输出：8
解释：矩阵中共有 8 个负数。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="二、题解" tabindex="-1"><a class="header-anchor" href="#二、题解" aria-hidden="true">#</a> 二、题解</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">grid</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">countNegatives</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">grid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 本题提前声明，不存在空数组情况</span>
  <span class="token keyword">let</span> rows <span class="token operator">=</span> grid<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token comment">// 行</span>
  <span class="token keyword">let</span> cols <span class="token operator">=</span> grid<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token comment">// 列</span>
  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> col <span class="token operator">=</span> cols <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>row <span class="token operator">&lt;</span> rows <span class="token operator">&amp;&amp;</span> col <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一次排除一列或一行</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>grid<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      row<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">// 这一行判断完毕</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      res <span class="token operator">+=</span> grid<span class="token punctuation">.</span>length <span class="token operator">-</span> row<span class="token punctuation">;</span> <span class="token comment">// 注意这是记录的是竖列负数的个数</span>
      col<span class="token operator">--</span><span class="token punctuation">;</span> <span class="token comment">// 这一列判断完毕</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="三、写在最后" tabindex="-1"><a class="header-anchor" href="#三、写在最后" aria-hidden="true">#</a> 三、写在最后</h2>
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
