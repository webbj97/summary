<template><h1 id="浏览器渲染基本原理" tabindex="-1"><a class="header-anchor" href="#浏览器渲染基本原理" aria-hidden="true">#</a> 浏览器渲染基本原理</h1>
<blockquote>
<p>浏览器对于前端工程师，就相当于赛车于赛车手，想要更好的在赛道上驰骋，就需要对自己的赛车有更深入的了解，甚至人车合一，所以本篇文章我们就来打开浏览器的大门，一起努力吧！</p>
</blockquote>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>一篇文章很难将所有的细节覆盖，同时我们也不需要将所有流程和每一个环节都摸透，我们就依照脉络来聊一聊浏览器的渲染过程。</p>
<p>我们都知道一个页面通常由三个部分组成，即<code>HTMl+CSS+JS</code>，并通过一系列的步骤转换。</p>
<ul>
<li>HTML 的内容是由标记和文本组成</li>
<li>CSS 称为层叠样式表，是由选择器和属性组成</li>
<li>JS 是可以使网页的内容“动”起来</li>
</ul>
<p>用户请求的 HTML 文本(text/html)基础的渲染流程图大致是这样的：</p>
<p><img src="https://img-blog.csdnimg.cn/20210506164622813.png" alt="在这里插入图片描述"></p>
<ol>
<li>解析 HTML+CSS -&gt; 解析HTML生成 <strong>DOM树</strong>，同时解析CSS生成 <strong>CSSOM树</strong>；</li>
<li>构建 Render 树 -&gt; “枝干”和“树芽”配合，两个合并生成新的用于渲染的树；</li>
<li>布局 Render 树 -&gt; 对渲染树的每个节点进行布局处理，确定其在屏幕上的显示位置；</li>
<li>绘制 Render 树 -&gt; 最后遍历渲染树并用UI后端层将每一个节点绘制出来，前三步都是在绘制“蓝图”；</li>
</ol>
<p>用流程表示如下图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210506170953586.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>既然浏览的渲染分流程，我们也按照它的顺序来了解每一步都发生了什么。</p>
<h2 id="一、浏览器渲染基本步骤" tabindex="-1"><a class="header-anchor" href="#一、浏览器渲染基本步骤" aria-hidden="true">#</a> 一、浏览器渲染基本步骤</h2>
<p>引入一个概念——<strong>关键渲染路径</strong></p>
<p>从收到 HTML、CSS 和 JavaScript 字节到对其进行必需的处理，从而将它们转变成渲染的像素这一过程，即关键渲染路径。</p>
<p>它就是可以优化的点，也是可以</p>
<h3 id="_1-1-构建对象模型" tabindex="-1"><a class="header-anchor" href="#_1-1-构建对象模型" aria-hidden="true">#</a> 1.1 构建对象模型</h3>
<blockquote>
<p>斟酌了一下，决定将 DOM 树和 CSSOM 树放在一起。浏览器在渲染页面之前第一步就需要先构建<code>DOM树</code>和<code>CSSOM树</code>，因此我们需要确保尽快将 HTML 和 CSS 提供给浏览器。</p>
</blockquote>
<p>下面是构建对象模型的描述，本章就这些内容：</p>
<ul>
<li>字节 → 字符 → 令牌 → 节点 → 对象模型</li>
<li>HTML 标记转换成文档对象模型 (DOM)；</li>
<li>CSS 标记转换成 CSS 对象模型 (CSSOM)。</li>
<li>DOM 和 CSSOM 是独立的数据结构。</li>
<li>Chrome DevTools Timeline 让我们可以捕获和检查 DOM 和 CSSOM 的构建和处理开销。</li>
</ul>
<h4 id="_1-1-1-dom-树-文档对象模型" tabindex="-1"><a class="header-anchor" href="#_1-1-1-dom-树-文档对象模型" aria-hidden="true">#</a> 1.1.1 DOM 树（文档对象模型）</h4>
<p>因为浏览器不能直接理解和使用 HTML，所以需要将 HTML 解析为浏览器能够理解的结构，即 DOM 树。DOM 树的根节点就是 document 对象。</p>
<p>试想一下这段代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width,initial-scale=1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>DOM<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Hello <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>web performance<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span> performance<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>awesome-photo.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>一个包含一些文本和一幅图片的普通 HTML 页面。经过字节 -&gt; 字符 ... -&gt; 模型过程</p>
<p><img src="https://img-blog.csdnimg.cn/20210510162124364.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<ul>
<li><strong>转换:</strong> 浏览器从磁盘或网络读取 HTML 的原始字节，并根据文件的指定编码（例如 UTF-8）将它们转换成各个字符。</li>
<li><strong>令牌化:</strong> 浏览器将字符串转换成 W3C HTML5 标准规定的各种令牌，例如，<code>&lt;html&gt;</code>、<code>&lt;body&gt;</code>，以及其他尖括号内的字符串。每个令牌都具有特殊含义和一组规则。</li>
<li><strong>词法分析:</strong> 发出的令牌转换成定义其属性和规则的“对象”。</li>
<li><strong>DOM 构建:</strong> 最后，由于 HTML 标记定义不同标记之间的关系（一些标记包含在其他标记内），创建的对象链接在一个树数据结构内，此结构也会捕获原始标记中定义的父项-子项关系: HTML 对象是 body 对象的父项，body 是 paragraph 对象的父项，依此类推。</li>
</ul>
<p>打开控制台（F12）在<code>console</code>内输入<code>document</code>，如图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210508172419966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>整个流程的最终输出是我们这个简单页面的文档对象模型 (DOM)，浏览器对页面进行的所有进一步处理都会用到它。</p>
<p>浏览器每次处理 HTML 标记时，都会完成以上所有步骤: 将字节转换成字符，确定令牌，将令牌转换成节点，然后构建 DOM 树。这整个流程可能需要一些时间才能完成，有大量 HTML 需要处理时更是如此。</p>
<p>DOM 树捕获文档标记的属性和关系，但并未告诉我们元素在渲染后呈现的外观。那是 CSSOM 的责任。</p>
<h4 id="_1-1-2-cssom-css-对象模型" tabindex="-1"><a class="header-anchor" href="#_1-1-2-cssom-css-对象模型" aria-hidden="true">#</a> 1.1.2 CSSOM（CSS 对象模型）</h4>
<p>在浏览器构建我们这个简单页面的 DOM 时，在文档的<code>head</code>部分遇到了一个<code>link</code>标记，该标记引用一个外部 CSS 样式表: style.css。由于预见到需要利用该资源来渲染页面，它会立即发出对该资源的请求，并返回以下内容:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right }
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>与处理 HTML 时一样，我们需要将收到的 CSS 规则转换成某种浏览器能够理解和处理的东西。因此，我们会重复 HTML 过程，不过是为 CSS 而不是 HTML:</p>
<p><img src="https://img-blog.csdnimg.cn/20210510171708789.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>我打开知乎，搜索 111，如图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210510172238766.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>我们的样式表需要大约 5.8 毫秒的处理时间，影响页面上的 24 个元素，开销中等。不过这<strong>24</strong>个元素从何而来呢？让我们谈一谈将 <code>DOM</code> 与 <code>CSSOM</code> 关联在一起的渲染树。</p>
<h3 id="_1-2-生成-render-树" tabindex="-1"><a class="header-anchor" href="#_1-2-生成-render-树" aria-hidden="true">#</a> 1.2 生成 Render 树</h3>
<blockquote>
<p><code>CSSOM树</code>和<code>DOM树</code>合并成渲染树，然后用于计算每个可见元素的布局，并输出给绘制流程，将像素渲染到屏幕上。优化上述每一个步骤对实现最佳渲染性能至关重要。</p>
</blockquote>
<p>一个描述内容，另一个则是描述需要对文档应用的样式规则。我们该如何将两者合并，让浏览器在屏幕上渲染像素呢？</p>
<ul>
<li>DOM 树与 CSSOM 树合并后形成渲染树。</li>
<li>渲染树只包含渲染网页所需的节点。</li>
<li>布局计算每个对象的精确位置和大小。</li>
<li>最后一步是绘制，使用最终渲染树将像素渲染到屏幕上。</li>
</ul>
<p>浏览器将 DOM 和 CSSOM 合并成一个“渲染树”，网罗网页上所有可见的 DOM 内容，以及每个节点的所有 CSSOM 样式信息。</p>
<p><img src="https://img-blog.csdnimg.cn/20210510173527742.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<ol>
<li>renderer 与 DOM 元素是相对应的，但并不是一一对应，有些 DOM 元素没有对应的 renderer，而有些 DOM 元素却对应了好几个 renderer</li>
<li>某些节点通过 CSS 隐藏，因此在渲染树中也会被忽略，例如，上例中的 span 节点---不会出现在渲染树中，---因为有一个显式规则在该节点上设置了“display: none”属性。</li>
<li>请注意 <code>visibility: hidden</code> 与 <code>display: none</code> 是不一样的。前者隐藏元素，但元素仍占据着布局空间（即将其渲染成一个空框），而后者 (display: none) 将元素从渲染树中完全移除，元素既不可见，也不是布局的组成部分。</li>
</ol>
<h3 id="_1-3-布局-layout" tabindex="-1"><a class="header-anchor" href="#_1-3-布局-layout" aria-hidden="true">#</a> 1.3 布局（layout）</h3>
<p>最终输出的渲染同时包含了屏幕上的所有可见内容及其样式信息。有了渲染树，我们就可以进入“布局”阶段。</p>
<p>到目前为止，我们计算了哪些节点应该是可见的以及它们的计算样式，但我们尚未计算它们在设备视口内的确切位置和大小---这就是“布局”阶段，也称为“自动重排”。</p>
<p>为弄清每个对象在网页上的确切大小和位置，浏览器从渲染树的根节点开始进行遍历。让我们考虑下面这样一个简单的实例:</p>
<ol>
<li>结合设备的屏幕信息，计算每个元素的位置和尺寸（由此可知 css 中定义的量，未必是实际使用的量）</li>
<li>以浏览器可见区域为画布，左上角为 (0,0)基础坐标，从左到右，从上到下从 DOM 的根节点开始画</li>
<li>最后布局输出的结果就是<code>盒模型</code>，他会精确地捕获每个元素在视口内的确切位置和尺寸，所有相对测量值都转换为屏幕上的绝对像素。</li>
</ol>
<p><img src="https://img-blog.csdnimg.cn/20210508180820485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>再来看看刷新本篇文章页面，布局花了多久时间：</p>
<p><img src="https://img-blog.csdnimg.cn/20210510175228755.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_1-4-绘制-paint" tabindex="-1"><a class="header-anchor" href="#_1-4-绘制-paint" aria-hidden="true">#</a> 1.4 绘制（paint）</h3>
<blockquote>
<p>其实到这里，基本的渲染过程就已经结束了</p>
</blockquote>
<p>布局完成后，浏览器会立即发出“Paint Setup”和“Paint”事件，将渲染树转换成屏幕上的像素。</p>
<p><strong>栅格化</strong></p>
<p>我们知道了哪些节点可见、它们的计算样式以及几何信息，我们终于可以将这些信息传递给最后一个阶段: 将渲染树中的每个节点转换成屏幕上的实际像素。这一步通常称为“绘制”或“栅格化”。</p>
<h3 id="_1-5-小结" tabindex="-1"><a class="header-anchor" href="#_1-5-小结" aria-hidden="true">#</a> 1.5 小结</h3>
<p>我们按顺序概述下浏览器渲染的基本步骤：</p>
<ol>
<li>处理 HTML 标记并构建 DOM 树。</li>
<li>处理 CSS 标记并构建 CSSOM 树。</li>
<li>将 DOM 与 CSSOM 合并成一个渲染树。</li>
<li>根据渲染树来布局，以计算每个节点的几何信息。</li>
<li>将各个节点绘制到屏幕上。</li>
</ol>
<p>上面的步骤，又被称为关键渲染路径</p>
<h2 id="二、css-会阻塞渲染吗" tabindex="-1"><a class="header-anchor" href="#二、css-会阻塞渲染吗" aria-hidden="true">#</a> 二、CSS 会阻塞渲染吗？</h2>
<blockquote>
<p>CSS 是阻塞渲染的资源。需要将它尽早、尽快地下载到客户端，以便缩短首次渲染的时间。</p>
</blockquote>
<p>默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。所以：</p>
<ol>
<li>请务必精简您的 CSS</li>
<li>尽快提供它</li>
<li>利用媒体类型和查询来解除对渲染的阻塞。</li>
</ol>
<p>在渲染树构建中，我们看到关键渲染路径要求我们同时具有 DOM 和 CSSOM 才能构建渲染树。这会给性能造成严重影响: HTML 和 CSS 都是阻塞渲染的资源。 HTML 显然是必需的，因为如果没有 DOM，我们就没有可渲染的内容，但 CSS 的必要性可能就不太明显。如果我们在 CSS 不阻塞渲染的情况下尝试渲染一个普通网页会怎样？</p>
<p><img src="https://img-blog.csdnimg.cn/2021051018401241.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>上例展示了知乎在移除 CSS 的显示效果，它证明了为何要在<code>CSS准备就绪之前阻塞渲染</code>，---没有 CSS 的网页实际上无法使用。浏览器将阻塞渲染，直至 DOM 和 CSSOM 全都准备就绪。</p>
<p>不过，如果我们有一些 CSS 样式只在特定条件下（例如显示网页或将网页投影到大型显示器上时）使用，又该如何？如果这些资源不阻塞渲染，该有多好。</p>
<p>让我们考虑下面这些实例:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>all<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>portrait.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>orientation:portrait<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>print.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>print<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol>
<li>第一个声明未提供任何媒体类型或查询，因此它适用于所有情况，它始终会阻塞渲染。</li>
<li>第二个声明同样阻塞渲染: “all”是默认类型，如果您不指定任何类型，则隐式设置为“all”。因此，第一个声明和第二个声明实际上是等效的。</li>
<li>第三个声明具有动态媒体查询，将在网页加载时计算。根据网页加载时设备的方向，portrait.css 可能阻塞渲染，也可能不阻塞渲染。</li>
<li>最后一个声明只在打印网页时应用，因此网页首次在浏览器中加载时，它不会阻塞渲染。</li>
</ol>
<p>最后，请注意“阻塞渲染”仅是指浏览器是否需要暂停网页的<code>首次渲染</code>，直至该资源准备就绪。无论哪一种情况，浏览器仍会下载 CSS 资产，只不过不阻塞渲染的资源优先级较低罢了。</p>
<h2 id="三、javascript-对渲染的影响" tabindex="-1"><a class="header-anchor" href="#三、javascript-对渲染的影响" aria-hidden="true">#</a> 三、JavaScript 对渲染的影响</h2>
<blockquote>
<p>JavaScript 允许我们修改网页的方方面面。不过，JavaScript 也会阻止<code>DOM</code>构建和延缓网页渲染。为了实现最佳性能，可以让您的<code>JavaScript</code>异步执行，并去除关键渲染路径中任何不必要的 JavaScript。</p>
</blockquote>
<p>先来看看 Js 在渲染相关的特点：</p>
<ul>
<li>JavaScript 可以查询和修改 DOM 与 CSSOM。</li>
<li>JavaScript 执行会阻止 CSSOM。</li>
<li>除非将 JavaScript 显式声明为异步，否则它会阻止构建 DOM。</li>
</ul>
<h3 id="_3-1-js-可能会延缓首次渲染" tabindex="-1"><a class="header-anchor" href="#_3-1-js-可能会延缓首次渲染" aria-hidden="true">#</a> 3.1 js 可能会延缓首次渲染</h3>
<blockquote>
<p>执行我们的内联脚本会阻止 DOM 构建，也就延缓了首次渲染</p>
</blockquote>
<p>我们看下面的例子：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">var</span> span <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"span"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"span:"</span><span class="token punctuation">,</span> span<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
    Hello
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>web performance<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    performance
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>打开控制台，你会发现输出了<code>span：undefined</code>，这是因为页面的渲染因为<code>script</code>脚本暂停了，自然也就获取不到<code>script</code>标签之后的 dom 节点</p>
<p>将 span 元素的 display 属性从 none 更改为 inline。最终结果如何？我们现在遇到了竞态问题。</p>
<p>如果浏览器尚未完成<code>CSSOM的下载和构建</code>，而我们却想在此时运行脚本，会怎样？答案很简单，对性能不利: 浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。</p>
<p>此时我们有了新的结论：</p>
<ul>
<li>脚本在文档中的位置很重要。</li>
<li>当浏览器遇到一个<code>script</code>标记时，<code>DOM构建</code>将暂停，直至脚本完成执行。</li>
<li><code>JavaScript</code>执行将暂停，直至<code>CSSOM</code>就绪</li>
<li>DOM 解析、JS 执行、CSSOM 之间存在一定的关系影响</li>
</ul>
<h3 id="_3-2-js-会阻止解析器" tabindex="-1"><a class="header-anchor" href="#_3-2-js-会阻止解析器" aria-hidden="true">#</a> 3.2 js 会阻止解析器</h3>
<p>默认情况下，JavaScript 执行会“阻止解析器”，由于浏览器不了解脚本计划在页面上执行什么操作，它会作最坏的假设并阻止解析器。向浏览器传递脚本不需要在引用位置执行的信号既可以让浏览器继续构建 DOM，也能够让脚本在就绪后执行；例如，在从缓存或远程服务器获取文件后执行。</p>
<p>为此，我们可以将脚本标记为异步：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>awesome-photo.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app.js<span class="token punctuation">"</span></span> <span class="token attr-name">async</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_3-3-小节" tabindex="-1"><a class="header-anchor" href="#_3-3-小节" aria-hidden="true">#</a> 3.3 小节</h3>
<ul>
<li>执行我们的内联脚本会阻止<strong>DOM</strong>构建，也就延缓了首次渲染。这也是为什么 script 标签要放在页面的底部；</li>
<li>浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。</li>
<li>脚本在文档中的位置很重要。</li>
<li>当浏览器遇到一个<code>script</code>标记时，<code>DOM构建</code>将暂停，直至脚本完成执行。</li>
<li><code>JavaScript</code>执行将暂停，直至<code>CSSOM</code>就绪</li>
<li>DOM 解析、JS 执行、CSSOM 之间存在一定的关系影响</li>
</ul>
<h2 id="四、回流与重绘" tabindex="-1"><a class="header-anchor" href="#四、回流与重绘" aria-hidden="true">#</a> 四、回流与重绘</h2>
<blockquote>
<p>回流和重绘其实就发生在浏览器渲染的某一个阶段，了解他将有助于</p>
</blockquote>
<h3 id="_4-1-回流-reflow-——重排" tabindex="-1"><a class="header-anchor" href="#_4-1-回流-reflow-——重排" aria-hidden="true">#</a> 4.1 回流（reflow）——重排</h3>
<p>回流：布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及 DOM 中紧随其后的节点、祖先节点元素的随后的回流。比如：</p>
<ul>
<li>折叠列表</li>
<li>自适应输入框</li>
</ul>
<p><strong>回流必定会发生重绘，重绘不一定会引发回流。</strong></p>
<h3 id="_4-2-重绘-repaint" tabindex="-1"><a class="header-anchor" href="#_4-2-重绘-repaint" aria-hidden="true">#</a> 4.2 重绘（repaint）</h3>
<p>由于节点的样式发生了但未影响到<code>几何属性</code>，对于这样的变化，浏览器不需重新计算元素的几何属性，可以直接为元素绘制新的样式，称为重绘，例如：</p>
<ul>
<li>color</li>
<li>background-color</li>
<li>border-color</li>
</ul>
<p>改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变。</p>
<h3 id="_4-3-浏览器的优化机制" tabindex="-1"><a class="header-anchor" href="#_4-3-浏览器的优化机制" aria-hidden="true">#</a> 4.3 浏览器的优化机制</h3>
<p>现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在队列中，至少一个浏览器刷新（即 16.6ms）才会清空队列，但当你获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值。</p>
<p>主要包括以下属性或方法：</p>
<ul>
<li>offsetTop、offsetLeft、offsetWidth、offsetHeight</li>
<li>scrollTop、scrollLeft、scrollWidth、scrollHeight</li>
<li>clientTop、clientLeft、clientWidth、clientHeight</li>
<li>width、height</li>
<li>getComputedStyle()</li>
<li>getBoundingClientRect()</li>
</ul>
<p>所以，我们应该<strong>避免频繁</strong>的使用上述的属性，他们都会强制渲染刷新队列。</p>
<h3 id="_4-4-减少重绘和回流-重排" tabindex="-1"><a class="header-anchor" href="#_4-4-减少重绘和回流-重排" aria-hidden="true">#</a> 4.4 减少重绘和回流(重排)</h3>
<p><strong>CSS</strong></p>
<ul>
<li>使用 transform 替代 top</li>
<li>使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局</li>
<li>避免使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局。</li>
<li>尽可能在 DOM 树的最末端改变 class，回流是不可避免的，但可以减少其影响。尽可能在 DOM 树的最末端改变 class，可以限制了回流的范围，使其影响尽可能少的节点。</li>
<li>避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">span</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">div > a > span</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>对于第一种设置样式的方式来说，浏览器只需要找到页面中所有的<code>span</code>标签设置颜色，但是对于第二种设置样式的方式来说，浏览器需要一层一层筛选，这样的递归过程就很复杂。所以我们应该尽量保证层级扁平。</li>
<li>将动画效果应用在<code>position：absolute | fixed</code>的元素上，避免影响其他元素的布局，这样只会引发一个重绘，而不是回流。</li>
<li>将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如 <code>will-change、video、iframe</code> 等标签，浏览器会自动将该节点变为图层。</li>
<li>CSS3硬件加速（GPU 加速），使用 <strong>css3硬件加速</strong>，可以让 transform、opacity、filters 这些动画不会引起回流重绘 。但是对于动画的其它属性，比如 <code>background-color</code> 这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。</li>
</ul>
<p><strong>JavaScript</strong></p>
<ul>
<li>避免频繁操作样式，最好一次性重写<code>style</code>属性，或者将样式列表定义为<code>class</code>并一次性更改；</li>
<li>避免频繁操作 DOM，创建一个<code>documentFragment</code>，在它上面应用所有<code>DOM</code>操作，最后再把它添加到文档中。</li>
<li>避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。</li>
<li>对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。</li>
</ul>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<p>尝试走进浏览器的大门，你会对自己天天要调试的页面（浏览器）变得越来越亲切，也许有一天你会深耕在浏览器领域，希望而这一切的起因都是因为这个浏览器系列，来自<a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">《余光前端笔记》<OutboundLink/></a></p>
<p><strong>参考</strong></p>
<ul>
<li><a href="https://juejin.cn/post/6844904121292570632#heading-0" target="_blank" rel="noopener noreferrer">一文让你彻底搞懂浏览器的渲染流程<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/csdnnews/article/details/95267307" target="_blank" rel="noopener noreferrer">前端必会！四步带你吃透浏览器渲染基本原理<OutboundLink/></a></li>
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
