<template><h1 id="javascript基础-总结-你真的了解js吗" tabindex="-1"><a class="header-anchor" href="#javascript基础-总结-你真的了解js吗" aria-hidden="true">#</a> JavaScript基础（总结）你真的了解Js吗</h1>
<blockquote>
<p>灵感来自Amandeep Singh大佬的文章，也是我第一次翻译英文技术文章（仅翻译了前言和题目），问题主要考察的是作用域、this指向、立即执行函数、变量提升相关知识点，我在翻译加上了自己的思考和回答，如果有错误欢迎大家指正！</p>
</blockquote>
<p>选择这篇文章作为前端内功系列的期中总结，为了贴合前面总结的知识点，我仅保留了部分题目，希望能引发自己和大家的思考，加油～</p>
<p>希望大家可以将答案写在评论区下方，增加参与感，我也会在下一篇文章中给出问题的答案。</p>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#1">一、前言</a></li>
<li><a href="#2">二、问题</a></li>
<li><a href="#3">三、答案解析</a></li>
<li><a href="#4">写在最后</a></li>
</ul>
<h2 id="1">一、前言</h2>
<p>JavaScript是一种非常有趣的语言，我们都因为它的某些性质而爱上了它。
对于JavaScript来说，浏览器就是大本营，并且它们可以一起很好的为我们服务。</p>
<p>在Js中，有一些概念是容易被人们忽视的，甚至曾因为它们而吃过苦头。例如：原型、闭包、事件循环仍然是大部分开发者会可以绕开的“晦涩”的领域。</p>
<p>正如我们所知道的，不掌握细节是一件危险的事情，很可能导致你犯错。</p>
<p>让我们玩一个小游戏，我会问你几个问题，而你需要试着去回答它们。如果你不知道答案，或者问题超过了你的知识范围，不妨大胆的给出猜测。
记录下你的回答，并在之后检查你的答案，每答对一道题，就给自己一分，让我们开始吧！</p>
<h2 id="">二、开始答题</h2>
<p>阅读完问题后大家可以停下来思考一下，再看看我的回答与分析，看看我们呼应上没有《手动狗头》～</p>
<h4 id="问题一-在浏览器中-下面代码会输出什么" tabindex="-1"><a class="header-anchor" href="#问题一-在浏览器中-下面代码会输出什么" aria-hidden="true">#</a> 问题一：在浏览器中，下面代码会输出什么？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// qustion</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>我的分析</strong></p>
<p>上述代码等价于：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> a<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    a <span class="token operator">=</span> <span class="token number">20</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a
a <span class="token operator">=</span> <span class="token number">10</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>我的答案</strong></p>
<p>输出：undefined，正如上面分析得一样：</p>
<ol>
<li>执行foo函数，函数作用域内 <code>a变量提升到作用域顶部</code></li>
<li>打印a，此时<code>a变量已声明但未赋值</code>，为undeined</li>
<li>函数内a变量赋值，执行结束a变量销毁</li>
<li>函数外变量执行</li>
</ol>
<p><strong>核心问题</strong></p>
<ul>
<li>变量提升及优先级问题</li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">作用域<OutboundLink/></a></li>
</ul>
<p>不要慌，变量提升会在之后作为JS专题系列的文章与大家见面～</p>
<p><img src="https://img-blog.csdnimg.cn/20200710181418842.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h4 id="问题二-如果上一题中的var声明改为let声明结果会一样吗" tabindex="-1"><a class="header-anchor" href="#问题二-如果上一题中的var声明改为let声明结果会一样吗" aria-hidden="true">#</a> 问题二：如果上一题中的var声明改为let声明结果会一样吗？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// qustion</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>我的分析</strong></p>
<p>上述代码等价于：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a
a <span class="token operator">=</span> <span class="token number">10</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>我的答案</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输出：ReferenceError报错
典型暂时性死区问题:
函数作用域因为let的声明而成为了一个块级作用域，且let声明的变量不会提升，并且在它声明之前使用变量即报错
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>核心问题</strong></p>
<ul>
<li>let声明</li>
<li>变量提升</li>
</ul>
<h4 id="问题三-还是和上面类似的问题-这次结果是什么" tabindex="-1"><a class="header-anchor" href="#问题三-还是和上面类似的问题-这次结果是什么" aria-hidden="true">#</a> 问题三：还是和上面类似的问题，这次结果是什么？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'World!'</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> name <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'Jack'</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Goodbye '</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello '</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>我的分析</strong></p>
<p>同样是作用域问题，我们来分析一下：</p>
<ol>
<li>全局作用域 ：var name = ‘world!’； 没什么问题</li>
<li>立即指向函数内自成作用域：if判断为
<ul>
<li><code>var name</code> // 此时name为undefined，声明为定义</li>
<li><code>if ( typeof name === ‘undefined’)</code> 判断成立</li>
<li><code>name = 'Jack'</code></li>
<li><code>console.log('Goodbye' + name )</code></li>
</ul>
</li>
</ol>
<p><strong>我的答案</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输出：“Goodbye Jack”
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>核心问题</strong></p>
<ul>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">作用域<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106824296" target="_blank" rel="noopener noreferrer">立即执行函数<OutboundLink/></a></li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/20200710182804878.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h4 id="问题四-新数组中将包含哪些元素" tabindex="-1"><a class="header-anchor" href="#问题四-新数组中将包含哪些元素" aria-hidden="true">#</a> 问题四：新数组中将包含哪些元素？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> newArr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=></span> <span class="token function">el</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ??</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>我的分析</strong></p>
<p>经典问题的变形：</p>
<ol>
<li>for循环向arr中添加了三个返回i的匿名函数</li>
<li>arr数组遍历，分别将函数执行后的返回值返回</li>
<li>返回新数组</li>
</ol>
<p><strong>我的答案</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输出：[3, 3, 3]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>核心问题</strong></p>
<ul>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">作用域<OutboundLink/></a></li>
<li>数组map方法</li>
</ul>
<h4 id="问题五-下面代码的xgetter结果是什么" tabindex="-1"><a class="header-anchor" href="#问题五-下面代码的xgetter结果是什么" aria-hidden="true">#</a> 问题五：下面代码的xGetter结果是什么？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    x<span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getX</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// prints 90</span>
<span class="token keyword">var</span> xGetter <span class="token operator">=</span> foo<span class="token punctuation">.</span>getX<span class="token punctuation">;</span>
<span class="token function">xGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// prints ??</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>我的分析</strong></p>
<p>读一遍代码：经典的this指向问题</p>
<ol>
<li>foo的属性getX保存了一个匿名函数</li>
<li>getX中保存的一个匿名函数的引用赋值给了xGetter</li>
<li>这里抓住重点：
<ul>
<li>当函数作为对象的方法调用时，this指向当前对象</li>
<li>当函数作为普通函数调用时，this指向全局对象——window</li>
</ul>
</li>
</ol>
<p>这里有疑惑的同学推荐大家看一下<a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">《this、call、apply详解，系列（一）》<OutboundLink/></a></p>
<p><strong>我的答案</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输出： 10
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>核心问题</strong></p>
<ul>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this指向分析<OutboundLink/></a></li>
</ul>
<h2 id="3">三、答案解析</h2>
<p>现在，我们试着从上至下回答一下所有的问题，在揭开它们神秘的面纱过程中，我会给大家一些简要的说明。</p>
<h4 id="问题一-在浏览器中-下面代码会输出什么-1" tabindex="-1"><a class="header-anchor" href="#问题一-在浏览器中-下面代码会输出什么-1" aria-hidden="true">#</a> 问题一：在浏览器中，下面代码会输出什么？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// qustion</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>答案：undefined</strong></p>
<p><strong>分析：</strong></p>
<p>在JavaScript中，被var关键字声明的变量会被提升，并在对应的内存中分配一个<code>undefined</code>，但真正的赋值操作却发生在赋值代码所在的位置，同样的<code>var</code>变量声明是在函数作用域中，而<code>let</code>和<code>const</code>声明的是在块级作用域中。所以下面的代码过程是这样的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 全局作用域</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// var 声明会被提升到当前作用域的顶部</span>
	<span class="token comment">// 例如var a;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出undefined，因为它已经声明，但为定义</span>
	<span class="token comment">// 而实际的赋值操作这在这一行才进行的 a = 20</span>
	<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> <span class="token comment">// 函数内作用域</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>核心问题：</strong></p>
<ul>
<li>变量提升及优先级问题（下篇文章，敬请期待～）</li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">作用域<OutboundLink/></a></li>
</ul>
<h4 id="问题二-如果上一题中的var声明改为let声明结果会一样吗-1" tabindex="-1"><a class="header-anchor" href="#问题二-如果上一题中的var声明改为let声明结果会一样吗-1" aria-hidden="true">#</a> 问题二：如果上一题中的var声明改为let声明结果会一样吗？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// qustion</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>答案： ReferenceError: a is not defined.</strong></p>
<p><strong>分析：</strong></p>
<p>let和const允许声明者在当前（作用域）块内使用该变量。与var不同，这些变量被提升到当前作用域顶部，而是具有所谓的暂时性死区问题（TDZ）。尝试在变量声明钱中访问这些变量将引发<code>ReferenceError</code>，因此只能在执行到达函数声明之后对其进行访问。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 全局作用域</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 进入函数作用域，并且产生暂时性死区（TDZ）</span>
	<span class="token comment">// 在a被声明之前，会引发错误</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
	<span class="token comment">// 暂时性死区关闭, 'a' is initialised with value of 20 here only</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>下表概述了在JavaScript中使用的不同关键字相关的<strong>提升行为</strong>和<strong>作用域</strong>(credit: <a href="https://twitter.com/rauschma" target="_blank" rel="noopener noreferrer">Axel Rauschmayer's blog<OutboundLink/></a> post).</p>
<h4 id="问题三-还是和上面类似的问题-这次结果是什么-1" tabindex="-1"><a class="header-anchor" href="#问题三-还是和上面类似的问题-这次结果是什么-1" aria-hidden="true">#</a> 问题三：还是和上面类似的问题，这次结果是什么？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'World!'</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> name <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'Jack'</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Goodbye '</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello '</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>答案：Goodbye Jack</strong></p>
<p><strong>分析：</strong></p>
<p>var声明的变量在函数作用域中进行了提升，但是它的赋值操作并没有，所以在赋值前，它被分配为<code>undefined</code>。</p>
<h4 id="问题四-新数组中将包含哪些元素-1" tabindex="-1"><a class="header-anchor" href="#问题四-新数组中将包含哪些元素-1" aria-hidden="true">#</a> 问题四：新数组中将包含哪些元素？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> newArr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=></span> <span class="token function">el</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ??</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>答案：[3, 3, 3]</strong></p>
<p><strong>分析：</strong></p>
<p>在for循环中使用var关键字声明循环的下标，将为该变量创建一个存储空间，并不断更新这个存储空间存储的值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Misunderstanding scope:thinking that block-level scope exist here</span>
<span class="token keyword">var</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 箭头函数返回的确实是变量i的值</span>
  <span class="token comment">// 他们是同一个值！！！</span>
  array<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> newArray <span class="token operator">=</span> array<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=></span> <span class="token function">el</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArray<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [3, 3, 3]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>如果你使用<code>let</code>来声明变量<code>i</code>，每一个的声明都存在不同的块级作用域中，所以个循环都会是一个新的独立的绑定。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Using ES6 block-scoped binding</span>
<span class="token keyword">var</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这次每个i都被保存在一个独立的块中，相当于当前数据的切片</span>
  array<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> newArray <span class="token operator">=</span> array<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=></span> <span class="token function">el</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArray<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [0, 1, 2]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>解决上面的问题也可以使用闭包：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> newArray <span class="token operator">=</span> array<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=></span> <span class="token function">el</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArray<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [0, 1, 2]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="问题五-下面代码的xgetter结果是什么-1" tabindex="-1"><a class="header-anchor" href="#问题五-下面代码的xgetter结果是什么-1" aria-hidden="true">#</a> 问题五：下面代码的xGetter结果是什么？</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    x<span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getX</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// prints 90</span>
<span class="token keyword">var</span> xGetter <span class="token operator">=</span> foo<span class="token punctuation">.</span>getX<span class="token punctuation">;</span>
<span class="token function">xGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// prints ??</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>答案：10</strong></p>
<p><strong>分析：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// x存在于全局作用域，等价于 window.x = 10;</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getX</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出90 当函数作为对象的方法被调用时，this指向该对象</span>
<span class="token keyword">let</span> xGetter <span class="token operator">=</span> foo<span class="token punctuation">.</span>getX<span class="token punctuation">;</span> <span class="token comment">// 注意 原本的匿名函数有了别名叫xGetter，并且它被保存到了全局</span>
<span class="token function">xGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// prints 10</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>要得到<code>foo.x</code>的值，我们需要手动绑定this的指向</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> getFooX <span class="token operator">=</span> foo<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将getX的作用域绑定到foo上</span>
<span class="token function">getFooX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// prints 90</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这里有疑惑的同学推荐大家看一下<a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">《this、call、apply详解，系列（一）》<OutboundLink/></a>！！！</p>
<h5 id="到这里-五道题就全部分析完了-如果都答对了-允许你骄傲3秒钟。这会让你了解他们背后的原理-发现自己的不足-并且更好的使用它们。如果你喜欢这篇文章-不妨点个赞-留个言吧" tabindex="-1"><a class="header-anchor" href="#到这里-五道题就全部分析完了-如果都答对了-允许你骄傲3秒钟。这会让你了解他们背后的原理-发现自己的不足-并且更好的使用它们。如果你喜欢这篇文章-不妨点个赞-留个言吧" aria-hidden="true">#</a> 到这里，五道题就全部分析完了，如果都答对了，允许你骄傲3秒钟。这会让你了解他们背后的原理，发现自己的不足，并且更好的使用它们。如果你喜欢这篇文章，不妨点个赞，留个言吧～</h5>
<h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>
<ul>
<li><a href="https://dev.to/aman_singh/so-you-think-you-know-javascript-5c26" target="_blank" rel="noopener noreferrer">So you think you know JavaScript?<OutboundLink/></a></li>
</ul>
<h2 id="4">写在做后</h2>
<p><img src="https://img-blog.csdnimg.cn/20200710182916535.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p><code>前端内功进阶系列已经第十篇了，这是本系列的最后一篇</code>，同时也在这里向大家预告下一系列——<code>《Js专项专题系列》</code>。</p>
<p>为了能让大家参与感更加强烈，希望大家可以在评论区写下自己心中的答案，一起进步～</p>
<p><strong>JavaScript内功系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this、call、apply详解，系列（一）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链，系列（二）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">从作用域到作用域链，系列（三）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106668345" target="_blank" rel="noopener noreferrer">JavaScript中的执行上下文（四）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106793254" target="_blank" rel="noopener noreferrer">JavaScript中的变量对象（五)<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106824296" target="_blank" rel="noopener noreferrer">JavaScript之自执行函数表达式（六）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106940646" target="_blank" rel="noopener noreferrer">JavaScript中的闭包，给自己一场重生（七）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/107111529" target="_blank" rel="noopener noreferrer">参数传递(求值策略)（八）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/107151991" target="_blank" rel="noopener noreferrer">JavaScript中的的数据类型（九）<OutboundLink/></a></li>
<li>本文（系列完结）</li>
</ol>
<p><strong>本《JavaScript基础内功》系列将全部更新在<a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">Gitbook中<OutboundLink/></a>，如果对您有帮助，就点个star鼓励一下吧～</strong></p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷JS，水平有限，虚心学习中</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">JavaScript版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN<OutboundLink/></a></li>
</ul>
<p>如果您看到了最后，不妨收藏、点赞、关注一下吧！您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
