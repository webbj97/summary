<template><h1 id="css的上下文之层叠上下文" tabindex="-1"><a class="header-anchor" href="#css的上下文之层叠上下文" aria-hidden="true">#</a> CSS的上下文之层叠上下文</h1>
<blockquote>
<p>看到层叠，大家一定会联想到定位元素会是的元素之间发生“遮挡”，而z-index可以改变他们之间的遮挡优先级，但这仅仅是层叠这一概念中很小的一部分。
本文就来聊一聊css中的层叠上下文到底是如何给元素规定叠加顺序的。</p>
</blockquote>
<h2 id="一、什么是层叠上下文" tabindex="-1"><a class="header-anchor" href="#一、什么是层叠上下文" aria-hidden="true">#</a> 一、什么是层叠上下文？</h2>
<p>层叠上下文，英文称作”stacking context”. 我们假定用户正面向（浏览器）视窗或网页，而 HTML 元素沿着其相对于用户的一条虚构的 z 轴排开，层叠上下文就是对这些 HTML 元素的一个三维构想。众 HTML 元素基于其元素属性按照优先级顺序占据这个空间。</p>
<p>我们可以把层叠上下文同样可以理解成是元素的属性。</p>
<p>下列方式会形成层叠上下文（列举常见的方式）：</p>
<ul>
<li>position 值为 static 以外的值，且 z-index 值不为 auto;</li>
<li>flex (flexbox) 容器的子元素，且 z-index 值不为 auto;</li>
<li>grid (grid) 容器的子元素，且 z-index 值不为 auto;</li>
<li>opacity 属性值小于 1 的元素;</li>
<li>transform属性 不为none的元素;</li>
</ul>
<p><strong>总结：</strong></p>
<p>在层叠上下文中，子元素同样也按照上面解释的规则进行层叠。 重要的是，其子级层叠上下文的 z-index 值只在父级中才有意义。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。</p>
<p><img src="https://img-blog.csdnimg.cn/20210228133405935.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="二、什么是层叠水平" tabindex="-1"><a class="header-anchor" href="#二、什么是层叠水平" aria-hidden="true">#</a> 二、什么是层叠水平？</h2>
<p>“层叠水平”，英文称作”stacking level”，决定了同一个层叠上下文中元素在z轴上的显示顺序。网页中的每个元素都是独立的个体，他们一定是会有一个类似的排名排序的情况存在。而这个排名排序、论资排辈就是我们这里所说的“层叠水平”。</p>
<p>但注意，每一个层叠上下文内部的子元素都不会突破包裹它的上下文。</p>
<p>下面是引自<a href="">张鑫旭大大的一段解释</a>，我觉得很通俗易懂：</p>
<p>所有的元素都有层叠水平，包括层叠上下文元素，层叠上下文元素的层叠水平可以理解为官员的职级，1品2品，县长省长之类。然后，对于普通元素的层叠水平，我们的探讨仅仅局限在当前层叠上下文元素中。为什么呢？因为否则没有意义。</p>
<p>翻译成术语就是：普通元素的层叠水平优先由层叠上下文决定，因此，层叠水平的比较只有在当前层叠上下文元素中才有意义。</p>
<p><strong>举例：</strong></p>
<p>大家看下面的一段代码：</p>
<p><img src="https://img-blog.csdnimg.cn/20210226182358369.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p><strong>现象：</strong></p>
<p>在这个例子中，每个被定位的元素都创建了独自的层叠上下文，因为他们被指定了定位属性和 z-index 值。我们把层叠上下文的层级列在下面：</p>
<ul>
<li>DIV #1</li>
<li>DIV #2</li>
<li>DIV #3
<ul>
<li>DIV #4</li>
<li>DIV #5</li>
</ul>
</li>
</ul>
<p>不同层的z-index他们的意义只相对于同一个层叠上下文。你会发现z-index：100的也没有覆盖z-index：1的。</p>
<p><img src="https://img-blog.csdnimg.cn/20210228133436334.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<p><strong>结论：</strong></p>
<p>千万不要把层叠水平和CSS的z-index属性混为一谈。没错，某些情况下z-index确实可以影响层叠水平，但是，只限于定位元素以及flex盒子的孩子元素；而层叠水平所有的元素都存在。</p>
<h2 id="三、什么是层叠顺序" tabindex="-1"><a class="header-anchor" href="#三、什么是层叠顺序" aria-hidden="true">#</a> 三、什么是层叠顺序？</h2>
<p>“层叠顺序”英文称作”stacking order”. 表示元素发生层叠时候有着特定的垂直显示顺序，注意，这里跟上面两个不一样，上面的层叠上下文和层叠水平是概念，而这里的层叠顺序是规则。</p>
<p>在CSS2.1的年代，在CSS3还没有出现的时候（<strong>注意这里的前提</strong>），层叠顺序规则遵循下面这张图（同样是引自张大大的旧图）：</p>
<h2 id="四、层叠上下文的特性" tabindex="-1"><a class="header-anchor" href="#四、层叠上下文的特性" aria-hidden="true">#</a> 四、层叠上下文的特性</h2>
<h4 id="_4-1-准则" tabindex="-1"><a class="header-anchor" href="#_4-1-准则" aria-hidden="true">#</a> 4.1 准则</h4>
<ul>
<li>谁大谁上：当具有明显的层叠水平标示的时候，如识别的z-indx值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。通俗讲就是官大的压死官小的。</li>
<li>后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。
在CSS和HTML领域，只要元素发生了重叠，都离不开上面这两个黄金准则。因为后面会有多个实例说明，这里就到此为止。</li>
</ul>
<h4 id="_4-2-特性" tabindex="-1"><a class="header-anchor" href="#_4-2-特性" aria-hidden="true">#</a> 4.2 特性</h4>
<ul>
<li>层叠上下文的层叠水平要比普通元素高；</li>
<li>层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文。</li>
<li>每个层叠上下文和兄弟元素独立，也就是当进行层叠变化或渲染的时候，只需要考虑后代元素。</li>
<li>每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中。</li>
</ul>
<p>讲到这里我们对层叠上下文应该有了一定理解，我们共勉～</p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>参考：</strong></p>
<ul>
<li><a href="https://developer.cdn.mozilla.net/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context" target="_blank" rel="noopener noreferrer">MDN<OutboundLink/></a></li>
<li><a href="https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/" target="_blank" rel="noopener noreferrer">深入理解CSS中的层叠上下文和层叠顺序<OutboundLink/></a></li>
</ul>
<p>《CSS基础系列》第五篇文章，下期预告《CSS基础：flex基本属性》</p>
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
