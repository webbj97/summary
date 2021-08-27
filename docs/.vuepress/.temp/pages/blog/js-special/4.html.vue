<template><h1 id="javascript专题-四-节流" tabindex="-1"><a class="header-anchor" href="#javascript专题-四-节流" aria-hidden="true">#</a> JavaScript专题（四）节流</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>接着<a href="">《JavaScript专题进阶之防抖》</a>，我们来聊一聊节流——另一个优化函数的思想。</p>
<p>我们还是以移动事件举例</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ie=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">#wrapper</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>

            <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.8<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
            <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">function</span> <span class="token function">moveAction</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            oWrapper<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> count<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">var</span> oWrapper <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#wrapper'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		oWrapper<span class="token punctuation">.</span>onmousemove <span class="token operator">=</span> moveAction<span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>它的效果是这样：</p>
<p><img src="https://img-blog.csdnimg.cn/20200730101733705.gif" alt="在这里插入图片描述"></p>
<h2 id="一、核心和基本实现" tabindex="-1"><a class="header-anchor" href="#一、核心和基本实现" aria-hidden="true">#</a> 一、核心和基本实现</h2>
<p>节流的原理很简单：<strong>如果你持续触发某个事件，特定的时间间隔内，只执行一次。</strong></p>
<p><strong>关于节流的实现，有两种主流的实现方式：</strong></p>
<ol>
<li>时间戳思路</li>
<li>定时器思路</li>
</ol>
<h4 id="_1-1-时间戳思路" tabindex="-1"><a class="header-anchor" href="#_1-1-时间戳思路" aria-hidden="true">#</a> 1.1 时间戳思路</h4>
<p>顾名思义，通过两个时间戳来控制时间间隔，当触发事件的时候：</p>
<ol>
<li>我们取出当前的时间戳 <code>now</code>；</li>
<li>然后减去之前<strong>执行时</strong>的时间戳(首次值为 0 ) <code>prev</code>；</li>
<li>如果大<code>now - prev &gt; wait</code>，证明时间区间维护结束，执行指定事件，更新<code>prev</code>；</li>
</ol>
<p>根据这一思路，我们就可以实现第一版代码了：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>oWrapper<span class="token punctuation">.</span>onmousemove <span class="token operator">=</span> <span class="token function">throttle</span><span class="token punctuation">(</span>moveAction<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> _this<span class="token punctuation">,</span> arg<span class="token punctuation">;</span>
    <span class="token keyword">var</span> prev <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 上一次触发的时间，第一次默认为0</span>

    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 触发时的时间</span>
        _this <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> prev <span class="token operator">></span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>_this<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 允许传入参数，并修正this</span>
            prev <span class="token operator">=</span> now<span class="token punctuation">;</span> <span class="token comment">// 更新上一次触发的时间</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>来看看借助它，效果是什么样的：</p>
<p><img src="https://img-blog.csdnimg.cn/2020073118424074.gif" alt="在这里插入图片描述"></p>
<p>我们可以看到：</p>
<ol>
<li>当鼠标移入的时候，<strong>事件立刻执行</strong></li>
<li>每过 1s 会执行一次，且移动2.5s会执行2次，意味着动作<strong>停止后不会再执行</strong>。</li>
</ol>
<h4 id="_1-2-定时器思路" tabindex="-1"><a class="header-anchor" href="#_1-2-定时器思路" aria-hidden="true">#</a> 1.2 定时器思路</h4>
<p>利用定时器来保证间隔时间内事件的触发次数</p>
<ol>
<li>创建定时器<code>timer</code>，记录当前是否在<strong>周期</strong>内；</li>
<li>判断定时器是否存在，若存在则直接结束，否则执行事件；</li>
<li><code>wait</code>时间之后再次执行，并清掉定时器；</li>
</ol>
<p>当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> _this<span class="token punctuation">,</span> arg<span class="token punctuation">;</span>
    <span class="token keyword">var</span> timer<span class="token punctuation">;</span> <span class="token comment">// 初始化</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        _this <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// 记录this</span>
        arg <span class="token operator">=</span> arguments<span class="token punctuation">;</span> <span class="token comment">// 记录参数数组</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span> <span class="token comment">// 时候未到</span>
        timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>_this<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 允许传入参数，并修正this</span>
            timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>来看看借助它，效果是什么样的：</p>
<p><img src="https://img-blog.csdnimg.cn/20200731184930157.gif" alt="在这里插入图片描述"></p>
<p>但是，我们可以看到：</p>
<ol>
<li>当鼠标移入的时候，事件不会立刻执行;</li>
<li>鼠标定制后<code>wait</code>间隔后会执行一次</li>
</ol>
<h4 id="_1-3-两种思路的区别" tabindex="-1"><a class="header-anchor" href="#_1-3-两种思路的区别" aria-hidden="true">#</a> 1.3 两种思路的区别</h4>
<table>
<thead>
<tr>
<th></th>
<th>时间戳</th>
<th>定时器</th>
</tr>
</thead>
<tbody>
<tr>
<td>“起点”</td>
<td>立即执行</td>
<td>n 秒后执行</td>
</tr>
<tr>
<td>“终点”</td>
<td>停止后不会执行</td>
<td>停止会再执行一次</td>
</tr>
</tbody>
</table>
<h2 id="二、节流进阶" tabindex="-1"><a class="header-anchor" href="#二、节流进阶" aria-hidden="true">#</a> 二、节流进阶</h2>
<p>结合两种思想完成一个可以立即执行，且停止触发后再执行一次的节流方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第三版</span>
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">,</span> context<span class="token punctuation">,</span> args<span class="token punctuation">;</span>
    <span class="token keyword">var</span> previous <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> <span class="token function-variable function">throttled</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> now <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//下次触发 func 剩余的时间</span>
        <span class="token keyword">var</span> remaining <span class="token operator">=</span> wait <span class="token operator">-</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> previous<span class="token punctuation">)</span><span class="token punctuation">;</span>
        context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
         <span class="token comment">// 如果没有剩余的时间了或者你改了系统时间</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>remaining <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> remaining <span class="token operator">></span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            previous <span class="token operator">=</span> now<span class="token punctuation">;</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                previous <span class="token operator">=</span> now<span class="token punctuation">;</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> remaining<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> throttled<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>效果演示如下：</p>
<p><img src="https://img-blog.csdnimg.cn/20200804192756351.gif" alt="在这里插入图片描述"></p>
<p>我在看代码的时候，也是反复打印数据才理解为什么会这样做，一起加油～</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://github.com/mqyqingfeng/Blog" target="_blank" rel="noopener noreferrer">冴羽大大的Js系列<OutboundLink/></a></li>
<li><a href="https://www.lodashjs.com/docs/lodash.debounce" target="_blank" rel="noopener noreferrer">lodash.js<OutboundLink/></a></li>
</ul>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>JavaScript系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/103161970" target="_blank" rel="noopener noreferrer">《JavaScript内功进阶系列》（已完结）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_10204368.html" target="_blank" rel="noopener noreferrer">《JavaScript专项系列》（持续更新）<OutboundLink/></a></li>
</ol>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光（沉迷JS，虚心学习中）</li>
<li>WX：j565017805</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Js版LeetCode题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">我的CSDN博客<OutboundLink/></a></li>
</ul>
<p>如果您看到了最后，对文章有任何建议，都可以在评论区留言，如果真的对您有所帮助，也希望您能点个star，这是对我最大的鼓励！</p>
<!-- 给这[GitHub，仓库传送门](https://github.com/webbj97/summary)点个star，这是对我最大的鼓励 -->
<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p></template>
