<template><!--
 * @Author: your name
 * @Date: 2021-08-27 16:20:44
 * @LastEditTime: 2021-08-27 16:20:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /summary/docs/blog/vue/3.md
-->
<h1 id="【typescript入门】之函数类型在-typescript-中的应用" tabindex="-1"><a class="header-anchor" href="#【typescript入门】之函数类型在-typescript-中的应用" aria-hidden="true">#</a> 【Typescript入门】之函数类型在 TypeScript 中的应用</h1>
<blockquote>
<p>函数是 JavaScript 中的一等公民</p>
</blockquote>
<blockquote>
<p>系列文章，收藏不走丢哦</p>
</blockquote>
<h2 id="一、函数声明" tabindex="-1"><a class="header-anchor" href="#一、函数声明" aria-hidden="true">#</a> 一、函数声明</h2>
<p>在 JavaScript 中，有两种常见的定义函数的方式——函数声明和函数表达式：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 函数声明（Function Declaration）</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 函数表达式（Function Expression）</span>
<span class="token keyword">const</span> <span class="token function-variable function">mySum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_1-1-函数声明" tabindex="-1"><a class="header-anchor" href="#_1-1-函数声明" aria-hidden="true">#</a> 1.1 函数声明</h3>
<p>一个函数有输入和输出，要在 TypeScript 中对其进行约束，两者都要考虑到，其中函数声明的类型定义较简单：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>输入多余的（或者少于要求的）参数，是不被允许的：</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 应有 2 个参数，但获得 1 个。ts(2554)</span>
<span class="token comment">// index.ts(1, 25): 未提供 "y" 的自变量。</span>

<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 应有 2 个参数，但获得 3 个</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_1-2-函数表达式" tabindex="-1"><a class="header-anchor" href="#_1-2-函数表达式" aria-hidden="true">#</a> 1.2 函数表达式</h3>
<p>如果要我们现在写一个对函数表达式定义它的输入输出，应该是怎么样的呢？</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token function-variable function">mySum1</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这段代码不会报错，也是正确的，而还有一种函数表达式的定义是这样的:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token function-variable function">mySum2</span><span class="token operator">:</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function-variable function">number</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
  y<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>注意：此箭头，并不是 ES6 中我们熟知的箭头函数哦～</p>
<p>两者的区别是 mySum1 的类型是推导出来的，而 mySum2 是直接定义的，但两者其实一样，不需要深究。</p>
<h3 id="_1-3-用接口定义函数的形状" tabindex="-1"><a class="header-anchor" href="#_1-3-用接口定义函数的形状" aria-hidden="true">#</a> 1.3 用接口定义函数的形状</h3>
<p>我们也可以使用接口的方式来定义一个函数需要符合的形状：之前我们都是用接口来定义对象和数组，自然函数也可以定义“形状”</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">expFunc</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> mySum1<span class="token operator">:</span> expFunc<span class="token punctuation">;</span>
<span class="token keyword">let</span> mySum2<span class="token operator">:</span> expFunc<span class="token punctuation">;</span>
<span class="token function-variable function">mySum1</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function-variable function">mySum2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>这样可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。</p>
<h3 id="_1-4-可选参数" tabindex="-1"><a class="header-anchor" href="#_1-4-可选参数" aria-hidden="true">#</a> 1.4 可选参数</h3>
<p>前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？</p>
<p>与接口中的可选属性类似，我们用<code>?</code>表示可选的参数：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span>name1<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> name2<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">hello! </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name2 <span class="token operator">?</span> <span class="token string">"and"</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> name2 <span class="token operator">:</span> <span class="token string">""</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">"余光1"</span><span class="token punctuation">,</span> <span class="token string">"余光2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hello! 余光1 and 余光2</span>
<span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">"余光"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hello! 余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面<strong>不允许</strong>再出现必需参数了：</p>
<h3 id="_1-5-参数默认值" tabindex="-1"><a class="header-anchor" href="#_1-5-参数默认值" aria-hidden="true">#</a> 1.5 参数默认值</h3>
<p>在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span>name1<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"余光"</span><span class="token punctuation">,</span> name2<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"yuguang"</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">hello! </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name2 <span class="token operator">?</span> <span class="token string">"and"</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> name2 <span class="token operator">:</span> <span class="token string">""</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hello! 余光 and yuguang</span>
<span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">"小明"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hello! 小明 and yuguang</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>是不是又拉回到了我们熟悉的领域？</p>
<h3 id="_1-6-剩余参数" tabindex="-1"><a class="header-anchor" href="#_1-6-剩余参数" aria-hidden="true">#</a> 1.6 剩余参数</h3>
<p>ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token operator">...</span>arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">func</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1, [2, 3, 4]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>**注意：**rest参数只能是最后一个参数</p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>本篇文章是《Typescript基础入门》第三篇，到这里就结束了，主要带大家了解一下函数Ts中的表现，其实到这里有关一门语言中基础部分——类型相关的知识已经聊得差不多了（未来我们会讲到更多的进阶类型知识，例如泛型、别名、约束等），下一篇文章我们来聊一聊Ts中特殊的，或者说会让我们“陌生”的概念，希望大家通过这三篇文章能打消对Ts的抵触和迷茫，一起加油～</p>
<p>系列文章传送门：</p>
<ol>
<li><a href="https://yuguang.blog.csdn.net/article/details/119137707" target="_blank" rel="noopener noreferrer">【Typescript入门手册】之基本类型在TypeScript中的应用<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/article/details/119220029" target="_blank" rel="noopener noreferrer">【Typescript入门手册】之引用类型在TypeScript中的应用<OutboundLink/></a></li>
<li>本篇</li>
</ol>
<h3 id="关于我" tabindex="-1"><a class="header-anchor" href="#关于我" aria-hidden="true">#</a> 关于我</h3>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>邮箱：webbj97@163.com</li>
</ul>
<h3 id="其他沉淀" tabindex="-1"><a class="header-anchor" href="#其他沉淀" aria-hidden="true">#</a> 其他沉淀</h3>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Github: Js版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN博客汇总<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p></template>
