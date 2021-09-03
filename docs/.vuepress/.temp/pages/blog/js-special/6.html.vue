<template><h1 id="javascript专题-六-数据类型检测的那些事" tabindex="-1"><a class="header-anchor" href="#javascript专题-六-数据类型检测的那些事" aria-hidden="true">#</a> JavaScript专题（六）数据类型检测的那些事</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>在<a href="https://blog.csdn.net/jbj6568839z/article/details/107151991" target="_blank" rel="noopener noreferrer">《JavaScript的数据类型》<OutboundLink/></a>中我们也提到过简单的类型检测问题。</p>
<p>作为前端的同学，我们应该都知道可以使用typeof和instanceof在运行时判断JavaScript数据的类型，那么他们都是怎么判断的呢？一千个人会不会写出来一千个判断方法？</p>
<p>本文会从通用的typeof、到专攻对象的instanceof，再到isNull、isNumber、isString等方法，来讨论如何判断数据类型，一起加油～</p>
<p><img src="https://img-blog.csdnimg.cn/20200820190630893.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、typeof" tabindex="-1"><a class="header-anchor" href="#一、typeof" aria-hidden="true">#</a> 一、typeof</h2>
<p><strong>typeof：<code>操作符</code>返回一个字符串，表示未经计算的操作数的类型。</strong></p>
<p>我们都知道，在 ES6 前，JavaScript 共六种数据类型，分别是：</p>
<ol>
<li>Undefined</li>
<li>Null</li>
<li>Boolean</li>
<li>Number</li>
<li>String</li>
<li>Object</li>
</ol>
<p>然而当我们使用 typeof 对这些数据类型的值进行操作的时候，返回的结果却不是一一对应，分别是：</p>
<ol>
<li>Undefined</li>
<li>object -- ***</li>
<li>Boolean</li>
<li>Number</li>
<li>String</li>
<li>Object</li>
</ol>
<p>有一些意外，<code>typeof null =&gt; 'object'</code> 且 <code>typeof function(){} =&gt; 'function'</code></p>
<p>所以在大多数情况下我们可以使用typeof来检测基本数据类型，但是，检测得到的<code>Object</code>后，却无法区分是哪一种Object：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
<span class="token keyword">typeof</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
<span class="token keyword">typeof</span> <span class="token keyword">null</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>总结</strong></p>
<p>👉🏻 在检测Js的原始类型时，除了<code>typeof null</code>返回<code>object</code>之外，其他的都返回对应类型名的小写字母。</p>
<h2 id="二、instanceof" tabindex="-1"><a class="header-anchor" href="#二、instanceof" aria-hidden="true">#</a> 二、instanceof</h2>
<p>我们判断对象类型的时候，可以使用instanceof：</p>
<p>如果对原型及原型链不太熟悉的同学不妨看看这篇文章<a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链<OutboundLink/></a></p>
<p><strong>定义</strong></p>
<p>instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。</p>
<p><strong>实例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr <span class="token keyword">instanceof</span> <span class="token class-name">Array</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Array</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>💡 注意instanceof是能匹配类型的父类的，所以arr instanceof Array和arr instanceof Object都是true，因为Object是Array的父类。</p>
<p>满足<code>class extends</code>和<code>原型链规则</code>的父子类关系的对象都能被匹配：</p>
<p><strong>class</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Base</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Current</span> <span class="token keyword">extends</span> <span class="token class-name">Base</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Current</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Current</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Base</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>原型链</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">Bar</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Bar</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Foo</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>⚠️ 注意如果我们修改obj的原型链能改变instanceof的结果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Other</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Other</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Other</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Foo</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>总结</strong></p>
<p>👉🏻 instanceof借助了原型链来判断的实际上，只要一个类型<code>Type</code>的prototype在一个<code>对象obj</code>的原型链上，那么<code>obj instanceof Type</code>就是true，否则就是false。</p>
<h2 id="三、constructor" tabindex="-1"><a class="header-anchor" href="#三、constructor" aria-hidden="true">#</a> 三、constructor</h2>
<p>有时候我们不希望匹配父类型，只希望匹配当前类型，那么我们可以用constructor来判断：</p>
<p>如果对原型及原型链不太熟悉的同学不妨看看这篇文章<a href="https://blog.csdn.net/jbj6568839z/article/details/106555301" target="_blank" rel="noopener noreferrer">从原型到原型链<OutboundLink/></a></p>
<p><strong>定义</strong></p>
<p>返回创建实例对象的 <code>Object</code> 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。</p>
<p><strong>实例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Array<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Object<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>👉🏻 对象的constructor会返回它的类型，而类型在定义的时候，会创建一个name只读属性，值为类型的名字。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Foo<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Foo</span>

<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">'Foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>疑问</strong></p>
<ul>
<li>constructor.name 一定就是正确的吗？</li>
<li>我们可以修改它吗？</li>
</ul>
<h2 id="四、stringtag是什么" tabindex="-1"><a class="header-anchor" href="#四、stringtag是什么" aria-hidden="true">#</a> 四、stringTag是什么？</h2>
<h4 id="_4-1-stringtag——类型标签" tabindex="-1"><a class="header-anchor" href="#_4-1-stringtag——类型标签" aria-hidden="true">#</a> 4.1 stringTag——类型标签</h4>
<p>如果你看过一些库的早期实现，你会发现使用<code>Object.prototype.toString</code>来做类型判断的方式，他们会数据类型的字符串标志，被称作<code>stringTag</code>；</p>
<h4 id="_4-2-object-prototype-tostring" tabindex="-1"><a class="header-anchor" href="#_4-2-object-prototype-tostring" aria-hidden="true">#</a> 4.2 Object.prototype.toString</h4>
<p><strong>定义</strong></p>
<p><code>toString() </code>方法返回一个表示该对象的字符串。</p>
<p>每个对象都有一个 <code>toString()</code> 方法，当该对象被表示为一个文本值时，默认情况下，<code>toString()</code> 方法被每个 Object 对象继承。</p>
<p>⚠️ 如果此方法在自定义对象中未被覆盖，toString() 返回 &quot;[object type]&quot;，其中 type 是对象的类型。以下代码说明了这一点：</p>
<p><strong>实例</strong></p>
<p>比如这是requirejs里面的代码片段。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> ostring <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">isArray</span><span class="token punctuation">(</span><span class="token parameter">it</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">ostring</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Array]'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>toString时都做了什么？</strong></p>
<p>这里直接将冴羽大大的总结搬了过来:</p>
<blockquote>
<p>When the toString method is called, the following steps are taken:</p>
</blockquote>
<blockquote>
<ol>
<li>If the this value is undefined, return &quot;[object Undefined]&quot;.</li>
<li>If the this value is null, return &quot;[object Null]&quot;.</li>
<li>Let O be the result of calling ToObject passing the this value as the argument.</li>
<li>Let class be the value of the [[Class]] internal property of O.</li>
<li>Return the String value that is the result of concatenating the three Strings &quot;[object &quot;, class, and &quot;]&quot;.</li>
</ol>
</blockquote>
<p>当 toString 方法被调用的时候，下面的步骤会被执行：</p>
<ol>
<li>如果 this 值是 undefined，就返回 [object Undefined]</li>
<li>如果 this 的值是 null，就返回 [object Null]</li>
<li>让 O 成为 ToObject(this) 的结果</li>
<li>让 class 成为 O 的内部属性 [[Class]] 的值</li>
<li>最后返回由 &quot;[object &quot; 和 class 和 &quot;]&quot; 三个部分组成的字符串</li>
</ol>
<p><strong>注意</strong></p>
<p>有几点我们需要注意：</p>
<ul>
<li>toString无法区分原始类型及其构造对象；
<ul>
<li>我们认为Number、Boolean这种类型在被构造器构造出来后的类型应该是<code>对象</code>；</li>
<li>但toString都会返回[object number]等原始类型；</li>
</ul>
</li>
<li>toString方法是可以自定义的；</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/20200820190847236.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="五、实现几个数据检测的方法" tabindex="-1"><a class="header-anchor" href="#五、实现几个数据检测的方法" aria-hidden="true">#</a> 五、实现几个数据检测的方法</h2>
<p>好了看了几款常用的类型判断方法后，我们可不可以实现自己的类型判断工具？就利用上述提到的一个或多个方法。我们自己动手丰衣足食～</p>
<h4 id="_5-1-isobject" tabindex="-1"><a class="header-anchor" href="#_5-1-isobject" aria-hidden="true">#</a> 5.1 isObject</h4>
<p>注意，我们认为null不是一个对象，它就是null～</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isObject</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> type <span class="token operator">=</span> <span class="token keyword">typeof</span> value<span class="token punctuation">;</span>
    <span class="token keyword">return</span> value <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">||</span> type <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="_5-2-isnull" tabindex="-1"><a class="header-anchor" href="#_5-2-isnull" aria-hidden="true">#</a> 5.2 isNull</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isNull</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_5-3-isfunction" tabindex="-1"><a class="header-anchor" href="#_5-3-isfunction" aria-hidden="true">#</a> 5.3 isFunction</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isFunction</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_5-4-isarray" tabindex="-1"><a class="header-anchor" href="#_5-4-isarray" aria-hidden="true">#</a> 5.4 isArray</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> isArray <span class="token operator">=</span> Array<span class="token punctuation">.</span>isArray <span class="token operator">||</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">value</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">type</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"array"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_5-5-stringtag" tabindex="-1"><a class="header-anchor" href="#_5-5-stringtag" aria-hidden="true">#</a> 5.5 stringTag</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> toString <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getTag</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// if (value === null) return '[object Null]';</span>
    <span class="token comment">// if (value == null) return '[object Undefined]'</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token string">'[object Undefined]'</span> <span class="token operator">:</span> <span class="token string">'[object Null]'</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>好了到最后，大家平时对类型检测的态度是什么样的呢？</p>
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
<p>如果您看到了最后，对文章有任何建议，都可以在评论区留言</p>
<p>这是<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">文章所在GitHub仓库的传送门<OutboundLink/></a>，如果真的对您有所帮助，希望可以点个star，这是对我最大的鼓励 ～</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p></template>
