<template><h1 id="javascript基础-六-立即调用函数" tabindex="-1"><a class="header-anchor" href="#javascript基础-六-立即调用函数" aria-hidden="true">#</a> JavaScript基础（六）立即调用函数</h1>
<blockquote>
<p>本篇文章，主要讲解的立即执行函数或自执行匿名函数的含义、用法、以及使用它的主要场景。系列的前面几篇文章主要讲解了作用域、原型、执行上下文，本篇文章一样起到了承上启下的作用，如果您感兴趣，不妨去看看哦～ <a href="https://blog.csdn.net/jbj6568839z/category_10069610.html" target="_blank" rel="noopener noreferrer">传送门<OutboundLink/></a></p>
</blockquote>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#1">一、了解立即调用函数表达式</a></li>
<li><a href="#2">二、立即调用函数表达式报错了？</a></li>
<li><a href="#3">三、使用立即调用函数的正确姿势</a></li>
<li><a href="#4">四、常见使用场景</a></li>
<li><a href="#5">写在最后</a></li>
</ul>
<h2 id="1">一、了解立即调用函数表达式</h2>
<h5 id="_1-1-思维导图" tabindex="-1"><a class="header-anchor" href="#_1-1-思维导图" aria-hidden="true">#</a> 1.1 思维导图</h5>
<p><img src="https://img-blog.csdnimg.cn/20200622113604893.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h5 id="_1-2-什么是立即调用" tabindex="-1"><a class="header-anchor" href="#_1-2-什么是立即调用" aria-hidden="true">#</a> 1.2 什么是立即调用？</h5>
<p>在详细了解这个之前，我们来谈了解一下“自执行”这个叫法，本文对这个功能的叫法也不一定完全对，每个人对他的理解都不一样，我们在这里用<code>立即调用</code>～</p>
<p>立即调用：</p>
<ul>
<li>顾名思义，该表达式一被<code>创建就立即执行</code>。</li>
<li>是一个在定义时就会立即执行的  <code>JavaScript 函数</code>。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'x + x = '</span><span class="token punctuation">,</span> x <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// x + x = 10</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这是一个被称为 <code>自执行匿名函数</code> 的设计模式，主要包含两部分:</p>
<ol>
<li>第一部分是包围在 圆括号运算符 <code>()</code> 里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。</li>
<li>第二部分再一次使用 <code>()</code> 创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。</li>
</ol>
<h5 id="_1-3-核心问题" tabindex="-1"><a class="header-anchor" href="#_1-3-核心问题" aria-hidden="true">#</a> 1.3 核心问题</h5>
<p><strong>当你声明一个函数的时候，通过在后面加括号就可以实现立即执行吗？</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光 成功了！</span>

<span class="token comment">// ...是不是意味着后面加个括弧都可以自动执行？</span>
<span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">''</span>余光<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Uncaught SyntaxError: Function statements require a function name</span>
<span class="token comment">// 什么？还需要一个函数名？不是叫 自执行匿名函数吗？</span>

<span class="token comment">// 我加上了函数名</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Uncaught SyntaxError: Unexpected token ')'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>很显然，例子中的第二条和第三条确实报错了，而且报错内容不一样，那么问题出现在哪呢？</p>
<p><img src="https://img-blog.csdnimg.cn/20200622113720823.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="2">二、立即调用函数表达式报错了？</h2>
<p>有时，我们定义函数之后，立即调用该函数，这时不能在函数的定义后面直接加圆括号，这会产生语法错误。产生语法错误的原因是，<code>function</code> 这个关键字，既可以当做语句，也可以当做表达式，比如下边：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//语句</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//表达式</span>
<span class="token keyword">var</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>为了避免解析上的歧义，JS引擎规定，如果function出现在行首，一律解析成语句。因此JS引擎看到行首是function关键字以后，认为这一段都是函数定义，不应该以<code>括号结尾</code>，在它看来<code>括号</code>只是分组操作符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 下面这个function在语法上是没问题的，但是依然只是一个语句</span>
<span class="token comment">// 加上括号()以后依然会报错，因为分组操作符需要包含表达式</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">/* code */</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// SyntaxError: Unexpected token )</span>

<span class="token comment">// 但是如果你在括弧()里传入一个表达式，将不会有异常抛出</span>
<span class="token comment">// 但是foo函数依然不会执行</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">/* code */</span> <span class="token punctuation">}</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 因为它完全等价于下面这个代码，一个function声明后面，又声明了一个毫无关系的表达式：</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">/* code */</span> <span class="token punctuation">}</span>

<span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20200622113818808.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="3">三、使用立即调用函数的正确姿势</h2>
<p>要解决上述问题，非常简单。</p>
<p>我们只需要用<code>大括弧</code>将代码的代码全部括住就行了，因为JavaScript里<code>括弧()</code>里面不能包含语句，所以在这一点上，解析器在解析function关键字的时候，会将相应的代码解析成function表达式，而不是function声明。</p>
<h5 id="_3-1-常见使用姿势" tabindex="-1"><a class="header-anchor" href="#_3-1-常见使用姿势" aria-hidden="true">#</a> 3.1 常见使用姿势</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 下面2个括弧()都会立即执行</span>

<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* code */</span> <span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 推荐使用这个</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* code */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 但是这个也是可以用的</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h5 id="_3-2-不常见的使用姿势-一" tabindex="-1"><a class="header-anchor" href="#_3-2-不常见的使用姿势-一" aria-hidden="true">#</a> 3.2 不常见的使用姿势（一）</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 由于括弧()和JS的&amp;&amp;，异或，逗号等操作符是在函数表达式和函数声明上消除歧义的</span>
<span class="token comment">// 所以一旦解析器知道其中一个已经是表达式了，其它的也都默认为表达式了</span>

<span class="token keyword">var</span> <span class="token function-variable function">i</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>

<span class="token boolean">true</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>

<span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h5 id="_3-3-不常见的使用姿势-二" tabindex="-1"><a class="header-anchor" href="#_3-3-不常见的使用姿势-二" aria-hidden="true">#</a> 3.3 不常见的使用姿势（二）</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 如果你不在意返回值，或者不怕难以阅读</span>
<span class="token comment">// 你甚至可以在function前面加一元操作符号</span>

<span class="token comment">//转bool</span>
<span class="token keyword">var</span> res1 <span class="token operator">=</span> <span class="token operator">!</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'res1:'</span><span class="token punctuation">,</span> res1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光 true</span>

<span class="token comment">// 转数字</span>
<span class="token keyword">var</span> res2 <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'res2:'</span><span class="token punctuation">,</span> res2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光 NaN</span>

<span class="token comment">// 按位非</span>
<span class="token keyword">var</span> res3 <span class="token operator">=</span> ～<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'res3:'</span><span class="token punctuation">,</span> res3<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光 NaN</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h5 id="_3-4-不常见的使用姿势-三" tabindex="-1"><a class="header-anchor" href="#_3-4-不常见的使用姿势-三" aria-hidden="true">#</a> 3.4 不常见的使用姿势（三）</h5>
<p>还有一个情况，使用new和void关键字，不过不太常见罢了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">void</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="4">四、常见使用场景</h2>
<h5 id="_4-1-隔离作用域" tabindex="-1"><a class="header-anchor" href="#_4-1-隔离作用域" aria-hidden="true">#</a> 4.1 隔离作用域</h5>
<p>IIFE最常见的功能，就是隔离作用域，在ES6之前JS原生也没有块级作用域的概念，所以需要函数作用域来模拟。</p>
<p>举例:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> currentTime <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> time <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> year  <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">getFullYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> month <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> date  <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">getDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> hour  <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">getHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> min   <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">getMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> year <span class="token operator">+</span> <span class="token string">'-'</span> <span class="token operator">+</span> month <span class="token operator">+</span> <span class="token string">'-'</span> <span class="token operator">+</span> date <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> hour <span class="token operator">+</span> <span class="token string">':'</span> <span class="token operator">+</span> min<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>你仍然可以在其他地方声明同名变量～</p>
<h5 id="_4-2-惰性函数" tabindex="-1"><a class="header-anchor" href="#_4-2-惰性函数" aria-hidden="true">#</a> 4.2  惰性函数</h5>
<p>DOM事件添加中，为了兼容现代浏览器和IE浏览器，我们需要对浏览器环境进行一次判断：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> addEvent <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>addEventListener<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> el<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> fn<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>attachEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> el<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            el<span class="token punctuation">.</span><span class="token function">attachEvent</span><span class="token punctuation">(</span><span class="token string">'on'</span> <span class="token operator">+</span> type<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h5 id="_4-3-用闭包保存状态" tabindex="-1"><a class="header-anchor" href="#_4-3-用闭包保存状态" aria-hidden="true">#</a> 4.3 用闭包保存状态</h5>
<p>这里我仅举个例子，为我的下一篇文章——《JavaScript中的闭包》卖个关子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> elems <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> elems<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">lockedInIndex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        elems<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'I am link #'</span> <span class="token operator">+</span> lockedInIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h5 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h5>
<p>当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">"Barry"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 无法从外部访问变量 name</span>
name <span class="token comment">// 抛出错误："Uncaught ReferenceError: name is not defined"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">"Barry"</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// IIFE 执行后返回的结果：</span>
result<span class="token punctuation">;</span> <span class="token comment">// "Barry"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.zhihu.com/question/35832285?sort=created" target="_blank" rel="noopener noreferrer"> 《为什么要有js立即执行函数，存在的意义是什么？》<OutboundLink/></a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F" target="_blank" rel="noopener noreferrer">IIFE（立即调用函数表达式）<OutboundLink/></a></li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/20200622125329530.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="5">写在最后</h2>
<p><strong>JavaScript内功系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this、call、apply详解，系列（一）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链，系列（二）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">从作用域到作用域链，系列（三）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106668345" target="_blank" rel="noopener noreferrer">JavaScript中的执行上下文（四）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106793254" target="_blank" rel="noopener noreferrer">JavaScript中的变量对象（五)<OutboundLink/></a></li>
<li>本文</li>
<li>JavaScript中的闭包</li>
</ol>
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
<p>如果您看到了最后，不妨收藏、点赞、评论一下吧！！！
持续更新，您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
