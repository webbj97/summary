<template><h1 id="【typescript-专题】之类型断言" tabindex="-1"><a class="header-anchor" href="#【typescript-专题】之类型断言" aria-hidden="true">#</a> 【TypeScript 专题】之类型断言</h1>
<blockquote>
<p>断言是编程术语，表示为一些布尔表达。—— <a href="https://baike.baidu.com/item/%E6%96%AD%E8%A8%80/13021995?fr=aladdin" target="_blank" rel="noopener noreferrer">百度百科<OutboundLink/></a></p>
</blockquote>
<blockquote>
<p>系列文章，收藏不走丢哦</p>
</blockquote>
<p>类型断言（Type Assertion）可以用来手动指定一个值的类型。就是告诉编译器, 你不要帮我们检查了, 相信我，它就是这个类型。</p>
<p><img src="https://img-blog.csdnimg.cn/a93e76bee1ba4cf4aab932800eb35023.gif#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、ts-中的断言" tabindex="-1"><a class="header-anchor" href="#一、ts-中的断言" aria-hidden="true">#</a> 一、Ts 中的断言</h2>
<p>断言就好比解释型强制类型转换，直接告诉你这个变量是什么样子的！</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>值 <span class="token keyword">as</span> 类型<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>先来看看例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">fruits</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">fruitsOrPerson</span> <span class="token operator">=</span> fruits <span class="token operator">|</span> person<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span>intance<span class="token operator">:</span> fruitsOrPerson<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使用联合类型共有的属性，是可以的</span>
  <span class="token keyword">return</span> intance<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，就像这样：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">fruits</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">fruitsOrPerson</span> <span class="token operator">=</span> fruits <span class="token operator">|</span> person<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getColor</span><span class="token punctuation">(</span>intance<span class="token operator">:</span> fruitsOrPerson<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> intance<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 类型“fruitsOrPerson”上不存在属性“getColor”。</span>
<span class="token comment">// 类型“person”上不存在属性“getColor”</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>上面的例子中，执行<code>intance.getColor</code> 的时候会报错。这是因为在它类型不确定时，我们使用了非共有属性或方法。</p>
<p>此时可以使用类型断言，将<code>实例</code>断言成<code>fruits</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">fruits</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">fruitsOrPerson</span> <span class="token operator">=</span> fruits <span class="token operator">|</span> person<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getColor</span><span class="token punctuation">(</span>intance<span class="token operator">:</span> fruitsOrPerson<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>intance <span class="token keyword">as</span> fruits<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// (method) fruits.getColor(): void</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，不合理的使用会导致不给掌控的错误，例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">fruits</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">fruitsOrPerson</span> <span class="token operator">=</span> fruits <span class="token operator">|</span> person<span class="token punctuation">;</span>

<span class="token comment">// 通过</span>
<span class="token keyword">function</span> <span class="token function">getColor</span><span class="token punctuation">(</span>intance<span class="token operator">:</span> fruitsOrPerson<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>intance <span class="token keyword">as</span> fruits<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行错误 intance.getColor is not a function</span>
<span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"余光"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getAge</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">100</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>上面的例子编译时不会报错，但在运行时会报错：</p>
<p>使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性（就像上面的例子），以减少不必要的运行时错误。</p>
<p><img src="https://img-blog.csdnimg.cn/76e11bf17363473d9ad8428a9e6cf372.gif#pic_center" alt="在这里插入图片描述"></p>
<h2 id="二、将一个父类断言为更加具体的子类" tabindex="-1"><a class="header-anchor" href="#二、将一个父类断言为更加具体的子类" aria-hidden="true">#</a> 二、将一个父类断言为更加具体的子类</h2>
<p>当<strong>类</strong>之间有继承关系时，类型断言也是很常见的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">ApiError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span>
  code<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">HttpError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span>
  statusCode<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isApiError</span><span class="token punctuation">(</span>error<span class="token operator">:</span> Error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token punctuation">(</span>error <span class="token keyword">as</span> ApiError<span class="token punctuation">)</span><span class="token punctuation">.</span>code <span class="token operator">===</span> <span class="token string">"number"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>上面的例子中，我们声明了函数<code>isApiError</code>，它用来判断传入的参数是不是ApiError类型，为了实现这样一个函数，为了保证提前使用不确定的code属性，需要使用类型断言手动指定类型以跳过类型检查。</p>
<p>读到这里大家是否意识到类型断言被创造出来的目的是什么？</p>
<h2 id="三、将任何一个类型断言为any" tabindex="-1"><a class="header-anchor" href="#三、将任何一个类型断言为any" aria-hidden="true">#</a> 三、将任何一个类型断言为any</h2>
<p>理想情况下，TypeScript的类型系统运转良好，每个值的类型都具体而精确，报错 === 代码不够严谨！但下面的代码也会报错怎么办呢？</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> val<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
val<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 类型“number”上不存在属性“length”</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面的例子中，数字类型的变量val上是没有length属性的，Ts会帮我们提前发现问题，并暴露出来。</p>
<p>但有的时候我们非常确定这段代码不会出错!!，比如下面这个例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>window<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 添加一个属性，并进行赋值</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在Ts中这段代码会报错，因为window上没有foo属性，为了应对这种情况，我们希望可以访问任何属性：</p>
<p>此时我们可以使用<code>as any</code>临时将window断言为any类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token punctuation">(</span>window <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">//</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在 any 类型的变量上，访问任何属性都是允许的。</p>
<p>Ts将类型断言的松紧尺度交给我们自己，是通篇as any还是合理的使用它，是我们需要平衡的。</p>
<p><img src="https://img-blog.csdnimg.cn/b43f043a0546410aa41c2478e3c1f476.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="四、类型断言与其他类型限制的区别" tabindex="-1"><a class="header-anchor" href="#四、类型断言与其他类型限制的区别" aria-hidden="true">#</a> 四、类型断言与其他类型限制的区别</h2>
<p>类型断言实际上就是在检测阶段帮我们消除错误的一种手段，有些“暴力”但关键时刻很有用，那么它和其他类型声明的具体区别在哪里呢？</p>
<h3 id="_4-1-类型断言-vs-类型转换" tabindex="-1"><a class="header-anchor" href="#_4-1-类型断言-vs-类型转换" aria-hidden="true">#</a> 4.1 类型断言 vs 类型转换</h3>
<blockquote>
<p>类型断言不是类型转换，它不会真的影响到变量的类型。</p>
</blockquote>
<p>类型断言只会影响TypeScript编译时的类型，类型断言语句在编译结果中会被删除：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">toBoolean</span><span class="token punctuation">(</span>something<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> something <span class="token keyword">as</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">toBoolean</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/864b6c3f9c5c45d0be6512e1a3e7dbfc.png" alt="在这里插入图片描述"></p>
<p>在上面的例子中，将something断言为boolean虽然可以通过编译，但看上图，实际编译过后类型并没有被转换。</p>
<h3 id="_4-2-类型断言-vs-类型声明" tabindex="-1"><a class="header-anchor" href="#_4-2-类型断言-vs-类型声明" aria-hidden="true">#</a> 4.2 类型断言 vs 类型声明</h3>
<blockquote>
<p>类型声明是比类型断言更加严格的</p>
</blockquote>
<p>先来看下面的代码</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">getCacheData</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1. window断言为any才能调用cache方法</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>window <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 2. getCacheData的返回值 as Cat才能调用Cat的方法</span>
<span class="token keyword">const</span> tom <span class="token operator">=</span> <span class="token function">getCacheData</span><span class="token punctuation">(</span><span class="token string">"tom"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Cat<span class="token punctuation">;</span>
tom<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>在1、2注释中我们解释了为什么要使用断言，再来看看同样的情况（不使用断言）要如果做：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">getCacheData</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>window <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 定义Cat形状的接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 为tom指定类型</span>
<span class="token keyword">const</span> tom<span class="token operator">:</span> Cat <span class="token operator">=</span> <span class="token function">getCacheData</span><span class="token punctuation">(</span><span class="token string">"tom"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
tom<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>看上去直观了一点，当然区别不仅仅是这样的</p>
<p>它们的区别，可以通过这个例子来理解：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// animal 符合 Animal 的形状</span>
<span class="token keyword">const</span> animal<span class="token operator">:</span> Animal <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"tom"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// animal 是Cat类型的</span>
<span class="token keyword">let</span> tom <span class="token operator">=</span> animal <span class="token keyword">as</span> Cat<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>但是若直接声明 tom 为 Cat 类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// animal 符合 Animal 的形状</span>
<span class="token keyword">const</span> animal<span class="token operator">:</span> Animal <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"tom"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// tom是Cat，并初始化为animal</span>
<span class="token keyword">let</span> tom<span class="token operator">:</span> Cat <span class="token operator">=</span> animal<span class="token punctuation">;</span> <span class="token comment">// Error: 类型 "Animal" 中缺少属性 "run"，但类型 "Cat" 中需要该属性</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>它们的核心区别就在于：</p>
<ul>
<li>animal 断言为 Cat，只需要满足<code>Animal兼容Cat</code>或<code>Cat兼容Animal</code>即可（疑问的小伙伴可以将“兼容”理解成“属性或方法的重叠”）</li>
<li>animal 赋值给 tom，需要满足<code>Cat兼容Animal</code>才行</li>
</ul>
<p>所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。</p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>本篇文章是《Typescript 专题》第二篇，本篇文章主要聊一聊类型断言是什么，一句话概括就是——类型断言的目的就是让编译通过，是不是很刺激？欢迎小伙伴们积极踊跃的互动，我会及时回复的哦，下一篇我们聊一聊大家最感兴趣的<code>类</code>吧～</p>
<p>系列文章传送门：</p>
<ol>
<li><a href="https://yuguang.blog.csdn.net/article/details/119137707" target="_blank" rel="noopener noreferrer">【Typescript入门手册】之基本类型在 TypeScript 中的应用<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/article/details/119220029" target="_blank" rel="noopener noreferrer">【Typescript入门手册】之引用类型在 TypeScript 中的应用<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/article/details/119333719" target="_blank" rel="noopener noreferrer">【Typescript入门手册】之函数类型在 TypeScript 中的应用<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/article/details/119359244" target="_blank" rel="noopener noreferrer">【Typescript专题】之类型进阶<OutboundLink/></a></li>
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
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Js版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN 博客汇总<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
