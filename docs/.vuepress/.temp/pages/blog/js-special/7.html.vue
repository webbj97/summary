<template><h1 id="javascript专题-七-让人头疼的类型转换" tabindex="-1"><a class="header-anchor" href="#javascript专题-七-让人头疼的类型转换" aria-hidden="true">#</a> JavaScript专题（七）让人头疼的类型转换</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>在了解类型转换之前，如果你对 Js 的基本类型仍存在疑惑，不妨看看这篇文章哦～<a href="https://blog.csdn.net/jbj6568839z/article/details/107151991" target="_blank" rel="noopener noreferrer">JavaScript 中的基本数据类型<OutboundLink/></a></p>
<p>强制类型转换常常为人诟病，但实际上很多时候它们是非常有用的，有些强制类型转换可以明确告诉我们哪里发生了类型转换，有助于提高代码可读性和可维护性。但有些却发生在我们看不见的地方，所以我们今天来讨论一下平时常见的类型转换运算和操作～</p>
<h2 id="一、类型转换是什么" tabindex="-1"><a class="header-anchor" href="#一、类型转换是什么" aria-hidden="true">#</a> 一、类型转换是什么？</h2>
<p>我们都知道变量的类型由它存储的值的类型来决定，所以将值从一种类型转换为另一种类型通常称为类型转换（type-casting），而它也可以根据某些特点分成两类——显示类型转换和强制类型转换。</p>
<p><strong>显示类型转换</strong></p>
<p>显式类型转换主要是指通过 String、Number、Boolean 等构造方法转换相应的字符串、数字、布尔值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">"123.3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//number:123.3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这是显式的情况——类型的转换的动作是由我们主动发起的。</p>
<h4 id="_1-2-隐式类型转换" tabindex="-1"><a class="header-anchor" href="#_1-2-隐式类型转换" aria-hidden="true">#</a> 1.2 隐式类型转换</h4>
<p><strong>有意思的事</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> newStr1 <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token string">"str"</span><span class="token punctuation">;</span> <span class="token comment">// '1str'</span>
<span class="token keyword">const</span> newStr2 <span class="token operator">=</span> <span class="token string">"hello"</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token number">89</span><span class="token punctuation">,</span> <span class="token number">150.156</span><span class="token punctuation">,</span> <span class="token string">"mike"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 'hello89,150.156,mike'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如果是做 C++、Java 以及其他强类型语言的同学写到类似的组合，应该就会报错了，但在 Js 中不会。</p>
<p>既然隐式类型转换会一直存在下去，我们就要接受它并去了解它的优缺点！</p>
<h2 id="二、转换的基本规则" tabindex="-1"><a class="header-anchor" href="#二、转换的基本规则" aria-hidden="true">#</a> 二、转换的基本规则</h2>
<p>有些数据类型之间的转换，会经历“多道工序”，我们尽量先介绍“工序”少的～</p>
<h4 id="_2-1-原始值转字符串" tabindex="-1"><a class="header-anchor" href="#_2-1-原始值转字符串" aria-hidden="true">#</a> 2.1 原始值转字符串</h4>
<p>我们使用 String 函数将类型转换成字符串类型，如果 <code>String</code> 函数不传参数，返回空字符串，如果有参数，调用 <code>ToString(value)</code>，而 <code>ToString</code> 也给了一个对应的结果表。表如下：</p>
<p><strong>规则：</strong></p>
<table>
<thead>
<tr>
<th>参数类型</th>
<th>返回</th>
</tr>
</thead>
<tbody>
<tr>
<td>Undefined</td>
<td>&quot;undefined&quot;</td>
</tr>
<tr>
<td>Null</td>
<td>&quot;null&quot;</td>
</tr>
<tr>
<td>Boolean</td>
<td>如果参数是 true，返回 &quot;true&quot;。参数为 false，返回 &quot;false&quot;</td>
</tr>
<tr>
<td>Number</td>
<td>结果有很多种，例如 NaN 和 Infinity</td>
</tr>
<tr>
<td>String</td>
<td>返回与之相等的值</td>
</tr>
</tbody>
</table>
<p><strong>举例：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 空字符串</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token comment">// Number</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">Infinity</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Infinity</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">Infinity</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -Infinity</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="_2-2-原始值转数字" tabindex="-1"><a class="header-anchor" href="#_2-2-原始值转数字" aria-hidden="true">#</a> 2.2 原始值转数字</h4>
<p>有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作<code>ToNumber</code>，类似 ToString，它也有一定的转换规则：</p>
<table>
<thead>
<tr>
<th>参数类型</th>
<th>返回</th>
</tr>
</thead>
<tbody>
<tr>
<td>true</td>
<td>1</td>
</tr>
<tr>
<td>false</td>
<td>0</td>
</tr>
<tr>
<td>undefined</td>
<td>NaN</td>
</tr>
<tr>
<td>null</td>
<td>0</td>
</tr>
<tr>
<td>String</td>
<td>返回与之相等的值，但如果处理失败则返回 NaN</td>
</tr>
</tbody>
</table>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">"余光"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="_2-3-原始值转布尔" tabindex="-1"><a class="header-anchor" href="#_2-3-原始值转布尔" aria-hidden="true">#</a> 2.3 原始值转布尔</h4>
<p>我们使用 <code>Boolean 函数</code>将类型转换成布尔类型，在 JavaScript 中，只有 <strong>6 种</strong> 值可以被转换成<code>false</code>，其他都会被转换成<code>true</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_2-4-原始值转对象" tabindex="-1"><a class="header-anchor" href="#_2-4-原始值转对象" aria-hidden="true">#</a> 2.4 原始值转对象</h4>
<p>原始值到对象的转换非常简单，原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的<strong>包装对象</strong>。</p>
<p><code>null</code> 和 <code>undefined</code> 属于例外，当将它们用在期望是一个对象的地方都会造成一个类型错误 (TypeError) 异常，而不会执行正常的转换。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="三、对象转字符串和数字" tabindex="-1"><a class="header-anchor" href="#三、对象转字符串和数字" aria-hidden="true">#</a> 三、对象转字符串和数字</h2>
<h4 id="_3-0-对象转布尔值" tabindex="-1"><a class="header-anchor" href="#_3-0-对象转布尔值" aria-hidden="true">#</a> 3.0 对象转布尔值</h4>
<p>3.0 这一小节是我认为值得一提，但篇幅较少的一点：</p>
<p>对象到布尔值的转换非常简单：所有对象(包括数组和函数)都转换为 <code>true</code>。对于包装对象也是这样，举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="_3-1-对象的-tostring-和-valueof" tabindex="-1"><a class="header-anchor" href="#_3-1-对象的-tostring-和-valueof" aria-hidden="true">#</a> 3.1 对象的 toString 和 valueOf</h4>
<p>这是一个不太常见的操作，或者说现象，但我们也不能忽略它。</p>
<ol>
<li>对象=&gt;字符串</li>
<li>对象=&gt;数字</li>
</ol>
<p>转换都是通过调用<strong>待转换对象</strong>的一个方法来完成的，在 Js 中，一般待转换对象拥有两个方法：</p>
<ol>
<li>toString</li>
<li>valueOf</li>
</ol>
<p><strong>toString</strong></p>
<p>所有的对象除了<code>null</code>和<code>undefined</code>之外的任何值都具有<code>toString</code>方法，通常情况下，它和使用<code>String</code>方法返回的结果一致。</p>
<p>在<a href="https://blog.csdn.net/jbj6568839z/article/details/108130316" target="_blank" rel="noopener noreferrer">JavaSciprt 专题之类型检测<OutboundLink/></a>中我们提到过<code>Object.prototype.toString</code> 方法会根据这个对象的[[class]]内部属性，返回由 &quot;[object &quot; 和 class 和 &quot;]&quot; 三个部分组成的字符串。举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"余光"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object Object]"</span>

obj<span class="token punctuation">.</span>toString <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我们已经验证了 =&gt; 对象调用 toString 方法是调用其构造函数原型上的方法</p>
<p>其他数据类型的 toString 方法也都有自己的特点：</p>
<ul>
<li>数组：将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。</li>
<li>函数：返回源代码字符串。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "1,2,3,4"</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ""</span>

<span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
func<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "function func () { console.log() }"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>valueOf</strong></p>
<p>valueOf 方法返回这个对象本身，数组、函数、正则简单的继承了这个默认方法，也会返回对象本身。日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2017</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>date<span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1495296000000</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="_3-2-对象转字符串和数字的基本规则" tabindex="-1"><a class="header-anchor" href="#_3-2-对象转字符串和数字的基本规则" aria-hidden="true">#</a> 3.2 对象转字符串和数字的基本规则</h4>
<p>在我们知道了 toString()和 valueOf()这两个方法后，来看看转换的规则，即什么时候用：<a href="http://es5.github.io/#x9.8" target="_blank" rel="noopener noreferrer">ES5 规范 9.8<OutboundLink/></a></p>
<table>
<thead>
<tr>
<th>参数类型</th>
<th>结果</th>
</tr>
</thead>
<tbody>
<tr>
<td>Object</td>
<td>1. primValue = ToPrimitive(input, String) <br> 2. 返回 ToString(primValue)</td>
</tr>
</tbody>
</table>
<p>所谓的 ToPrimitive 方法，其实就是输入一个值，然后返回一个一定是基本类型的值。</p>
<p>我们总结一下，当我们用 String 方法转化一个值的时候：</p>
<ol>
<li>基本类型：参照 “原始值转字符” 的对应表</li>
<li>引用类型：调用一个<code>ToPrimitive</code>方法，将其转为基本类型，然后再参照 “原始值转字符” 的对应表进行转换。</li>
</ol>
<p>其实，从对象到数字的转换也是一样：</p>
<table>
<thead>
<tr>
<th>参数类型</th>
<th>结果</th>
</tr>
</thead>
<tbody>
<tr>
<td>Object</td>
<td>1. primValue = ToPrimitive(input, Number) <br> 2. 返回 ToNumber(primValue)</td>
</tr>
</tbody>
</table>
<p>注意：转字符和数字的时候处理略有不同～</p>
<h4 id="_3-3-toprimitive" tabindex="-1"><a class="header-anchor" href="#_3-3-toprimitive" aria-hidden="true">#</a> 3.3 ToPrimitive</h4>
<p>那接下来就要看看 ToPrimitive 了，<a href="http://es5.github.io/#x9.1" target="_blank" rel="noopener noreferrer">ES5 规范 9.1<OutboundLink/></a></p>
<p>这个返回原始值的方法接受一个输入参数 和一个可选的参数来表示转换类型：</p>
<ol>
<li>input，表示要处理的输入值
<ul>
<li>如果传入的 input 是 Undefined、Null、Boolean、Number、String 类型，直接返回该值。</li>
</ul>
</li>
<li>PreferredType，非必填，表示希望转换成的类型，有两个值可以选，Number 或者 String。
<ul>
<li>当不传入 PreferredType 时，如果 input 是日期类型，相当于传入 String，否则，都相当于传入 Number。</li>
</ul>
</li>
</ol>
<p><strong>如果是 ToPrimitive(obj, Number)，处理步骤如下：</strong></p>
<ul>
<li>如果 obj 为 基本类型，直接返回</li>
<li>否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。</li>
<li>否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。</li>
<li>否则，JavaScript 抛出一个类型错误异常。</li>
</ul>
<p><strong>如果是 ToPrimitive(obj, String)，处理步骤如下：</strong></p>
<ul>
<li>如果 obj 为 基本类型，直接返回</li>
<li>否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。</li>
<li>否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。</li>
<li>否则，JavaScript 抛出一个类型错误异常。</li>
</ul>
<p>所以总结下，对象转字符串(就是 Number() 函数)可以概括为：</p>
<p><strong>举个例子：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
  <span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2010</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1262275200000</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>注意：</strong></p>
<ul>
<li>
<p>转换对象时，你会发现它变成了 NaN，所以</p>
</li>
<li>
<p>在这个例子中，<code>[]</code>和<code>[0]</code>都返回了 0</p>
<ul>
<li>当我们 Number([]) 的时候，先调用 [] 的 valueOf 方法，此时返回 []；</li>
<li>因为返回了一个对象，所以又调用了 toString 方法；</li>
<li>此时返回一个空字符串，接下来调用 ToNumber 这个规范上的方法；</li>
<li>等价于 <code>Number([].valueOf().toString())</code>，结果为 0；</li>
</ul>
</li>
<li>
<p><code>[1, 2, 3]</code> 却返回了一个 NaN：</p>
<ul>
<li>当我们 Number([]) 的时候，先调用 <code>[1,2,3]</code> 的 <code>valueOf</code> 方法，此时返回 [1,2,3]；</li>
<li>因为返回了一个对象，所以又调用了 toString 方法；</li>
<li>此时&quot;1,2,3&quot;，接下来调用 ToNumber 这个规范上的方法；</li>
<li>等价于 <code>Number([1,2,3].valueOf().toString())</code>，结果为 NaN；</li>
</ul>
</li>
</ul>
<h2 id="四、涉及到类型转换的运算符" tabindex="-1"><a class="header-anchor" href="#四、涉及到类型转换的运算符" aria-hidden="true">#</a> 四、涉及到类型转换的运算符</h2>
<p>读到这里我们对类型转换有了一定的概念，现在我们再来看看在运算中常见的类型转换问题。</p>
<h4 id="_4-1-一元操作符" tabindex="-1"><a class="header-anchor" href="#_4-1-一元操作符" aria-hidden="true">#</a> 4.1 一元操作符 +</h4>
<p><code>+a</code> 运算符显式地将后面的变量 a 保存的数据转换为数字，不是字符串拼接。
查看 ES5 规范 <a href="http://es5.github.io/#x11.4.6" target="_blank" rel="noopener noreferrer">11.4.6<OutboundLink/></a>，会调用 ToNumber 处理该值，相当于 Number('1')，最终结果返回数字 1。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token string">"1.1"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token operator">+</span>a<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6.6</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>上面的代码应该是我们经常用到的，当我们知道一个字段是字符串但希望它是数字时，一般会这么做～</p>
<p>我们一起验证下下面这些类型</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>既然是调用 ToNumber 方法我们在之前的小节中提到过</p>
<ul>
<li>如果 obj 为基本类型，直接返回</li>
<li>否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。</li>
<li>否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。</li>
<li>否则，JavaScript 抛出一个类型错误异常。</li>
<li>以 +[] 为例，[] 调用 valueOf 方法，返回一个空数组，因为不是原始值，调用 toString 方法，返回 &quot;&quot;。</li>
<li>得到返回值后，然后再调用 ToNumber 方法，&quot;&quot; 对应的返回值是 0，所以最终返回 0。</li>
</ul>
<h4 id="_4-2-一元操作符" tabindex="-1"><a class="header-anchor" href="#_4-2-一元操作符" aria-hidden="true">#</a> 4.2 一元操作符 ！</h4>
<p>一元运算符<code>!</code>显式地将值强制类型转换为布尔值。但是它同时还<strong>将真值反转为假值</strong>（或者将假值反转为真值）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token string">"str"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//false</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>同样的 <code>!!</code> 会讲其他类型转成对应的 bool 值</p>
<p>！和 + 运算符是我们最常用的两种显式类型转换运算符，之后我们再看看那些不经意间就被转换类型的操作～</p>
<h2 id="五、常见的类型转换操作" tabindex="-1"><a class="header-anchor" href="#五、常见的类型转换操作" aria-hidden="true">#</a> 五、常见的类型转换操作</h2>
<h4 id="_5-1-字符串和数字之间" tabindex="-1"><a class="header-anchor" href="#_5-1-字符串和数字之间" aria-hidden="true">#</a> 5.1 字符串和数字之间</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">"200"</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num <span class="token operator">+</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '1200'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这段代码大家应该都知道结果，但是其中的原理是否和大家想的一样呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr1 <span class="token operator">+</span> arr2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1,23,4</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>两个数组的结果为什么也是个字符串？</p>
<p><strong>原因</strong></p>
<p><a href="http://es5.github.io/#x11.6.1" target="_blank" rel="noopener noreferrer">ES5 规范 11.6.1 中<OutboundLink/></a>提到，如果某个操作数是字符串或者能通过以下步骤转换为字符串，+将进行拼接操作</p>
<p>如果其中的一个操作数是<strong>引用类型</strong>，则首先对其进行<code>ToPrimitive</code>操作（第三小节有提）</p>
<p><strong>总结</strong></p>
<p>简单来说就是，如果<code>+</code>的其中一个操作数是字符串（或者通过以上步骤可以得到字符串），则执行字符串拼接；否则执行数字加法。</p>
<h4 id="_5-2-被转换成布尔值的操作" tabindex="-1"><a class="header-anchor" href="#_5-2-被转换成布尔值的操作" aria-hidden="true">#</a> 5.2 被转换成布尔值的操作</h4>
<p>现在我们来看看到布尔值的隐式强制类型转换，它最为常见也最容易搞错。相对布尔值，数字和字符串操作中的隐式强制类型转换还算比较明显。</p>
<p>下面的情况会发生布尔值隐式强制类型转换。</p>
<ul>
<li>if (..)语句
<ul>
<li>括号内的条件为<code>true</code>时执行操作；</li>
</ul>
</li>
<li>for ( let i = 0; i &lt; 10; i++ )
<ul>
<li>语句中的条件判断表达式即 i &lt; 10 为<code>true</code></li>
</ul>
</li>
<li>while (..)和 do..while(..)
<ul>
<li>循环中的条件判断表达式为<code>true</code>;</li>
</ul>
</li>
<li>三目运算 <code>? ：</code>；</li>
<li>逻辑运算符 ||（逻辑或）和 &amp;&amp;（逻辑与）左边的操作数；</li>
</ul>
<h4 id="_5-3-和" tabindex="-1"><a class="header-anchor" href="#_5-3-和" aria-hidden="true">#</a> 5.3 == 和 ===</h4>
<p>谈到类型转换，一定绕不开 <code>==</code> 和 <code>===</code>。</p>
<p><code>==</code>用于比较两个值是否相等，当要比较的两个值类型不一样的时候，就会发生类型的转换。</p>
<p>在<a href="http://es5.github.io/#x11.9.5" target="_blank" rel="noopener noreferrer">ES5 规范 11.9.5 中<OutboundLink/></a></p>
<p>当执行 x == y 时：</p>
<ul>
<li>如果 x 与 y 是同一类型：
<ul>
<li>x 是 Undefined，返回 true</li>
<li>x 是 Null，返回 true</li>
<li>x 是数字：
<ul>
<li>x 是 NaN，返回 false</li>
<li>y 是 NaN，返回 false</li>
<li>x 与 y 相等，返回 true</li>
<li>x 是+0，y 是-0，返回 true</li>
<li>x 是-0，y 是+0，返回 true</li>
</ul>
</li>
<li>x 是字符串，完全相等返回 true,否则返回 false</li>
<li>x 是布尔值，x 和 y 都是 true 或者 false，返回 true，否则返回 false</li>
<li>x 和 y 指向同一个对象，返回 true，否则返回 false</li>
</ul>
</li>
<li>x 是 null 并且 y 是 undefined，返回 true</li>
<li>x 是 undefined 并且 y 是 null，返回 true</li>
<li>x 是数字，y 是字符串，判断 x == ToNumber(y)</li>
<li>x 是字符串，y 是数字，判断 ToNumber(x) == y</li>
<li>x 是布尔值，判断 ToNumber(x) == y</li>
<li>y 是布尔值，判断 x ==ToNumber(y)</li>
<li>x 不是字符串或者数字，y 是对象，判断 x == ToPrimitive(y)</li>
<li>x 是对象，y 不是字符串或者数字，判断 ToPrimitive(x) == y</li>
</ul>
<h4 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h4>
<ul>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/164" target="_blank" rel="noopener noreferrer">JavaScript 深入之头疼的类型转换(下)<OutboundLink/></a></li>
<li>《你不知道的 Js》</li>
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
<p>如果您看到了最后，对文章有任何建议，都可以在评论区留言</p>
<p>这是<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">文章所在 GitHub 仓库的传送门<OutboundLink/></a>，如果真的对您有所帮助，希望可以点个 star，这是对我最大的鼓励 ～</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
