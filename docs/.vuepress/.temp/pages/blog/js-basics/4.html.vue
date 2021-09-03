<template><h1 id="javascript基础-四-执行上下文" tabindex="-1"><a class="header-anchor" href="#javascript基础-四-执行上下文" aria-hidden="true">#</a> JavaScript基础（四）执行上下文</h1>
<blockquote>
<p>本文主要会讲解我们经常看到的上下文知识点，旨在帮助自己和大家加深对它理解。本篇文章可以避开了变量提升相关知识，是希望篇幅可以控制在一定范围，方便大家浏览，剧透一下《变量对象》会在下一篇和大家见面～</p>
</blockquote>
<blockquote>
<p>持续更新，您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！</p>
</blockquote>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#0">前言</a></li>
<li><a href="#1">一、怎么描述执行上下文？</a></li>
<li><a href="#2">二、执行栈</a></li>
<li><a href="#3">三、形象化执行栈</a></li>
<li><a href="#4">四、思考与总结</a></li>
<li><a href="#5">五、写在最后</a></li>
</ul>
<h2 id="0">前言</h2>
<p align=center>
    <img src="https://img-blog.csdnimg.cn/20200615120101902.jpg" width="60%" />
</p>
<p>又到了修炼JavaScript内功的时候了，继上一篇<a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">《从作用域到作用域链》<OutboundLink/></a>之后，我们来谈一谈执行上下文，在写这篇文章的时候总感觉无法完整的将知识点串联起来，所以希望大家也能提些建议哦，让这篇文章更值得收藏、点赞哦～</p>
<h2 id="1">一、怎么描述执行上下文</h2>
<p><strong>1.1 本节知识导图：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/2020061510512845.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token comment">// 思考为什么没有报错？</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>1.2 如果描述执行上下文</strong></p>
<ol>
<li>当函数执行时，会创建一个称为执行上下文的内部对象。一个执行上下文定义了一个函数执行时的环境；</li>
<li>当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息 ；</li>
<li>每个函数在被定义时，就会有一个[[scope]]属性，这个属性里保存着作用域链，而执行的前一刻都会创建一个OA对象，这个对象就是执行上下文，这个OA对象会被插入[[scope]]中作用域链的最顶端，这个对象里保存着函数体声明的所有变量、参数和方法。一个OA对象的有序列表。</li>
</ol>
<p>上述三条描述都符合执行上下文的一些特点，但侧重点都不一样。</p>
<p><strong>1.3 执行上下文的类型</strong></p>
<ol>
<li>
<p>全局执行上下文：只有一个，浏览器中的全局对象就是 window 对象，this 指向这个全局对象。</p>
</li>
<li>
<p>函数执行上下文：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文。</p>
</li>
<li>
<p><code>Eval</code> 函数执行上下文： 指的是运行在 eval 函数中的代码，很少用而且不建议使用。</p>
</li>
</ol>
<p align=center>
    <img src="https://img-blog.csdnimg.cn/20200615134027387.jpg" width="60%" />
</p>
<h2 id="2">二、执行栈（Execution context stack）</h2>
<blockquote>
<p>大家都明白，函数的执行顺序和它的定义顺序没关系，但如何解释，就需要从执行栈说起了</p>
</blockquote>
<p><strong>2.1 本节知识导图</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20200615113052649.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p><strong>2.2 描述执行栈</strong></p>
<p><strong>执行栈</strong>，也叫调用栈，具有 LIFO（后进先出）结构，用于存储在代码执行期间创建的所有执行上下文。</p>
<p>首次<strong>运行JS代码</strong>时，会创建一个全局执行上下文并Push到当前的执行上下文栈中。每当发生函数调用，引擎都会为该函数创建一个新的函数执行上下文并<code>push</code>到当前执行栈的栈顶。</p>
<p>当栈顶函数运行完成后，其对应的函数执行上下文将会从执行栈中<code>pop</code>出，上下文控制权将移到当前执行栈的下一个执行上下文。</p>
<p>接下来问题来了，我们写的函数多了去了，<strong>如何管理创建的那么多执行上下文呢？</strong></p>
<h2 id="3">三、形象化执行栈</h2>
<p>我们利用图片+文字描述的方式来解释这样几段代码：</p>
<p><strong>3.1 为了模拟执行上下文栈的行为，让我们定义执行上下文栈为一个数组：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> ECStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 <code>globalContext</code> 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个<code> globalContext</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'globalContext'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ECStack <span class="token comment">// ["globalContext"]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>现在 JavaScript 遇到下面的这段代码了：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fun2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fun2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fun3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fun3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'最后打印3'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 最后打印3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>当执行一个函数的时候，就会创建一个执行上下文，并且压入（<code>push</code>）执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出（<code>pop</code>）。知道了这样的工作原理，让我们来看看如何处理上面这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 伪代码</span>

<span class="token comment">// fun1()</span>
ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>fun1<span class="token operator">></span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// fun1中竟然调用了fun2，还要创建fun2的执行上下文</span>
ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>fun2<span class="token operator">></span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 擦，fun2还调用了fun3！</span>
ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>fun3<span class="token operator">></span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// fun3执行完毕</span>
ECStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// fun2执行完毕</span>
ECStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// fun1执行完毕</span>
ECStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/2020061514072717.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p>再看如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">father</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">child</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">father</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//会依次输出 1 2 3 4 5</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>分析它在执行栈的形式：</p>
<p><img src="https://img-blog.csdnimg.cn/20200615115415140.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述">
其实到这里我们已经大致了解了执行栈在函数执行前-&gt;执行后的流程了，不妨好好总结一下它的生命周期吧～</p>
<p align=center>
    <img src="https://img-blog.csdnimg.cn/20200615141026605.jpg" width="60%" />
</p>
<h2 id="4">四、思考题</h2>
<p>现在我们已经了解了执行上下文栈是如何处理执行上下文的，所以让我们看看上篇文章<a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">《从作用域到作用域链》<OutboundLink/></a>最后的问题：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"global scope"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">checkscope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"local scope"</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> scope<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">checkscope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"global scope"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">checkscope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"local scope"</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> scope<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> f<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">checkscope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？</p>
<p>答案就是执行上下文栈的变化不一样。</p>
<p>让我们模拟第一段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>checkscope<span class="token operator">></span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>f<span class="token operator">></span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
ECStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ECStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>让我们模拟第二段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>checkscope<span class="token operator">></span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
ECStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ECStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>f<span class="token operator">></span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
ECStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p align=center>
    <img src="https://img-blog.csdnimg.cn/20200615145216315.jpg" width="60%" />
</p>
<h2 id="5">五、写在最后</h2>
<p>JavaScript内功基础部分已经总结到第四篇了，总结这个系列是受到了<a href="https://github.com/mqyqingfeng" target="_blank" rel="noopener noreferrer">冴羽<OutboundLink/></a>大大的鼓励和启发，本系列大约会有15篇文章，都是我们在面试最高频的，但在工作中常常被忽略的知识点。</p>
<p><strong>JavaScript内功系列：</strong></p>
<ol>
<li><RouterLink to="/blog/js-basics/1.%E4%B8%80%E7%AF%87%E6%90%9E%E6%87%82this%E6%8C%87%E5%90%91%E9%97%AE%E9%A2%98.html">this、call、apply详解，系列（一）</RouterLink></li>
<li><RouterLink to="/blog/js-basics/2.%E4%BB%8E%E5%8E%9F%E5%9E%8B%E5%88%B0%E5%8E%9F%E5%9E%8B%E9%93%BE.html">从原型到原型链，系列（二）</RouterLink></li>
<li><RouterLink to="/blog/js-basics/3.JavaScript%E4%B8%AD%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F.html">从作用域到作用域链，系列（三）</RouterLink></li>
<li>JavaScript中的执行上下文（本文）</li>
<li>下一篇预告：执行上下文的“伴生姐妹”——变量对象</li>
</ol>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805，欢迎交流</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">JavaScript版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_10069610.html" target="_blank" rel="noopener noreferrer">JavaScript内功修炼CSDN版<OutboundLink/></a></li>
</ul>
<p>如果您看到了最后，不妨收藏、点赞、评论一下吧！！！
持续更新，您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
