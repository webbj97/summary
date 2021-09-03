<template><h1 id="【整活系列】我从csdn排行榜上发现了惊人的秘密-快进来看看吧" tabindex="-1"><a class="header-anchor" href="#【整活系列】我从csdn排行榜上发现了惊人的秘密-快进来看看吧" aria-hidden="true">#</a> 【整活系列】我从CSDN排行榜上发现了惊人的秘密，快进来看看吧～</h1>
<blockquote>
<p>本篇文章尽量不使用的晦涩复杂的技术手段，仅仅利用简单的前端知识和相关api，配合浏览器获得我们想要的数据，进行分析
希望本篇文章可以让技术大佬会心一笑，回想自己当年是否也会有类似的的“奇葩”研究呢吧
也许这篇文章会勾起你当初从事技术工作时最纯粹的初衷</p>
</blockquote>
<img src="https://img-blog.csdnimg.cn/2021060119285815.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" width="80%">
<h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> 一、前言</h2>
<p>CSDN是我大学时接触的第一个技术社区，最近它增加了排行榜板块，里面细分了十几个分类，从互动、点赞、评论、收藏、时间纬度计算得到每篇文章的热度，将他们投放到对应的分类，最终汇聚成分类榜单和综合榜单。</p>
<p>社区在大力的鼓励大家进行技术分享和沉淀，以推动整个技术圈的发展。本篇文章也是因为我在浏览排行榜时的一个念头而诞生的，那就是我想从用户的视角：</p>
<ul>
<li>统计各个榜单的文章标题+作者+所在榜单</li>
<li>将汇总的榜单数据整合，并做出一份新的“综合领域榜单”</li>
<li>统计综合领域榜单，看看各个单榜的“强弱”</li>
</ul>
<p>用互联网黑话应该是这样的：</p>
<ol>
<li>在细分领域找到抓抓手</li>
<li>形成方法论，才能对外输出</li>
<li>分析自己的痛点，做精细化运营</li>
</ol>
<p><img src="https://img-blog.csdnimg.cn/20210601193245281.jpg#pic_center" alt="在这里插入图片描述"></p>
<h2 id="二、开始行动" tabindex="-1"><a class="header-anchor" href="#二、开始行动" aria-hidden="true">#</a> 二、开始行动</h2>
<blockquote>
<p>下面的代码都可以直接运行在浏览器控制台中，且我们尽量从用户的操作出发，避免给整个实现增加难度。</p>
</blockquote>
<h3 id="_2-1-一条榜单内容我能得到什么" tabindex="-1"><a class="header-anchor" href="#_2-1-一条榜单内容我能得到什么" aria-hidden="true">#</a> 2.1 一条榜单内容我能得到什么</h3>
<p><strong>思路：</strong></p>
<ol>
<li>选中单条内容</li>
<li>获取内容内的标题、作者、热度</li>
</ol>
<p><strong>代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 选中单条内容</span>
<span class="token keyword">const</span> hotRankItem <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.hostitem'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取标题</span>
hotRankItem<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.title'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
<span class="token comment">// 获取作者</span>
hotRankItem<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.name'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
<span class="token comment">// 获取热度</span>
hotRankItem<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'span.num'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>结果：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210601165631471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_2-2-获取一个榜单完整的数据" tabindex="-1"><a class="header-anchor" href="#_2-2-获取一个榜单完整的数据" aria-hidden="true">#</a> 2.2 获取一个榜单完整的数据</h3>
<p><strong>思路：</strong></p>
<ol>
<li>获取内容列表，并转换成数组</li>
<li>遍历获取所需内容，并返回数组</li>
</ol>
<p><strong>代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">likeArray</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
    <span class="token comment">// 获取列表数组</span>
    <span class="token keyword">const</span> hotRankList <span class="token operator">=</span> <span class="token function">likeArray</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.hostitem'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 处理榜单内所有数据</span>
    <span class="token keyword">const</span> newHotRankList <span class="token operator">=</span> hotRankList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> title <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.title'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">const</span> name <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.name'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">const</span> hot <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'span.num'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>title<span class="token punctuation">,</span> name<span class="token punctuation">,</span> hot<span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> newHotRankList<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>结果：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210601170116422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<ul>
<li>注意</li>
</ul>
<p>经常浏览排行榜的小伙伴可能意识到了，出于性能和体验的考虑，只有用户划到页面底部，才会更新排行榜单后续的内容，每次新增25条。所以我们也想一个真正的用户一样，让代码帮我们阅读好啦～</p>
<h3 id="_2-3-模拟用户滑动获取完整榜单" tabindex="-1"><a class="header-anchor" href="#_2-3-模拟用户滑动获取完整榜单" aria-hidden="true">#</a> 2.3 模拟用户滑动获取完整榜单</h3>
<p><strong>思路：</strong></p>
<ol>
<li>借助<code>window.scrollTo(x, y)</code>可把内容滚动到指定的坐标。</li>
<li>已知每次显示25条数据，单榜共50条数据，综合榜共100条数据</li>
<li>利用回调来确定处理数据的时机</li>
</ol>
<p><strong>代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">likeArray</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
    <span class="token comment">// 获取列表数组</span>
    <span class="token keyword">const</span> hotRankList <span class="token operator">=</span> <span class="token function">likeArray</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.hostitem'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 处理榜单内所有数据</span>
    <span class="token keyword">const</span> newHotRankList <span class="token operator">=</span> hotRankList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> title <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.title'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">const</span> name <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.name'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">const</span> hot <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'span.num'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>title<span class="token punctuation">,</span> name<span class="token punctuation">,</span> hot<span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> newHotRankList<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getComData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> mainHeight <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 内容高度</span>
    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> height <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.main'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>offsetHeight
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mainHeight <span class="token operator">===</span> height<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
            <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            mainHeight <span class="token operator">=</span> height
            window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                top<span class="token operator">:</span> <span class="token number">100000</span><span class="token punctuation">,</span>
                behavior<span class="token operator">:</span> <span class="token string">"smooth"</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">getComData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p><strong>结果：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210601172136985.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_2-4-获取所有领域内容榜的数据" tabindex="-1"><a class="header-anchor" href="#_2-4-获取所有领域内容榜的数据" aria-hidden="true">#</a> 2.4 获取所有领域内容榜的数据</h3>
<blockquote>
<p>之后的所有示例，默认先执行本小节的代码</p>
</blockquote>
<p>同样，如果我是用户且我想看过所有的榜单，我的操作应该是这样的</p>
<ol>
<li>浏览C/C++榜单，划至底部（阅读完毕）</li>
<li>点击Java分类，继续步骤1-&gt;步骤2</li>
<li>注意：此时用获取完整列表的方法使用了Promise</li>
</ol>
<p><img src="https://img-blog.csdnimg.cn/20210601172348287.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p><strong>思路：</strong></p>
<ol>
<li>循环模拟用户点击</li>
<li>进入新的榜单，重复2.3小节的操作</li>
<li>将所有的榜单的结果汇总，并获取榜单名称用于区分</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">likeArray</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取列表数组</span>
    <span class="token keyword">const</span> hotRankList <span class="token operator">=</span> <span class="token function">likeArray</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.hostitem'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> curBlogRankName <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.blog-rank-right-top li.active'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">正在拉去</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>curBlogRankName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">榜单数据</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
    <span class="token comment">// 处理榜单内所有数据</span>
    <span class="token keyword">const</span> newHotRankList <span class="token operator">=</span> hotRankList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> title <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.title'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">const</span> name <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'a.name'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">const</span> hot <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'span.num'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>title<span class="token punctuation">,</span> name<span class="token punctuation">,</span> hot<span class="token punctuation">,</span> curBlogRankName<span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> newHotRankList
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getComData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> mainHeight <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 内容高度</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> height <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.main'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>offsetHeight
            <span class="token keyword">if</span> <span class="token punctuation">(</span>mainHeight <span class="token operator">===</span> height<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                mainHeight <span class="token operator">=</span> height<span class="token punctuation">;</span>
                window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    top<span class="token operator">:</span> <span class="token number">100000</span><span class="token punctuation">,</span>
                    behavior<span class="token operator">:</span> <span class="token string">"smooth"</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token comment">// 获取列表榜单</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">loopNav</span><span class="token punctuation">(</span><span class="token parameter">curList</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> navList <span class="token operator">=</span> <span class="token function">likeArray</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.blog-rank-right-top ul li'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> navList<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        navList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getComData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">[</span>navList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>innerText<span class="token punctuation">]</span> <span class="token operator">=</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'榜单结果汇总：'</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    window<span class="token punctuation">.</span>rankResult <span class="token operator">=</span> result<span class="token punctuation">;</span> <span class="token comment">// 将结果挂到window对象上</span>
<span class="token punctuation">}</span>

<span class="token function">loopNav</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><p><strong>结果：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210601175716735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_2-5-获取单个榜单数据集合" tabindex="-1"><a class="header-anchor" href="#_2-5-获取单个榜单数据集合" aria-hidden="true">#</a> 2.5 获取单个榜单数据集合</h3>
<p>如果大家想要获取某个榜单内容：</p>
<p>例如：在<a href="https://blog.csdn.net/rank/list" target="_blank" rel="noopener noreferrer">CSDN全站综合热榜<OutboundLink/></a>，打开控制台，执行2.3小节的代码</p>
<img  src="https://img-blog.csdnimg.cn/20210601180103452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="100%" />
<p>就可以的得到数组类型的数据。</p>
<img src="https://img-blog.csdnimg.cn/20210601193805138.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" width="50%" />
<h2 id="三、拿到数据开始整活" tabindex="-1"><a class="header-anchor" href="#三、拿到数据开始整活" aria-hidden="true">#</a> 三、拿到数据开始整活</h2>
<p>我们拿到的数据应该是这样是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>集合：<span class="token punctuation">{</span>
    榜单<span class="token number">1</span>：<span class="token punctuation">[</span>
        <span class="token punctuation">{</span>文章<span class="token number">1</span><span class="token punctuation">}</span>， <span class="token punctuation">{</span>文章<span class="token number">1</span><span class="token punctuation">}</span>，
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    榜单<span class="token number">1</span>：<span class="token punctuation">[</span>
        <span class="token punctuation">{</span>文章<span class="token number">1</span><span class="token punctuation">}</span>， <span class="token punctuation">{</span>文章<span class="token number">1</span><span class="token punctuation">}</span>，
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>按照第一章的思路，我们还要继续进行处理。</p>
<h3 id="_3-1-热度最高的前100名单" tabindex="-1"><a class="header-anchor" href="#_3-1-热度最高的前100名单" aria-hidden="true">#</a> 3.1 热度最高的前100名单</h3>
<blockquote>
<p>有人可能会问，会什么不直接看综合热榜，这是因为单榜和热榜更新时间不同，其实任选其一往深研究即可。</p>
</blockquote>
<p><strong>思路：</strong></p>
<ol>
<li>所有榜单合并</li>
<li>按热度排序</li>
<li>截取前100名</li>
</ol>
<p><strong>代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>rankResult100 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>rankResult<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> prev<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>rankResult<span class="token punctuation">[</span>next<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> b<span class="token punctuation">.</span>hot <span class="token operator">-</span> a<span class="token punctuation">.</span>hot<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'热度前100名（每日更新）:'</span><span class="token punctuation">,</span> window<span class="token punctuation">.</span>rankResult100<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>结果：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210601182954642.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>emmm 可以看到，<strong>此时</strong>排在第一的是运维榜单-程序猿是小贺大佬的文章。</p>
<h3 id="_3-2-统计前100名中出现的领域模块" tabindex="-1"><a class="header-anchor" href="#_3-2-统计前100名中出现的领域模块" aria-hidden="true">#</a> 3.2 统计前100名中出现的领域模块</h3>
<blockquote>
<p>实现此需求的方式有很多，不要纠结方式～</p>
</blockquote>
<p><strong>代码：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>rankResult100 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>rankResult<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> prev<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>rankResult<span class="token punctuation">[</span>next<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> b<span class="token punctuation">.</span>hot <span class="token operator">-</span> a<span class="token punctuation">.</span>hot<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'热度前100名（每日更新）:'</span><span class="token punctuation">,</span> window<span class="token punctuation">.</span>rankResult100<span class="token punctuation">)</span>

<span class="token comment">// 统计榜单进去前100的数量</span>
window<span class="token punctuation">.</span>rankResultGroup <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 获取榜单名称并生成Key</span>
<span class="token keyword">const</span> navList <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.blog-rank-right-top li'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> item<span class="token punctuation">.</span>innerText<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> window<span class="token punctuation">.</span>rankResultGroup<span class="token punctuation">[</span>item<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token comment">// 统计数量</span>
window<span class="token punctuation">.</span>rankResult100<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> window<span class="token punctuation">.</span>rankResultGroup<span class="token punctuation">[</span>item<span class="token punctuation">.</span>curBlogRankName<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'各榜单拥有前100数量:'</span><span class="token punctuation">,</span> window<span class="token punctuation">.</span>rankResultGroup<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>结果：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210601185152762.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_3-3-榜单-分析-结论——模块排名占有率高-和-语言使用率存在一定关系" tabindex="-1"><a class="header-anchor" href="#_3-3-榜单-分析-结论——模块排名占有率高-和-语言使用率存在一定关系" aria-hidden="true">#</a> 3.3 榜单“分析”结论——模块排名占有率高 和 语言使用率存在一定关系</h3>
<blockquote>
<p>怎么看，都像一句废话</p>
</blockquote>
<p>使用的人多：</p>
<ul>
<li>遇到的问题就多</li>
<li>解决问题的人就多</li>
<li>技术沉淀就多</li>
</ul>
<p>虽然我不是专业做数据分析的，但在知乎随便翻了一下编程语言热度排行，在TIOBE 公布的 <code>2020年9月的编程语言排行榜</code>，可以看到前三名是 C、Java 和 Python，如图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210601191606932.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>对比我们最后得到的结果：</p>
<p><img src="https://img-blog.csdnimg.cn/2021060119183656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>嗯~相差不大。</p>
<p><img src="https://img-blog.csdnimg.cn/20210601195305965.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h3 id="_3-4-小结" tabindex="-1"><a class="header-anchor" href="#_3-4-小结" aria-hidden="true">#</a> 3.4 小结</h3>
<p>截止到此时，<strong>我们完成了：</strong></p>
<ol>
<li>获取榜单数据</li>
<li>整合榜单数据</li>
<li>统计若干排名的文章</li>
<li>统计单榜选手在综合榜100名内的数量</li>
<li>简单的分析（虚心接受指教）</li>
</ol>
<p>而这也让我对 <code>click</code>、<code>dom操作</code>、<code>数组操作</code>等加深了印象，希望读到这里的同学也能有所收获～</p>
<p>之后还能怎么做？我期待大家也能参与进来，和我和或其他人进行自己领域内的互动，例如：</p>
<ol>
<li>生成二维、三维的数据模型；</li>
<li>分析上榜作者的粉丝数量，进一步得到对自己有用的信息；</li>
<li>获取榜单文章的发布时间，统计大佬们的发布时间规律</li>
<li>......</li>
</ol>
<p>也许一条隐密的捷径就在你感兴趣、你正在探索的事情中，加油！</p>
<p><img src="https://img-blog.csdnimg.cn/20210601194947131.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="四、写在最后" tabindex="-1"><a class="header-anchor" href="#四、写在最后" aria-hidden="true">#</a> 四、写在最后</h2>
<p>本篇文章是《整活系列》的第一篇，也会同步在<a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">《余光的前端进阶笔记》<OutboundLink/></a>中</p>
<p>读到这里的同学不妨做件小事，给我的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">GitHub仓库<OutboundLink/></a>点个star吧！Thanks♪(･ω･)ﾉ</p>
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
