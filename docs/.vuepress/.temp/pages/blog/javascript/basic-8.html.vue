<template><h1 id="javascript基础-八-参数传递" tabindex="-1"><a class="header-anchor" href="#javascript基础-八-参数传递" aria-hidden="true">#</a> JavaScript基础（八）参数传递</h1>
<blockquote>
<p>本篇文章主要讲的是JavaScript中最正常不过的现象——函数参数传递，本篇文章篇幅不长，但一定能引发属于你自己的思考！
大家可能会发现，系列的最近几篇文章都围绕着函数来讲，毕竟作为Js中的一等公民，它无处不在；</p>
</blockquote>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#1">前言</a></li>
<li><a href="#2">一、值传递</a></li>
<li><a href="#3">二、引用传递</a></li>
<li><a href="#4">三、共享传递</a></li>
<li><a href="#5">四、总结</a></li>
<li><a href="#6">写在最后</a></li>
</ul>
<h2 id="1">前言</h2>
<blockquote>
<p>目前，前端内功系列已经是第八篇了，也想听听大家的意见，无论是写作风格和之后几篇文章的侧重点，大家都可以提哦～</p>
</blockquote>
<p>在研究这个问题之前，大家可以回忆一下，Js基本的数据类型有哪些？如果分类？</p>
<ul>
<li>原始数据类型值 primitive type，比如<code>Undefined</code>,<code>Null</code>,<code>Boolean</code>,<code>Number</code>,<code>String</code>。</li>
<li>引用类型值，也就是对象类型 Object type,``比如Object<code>,</code>Array<code>,</code>Function<code>,</code>Date`等。</li>
</ul>
<p>为什么这么分类？</p>
<p>因为声明变量时不同的内存分配：</p>
<ul>
<li>
<p>原始值：存储在栈（stack）中的简单数据段，也就是说，它们的值<strong>直接存储在变量访问的位置</strong>。它可以直接存储，是因为这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – <code>栈</code>中。这样存储便于迅速查寻变量的值。</p>
</li>
<li>
<p>引用值：存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存地址。你可以想像成房间内放着你需要的物品，而你手里拿着房间的钥匙。这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，通过记录<code>钥匙</code>就可以找到对应存储的数据。是的<code>存储钥匙地址</code>的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。</p>
</li>
</ul>
<h2 id="2">一、值传递</h2>
<p>在红宝书中，曾经提到：<code>ECMAScript中所有函数的参数都是按值传递的</code>。也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。</p>
<p><strong>基本类型值的传递如同基本类型变量的复制一样：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">addTen</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    num <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> num<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">addTen</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//20，没有变化</span>
<span class="token function">alert</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//30</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这样的结果大家应该都理解，被传入函数的数据并没被修改，</p>
<h2 id="3">二、引用传递</h2>
<p>参数传递的另一种传递方式——<code>引用传递</code>：函数接收的不是值的拷贝，而是对象的隐式引用。（因为拷贝复杂的数据结构会在性能上产生问题），我们来看下面的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> group <span class="token operator">=</span> <span class="token punctuation">{</span>
    num<span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    obj<span class="token punctuation">.</span>num <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'obj:'</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">func</span><span class="token punctuation">(</span>group<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { num: 20 }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>我是这样理解的：</p>
<ol>
<li>实际上是给了函数一把<code>钥匙A</code>，<code>钥匙A</code>上记录着哪个房间保存着函数需要的东西，函数就配了一把一摸一样的<code>钥匙B</code>；</li>
<li>之后函数用<code>钥匙B</code>打开了对应的房间，对房间的物品进行了改变，离开房间；</li>
<li>转过身来你又用<code>钥匙A</code>打开了这个房间，你意识到了函数其实改变了房间的布局；</li>
<li>而为什么是配了一把钥匙呢？显然配一把<code>钥匙</code>比建造一间一模一样的<code>房间</code>，要简单靠谱的多吧？</li>
</ol>
<h4 id="一句话概括本节" tabindex="-1"><a class="header-anchor" href="#一句话概括本节" aria-hidden="true">#</a> 一句话概括本节</h4>
<p>按引用传递：函数内部对参数的任何改变都是影响该对象在函数外部的值，因为两者引用的是同一个对象，也就是说：这时候参数就相当于外部对象的一个别名。</p>
<h2 id="4">三、共享传递（call by sharing）</h2>
<p>该策略是1974年由Barbara Liskov为CLU编程语言提出的。</p>
<p>**该策略的要点是：**函数接收的是对象对于的拷贝（副本），该引用拷贝和形参以及其值相关联。</p>
<p>这里出现的引用，我们不能称之为“按引用传递”，因为函数接收的参数不是直接的对象别名，而是该引用地址的拷贝。</p>
<p>**最重要的区别就是：**函数内部给参数重新赋新值不会影响到外部的对象（和上例按引用传递的case），但是因为该参数是一个地址拷贝，所以在外面访问和里面访问的都是同一个对象（例如外部的该对象不是想按值传递一样完全的拷贝),改变该参数对象的属性值将会影响到外部的对象。</p>
<p>我们来看下面的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    o <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>上面的例子就是传入<code>Object类型</code>的但结果却和<code>引用传递</code>不同。</p>
<p>有很多开发人员（包括我）错误地认为：在局部作用域中修改的对象会在全局作用域中反映出来，
就说明参数是按引用传递的。我们再看一看《你不知道的Js》中的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   obj<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"余光"</span><span class="token punctuation">;</span>
   obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   obj<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"未知"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setName</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>setName()函数中添加了两行代码：</strong></p>
<ol>
<li>为 <code>obj</code> 重新定义了一个对象；</li>
<li>为该对象定义了一个带有不同值的 <code>name</code> 属性；</li>
<li>将 <code>obj.name</code> 属性设置为'未知'（注意此时obj和外部传入的obj有哪些联系？）</li>
</ol>
<p><strong>为什么会这样？</strong></p>
<ol>
<li>虽然在函数内部修改了参数的值，但原始的引用仍然保持未变。</li>
<li>这是因为，当在函数内部重写 <code>obj</code> 时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销毁。</li>
</ol>
<h4 id="一句话概括本节-1" tabindex="-1"><a class="header-anchor" href="#一句话概括本节-1" aria-hidden="true">#</a> 一句话概括本节</h4>
<p>共享传递不可能去解除引用和改变对象本身，但可以去修改该对象的属性值。</p>
<h2 id="5">四、总结</h2>
<p>我们来总结一下前面几节最核心的内容：</p>
<ul>
<li></li>
</ul>
<h2 id="6">写在最后</h2>
<p><img src="https://img-blog.csdnimg.cn/20200628181744114.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="5">写在最后</h2>
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
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106940646" target="_blank" rel="noopener noreferrer">JavaScript中的闭包，给自己一场重生（七）<OutboundLink/></a></li>
<li>本文</li>
<li>下篇预告：Js中的数据类型都有哪些？</li>
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
