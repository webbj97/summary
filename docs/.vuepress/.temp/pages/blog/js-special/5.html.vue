<template><h1 id="javascript专题-五-深浅拷贝" tabindex="-1"><a class="header-anchor" href="#javascript专题-五-深浅拷贝" aria-hidden="true">#</a> JavaScript专题（五）深浅拷贝</h1>
<blockquote>
<p>了解拷贝背后的过程，避免不必要的错误，Js专题系列之深浅拷贝，我们一起加油～</p>
</blockquote>
<h2 id="一、拷贝示例" tabindex="-1"><a class="header-anchor" href="#一、拷贝示例" aria-hidden="true">#</a> 一、拷贝示例</h2>
<p>当我们在操作数据之前，可能会遇到这样的情况：</p>
<ol>
<li>会经常改动一组数据，但可能会用到原始数据</li>
<li>我需要两组一样的数据，但我不希望改动一个另一个随之改动</li>
<li>我需要对数据操作前后进行对比</li>
<li>...</li>
</ol>
<p>当我们遇到类似需要场景时，首先想到的就是拷贝它，殊不知拷贝也大有学问哦～</p>
<p>下面简单的例子，你是否觉得熟悉？</p>
<h4 id="_1-1-基本类型拷贝示例" tabindex="-1"><a class="header-anchor" href="#_1-1-基本类型拷贝示例" aria-hidden="true">#</a> 1.1 基本类型拷贝示例</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'How are you'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newStr <span class="token operator">=</span> str<span class="token punctuation">;</span>
newStr <span class="token operator">=</span> <span class="token number">10</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// How are you</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newStr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>大家都能想到，字符串是基本类型，它的值保存在栈中，在对它进行拷贝时，其实是为新变量开辟了新的空间。 <code>str</code>和<code>newStr</code>就好比两个一模一样的房间，布局一致却毫无关联。</p>
<h4 id="_1-2-引用类型拷贝示例" tabindex="-1"><a class="header-anchor" href="#_1-2-引用类型拷贝示例" aria-hidden="true">#</a> 1.2 引用类型拷贝示例</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newData <span class="token operator">=</span> data<span class="token punctuation">;</span>
newData<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newData<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>类似的代码段，但这次我们使用数组这个引用类型举例，你会发现修改赋值后的数据，原始数据也跟着改变了，这显然不满足我们的需要。本篇文章就来聊一聊<strong>引用数据拷贝的学问</strong>。</p>
<p><strong>如果大家对Js的数据类型存在着疑问，不妨看看<a href="https://blog.csdn.net/jbj6568839z/article/details/107151991" target="_blank" rel="noopener noreferrer">《JavaScript中的基本数据类型》<OutboundLink/></a></strong></p>
<p><img src="https://img-blog.csdnimg.cn/20200812185110705.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="二、浅拷贝" tabindex="-1"><a class="header-anchor" href="#二、浅拷贝" aria-hidden="true">#</a> 二、浅拷贝</h2>
<p>拷贝的划分都是针对引用类型来讨论的，浅拷贝——顾名思义，浅拷贝就是“浅层拷贝”，实际上只做了表面功夫：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newArr <span class="token operator">=</span> arr<span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> newArr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1,2,3,4] [1,2,3,4]</span>
newArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> newArr<span class="token punctuation">)</span> <span class="token comment">// [100,2,3,4] [100,2,3,4]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>不发生事情（操作）还好，一旦对新数组进行了操作，两个变量中所保存的数据都会发生改变。</p>
<p>发生这类情况的原因也是因为<code>引用类型</code>的基本特性：</p>
<ul>
<li>存储在变量处的值是一个指针（point），指向存储对象的内存地址。赋值给新变量相当于配了一把新钥匙，房间并没有换。</li>
</ul>
<p>数组中的slice和concat都会返回一个新数组，我们一起来试一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> res <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 或者</span>
res <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1,2,3,4]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这个问题这么快就解决了？虽然对这一层数据进行了这样的的处理后，确实解决了问题，但！</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> age<span class="token operator">:</span> <span class="token number">23</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newArr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// [ {age: 18}, [100,2,3,4] ]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span> <span class="token comment">// [ {age: 18}, [100,2,3,4] ]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>果然事情没有那么简单，这也是因为数据类型的不同。</p>
<p><code>JS</code> 不允许我们直接操作内存中的地址，也就是说不能操作对象的内存空间，所以，我们对对象的操作都只是在操作它的引用而已。</p>
<p>既然<code>浅拷贝</code>达不到我们的要求，本着<strong>效率</strong>的原则，我们找找有没有帮助我们实现<code>深拷贝</code>的方法。</p>
<p><img src="https://img-blog.csdnimg.cn/20200812185132249.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="三、深拷贝的方法" tabindex="-1"><a class="header-anchor" href="#三、深拷贝的方法" aria-hidden="true">#</a> 三、深拷贝的方法？</h2>
<p>数据的方法失败了，还有没有其他办法？我们需要实现真正意义上的拷贝出独立的数据。</p>
<h4 id="_3-1-json" tabindex="-1"><a class="header-anchor" href="#_3-1-json" aria-hidden="true">#</a> 3.1 JSON</h4>
<p>这里我们利用JSON的两个方法，<code>JSON.stringify()</code>，<code>JSON.parse() </code>来实现最简洁的深拷贝</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'str'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>age<span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">}</span><span class="token punctuation">]</span>

<span class="token keyword">var</span> newArr <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
newArr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['str', 1, true, [1, 2], {age: 23}]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['str', 1, true, [100, 2], {age: 23}]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这个方法应该是实现深拷贝最简洁的方法，但是，<strong>它仍然存在问题</strong>，我们先来看看刚才都做了些什么：</p>
<ol>
<li>定义一个包含都过类型的数组<code>arr</code></li>
<li>JSON.stringify(arr), 将一个 JavaScript 对象或值转换为 <code>JSON 字符串</code></li>
<li>JSON.parse(xxx), 方法用来解析JSON字符串，构造由字符串描述的<code>值或对象</code></li>
</ol>
<p><strong>理解：</strong></p>
<p>我们可以理解为，将原始数据转换为<code>新字符串</code>，再通过<code>新字符串</code>还原为一个<code>新对象</code>，这中改变数据类型的方式，间接的绕过了拷贝对象引用的过程，也就谈不上影响原始数据。</p>
<p><strong>限制：</strong></p>
<p>这种方式成立的根本就是保证数据在“中转”时的完整性，而<code>JSON.stringify()</code>将值转换为相应的<code>JSON格式</code>时也有缺陷：</p>
<ul>
<li>undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。</li>
<li>函数、undefined 被单独转换时，会返回 undefined，
<ul>
<li>如JSON.stringify(function(){})</li>
<li>JSON.stringify(undefined)</li>
</ul>
</li>
<li>对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。</li>
<li>NaN 和 Infinity 格式的数值及 null 都会被当做 null。</li>
<li>其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。</li>
</ul>
<p>所以当我们拷贝函数、undefined等<code>stringify</code>转换有问题的数据时，就会出错，我们在实际开发中也要结合实际情况使用。</p>
<p><strong>举一反三：</strong></p>
<p>既然是通过改变数据类型来绕过拷贝引用这一过程，那么单纯的数组深拷贝是不是可以通过现有的几个API来实现呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> newArr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token function">Number</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
newArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1,2,3]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newArr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [100,2,3]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>注意，此时仅能对包含纯数字的数组进行深拷贝，因为：</p>
<ol>
<li>toString无法正确的处理对象和函数</li>
<li>Number无法处理 false、undefined等数据类型</li>
</ol>
<p>但我愿称它为<strong>纯数字数组深拷贝</strong>！</p>
<p><img src="https://img-blog.csdnimg.cn/20200812185156608.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h4 id="_3-2-object-assign" tabindex="-1"><a class="header-anchor" href="#_3-2-object-assign" aria-hidden="true">#</a> 3.2 Object.assign()</h4>
<p>有的人会认为<code>Object.assign()</code>，可以做到深拷贝，我们来看一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token punctuation">{</span> c<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token keyword">var</span> newObj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span>

newObj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
newObj<span class="token punctuation">.</span>b<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {a: 1, b: { c: 200 } }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">)</span> <span class="token comment">// {a: 100, b: { c: 200 } }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>神奇，第一层属性没有改变，但第二层却同步改变了，这是为什么呢？</p>
<p>因为 Object.assign()拷贝的是（可枚举）属性值。</p>
<p>假如源值是一个对象的引用，它仅仅会复制其引用值。<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" target="_blank" rel="noopener noreferrer">MDN传送门<OutboundLink/></a></p>
<h2 id="四、自己实现深浅拷贝" tabindex="-1"><a class="header-anchor" href="#四、自己实现深浅拷贝" aria-hidden="true">#</a> 四、自己实现深浅拷贝</h2>
<p>既然现有的方法无法实现深拷贝，不妨我们自己来实现一个吧～</p>
<h4 id="_4-1-浅拷贝" tabindex="-1"><a class="header-anchor" href="#_4-1-浅拷贝" aria-hidden="true">#</a> 4.1 浅拷贝</h4>
<p>我们只需要将所有属性即其嵌套属性原封不动的复制给新变量一份即可，抛开现有的方法，我们应该怎么做呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">shallowCopy</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token comment">// 根据obj的类型判断是新建一个数组还是对象</span>
    <span class="token keyword">var</span> newObj <span class="token operator">=</span> obj <span class="token keyword">instanceof</span> <span class="token class-name">Array</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 遍历obj，并且判断是obj的属性才拷贝</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            newObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> newObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>我们只需要将所有属性的引用拷贝一份即可～</p>
<h4 id="_4-2-深拷贝" tabindex="-1"><a class="header-anchor" href="#_4-2-深拷贝" aria-hidden="true">#</a> 4.2 深拷贝</h4>
<p>相信大家在实现深拷贝的时候都会想到递归，同样是判断属性值，但如果当前类型为<code>object</code>则证明需要继续递归，直到最后</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">deepCopy</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> newObj <span class="token operator">=</span> obj <span class="token keyword">instanceof</span> <span class="token class-name">Array</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            newObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">:</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> newObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>我们用白话来解释一下<code>deepCopy</code>都做了什么</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> resObj <span class="token operator">=</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>读取 <code>obj</code>，创建 第一个newObj
<ul>
<li>判断类型为 <code>[]</code></li>
<li>key为 <code>0</code> (<code>for in</code> 以任意顺序遍历，我们假定按正常循序遍历)</li>
<li>判断不是引用类型，直接复制</li>
<li>key为 <code>1</code></li>
<li>判断是引用类型</li>
<li>进入递归，重新走了一遍刚才的流程，只不过读取的是<code>obj[1]</code></li>
</ul>
</li>
</ul>
<p>另外请注意递归的方式虽然可以深拷贝，但是在性能上肯定不如浅拷贝，大家还是需要结合实际情况来选择。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://github.com/mqyqingfeng/Blog" target="_blank" rel="noopener noreferrer">冴羽大大的Js系列<OutboundLink/></a></li>
<li><a href="https://www.lodashjs.com/docs/lodash.cloneDeep" target="_blank" rel="noopener noreferrer">lodash.js<OutboundLink/></a></li>
</ul>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>下篇预告：如果准确判断一个对象的类型</p>
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
<p>如果您看到了最后，对文章有任何建议，都可以在评论区留言，如果真的对您有所帮助，也希望您能点个star，这是对我最大的鼓励！</p>
<!-- 给这[GitHub，仓库传送门](https://github.com/webbj97/summary)点个star，这是对我最大的鼓励 -->
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>
</template>
