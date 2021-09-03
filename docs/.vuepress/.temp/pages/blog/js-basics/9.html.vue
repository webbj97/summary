<template><h1 id="javascript基础-九-基本数据类型" tabindex="-1"><a class="header-anchor" href="#javascript基础-九-基本数据类型" aria-hidden="true">#</a> JavaScript基础（九）基本数据类型</h1>
<blockquote>
<p>在上一篇<a href="">JavaScript中的参数传递</a>一文中，我们了解到了值传递、引用传递、共享传递，三种传递的第一层区别就在于传入参数的数据类型不同，所以这次，我们来讲讲Js中的数据类型。
本篇文章是根据《你不知道的Js》第一部分延伸扩展出来的。一个较基础的问题，它很适合放在整个面试的前几问，面试官会根据你的回答确定之后问题的走向，比如当你回答基本数据类型时少回答了一个<code>String</code>，那么面试官很可能就会问你<code>String都有哪些方法哦～</code></p>
</blockquote>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录：</h2>
<ul>
<li><a href="#1">一、类型</a></li>
<li><a href="#2">二、数据类型分类</a></li>
<li><a href="#3">三、常见问题</a></li>
<li><a href="#4">写在最后</a></li>
</ul>
<h2 id="1">一、类型</h2>
<p>可能许多习惯了C++、C#这类静态语言（强类型）语言的小伙伴们在编写Js代码时，会很不习惯，因为相对于静态语言来说，Js甚至没有类型的”概念“。</p>
<p>而且Js中吐槽较多的恰恰就包含类型转换，在我们日常写代码时总是遇到或显示或隐示的类型转换，比如：</p>
<p>你要获取数字<code>123</code>的个位十位百位，你会怎么做？</p>
<ul>
<li>toSrting()后通过下标获取？</li>
<li>取整取余？</li>
</ul>
<p>使用类型转换形式多样。有些方式简明易懂，也很安全，然而稍不留神，就会出现意想不到的结果。</p>
<p>为了学习和掌握类型转换，现在先让我们来深入了解一下值和类型。</p>
<h4 id="内置类型" tabindex="-1"><a class="header-anchor" href="#内置类型" aria-hidden="true">#</a> 内置类型</h4>
<p>JavaScript 拥有<strong>动态类型</strong>，这意味着相同的变量可用作不同的类型：类型是值的内部特征，它定义了值的行为，以使其区别于其他值。</p>
<p><strong>JavaScript中的内置类型:</strong></p>
<ul>
<li>null</li>
<li>undefined</li>
<li>布尔值（boolean）</li>
<li>数字（number）</li>
<li>字符串（string）</li>
<li>对象（Object）</li>
<li>symbol（ES6新增）</li>
</ul>
<p>对于null和undefined大家一定不陌生，我们会在第三节简单的分析他们之前的区别。</p>
<p><img src="https://img-blog.csdnimg.cn/20200707141653286.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="2">二、数据类型分类</h2>
<p>除了<strong>对象</strong>，其他几个都是<strong>基本类型</strong>，这是因为声明变量时不同的内存分配而决定的：</p>
<h4 id="_2-1-基本类型" tabindex="-1"><a class="header-anchor" href="#_2-1-基本类型" aria-hidden="true">#</a> 2.1 基本类型</h4>
<p>JavaScript 中共有 6 种基本数据类型：<code>Undefined</code>、<code>Null</code>、<code>Boolean</code>、<code>Number</code>、<code>String</code>、<code>Symbol</code>。</p>
<p><code>基本类型</code>存储在<code>栈（stack）中</code>，也就是说：</p>
<ul>
<li>它们的值<strong>直接存储在变量访问的位置</strong>。</li>
<li>这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – <code>栈</code>中。</li>
<li>这样存储便于迅速查寻变量的值。</li>
<li>基本类型的值是按值访问的，且基本类型的值是不可变的。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">"123hello321"</span><span class="token punctuation">;</span>
str<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 123HELLO321</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 123hello321</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>基本类型的比较是它们的值的比较：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">==</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// == 只进行值的比较</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">===</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// === 不仅进行值得比较，还要进行数据类型的比较</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>有关符号运算，优先级的问题，我觉得应该将它放在Js专题系列，单独讨论它们才能比较透彻，这里就不过多解释了。</p>
<p>来看下面的代码，我们用图示来分析它</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a<span class="token punctuation">,</span>b
a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> a<span class="token punctuation">;</span>
a <span class="token operator">=</span> <span class="token string">'字符串'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20200707105321216.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h4 id="_2-2-引用类型" tabindex="-1"><a class="header-anchor" href="#_2-2-引用类型" aria-hidden="true">#</a> 2.2 引用类型</h4>
<p><code>引用类型</code>存储在<code>堆（heap）</code>中的对象，也就是说:</p>
<ul>
<li>存储在变量处的值是一个指针（point），指向存储对象的内存地址。</li>
<li>引用类型的值是按引用访问的，且引用类型的值是<code>可变</code>的。</li>
<li>变量存储的是可以打开保存数据的房间的<code>钥匙</code></li>
<li><code>存储钥匙地址</code>的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。</li>
</ul>
<p>除过上面的 6 种基本数据类型外，剩下的就是引用类型了，统称为 Object 类型。细分的话，有：</p>
<ul>
<li>Object</li>
<li>Array</li>
<li>Date</li>
<li>RegExp</li>
<li>Function</li>
<li>...</li>
</ul>
<p><strong>引用类型的比较是引用的比较：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>    <span class="token comment">// 新建一个空对象 obj1</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>    <span class="token comment">// 新建一个空对象 obj2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1 <span class="token operator">==</span> obj2<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1 <span class="token operator">===</span> obj2<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>因为 obj1 和 obj2 分别引用的是存放在堆内存中的2个不同的对象，故变量 obj1 和 obj2 的值（引用地址）也是不一样的！</p>
<p>来看下面的代码，我们用图示来分析它</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'余光'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b<span class="token punctuation">;</span>
b <span class="token operator">=</span> a<span class="token punctuation">;</span>
a<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"yuguang"</span><span class="token punctuation">;</span>
b<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">23</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">23</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20200707114641540.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h4 id="_2-3-小结" tabindex="-1"><a class="header-anchor" href="#_2-3-小结" aria-hidden="true">#</a> 2.3 小结</h4>
<p><strong>基本类型</strong></p>
<ul>
<li>栈内存中包括了变量的标识符和变量的值</li>
</ul>
<p><strong>引用类型</strong></p>
<ul>
<li>栈内存中保存了变量标识符和指向堆内存中该对象的指针</li>
<li>堆内存中保存了对象的内容</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/20200707141806752.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="3">三、常见问题</h2>
<h4 id="_3-1-javascript中的变量是没有类型的" tabindex="-1"><a class="header-anchor" href="#_3-1-javascript中的变量是没有类型的" aria-hidden="true">#</a> 3.1 JavaScript中的变量是没有类型的</h4>
<p>来看下面的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token comment">// 严格地说 变量a没有类型，它所保存的 100是数字类型的</span>
<span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">'number'</span><span class="token punctuation">;</span> <span class="token comment">// 其实检测是=>typeof 100</span>

a <span class="token operator">=</span> <span class="token string">'string'</span>
<span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>变量a</code>可以随时持有任何类型的<code>值</code>。换个角度来理解就是，JavaScript不做“类型强制”；也就是说，语言引擎不要求变量总是持有与其初始值同类型的值。</p>
<h4 id="_3-2-typeof检测不总是对的" tabindex="-1"><a class="header-anchor" href="#_3-2-typeof检测不总是对的" aria-hidden="true">#</a> 3.2 typeof检测不总是对的</h4>
<p><img src="https://img-blog.csdnimg.cn/20200706185843137.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p>需要注意的点：</p>
<p><strong>number</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 基本数学API和属性</span>
<span class="token keyword">typeof</span> Math<span class="token punctuation">.</span><span class="token constant">LN2</span> <span class="token operator">===</span> <span class="token string">'number'</span><span class="token punctuation">;</span> <span class="token comment">// true  Math的属性</span>
<span class="token keyword">typeof</span> <span class="token number">Infinity</span> <span class="token operator">===</span> <span class="token string">'number'</span><span class="token punctuation">;</span> <span class="token comment">// true 无穷</span>
<span class="token keyword">typeof</span> <span class="token number">NaN</span> <span class="token operator">===</span> <span class="token string">'number'</span><span class="token punctuation">;</span> <span class="token comment">// true 特殊的数字类型，not a number</span>
<span class="token comment">// 被强转称数字的其他数据类型</span>
<span class="token keyword">typeof</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'str'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'number'</span><span class="token punctuation">;</span> <span class="token comment">// Number('str') => NaN => number</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>string</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">;</span> <span class="token comment">// typeof always returns a string</span>
<span class="token keyword">typeof</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">;</span> <span class="token comment">// 强转成字符串</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>布尔值</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'boolean'</span><span class="token punctuation">;</span> <span class="token comment">// 强制类型转换</span>
<span class="token keyword">typeof</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'boolean'</span><span class="token punctuation">;</span> <span class="token comment">// two calls of the ! (logical NOT) operator are equivalent to Boolean()</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>Symble</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'symbol'</span>
<span class="token keyword">typeof</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'symbol'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>undefined</strong></p>
<p>一个没有被赋值的变量的数据类型是<code>undefined</code>(如果方法或者是语句中操作的变量没有被赋值，则会返回undefined) —— MDN</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token keyword">undefined</span> <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>object</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'余光'</span> <span class="token punctuation">}</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>null</strong></p>
<p>值得我们注意恰恰是这个<code>null</code>,typeof 对它的处理返回的是<code>object</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token keyword">null</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>function</strong></p>
<p>typeof检测函数返回的也是object，这是因为从规范上看<code>function</code>实际上是<code>object</code>的一个子类型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Functions</span>
<span class="token keyword">typeof</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">;</span>
<span class="token keyword">typeof</span> <span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>那么你还知道其他检测数据类型的方式吗？</p>
<h4 id="_3-3-null和undefined" tabindex="-1"><a class="header-anchor" href="#_3-3-null和undefined" aria-hidden="true">#</a> 3.3 null和undefined</h4>
<ul>
<li>null：特指对象的值未设置。它是 <code>JavaScript 基本类型</code> 之一。
<ul>
<li>它不是全局对象的一个属性;</li>
<li>在 API 中，null 常在返回类型应是一个对象，但没有关联的值的地方使用。</li>
</ul>
</li>
<li>undefined：表示声明但未被赋值的变量类型
<ul>
<li>你可以使用<code>undefined</code>和严格相等或不相等操作符来决定一个变量是否拥有值。</li>
</ul>
</li>
</ul>
<p><strong>他们的区别：</strong></p>
<p>当检测 null 或 undefined 时，注意相等 <code>==</code>与<code>===</code>两个操作符的区别 ，前者会执行类型转换：</p>
<ul>
<li>typeof检测时两者的返回值不同</li>
<li>代表的含义不同</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token keyword">null</span>        <span class="token comment">// "object" (因为一些以前的原因而不是'null')</span>
<span class="token keyword">typeof</span> <span class="token keyword">undefined</span>   <span class="token comment">// "undefined"</span>
<span class="token keyword">null</span> <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token comment">// false</span>
<span class="token keyword">null</span>  <span class="token operator">==</span> <span class="token keyword">undefined</span> <span class="token comment">// true</span>
<span class="token keyword">null</span> <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token comment">// true</span>
<span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token comment">// true</span>
<span class="token operator">!</span><span class="token keyword">null</span> <span class="token comment">//true</span>
<span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="4">写在最后</h2>
<blockquote>
<p>目前，前端内功系列已经是第九篇了，虚心接受大家的批评和指正，如果能对您有帮助，希望您关注、收藏、点赞一波哦～</p>
</blockquote>
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
<li>本文</li>
<li>你真的了解Js吗？（上）</li>
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
