<template><h1 id="数据监听-响应式" tabindex="-1"><a class="header-anchor" href="#数据监听-响应式" aria-hidden="true">#</a> 数据监听（响应式）</h1>
<img align=center src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1618455130682571/logo.png">
<blockquote>
<p>了解Vue中如何实现数据的响应式系统，从而达到数据驱动视图。</p>
</blockquote>
<h2 id="一、数据驱动视图" tabindex="-1"><a class="header-anchor" href="#一、数据驱动视图" aria-hidden="true">#</a> 一、数据驱动视图？</h2>
<p>大胆的一句话概括：视图因为它依赖的数据的变化二变化，即：</p>
<p><code>UI = render(state)</code></p>
<ul>
<li>state(状态)：输入数据</li>
<li>UI(页面)：输出视图</li>
<li>render(驱动)：由Vue扮演，当Vue发现state变化之后，经过一系列加工，最终将变化反应在UI上</li>
</ul>
<p>那么第一个问题来了，Vue怎么知道state变化了呢？</p>
<h2 id="二、数据检测-vue-2-x" tabindex="-1"><a class="header-anchor" href="#二、数据检测-vue-2-x" aria-hidden="true">#</a> 二、数据检测（Vue 2.x）</h2>
<p>从上帝视角来讲，我们知道了整个双向绑定是通过<code>发布订阅+数据代理（劫持）</code>的方式实现的，即：</p>
<p><img src="https://img-blog.csdnimg.cn/20210415114123657.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p><code>Object.defineProperty()</code>方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。</p>
<h3 id="_2-1-了解object-defineproperty" tabindex="-1"><a class="header-anchor" href="#_2-1-了解object-defineproperty" aria-hidden="true">#</a> 2.1 了解Object.defineProperty</h3>
<p><strong>语法：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>参数说明：</strong></p>
<ul>
<li>obj：必需。目标对象</li>
<li>prop：必需。需定义或修改的属性的名字</li>
<li>descriptor：必需。目标属性所拥有的特性</li>
</ul>
<p>同时它提供了<code>get</code>和<code>set</code>两个方法以方便我们查看该属性的“操作日志”</p>
<p><strong>基本使用：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> val <span class="token operator">=</span> <span class="token keyword">null</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    configurable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a的name属性被获取了:'</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a的name属性被修改了:'</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        val <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a:'</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token number">100</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>通过这样的手段，我们可以做到：</p>
<ol>
<li>知道指定属性被<code>获取</code></li>
<li>知道指定属性被<code>更新</code></li>
</ol>
<p>介于我们拥有这两种能力，我们可以做一个最简单的双向绑定。</p>
<h3 id="_2-2-一个极简的双向绑定" tabindex="-1"><a class="header-anchor" href="#_2-2-一个极简的双向绑定" aria-hidden="true">#</a> 2.2 一个极简的双向绑定</h3>
<p><strong>目标：</strong></p>
<p>input输入框输入内容，同步更新到p标签内</p>
<p><strong>思路：</strong></p>
<ol>
<li>监测：定义obj变量，并指定“劫持”obj.text属性</li>
<li>更新：input监听键盘事件，输入内容时，实时修改obj.text属性</li>
<li>通知：触发属性set方法，通知p标签进行内容更新</li>
</ol>
<p><strong>实现：</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> oInput <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> oText <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'text'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 定义变量</span>
    <span class="token comment">// 监测</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">set</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 通知</span>
            oText<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 更新</span>
    oInput<span class="token punctuation">.</span><span class="token function-variable function">onkeyup</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        obj<span class="token punctuation">.</span>text <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>图解：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210415135927101.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>看了上面的demo，大家应该会有很多想法，这里面存在诸多的不方便，比如需要提前知道劫持哪个属性，通知哪个对象等等，下一结我们继续强大这个demo。</p>
<h2 id="三、基于数据劫持的基本实现" tabindex="-1"><a class="header-anchor" href="#三、基于数据劫持的基本实现" aria-hidden="true">#</a> 三、基于数据劫持的基本实现</h2>
<p>简单了解过后，我们很快会发现，2.2中所谓的双向绑定貌似并没有实用价值，至少需要我们将发布订阅应用进来。</p>
<h3 id="_3-1-实现思路" tabindex="-1"><a class="header-anchor" href="#_3-1-实现思路" aria-hidden="true">#</a> 3.1 实现思路</h3>
<ol>
<li>利用<code>Proxy</code>或<code>Object.defineProperty</code>生成的Observer针对对象/对象的属性进行&quot;劫持&quot;,在属性发生变化后通知订阅者</li>
<li>解析器Compile解析模板中的Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染</li>
<li>Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化</li>
</ol>
<p><strong>解决问题：</strong></p>
<ol>
<li>Observer：灵活的劫持（代理）数据的变动</li>
<li>Dep：依赖管理器，负责收益收集对数据的所有依赖（订阅者），并且在特定的时候通知所有订阅者数据已变动</li>
<li>Watcher：订阅者，负责接受变化，更新视图</li>
</ol>
<p>于是我们有了下图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210415144032236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_3-2-依赖管理器——dep" tabindex="-1"><a class="header-anchor" href="#_3-2-依赖管理器——dep" aria-hidden="true">#</a> 3.2 依赖管理器——Dep</h3>
<p>所以我们需要创建依赖管理器，负责：</p>
<ol>
<li>收集依赖：谁依赖了这个数据，就收集起来，即Getter时</li>
<li>通知更新：什么时候数据变动了，就出发通知依赖者，即Setter时</li>
</ol>
<p>总结一句话就是：在<code>getter</code>中收集依赖，在<code>setter</code>中通知依赖更新。</p>
<p>因此，我们给每个都建立一个依赖管理器，把这个数据所有的依赖都管理起来：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 依赖管理器</span>
<span class="token keyword">let</span> uid <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> uid<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">// 作为标识区分</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 谁依赖的这个数据，就保存进来，方便通知</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 添加依赖方法</span>
    <span class="token function">addSub</span><span class="token punctuation">(</span><span class="token parameter">sub</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 触发添加</span>
    <span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 为什么要这样操作？我们下一小结介绍</span>
        <span class="token comment">// 暂时理解为，我们获得订阅者的方法</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">{</span>
            Dep<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">addDep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// 添加依赖管理器</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 通知所有的依赖更新</span>
    <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> subs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 在这里我们触发更新</span>
        subs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">sub</span> <span class="token operator">=></span> sub<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher</span>
<span class="token comment">// 这里我有看到利用window.target来保存临时watcher的，是两者均可还是另有玄机不知道有没有大佬解惑</span>
Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 初始化为null</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h3 id="_3-3-监听者——observer" tabindex="-1"><a class="header-anchor" href="#_3-3-监听者——observer" aria-hidden="true">#</a> 3.3 监听者——Observer</h3>
<p>在这里我们希望可以劫持数据的变化，并通知依赖管理器</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 监听类</span>
<span class="token keyword">class</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">walk</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        keys<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">convert</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
    <span class="token function">convert</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 给子元素添加监听</span>
    <span class="token keyword">let</span> chlidOb <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果Dep类存在target属性，将其添加到dep实例的subs数组中</span>
            <span class="token comment">// target指向一个Watcher实例，每个Watcher都是一个订阅者</span>
            <span class="token comment">// Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>darget<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'获取'</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> val<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">set</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">===</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'修改'</span><span class="token punctuation">)</span>
            val <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
            chlidOb <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 通过依赖管理器，通知所有订阅者更新</span>
            dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 添加监听</span>
<span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value <span class="token operator">||</span> <span class="token keyword">typeof</span> value <span class="token operator">!==</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><p>可以加上下面的测试代码查看console效果</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'余光'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token string">'24'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
obj<span class="token punctuation">.</span>value<span class="token punctuation">.</span>name <span class="token comment">// name属性被读获取了</span>
obj<span class="token punctuation">.</span>value<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token comment">// name属性被修改了</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_3-4-订阅者——watcher" tabindex="-1"><a class="header-anchor" href="#_3-4-订阅者——watcher" aria-hidden="true">#</a> 3.4 订阅者——watcher</h3>
<p><code>Watcher类</code>的实例就是:</p>
<ol>
<li>谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例;</li>
<li>在之后数据变化时，我们不直接去通知依赖更新，而是通知依赖对应的Watch实例;</li>
<li>再由Watcher实例去通知真正的视图。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 实现一个订阅者，即“依赖”者</span>
<span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// hash储存订阅者的id,避免重复的订阅者</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> vm<span class="token punctuation">;</span> <span class="token comment">// 被订阅的数据一定来自于当前Vue实例</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb<span class="token punctuation">;</span> <span class="token comment">// 当数据更新时想要做的事情</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>expOrFn <span class="token operator">=</span> expOrFn<span class="token punctuation">;</span> <span class="token comment">// 被订阅的数据，数据key || 路径</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 维护更新之前的数据</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用</span>
    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">addDep</span><span class="token punctuation">(</span><span class="token parameter">dep</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存</span>
        <span class="token comment">// 此判断是避免同id的Watcher被多次储存</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>depIds<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>dep<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            dep<span class="token punctuation">.</span><span class="token function">addSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>depIds<span class="token punctuation">[</span>dep<span class="token punctuation">.</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> dep<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行一次get方法</span>
        <span class="token keyword">const</span> val <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">!==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者</span>
        Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// 赋值给Dep.target</span>
        <span class="token comment">// 这段代码需要结合上下文，含义是主动触发get，将该订阅者添加到依赖管理器中</span>
        <span class="token keyword">const</span> val <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>_data<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>expOrFn<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 主动触发</span>
        <span class="token comment">// 置空，用于下一个Watcher使用</span>
        Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p><strong>分析</strong></p>
<p>当实例化<code>Watcher</code>类时：</p>
<ol>
<li>会先执行其构造函数：</li>
<li>在构造函数中调用了<code>this.get()</code>实例方法；
<ul>
<li>2.1 首先通过<code>Dep.target = this</code>(把自身赋给了全局一个唯一对象Dep.target上)；</li>
<li>2.2 然后通过<code>this.vm._data[this.expOrFn]</code>获取一下被依赖的数据，获取被依赖数据的目的是触发该数据上面的<code>getter</code>，上文我们说过，在getter里会调用<code>dep.depend()</code>收集依赖，而在<code>dep.depend()</code>中取到挂载window.target上的值并将其存入依赖数组中;</li>
<li>2.3 在<code>get()</code>方法最后将<code>Dep.target</code>释放掉。</li>
</ul>
</li>
<li>而当数据变化时，会触发数据的<code>setter</code>，在setter中调用了<code>dep.notify()</code>方法，在<code>dep.notify()</code>方法中，遍历所有依赖(即watcher实例)，执行依赖的<code>update()</code>方法，也就是Watcher类中的<code>update()</code>实例方法，在update()方法中调用数据变化的更新回调函数，从而更新视图。</li>
</ol>
<h3 id="_3-5-挂载到vue" tabindex="-1"><a class="header-anchor" href="#_3-5-挂载到vue" aria-hidden="true">#</a> 3.5 挂载到Vue</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vue</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 简化了$options的处理</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$options <span class="token operator">=</span> options<span class="token punctuation">;</span>
        <span class="token comment">// 简化了对data的处理</span>
        <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
        <span class="token comment">// 将所有data最外层属性代理到Vue实例上</span>
        Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_proxy</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 监听数据</span>
        <span class="token function">observe</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者</span>
    <span class="token function">$watch</span><span class="token punctuation">(</span><span class="token parameter">expOrFn<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">_proxy</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            configurable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 取options.data</span>
            <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token parameter">val</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 测试代码</span>
<span class="token keyword">let</span> demo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    data<span class="token operator">:</span> <span class="token punctuation">{</span>
        text<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

input<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keyup'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  demo<span class="token punctuation">.</span>text <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

demo<span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">'text'</span><span class="token punctuation">,</span> <span class="token parameter">str</span> <span class="token operator">=></span> p<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>至此我们拆解了部分代码，来看一下它的实际效果？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token operator">&lt;</span>p <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"codepen"</span> data<span class="token operator">-</span>height<span class="token operator">=</span><span class="token string">"265"</span> data<span class="token operator">-</span>theme<span class="token operator">-</span>id<span class="token operator">=</span><span class="token string">"light"</span> data<span class="token operator">-</span><span class="token keyword">default</span><span class="token operator">-</span>tab<span class="token operator">=</span><span class="token string">"js,result"</span> data<span class="token operator">-</span>user<span class="token operator">=</span><span class="token string">"webbj97"</span> data<span class="token operator">-</span>slug<span class="token operator">-</span>hash<span class="token operator">=</span><span class="token string">"RwKJrbq"</span> style<span class="token operator">=</span><span class="token string">"height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"</span> data<span class="token operator">-</span>pen<span class="token operator">-</span>title<span class="token operator">=</span><span class="token string">"RwKJrbq"</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>span<span class="token operator">></span>See the Pen <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"https://codepen.io/webbj97/pen/RwKJrbq"</span><span class="token operator">></span>
  RwKJrbq<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span> by <span class="token function">姜博健</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"https://codepen.io/webbj97"</span><span class="token operator">></span>@webbj97<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span><span class="token punctuation">)</span>
  on <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"https://codepen.io"</span><span class="token operator">></span>CodePen<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span><span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span>script <span class="token keyword">async</span> src<span class="token operator">=</span><span class="token string">"https://cpwebassets.codepen.io/assets/embed/ei.js"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>再次回顾下图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210415144032236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_3-5-任重道远的defineproperty" tabindex="-1"><a class="header-anchor" href="#_3-5-任重道远的defineproperty" aria-hidden="true">#</a> 3.5 任重道远的defineProperty</h3>
<p>Object.defineProperty的第一个缺陷,无法监听数组变化。</p>
<p>然而Vue的文档提到了Vue是可以检测到数组变化的，但是只有以下八种方法,vm.items[indexOfItem] = newValue这种是无法检测的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">unshift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">splice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>其实作者在这里用了一些奇技淫巧,把无法监听数组的情况hack掉了,以下是方法示例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> aryMethods <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'push'</span><span class="token punctuation">,</span> <span class="token string">'pop'</span><span class="token punctuation">,</span> <span class="token string">'shift'</span><span class="token punctuation">,</span> <span class="token string">'unshift'</span><span class="token punctuation">,</span> <span class="token string">'splice'</span><span class="token punctuation">,</span> <span class="token string">'sort'</span><span class="token punctuation">,</span> <span class="token string">'reverse'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arrayAugmentations <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

aryMethods<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span><span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里是原生Array的原型方法</span>
    <span class="token keyword">let</span> original <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>method<span class="token punctuation">]</span><span class="token punctuation">;</span>

   <span class="token comment">// 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上</span>
   <span class="token comment">// 注意：是属性而非原型属性</span>
    arrayAugmentations<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我被改变啦!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 调用对应的原生方法并返回结果</span>
        <span class="token keyword">return</span> <span class="token function">original</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 将我们要监听的数组的原型指针指向上面定义的空数组对象</span>
<span class="token comment">// 别忘了这个空数组的属性上定义了我们封装好的push等方法</span>
list<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> arrayAugmentations<span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'d'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 我被改变啦！ 4</span>

<span class="token comment">// 这里的list2没有被重新定义原型指针，所以就正常输出</span>
<span class="token keyword">let</span> list2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
list2<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'d'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 4</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>我们应该注意到在上文中的实现里,我们多次用遍历方法遍历对象的属性，这就引出了Object.defineProperty的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">convert</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="四、数据检测-vue-3-x" tabindex="-1"><a class="header-anchor" href="#四、数据检测-vue-3-x" aria-hidden="true">#</a> 四、数据检测（Vue 3.x）</h2>
<blockquote>
<p>Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。</p>
</blockquote>
<p>本小结简单介绍一下proxy为什么能替代defineProperty：</p>
<p>前置知识：</p>
<ul>
<li>proxy同样拥有set和get方法，对指定数据进行代码
*Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。</li>
</ul>
<h3 id="_4-1-重构极简版双向绑定" tabindex="-1"><a class="header-anchor" href="#_4-1-重构极简版双向绑定" aria-hidden="true">#</a> 4.1 重构极简版双向绑定</h3>
<p>我们还是以上文中用Object.defineProperty实现的极简版双向绑定为例,用Proxy进行改写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> newObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">getting </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'text'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            input<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
            p<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

input<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keyup'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    newObj<span class="token punctuation">.</span>text <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>我们可以看到,Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty。</p>
<h3 id="_4-2-proxy的优势" tabindex="-1"><a class="header-anchor" href="#_4-2-proxy的优势" aria-hidden="true">#</a> 4.2 proxy的优势</h3>
<p>Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。</p>
<p>Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改。</p>
<p>Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。</p>
<p>当然,Proxy的劣势就是兼容性问题,而且无法用polyfill磨平,因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写。</p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p><strong>参考：</strong></p>
<p><a href="https://juejin.cn/post/6844903601416978439#heading-6" target="_blank" rel="noopener noreferrer">面试官: 实现双向绑定Proxy比defineproperty优劣如何?<OutboundLink/></a></p>
<p>本篇文章是Vue系列的第一篇文章，我的本意是多图少字，但不知不觉还是边幅过长，写这篇文章也是我一个自己总结的机会，希望能帮助到大家</p>
<p><strong>JavaScript系列：</strong></p>
<ol>
<li><a href="https://blog.csdn.net/jbj6568839z/article/details/103161970" target="_blank" rel="noopener noreferrer">《JavaScript内功进阶系列》（已完结）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_10204368.html" target="_blank" rel="noopener noreferrer">《JavaScript专项系列》（持续更新）<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/jbj6568839z/category_8464707.html" target="_blank" rel="noopener noreferrer">《ES6基础系列》（持续更新）<OutboundLink/></a></li>
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
<p>如果您看到了最后，对文章有任何建议，都可以在评论区留言</p>
<p>这是<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">文章所在GitHub仓库的传送门<OutboundLink/></a>，如果真的对您有所帮助，希望可以点个star，这是对我最大的鼓励 ～</p>
<h1 align=center>
    <img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif"/>
</h1>
</template>
