<template><h1 id="css进阶-弹性盒子-flex-及其基本属性" tabindex="-1"><a class="header-anchor" href="#css进阶-弹性盒子-flex-及其基本属性" aria-hidden="true">#</a> CSS进阶：弹性盒子（flex）及其基本属性</h1>
<blockquote>
<p>这篇文章我写的很纠结，因为flex布局作为“新”特性，写它的文章没有1w篇也有9999篇了，所以尽量为代码添加实例将flex布局介绍给大家，希望帮助大家和自己提高</p>
</blockquote>
<p>布局，一个很泛的词，在CSS早期，很多经典的布局都是依靠<code>position</code>+<code>float</code>+<code>display</code>属性。组合使用时稍有不慎就会导致棘手的问题。</p>
<p>于是Flex诞生了，flex容器的主要特征是能够修改其子项的宽度或高度，以在不同的屏幕尺寸上以最佳方式填充可用空间。</p>
<font color="red">篇幅较长，点个收藏慢慢看？</font>
<p><img src="https://img-blog.csdnimg.cn/20210303113141578.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、flex是什么" tabindex="-1"><a class="header-anchor" href="#一、flex是什么" aria-hidden="true">#</a> 一、Flex是什么？</h2>
<p>Flex 是 Flexible Box 的缩写，意为&quot;弹性布局&quot;，用来为盒状模型提供最大的灵活性。</p>
<p>**注意：**这是您需要在父容器上设置的唯一属性，它的所有直接子容器将自动变为flex项目。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> -webkit-flex<span class="token punctuation">;</span> <span class="token comment">/* 如果 Webkit 内核浏览器 */</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-flex<span class="token punctuation">;</span> <span class="token comment">/* 如果 你希望它是行内元素 */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="二、flex的基础概念" tabindex="-1"><a class="header-anchor" href="#二、flex的基础概念" aria-hidden="true">#</a> 二、Flex的基础概念</h2>
<p>有多种方法可以对<strong>弹性盒子</strong>的属性进行分组介绍，在我看到的几篇文章中，均是将它们分为两组，一组用于<code>Flex 容器</code>，另一组用于<code>Flex 项目</code>。</p>
<ul>
<li>采用 Flex 布局的元素，称为 Flex 容器（flex container），简称&quot;容器&quot;。</li>
<li>它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称&quot;项目&quot;。</li>
</ul>
<p>容器默认存在两根轴：</p>
<ul>
<li>水平的主轴（main axis）
<ul>
<li>主轴的开始位置叫做<code>main-start</code>;</li>
<li>结束位置叫做<code>main-end</code>;</li>
</ul>
</li>
<li>垂直的交叉轴（cross axis）
<ul>
<li>交叉轴的开始位置叫做<code>cross-start</code>;</li>
<li>结束位置叫做<code>cross-end</code>;</li>
</ul>
</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/20210302150521452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="三、容器的属性" tabindex="-1"><a class="header-anchor" href="#三、容器的属性" aria-hidden="true">#</a> 三、容器的属性</h2>
<ul>
<li>flex-direction</li>
<li>flex-wrap</li>
<li>flex-flow</li>
<li>justify-content</li>
<li>align-items</li>
<li>align-content</li>
</ul>
<p>准备工作，看看我们的<strong>基础代码</strong></p>
<ul>
<li>我们给box添加flex属性</li>
<li>模拟一下上一小结的 <code>main-axis</code>和<code>cross-axis</code></li>
<li>给box添加宽高，防止布局时导致的box自适应。</li>
<li>固定“项目”的样式</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box::after</span><span class="token punctuation">{</span>
    <span class="token comment">/* 我是主横轴 */</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
    <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px dashed red<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box::before</span><span class="token punctuation">{</span>
    <span class="token comment">/* 我是主横轴 */</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">right</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token property">border-right</span><span class="token punctuation">:</span> 1px dashed blue<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>175<span class="token punctuation">,</span> 112<span class="token punctuation">,</span> 112<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>160<span class="token punctuation">,</span> 184<span class="token punctuation">,</span> 95<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>68<span class="token punctuation">,</span> 131<span class="token punctuation">,</span> 63<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210302164701782.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>在这之后我们可以一一验证容器的属性啦～</p>
<h4 id="_3-1-flex-direction属性" tabindex="-1"><a class="header-anchor" href="#_3-1-flex-direction属性" aria-hidden="true">#</a> 3.1 flex-direction属性</h4>
<p>flex-direction属性决定主轴的方向（即项目的<code>main-axis</code>方向）。</p>
<p><strong>取值：</strong></p>
<ul>
<li>row（默认值）：主轴为水平方向，起点在左端。</li>
<li>row-reverse：主轴为水平方向，起点在右端。</li>
<li>column：主轴为垂直方向，起点在上沿。</li>
<li>column-reverse：主轴为垂直方向，起点在下沿。</li>
</ul>
<p><strong>示例：</strong></p>
<p>给box容器添加属性：</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td><p style="white-space: nowrap;">flex-direction: row;</p></td>
<td>默认值-主轴为水平方向，起点在左端</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302165810135.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">flex-direction: row-reverse;</p></td>
<td>主轴为水平方向，起点在右端</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302171225974.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">flex-direction: column;</p></td>
<td>主轴为垂直方向，起点在上沿</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302171459460.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">flex-direction: column-reverse;</p></td>
<td>主轴为垂直方向，起点在下沿</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302171557823.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h4 id="_3-2-flex-wrap属性" tabindex="-1"><a class="header-anchor" href="#_3-2-flex-wrap属性" aria-hidden="true">#</a> 3.2 flex-wrap属性</h4>
<p>最初的flexbox概念是在一行中设置其项目的容器。该flex-wrap属性控制flex容器是以单行还是多行布置其项目，以及新行的堆叠方向。</p>
<p><strong>取值：</strong></p>
<ul>
<li>nowrap（默认值）：项目显示在一行中，默认情况下会缩小它们以适应Flex容器的宽度;</li>
<li>wrap：如果需要，从左到右和从上到下，弹性项目将显示在多行中;</li>
<li>wrap-reverse：如果需要，从左到右和从下到上，弹性项目将显示在多行中;</li>
</ul>
<p><strong>示例：</strong></p>
<p>给box容器添加属性（注意我本小节剔除了box内的height属性）：</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td><p style="white-space: nowrap;">flex-wrap: nowrap</p></td>
<td>项目显示在一行中，并自适应宽度</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302172835698.png"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">flex-wrap: wrap</p></td>
<td>从左到右和从上到下，弹性项目将显示在多行中</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302172411619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">flex-wrap: wrap-reverse</p></td>
<td>从左到右和从下到上，弹性项目将显示在多行中</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302172907124.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h4 id="_3-3-flex-flow" tabindex="-1"><a class="header-anchor" href="#_3-3-flex-flow" aria-hidden="true">#</a> 3.3 flex-flow</h4>
<p>flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">flex-flow</span><span class="token punctuation">:</span> &lt;flex-direction> || &lt;flex-wrap><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_3-4-justify-content属性" tabindex="-1"><a class="header-anchor" href="#_3-4-justify-content属性" aria-hidden="true">#</a> 3.4 justify-content属性</h4>
<p>使flex项目沿着flex容器当前行的主轴对齐。当一行上的所有伸缩项目都不灵活或已达到最大大小时，它有助于分配剩余的可用空间。</p>
<p><strong>取值：</strong></p>
<p>下面假设主轴为从左到右。</p>
<ul>
<li>flex-start（默认值）：左对齐；</li>
<li>flex-end：右对齐；</li>
<li>center： 居中；</li>
<li>space-between：两端对齐，项目之间的间隔都相等；</li>
<li>space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍；</li>
</ul>
<p><strong>示例：</strong></p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td><p style="white-space: nowrap;">justify-content: flex-start;</p></td>
<td>左对齐</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302175950277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">justify-content: flex-end;</p></td>
<td>右对齐（注意和row-reverse的区别）</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302175950277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">justify-content: center;</p></td>
<td>居中</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302180233134.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">justify-content: space-between;</p></td>
<td>两端对齐，项目之间的间隔都相等；</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302180358412.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">justify-content: space-around;</p></td>
<td>每个项目两侧的间隔相等,项目中间的间距 = 2 * 左右边缘的间距</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302180450299.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<p><strong>注意</strong></p>
<p>如果主轴为纵向轴，那么对应的表现也会改变</p>
<h4 id="_3-5-align-items属性" tabindex="-1"><a class="header-anchor" href="#_3-5-align-items属性" aria-hidden="true">#</a> 3.5 align-items属性</h4>
<p>align-items属性定义项目在交叉轴上如何对齐。</p>
<p><strong>取值：</strong></p>
<p>下面假设交叉轴从上到下。</p>
<ul>
<li>stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。</li>
<li>flex-start：交叉轴的起点对齐。</li>
<li>flex-end：交叉轴的终点对齐。</li>
<li>center：交叉轴的中点对齐。</li>
<li>baseline: 项目的第一行文字的基线对齐。</li>
</ul>
<p><strong>示例：</strong></p>
<p>为了方便观察效果，我们给<strong>项目1-5</strong>不同的高度</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td><p style="white-space: nowrap;">align-items: stretch;</p></td>
<td>如果项目未设置高度或设为auto，将占满整个容器的高度</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/2021030218152155.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">align-items: flex-start</p></td>
<td>交叉轴的起点对齐</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302182139141.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">align-items: flex-end</p></td>
<td>交叉轴的终点对齐</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210302182738483.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">align-items: center</p></td>
<td>交叉轴的中点对齐</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/2021030218222772.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">align-items: baseline</p></td>
<td>项目的第一行文字的基线对齐</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/2021030218291984.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h4 id="_3-6-align-content属性" tabindex="-1"><a class="header-anchor" href="#_3-6-align-content属性" aria-hidden="true">#</a> 3.6 align-content属性</h4>
<p><code>align-content</code>属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</p>
<p>当存在多个轴时，此属性会在Flex容器内将Flex容器的轴线以接近<code>justify-content</code>的方式对齐。</p>
<p><strong>取值：</strong></p>
<ul>
<li>flex-start：与交叉轴的起点对齐。</li>
<li>flex-end：与交叉轴的终点对齐。</li>
<li>center：与交叉轴的中点对齐。</li>
<li>space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。</li>
<li>space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。</li>
<li>stretch（默认值）：轴线占满整个交叉轴。</li>
</ul>
<h2 id="四、项目的属性" tabindex="-1"><a class="header-anchor" href="#四、项目的属性" aria-hidden="true">#</a> 四、项目的属性</h2>
<ul>
<li>order</li>
<li>flex-grow</li>
<li>flex-shrink</li>
<li>flex-basis</li>
<li>flex</li>
<li>align-self</li>
</ul>
<h4 id="_4-1-order" tabindex="-1"><a class="header-anchor" href="#_4-1-order" aria-hidden="true">#</a> 4.1 order</h4>
<p>order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td><p style="white-space: nowrap;">项目1: { order: 1 }</p><p style="white-space: nowrap;">项目2: { order: 2 }</p><p style="white-space: nowrap;">项目3: { order: 3 }</p></td>
<td>数值越小，排列越靠前</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303102117880.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">项目1: { order: 3 }</p><p style="white-space: nowrap;">项目2: { order: 1 }</p><p style="white-space: nowrap;">项目3: { order: 2 }</p></td>
<td>数值越小，排列越靠前</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303102224929.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h4 id="_4-2-flex-grow" tabindex="-1"><a class="header-anchor" href="#_4-2-flex-grow" aria-hidden="true">#</a> 4.2 flex-grow</h4>
<p>此属性指定的缩放，该属性确定当分配正的自由空间时，<code>缩放项目</code>相对于<code>容器</code>中其余<code>其余项目</code>将增长多少。</p>
<p>注意：flex-grow：默认为0，即如果存在剩余空间，也不放大。</p>
<p>话不多说直接上对比图：</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td><p style="white-space: nowrap;">项目1: { flex-grow: 0 }</p><p style="white-space: nowrap;">项目2: { flex-grow: 0 }</p><p style="white-space: nowrap;">项目3: { flex-grow: 0 }</p></td>
<td>默认为0，即如果存在剩余空间，也不放大。</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303110010352.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">项目1: { flex-grow: 2 }</p><p style="white-space: nowrap;">项目2: { flex-grow: 0 }</p><p style="white-space: nowrap;">项目3: { flex-grow: 2 }</p></td>
<td>项目1和3平分剩余宽度</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303112117544.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">项目1: { flex-grow: 1 }</p><p style="white-space: nowrap;">项目2: { flex-grow: 2 }</p><p style="white-space: nowrap;">项目3: { flex-grow: 1 }</p></td>
<td>项目2分到的宽度是项目1和3的2倍</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303112627844.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h4 id="_4-3-flex-shrink属性" tabindex="-1"><a class="header-anchor" href="#_4-3-flex-shrink属性" aria-hidden="true">#</a> 4.3 flex-shrink属性</h4>
<p>flex-shrink的参数指定弹性收缩因子，该因子确定在分配负的自由空间时，弹性项目相对于弹性容器中其余弹性项目将收缩多少。</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td>所有项目无flex-shrink</td>
<td>默认为1，即如果空间不足，该项目将缩小</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303114052367.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">项目1: { flex-shrink: 0 }</p><p style="white-space: nowrap;">项目2-6: { flex-shrink: 1 }</p></td>
<td>如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303114352384.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
<tr>
<td><p style="white-space: nowrap;">项目1: { flex-shrink: 3 }</p><p style="white-space: nowrap;">项目2: { flex-shrink: 2 }</p><p style="white-space: nowrap;">项目3-6: { flex-shrink: 1 }</p></td>
<td>项目1得到的负空间 是3/3+2+1*4，项目2类比</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303114614622.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h4 id="_4-4-flex-basis属性" tabindex="-1"><a class="header-anchor" href="#_4-4-flex-basis属性" aria-hidden="true">#</a> 4.4 flex-basis属性</h4>
<p>flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。</p>
<p>该属性采用与width和height属性相同的值，并在根据弹性系数分配可用空间之前指定弹性项目的初始主要尺寸。</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td>项目1 {flex-basis: 200px}</td>
<td>项目1 初始分配宽度200px</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303160525827.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h4 id="_4-5-flex" tabindex="-1"><a class="header-anchor" href="#_4-5-flex" aria-hidden="true">#</a> 4.5 flex</h4>
<p>此属性是<code>flex-grow</code>，<code>flex-shrink</code>和<code>flex-basis</code>的简写。默认值为<code>0 1 auto</code>。</p>
<p>该属性有两个快捷值：</p>
<ul>
<li>auto (1 1 auto)</li>
<li>none (0 0 auto)</li>
</ul>
<p>建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。</p>
<h4 id="_4-6-align-self属性" tabindex="-1"><a class="header-anchor" href="#_4-6-align-self属性" aria-hidden="true">#</a> 4.6 align-self属性</h4>
<p><code>align-self</code>属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。</p>
<table>
<thead>
<tr>
<th>css</th>
<th>解释</th>
<th>效果</th>
</tr>
</thead>
<tbody>
<tr>
<td><p style="white-space: nowrap;">.box {align-items: center}</p><p style="white-space: nowrap;">项目2 {align-self: flex-end}</p></td>
<td>项目2 按纵轴end对齐</td>
<td><img width="320px" src="https://img-blog.csdnimg.cn/20210303181837603.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"></td>
</tr>
</tbody>
</table>
<h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2>
<p><strong>参考：</strong></p>
<p><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" target="_blank" rel="noopener noreferrer">Flex 布局教程：语法篇<OutboundLink/></a>
<a href="https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties#toc-usage" target="_blank" rel="noopener noreferrer">A Visual Guide to CSS3 Flexbox Properties<OutboundLink/></a></p>
<p>《CSS基础系列》第六篇文章，下期预告《CSS基础：flex布局场景》</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励！</p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷 JS，水平有限，虚心学习中</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Github: Js版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_7944500.html" target="_blank" rel="noopener noreferrer">CSS 基础<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
