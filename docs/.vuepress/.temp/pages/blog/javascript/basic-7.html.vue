<template><h1 id="javascript基础-七-闭包" tabindex="-1"><a class="header-anchor" href="#javascript基础-七-闭包" aria-hidden="true">#</a> JavaScript基础（七）闭包</h1>
<blockquote>
<p>闭包——非常重要但又难以掌握的概念，理解闭包可以看作是某种意义上的重生——《你不知道的Js》
虽然关于闭包，虽然大家可能已经看腻了，但我仍要试着去总结下它！！！</p>
</blockquote>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#1">前言</a></li>
<li><a href="#2">一、什么是闭包？</a></li>
<li><a href="#3">二、分析闭包</a></li>
<li><a href="#4">三、经典问题</a></li>
<li><a href="#5">写在最后</a></li>
</ul>
<h2 id="1">前言</h2>
<p>大家在阅读这篇文章之前，不妨先阅读一下我的前面几篇文章作为前置知识：</p>
<ul>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">JavaScript中的作用域（系列三）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106668345" target="_blank" rel="noopener noreferrer">JavaScript重的执行上下文（系列四）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106793254" target="_blank" rel="noopener noreferrer">JavaScript之深入变量对象（系列五）<OutboundLink/></a></li>
</ul>
<h2 id="2">一、什么是闭包</h2>
<p>顾名思义，遇见问题先问为什么是我们一贯的思维方式，我们尝试回答一下：</p>
<ol>
<li>闭包就是函数内部的子函数—— <code>等于没说</code></li>
<li>当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。——<code>靠谱</code></li>
<li>闭包就是能够读取其他函数内部变量的函数，在本质上是函数内部和函数外部链接的桥梁——<code>靠谱</code></li>
<li>函数和对其周围状态（词法环境）的引用捆绑在一起构成闭包（closure）——<code>很靠谱</code></li>
</ol>
<p>我们试着用代码来描述一下上面的回答，看看你最<strong>中意</strong>哪一个～</p>
<h4 id="_1-1-闭包是函数内部的子函数" tabindex="-1"><a class="header-anchor" href="#_1-1-闭包是函数内部的子函数" aria-hidden="true">#</a> 1.1 闭包是函数内部的子函数</h4>
<p>先看这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>基于词法作用域的查找规则，<code>bar函数</code>可以成功的打印<code>a</code>变量，并且它也是<code>foo</code>的子函数，但严格来说它并没有清晰的表达出闭包这一概念，说它表达的是<strong>嵌套函数可以访问声明于大外部作用域的变量</strong>更准确一些。</p>
<h4 id="_1-2-闭包就是能够读取其他函数内部变量的函数-在本质上是函数内部和函数外部链接的桥梁" tabindex="-1"><a class="header-anchor" href="#_1-2-闭包就是能够读取其他函数内部变量的函数-在本质上是函数内部和函数外部链接的桥梁" aria-hidden="true">#</a> 1.2 闭包就是能够读取其他函数内部变量的函数，在本质上是函数内部和函数外部链接的桥梁</h4>
<p>再来看下面的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> bar<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">res</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>结果一致，这是因为此时<code>res</code>是执行<code>foo</code>函数时返回的<code>bar</code>引用，bar函数得以保存了它饿词法环境。</p>
<h4 id="_1-3-函数和对其周围状态-词法环境-的引用捆绑在一起构成闭包-closure" tabindex="-1"><a class="header-anchor" href="#_1-3-函数和对其周围状态-词法环境-的引用捆绑在一起构成闭包-closure" aria-hidden="true">#</a> 1.3 函数和对其周围状态（词法环境）的引用捆绑在一起构成闭包（closure）</h4>
<p>我们来看下面代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>foo的上下文被静态的保存了下来，而且是在该函数创建的时候就保存了。下面我们来验证一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
<span class="token punctuation">}</span>

<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'老王'</span><span class="token punctuation">;</span>

    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这里我们就可以理解——函数被创建后就形成了闭包，他们保存了上层上下文的作用域链，并且保存在<code>[[scope]]</code>中，如果你对<code>[[scope]]</code>的概念已经模糊了，不妨花几分钟看看<a href="https://blog.csdn.net/jbj6568839z/article/details/106668345" target="_blank" rel="noopener noreferrer">《JavaScript中的执行上下文》<OutboundLink/></a>这篇文章。</p>
<h4 id="_1-4-总结" tabindex="-1"><a class="header-anchor" href="#_1-4-总结" aria-hidden="true">#</a> 1.4 总结</h4>
<p><strong>注意：闭包是函数内部的返回的子函数这句话本身没错</strong>，但要看从什么角度出发：</p>
<p>ECMAScript中，闭包指的是：</p>
<ol>
<li>从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。</li>
<li>从实践角度：以下函数才算是闭包：
<ul>
<li>即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）</li>
<li>在代码中引用了自由变量</li>
</ul>
</li>
</ol>
<p><strong>总结：</strong></p>
<ul>
<li>闭包代码块创建该代码块的上下文中数据的结合</li>
<li>闭包就是能够读取其他函数内部变量的函数，在本质上是函数内部和函数外部链接的桥梁</li>
<li>不同的角度对闭包的解释不同的</li>
</ul>
<p>注意：这些并不是闭包的全部，就好像当你被问到——闭包是什么的时候，你的上述回答并不能结束这个话题，往往会引申出更多的话题。</p>
<p><img src="https://img-blog.csdnimg.cn/20200628143159683.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="3">二、尝试分析闭包</h2>
<p>还是那段经典代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"global scope"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">checkscope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> scope <span class="token operator">=</span> <span class="token string">"local scope"</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> scope<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> f<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token function">checkscope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// local scope</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>首先我们要分析一下这段代码中执行上下文栈和执行上下文的变化情况。</p>
<ol>
<li>进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈</li>
<li>全局执行上下文初始化</li>
<li>执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈</li>
<li>checkscope 执行上下文初始化，创建变量对象、作用域链、this等</li>
<li>checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出</li>
<li>执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈</li>
<li>f 执行上下文初始化，创建变量对象、作用域链、this等</li>
<li>f 函数执行完毕，f 函数上下文从执行上下文栈中弹出</li>
</ol>
<p><img src="https://img-blog.csdnimg.cn/20200628152924827.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p>当 <code>f</code> 函数执行的时候，<code>checkscope</code> 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 <code>checkscope</code> 作用域下的 <code>scope</code> 值呢？</p>
<p>当我们了解了具体的执行过程后，我们知道 f 执行上下文维护了一个作用域链：</p>
<p>因为这个作用域链：</p>
<ul>
<li><code>f 函数</code>依然可以读取到 <code>checkscopeContext.AO</code> 的值；</li>
<li>当 <code>f 函数</code>引用了 <code>checkscopeContext.AO</code> 中的值的时候，即使 <code>checkscopeContext</code> 被销毁了，JavaScript 依然会让 <code>checkscopeContext.AO</code> 活在内存中;</li>
<li><code>f 函数</code>依然可以通过 <code>f 函数</code>的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。</li>
</ul>
<p>多么浪漫的思想——只要你需要我，那我我本应该被销毁，你也能找到我～</p>
<p><img src="https://img-blog.csdnimg.cn/20200628173236105.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="4">三、经典问题</h2>
<h4 id="_3-1-多个对象引用同一个-scope-你遇到过吗" tabindex="-1"><a class="header-anchor" href="#_3-1-多个对象引用同一个-scope-你遇到过吗" aria-hidden="true">#</a> 3.1 多个对象引用同一个[[Scope]]，你遇到过吗？</h4>
<p>直接上代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> child1<span class="token punctuation">;</span>
<span class="token keyword">var</span> child2<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token function-variable function">child1</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">++</span>x<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function-variable function">child2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">--</span>x<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">child1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token function">child1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
<span class="token function">child2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>大家可能不理解，<code>child1</code>和<code>child</code>他们两个函数在创建后都保存了上层上下文，万万没想到，<strong>同一个上下文创建的闭包是共用一个<code>[[scope]]</code>属性的</strong>，某个闭包对其中[[Scope]]的变量做修改会影响到其他闭包对其变量的读取。</p>
<h4 id="_3-2-闭包轻松解决的经典问题" tabindex="-1"><a class="header-anchor" href="#_3-2-闭包轻松解决的经典问题" aria-hidden="true">#</a> 3.2 闭包轻松解决的经典问题</h4>
<p>大家一定对下面这段代码很眼熟：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
arr<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
arr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>我们这么解释它：<strong>同一个上下文中创建的闭包是共用一个[[Scope]]属性的</strong>。</p>
<p>因此上层上下文中的变量<code>i</code>是可以很容易就被改变的。</p>
<p>arr[0],arr[1]...arr[9]他们共用一个[[scope]]，最终执行的时候结果当然一样。</p>
<p><strong>如何利用闭包来解决这个问题呢？</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
arr<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
arr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>我们通过立即执行匿名函数的方式隔离了作用域，当执行 arr[0] 函数的时候，arr[0] 函数的作用域链发生了改变：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>Context <span class="token operator">=</span> <span class="token punctuation">{</span>
    Scope<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token constant">AO</span><span class="token punctuation">,</span> 匿名函数Context<span class="token punctuation">.</span><span class="token constant">AO</span> globalContext<span class="token punctuation">.</span><span class="token constant">VO</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>匿名函数执行上下文的AO为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>匿名函数Context <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token constant">AO</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        arguments<span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token number">0</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            length<span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        i<span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>我们看到，这时函数的<code>[[Scope]]</code>属性就有了真正想要的值了，为了达到这样的目的，我们不得不在<code>[[Scope]]</code>中创建额外的变量对象。要注意的是，在返回的函数中，如果要获取<code>i</code>的值，那么该值还是会是10。</p>
<h4 id="_3-3-总结" tabindex="-1"><a class="header-anchor" href="#_3-3-总结" aria-hidden="true">#</a> 3.3 总结</h4>
<ul>
<li>函数内的所有内部函数都共享一个父作用域，因此创建的闭包是共用的。</li>
<li>利用闭包隔离作用域的特性可以解决共享作用域的问题</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/20200628181744114.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html" target="_blank" rel="noopener noreferrer">深入理解JavaScript<OutboundLink/></a></li>
<li>《你不知道的JavaScript》</li>
</ul>
<h2 id="5">写在最后</h2>
<p><strong>JavaScript内功系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this、call、apply详解，系列（一）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链，系列（二）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">从作用域到作用域链，系列（三）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106668345" target="_blank" rel="noopener noreferrer">JavaScript中的执行上下文（四）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106793254" target="_blank" rel="noopener noreferrer">JavaScript中的变量对象（五)<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106824296" target="_blank" rel="noopener noreferrer">JavaScript之自执行函数表达式（六）<OutboundLink/></a></li>
<li>本文</li>
<li>javaScript中函数的参数传递详解</li>
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
