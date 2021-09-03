<template><h1 id="es6系列-二-变量的解构赋值" tabindex="-1"><a class="header-anchor" href="#es6系列-二-变量的解构赋值" aria-hidden="true">#</a> ES6系列（二）变量的解构赋值</h1>
<blockquote>
<p>ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。这种方式的出现大大提高了代码的扩展性</p>
</blockquote>
<nav class="table-of-contents"><ul><li><RouterLink to="#前言">前言</RouterLink></li><li><RouterLink to="#一、数组的解构赋值">一、数组的解构赋值</RouterLink></li><li><RouterLink to="#二、对象的解构赋值">二、对象的解构赋值</RouterLink></li><li><RouterLink to="#三、函数参数的解构赋值">三、函数参数的解构赋值</RouterLink></li><li><RouterLink to="#四、常见的使用场景">四、常见的使用场景</RouterLink></li><li><RouterLink to="#参考">参考</RouterLink></li><li><RouterLink to="#写在最后">写在最后</RouterLink></li></ul></nav>
<p><img src="https://img-blog.csdnimg.cn/20200831190752691.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>为什么要把ES6系列总结出来呢，第一个是为了加深印象，第二个就是在之后的代码中尽量将能用的新特性都用上！</p>
<p>如果我们以ES6的前后来区分代码风格的话，那么有关变量的部分应该是这样的</p>
<p><strong>之前：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">newPoint</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arg <span class="token operator">=</span> options <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">:</span> options<span class="token punctuation">;</span>
    <span class="token keyword">const</span> x <span class="token operator">=</span> arg<span class="token punctuation">.</span>x <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token keyword">const</span> y <span class="token operator">=</span> arg<span class="token punctuation">.</span>y <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> arg<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token keyword">const</span> r <span class="token operator">=</span> arg<span class="token punctuation">.</span>r <span class="token operator">?</span> <span class="token number">10</span> <span class="token operator">:</span> arg<span class="token punctuation">.</span>r<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">newPoint</span><span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> r<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>之后</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">newPoint</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> r <span class="token operator">=</span> <span class="token number">10</span> <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">newPoint</span><span class="token punctuation">(</span><span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> r<span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>或许你会觉得这并没有什么，除了看上去代码简洁之外并没有实际意义，事实却并非如此～</p>
<h2 id="一、数组的解构赋值" tabindex="-1"><a class="header-anchor" href="#一、数组的解构赋值" aria-hidden="true">#</a> 一、数组的解构赋值</h2>
<p>首先看看最容易被人忽略的数组解构。</p>
<p>我们在获取获取数组内的元素时，大多是通过下标的方式<code>arr[0]</code>，这种方式也确实方便，但针对特定的情况时，解构会大大提高你的效率</p>
<h4 id="_1-1-同时赋值多个变量" tabindex="-1"><a class="header-anchor" href="#_1-1-同时赋值多个变量" aria-hidden="true">#</a> 1.1 同时赋值多个变量</h4>
<p>先来看这样一段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>当你需要使用<code>a</code>、<code>b</code>...时，你可能会这么做。而数组的解构可以让你用更少的代码做到同样的事。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
a <span class="token comment">// 1</span>
b <span class="token comment">// 2</span>
c <span class="token comment">// 3</span>
d <span class="token comment">// 4</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="_1-2-解构嵌套数组" tabindex="-1"><a class="header-anchor" href="#_1-2-解构嵌套数组" aria-hidden="true">#</a> 1.2 解构嵌套数组</h4>
<p>解构嵌套数组，就是模式匹配，只要等号两边的层级结构相同，就可以拿到对应位置的值，这在某些特定的情况十分有用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> <span class="token punctuation">[</span>b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token punctuation">[</span>d<span class="token punctuation">,</span> e<span class="token punctuation">,</span> f<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span>
a <span class="token comment">//1</span>
b <span class="token comment">//2</span>
c <span class="token comment">//3</span>
d <span class="token comment">//4</span>
e <span class="token comment">//5</span>
f <span class="token comment">//6</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_1-3-相同-模式-的不完全解构" tabindex="-1"><a class="header-anchor" href="#_1-3-相同-模式-的不完全解构" aria-hidden="true">#</a> 1.3 相同“模式”的不完全解构</h4>
<p>在1.1和1.2小节中，我们总是完整的对应数组结构来获取数据，但当我们模式相同但变量没有完全对应时，会发生什么呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 3</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 3 undefined</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> <span class="token punctuation">[</span>b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token punctuation">[</span>d<span class="token punctuation">,</span> e<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 3 4 5</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_1-4-解构的默认值" tabindex="-1"><a class="header-anchor" href="#_1-4-解构的默认值" aria-hidden="true">#</a> 1.4 解构的默认值</h4>
<p>为了防止1.3小节中出现的解构得到的值存在undefined的情况（实际开发中，也需要兼容某些数据），我们可以对其设定默认值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>a <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
a <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">undefined</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
x <span class="token comment">// 1</span>

<span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">null</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
x <span class="token comment">// null</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。</p>
<p>如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'aaa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。</p>
<h4 id="_1-5-注意" tabindex="-1"><a class="header-anchor" href="#_1-5-注意" aria-hidden="true">#</a> 1.5 注意</h4>
<ul>
<li>数组的解构是根据它的位置（模式）对应的</li>
<li>解构操作允许有默认值，但一定是已经声明的。</li>
<li>如果等号的右边不是数组（或者严格地说，不是可遍历的结构）那么将会报错</li>
</ul>
<h2 id="二、对象的解构赋值" tabindex="-1"><a class="header-anchor" href="#二、对象的解构赋值" aria-hidden="true">#</a> 二、对象的解构赋值</h2>
<p>对象的解构赋值应该是我们使用的最平凡的解构操作了，先来看看基本操作：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">"aaa"</span><span class="token punctuation">,</span> bar<span class="token operator">:</span> <span class="token string">"bbb"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
foo <span class="token comment">// "aaa"</span>
bar <span class="token comment">// "bbb"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_2-1-根据属性解构对象" tabindex="-1"><a class="header-anchor" href="#_2-1-根据属性解构对象" aria-hidden="true">#</a> 2.1 根据属性解构对象</h4>
<p>对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。</p>
<p>如果变量名与属性名不一致，必须写成下面这样。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> baz <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">'aaa'</span><span class="token punctuation">,</span> bar<span class="token operator">:</span> <span class="token string">'bbb'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
baz <span class="token comment">// "aaa"</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> first<span class="token operator">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span> last<span class="token operator">:</span> <span class="token string">'world'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> first<span class="token operator">:</span> f<span class="token punctuation">,</span> last<span class="token operator">:</span> l <span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span> <span class="token comment">// 起了个别名</span>
f <span class="token comment">// 'hello'</span>
l <span class="token comment">// 'world'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这实际上说明，对象的解构赋值是下面形式的简写：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> foo<span class="token punctuation">,</span> bar<span class="token operator">:</span> bar <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">"aaa"</span><span class="token punctuation">,</span> bar<span class="token operator">:</span> <span class="token string">"bbb"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>模式foo的值复制给变量foo，真正被赋值的是后者，而不是前者。</p>
<h4 id="_2-2-注意" tabindex="-1"><a class="header-anchor" href="#_2-2-注意" aria-hidden="true">#</a> 2.2 注意</h4>
<ul>
<li>对象解构和数组解构一样，都支持嵌套解构</li>
<li>对象解构同样支持默认值</li>
</ul>
<h2 id="三、函数参数的解构赋值" tabindex="-1"><a class="header-anchor" href="#三、函数参数的解构赋值" aria-hidden="true">#</a> 三、函数参数的解构赋值</h2>
<p>利用解构优化函数调用时中场景：</p>
<h4 id="_3-1-解构对象类型参数" tabindex="-1"><a class="header-anchor" href="#_3-1-解构对象类型参数" aria-hidden="true">#</a> 3.1 解构对象类型参数</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token parameter">option</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> option<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token keyword">var</span> age <span class="token operator">=</span> option<span class="token punctuation">.</span>age<span class="token punctuation">;</span>
    <span class="token keyword">var</span> like <span class="token operator">=</span> option<span class="token punctuation">.</span>like<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// ES6</span>

<span class="token keyword">function</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> like <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 参数经历了 let { name, age, like } = option</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_3-2-解构数组类型参数" tabindex="-1"><a class="header-anchor" href="#_3-2-解构数组类型参数" aria-hidden="true">#</a> 3.2 解构数组类型参数</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> newArr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
newArr <span class="token comment">// [ 2, 4, 6, 8 ]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_3-3-为参数设定默认值" tabindex="-1"><a class="header-anchor" href="#_3-3-为参数设定默认值" aria-hidden="true">#</a> 3.3 为参数设定默认值</h4>
<p>设定默认值，可以避免许多拿不到数据的情况</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">,</span> age <span class="token operator">=</span> <span class="token number">23</span><span class="token punctuation">,</span> like <span class="token operator">=</span> <span class="token string">'FE'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> like<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'余光'</span> <span class="token punctuation">}</span>
<span class="token function">func</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="四、常见的使用场景" tabindex="-1"><a class="header-anchor" href="#四、常见的使用场景" aria-hidden="true">#</a> 四、常见的使用场景</h2>
<p>变量的解构赋值用途很多。</p>
<h4 id="_4-1-交换变量的值-虽然没用过-但看起来很好用" tabindex="-1"><a class="header-anchor" href="#_4-1-交换变量的值-虽然没用过-但看起来很好用" aria-hidden="true">#</a> 4.1 交换变量的值（虽然没用过，但看起来很好用）</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>y<span class="token punctuation">,</span> x<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。</p>
<h4 id="_4-2-从函数返回多个值" tabindex="-1"><a class="header-anchor" href="#_4-2-从函数返回多个值" aria-hidden="true">#</a> 4.2 从函数返回多个值</h4>
<p>函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。</p>
<p><strong>返回一个数组</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">example</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">example</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>返回一个对象</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">example</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    bar<span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">example</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="_4-3-函数参数的定义" tabindex="-1"><a class="header-anchor" href="#_4-3-函数参数的定义" aria-hidden="true">#</a> 4.3 函数参数的定义</h4>
<p>解构赋值可以方便地将一组参数与变量名对应起来。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 参数是一组有次序的值</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 参数是一组无次序的值</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">{</span>z<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> x<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="_4-4-提取-json-数据" tabindex="-1"><a class="header-anchor" href="#_4-4-提取-json-数据" aria-hidden="true">#</a> 4.4  提取 JSON 数据</h4>
<p>解构赋值对提取 JSON 对象中的数据，尤其有用。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> jsonData <span class="token operator">=</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
  status<span class="token operator">:</span> <span class="token string">"OK"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">867</span><span class="token punctuation">,</span> <span class="token number">5309</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span> id<span class="token punctuation">,</span> status<span class="token punctuation">,</span> data<span class="token operator">:</span> number <span class="token punctuation">}</span> <span class="token operator">=</span> jsonData<span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> status<span class="token punctuation">,</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 42, "OK", [867, 5309]</span>
<span class="token comment">// 上面代码可以快速提取 JSON 数据的值。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_4-5-函数参数的默认值" tabindex="-1"><a class="header-anchor" href="#_4-5-函数参数的默认值" aria-hidden="true">#</a> 4.5  函数参数的默认值</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>jQuery<span class="token punctuation">.</span><span class="token function-variable function">ajax</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  async <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function-variable function">beforeSend</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  cache <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function-variable function">complete</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  crossDomain <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  global <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// ... more config</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... do stuff</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。</p>
<p>更多的解构场景，基本上都是在上面的基础上略作改动，希望大家能看到它的闪光点哦～</p>
<p>最后提一句，既然到此我们已经了解了解构赋值，不妨在之后的代码中<strong>完全使用它</strong>！！！</p>
<p><img src="https://img-blog.csdnimg.cn/20200831191055790.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://es6.ruanyifeng.com/#docs/let#const-%E5%91%BD%E4%BB%A4" target="_blank" rel="noopener noreferrer">ES6入门<OutboundLink/></a></li>
</ul>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>JavaScript系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/103161970" target="_blank" rel="noopener noreferrer">《JavaScript内功进阶系列》（已完结）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_10204368.html" target="_blank" rel="noopener noreferrer">《JavaScript专项系列》（持续更新）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_8464707.html" target="_blank" rel="noopener noreferrer">《ES6基础系列》（持续更新）<OutboundLink/></a></li>
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
</p>
</template>
