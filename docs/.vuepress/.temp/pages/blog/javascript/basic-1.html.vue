<template><h1 id="javascript基础-一-this" tabindex="-1"><a class="header-anchor" href="#javascript基础-一-this" aria-hidden="true">#</a> JavaScript基础（一）this</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>记得当时找实习的时候，总是会在简历上加上一句——熟悉Js，例如this指向、call、apply等...</p>
<p align=center><img align=center src="https://img-blog.csdnimg.cn/20200601184858430.png" width="40%" /></p>
<p>而每次投递简历时我都会经历如下步骤</p>
<ul>
<li>面试前，去问度娘——this指向可以分为哪几种啊～、call和apply的区别是什么？底气由0% 猛涨到了 50%；</li>
<li>面试中，面试官随便扔上来几道题，我都可以“坚定的”给出答案，结果总是不尽人意...</li>
<li>面试后，我会羞愧的删除掉简历上的这一条。而再之后投递简历时我又再次加上了这一条...</li>
</ul>
<p align=center><img align=center src="https://img-blog.csdnimg.cn/20200601185742490.png" width="40%" /></p>
<p>既然知道这个知识点重要，这次我们猛攻它吧😊，let's go！六月第一篇文章，也是我第一次接触思维脑图，并尝试将它运用到平时的学习中，我们共勉！</p>
<h2 id="一、this的指向" tabindex="-1"><a class="header-anchor" href="#一、this的指向" aria-hidden="true">#</a> 一、this的指向</h2>
<p>百度、谷歌上输入“this的指向”关键字，大几千条文章肯定是有的，总不至于为了全方面、无死角的掌握它就要将所有的文章都看一遍吧？所以不如梳理出一个稳固的框架，我们一起来填充它。</p>
<h4 id="思维导图" tabindex="-1"><a class="header-anchor" href="#思维导图" aria-hidden="true">#</a> 思维导图</h4>
<p><img src="https://img-blog.csdnimg.cn/20200602110330766.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<ul>
<li>this 总是（非严格模式下）指向一个对象，而具体指向哪个对象是在运行时基于函数的<code>执行环境</code>动态绑定的，而非函数被声明时的环境；</li>
<li>除了不常用的with和eval的情况，具体到实际应用中，this指向大概可以分为四种：
<ul>
<li>作为对象的方法调用；</li>
<li>作为普通函数调用；</li>
<li>构造器调用；</li>
<li>call 或 apply调用；</li>
<li>箭头函数中，this指向函数上层作用域的this；</li>
</ul>
</li>
<li><strong>构造器</strong>和<strong>普通函数</strong>的区别在于<code>被调用的方式</code>；</li>
<li>A,call(B) =&gt; 可以理解成在B的作用域内调用了A方法；</li>
</ul>
<h4 id="_1-1-作为对象的方法调用" tabindex="-1"><a class="header-anchor" href="#_1-1-作为对象的方法调用" aria-hidden="true">#</a> 1.1 作为对象的方法调用</h4>
<p>当函数作为对象的方法被调用时，<code>this指向该对象</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token string">'yuguang'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true yuguang</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_1-2-作为普通函数调用" tabindex="-1"><a class="header-anchor" href="#_1-2-作为普通函数调用" aria-hidden="true">#</a> 1.2 作为普通函数调用</h4>
<p>当函数不作为对象的属性被调用，而是以普通函数的方式，this总是指向全局对象（在浏览器中，通常是Window对象）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'yuguang'</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// yuguang</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>或者下面这段迷惑性的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'老王'</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'yuguang'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> getNew <span class="token operator">=</span> obj<span class="token punctuation">.</span>getName<span class="token punctuation">;</span>
<span class="token function">getNew</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 老王</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>而在ES5的严格模式下，this被规定为不会指向全局对象，而是<code>undefined</code></p>
<h4 id="_1-3-构造器调用" tabindex="-1"><a class="header-anchor" href="#_1-3-构造器调用" aria-hidden="true">#</a> 1.3 构造器调用</h4>
<p>除了一些内置函数，大部分Js中的函数都可以成为构造器，它们与普通函数没什么不同</p>
<p><strong>构造器</strong>和<strong>普通函数</strong>的区别在于<code>被调用的方式</code>：
当new运算符调用函数时，总是返回一个对象，this通常也指向这个对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">MyClass</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'yuguang'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
obj<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// yuguang</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>但是，如果显式的返回了一个object对象，那么此次运算结果最终会返回这个对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">MyClass</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> myClass <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'myClass.name:'</span><span class="token punctuation">,</span> myClass<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { name: 2}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>只要构造器不显示的返回任何数据，或者返回非对象类型的数据，就不会造成上述问题。</p>
<h4 id="_1-4-call或apply调用" tabindex="-1"><a class="header-anchor" href="#_1-4-call或apply调用" aria-hidden="true">#</a> 1.4 call或apply调用</h4>
<p>跟普通的函数调用相比，用call和apply可以动态的改变函数的this</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>num <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 可以理解成在 obj2的作用域下调用了 obj1.getName()函数</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj2<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 + 2 = 4</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj2<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 + 2 = 4</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="_1-5-箭头函数" tabindex="-1"><a class="header-anchor" href="#_1-5-箭头函数" aria-hidden="true">#</a> 1.5 箭头函数</h4>
<p>箭头函数不会创建自己的this，它只会从自己的作用域链的上一层继承this。因此，在下面的代码中，传递给setInterval的函数内的this与封闭函数中的this值相同：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

obj<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_1-6-常见的坑" tabindex="-1"><a class="header-anchor" href="#_1-6-常见的坑" aria-hidden="true">#</a> 1.6 常见的坑</h4>
<p>就像标题一样，有的时候<code>this</code>会指向undefined</p>
<p><strong>情况一</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> getName2 <span class="token operator">=</span> obj<span class="token punctuation">.</span>getName<span class="token punctuation">;</span>
<span class="token function">getName2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这个时候，getName2()作为普通函数被调用时，this指向全局对象——window。</p>
<p><strong>情况二</strong></p>
<p>当我们希望自己封装Dom方法，来精简代码时：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">getDomById</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">getDomById</span><span class="token punctuation">(</span><span class="token string">'div1'</span><span class="token punctuation">)</span> <span class="token comment">//dom节点</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>那么我们看看这么写行不行？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> getDomById <span class="token operator">=</span> document<span class="token punctuation">.</span>getElementById
<span class="token function">getDomById</span><span class="token punctuation">(</span><span class="token string">'div1'</span><span class="token punctuation">)</span> <span class="token comment">// Uncaught TypeError: Illegal invocation(非法调用)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这是因为:</p>
<ul>
<li>当我们去调用<code>document</code>对象的方法时，方法内的this指向<code>document</code>。</li>
<li>当我们用getId应用document内的方法，再以普通函数的方式调用，函数内容的this就指向了全局对象。</li>
</ul>
<p><strong>利用call和apply修正情况二</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>getElementById <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>document<span class="token punctuation">,</span> <span class="token operator">...</span>arguments<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>getElementById<span class="token punctuation">)</span>
<span class="token comment">// 利用立即执行函数将document保存在作用域中</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p align="center">
<img  src="https://img-blog.csdnimg.cn/20200602141035376.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" />
</p>
<h2 id="二、call和apply" tabindex="-1"><a class="header-anchor" href="#二、call和apply" aria-hidden="true">#</a> 二、call和apply</h2>
<p>不要因为它的“强大”而对它产生抗拒，了解并熟悉它是我们必须要做的，共勉！</p>
<h4 id="思维导图-1" tabindex="-1"><a class="header-anchor" href="#思维导图-1" aria-hidden="true">#</a> 思维导图</h4>
<p><img src="https://img-blog.csdnimg.cn/20200602153648211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h4 id="_1-call和apply区别" tabindex="-1"><a class="header-anchor" href="#_1-call和apply区别" aria-hidden="true">#</a> 1.call和apply区别</h4>
<p>先来看区别，是因为它们<strong>几乎</strong>没有区别，下文代码实例call和apply都可以轻易的切换。</p>
<p>当它们被设计出来时要做到的事情一摸一样，唯一的区别就在于<code>传参的格式不一样</code></p>
<ul>
<li>apply接受两个参数
<ul>
<li>第一个参数指定了函数体内this对象的指向</li>
<li>第二个参数为一个带下标的参数集合（可以是数组或者类数组）</li>
</ul>
</li>
<li>call接受的参数不固定
<ul>
<li>第一个参数指定了函数体内this对象的指向</li>
<li>第二个参数及以后为函数调用的参数</li>
</ul>
</li>
</ul>
<p>因为在所有（非箭头）函数中都可以通过<code>arguments</code>对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，它本身就是一个类数组，我们apply在实际使用中更常见一些。</p>
<p>call是包装在apply上面的语法糖，如果我们明确的知道参数数量，并且希望展示它们，可以使用call。</p>
<p>当使用call或者apply的时候，如果我们传入的第一个参数为null，函数体内的this会默认指向宿主对象，在浏览器中则是<code>window</code>。</p>
<p><strong>借用其他对象的方法</strong></p>
<p>我们可以直接传null来代替任意对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="_2-call和apply能做什么" tabindex="-1"><a class="header-anchor" href="#_2-call和apply能做什么" aria-hidden="true">#</a> 2.call和apply能做什么？</h4>
<p>使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数——来时<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call" target="_blank" rel="noopener noreferrer">MDN<OutboundLink/></a></p>
<ul>
<li>调用构造函数来<code>实现继承</code>;</li>
<li>调用函数并且指定上下文的 <code>this</code>;</li>
<li>调用函数并且不指定第一个参数;</li>
</ul>
<p><strong>1.调用构造函数来实现继承</strong></p>
<p>通过“借用”的方式来达到继承的效果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Product</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> price</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Food</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> price</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Product</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>category <span class="token operator">=</span> food<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> hotDog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Food</span><span class="token punctuation">(</span><span class="token string">'hotDog'</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>2.调用函数并且指定上下文的 <code>this</code></strong></p>
<p>此时this被指向了obj</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">+</span> <span class="token string">':'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">'yuguang'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">showName</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>3.使用call单纯的调用某个函数</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p align=center>
	<img  src="https://img-blog.csdnimg.cn/20200602143803240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="60%"/>
</p>
<h2 id="三、模拟实现一个call" tabindex="-1"><a class="header-anchor" href="#三、模拟实现一个call" aria-hidden="true">#</a> 三、模拟实现一个call</h2>
<p>先来看一下call帮我们需要做什么？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
	value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">show</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>就像解方程，要在已知条件中寻找突破哦口：</p>
<ul>
<li><code>call</code> 使得this的指向变了，指向了foo;</li>
<li><code>show</code> 函数被执行了;</li>
<li>传入的参数应为 <code>this</code> + 参数列表;</li>
</ul>
<p><strong>第一版代码</strong></p>
<p>上面提到的3点，仅仅完成了一点，且传入的参数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 此时this指向show</span>
    obj<span class="token punctuation">.</span>func <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// 将函数变成对象的内部属性</span>
    obj<span class="token punctuation">.</span><span class="token function">func</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 指定函数</span>
    <span class="token keyword">delete</span> obj<span class="token punctuation">.</span>func <span class="token comment">// 删除函数，当做什么都没发生～</span>
<span class="token punctuation">}</span>
show<span class="token punctuation">.</span><span class="token function">setCall</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>第二版代码</strong></p>
<p>为了解决参数的问题，我们要能获取到参数，并且正确的传入：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    obj<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// 将函数变成对象的内部属性</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arguments['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'obj.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span> <span class="token string">')'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 传入参数</span>
    <span class="token keyword">delete</span> obj<span class="token punctuation">.</span>fn<span class="token punctuation">;</span> <span class="token comment">// 删除函数，当做什么都没发生～</span>
<span class="token punctuation">}</span>

show<span class="token punctuation">.</span><span class="token function">setCall</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>此时，我们就可以做到，传入多个参数的情况下使用call了，但是如果你仅想用某个方法呢？</p>
<p><strong>第三版代码</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> obj <span class="token operator">=</span> obj <span class="token operator">||</span> window<span class="token punctuation">;</span>
  obj<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arguments['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'obj.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span><span class="token string">')'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">delete</span> obj<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 测试一下</span>
<span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> value<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">,</span>
    name<span class="token operator">:</span> name<span class="token punctuation">,</span>
    age<span class="token operator">:</span> age
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
bar<span class="token punctuation">.</span><span class="token function">setCall</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span><span class="token function">setCall</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'kevin'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="四、bind" tabindex="-1"><a class="header-anchor" href="#四、bind" aria-hidden="true">#</a> 四、bind</h2>
<p>提到了<strong>call</strong>和<strong>apply</strong>，就绕不开<strong>bind()</strong>，来看一下MDN上对**bind()**的解释：</p>
<p>bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。</p>
<p>我们用Js来模拟一个bind方法，以便加深我们的认识</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">bind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">_this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">func</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>这样看上去，bind总会帮我们返回同样的<code>this</code>值，还是挺坚挺的哦～</p>
<h2 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾" aria-hidden="true">#</a> 结尾</h2>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>稿定设计一名工作不到一年的前端小白</li>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">JavaScript版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/105714458" target="_blank" rel="noopener noreferrer">LeetCode题解CSDN地址<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
</ul>
<p>这是我第一次尝试脑图+代码实例相结合的方式来展开知识，如果您看到了最后，不妨收藏、点赞、评论一下吧！！！</p>
<p>持续更新，您的<strong>三连</strong>就是我最大的动力，虚心接受大佬们的批评和指点，共勉！</p>
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="80%"/>
</p>
</template>
