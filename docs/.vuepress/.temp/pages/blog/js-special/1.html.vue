<template><h1 id="javascript专题-一-变量与函数提升" tabindex="-1"><a class="header-anchor" href="#javascript专题-一-变量与函数提升" aria-hidden="true">#</a> JavaScript专题（一）变量与函数提升</h1>
<blockquote>
<p>相信阅读完<a href="https://blog.csdn.net/jbj6568839z/article/details/103161970" target="_blank" rel="noopener noreferrer">《前端进阶系列》<OutboundLink/></a>的朋友们已经对Js中经典的知识点有所了解。本系列的第一篇选择了一个值得讨论的问题——变量提升，我们会从遇到问题、分析问题、解决问题、例题测试的方式加深大家对变量提升的认知，一起加油！</p>
</blockquote>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>本篇文章是《JavaScript专项进阶系列》的第一篇文章，全系列大概会包含例如：</p>
<ul>
<li>防抖节流</li>
<li>扁平化</li>
<li>深浅拷贝</li>
<li>数组去重</li>
<li>排序</li>
<li>...</li>
</ul>
<p>等等经典的专项知识点。取名为<strong>专项进阶</strong>是因为它们在很多场合的“出镜率高”很高，为了避免化身<code>google内容搜索师</code>，《JavaScript专项进阶系列》诞生了！！！</p>
<p><img src="https://img-blog.csdnimg.cn/20200715170621440.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、有趣的现象" tabindex="-1"><a class="header-anchor" href="#一、有趣的现象" aria-hidden="true">#</a> 一、有趣的现象</h2>
<p>按照大家的常识，JavaScript代码在执行是一定是自上而下的，你需要输出一个字符串，当然需要提前声明一个<code>保存string类型的变量</code>。如果深奥的道理我都能懂，于是我阅读了下面的代码。</p>
<h4 id="_1-1-我以为的开局" tabindex="-1"><a class="header-anchor" href="#_1-1-我以为的开局" aria-hidden="true">#</a> 1.1 我以为的开局</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 123</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>我们调换一下代码的位置在再看：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>我好像找到规律了!!!</strong></p>
<p>当我看完了前两段代码并且进行了“深度思考”后，我好像找到规律了，那就是：在当前代码块后函数中，在变量声明和初始化<code>之前</code>使用变量，会拿不到正确的值。</p>
<p align=center>
<img width="60%" src="https://img-blog.csdnimg.cn/20200716110537792.jpg" />
</p>
<h4 id="_1-2-实际上是这样的" tabindex="-1"><a class="header-anchor" href="#_1-2-实际上是这样的" aria-hidden="true">#</a> 1.2 实际上是这样的</h4>
<p>带着上面的“结论”我来到了这里</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>果然如此！，在<strong>变量声明和初始化之后</strong>耶稣也阻挡不了我拿到val的值，我说的！！！</p>
<p>当我看到下面一段代码时，我已经产生了动摇，此事必要蹊跷。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
    <span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token string">'测试'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Ps：如果大家立即执行函数存在疑问，不妨看看<a href="https://blog.csdn.net/jbj6568839z/article/details/106824296" target="_blank" rel="noopener noreferrer">《JavaScript之深入理解立即调用函数表达式（IIFE）》<OutboundLink/></a>吧～</p>
<p>这...我怂了，是什么原因导致这样的现象发生的呢？Js又是如果处理的呢？</p>
<p align=center>
<img width="60%" src="https://img-blog.csdnimg.cn/20200716111555639.jpg" />
</p>
<h2 id="二、js的预解析" tabindex="-1"><a class="header-anchor" href="#二、js的预解析" aria-hidden="true">#</a> 二、Js的预解析</h2>
<p>在当前的作用域内，无论在哪里变量声明，在幕后，都会进行一次看不见的移动。</p>
<p>注意：<strong>仅声明被“移动”</strong>。即声明和赋值在某些时候被动分开了。而这次看不见的移动实际上就是<code>Js在编译阶段的解析</code>。</p>
<p>来看一段《你知不知道的Js》中经典的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span> <span class="token comment">// 未添加关键字（未声明），name为全局变量，，即window.name = '余光'</span>
<span class="token keyword">var</span> name<span class="token punctuation">;</span> <span class="token comment">// 再次声明name，此时name未进行初始化，它的值是undefined吗？</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ？</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>结果是成功打印“余光”，这样<strong>看不见的移动</strong>就发生在Js预解析（编译）之中。</p>
<h4 id="_2-1-核心-预解析" tabindex="-1"><a class="header-anchor" href="#_2-1-核心-预解析" aria-hidden="true">#</a> 2.1 核心：预解析</h4>
<p>为了搞明白这个核心问题，我们需要回顾一下，引擎会在解释JavaScript代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来。感兴趣的小伙伴可以阅读<a href="https://blog.csdn.net/jbj6568839z/article/details/106793254" target="_blank" rel="noopener noreferrer">《JavaScript中的变量对象》<OutboundLink/></a>和<a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">《从作用域到作用域链》<OutboundLink/></a>这两篇文章哦～</p>
<p>因此，发生这样的事情，包括<code>变量</code>和<code>函数</code>在内的所有声明都会在任何代码被执行前首先被处理。当你看到<code>var a = 2</code>；时，可能会认为这是一个声明。但JavaScript实际上会将其看成两个声明：var a；和a = 2;。</p>
<ul>
<li>第一个定义声明是在编译阶段进行的。</li>
<li>第二个赋值声明会被留在原地等待执行阶段。</li>
</ul>
<p>即代码是这样写的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 我们看到的代码：</span>
<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>但Js会将它解析成：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 声明(Declaration)</span>
<span class="token keyword">var</span> name<span class="token punctuation">;</span> <span class="token comment">// 声明但未初始化，所以分配 undefined</span>

<span class="token comment">// 初始化(Initialization)</span>
name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span> <span class="token comment">// 初始化（赋值）</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>所以本小结的一段代码应该这样分析：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name<span class="token punctuation">;</span> <span class="token comment">// 声明name提到作用域顶部，并被分配了一个undefined</span>
name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span> <span class="token comment">// 进行初始化操作</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '余光'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_2-2-注意-只有声明被提升了" tabindex="-1"><a class="header-anchor" href="#_2-2-注意-只有声明被提升了" aria-hidden="true">#</a> 2.2 注意：只有声明被提升了</h4>
<p><strong>只有声明会被提升，而赋值和其他代码逻辑会在执行到代码的位置时才会生效</strong>。所以会有下面的问题：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>函数被提升了，自然可以正常执行，但变量仅仅是声明被提升了。</p>
<h4 id="_2-3-每个作用域都会进行提升操作" tabindex="-1"><a class="header-anchor" href="#_2-3-每个作用域都会进行提升操作" aria-hidden="true">#</a> 2.3 每个作用域都会进行提升操作</h4>
<p>还是上面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>实际它在编译时是这样的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token punctuation">;</span> <span class="token comment">// 声明</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
    name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span> <span class="token comment">// 初始化</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 函数执行</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p align=center>
    <img width="60%" src="https://img-blog.csdnimg.cn/20200716134005198.jpg" />
</p>
<h2 id="三、提升之间的优先级" tabindex="-1"><a class="header-anchor" href="#三、提升之间的优先级" aria-hidden="true">#</a> 三、提升之间的优先级</h2>
<p>既然我们知道了<code>变量</code>和<code>函数</code>会被提升，他们之间又是如何判断优先级的呢？</p>
<h5 id="_3-1-函数会被首先提升-然后才是变量" tabindex="-1"><a class="header-anchor" href="#_3-1-函数会被首先提升-然后才是变量" aria-hidden="true">#</a> 3.1 函数会被首先提升，然后才是变量</h5>
<p>我们分析下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> foo<span class="token punctuation">;</span> <span class="token comment">// 1</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'小李'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>本着函数优先提升的原则，他会被解析成这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>

<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'小李'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>注意，<code>var foo</code> 因为是一个重复声明，且优先级<code>低于函数声明</code>所以它被忽略掉了。</p>
<h4 id="_3-2-函数字面量不会进行函数提升" tabindex="-1"><a class="header-anchor" href="#_3-2-函数字面量不会进行函数提升" aria-hidden="true">#</a> 3.2 函数字面量不会进行函数提升</h4>
<p>最直观的例子，就是在函数字面量前调用该函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// TypeError: foo is not a function</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这段程序中：</p>
<ol>
<li>变量标识符<code>foo()</code>被提升并分配给所在作用域（在这里是全局作用域），因此foo()<strong>不会导致ReferenceError</strong>。</li>
<li>然后就是执行foo，foo此时并没有赋值（注意变量被提升了）。由于对undefined值进行函数调用而导致非法操作，因此抛出TypeError异常。</li>
</ol>
<h2 id="四、es6和小结" tabindex="-1"><a class="header-anchor" href="#四、es6和小结" aria-hidden="true">#</a> 四、ES6和小结</h2>
<p>ES6新增了两个命令<code>let</code>和<code>const</code>，用来声明变量，有关它们完整的概念我会在《ES6基础系列》中总结，提起它们，是因为<strong>变量提升在它们身上不会存在</strong>。</p>
<h5 id="_4-1-变量提升是可以规避的" tabindex="-1"><a class="header-anchor" href="#_4-1-变量提升是可以规避的" aria-hidden="true">#</a> 4.1 变量提升是可以规避的</h5>
<p>let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// var 的情况</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出undefined</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">// let 的情况</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错ReferenceError</span>
<span class="token keyword">let</span> bar <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。</p>
<p>在变量提升上，const和let一样，只在声明所在的块级作用域内有效，也不会变量提升</p>
<h4 id="_4-2-小结" tabindex="-1"><a class="header-anchor" href="#_4-2-小结" aria-hidden="true">#</a> 4.2 小结</h4>
<ol>
<li>变量提升：函数声明和变量声明总是会被解释器悄悄地被&quot;提升&quot;到方法体的最顶部，但变量的初始化不会提升；</li>
<li>函数提升：函数声明可以被看作是函数的整体被提升到了代码的顶部，但函数字面量表达式并不会引发函数提升；</li>
<li>函数提升优先与变量提升；</li>
<li>let和const可以有效的规避变量提升</li>
</ol>
<p>最后提炼一下《你不知道的JS》中的一段话：<strong>JavaScript引擎并不总是按照代码的顺序来进行解析。在编译阶段，无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理，这个过程被称为提升。声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。</strong></p>
<p align=center>
<img width="60%" src="https://img-blog.csdnimg.cn/20200716184711721.jpg" />
</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>你不知道的Js（上）</li>
</ul>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>JavaScript系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/103161970" target="_blank" rel="noopener noreferrer">《JavaScript内功进阶系列》（已完结）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_10204368.html" target="_blank" rel="noopener noreferrer">《JavaScript专项系列》（持续更新）<OutboundLink/></a></li>
</ol>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光（沉迷JS，虚心学习中）</li>
<li>WX：j565017805</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Js版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">我的CSDN博客<OutboundLink/></a></li>
</ul>
<p>如果您看到了最后，对文章有任何建议，都可以在评论区留言，如果真的对您有所帮助，也希望您能点个star，这是对我最大的鼓励！</p>
<!-- 给这[GitHub，仓库传送门](https://github.com/webbj97/summary)点个star，这是对我最大的鼓励 -->
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
