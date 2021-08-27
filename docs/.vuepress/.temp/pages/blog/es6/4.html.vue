<template><h1 id="es6系列-四-iterator-遍历器-和for-of循环" tabindex="-1"><a class="header-anchor" href="#es6系列-四-iterator-遍历器-和for-of循环" aria-hidden="true">#</a> ES6系列（四）Iterator（遍历器）和for...of循环</h1>
<blockquote>
<p>遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）</p>
</blockquote>
<h2 id="一、迭代器和-for-of-浅谈" tabindex="-1"><a class="header-anchor" href="#一、迭代器和-for-of-浅谈" aria-hidden="true">#</a> 一、迭代器和 for...of 浅谈</h2>
<h4 id="_1-1-传统-for-循环" tabindex="-1"><a class="header-anchor" href="#_1-1-传统-for-循环" aria-hidden="true">#</a> 1.1 传统 for 循环</h4>
<p>先来看一段标准的 for 循环的代码：</p>
<div class="language-JS ext-JS line-numbers-mode"><pre v-pre class="language-JS"><code>var arr = [1,2,3];

for (let i = 0; i &lt; arr.length; i++) {
    console.log(arr[i]);
}
// 1 2 3
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>注意，我们拿到了里面的元素，但却多做了很多事：</p>
<ul>
<li>我们声明了 i 标索引；</li>
<li>确定了边界，一旦多层嵌套；</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">unique</span><span class="token punctuation">(</span><span class="token parameter">array</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> arrayLen <span class="token operator">=</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arrayLen<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> resLen <span class="token operator">=</span> res<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> resLen<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> res<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">===</span> resLen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 把首次出现的加入到新数组中</span>
      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>为了消除这种复杂度以及减少循环中的错误(比如错误使用其他循环中的变量)，ES6 提供了迭代器和 for of 循环共同解决这个问题。</p>
<h4 id="_1-2-terator-迭代器" tabindex="-1"><a class="header-anchor" href="#_1-2-terator-迭代器" aria-hidden="true">#</a> 1.2 terator（迭代器）</h4>
<p><strong>迭代器的描述：</strong></p>
<ul>
<li>是为各种数据结构，提供一个统一的、简便的访问接口，是用于遍历数据结构元素的指针</li>
<li>二是使得数据结构的成员能够按某种次序排列;</li>
<li>三是 <code>ES6</code>创造的一种遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。</li>
</ul>
<p><strong>迭代的过程如下：</strong></p>
<ul>
<li>通过 Symbol.iterator 创建一个迭代器，指向当前数据结构的起始位置</li>
<li>随后通过 next 方法进行向下迭代指向下一个位置：
<ul>
<li>next 方法会返回当前位置的对象，对象包含了 <code>value</code> 和 <code>done</code> 两个属性;</li>
<li>value 是当前属性的值;</li>
<li>done 用于判断是否遍历结束，done 为 true 时则遍历结束;</li>
</ul>
</li>
</ul>
<p><strong>迭代的内部逻辑应该是：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> it <span class="token operator">=</span> <span class="token function">makeIterator</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: "a", done: false }</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: "b", done: false }</span>
it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: undefined, done: true }</span>

<span class="token keyword">function</span> <span class="token function">makeIterator</span><span class="token punctuation">(</span><span class="token parameter">array</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> iterator <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  iterator<span class="token punctuation">.</span><span class="token function-variable function">next</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">{</span> value<span class="token operator">:</span> array<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> value<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> iterator<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="_1-3-什么是-for-of" tabindex="-1"><a class="header-anchor" href="#_1-3-什么是-for-of" aria-hidden="true">#</a> 1.3 什么是 for...of？</h4>
<p>注意这里我们仅提及了 forof 与迭代器的关系。</p>
<p><strong>for...of 的描述：</strong></p>
<ul>
<li>for...of 语句在可迭代对象上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句——MDN</li>
<li>一个数据结构只要部署了<code>Symbol.iterator</code>属性，就被视为具有 <code>iterator</code> 接口，就可以用<code>for...of</code>循环遍历它的成员。</li>
</ul>
<p>看到这里你会发现<code>for...of</code>和迭代器总是在一起， <code>for...of</code>循环内部调用的是数据结构的<code>Symbol.iterator</code>方法。</p>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>value <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// TypeError: iterator is not iterable</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>我们直接 for of 遍历一个对象，会报错，然而如果我们给该对象添加 Symbol.iterator 属性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>value <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
<span class="token comment">// 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>由此，我们也可以发现 <code>for...of</code> 遍历的其实是对象的 <code>Symbol.iterator</code> 属性。</p>
<p>JavaScript 原有的 for...in 循环，只能获得对象的键名，不能直接获取键值。ES6 提供 for...of 循环，允许遍历获得键值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">,</span> <span class="token string">"d"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> a <span class="token keyword">in</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0 1 2 3</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> a <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a b c d</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>上面代码表明：</p>
<ul>
<li>for...in 循环读取<strong>键名</strong></li>
<li>for...of 循环读取<strong>键值</strong></li>
</ul>
<p>for...of 循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟 for...in 循环也不一样。</p>
<h2 id="二、默认的-iterator-接口" tabindex="-1"><a class="header-anchor" href="#二、默认的-iterator-接口" aria-hidden="true">#</a> 二、默认的 Iterator 接口</h2>
<p><code>Iterator</code> 接口的目的，就是为所有数据结构，提供了一种统一的访问机制。当使用 for...of 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。</p>
<p>原生具备 Iterator 接口的数据结构如下。</p>
<ul>
<li>Array</li>
<li>Map</li>
<li>Set</li>
<li>String</li>
<li>TypedArray</li>
<li>函数的 arguments 对象</li>
<li>NodeList 对象</li>
</ul>
<p><strong>拿数组举例：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> item <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
item<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
item<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
item<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// {value: 1, done: false}</span>
<span class="token comment">// {value: 2, done: false}</span>
<span class="token comment">// {value: 3, done: false}</span>
<span class="token comment">// {value: undefined, done: true}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>对于原生部署<code>Iterator</code>接口的数据结构，不用自己写遍历器生成函数，<code>for...of</code> 循环会自动遍历它们。除此之外，都需要自己在 Symbol.iterator 属性上面部署。</p>
<p>本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。</p>
<p>对象（Object）之所以没有默认部署 Iterator 接口，也是因为对象没法统一进行线性转换</p>
<p>一个对象如果要具备可被 for...of 循环调用的 Iterator 接口，就必须在 Symbol.iterator 的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">newiterator</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">start<span class="token punctuation">,</span> stop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> start<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stop <span class="token operator">=</span> stop<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// Iterator接口 返回本身</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> value<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token operator">++</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> value<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> iterator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">newiterator</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">of</span> iterator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 0 1 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>上面代码是一个类部署 Iterator 接口的写法。Symbol.iterator 属性对应一个函数，执行后返回当前对象的遍历器对象。</p>
<p>对于类似数组的对象（存在数值键名和 length 属性），部署 Iterator 接口，有一个简便方法，就是 Symbol.iterator 方法直接引用数组的 Iterator 接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 或者</span>
<span class="token class-name">NodeList</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token operator">...</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 可以执行了</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的 Symbol.iterator 属性，可以看到没有任何影响。</p>
<p>注意，普通对象部署数组的 Symbol.iterator 方法，并无效果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> iterable <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token string">"a"</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token string">"b"</span><span class="token punctuation">,</span>
  c<span class="token operator">:</span> <span class="token string">"c"</span><span class="token punctuation">,</span>
  length<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> iterable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined, undefined, undefined</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>如果 Symbol.iterator 方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。</p>
<h2 id="三、模拟实现的-for-of" tabindex="-1"><a class="header-anchor" href="#三、模拟实现的-for-of" aria-hidden="true">#</a> 三、模拟实现的 for...of</h2>
<p>其实模拟实现 <code>for of</code> 也比较简单，就是利用它与 Symbol.iterator 的关系。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">forOf</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> iterable<span class="token punctuation">,</span> result<span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token string">"function"</span><span class="token punctuation">)</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span>result <span class="token operator">+</span> <span class="token string">" is not iterable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> cb <span class="token operator">!==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"cb must be callable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  iterable <span class="token operator">=</span> obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  result <span class="token operator">=</span> iterable<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">.</span>done<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">cb</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    result <span class="token operator">=</span> iterable<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="四、使用-iterator-接口的场景" tabindex="-1"><a class="header-anchor" href="#四、使用-iterator-接口的场景" aria-hidden="true">#</a> 四、使用 Iterator 接口的场景</h2>
<p>有一些场合会默认调用 Iterator 接口（即 Symbol.iterator 方法），除了 for...of 循环，还有几个别的场合。</p>
<h4 id="_4-1-解构赋值" tabindex="-1"><a class="header-anchor" href="#_4-1-解构赋值" aria-hidden="true">#</a> 4.1 解构赋值</h4>
<p>对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span> <span class="token operator">=</span> set<span class="token punctuation">;</span>
<span class="token comment">// x='a'; y='b'</span>

<span class="token keyword">let</span> <span class="token punctuation">[</span>first<span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token punctuation">]</span> <span class="token operator">=</span> set<span class="token punctuation">;</span>
<span class="token comment">// first='a'; rest=['b','c'];</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="_4-2-扩展运算符" tabindex="-1"><a class="header-anchor" href="#_4-2-扩展运算符" aria-hidden="true">#</a> 4.2 扩展运算符</h4>
<p>扩展运算符（...）也会调用默认的 Iterator 接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 例一</span>
<span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token operator">...</span>str<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//  ['h','e','l','l','o']</span>

<span class="token comment">// 例二</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token operator">...</span>arr<span class="token punctuation">,</span> <span class="token string">"d"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// ['a', 'b', 'c', 'd']</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>上面代码的扩展运算符内部就调用 Iterator 接口。</p>
<p>实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。</p>
<h4 id="_4-3-yield" tabindex="-1"><a class="header-anchor" href="#_4-3-yield" aria-hidden="true">#</a> 4.3 yield*</h4>
<p><code>yield*</code>后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">generator</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token operator">*</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> iterator <span class="token operator">=</span> <span class="token function">generator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 1, done: false }</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 2, done: false }</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 3, done: false }</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 4, done: false }</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 5, done: false }</span>
iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: undefined, done: true }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="_4-4-其他场合" tabindex="-1"><a class="header-anchor" href="#_4-4-其他场合" aria-hidden="true">#</a> 4.4 其他场合</h4>
<p>由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。</p>
<ul>
<li>Array.from()</li>
<li>Map(), Set(), WeakMap(), WeakSet()（比如 new Map([['a',1],['b',2]])）</li>
<li>Promise.all()</li>
<li>Promise.race()</li>
</ul>
<h2 id="五、iterator-接口与-generator-函数" tabindex="-1"><a class="header-anchor" href="#五、iterator-接口与-generator-函数" aria-hidden="true">#</a> 五、Iterator 接口与 Generator 函数</h2>
<p><code>Symbol.iterator()</code>方法的最简单实现，还是使用 ES6 新提出的 Generator 函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> myIterable <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token operator">...</span>myIterable<span class="token punctuation">]</span> <span class="token comment">// [1, 2, 3]</span>

<span class="token comment">// 或者采用下面的简洁写法</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token string">'world'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> x <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// "hello"</span>
<span class="token comment">// "world"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>上面代码中，Symbol.iterator()方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。</p>
<h2 id="六、遍历器对象的-return-throw" tabindex="-1"><a class="header-anchor" href="#六、遍历器对象的-return-throw" aria-hidden="true">#</a> 六、遍历器对象的 return()，throw()</h2>
<p>遍历器对象除了具有 next()方法，还可以具有 return()方法和 throw()方法。如果你自己写遍历器对象生成函数，那么 next()方法是必须部署的，return()方法和 throw()方法是否部署是可选的。</p>
<p>return()方法的使用场合是，如果 for...of 循环提前退出（通常是因为出错，或者有 break 语句），就会调用 return()方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署 return()方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">readLinesSync</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token punctuation">{</span> done<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          file<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> <span class="token punctuation">{</span> done<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>上面代码中，函数 readLinesSync 接受一个文件对象作为参数，返回一个遍历器对象，其中除了 next()方法，还部署了 return()方法。下面的两种情况，都会触发执行 return()方法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 情况一</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> line <span class="token keyword">of</span> <span class="token function">readLinesSync</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 情况二</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> line <span class="token keyword">of</span> <span class="token function">readLinesSync</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>上面代码中:</p>
<ul>
<li>情况一输出文件的第一行以后，就会执行 return()方法，关闭这个文件；</li>
<li>情况二会在执行 return()方法关闭文件之后，再抛出错误。</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/90" target="_blank" rel="noopener noreferrer">ES6 系列之迭代器与 for of<OutboundLink/></a></li>
<li><a href="https://es6.ruanyifeng.com/#docs/iterator" target="_blank" rel="noopener noreferrer">廖雪峰：迭代器函数<OutboundLink/></a></li>
</ul>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>JavaScript 系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/103161970" target="_blank" rel="noopener noreferrer">《JavaScript 内功进阶系列》（已完结）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_10204368.html" target="_blank" rel="noopener noreferrer">《JavaScript 专项系列》（持续更新）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_8464707.html" target="_blank" rel="noopener noreferrer">《ES6 基础系列》（持续更新）<OutboundLink/></a></li>
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
</ul>
<p>这是<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">文章所在 GitHub 仓库的传送门<OutboundLink/></a>，您点的 <code>star</code>，就是对我最大的鼓励 ～</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
