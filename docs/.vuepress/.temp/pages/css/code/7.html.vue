<template><h1 id="css-进阶-网格布局-grid-及其基本属性" tabindex="-1"><a class="header-anchor" href="#css-进阶-网格布局-grid-及其基本属性" aria-hidden="true">#</a> CSS 进阶：网格布局（Grid）及其基本属性</h1>
<blockquote>
<p>网格布局（Grid）是最强大的 CSS 布局方案。起初我也认为 flex 布局就可以完成绝大部分布局场景，但谁不希望用更直观、更简洁的方式来布局自己的网页呢，于是 Grid 就是我们的下一站，他与 flex 布局互相弥补，并不会互相取代</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/2021051614242199.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> 一、前言</h2>
<p>上图这样的布局，就是 Grid 布局的拿手好戏。</p>
<p><strong>Grid 布局</strong>与<strong>Flex 布局</strong>有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。</p>
<p>Flex 布局是轴线布局，只能指定&quot;项目&quot;针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成&quot;行&quot;和&quot;列&quot;，产生单元格，然后指定&quot;项目所在&quot;的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。</p>
<h2 id="二、grid-的基本概念" tabindex="-1"><a class="header-anchor" href="#二、grid-的基本概念" aria-hidden="true">#</a> 二、Grid 的基本概念</h2>
<blockquote>
<p>和 flex 相似，我们要了解一些名词，比如“容器”、“项目”等等</p>
</blockquote>
<h3 id="_2-1-容器-和-项目" tabindex="-1"><a class="header-anchor" href="#_2-1-容器-和-项目" aria-hidden="true">#</a> 2.1 “容器”和“项目”</h3>
<p>采用网格布局的区域，称为&quot;容器&quot;（container）。容器内部采用网格定位的子元素，称为&quot;项目&quot;（item）。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>上面代码中，最外层的<code>&lt;div&gt;</code>元素就是容器，内层的三个<code>&lt;div&gt;</code>元素就是项目。</p>
<p>注意：项目只能是容器的顶层子元素（直属子元素），不包含项目的子元素，比如上面代码的<code>&lt;p&gt;</code>元素就不是项目。Grid 布局只对项目生效。</p>
<h3 id="_2-2-行、列、单元格" tabindex="-1"><a class="header-anchor" href="#_2-2-行、列、单元格" aria-hidden="true">#</a> 2.2 行、列、单元格</h3>
<p>容器里面的水平区域称为&quot;行&quot;（row），垂直区域称为&quot;列&quot;（column）。</p>
<p><img src="https://img-blog.csdnimg.cn/20210515171908599.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>行和列隔开的格子，被称作“单元格”，我们之后为项目布局，也都是以单元格为单位的。一个 3 行 3 列的布局，自然会产生 9 格单元格</p>
<h3 id="_2-3-网格线" tabindex="-1"><a class="header-anchor" href="#_2-3-网格线" aria-hidden="true">#</a> 2.3 网格线</h3>
<p>划分网格的线（单元格），称为&quot;网格线&quot;（grid line）。水平网格线划分出行，垂直网格线划分出列。</p>
<p>正常情况下，n 行有 n + 1 根水平网格线，m 列有 m + 1 根垂直网格线，比如三行就有四根水平网格线。</p>
<p><img src="https://img-blog.csdnimg.cn/20210515173534966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="三、容器基本属性" tabindex="-1"><a class="header-anchor" href="#三、容器基本属性" aria-hidden="true">#</a> 三、容器基本属性</h2>
<h3 id="_3-1-display" tabindex="-1"><a class="header-anchor" href="#_3-1-display" aria-hidden="true">#</a> 3.1 display</h3>
<p>当给元素设置为<code>display: grid;</code>后，默认情况下，容器元素都是块级元素，但也可以设成行内元素。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.grid</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">span</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>grid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>grid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210515180553100.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>当你设置<code>.grid{ display: inline-grid }</code>时：</p>
<p><img src="https://img-blog.csdnimg.cn/20210515180722820.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_3-2-grid-template-columns、grid-template-rows" tabindex="-1"><a class="header-anchor" href="#_3-2-grid-template-columns、grid-template-rows" aria-hidden="true">#</a> 3.2 grid-template-columns、grid-template-rows</h3>
<p>我们要规划行和列的相关属性，所以有了这两个属性；</p>
<ul>
<li>grid-template-columns: 定义每一列的列宽</li>
<li>grid-template-rows: 定义每一行的行高。</li>
</ul>
<p><strong>直接定每行每列的宽、高</strong></p>
<p>例如：容器的宽 = 高 = 300px，如果要划分每个网格 100 * 100，可以这么写：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.grid</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-grid<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
    <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
    <span class="token comment">/* grid-template-columns: 33.33% 33.33% 33.33%; */</span>
    <span class="token comment">/* grid-template-rows: 33.33% 33.33% 33.33%; */</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.grid > div</span> <span class="token punctuation">{</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>grid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>9<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>效果如图：为了识别网格，颜色是我通过 JS 随机生成的</p>
<p><img src="https://img-blog.csdnimg.cn/20210515184427624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>而同样的效果，也可以通过 repeat 方法来做到：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.grid</span> <span class="token punctuation">{</span>
    <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="repeat-方法" tabindex="-1"><a class="header-anchor" href="#repeat-方法" aria-hidden="true">#</a> repeat()方法</h4>
<ul>
<li>repeat()接受两个参数，第一个参数是重复的次数（上例是 3），第二个参数是所要重复的值。</li>
<li>repeat()重复某种模式也是可以的。</li>
</ul>
<p>第一点我们已经展示了，来看看第二点：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>2<span class="token punctuation">,</span> 100px 50px 150px<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>2<span class="token punctuation">,</span> 100px 50px 150px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我利用 repeat()，将一种模式重复排列了 2 次，即第一列和第四列的宽度为 100px，第二列和第五列为 50px，第三列和第六列为 150px，而第一行宽 100px，第二行宽 50px，效果如图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210515191046569.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="auto-fill-关键字" tabindex="-1"><a class="header-anchor" href="#auto-fill-关键字" aria-hidden="true">#</a> auto-fill 关键字</h4>
<p>有时，单元格的<strong>大小是固定的</strong>，但是<strong>容器的大小不确定</strong>。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 auto-fill 关键字表示自动填充。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>auto-fill<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>2<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210515193737216.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="fr-片段" tabindex="-1"><a class="header-anchor" href="#fr-片段" aria-hidden="true">#</a> fr(片段)</h4>
<blockquote>
<p>网格布局提供了<strong>fr 关键字</strong>（fraction 的缩写，意为&quot;片段&quot;）。如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍。</p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 1fr 2fr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210516125502619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>fr 可以与绝对长度的单位结合使用，这时会非常方便：例如下面会显示为第一列 100px，剩余宽度内第三列是是第二列的二倍</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 1fr 2fr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="auto" tabindex="-1"><a class="header-anchor" href="#auto" aria-hidden="true">#</a> auto</h4>
<blockquote>
<p>auto 关键字表示由浏览器自己决定长度。</p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px auto 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>上面这段代码，可以做到左右两列 100px，而中间自适应。</p>
<h4 id="网格线的名称" tabindex="-1"><a class="header-anchor" href="#网格线的名称" aria-hidden="true">#</a> 网格线的名称</h4>
<blockquote>
<p><code>grid-template-columns</code>属性和<code>grid-template-rows</code>属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。</p>
</blockquote>
<p>并且可以起多个名字</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> [c1] 100px [c2] auto [col-3 c3] 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_3-3-grid-row-gap、grid-column-gap、grid-gap-属性" tabindex="-1"><a class="header-anchor" href="#_3-3-grid-row-gap、grid-column-gap、grid-gap-属性" aria-hidden="true">#</a> 3.3 grid-row-gap、grid-column-gap、grid-gap 属性</h3>
<p>gap：缺口，即行、列之间项目的间距，让我们轻松脱离 padding 和 margin</p>
<h4 id="grid-row-gap" tabindex="-1"><a class="header-anchor" href="#grid-row-gap" aria-hidden="true">#</a> grid-row-gap</h4>
<blockquote>
<p>属性设置行与行的间隔（行间距）</p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">grid-row-gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> // 行间距20px
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210516140013379.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="grid-column-gap" tabindex="-1"><a class="header-anchor" href="#grid-column-gap" aria-hidden="true">#</a> grid-column-gap</h4>
<blockquote>
<p>grid-column-gap 属性设置列与列的间隔（列间距）</p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">grid-column-gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> // 行间距20px
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210516140710784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="grid-gap" tabindex="-1"><a class="header-anchor" href="#grid-gap" aria-hidden="true">#</a> grid-gap</h4>
<blockquote>
<p><code>grid-gap: &lt;grid-row-gap&gt; &lt;grid-column-gap&gt;</code>，它是行列间距的缩写</p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">grid-gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/2021051614082896.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_3-4-grid-template-areas-属性" tabindex="-1"><a class="header-anchor" href="#_3-4-grid-template-areas-属性" aria-hidden="true">#</a> 3.4 grid-template-areas 属性</h3>
<blockquote>
<p>网格布局允许指定&quot;区域&quot;（area），一个区域由单个或多个单元格组成。grid-template-areas 属性用于定义区域。</p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-template-areas</span><span class="token punctuation">:</span>
    <span class="token string">"a b c"</span>
    <span class="token string">"d e f"</span>
    <span class="token string">"g h i"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.a</span> <span class="token punctuation">{</span>
    <span class="token property">grid-area</span><span class="token punctuation">:</span> a<span class="token punctuation">;</span> // 表示它代表grid容器内的a项目
<span class="token punctuation">}</span>
...
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>我们利用这个属性实现本篇文章顶部的图例：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.grid</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
    <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
    <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 60px 60px 60px<span class="token punctuation">;</span>
    <span class="token property">grid-gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">grid-template-areas</span><span class="token punctuation">:</span>
      <span class="token string">"a a b"</span>
      <span class="token string">"a a e"</span>
      <span class="token string">"c d e"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.grid > div</span> <span class="token punctuation">{</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>grid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>a<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">grid-area</span><span class="token punctuation">:</span> a</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>b<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">grid-area</span><span class="token punctuation">:</span> b</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>c<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">grid-area</span><span class="token punctuation">:</span> c</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">grid-area</span><span class="token punctuation">:</span> d</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>e<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">grid-area</span><span class="token punctuation">:</span> e</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210516151742593.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>大家可以看到，这样的布局 grid 可以轻松的处理，而 flex 却很难实现。</p>
<h3 id="_3-5-justify-items、align-items、place-items-属性" tabindex="-1"><a class="header-anchor" href="#_3-5-justify-items、align-items、place-items-属性" aria-hidden="true">#</a> 3.5 justify-items、align-items、place-items 属性</h3>
<p>看到前两个属性，熟悉 flex 的同学可能会眼前一亮，在 grid 里，他们的含义很接近</p>
<ul>
<li>justify-items：设置单元格内容的水平位置（左中右）；</li>
<li>align-items：设置单元格内容的垂直位置（上中下）；</li>
</ul>
<p>他们的取值范围完全相同：</p>
<ol>
<li>start：对齐单元格的起始边缘。</li>
<li>end：对齐单元格的结束边缘。</li>
<li>center：单元格内部居中。</li>
<li>stretch：拉伸，占满单元格的整个宽度（默认值）。</li>
</ol>
<p>来看这样一个例子：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-gap</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token property">justify-items</span><span class="token punctuation">:</span> end<span class="token punctuation">;</span> // 水平，在单元格右侧
<span class="token punctuation">}</span>

<span class="token selector">.grid > div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210516162304114.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>每个项目，都在他所在单元格的右侧（尾端）</p>
<p><code>align-items</code>也是同理，这里我们就不过多介绍了。</p>
<p><strong>place-items 是上面两个属性的简写形式</strong></p>
<p><code>place-items: &lt;align-items&gt; &lt;justify-items&gt;;</code>，</p>
<h3 id="_3-7-justify-content、align-content、place-content-属性" tabindex="-1"><a class="header-anchor" href="#_3-7-justify-content、align-content、place-content-属性" aria-hidden="true">#</a> 3.7 justify-content、align-content、place-content 属性</h3>
<p>justify-content 属性是整个内容区域在容器里面的水平位置（左中右），align-content 属性是整个内容区域的垂直位置（上中下）。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> start | end | center | stretch | space-around | space-between
    | space-evenly<span class="token punctuation">;</span>
  <span class="token property">align-content</span><span class="token punctuation">:</span> start | end | center | stretch | space-around | space-between |
    space-evenly<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>直接上代码：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-gap</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token property">justify-items</span><span class="token punctuation">:</span> end<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>符合我们的预期，完美：</p>
<p><img src="https://img-blog.csdnimg.cn/20210516165931726.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>同样<code>place-content</code>也是前两个属性的简写形式。</p>
<h3 id="grid-auto-columns、grid-auto-rows-属性" tabindex="-1"><a class="header-anchor" href="#grid-auto-columns、grid-auto-rows-属性" aria-hidden="true">#</a> grid-auto-columns、grid-auto-rows 属性</h3>
<p>有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。</p>
<p><code>grid-auto-columns</code>属性和<code>grid-auto-rows</code>属性用来设置，浏览器自动创建的多余网格的列宽和行高。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-auto-rows</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="四、项目基本属性" tabindex="-1"><a class="header-anchor" href="#四、项目基本属性" aria-hidden="true">#</a> 四、项目基本属性</h2>
<h3 id="_4-1-垂直网格线" tabindex="-1"><a class="header-anchor" href="#_4-1-垂直网格线" aria-hidden="true">#</a> 4.1 垂直网格线，</h3>
<ul>
<li>grid-column-start：项目左起始网格线</li>
<li>grid-column-end：项目右结束网格线</li>
<li>grid-row-start 项目上起始网格线</li>
<li>grid-row-end 项目下结束网格线</li>
</ul>
<p>此时我突然想到一个伪居中思路：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.grid</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
    <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
    <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.grid>div</span> <span class="token punctuation">{</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.center</span><span class="token punctuation">{</span>
    <span class="token property">grid-column-start</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
    <span class="token property">grid-column-end</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
    <span class="token property">grid-row-start</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
    <span class="token property">grid-row-end</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>当我们确定几行几列，之后，我们可以做到特定的竖直水平居中。</p>
<p><img src="https://img-blog.csdnimg.cn/20210516171554662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>而这几个属性，个人认为在使用上要符合逻辑，比如：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.grid</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
    <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
    <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.center</span><span class="token punctuation">{</span>
    <span class="token property">grid-column-start</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
    <span class="token property">grid-column-end</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
    <span class="token property">grid-row-start</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
    <span class="token property">grid-row-end</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>grid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>a<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>b<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>e<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>b<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>b<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>b<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210516173039550.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>看上去，这只是一个简单的效果，在dom结构上，第一个div在视觉上排在了第4位，这容易让人产生不必要的误解，所以我们在使用时，要结合dom节点的实际位置进行排列组合。</p>
<p><strong>简写</strong></p>
<ul>
<li>grid-column：是<code>grid-column-start</code>和<code>grid-column-end</code>的合并简写形式</li>
<li>grid-row：<code>grid-row-start</code>和<code>grid-row-end</code>的合并简写形式</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">grid-column</span><span class="token punctuation">:</span> &lt;start-line> / &lt;end-line><span class="token punctuation">;</span>
  <span class="token property">grid-row</span><span class="token punctuation">:</span> &lt;start-line> / &lt;end-line><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_4-2-grid-area-属性" tabindex="-1"><a class="header-anchor" href="#_4-2-grid-area-属性" aria-hidden="true">#</a> 4.2 grid-area 属性</h3>
<p>在3.4中我们提到过，grid-area属性指定项目放在哪一个区域。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item-1</span> <span class="token punctuation">{</span>
  <span class="token property">grid-area</span><span class="token punctuation">:</span> e<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>注意：</strong></p>
<p>grid-area还有另一种使用方式，他可以作为作为<code>grid-row-start</code>、<code>grid-column-start</code>、<code>grid-row-end</code>、<code>grid-column-end</code>的合并简写形式，直接指定项目的位置。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item-1</span> <span class="token punctuation">{</span>
  <span class="token property">grid-area</span><span class="token punctuation">:</span> 1 / 1 / 2 / 2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>grid在某些特定的场景下，可以完全替代flex布局，帮助你完成一些看似复杂的css样式设计，希望这篇文章可以帮助你了解grid布局。</p>
<p><strong>参考</strong></p>
<ul>
<li><a href="http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html" target="_blank" rel="noopener noreferrer">网格布局教程<OutboundLink/></a></li>
</ul>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>邮箱：webbj97@163.com</li>
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
