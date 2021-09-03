<template><h1 id="javascript基础-五-变量对象" tabindex="-1"><a class="header-anchor" href="#javascript基础-五-变量对象" aria-hidden="true">#</a> JavaScript基础（五）变量对象</h1>
<blockquote>
<p>本篇文章：主要介绍执行上下文的组成部分之一——变量对象（VO）。本文是与系列的前几篇文章存在一定的承接关系，大家感兴趣的话不妨从头阅读～</p>
</blockquote>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#1">前言</a></li>
<li><a href="#2">一、变量对象</a></li>
<li><a href="#3">二、全局变量对象</a></li>
<li><a href="#4">三、函数变量对象</a></li>
<li><a href="#5">写在最后</a></li>
</ul>
<h2 id="1">前言</h2>
<p>JavaScript编程的时候总避免不了声明函数和变量，以成功构建我们的系统，但是解释器是如何并且在什么地方去查找这些函数和变量呢？我们引用这些对象的时候究竟发生了什么？</p>
<p>在上篇<a href="https://blog.csdn.net/jbj6568839z/article/details/106668345" target="_blank" rel="noopener noreferrer">《JavaScript中的执行上下文》<OutboundLink/></a>中我们提到了一部分，当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。</p>
<p>对于每个执行上下文，都有三个重要属性：</p>
<ul>
<li>变量对象(Variable object，VO)</li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">作用域链(Scope chain)<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this<OutboundLink/></a></li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/20200617170620309.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="2">一、变量对象</h2>
<p>在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。</p>
<p>活动对象和变量对象<strong>其实是一个东西</strong>：</p>
<ol>
<li>变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问</li>
<li>只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。</li>
</ol>
<p>这里附上一张<a href="https://www.zhihu.com/question/36393048" target="_blank" rel="noopener noreferrer">貘大<OutboundLink/></a>对于两者关系的回答：
<img src="https://img-blog.csdnimg.cn/20200617175522666.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>我们可以将变量对象的创建过程用代码模拟一下：</p>
<p>1.我们用普通的对象来表示变量对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token constant">VO</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 变量对象</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>2.而变量对象是执行上下文的一个属性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>activeContext <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">VO</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 上下文数据（var, FD, function arguments)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>3.当我们遇到下面的代码时：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">func</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>4.对应的变量对象应该是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 全局变量对象</span>
<span class="token constant">VO</span><span class="token punctuation">(</span>Global<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    func<span class="token operator">:</span> reference to <span class="token keyword">function</span> <span class="token function">plus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// func函数上下文的变量对象</span>
<span class="token constant">VO</span><span class="token punctuation">(</span>func functionContext<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token number">20</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>因为不同执行上下文下的变量对象稍有不同，所以我们分开来说。</p>
<p><img src="https://img-blog.csdnimg.cn/20200617184106673.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="3">二、全局变量对象</h2>
<p>我们先了解一个概念，叫全局对象。在 <a href="http://www.w3school.com.cn/jsref/jsref_obj_global.asp" target="_blank" rel="noopener noreferrer">W3School<OutboundLink/></a> 中也有介绍：</p>
<blockquote>
<p>全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。</p>
</blockquote>
<p>1.可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Window</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>2.全局对象是由 Object 构造函数实例化的一个对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>3.预定义了一堆，嗯，一大堆函数和属性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 都能生效</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//随机数</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//随机数</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>4.作为全局变量的宿主（很牛的样子）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>5.客户端 JavaScript 中，全局对象有 window 属性指向自身。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>

<span class="token keyword">this</span><span class="token punctuation">.</span>window<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>而全局上下文中的<code>变量对象</code>就是全局对象！</p>
<p><img src="https://img-blog.csdnimg.cn/20200617172922952.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="4">三、函数上下文中的变量对象</h2>
<p>在函数执行上下文中，VO是不能直接访问的，此时由<code>活动对象</code>(activation object,缩写为AO)扮演<code>VO</code>的角色。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">VO</span><span class="token punctuation">(</span>functionContext<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token constant">AO</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>活动对象是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。arguments属性的值是Arguments对象：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">AO</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    arguments<span class="token operator">:</span> <span class="token operator">&lt;</span>ArgO<span class="token operator">></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Arguments对象是活动对象的一个属性，它包括如下属性：</p>
<ol>
<li>callee — 指向当前函数的引用</li>
<li>length — 真正传递的参数个数</li>
<li>properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。</li>
<li>properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是共享的。</li>
</ol>
<p>我们来看下面代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token comment">// 声明的函数参数数量arguments (x, y, z)</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>

  <span class="token comment">// 真正传进来的参数个数(only x, y)</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>arguments<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

  <span class="token comment">// 参数的callee是函数自身</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>arguments<span class="token punctuation">.</span>callee <span class="token operator">===</span> foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

  <span class="token comment">// 参数共享</span>

  <span class="token function">alert</span><span class="token punctuation">(</span>x <span class="token operator">===</span> arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>

  arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 20</span>

  x <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 30</span>

  <span class="token comment">// 不过，没有传进来的参数z，和参数的第3个索引值是不共享的</span>

  z <span class="token operator">=</span> <span class="token number">40</span><span class="token punctuation">;</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>arguments<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>

  arguments<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 40</span>

<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h4 id="_3-1-执行过程" tabindex="-1"><a class="header-anchor" href="#_3-1-执行过程" aria-hidden="true">#</a> 3.1 执行过程</h4>
<p>执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：</p>
<ol>
<li>进入执行上下文</li>
<li>代码执行</li>
</ol>
<h4 id="_3-2-进入执行上下文" tabindex="-1"><a class="header-anchor" href="#_3-2-进入执行上下文" aria-hidden="true">#</a> 3.2 进入执行上下文</h4>
<p>当进入执行上下文时，这时候还没有执行代码，</p>
<p>变量对象会包括：</p>
<ol>
<li>
<p>函数的所有形参 (如果是函数上下文)</p>
<ul>
<li>由名称和对应值组成的一个变量对象的属性被创建</li>
<li>没有实参，属性值设为 undefined</li>
</ul>
</li>
<li>
<p>函数声明</p>
<ul>
<li>由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建</li>
<li>如果变量对象已经存在相同名称的属性，则完全替换这个属性</li>
</ul>
</li>
<li>
<p>变量声明</p>
<ul>
<li>由名称和对应值（undefined）组成一个变量对象的属性被创建；</li>
<li>如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性</li>
</ul>
</li>
</ol>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">var</span> <span class="token function-variable function">d</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>在进入执行上下文后，这时候的 AO 是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">AO</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    arguments<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token number">0</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        length<span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    c<span class="token operator">:</span> reference to <span class="token keyword">function</span> <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    d<span class="token operator">:</span> <span class="token keyword">undefined</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="_3-3-代码执行" tabindex="-1"><a class="header-anchor" href="#_3-3-代码执行" aria-hidden="true">#</a> 3.3 代码执行</h4>
<p>在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值</p>
<p>还是上面的例子，当代码执行完后，这时候的 AO 是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">AO</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    arguments<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token number">0</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        length<span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    c<span class="token operator">:</span> reference to <span class="token keyword">function</span> <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    d<span class="token operator">:</span> reference to FunctionExpression <span class="token string">"d"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>到这里变量对象的创建过程就介绍完了，让我们简洁的总结我们上述所说：</p>
<ol>
<li>全局上下文的变量对象初始化是全局对象;</li>
<li>函数上下文的变量对象初始化只包括 Arguments 对象;</li>
<li>在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值;</li>
<li>在代码执行阶段，会再次修改变量对象的属性值;</li>
</ol>
<h2 id="思考题" tabindex="-1"><a class="header-anchor" href="#思考题" aria-hidden="true">#</a> 思考题</h2>
<p>最后让我们看几个例子：</p>
<p><strong>1.第一题</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ???</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ???</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>第一段会报错：<code>Uncaught ReferenceError: a is not defined</code>。</p>
<p>第二段会打印：<code>1</code>。</p>
<p>这是因为函数中的 &quot;a&quot; 并没有通过 var 关键字声明，所有不会被存放在 AO 中。</p>
<p>第一段执行 console 的时候， AO 的值是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">AO</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    arguments<span class="token operator">:</span> <span class="token punctuation">{</span>
        length<span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>没有 a 的值，然后就会到全局去找，全局也没有，所以会报错。</p>
<p>当第二段执行 console 的时候，全局对象已经被赋予了 a 属性，这时候就可以从全局找到 a 的值，所以会打印 1。</p>
<p><strong>2.第二题</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"foo"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>会打印函数，而不是 undefined 。</p>
<p>这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>《你不知道的JavaScript》</li>
<li><a href="https://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html" target="_blank" rel="noopener noreferrer">深入理解变量对象<OutboundLink/></a></li>
</ul>
<h2 id="5">写在最后</h2>
<p>JavaScript内功基础部分已经总结到第四篇了，本系列大约会有10篇文章，都是我们在面试最高频的，但工作中常常被忽略的知识点。</p>
<p><strong>JavaScript内功系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this、call、apply详解，系列（一）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链，系列（二）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106618708" target="_blank" rel="noopener noreferrer">从作用域到作用域链，系列（三）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106668345" target="_blank" rel="noopener noreferrer">JavaScript中的执行上下文（四）<OutboundLink/></a></li>
<li>本文</li>
<li>下一篇预告，讲烂了的闭包，自己不谈一次总感觉少点什么</li>
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
</ul>
<p>如果您看到了最后，不妨收藏、点赞、评论一下吧！！！
持续更新，您的三连就是我最大的动力，虚心接受大佬们的批评和指点，共勉！</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
