<template><h1 id="javascript基础-三-作用域" tabindex="-1"><a class="header-anchor" href="#javascript基础-三-作用域" aria-hidden="true">#</a> JavaScript基础（三）作用域</h1>
<blockquote>
<p>作用域的篇幅不会太长，作为自己对Js总结的第三篇文章，主要是承上启下。
之后会涉及到执行上下文，闭包等相关专题，为了避免内容过多，作用域这一部分单独总结。</p>
</blockquote>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#1">前言</a></li>
<li><a href="#2">一、作用域的定义</a></li>
<li><a href="#3">二、理解作用域</a></li>
<li><a href="#4">三、作用域链</a></li>
<li><a href="#5">四、思考与总结</a></li>
<li><a href="#6">五、写在最后</a></li>
</ul>
<h2 id="1">前言</h2>
<p><img src="https://img-blog.csdnimg.cn/20200608173220962.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p>JavaScript内功系列：</p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this指向详解，思维脑图与代码的结合，让你一篇搞懂this、call、apply。系列（一）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链，修炼JavaScript内功这篇文章真的不能错过！系列（二）<OutboundLink/></a></li>
<li>本文</li>
</ol>
<h2 id="2">一、作用域的定义</h2>
<p><strong>一张导图概括本节内容</strong>
<img src="https://img-blog.csdnimg.cn/20200609102448438.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述">
<strong>1.1 常见的解释</strong></p>
<ol>
<li>一段程序代码中所用到的<strong>名字</strong>并不总是有效，而限定它的可用性的范围就是这个名字的作用域；</li>
<li>作用域规定了<strong>如何查找变量</strong>，也就是确定当前执行代码对变量的访问权限；</li>
<li>通俗的讲作用域就是<strong>一套规则</strong>，用于确定在何处以及如何查找<strong>某个变量</strong>的规则</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// a is not defined a变量并不是任何地方都可以被找到的</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>1.2 JavaScript中作用域工作模型</strong></p>
<p>JavaScript 采用是词法作用域(lexical scoping)，也就是静态作用域：</p>
<ul>
<li>函数的作用域在函数定义的时候就决定了</li>
</ul>
<p>与之对应的还有一个动态作用域：</p>
<ul>
<li>函数的作用域是在函数调用的时候才决定的；</li>
</ul>
<p><strong>1.3 全局变量和局部变量</strong></p>
<p>根据定义变量的方式又可以分为：</p>
<p>局部变量：只能在函数中访问，该函数外不可访问；</p>
<ul>
<li>定义在函数中的变量</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ？</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ？</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>全局：任何地方都能访问到的对象拥有全局作用域。</p>
<ul>
<li>函数外定义的变量</li>
<li>所有末定义直接赋值的变量自动声明为拥有全局作用域</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a1-'</span><span class="token punctuation">,</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	a <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a2-'</span><span class="token punctuation">,</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a3-'</span><span class="token punctuation">,</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a4-'</span><span class="token punctuation">,</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>注意：在ES6之后又提出了块级作用域，它们之间的区别我们之后再来讨论。</p>
<p><img src="https://img-blog.csdnimg.cn/20200609163254939.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="3">二、理解作用域</h2>
<p>根据第一节的描述，我们一一验证一下</p>
<p><strong>2.1 理解词法作用域</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>我们结合定义去分析：</p>
<ul>
<li>执行<code>bar</code>函数，函数内部形成了局部作用域；</li>
<li>声明value变量，并赋值2</li>
<li>执行<code>foo</code>函数，函数foo的作用域内没有<code>value</code>这个变量，它会向外查找</li>
<li>根据词法作用域的规则，函数定义时，<code>foo</code>的外部作用域为全局作用域</li>
<li>打印<strong>结果是1</strong></li>
</ul>
<p>如果是动态作用域的话：结果<strong>就是2</strong>，不知道你是否想明白了？</p>
<p><strong>2.2 全局变量</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'全局变量'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">function</span> <span class="token function">childFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token operator">+</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
		<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token function">childFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 全局变量1</span>
<span class="token comment">// 全局变量2</span>
<span class="token comment">// 全局变量3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>再来分析下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	a <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a1-'</span><span class="token punctuation">,</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a2-'</span><span class="token punctuation">,</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a3-'</span><span class="token punctuation">,</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// a2- 100 // 在当前作用域下查找变量a => 100</span>
<span class="token comment">// a1- 1000 // 函数执行时，全局变量a已经被重新赋值</span>
<span class="token comment">// a3- 1000 // 全局变量a => 1000</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>2.3 局部作用域</strong></p>
<p>局部作用域一般只在固定的代码片段内可访问到，最常见的就是以函数为单位的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token operator">=</span><span class="token string">"余光"</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">childFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">childFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name is not defined</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="4"> 三、作用域链</h2>
<p><strong>3.1 当查找变量的时候都发生了什么？</strong></p>
<ul>
<li>会先从当前<strong>上下文的变量对象</strong>中查找；</li>
<li>如果没有找到，就会从父级(词法层面上的父级)<strong>执行上下文</strong>的变量对象中查找；</li>
<li>一直找到全局上下文的变量对象，也就是全局对象；</li>
<li>作用域链的顶端就是全局对象；</li>
</ul>
<p>这样<strong>由多个执行上下文的变量对象构成的链表就叫做作用域链</strong>，从某种意义上很类似原型和原型链。</p>
<p><strong>3.2 作用域链和原型继承查找时的区别：</strong></p>
<ul>
<li>查找一个普通对象的属性，但是在当前对象和其原型中都找不到时，会返回<code>undefined</code></li>
<li>查找的属性在作用域链中不存在的话就会抛出<code>ReferenceError</code>。</li>
</ul>
<p><strong>3.3 作用域嵌套</strong></p>
<p>既然每一个函数就可以形成一个作用域（<code>词法作用域</code> || <code>块级作用域</code>），那么当然也会存在多个作用域嵌套的情况，他们遵循这样的查询规则：</p>
<ul>
<li>内部作用域有权访问外部作用域;</li>
<li>外部作用域无法访问内部作用域;（真是是这样吗？）</li>
<li>兄弟作用域不可互相访问;</li>
</ul>
<p>在《你不知道的Js》中，希望读者可以将作用域的嵌套和作用域链想象成这样：</p>
<p><img src="https://img-blog.csdnimg.cn/2020060915193493.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="5"> 四、思考与总结</h2>
<p><strong>4.1 总结</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20200609160809565.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p><strong>4.2 思考</strong></p>
<p>最后，让我们看一个《JavaScript权威指南》中的两段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"global scope"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">checkscope1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"local scope"</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> scope<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 注意</span>
<span class="token punctuation">}</span>
<span class="token function">checkscope1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"global scope"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">checkscope2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"local scope"</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> scope<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> f<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">checkscope2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>两段代码的结果都是&quot;local scope&quot;，书中的回答是：JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。</p>
<p>但是它们内部经历的事情是一样的吗？</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>《你不知道的JavaScript》</li>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/3" target="_blank" rel="noopener noreferrer">JavaScript深入之词法作用域和动态作用域<OutboundLink/></a></li>
</ul>
<h2 id="6">写在最后</h2>
<p>JavaScript内功基础部分已经总结到第三篇了，总结这个系列是受到了<a href="https://github.com/mqyqingfeng" target="_blank" rel="noopener noreferrer">冴羽<OutboundLink/></a>大大的鼓励和启发，本系列大约会有15篇文章，都是我们在面试最高频的，但在工作中常常被忽略的。</p>
<p><strong>JavaScript内功系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this指向详解，思维脑图与代码的结合，让你一篇搞懂this、call、apply。系列（一）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链，修炼JavaScript内功这篇文章真的不能错过！系列（二）<OutboundLink/></a></li>
<li>本文</li>
<li>下一篇预发：执行上下文</li>
</ol>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>一名工作不久的前端小白</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">JavaScript版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
</ul>
<p>如果您看到了最后，不妨收藏、点赞、评论一下吧！！！
持续更新，您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p></template>
