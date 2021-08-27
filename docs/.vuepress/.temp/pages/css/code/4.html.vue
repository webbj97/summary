<template><h1 id="css的上下文之bfc" tabindex="-1"><a class="header-anchor" href="#css的上下文之bfc" aria-hidden="true">#</a> CSS的上下文之BFC</h1>
<blockquote>
<p>看到这个名词，可能会有些陌生，但其实 上下文 = 区域，如果这么理解的话就会有行级上下文、块级上下文、flex上下文等等有一定排列规则的区域，我们今天只聊一聊 块级格式化上下文（BFC）</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/20210225181216355.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、什么是bfc" tabindex="-1"><a class="header-anchor" href="#一、什么是bfc" aria-hidden="true">#</a> 一、什么是BFC？</h2>
<p>BFC全称”Block Formatting Context”, 中文为“块级格式化上下文”。是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。</p>
<p>下列方式会创建块格式化上下文（列举常见的方式）：</p>
<ul>
<li>根元素（<code>&lt;html&gt;</code>）</li>
<li>浮动元素（元素的 <code>float</code> 不是 none）</li>
<li>绝对定位元素（元素的 position 为 absolute 或 fixed）</li>
<li>display 为 inline-block、table-cells、flex</li>
<li>overflow 计算值不为 visible 的块元素</li>
</ul>
<p>块格式化上下文包含创建它的元素内部的所有内容。</p>
<p><strong>整理一下：</strong></p>
<p>BFC属于普通的文档流，具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，它有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。</p>
<h2 id="二、bfc的特点以及应用" tabindex="-1"><a class="header-anchor" href="#二、bfc的特点以及应用" aria-hidden="true">#</a> 二、BFC的特点以及应用</h2>
<h4 id="_2-1-同一个bfc下-外边距会发生折叠" tabindex="-1"><a class="header-anchor" href="#_2-1-同一个bfc下-外边距会发生折叠" aria-hidden="true">#</a> 2.1 同一个BFC下，外边距会发生折叠</h4>
<p>来看这样一段代码：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.child</span><span class="token punctuation">{</span>
	<span class="token property">margin</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
	<span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>95<span class="token punctuation">,</span> 172<span class="token punctuation">,</span> 182<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210225150958328.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述">
<strong>现象：</strong></p>
<p>明明两个child都存在100px的外边距，但他们实际间隔却不是200px，而是100px，这算是一种合并“规则”，当你发现你的页面因为加入了margin而出现了奇怪的问题，不妨往合并的方向思考</p>
<p><strong>解释：</strong></p>
<p>同一个BFC中，相邻的兄弟元素之间的相对的margin-bottom和margin-top会进行合并，并且显示的是较大值。</p>
<p><strong>解决与注意：</strong></p>
<p>想要解决这样的问题，我们可以通过将两个child放置于不同的BFC中，直接上图：</p>
<p>下图通过BFC解决了问题，是否产生了新的问题？是否可以通过其他方式解决呢？希望大家能灵活选择噢～
<img src="https://img-blog.csdnimg.cn/20210225153141902.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="_2-2-解决父子元素之间margin塌陷问题" tabindex="-1"><a class="header-anchor" href="#_2-2-解决父子元素之间margin塌陷问题" aria-hidden="true">#</a> 2.2 解决父子元素之间margin塌陷问题</h4>
<p>来看这样一段代码：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #ccc<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>149<span class="token punctuation">,</span> 98<span class="token punctuation">,</span> 98<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.child</span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>95<span class="token punctuation">,</span> 172<span class="token punctuation">,</span> 182<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210225153806864.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p><strong>现象：</strong></p>
<ul>
<li>box元素存在外边距100px，相对于body的效果生效了，毫无疑问；</li>
<li>child元素存在外边距50px，相对于box的效果仅左侧生效了，存在疑问；</li>
</ul>
<p><strong>解释：</strong></p>
<p>有了2.1小节的经验，大家会猜测是不是margin再次发生了合并？也可以，但更合理的形容叫 <strong>“margin塌陷”</strong>。</p>
<p>父子相邻嵌套的元素在垂直方向的margin会发生塌陷，并取最大值。</p>
<p>拿例子中的<code>box元素</code>举例，box作为顶，子元素向外称起50px却失效了，可以理解为顶塌陷了。</p>
<p>如果子元素的margin-top = 200px 会发生什么呢？</p>
<p><strong>解决与注意：</strong></p>
<p>通过触发BFC，你可以解决当下的问题，但是请思考，子元素的是否需要margin来实现间距，给box元素添加padding会不会更好一些？
<img src="https://img-blog.csdnimg.cn/20210225155432411.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="_2-3-bfc-可以包含浮动的元素-清除浮动" tabindex="-1"><a class="header-anchor" href="#_2-3-bfc-可以包含浮动的元素-清除浮动" aria-hidden="true">#</a> 2.3 BFC 可以包含浮动的元素（清除浮动）</h4>
<p>我们都知道，浮动的元素会脱离普通文档流，来看下下面一个例子：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.box</span><span class="token punctuation">{</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.child</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210225160259970.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p><strong>现象：</strong></p>
<ul>
<li>child因为浮动，脱离了文档流；</li>
<li>box盒子的高度只计算了border；</li>
</ul>
<p><strong>解释：</strong></p>
<ul>
<li>因为子元素已经脱离了文档流，所以父元素在计算高度时忽略了它；</li>
</ul>
<p><strong>解决：</strong></p>
<p>触发容器的 BFC，使得容器包裹着浮动元素。</p>
<p><img src="https://img-blog.csdnimg.cn/20210225161012774.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h4 id="_2-4-bfc-解决文字环绕的问题" tabindex="-1"><a class="header-anchor" href="#_2-4-bfc-解决文字环绕的问题" aria-hidden="true">#</a> 2.4 BFC 解决文字环绕的问题</h4>
<p>浮动的目的。最初时，浮动只能用于图像（某些浏览器还支持表的浮动），目的就是为了允许其他内容（如文本）“围绕”该图像。而后来的CSS允许浮动任何元素。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
	<span class="token property">padding</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
	<span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
	<span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
	<span class="token property">background</span><span class="token punctuation">:</span> #ddd<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.left</span> <span class="token punctuation">{</span>
	<span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
	<span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
	<span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
	<span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>81<span class="token punctuation">,</span> 196<span class="token punctuation">,</span> 204<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        解决文字环绕的问题, 解决文字环绕的问题, 解决文字环绕的问题, 解决文字环绕的问题
        解决文字环绕的问题, 解决文字环绕的问题, 解决文字环绕的问题, 解决文字环绕的问题
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/20210225165200811.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述">
<strong>现象：</strong></p>
<ul>
<li>给左侧子元素设置了左浮动，使得文字环绕在它周围，但为什么文字会被环绕，而不是被遮挡？</li>
</ul>
<p><strong>解释：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210225172334976.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>看到float会脱离文档流，这是相对于盒子模型来说的。但它没有脱离文本流。</p>
<ul>
<li>文档流是相对于盒子模型讲的</li>
<li>文本流是相对于文子段落讲的</li>
</ul>
<p>元素浮动之后，会让它脱离文档流，也就是说当它后面还有元素时，其他元素会无视它所占据了的区域，直接在它身下布局。但是文字却会认同浮动元素所占据的区域，围绕它布局，也就是没有脱离文本流。</p>
<p>在<a href="https://developer.mozilla.org/zh-CN/docs/CSS/float" target="_blank" rel="noopener noreferrer">MDN上提到<OutboundLink/></a>，该元素从网页的正常流动(文档流)中移除，<strong>尽管仍然保持部分的流动性</strong>（与绝对定位相反）。</p>
<p><strong>解决</strong></p>
<p>将包裹文字的元素置为BFC，看图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210225180430948.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>问题解决了，新知识又增加了，例如自适应两栏布局，请看下图：</p>
<p><img src="https://img-blog.csdnimg.cn/2021022518092059.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述">
<img src="https://img-blog.csdnimg.cn/20210225181148302.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>《CSS基础系列》第四篇文章</p>
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
</p></template>
