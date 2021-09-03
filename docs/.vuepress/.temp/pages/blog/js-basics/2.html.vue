<template><h1 id="javascript基础-二-从原型到原型链" tabindex="-1"><a class="header-anchor" href="#javascript基础-二-从原型到原型链" aria-hidden="true">#</a> JavaScript基础（二）从原型到原型链</h1>
<blockquote>
<p>本文主要从构造函数 -&gt; 原型（隐式原型+显示原型）-&gt; 原型链的顺序，渐进式讲解，希望对你有所做帮助，共勉～</p>
</blockquote>
<p>系列文章：</p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this指向详解：思维脑图与代码的结合，让你一篇搞懂this、call、apply（附面试题）<OutboundLink/></a></li>
<li>本篇内容：请看下方目录</li>
</ol>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li><a href="#0">前言</a></li>
<li><a href="#1">一、构造函数</a></li>
<li><a href="#2">二、原型</a></li>
<li><a href="#3">三、实例与原型</a></li>
<li><a href="#4">四、原型的原型</a></li>
<li><a href="#5">五、原型链</a></li>
<li><a href="#6">六、总结</a></li>
<li><a href="#7">写在最后</a></li>
</ul>
<h2 id="0">前言</h2>
<p>又到了回忆过去的时候了，知识就是这样，原型和原型链在我之前的实习生涯中用到的很少——几乎没有（噗！我菜我摊牌了），但是它和<a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this指向问题<OutboundLink/></a>一样，是初级、中级前端开发在面试时永远绕不开的话题。是不是大家每次看面经的时候都会去搜索原型相关的知识点？</p>
<p>你看这知识，总是在考的时候，才能知道它的重要，就好像曾经有一段贼拉真挚的面试题摆在我面前...话题拉回来，今天我们就收了这个<strong>孽障</strong>！</p>
<p align=center>
<img src="https://img-blog.csdnimg.cn/20200605103052857.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" />
</p>
<h2 id="1">一、构造函数</h2>
<h5 id="_1-1-什么是构造函数" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是构造函数" aria-hidden="true">#</a> 1.1 什么是构造函数？</h5>
<p>构造函数本身就是一个函数，与普通函数没有任何区别，不过<strong>为了规范一般将其首字母大写</strong>。构造函数和普通函数的区别在于，使用<strong>new</strong>生成实例的函数就是构造函数，直接调用的就是普通函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'yuguang'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// yuguang</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在这个例子中，Person 就是一个构造函数。</p>
<h5 id="_1-2-constructor" tabindex="-1"><a class="header-anchor" href="#_1-2-constructor" aria-hidden="true">#</a> 1.2 constructor？</h5>
<p><code>constructor</code> 返回创建实例对象时构造函数的引用。此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。</p>
<p><img src="https://img-blog.csdnimg.cn/20200604185358168.png" alt="被构造出来的person的">
可以看到实例对象的constructor指向了它的构造函数，而它和原型的关系我们在之后会链接到一起。</p>
<h5 id="_1-3-都有哪些数据类型或者函数拥有constructor呢" tabindex="-1"><a class="header-anchor" href="#_1-3-都有哪些数据类型或者函数拥有constructor呢" aria-hidden="true">#</a> 1.3 都有哪些数据类型或者函数拥有<code>constructor</code>呢？</h5>
<p>在JavaScript中，每个具有<strong>原型</strong>的对象都会自动获得constructor属性。除了：<code>arguments</code>、<code>Enumerator</code>、<code>Error</code>、<code>Global</code>、<code>Math</code>、<code>RegExp</code>等一些特殊对象之外，其他所有的JavaScript内置对象都具备constructor属性。例如：<code>Array</code>、<code>Boolean</code>、<code>Date</code>、<code>Function</code>、<code>Number</code>、<code>Object</code>、<code>String</code>等。所有主流浏览器均支持该属性。打开控制台我们可以验证一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 字符串</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'str'</span><span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ String() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'str'</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> String<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// 数组</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Array() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Array<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// 数字</span>
<span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Number() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Number<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// Date</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Date() { [native code] }</span>
<span class="token comment">// 注意！！！不要混淆哦</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Number() { [native code] }</span>

<span class="token comment">// Boolean</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Boolean() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Boolean<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// 自定义函数</span>
<span class="token keyword">function</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'yuguang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>show<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Function() { [native code] }</span>

<span class="token comment">// 自定义构造函数，无返回值</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Person()</span>

<span class="token comment">// 有返回值</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token punctuation">{</span>
		name<span class="token operator">:</span> <span class="token string">'yuguang'</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// ƒ Object() { [native code] }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><h5 id="_1-4-模拟实现一个new" tabindex="-1"><a class="header-anchor" href="#_1-4-模拟实现一个new" aria-hidden="true">#</a> 1.4 模拟实现一个new</h5>
<p>既然构造函数与普通函数的区别仅仅在于调用方式上，我们就应该了解new。</p>
<ul>
<li>当调用<code>new</code>运算符时，该函数总会返回一个对象；</li>
<li>通常情况下，构造器里的this就指向返回的这个对象；</li>
</ul>
<p>代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>通常情况下
<span class="token keyword">var</span> <span class="token function-variable function">MyClass</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'yuguang'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// yuguang</span>

特殊情况
<span class="token keyword">var</span> <span class="token function-variable function">MyClass</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'yuguang'</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token punctuation">{</span>
		name<span class="token operator">:</span> <span class="token string">'老王'</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>name <span class="token comment">// 老王</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>我们利用 <code>__proto__</code>（隐式原型，下文会提到）属性来模拟一下new 调用构造函数的过程：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">objectNew</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 从object.prototype上克隆一个空的对象</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 取得外部传入的构造器，这里是Person</span>
    <span class="token keyword">var</span> Constructor <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span> arguments <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 更新，指向正确的原型</span>
    obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Constructor</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">//知识点，要考、要考、要考</span>
    <span class="token comment">// 借用外部传入的构造器给obj设置属性</span>
    <span class="token keyword">var</span> ret <span class="token operator">=</span> <span class="token function">Constructor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 确保构造器总是返回一个对象</span>
    <span class="token keyword">return</span> <span class="token keyword">typeof</span> ref <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> ret <span class="token operator">:</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p align=center>
<img src="https://img-blog.csdnimg.cn/2020060516301968.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="50%" />
</p>
<h2 id="2">二、原型</h2>
<h5 id="_2-1-prototype-显式原型" tabindex="-1"><a class="header-anchor" href="#_2-1-prototype-显式原型" aria-hidden="true">#</a> 2.1 prototype(显式原型)</h5>
<p>JavaScript 是一种基于原型的语言 (prototype-based language)，在设计的时候模仿了Java的两套类型机制：<code>基本类型</code> 和 <code>对象类型</code>。可见原型很重要！</p>
<p>每个对象都拥有一个原型对象，类是以函数的形式来定义的。prototype表示该函数的原型，也表示一个类的成员的集合。看下图：
<img src="https://img-blog.csdnimg.cn/20200605140618427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述">
可以发现Person函数自己的原型都有什么：</p>
<ul>
<li><code>constructor</code> (Person.prototype.constructor =&gt; Person)</li>
<li><code>__proto__</code> （我们称它为隐式原型）</li>
</ul>
<p>此时我们得到了第一张表示构造函数和实例原型之间的关系图：</p>
<p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dlYmJqOTcvc3VtbWFyeS9tYXN0ZXIvSW1hZ2VzL3Byb3RvdHlwZTEucG5n?x-oss-process=image/format,png" alt="构造函数和实例原型的关系图"></p>
<p>那么我们该怎么表示实例与构造函数原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们就要讲到第二个属性：</p>
<h5 id="_2-2-proto-隐式原型" tabindex="-1"><a class="header-anchor" href="#_2-2-proto-隐式原型" aria-hidden="true">#</a> 2.2 <strong>proto</strong>(隐式原型)</h5>
<p>这是每一个JavaScript对象(除了 null )都具有的一个属性，叫<code>__proto__</code>，这是一个访问器属性（即 getter 函数和 setter 函数），通过它可以访问到对象的内部<code> [[Prototype]]</code> (一个对象或 null )。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>于是我们更新下关系图：</p>
<p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dlYmJqOTcvc3VtbWFyeS9tYXN0ZXIvSW1hZ2VzL3Byb3RvdHlwZTIucG5n?x-oss-process=image/format,png" alt="实例与实例原型的关系图"></p>
<p><strong>小结：</strong> 每个引用类型的隐式原型都指向它的构造函数的显式原型</p>
<h5 id="_2-3-constructor" tabindex="-1"><a class="header-anchor" href="#_2-3-constructor" aria-hidden="true">#</a> 2.3 constructor</h5>
<p>前文提到了<code>constructor</code>，它与原型的关系也可以添加到这张图里，更新下关系图：</p>
<p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dlYmJqOTcvc3VtbWFyeS9tYXN0ZXIvSW1hZ2VzL3Byb3RvdHlwZTMucG5n?x-oss-process=image/format,png" alt="实例原型与构造函数的关系图">
根据上图的关系，下面这段的结果，大家就一目了然了：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>__proto__ <span class="token operator">==</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">==</span> Person<span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token comment">// 顺便学习一个ES5的方法,可以获得对象的原型</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>接下来我们要继续思考实例和原型的关系：</p>
<h2 id="3">三、实例与原型</h2>
<p>当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。这样一个查找过程</p>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'老王'</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// 余光</span>

<span class="token keyword">delete</span> person<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// 老王</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 余光（is me）。</p>
<p><strong>描述：</strong></p>
<p>但是当我们删除了 person 的 name 属性后，再次读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.<strong>proto</strong> ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 老王（这...）</p>
<p><strong>总结：</strong></p>
<ul>
<li>尝试遍历<code>实例a</code>中的所有属性，但没有找到目标属性；</li>
<li>查找<code>name</code>属性的这个请求被委托给该<code>实例a</code>的构造器(<code>A</code>)的原型，它被<code>a.__proto__</code> 记录着并且指向A.prototype；</li>
<li>A.prototype存在目标属性，返回他的值；</li>
</ul>
<p>但是万一还没有找到呢？原型的原型又是什么呢？</p>
<h2 id="4">四、原型的原型</h2>
<p>在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'余光'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// 余光</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>其实原型对象就是通过<code>Object</code>构造函数生成的，结合之前所讲，实例的 <code>__proto__</code> 指向构造函数的 <code>prototype</code> ，可以理解成，<code>Object.prototype()</code>是所有对象的根对象，所以我们再次更新下关系图：</p>
<p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dlYmJqOTcvc3VtbWFyeS9tYXN0ZXIvSW1hZ2VzL3Byb3RvdHlwZTQucG5n?x-oss-process=image/format,png" alt="原型的原型关系图"></p>
<h2 id="5">五、原型链</h2>
<p>每个对象拥有一个原型对象，通过 <code>__proto__</code> 指针指向上一个原型 ，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向 <code>null</code>。<strong>这种关系被称为原型链</strong> (prototype chain)，通过原型链一个对象会拥有定义在其他对象中的属性和方法。</p>
<p>这个链条存在着终点，是因为：Object.prototype 的原型是——null，引用阮一峰老师的 <a href="http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html" target="_blank" rel="noopener noreferrer">《undefined与null的区别》<OutboundLink/></a> 就是：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>null 表示“没有对象”，即该处不应该有值。这句话也意味着 Object.prototype 没有原型
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我们最后更新一次关系图，蓝色线条就可以表示原型链这种关系。</p>
<p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dlYmJqOTcvc3VtbWFyeS9tYXN0ZXIvSW1hZ2VzL3Byb3RvdHlwZTUucG5n?x-oss-process=image/format,png" alt="原型链示意图"></p>
<h5 id="补充-易错点" tabindex="-1"><a class="header-anchor" href="#补充-易错点" aria-hidden="true">#</a> 补充，易错点</h5>
<p><strong>1.constructor</strong>
首先是 constructor 属性，我们看个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Person<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>person<span class="token punctuation">.</span>constructor <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>2.<code>__proto__</code></strong></p>
<p>其次是 <strong>proto</strong> ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.<strong>proto</strong> 时，可以理解成返回了 Object.getPrototypeOf(obj)。</p>
<p><strong>3.真的是继承吗？</strong></p>
<p>最后是关于继承，前面我们讲到“每一个对象都会从原型‘继承’属性”，实际上，继承是一个十分具有迷惑性的说法，引用《你不知道的JavaScript》中的话，就是：</p>
<p>继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，<strong>委托</strong>的说法反而更准确些。</p>
<h2 id="6">六、总结</h2>
<ul>
<li>使用<strong>new</strong>生成实例的函数就是构造函数，直接调用的就是普通函数；</li>
<li>每个对象都拥有一个原型对象；</li>
<li>每个引用类型的隐式原型都指向它的构造函数的显式原型；</li>
<li>Object.prototype是所有对象的根对象；</li>
<li>原型链存在终点，不会无限查找下去；</li>
</ul>
<p><strong>参考</strong></p>
<ul>
<li>《JavaScript设计模式与开发实践》</li>
<li><a href="https://muyiy.cn/" target="_blank" rel="noopener noreferrer">木易杨前端进阶<OutboundLink/></a></li>
<li><a href="https://segmentfault.com/a/1190000008959943" target="_blank" rel="noopener noreferrer">JavaScript深入之从原型到原型链<OutboundLink/></a></li>
</ul>
<p align=center>
<img width="60%" src="https://img-blog.csdnimg.cn/20200605160129120.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" />
</p>
<h2 id="7">写在最后</h2>
<p>JavaScript内功基础部分已经总结到第二篇了，本系列大约会有15篇文章，都是我们在面试最高频的，但工作中常常被忽略的。</p>
<p><strong>JavaScript内功系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/106479511" target="_blank" rel="noopener noreferrer">this指向详解，思维脑图与代码的结合，让你一篇搞懂this、call、apply。系列（一）<OutboundLink/></a></li>
<li>本文</li>
<li>下一篇预发：作用域和作用域链</li>
</ol>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
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
	<img width="60%" src="https://img-blog.csdnimg.cn/20200605160449553.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" />
</p>
</template>
