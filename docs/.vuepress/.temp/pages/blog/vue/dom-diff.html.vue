<template><h1 id="virtual-dom" tabindex="-1"><a class="header-anchor" href="#virtual-dom" aria-hidden="true">#</a> Virtual DOM</h1>
<blockquote>
<p>大家好我是余光，这是我《Vue系列》的第二篇文章，本篇文章我们会介绍：什么是虚拟Dom、为什么为是虚拟Dom、Diff对比等多个问题，希望能帮到大家～</p>
</blockquote>
<h2 id="一、virtual-dom" tabindex="-1"><a class="header-anchor" href="#一、virtual-dom" aria-hidden="true">#</a> 一、Virtual DOM</h2>
<blockquote>
<p>大家在学习Js时，直接操作（修改）Dom可能是最让你头疼的事情，巧了！浏览器也很讨厌频繁的修改DOM（有关浏览器渲染过程的文章在路上啦）</p>
</blockquote>
<p><strong>首先我们先认同这样的前提：</strong></p>
<ul>
<li>dom操作是非常昂贵的。</li>
<li>数据变化大小是随机的，全部刷新整个视图和单独刷新改动部分是需要取舍的</li>
</ul>
<h3 id="_1-1-什么是虚拟dom" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是虚拟dom" aria-hidden="true">#</a> 1.1 什么是虚拟DOM？</h3>
<blockquote>
<p>答：所谓虚拟DOM，就是用一个JS对象来描述一个DOM节点</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 我是一个div标签：</span>
<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"a"</span> id<span class="token operator">=</span><span class="token string">"b"</span><span class="token operator">></span>我是内容<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>


<span class="token comment">// 用Js对象简单表示：</span>
<span class="token punctuation">{</span>
    tag<span class="token operator">:</span><span class="token string">'div'</span><span class="token punctuation">,</span>        <span class="token comment">// 元素标签</span>
    attrs<span class="token operator">:</span><span class="token punctuation">{</span>           <span class="token comment">// 属性</span>
        <span class="token keyword">class</span><span class="token operator">:</span><span class="token string">'a'</span><span class="token punctuation">,</span>
        id<span class="token operator">:</span><span class="token string">'b'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    text<span class="token operator">:</span><span class="token string">'我是内容'</span><span class="token punctuation">,</span>  <span class="token comment">// 文本内容</span>
    children<span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>       <span class="token comment">// 子元素</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>我们把组成一个DOM节点的必要属性通过一个JS对象表示出来，那么这个JS对象就可以用来描述这个DOM节点，我们把这个JS对象就称为是这个真实DOM节点的<code>虚拟DOM节点</code>。</p>
<h3 id="_1-2-为什么会有虚拟dom" tabindex="-1"><a class="header-anchor" href="#_1-2-为什么会有虚拟dom" aria-hidden="true">#</a> 1.2 为什么会有虚拟Dom？</h3>
<blockquote>
<p>答：JS的计算性能来换取操作DOM所消耗的性能</p>
</blockquote>
<p>我们知道，Vue是数据驱动视图的，数据发生变化视图就要随之更新，在更新视图的时候难免要操作DOM，即使计算机硬件一直在更新迭代，操作DOM的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户的体验。真实的DOM节点，哪怕一个最简单的div也包含着很多属性，可以打印出来直观感受一下：</p>
<img src="https://img-blog.csdnimg.cn/20210422164628634.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70">
<p>因此，Vue使用虚拟Dom的形式，用Js的计算性能来承担部分Dom的消耗，即：</p>
<ul>
<li>减少Dom操作</li>
<li>精简更新的次数</li>
</ul>
<p>最直观的思路就是我们不要盲目的去更新视图，而是通过对比数据变化前后的状态，计算出视图中哪些地方需要更新，只更新需要更新的地方。</p>
<p>我们可以用JS模拟出一个DOM节点，称之为虚拟DOM节点。当数据发生变化时，我们对比变化前后的虚拟DOM节点，通过<code>DOM-Diff</code>算法计算出需要更新的地方，然后去更新需要更新的视图。</p>
<p>这就是虚拟DOM产生的原因以及最大的用途。</p>
<h3 id="_1-3-vue中的虚拟dom" tabindex="-1"><a class="header-anchor" href="#_1-3-vue中的虚拟dom" aria-hidden="true">#</a> 1.3 Vue中的虚拟DOM</h3>
<blockquote>
<p>我们介绍了虚拟DOM的概念以及为什么要有虚拟DOM，那么在Vue中虚拟DOM是怎么实现的呢？</p>
</blockquote>
<p><strong>描述节点</strong></p>
<p>Virtual DOM 就是用一个原生的 <code>JS 对象</code>去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多。在 Vue.js 中，Virtual DOM 是用 VNode 这么一个 Class 去描述的：</p>
<p>这里千万不要被这些茫茫多的属性吓到，我们只需要有一个概念，即VNode类包含了描述Dom节点的一些列属性：</p>
<ul>
<li>tag：标签名</li>
<li>data： 数据</li>
<li>children： 子节点（数组结构，元素是VNode类型）</li>
<li>...</li>
</ul>
<p>VNode类中包含了描述一个真实DOM节点所需要的一系列属性，如tag表示节点的标签名，text表示节点中包含的文本，children表示该节点包含的子节点等。通过属性之间不同的搭配，就可以描述出各种类型的真实DOM节点。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VNode</span> <span class="token punctuation">{</span>
    tag<span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// 字符串 || 无类型（undefined、null）</span>
    data<span class="token operator">:</span> VNodeData <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// VNodeData || 无类型</span>
    children<span class="token operator">:</span> <span class="token operator">?</span> Array <span class="token operator">&lt;</span> VNode <span class="token operator">></span> <span class="token punctuation">;</span> <span class="token comment">// 可空 || 数组&lt;内部也是一个节点的模版></span>
    text<span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    elm<span class="token operator">:</span> Node <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    ns<span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    context<span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// rendered in this component's scope</span>
    key<span class="token operator">:</span> string <span class="token operator">|</span> number <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    componentOptions<span class="token operator">:</span> VNodeComponentOptions <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    componentInstance<span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// component instance</span>
    parent<span class="token operator">:</span> VNode <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// component placeholder node</span>

    <span class="token comment">// strictly internal</span>
    raw<span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// contains raw HTML? (server only)</span>
    isStatic<span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// hoisted static node</span>
    isRootInsert<span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// necessary for enter transition check</span>
    isComment<span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// 空注释占位</span>
    isCloned<span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// is a cloned node?</span>
    isOnce<span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// is a v-once node?</span>
    asyncFactory<span class="token operator">:</span> Function <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// async component factory function</span>
    asyncMeta<span class="token operator">:</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    isAsyncPlaceholder<span class="token operator">:</span> boolean<span class="token punctuation">;</span>
    ssrContext<span class="token operator">:</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    fnContext<span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// real context vm for functional nodes</span>
    fnOptions<span class="token operator">:</span> <span class="token operator">?</span> ComponentOptions<span class="token punctuation">;</span> <span class="token comment">// for SSR caching</span>
    devtoolsMeta<span class="token operator">:</span> <span class="token operator">?</span> Object<span class="token punctuation">;</span> <span class="token comment">// used to store functional render context for devtools</span>
    fnScopeId<span class="token operator">:</span> <span class="token operator">?</span> string<span class="token punctuation">;</span> <span class="token comment">// functional scope id support</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>
        <span class="token parameter">tag <span class="token operator">?</span> <span class="token operator">:</span> string<span class="token punctuation">,</span>
        data <span class="token operator">?</span> <span class="token operator">:</span> VNodeData<span class="token punctuation">,</span>
        children <span class="token operator">?</span> <span class="token operator">:</span> <span class="token operator">?</span> Array <span class="token operator">&lt;</span> VNode <span class="token operator">></span> <span class="token punctuation">,</span>
        text <span class="token operator">?</span> <span class="token operator">:</span> string<span class="token punctuation">,</span>
        elm <span class="token operator">?</span> <span class="token operator">:</span> Node<span class="token punctuation">,</span>
        context <span class="token operator">?</span> <span class="token operator">:</span> Component<span class="token punctuation">,</span>
        componentOptions <span class="token operator">?</span> <span class="token operator">:</span> VNodeComponentOptions<span class="token punctuation">,</span>
        asyncFactory <span class="token operator">?</span> <span class="token operator">:</span> Function</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tag <span class="token operator">=</span> tag
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data
        <span class="token keyword">this</span><span class="token punctuation">.</span>children <span class="token operator">=</span> children
        <span class="token keyword">this</span><span class="token punctuation">.</span>text <span class="token operator">=</span> text
        <span class="token keyword">this</span><span class="token punctuation">.</span>elm <span class="token operator">=</span> elm
        <span class="token keyword">this</span><span class="token punctuation">.</span>ns <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> context
        <span class="token keyword">this</span><span class="token punctuation">.</span>fnContext <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fnOptions <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fnScopeId <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> data <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>key
        <span class="token keyword">this</span><span class="token punctuation">.</span>componentOptions <span class="token operator">=</span> componentOptions
        <span class="token keyword">this</span><span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>raw <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isStatic <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isRootInsert <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isComment <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isCloned <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isOnce <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>asyncFactory <span class="token operator">=</span> asyncFactory
        <span class="token keyword">this</span><span class="token punctuation">.</span>asyncMeta <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isAsyncPlaceholder <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// DEPRECATED: alias for componentInstance for backwards compat.</span>
    <span class="token comment">/* istanbul ignore next */</span>
    <span class="token keyword">get</span> <span class="token function">child</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>componentInstance
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><p>其实 VNode 是对真实 DOM 的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其它属性都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。</p>
<p>由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是非常轻量和简单的。</p>
<h3 id="_1-4-注释节点、文本节点" tabindex="-1"><a class="header-anchor" href="#_1-4-注释节点、文本节点" aria-hidden="true">#</a> 1.4 注释节点、文本节点</h3>
<p>在有了1.3小节的节点模版后，有一些节点，可以快速的得到：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建注释节点</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> createEmptyVNode <span class="token operator">=</span> <span class="token punctuation">(</span>text<span class="token operator">:</span> string <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  node<span class="token punctuation">.</span>text <span class="token operator">=</span> text<span class="token punctuation">;</span> <span class="token comment">// 内容</span>
  node<span class="token punctuation">.</span>isComment <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 是注释节点</span>
  <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建文本节点</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createTextVNode</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">val<span class="token operator">:</span> string <span class="token operator">|</span> number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 文本节点主要就是承载文本，所有只需要text属性</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token function">String</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_1-5-克隆节点" tabindex="-1"><a class="header-anchor" href="#_1-5-克隆节点" aria-hidden="true">#</a> 1.5 克隆节点</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建克隆节点</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">cloneVNode</span> <span class="token punctuation">(</span><span class="token parameter">vnode<span class="token operator">:</span> VNode</span><span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token punctuation">{</span>
  <span class="token keyword">const</span> cloned <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span>
    vnode<span class="token punctuation">.</span>tag<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>children<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>text<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>context<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>componentOptions<span class="token punctuation">,</span>
    vnode<span class="token punctuation">.</span>asyncFactory
  <span class="token punctuation">)</span>
  cloned<span class="token punctuation">.</span>ns <span class="token operator">=</span> vnode<span class="token punctuation">.</span>ns
  cloned<span class="token punctuation">.</span>isStatic <span class="token operator">=</span> vnode<span class="token punctuation">.</span>isStatic
  cloned<span class="token punctuation">.</span>key <span class="token operator">=</span> vnode<span class="token punctuation">.</span>key
  cloned<span class="token punctuation">.</span>isComment <span class="token operator">=</span> vnode<span class="token punctuation">.</span>isComment
  cloned<span class="token punctuation">.</span>fnContext <span class="token operator">=</span> vnode<span class="token punctuation">.</span>fnContext
  cloned<span class="token punctuation">.</span>fnOptions <span class="token operator">=</span> vnode<span class="token punctuation">.</span>fnOptions
  cloned<span class="token punctuation">.</span>fnScopeId <span class="token operator">=</span> vnode<span class="token punctuation">.</span>fnScopeId
  cloned<span class="token punctuation">.</span>asyncMeta <span class="token operator">=</span> vnode<span class="token punctuation">.</span>asyncMeta
  cloned<span class="token punctuation">.</span>isCloned <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span> cloned
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>从上面代码中可以看到，克隆节点就是把已有节点的属性全部复制到新节点中，而现有节点和新克隆得到的节点之间唯一的不同就是克隆得到的节点<code>isCloned为true</code>。</p>
<h3 id="_1-6-小结" tabindex="-1"><a class="header-anchor" href="#_1-6-小结" aria-hidden="true">#</a> 1.6 小结</h3>
<p>第一节主要是一起了解了虚拟Dom这个概念，以及为什么会有这样的概念、作为虚拟Dom的基本单元VNode大概是什么样子的，至少让我们印象加深，下一节我们研究一下新旧两套虚拟Dom是怎样进行对比获得差异的。</p>
<p>点赞收藏不迷路～</p>
<h2 id="二、diff" tabindex="-1"><a class="header-anchor" href="#二、diff" aria-hidden="true">#</a> 二、diff</h2>
<p>VNode最大的用途就是在数据变化前后生成真实DOM对应的虚拟DOM节点，然后就可以对比新旧两份VNode，找出差异所在，然后更新有差异的DOM节点。</p>
<p>这个过程，被称为Dom-Diff——dom差异。它是整个虚拟DOM的核心所在。</p>
<h3 id="_2-1-patch-补丁" tabindex="-1"><a class="header-anchor" href="#_2-1-patch-补丁" aria-hidden="true">#</a> 2.1 patch（补丁）</h3>
<blockquote>
<p>打补丁从而得到新的VNode，以新的VNode为基准，改造旧的oldVNode使之成为跟新的VNode一样，这就是patch过程要干的事。</p>
</blockquote>
<p>在Vue中，把 DOM-Diff过程叫做patch过程。patch,意为“补丁”，即指对旧的VNode修补，打补丁从而得到新的VNode。</p>
<p><strong>演员</strong></p>
<ul>
<li>旧节点：数据变化之前的节点</li>
<li>新节点：数据变化之后的节点，要正确渲染的节点</li>
</ul>
<p><strong>过程</strong></p>
<ul>
<li>以生成的新的VNode为基准，对比旧的oldVNode
<ul>
<li>1.1 如果新节点有(+)而旧节点上没有(-)，那么就在旧的oldVNode上加上去；</li>
<li>1.2 如果新节点没有(-)而旧节点上有(+)，那么就在旧的oldVNode上去掉；</li>
<li>1.3 如果新节点有(+)而旧节点上也有(+)，那么就以新的VNode为准，更新旧的oldVNode，从而让新旧VNode相同。</li>
</ul>
</li>
</ul>
<p><strong>操作</strong></p>
<ol>
<li>创建节点：新的VNode中有而旧的oldVNode中没有，就在旧的oldVNode中创建。</li>
<li>删除节点：新的VNode中没有而旧的oldVNode中有，就从旧的oldVNode中删除。</li>
<li>更新节点：新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新旧的oldVNode。</li>
</ol>
<h3 id="_2-2-创建节点" tabindex="-1"><a class="header-anchor" href="#_2-2-创建节点" aria-hidden="true">#</a> 2.2 创建节点</h3>
<p>实际上只有3种类型的节点能够被创建并插入到DOM中，它们分别是：元素节点、文本节点、注释节点。</p>
<p>所以Vue在创建节点的时候会：判断在新的VNode中 -&gt; 判断多出来的节点是哪种类型 -&gt; 调用不同的方法创建并插入到DOM中。</p>
<p>其实判断起来也不难，因为这三种类型的节点其特点非常明显，在源码中是怎么判断的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 源码位置: /src/core/vdom/patch.js</span>
<span class="token keyword">function</span> <span class="token function">createElm</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parentElm<span class="token punctuation">,</span> refElm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> vnode<span class="token punctuation">.</span>data<span class="token punctuation">;</span> <span class="token comment">// 节点数据</span>
    <span class="token keyword">const</span> children <span class="token operator">=</span> vnode<span class="token punctuation">.</span>children<span class="token punctuation">;</span> <span class="token comment">// 子节点</span>
    <span class="token keyword">const</span> tag <span class="token operator">=</span> vnode<span class="token punctuation">.</span>tag<span class="token punctuation">;</span> <span class="token comment">// 标签</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        vnode<span class="token punctuation">.</span>elm <span class="token operator">=</span> nodeOps<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span> <span class="token comment">// 创建元素节点</span>
        <span class="token function">createChildren</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> children<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span> <span class="token comment">// 创建元素节点的子节点</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> refElm<span class="token punctuation">)</span> <span class="token comment">// 插入到DOM中</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>isComment<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        vnode<span class="token punctuation">.</span>elm <span class="token operator">=</span> nodeOps<span class="token punctuation">.</span><span class="token function">createComment</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span> <span class="token comment">// 创建注释节点</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> refElm<span class="token punctuation">)</span> <span class="token comment">// 插入到DOM中</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        vnode<span class="token punctuation">.</span>elm <span class="token operator">=</span> nodeOps<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span> <span class="token comment">// 创建文本节点</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> refElm<span class="token punctuation">)</span> <span class="token comment">// 插入到DOM中</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>从上面代码中，我们可以看出：</p>
<ul>
<li>元素节点：只需判断该VNode节点是否有<code>tag</code>标签即可。如果<code>有tag属性</code>即认为是元素节点，则调用createElement方法创建元素节点，通常元素节点还会有子节点，那就递归遍历创建所有子节点，将所有子节点创建好之后insert插入到当前元素节点里面，最后把当前元素节点插入到DOM中。</li>
<li>注释节点，只需判断VNode的<code>isComment属性</code>是否为true即可，若为true则为注释节点，则调用createComment方法创建注释节点，再插入到DOM中。</li>
<li>文本节点，<code>不符合上述两个节点判断的</code>，就是文本节点，则调用createTextNode方法创建文本节点，再插入到DOM中。</li>
</ul>
<h3 id="_2-3-删除节点" tabindex="-1"><a class="header-anchor" href="#_2-3-删除节点" aria-hidden="true">#</a> 2.3 删除节点</h3>
<p>如果某些节点再新的VNode中没有而在旧的oldVNode中有，那么就需要把这些节点从旧的oldVNode中删除。删除节点非常简单，只需在要删除节点的父元素上调用removeChild方法即可。源码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">removeNode</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> parent <span class="token operator">=</span> nodeOps<span class="token punctuation">.</span><span class="token function">parentNode</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token comment">// 获取父节点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nodeOps<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> el<span class="token punctuation">)</span> <span class="token comment">// 调用父节点的removeChild方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_2-4-更新节点" tabindex="-1"><a class="header-anchor" href="#_2-4-更新节点" aria-hidden="true">#</a> 2.4 更新节点</h3>
<blockquote>
<p>old VNode -&gt; patch(补丁) -&gt; new VNode</p>
</blockquote>
<p>更新节点就是当某些节点在新的VNode和旧的oldVNode中都有时，我们就需要细致比较一下，找出不一样的地方进行更新。</p>
<p>介绍更新节点之前，我们先介绍一个小的概念，就是什么是静态节点？我们看个例子：</p>
<p><strong>静态节点</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>我是不会变化的文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>上面这个节点里面只包含了纯文字，没有任何可变的变量，这也就是说，不管数据再怎么变化，只要这个节点渲染了，那么它以后就永远不会发生变化。</p>
<p>OK，有了这个概念以后，我们开始更新节点。更新节点的时候我们需要对以下3种情况进行判断并分别处理：</p>
<ol>
<li>VNode和oldVNode均为静态节点</li>
</ol>
<ul>
<li>我们说了，静态节点无论数据发生任何变化都与它无关，所以都为静态节点的话则直接跳过，无需处理。</li>
</ul>
<ol start="2">
<li>如果VNode是文本节点</li>
</ol>
<ul>
<li>如果这个节点内只包含纯文本，那么只需看oldVNode是否也是文本节点，如果是，那就比较两个文本是否不同，如果不同则更新oldVNode里的文本。</li>
<li>如果oldVNode不是文本节点，那么不论它是什么，直接调用setTextNode方法把它改成文本节点，并且文本内容跟VNode相同。</li>
</ul>
<ol start="3">
<li>如果VNode是元素节点</li>
</ol>
<ul>
<li>如果VNode是元素节点，则又细分以下两种情况：
<ul>
<li>如果<code>新的节点</code>内包含了<code>子节点</code>，那么此时要看旧的节点是否包含子节点，如果旧的节点里也包含了子节点，那就需要递归对比更新子节点；</li>
<li>如果<code>旧的节点</code>里不包含<code>子节点</code>，那么这个旧节点有可能是空节点或者是文本节点，如果<code>旧的节点是空节点</code>就把新的节点里的<code>子节点创建一份</code>然后<code>插入到旧的节点</code>里面，如果旧的节点是文本节点，则把文本清空，然后把新的节点里的子节点创建一份然后插入到旧的节点里面。</li>
</ul>
</li>
<li>如果该节点不包含子节点，同时它又不是文本节点，那就说明该节点是个空节点，那就好办了，不管旧节点之前里面都有啥，直接清空即可。</li>
</ul>
<p>OK，处理完以上3种情况，更新节点就算基本完成了，接下来我们看下源码中具体是怎么实现的，源码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 更新节点</span>
<span class="token keyword">function</span> <span class="token function">patchVnode</span> <span class="token punctuation">(</span><span class="token parameter">oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> removeOnly</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// vnode与oldVnode是否完全一样？若是，退出程序</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVnode <span class="token operator">===</span> vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> elm <span class="token operator">=</span> vnode<span class="token punctuation">.</span>elm <span class="token operator">=</span> oldVnode<span class="token punctuation">.</span>elm

  <span class="token comment">// vnode与oldVnode是否都是静态节点？若是，退出程序。个人理解退出程序 = 不需要Dom更新</span>
  <span class="token comment">// 如果 新节点是静态节点 旧节点是静态节点</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>isStatic<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token function">isTrue</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>isStatic<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    vnode<span class="token punctuation">.</span>key <span class="token operator">===</span> oldVnode<span class="token punctuation">.</span>key <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>isCloned<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isTrue</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>isOnce<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 获取子节点</span>
  <span class="token keyword">const</span> oldCh <span class="token operator">=</span> oldVnode<span class="token punctuation">.</span>children
  <span class="token keyword">const</span> ch <span class="token operator">=</span> vnode<span class="token punctuation">.</span>children
  <span class="token comment">// vnode有text属性？若没有：</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// vnode的子节点与oldVnode的子节点是否都存在？</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldCh<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 若都存在，判断子节点是否相同，不同则更新子节点</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>oldCh <span class="token operator">!==</span> ch<span class="token punctuation">)</span> <span class="token function">updateChildren</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> ch<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> removeOnly<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 若只有vnode的子节点存在</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token doc-comment comment">/**
       * 判断oldVnode是否有文本？
       * 若没有，则把vnode的子节点添加到真实DOM中
       * 若有，则清空Dom中的文本，再把vnode的子节点添加到真实DOM中
       */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span> nodeOps<span class="token punctuation">.</span><span class="token function">setTextContent</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
      <span class="token function">addVnodes</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> ch<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 若只有oldnode的子节点存在</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldCh<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 清空DOM中的子节点</span>
      <span class="token function">removeVnodes</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> oldCh<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 若vnode和oldnode都没有子节点，但是oldnode中有文本</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 清空oldnode文本</span>
      nodeOps<span class="token punctuation">.</span><span class="token function">setTextContent</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 上面两个判断一句话概括就是，如果vnode中既没有text，也没有子节点，那么对应的oldnode中有什么就清空什么</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 若有，vnode的text属性与oldVnode的text属性是否相同？</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>text <span class="token operator">!==</span> vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 若不相同：则用vnode的text替换真实DOM的文本</span>
    nodeOps<span class="token punctuation">.</span><span class="token function">setTextContent</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><p>上面代码里注释已经写得很清晰了，接下来我们画流程图来梳理一下整个过程，流程图如下：</p>
<p><img src="https://img-blog.csdnimg.cn/20210430154548413.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>你可能注意到了，如果新旧VNode里都包含了子节点，那么对于子节点的更新在代码里调用了updateChildren方法，而这个方法的逻辑到底是怎样的我们放在下一篇文章中展开学习。</p>
<h3 id="_2-5-小节" tabindex="-1"><a class="header-anchor" href="#_2-5-小节" aria-hidden="true">#</a> 2.5 小节</h3>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>参考</strong></p>
<p><a href="https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/virtual-dom.html" target="_blank" rel="noopener noreferrer">Vue.js技术揭秘<OutboundLink/></a></p>
</template>
