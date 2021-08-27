<template><h1 id="_240-二维数组的查找-medium" tabindex="-1"><a class="header-anchor" href="#_240-二维数组的查找-medium" aria-hidden="true">#</a> 240.二维数组的查找（medium）</h1>
<p>在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。</p>
<p>请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。</p>
<p>示例:</p>
<p>现有矩阵 matrix 如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>给定 target = 5，返回 true。</p>
<p>给定 target = 20，返回 false。</p>
<h2 id="拍平二维数组-indexof" tabindex="-1"><a class="header-anchor" href="#拍平二维数组-indexof" aria-hidden="true">#</a> 拍平二维数组+indexOf</h2>
<p>完全没利用上递增的这段属性</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">findNumberIn2DArray</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">matrix<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> matrix<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'item:'</span><span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>item<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="线性查找" tabindex="-1"><a class="header-anchor" href="#线性查找" aria-hidden="true">#</a> 线性查找</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">findNumberIn2DArray</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">matrix<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 参数校验</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>matrix <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>matrix<span class="token punctuation">.</span>length <span class="token operator">||</span> <span class="token operator">!</span>matrix<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> columns <span class="token operator">=</span> matrix<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">,</span>
        rows <span class="token operator">=</span> matrix<span class="token punctuation">.</span>length
    <span class="token comment">// 获取行数、列数</span>
    <span class="token comment">// 起始行数0，列数为columns-1，表示右上角的元素</span>
    <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
        column <span class="token operator">=</span> columns <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">//边界：行&lt;行数,列>0</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>row <span class="token operator">&lt;</span> rows <span class="token operator">&amp;&amp;</span> column <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> point <span class="token operator">=</span> matrix<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>column<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// 右上角</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>point <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>point <span class="token operator">></span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            column<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            row<span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div></template>
