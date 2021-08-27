<template><!--
 * @Author: your name
 * @Date: 2021-08-27 16:21:02
 * @LastEditTime: 2021-08-27 16:21:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /summary/docs/blog/vue/4.md
-->
<h1 id="【typescript专题】之类型进阶" tabindex="-1"><a class="header-anchor" href="#【typescript专题】之类型进阶" aria-hidden="true">#</a> 【Typescript专题】之类型进阶</h1>
<blockquote>
<p>本篇文章是《Typescript 专题》第一篇，本篇文章主要聊一聊基本类型相关的扩展，毕竟随着文章的加深，我在阅读官方文档的时候经常会见到陌生的声明和“单词”，感觉有必要跟大家分享一下，下一篇文章，我们主要聊一聊Ts的类型断言。</p>
</blockquote>
<font color="red">系列文章，收藏不走丢哦</font>
<p><img src="https://img-blog.csdnimg.cn/85836923899746cab18afa2e10b39e0f.webp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、类型别名-type" tabindex="-1"><a class="header-anchor" href="#一、类型别名-type" aria-hidden="true">#</a> 一、类型别名（type）</h2>
<p>类型别名用来给一个类型起个新名字。例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">isNumber</span> <span class="token operator">=</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> num<span class="token operator">:</span> isNumber <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面的例子没有任何问题，当然也是一句“废话”，那么类型别名又是为什么创造的呢？来看下面的例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Name</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 字符串</span>
<span class="token keyword">type</span> <span class="token class-name">NameResolver</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 函数</span>
<span class="token keyword">type</span> <span class="token class-name">NameOrResolver</span> <span class="token operator">=</span> Name <span class="token operator">|</span> NameResolver<span class="token punctuation">;</span> <span class="token comment">// 联合类型</span>

<span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span>n<span class="token operator">:</span> NameOrResolver<span class="token punctuation">)</span><span class="token operator">:</span> Name <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n <span class="token operator">===</span> <span class="token string">"string"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> n<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">n</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>别名常用于联合类型，如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">ID</span></span> <span class="token operator">=</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> id1<span class="token operator">:</span> <span class="token constant">ID</span> <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> id2<span class="token operator">:</span> <span class="token constant">ID</span> <span class="token operator">=</span> <span class="token string">"wpsd"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="二、字符串字面量类型" tabindex="-1"><a class="header-anchor" href="#二、字符串字面量类型" aria-hidden="true">#</a> 二、字符串字面量类型</h2>
<p>字符串字面量类型用来约束取值<strong>只能是</strong>某几个字符串中的一个。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">EventNames</span> <span class="token operator">=</span> <span class="token string">"click"</span> <span class="token operator">|</span> <span class="token string">"scroll"</span> <span class="token operator">|</span> <span class="token string">"mousemove"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">handleEvent</span><span class="token punctuation">(</span>ele<span class="token operator">:</span> Element<span class="token punctuation">,</span> event<span class="token operator">:</span> EventNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// do something</span>
<span class="token punctuation">}</span>

<span class="token function">handleEvent</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"scroll"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 没问题</span>
<span class="token function">handleEvent</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"onmouseout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错，event 不能为 'onmouseout'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>上例中，我们使用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。</p>
<p>在看过第一小节后，你可能会有疑问，字符串字面亮和类型别名非常相似，区别就在于一个是限制的是类型，一个限制的是具体的值。</p>
<h2 id="三、元祖" tabindex="-1"><a class="header-anchor" href="#三、元祖" aria-hidden="true">#</a> 三、元祖</h2>
<p>相信对于大家来说（包括我）都对这个词有些陌生，我们仍然通过具体的例子来形成概念</p>
<p>定义一对值分别为 string 和 number 的元组：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> yuguang1<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"yuguang"</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> yuguang2<span class="token operator">!</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
yuguang2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
yuguang2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"yuguang"</span><span class="token punctuation">;</span>
yuguang2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>yuguang2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['yuguang', 25]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>注意 1：</strong> 当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> yuguang<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
yuguang <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"yuguang"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 不能将类型“[string]”分配给类型“[string, number]”。源具有 1 个元素，但目标需要 2 个</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>注意 2：</strong> 添加的元素需要以元组的每个类型组成的联合类型检查：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> yuguang<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
yuguang <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"yuguang"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
yuguang<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 类型“{}”的参数不能赋给类型“string | number”的参数。</span>
<span class="token comment">// 不能将类型“{}”分配给类型“number”</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>注意 3：</strong> 元组和联合类型在校验是是相似的，但两者还是有区别的</p>
<h2 id="四、枚举" tabindex="-1"><a class="header-anchor" href="#四、枚举" aria-hidden="true">#</a> 四、枚举</h2>
<p>枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。这和上一节字面量很想子</p>
<p>枚举使用<code>enum</code>关键字来定义(新关键词～)</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Days <span class="token punctuation">{</span>
  Sun<span class="token punctuation">,</span>
  Mon<span class="token punctuation">,</span>
  Tue<span class="token punctuation">,</span>
  Wed<span class="token punctuation">,</span>
  Thu<span class="token punctuation">,</span>
  Fri<span class="token punctuation">,</span>
  Sat<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Days <span class="token punctuation">{</span>
  Sun<span class="token punctuation">,</span>
  Mon<span class="token punctuation">,</span>
  Tue<span class="token punctuation">,</span>
  Wed<span class="token punctuation">,</span>
  Thu<span class="token punctuation">,</span>
  Fri<span class="token punctuation">,</span>
  Sat<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Sun"</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Mon"</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Tue"</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Sat"</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"Sun"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"Mon"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"Tue"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"Sat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>如图，上面的例子会被编译为：</p>
<p><img src="https://img-blog.csdnimg.cn/13aefbc0ca7a4bd6a3a7c38eb7c4ac5a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>真的是从 0 开始递增吗？我们看下面的编译示例：</p>
<p><img src="https://img-blog.csdnimg.cn/42e545b819bb412bbfbb14c7919ae141.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>上图中，未手动赋值的枚举项会接着上一个枚举项递增。而且你会发现，Sun 和 Wed 存储的都是 7，并且没有报错～</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Days <span class="token punctuation">{</span>
  Sun <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span>
  Mon <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  Tue<span class="token punctuation">,</span>
  Wed<span class="token punctuation">,</span>
  Thu<span class="token punctuation">,</span>
  Fri<span class="token punctuation">,</span>
  Sat<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Sun"</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Wed"</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"Sun"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"Wed"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>上面的例子中，递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，导致<code>Days[3]</code>的值先是&quot;Sun&quot;，而后又被&quot;Wed&quot;覆盖了。编译的结果是：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> Days<span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>Days<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Days<span class="token punctuation">[</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Sun"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Sun"</span><span class="token punctuation">;</span>
  Days<span class="token punctuation">[</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Mon"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Mon"</span><span class="token punctuation">;</span>
  Days<span class="token punctuation">[</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Tue"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Tue"</span><span class="token punctuation">;</span>
  Days<span class="token punctuation">[</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Wed"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Wed"</span><span class="token punctuation">;</span>
  Days<span class="token punctuation">[</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Thu"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Thu"</span><span class="token punctuation">;</span>
  Days<span class="token punctuation">[</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Fri"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Fri"</span><span class="token punctuation">;</span>
  Days<span class="token punctuation">[</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">"Sat"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Sat"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Days <span class="token operator">||</span> <span class="token punctuation">(</span>Days <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>好了，有关枚举我们就了解这么多，其实官方文档上介绍枚举用了很大的篇幅，在未来我们会随着知识的深入一点点的渗透给大家（准确的说就是我还没看懂哈哈～）</p>
<p><img src="https://img-blog.csdnimg.cn/06b39982f1994a7a8a1857883fb1483e.webp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>本篇文章是《Typescript 专题》第一篇，本篇文章主要聊一聊基本类型相关的扩展，毕竟随着文章的加深，我在阅读官方文档的时候经常会见到陌生的声明和“单词”，感觉有必要跟大家分享一下，下一篇文章，我们主要聊一聊Ts的类型断言。</p>
<p>系列文章传送门：</p>
<ol>
<li><a href="https://yuguang.blog.csdn.net/article/details/119137707" target="_blank" rel="noopener noreferrer">【Typescript 入门手册】之基本类型在 TypeScript 中的应用<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/article/details/119220029" target="_blank" rel="noopener noreferrer">【Typescript 入门手册】之引用类型在 TypeScript 中的应用<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/article/details/119333719" target="_blank" rel="noopener noreferrer">【Typescript 入门手册】之函数类型在 TypeScript 中的应用<OutboundLink/></a></li>
<li>本文</li>
</ol>
<h3 id="关于我" tabindex="-1"><a class="header-anchor" href="#关于我" aria-hidden="true">#</a> 关于我</h3>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>邮箱：webbj97@163.com</li>
</ul>
<h3 id="其他沉淀" tabindex="-1"><a class="header-anchor" href="#其他沉淀" aria-hidden="true">#</a> 其他沉淀</h3>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Github: Js 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN 博客汇总<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
