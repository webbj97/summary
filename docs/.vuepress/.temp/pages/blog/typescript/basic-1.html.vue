<template><h1 id="【typescript入门】之基本类型在typescript中的应用" tabindex="-1"><a class="header-anchor" href="#【typescript入门】之基本类型在typescript中的应用" aria-hidden="true">#</a> 【Typescript入门】之基本类型在TypeScript中的应用</h1>
<blockquote>
<p>TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。</p>
</blockquote>
<img src="https://img-blog.csdnimg.cn/ea9cdc30f83d43d99c5a10b7e76d5a0f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="100%" />
<p>相信大家经常会问到为什么会有Ts，我该不该学习Ts，在知乎上这样的问题也会受到大家广泛的关注，而我的回答是，该去了解，因为了解Ts不会像我们学习英语那样“痛苦”，如果TypeScript能够解决你的问题，那就继续深入的学习吧，本系列的第一篇文章也不会有太深奥的理论，花一些时间了解一下给出自己的判断吧～</p>
<p>话不多说，我们先来从基本类型入手，走进Ts的大门！<font color="red">系列文章，收藏不走丢哦</font></p>
<p><img src="https://img-blog.csdnimg.cn/0e89e4457f3243199adc51f43d6035af.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、原始数据类型" tabindex="-1"><a class="header-anchor" href="#一、原始数据类型" aria-hidden="true">#</a> 一、原始数据类型</h2>
<p>JavaScript的类型分为两种：原始数据类型和对象类型。</p>
<p>原始数据类型包括：</p>
<ul>
<li>布尔值</li>
<li>数值</li>
<li>字符串</li>
<li>null</li>
<li>undefined</li>
<li>以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt。</li>
</ul>
<h3 id="_1-1-布尔值" tabindex="-1"><a class="header-anchor" href="#_1-1-布尔值" aria-hidden="true">#</a> 1.1 布尔值</h3>
<p>布尔值是最基础的数据类型，在TypeScript中，使用<code>boolean</code> 定义布尔值类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> visible<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>注意；在TypeScript中，<code>boolean</code>是JavaScript中的基本类型，而<code>Boolean</code>是JavaScript中的构造函数。</p>
<h3 id="_1-2-数值" tabindex="-1"><a class="header-anchor" href="#_1-2-数值" aria-hidden="true">#</a> 1.2 数值</h3>
<p>使用number来定义数值类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_1-3-字符串" tabindex="-1"><a class="header-anchor" href="#_1-3-字符串" aria-hidden="true">#</a> 1.3 字符串</h3>
<p>使用<code>string</code>来定义字符串类型：</p>
<div class="language-Ts ext-Ts line-numbers-mode"><pre v-pre class="language-Ts"><code>const name: string = '余光';
const templateName = `hi ${name}!`
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_1-4-空值" tabindex="-1"><a class="header-anchor" href="#_1-4-空值" aria-hidden="true">#</a> 1.4 空值</h3>
<p>JavaScript没有空值（Void）的概念，在TypeScript中，可以用<code>void</code>表示没有任何返回值的函数：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">alertName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'My name is Tom'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>声明一个<code>void</code>类型的变量没有什么用，因为你只能将它赋值为undefined和null：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> unusable<span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><img src="https://img-blog.csdnimg.cn/6c68bc6018f243b28cc0ec2ede6cb54a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="50%" />
<h3 id="_1-5-null-和-undefined" tabindex="-1"><a class="header-anchor" href="#_1-5-null-和-undefined" aria-hidden="true">#</a> 1.5 Null 和 Undefined</h3>
<p>在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> u<span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> n<span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说undefined类型的变量，可以赋值给number类型的变量：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 严格模式下，会报错</span>
<span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token comment">// 这样也不会报错</span>
<span class="token keyword">let</span> u<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> u<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h3>
<ol>
<li>声明变量的数据类型为 void 时，非严格模式下，变量的值可以为 undefined 或 null。而严格模式下，变量的值只能为 undefined。</li>
<li>严格模式下：<code>let num: number = undefined;</code>会报错</li>
</ol>
<p><img src="https://img-blog.csdnimg.cn/3f292f9f460046c9a4a6e65c245c45f6.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="二、任意值" tabindex="-1"><a class="header-anchor" href="#二、任意值" aria-hidden="true">#</a> 二、任意值</h2>
<p>任意值<code>Any</code>用来表示允许赋值为任意类型。</p>
<p>先来看下面的代码</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> age<span class="token operator">:</span><span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

age <span class="token operator">=</span> <span class="token string">'余光'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><img src="https://img-blog.csdnimg.cn/082700e3f127434c87e8187c4ecbaf3f.png" width="50%" />
<p>类型检测会提前帮我们规避一些不必要的风险，大家在平时也一定会遇到类型不匹配这样的错误，如果是<code>any</code>类型，则允许被赋值为任意类型。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> age<span class="token operator">:</span><span class="token builtin">any</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

age <span class="token operator">=</span> <span class="token string">'余光'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_2-1-任意值的属性和方法" tabindex="-1"><a class="header-anchor" href="#_2-1-任意值的属性和方法" aria-hidden="true">#</a> 2.1 任意值的属性和方法</h3>
<p>在任意值上访问任何属性都是允许的：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> anyThing<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token string">'todo'</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>anyThing<span class="token punctuation">.</span>myName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>anyThing<span class="token punctuation">.</span>myName<span class="token punctuation">.</span>firstName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>也允许调用任何方法：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> anyThing<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>
anyThing<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。</p>
<h3 id="_2-2-未声明类型的变量" tabindex="-1"><a class="header-anchor" href="#_2-2-未声明类型的变量" aria-hidden="true">#</a> 2.2 未声明类型的变量</h3>
<p>变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> something<span class="token punctuation">;</span>
something <span class="token operator">=</span> <span class="token string">'str'</span><span class="token punctuation">;</span>
something <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
something<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>

<span class="token comment">// 等价于</span>

<span class="token keyword">let</span> something<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
something <span class="token operator">=</span> <span class="token string">'str'</span><span class="token punctuation">;</span>
something <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
something<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_2-3-注意" tabindex="-1"><a class="header-anchor" href="#_2-3-注意" aria-hidden="true">#</a> 2.3 注意</h3>
<p>经过前面两点（尤其是第二点）的描述，你会发现如果给变量添加了<code>any</code>的声明，那么Typescript就变成了Anyscript了，那岂不是一夜回到了解放前？</p>
<p>理论上我们尽量不使用any，就好像才出现了const和let之后，我们进来避免试用var一样。</p>
<p><img src="https://img-blog.csdnimg.cn/b6dc499ae4834147a444455a65f30567.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="三、类型推论" tabindex="-1"><a class="header-anchor" href="#三、类型推论" aria-hidden="true">#</a> 三、类型推论</h2>
<blockquote>
<p>如果没有明确的指定类型，那么TypeScript会依照类型<strong>推论</strong>（Type Inference）的规则推断出一个类型。</p>
</blockquote>
<p>先来看看下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> age <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
age <span class="token operator">=</span> <span class="token string">'余光'</span><span class="token punctuation">;</span> <span class="token comment">// 不能将类型“string”分配给类型“number”</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><img src="https://img-blog.csdnimg.cn/1f52a88a2f0e477ca71aa0a4cc073997.png" width="50%" />
<p>这是因为Ts会在没有明确指定类型的时候，根据赋值时数据类型推测出一个指定类型，这就是<strong>类型推论</strong>。</p>
<h3 id="注意-1" tabindex="-1"><a class="header-anchor" href="#注意-1" aria-hidden="true">#</a> 注意</h3>
<p>如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成<code>any</code>类型而完全不被类型检查。</p>
<h2 id="四、联合类型" tabindex="-1"><a class="header-anchor" href="#四、联合类型" aria-hidden="true">#</a> 四、联合类型</h2>
<blockquote>
<p>联合类型（Union Types）表示取值可以为多种类型中的一种。</p>
</blockquote>
<p>第一、二小节提到了基本类型的怎么指定的，如果你希望一个变量的类型是可选的可以试用any，但还有更好的方式就是明确指定几个类型——联合类型</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> category<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
category <span class="token operator">=</span> <span class="token string">'seven'</span><span class="token punctuation">;</span>
category <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
category <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 不能将类型“boolean”分配给类型“string | number”。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>联合类型使用 | 分隔每个类型。表示允许设置的类型</p>
<h3 id="注意-2" tabindex="-1"><a class="header-anchor" href="#注意-2" aria-hidden="true">#</a> 注意</h3>
<p>当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span><span class="token parameter">something<span class="token operator">:</span> string <span class="token operator">|</span> number</span><span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">{</span>
    <span class="token keyword">return</span> something<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><img src="https://img-blog.csdnimg.cn/1f859671f0fd41438cc1bf6cebc468d3.png" />
<p>联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型，所以也会遇到上面问题</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> val<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
val <span class="token operator">=</span> <span class="token string">'seven'</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
val <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 类型“number”上不存在属性“length”</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>此时如果你细心，你会发现：val是联合类型，而不会因为赋值而导致type类型变化</p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>本篇文章是《Typescript基础入门》第一篇，到这里就结束了，主要带大家了解一下基本类型在Ts中的表现，你看绝大部分概念我们都可以吸收，写起来虽然会有些别扭，但也不是特别难以接受，会不会更有信心了解下去了！我们共勉～</p>
<p>下一篇文章我们来聊一聊引用（对象、数组）类型在Ts中又会有什么不同呢？</p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>邮箱：webbj97@163.com</li>
</ul>
<h3 id="其他沉淀" tabindex="-1"><a class="header-anchor" href="#其他沉淀" aria-hidden="true">#</a> 其他沉淀</h3>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Github: Js版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN博客汇总<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
