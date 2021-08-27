<template><h1 id="javascript专题-九-数组中查找指定元素" tabindex="-1"><a class="header-anchor" href="#javascript专题-九-数组中查找指定元素" aria-hidden="true">#</a> JavaScript专题（九）数组中查找指定元素</h1>
<blockquote>
<p>上一片文章中，我们了解了数组扁平化的思想，并学习了 loadsh 是如何处理数组扁平化的，这次我们来讨论<strong>在数组中查找元素</strong>时所用的一些方法～</p>
</blockquote>
<nav class="table-of-contents"><ul><li><RouterLink to="#一、findindex-和-findlastindex">一、findIndex 和 findLastIndex</RouterLink></li><li><RouterLink to="#二、sortindex">二、sortIndex</RouterLink></li><li><RouterLink to="#三、indexof-和-lastindexof">三、indexOf 和 lastIndexOf</RouterLink></li><li><RouterLink to="#参考">参考</RouterLink></li><li><RouterLink to="#写在最后">写在最后</RouterLink></li></ul></nav>
<h2 id="一、findindex-和-findlastindex" tabindex="-1"><a class="header-anchor" href="#一、findindex-和-findlastindex" aria-hidden="true">#</a> 一、findIndex 和 findLastIndex</h2>
<h4 id="_1-1-findindex" tabindex="-1"><a class="header-anchor" href="#_1-1-findindex" aria-hidden="true">#</a> 1.1 findIndex</h4>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。</p>
</div>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">isLargeNumber</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token operator">=></span> element <span class="token operator">></span> <span class="token number">13</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span>isLargeNumber<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>实现</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">newFindIndex</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> _arr <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> _arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">callback</span><span class="token punctuation">(</span>_arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> _arr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">isLargeNumber</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token operator">=></span> element <span class="token operator">></span> <span class="token number">13</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">.</span><span class="token function">newFindIndex</span><span class="token punctuation">(</span>isLargeNumber<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="_1-2-findlastindex" tabindex="-1"><a class="header-anchor" href="#_1-2-findlastindex" aria-hidden="true">#</a> 1.2 findLastIndex</h4>
<p>同样当我们倒叙查找时，可以这样写</p>
<p><strong>实现</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">newFindlastIndex</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> _arr <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> _arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">callback</span><span class="token punctuation">(</span>_arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> _arr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">isLargeNumber</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token operator">=></span> element <span class="token operator">></span> <span class="token number">13</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">.</span><span class="token function">newFindlastIndex</span><span class="token punctuation">(</span>isLargeNumber<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 4</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="_1-3-合并-findindex-和-findlastindex" tabindex="-1"><a class="header-anchor" href="#_1-3-合并-findindex-和-findlastindex" aria-hidden="true">#</a> 1.3 合并 findIndex 和 findLastIndex</h4>
<p>大家可以看到，除了循环的条件不同，两个方法几乎一模一样，参考 lodash，我们将两个方法精简一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@private</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Array<span class="token punctuation">}</span></span> <span class="token parameter">array</span> The array to inspect.
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">predicate</span> The function invoked per iteration.
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span> <span class="token optional-parameter"><span class="token punctuation">[</span><span class="token parameter">fromRight</span><span class="token punctuation">]</span></span> 从右向左查找
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> 返回第一个符合条件元素的下标或-1
 */</span>
<span class="token keyword">function</span> <span class="token function">baseFindIndex</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> predicate<span class="token punctuation">,</span> fromRight</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> length <span class="token punctuation">}</span> <span class="token operator">=</span> array<span class="token punctuation">;</span>
  <span class="token keyword">let</span> index <span class="token operator">=</span> fromRight <span class="token operator">?</span> length <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 确定下标的边界</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>fromRight <span class="token operator">?</span> index<span class="token operator">--</span> <span class="token operator">:</span> <span class="token operator">++</span>index <span class="token operator">&lt;</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// index-- 用于倒序边界</span>
    <span class="token comment">// ++index 用于正序的边界</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">predicate</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> array<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> index<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>再来看看它的兄弟——<code>underscore</code> 的思路就是利用传参的不同，返回不同的函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createIndexFinder</span><span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> predicate<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> length <span class="token punctuation">}</span> <span class="token operator">=</span> array<span class="token punctuation">;</span>
    <span class="token keyword">var</span> index <span class="token operator">=</span> dir <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> index <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> index <span class="token operator">+=</span> dir<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">predicate</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> array<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> array<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> index<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> findIndex <span class="token operator">=</span> <span class="token function">createIndexFinder</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> findLastIndex <span class="token operator">=</span> <span class="token function">createIndexFinder</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>关于 findIndex 我们就告一段落了～，再来看看新的场景和实现吧！</p>
<h2 id="二、sortindex" tabindex="-1"><a class="header-anchor" href="#二、sortindex" aria-hidden="true">#</a> 二、sortIndex</h2>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>在一个排好序的数组中找到 <code>value</code> 对应的位置，即保证插入数组后，依然保持有序的状态。</p>
</div>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">sortedIndex</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token comment">// 不需要插入arr</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>那么这个又该如何实现呢？</p>
<h4 id="_2-1-遍历" tabindex="-1"><a class="header-anchor" href="#_2-1-遍历" aria-hidden="true">#</a> 2.1 遍历</h4>
<p>遍历大家都能想到，虽然它不一定最优解：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sortIndex</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_2-2-二分法" tabindex="-1"><a class="header-anchor" href="#_2-2-二分法" aria-hidden="true">#</a> 2.2 二分法</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sortIndex</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> low <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    high <span class="token operator">=</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>low <span class="token operator">&lt;</span> high<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>low <span class="token operator">+</span> high<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      low <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      high <span class="token operator">=</span> mid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> high<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="三、indexof-和-lastindexof" tabindex="-1"><a class="header-anchor" href="#三、indexof-和-lastindexof" aria-hidden="true">#</a> 三、indexOf 和 lastIndexOf</h2>
<ul>
<li><code>indexOf()</code>：返回在数组中可以找到一个给定元素的<strong>第一个</strong>索引，如果不存在则返回-1。从数组的前面向后查找，从 fromIndex 处开始。</li>
<li><code>lastIndexOf()</code> ：返回指定元素在数组中的<strong>最后一个</strong>的索引，如果不存在则返回-1。从数组的后面向前查找，从 fromIndex 处开始。</li>
</ul>
<h4 id="_3-1-indexof-的第一版实现" tabindex="-1"><a class="header-anchor" href="#_3-1-indexof-的第一版实现" aria-hidden="true">#</a> 3.1 indexOf 的第一版实现</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>emmmm...在看过 findIndex 和 lastFindIndex 的实现后，indexOf 也要整整齐齐的啊～</p>
<h4 id="_3-2-indexof-和-lastindexof-通用第一版" tabindex="-1"><a class="header-anchor" href="#_3-2-indexof-和-lastindexof-通用第一版" aria-hidden="true">#</a> 3.2 indexOf 和 lastIndexOf 通用第一版</h4>
<p>通过参数来创建不同的查找方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createIndexOf</span><span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> dir <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> index <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index <span class="token operator">+=</span> dir<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> i<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_3-3-indexof-和-lastindexof-通用第二版" tabindex="-1"><a class="header-anchor" href="#_3-3-indexof-和-lastindexof-通用第二版" aria-hidden="true">#</a> 3.3 indexOf 和 lastIndexOf 通用第二版</h4>
<p>这一次，我们允许指定查找位置，我们来看看 fromIndex 的作用：</p>
<blockquote>
<p>设定开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。
如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即 -1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找 ，以此类推。
注意：如果参数中提供的索引值是一个负值，仍然从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0。</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createIndexOf</span><span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> value<span class="token punctuation">,</span> fromIndex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 设定开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。</span>
    <span class="token keyword">let</span> length <span class="token operator">=</span> array <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fromIndex <span class="token operator">>=</span> length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> fromIndex <span class="token operator">===</span> <span class="token string">"number"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dir <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 正序</span>
        <span class="token comment">// 起始点>=0，沿用起始点，否则起始点为从后向前数fromIndex</span>
        i <span class="token operator">=</span> fromIndex <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">?</span> fromIndex <span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>length <span class="token operator">+</span> fromIndex<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 倒序</span>
        <span class="token comment">// 起始点>=0，沿用起始点，否则起始点为从后向前数fromIndex</span>
        length <span class="token operator">=</span>
          fromIndex <span class="token operator">>=</span> <span class="token number">0</span>
            <span class="token operator">?</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>fromIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span>
            <span class="token operator">:</span> fromIndex <span class="token operator">+</span> length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 起始下标</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>
      fromIndex <span class="token operator">=</span> dir <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> i <span class="token operator">:</span> length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
      fromIndex <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> fromIndex <span class="token operator">&lt;</span> length<span class="token punctuation">;</span>
      fromIndex <span class="token operator">+=</span> dir
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>fromIndex<span class="token punctuation">]</span> <span class="token operator">===</span> item<span class="token punctuation">)</span> <span class="token keyword">return</span> fromIndex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>写到这里我们在数组中查找元素就结束了，注意，自己实现的和<code>loadsh</code>或<code>underscore</code>还是有很大区别的。</p>
<p>如果大家对上面三节代码有更好的实现，请一定写在留言区哦～</p>
<p align=center>
<img src="https://img-blog.csdnimg.cn/20201112161712838.jpg" width="60%" />
</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/37" target="_blank" rel="noopener noreferrer">学 underscore 在数组中查找指定元素<OutboundLink/></a></li>
<li><a href="https://www.lodashjs.com/" target="_blank" rel="noopener noreferrer">lodash<OutboundLink/></a></li>
</ul>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>JavaScript 系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/103161970" target="_blank" rel="noopener noreferrer">《JavaScript 内功进阶系列》（已完结）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_10204368.html" target="_blank" rel="noopener noreferrer">《JavaScript 专项系列》（持续更新）<OutboundLink/></a></li>
</ol>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光（沉迷 JS，虚心学习中）</li>
<li>WX：j565017805</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Js 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">我的 CSDN 博客<OutboundLink/></a></li>
<li><a href="https://github.com/webbj97/" target="_blank" rel="noopener noreferrer">我的 GitHub<OutboundLink/></a></li>
</ul>
<p>这是<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">文章所在 GitHub 仓库的传送门<OutboundLink/></a>，如果真的对您有所帮助，希望可以点个 star，这是对我最大的鼓励 ～</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
