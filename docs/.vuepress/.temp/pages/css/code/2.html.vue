<template><h1 id="简述-css-盒模型" tabindex="-1"><a class="header-anchor" href="#简述-css-盒模型" aria-hidden="true">#</a> 简述 CSS 盒模型</h1>
<h2 id="一、块级盒子-block-box-和-内联盒子-inline-box" tabindex="-1"><a class="header-anchor" href="#一、块级盒子-block-box-和-内联盒子-inline-box" aria-hidden="true">#</a> 一、块级盒子（Block box） 和 内联盒子（Inline box）</h2>
<p>在 CSS 中我们广泛地使用两种“盒子” —— 块级盒子 (block box) 和 内联盒子 (inline box)。这两种盒子会在页面流（page flow）和元素之间的关系方面表现出不同的行为，我们这里不细分析如果转换他们的行为，仅做了解。</p>
<h4 id="_1-1-块级-block-盒子会表现出以下行为" tabindex="-1"><a class="header-anchor" href="#_1-1-块级-block-盒子会表现出以下行为" aria-hidden="true">#</a> 1.1 块级（block）盒子会表现出以下行为:</h4>
<ul>
<li>盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽</li>
<li>每个盒子都会换行</li>
<li>width 和 height 属性可以发挥作用</li>
<li>内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”</li>
</ul>
<p><strong>常见的块级元素：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>div, h1~h6, p, form, ul, li, ol, dl, address, hr, menu, table, fieldset
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="_1-2-行级-inline-盒子会表现出以下行为" tabindex="-1"><a class="header-anchor" href="#_1-2-行级-inline-盒子会表现出以下行为" aria-hidden="true">#</a> 1.2 行级（inline）盒子会表现出以下行为:</h4>
<ul>
<li>盒子不会产生换行。</li>
<li>width 和 height 属性将不起作用。</li>
<li>垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。</li>
<li>水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。</li>
</ul>
<p><strong>常见的行内元素有：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>a, span, label, strong, em, br, img, input, select, textarea, cite,
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>一个简单的示例了解以下：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210222133910805.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="二、盒模型的组成" tabindex="-1"><a class="header-anchor" href="#二、盒模型的组成" aria-hidden="true">#</a> 二、盒模型的组成</h2>
<p>完整的 CSS 盒模型应用于<strong>块级盒子</strong>，内联盒子只使用盒模型中定义的部分内容。模型定义了盒的每个部分：</p>
<ul>
<li>content：内容</li>
<li>padding：包围在内容区域外部的空白区域——内边距</li>
<li>border：边框盒包裹内容和内边距——边框</li>
<li>margin：这是最外面的区域，是盒子和其他元素之间的空白区域——外边距</li>
</ul>
<p>合在一起就可以创建我们在页面上看到的内容。为了增加一些额外的复杂性，有一个标准的和替代（IE）的盒模型。</p>
<p><img src="https://img-blog.csdnimg.cn/20210222140135257.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>在chrome浏览器下可查看元素盒模型，如下图：</p>
<p><img src="https://img-blog.csdn.net/2018082008592117?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="这里写图片描述"></p>
<h4 id="_2-1-内边距-padding" tabindex="-1"><a class="header-anchor" href="#_2-1-内边距-padding" aria-hidden="true">#</a> 2.1 内边距（padding）</h4>
<p>我们把月饼和月饼盒的距离称为盒子模型的 <code>内边距</code>
<img src="https://img-blog.csdn.net/20180820084312989?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="这里写图片描述"></p>
<p>内边距位于边框和内容区域之间。与外边距不同，您不能有负数量的内边距，所以值必须是0或正的值。</p>
<p>我们可以使用padding简写属性控制元素所有边，或者每边单独使用等价的普通属性：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>padding-top
padding-right
padding-bottom
padding-left
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>您还可以更改类.container的内边距，这将在容器和方框之间留出空间。任何元素上的内边距都可以更改，并在其边界和元素内部的任何内容之间留出空间。</p>
<p><img src="https://img-blog.csdnimg.cn/20210222185033273.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_2-2-外边距-margin" tabindex="-1"><a class="header-anchor" href="#_2-2-外边距-margin" aria-hidden="true">#</a> 2.2 外边距（margin）</h3>
<p>月饼盒与另一个月饼盒之间的距离，我们管他叫<code>外边距</code>
<img src="https://img-blog.csdn.net/20180820084424764?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="这里写图片描述"></p>
<p>外边距是盒子周围一圈看不到的空间。它会把其他元素从盒子旁边推开。 外边距属性值可以为正也可以为负。设置负值会导致和其他内容重叠。无论使用标准模型还是替代模型，外边距总是在计算可见部分后<strong>额外添加</strong>。</p>
<p>我们可以使用margin属性一次控制一个元素的所有边距，或者每边单独使用等价的普通属性控制：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">margin</span><span class="token punctuation">:</span> 10px
// 等于
<span class="token property">margin-top</span><span class="token punctuation">:</span> 10px
<span class="token property">margin-right</span><span class="token punctuation">:</span> 10px
<span class="token property">margin-bottom</span><span class="token punctuation">:</span> 10px
<span class="token property">margin-left</span><span class="token punctuation">:</span> 10px
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在下面的示例中，可以看一下测试元素在外边距设置为正时是如何推开周边元素，以及设置为负时，是如何收缩空间的。</p>
<p><img src="https://img-blog.csdnimg.cn/20210222182034950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="外边距折叠-margin塌陷" tabindex="-1"><a class="header-anchor" href="#外边距折叠-margin塌陷" aria-hidden="true">#</a> 外边距折叠（margin塌陷）</h4>
<p>理解外边距的一个关键是外边距折叠的概念。如果你有两个外边距相接的元素，这些外边距将合并为一个外边距，即最大的单个外边距的大小。</p>
<p>在下面的例子中，我们有两个段落。顶部段落的页 margin-bottom为50px。第二段的margin-top 为30px。因为外边距折叠的概念，所以框之间的实际外边距是50px，而不是两个外边距的总和。</p>
<p><img src="https://img-blog.csdnimg.cn/20210222183440426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.one</span> <span class="token punctuation">{</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.two</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

&lt;div class=<span class="token string">"container"</span>>
  &lt;p class=<span class="token string">"one"</span>>I am paragraph one.&lt;/p>
  &lt;p class=<span class="token string">"two"</span>>I am paragraph two.&lt;/p>
&lt;/div>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>如果你减少 <strong>.two</strong> 内的margin-top，实际上没有变化的。至于为什么以及如何解决它，我们在这不做讨论。</p>
<h3 id="_2-3-边框-border" tabindex="-1"><a class="header-anchor" href="#_2-3-边框-border" aria-hidden="true">#</a> 2.3 边框（border）</h3>
<p>月饼盒的边，在样式表里被称为<strong>边框</strong>
<img src="https://img-blog.csdn.net/20180820084639647?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="这里写图片描述"></p>
<p>它是在边距和填充框之间绘制的。</p>
<ul>
<li>如果您正在使用标准的盒模型，边框的大小将添加到框的宽度和高度。</li>
<li>如果您使用的是替代盒模型，那么边框的大小会使内容框更小，因为它会占用一些可用的宽度和高度。</li>
</ul>
<p>为边框设置样式时，有大量的属性可以使用——有四个边框，每个边框都有样式、宽度和颜色，我们可能需要对它们进行操作。</p>
<p>可以使用border属性一次设置所有四个边框的宽度、颜色和样式。</p>
<p>分别设置每边的宽度、颜色和样式，可以使用：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>border-top
border-right
border-bottom
border-left
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>设置所有边的颜色、样式或宽度，请使用以下属性：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>border-width
border-style
border-color
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>设置单边的颜色、样式或宽度，可以使用最细粒度的普通属性之一：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>border-top-width
border-top-style
border-top-color
border-right-width
border-right-style
border-right-color
border-bottom-width
border-bottom-style
border-bottom-color
border-left-width
border-left-style
border-left-color
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="三、标准盒模型" tabindex="-1"><a class="header-anchor" href="#三、标准盒模型" aria-hidden="true">#</a> 三、标准盒模型</h2>
<p>在标准模型中，如果你给盒设置 <code>width</code> 和 <code>height</code>，实际设置的是 <code>content box</code>。 padding 和 border 再加上设置的宽高一起决定整个盒子的大小。 见下图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210222141753447.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>如果使用标准模型，则宽度 = 410px (300 + 50 + 50 + 5 + 5)，由<strong>margin之外</strong>的其他属性组成。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>注: margin 不计入实际大小 —— 当然，它会影响盒子在页面所占空间，但是影响的是盒子外部空间。

盒子的范围到边框为止 —— 不会延伸到margin。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="四、替代模型-ie" tabindex="-1"><a class="header-anchor" href="#四、替代模型-ie" aria-hidden="true">#</a> 四、替代模型（IE）</h2>
<p>你可能会认为盒子的大小还要加上边框和内边距，这样很麻烦，就比如在我们前端在开发页面时，经常只知道盒子的宽高，总不能我们还要备一个计算器，计算内外边距吧？</p>
<p>因为这个原因，css还有一个替代盒模型。使用这个模型，所有宽度都是可见宽度，所以：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>内容宽度 = 该宽度 - border - padding。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/2021022214422319.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>大家可以看到<code>child</code>的宽度就为300 - 50 - 50 - 5 - 5 = 190px。</p>
<p>默认浏览器会使用标准模型。如果需要使用替代模型，可以通过为其设置 box-sizing: border-box 来实现。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果你希望所有元素都使用替代模式，而且确实很常用，设置 box-sizing 在 <strong>html</strong> 元素上，然后设置所有元素继承该属性，正如下面的例子。如果想要深入理解，请看 the CSS Tricks article on box-sizing。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">html</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">*, *::before, *::after</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210222151146273.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述">
最后你应该一眼就能看出来两个盒子之前的区别了吧？</p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>本文是《CSS基础系列》第二篇文章</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励！</p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷 JS，水平有限，虚心学习中</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Github: Js 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN 博客汇总<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
