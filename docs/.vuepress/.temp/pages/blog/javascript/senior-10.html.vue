<template><h1 id="javascript专题-十-柯里化浅谈" tabindex="-1"><a class="header-anchor" href="#javascript专题-十-柯里化浅谈" aria-hidden="true">#</a> JavaScript专题（十）柯里化浅谈</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>维基百科中对柯里化 (Currying) 的定义为：
在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。</p>
</div>
<p><strong>举个例子：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行 add 函数，一次传入两个参数即可</span>
<span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>

<span class="token comment">// 假设有一个 curry 函数可以做到柯里化</span>
<span class="token keyword">var</span> addCurry <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">addCurry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="一、它都做了什么" tabindex="-1"><a class="header-anchor" href="#一、它都做了什么" aria-hidden="true">#</a> 一、它都做了什么</h2>
<p>它将页面内的</p>
</template>
