<template><h1 id="【typescript入门】之引用类型在typescript中的应用" tabindex="-1"><a class="header-anchor" href="#【typescript入门】之引用类型在typescript中的应用" aria-hidden="true">#</a> 【Typescript入门】之引用类型在TypeScript中的应用</h1>
<blockquote>
<p>在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。</p>
</blockquote>
<p>上一篇文章<a href="https://webbj97.github.io/summary/blog/ts/1.html" target="_blank" rel="noopener noreferrer">《基本类型在 TypeScript 中的应用》<OutboundLink/></a>地址在这里，本篇文章将继续聊一聊“复杂”类型是如果定义的。</p>
<font color="red">系列文章，收藏不走丢哦</font>
<h2 id="一、对象的类型-接口" tabindex="-1"><a class="header-anchor" href="#一、对象的类型-接口" aria-hidden="true">#</a> 一、对象的类型（接口）</h2>
<p>TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。简单的说，接口就是对<strong>对象形状</strong>的描述。</p>
<h3 id="_1-1-使用接口" tabindex="-1"><a class="header-anchor" href="#_1-1-使用接口" aria-hidden="true">#</a> 1.1 使用接口</h3>
<p>来看下面一段代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"余光"</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>不难理解，我们将参数 obj 内部的属性进行了类型注释，并在之后检查对应的类型。</p>
<p>再来看看下面的代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span>person<span class="token operator">:</span> Person<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person1 <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"余光1"</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> person2 <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"余光2"</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">getName</span><span class="token punctuation">(</span>person1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光1 100</span>
<span class="token function">getName</span><span class="token punctuation">(</span>person2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光2 200</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>开头我们提到过Ts的鸭式辨型法——像鸭子一样走路并且嘎嘎叫的就叫鸭子，在这里只要在结构（形状）是和接口Person一致的，就会通过类型检查。当然接口不仅仅只能这样使用，我们继续～</p>
<p><strong>注意：</strong></p>
<ol>
<li>定义的变量比接口少了一些属性是不允许的</li>
<li>多一些属性也是不允许的</li>
</ol>
<p>举例：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token comment">// 缺少属性</span>
<span class="token keyword">const</span> aa<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span>
<span class="token punctuation">}</span> <span class="token comment">// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "Person" 中需要该属性。</span>

<span class="token comment">// 多属性</span>
<span class="token keyword">const</span> aa<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
    height<span class="token operator">:</span> <span class="token number">200</span>
<span class="token punctuation">}</span>
<span class="token comment">// 不能将类型“{ name: string; age: number; height: number; }”分配给类型“Person”。</span>
<span class="token comment">// 对象文字可以只指定已知属性，并且“height”不在类型“Person”中。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="_1-2-可选属性" tabindex="-1"><a class="header-anchor" href="#_1-2-可选属性" aria-hidden="true">#</a> 1.2 可选属性</h3>
<p>在1.1小节的最后我们知道，必须和接口的形状一模一样，但有时我们希望不要100%相似，这时就需要用到<strong>可选属性</strong>了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> string<span class="token punctuation">;</span>
    age<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person1<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>注意可选属性可以不存在，但仍然不允许添加<strong>未定义</strong>的属性。</p>
<h3 id="_1-3-任意属性" tabindex="-1"><a class="header-anchor" href="#_1-3-任意属性" aria-hidden="true">#</a> 1.3 任意属性</h3>
<p>有时候我们希望一个接口允许有任意的属性，可以使用如下方式：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> yuguang<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>注意：<strong>一旦定义了任意属性，那么确定属性和可选属性的类型都</strong>必须是它的类型的子集</strong>：例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 类型“string”的属性“name”不能赋给字符串索引类型“number”</span>
    age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// 类型“number”的属性“age”不能赋给字符串索引类型“boolean”</span>
    <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> yuguang<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">100</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>任意属性可以添加联合类型</strong></p>
<p>不难理解，任意属性的确定，是优先级最高的，确定的属性和可选属性会进行类型检测，所以才会有上面例子的检测错误，而想要避免这样的检测错误，可以给任意属性可以添加联合类</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_1-4-只读属性" tabindex="-1"><a class="header-anchor" href="#_1-4-只读属性" aria-hidden="true">#</a> 1.4 只读属性</h3>
<p>有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用<code>readonly</code>定义只读属性：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> yuguang<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">,</span>
    gender<span class="token operator">:</span> <span class="token string">'male'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

yuguang<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">9527</span><span class="token punctuation">;</span> <span class="token comment">// 无法分配到 "id" ，因为它是只读属性。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> yuguang<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">,</span>
    gender<span class="token operator">:</span> <span class="token string">'male'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 类型 "{ name: string; gender: string; }" 中缺少属性 "id"，但类型 "Person" 中需要该属性</span>

yuguang<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">9527</span><span class="token punctuation">;</span> <span class="token comment">// 无法分配到 "id" ，因为它是只读属性。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>你会发现：</p>
<ol>
<li>创建对象yuguang时应该被赋值的id属性不存在，会报错</li>
<li>id赋值的时会报错，因为这个属性是只读的</li>
</ol>
<h2 id="二、数组的类型" tabindex="-1"><a class="header-anchor" href="#二、数组的类型" aria-hidden="true">#</a> 二、数组的类型</h2>
<p>在TypeScript中，数组类型有多种定义方式，比较灵活。</p>
<h3 id="_2-1-类型-方括号" tabindex="-1"><a class="header-anchor" href="#_2-1-类型-方括号" aria-hidden="true">#</a> 2.1 类型 + 方括号</h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> fibonacci<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 此时数组内每个元素都会进行类型检测</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> fibonacci<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
fibonacci<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 类型“string”的参数不能赋给类型“number”的参数。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-2-数组泛型" tabindex="-1"><a class="header-anchor" href="#_2-2-数组泛型" aria-hidden="true">#</a> 2.2 数组泛型</h3>
<blockquote>
<p>泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。</p>
</blockquote>
<p>我们可以使用数组泛型（Array Generic） <code>Array&lt;elemType&gt;</code> 来表示数组：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> fibonacci<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>其实两者非常相似～</p>
<h3 id="_2-3-用接口表示数组" tabindex="-1"><a class="header-anchor" href="#_2-3-用接口表示数组" aria-hidden="true">#</a> 2.3 用接口表示数组</h3>
<p>接口也可以用来描述数组：</p>
<p>NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">NumberArray</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> fibonacci<span class="token operator">:</span> NumberArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>看到接口有一种恍然大明白的感觉，数字也是特殊的对象，对象的属性是字符串类型，而数组的下标是数字类型，嗯没毛病</p>
<p>当然我们一般不会这么做，因为这种方式比前两种方式复杂多了。</p>
<p>不过有一种情况例外，那就是它常用来表示类数组。</p>
<h3 id="_2-4-类数组" tabindex="-1"><a class="header-anchor" href="#_2-4-类数组" aria-hidden="true">#</a> 2.4 类数组</h3>
<p>类数组（Array-like Object）不是数组类型，比如 arguments：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> args<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 24 项</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>上例中，arguments实际上是一个类数组，不能用普通的数组的方式来描述，所以类型检测会提示缺少数组上的方法等等</p>
<p>而应该用接口：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> args<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token punctuation">[</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
        length<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
        callee<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。</p>
<p>事实上常用的类数组都有自己的接口定义，如<code>IArguments</code>, <code>NodeList</code>,<code>HTMLCollection</code> 等：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> args<span class="token operator">:</span> IArguments <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>其中IArguments是TypeScript中定义好了的类型，它实际上就是：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IArguments</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
    length<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    callee<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_2-5-any-在数组中的应用" tabindex="-1"><a class="header-anchor" href="#_2-5-any-在数组中的应用" aria-hidden="true">#</a> 2.5 any 在数组中的应用</h3>
<p>一个比较常见的做法是，用 any 表示数组中允许出现任意类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> list<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'xcatliu'</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> website<span class="token operator">:</span> <span class="token string">'http://xcatliu.com'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>对于any约束的数字，其实就是主动放弃了类型检测～</p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>本篇文章是《Typescript基础入门》第二篇，到这里就结束了，主要带大家了解一下引用类型在Ts中的表现，下一篇文章我们来聊一聊函数类型在Ts中是怎么被“约束”的～</p>
<p>系列文章传送门：</p>
<ol>
<li><a href="https://yuguang.blog.csdn.net/article/details/119137707" target="_blank" rel="noopener noreferrer">《Typescript入门手册之基本类型在TypeScript中的应用》<OutboundLink/></a></li>
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
</p>
</template>
