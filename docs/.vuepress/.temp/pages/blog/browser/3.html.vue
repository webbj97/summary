<template><h1 id="走进-event-loop" tabindex="-1"><a class="header-anchor" href="#走进-event-loop" aria-hidden="true">#</a> 走进 Event Loop</h1>
<blockquote>
<p>大家都知道，在使用 setTimeout 或是其他异步任务的时候要多加小心，这是因为其涉及到了 Js 的事件循环机制。很多时候因为经验，我们不需要知道其原理就能避免一些错误，但今天我们还是来聊一聊，浏览器下的EventLoop机制的那些事～</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/20210530142042150.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="一、javascript-与单线程" tabindex="-1"><a class="header-anchor" href="#一、javascript-与单线程" aria-hidden="true">#</a> 一、JavaScript 与单线程？</h2>
<p>JavaScript 语言的一大特点就是<strong>单线程</strong>，也就是说，同一个时间只能做一件事。那么，为什么 JavaScript 不能有多个线程呢？这样能提高效率啊。</p>
<blockquote>
<p>答: <br/>
JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？</p>
</blockquote>
<p>所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。</p>
<img src="https://img-blog.csdnimg.cn/20210530142104341.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" width="60%">
<h2 id="二、任务" tabindex="-1"><a class="header-anchor" href="#二、任务" aria-hidden="true">#</a> 二、任务</h2>
<blockquote>
<p>简单了解一下同步和异步这两个概念</p>
</blockquote>
<h3 id="_2-1-同步与异步" tabindex="-1"><a class="header-anchor" href="#_2-1-同步与异步" aria-hidden="true">#</a> 2.1 同步与异步</h3>
<p>一般而言，任务分为：发出调用和得到结果两步。</p>
<ul>
<li>发出调用，“立即”得到结果是为同步</li>
<li>发出调用，但无法“立即”得到结果，需要额外的操作才能得到预期的结果是为异步。</li>
</ul>
<p>同步任务需要就是调用之后一直等待，直到返回结果。异步则是调用之后，不能直接拿到结果，通过一系列的手段才最终拿到结果（调用之后，拿到结果中间的时间可以介入其他任务）。</p>
<p>来阅读下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>拟人分析：</strong></p>
<ol>
<li>我要喝水 1：拿起水，喝～</li>
<li>我订了个午餐 2：上面预计送达时间 1 分钟，我当然不可能坐等外卖！</li>
<li>我订要喝水 3：拿起水，喝～</li>
<li>我定了个水果 4：上面预计送达时间 0，但只要是外卖，我就不着急！</li>
<li>订完外卖，我直接喝水 5：嗝～，不能再喝了，该谢谢了</li>
<li>此时我正好没事做，不如去看看外卖？</li>
<li>果然预计时间 0s 送达的水果先到了，我先吃口水果</li>
<li>吃完水果午餐也到了，嗯，愉快的一天</li>
</ol>
<p>需要注意的是：我们这样对待<code>setTimeout</code>（订外卖），是因为我们不知道要等多久，所以我们完全不关心他是不是马上送到，而是将眼前的任务（手里看得见的其他事情）执行完，当手里没事做时才会去执行<code>setTimeout</code>指定的回调函数（取外卖）。</p>
<p>这段分析合情合理，我感觉我离真相又进了一步！</p>
<img src="https://img-blog.csdnimg.cn/20210530142250993.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" width="60%">
<h3 id="_2-2-宏任务与微任务" tabindex="-1"><a class="header-anchor" href="#_2-2-宏任务与微任务" aria-hidden="true">#</a> 2.2 宏任务与微任务</h3>
<blockquote>
<p>下面的两种任务，都属于异步任务，但浏览器对他们的处理存在很大的区别。</p>
</blockquote>
<ul>
<li>宏任务：MacroTask
<ul>
<li>如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。</li>
</ul>
</li>
<li>微任务：MicroTask
<ul>
<li>如: new Promise().then(回调)、MutationObserver(html5 新特性) 等。</li>
</ul>
</li>
</ul>
<h2 id="三、eventloop" tabindex="-1"><a class="header-anchor" href="#三、eventloop" aria-hidden="true">#</a> 三、EventLoop</h2>
<blockquote>
<p>js 的另一大特点是非阻塞，借用书中的一句话：这需要一套机制来处理<strong>现在运行</strong>的事情和<strong>将来要运行</strong>的事情，而 EventLoop 就是这样一套机制。</p>
</blockquote>
<h3 id="_3-1-执行栈" tabindex="-1"><a class="header-anchor" href="#_3-1-执行栈" aria-hidden="true">#</a> 3.1 执行栈</h3>
<p>JS 执行栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。</p>
<h3 id="_3-2-对同步、异步的处理" tabindex="-1"><a class="header-anchor" href="#_3-2-对同步、异步的处理" aria-hidden="true">#</a> 3.2 对同步、异步的处理</h3>
<p>Javascript 单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。</p>
<p><img src="https://img-blog.csdnimg.cn/2021053012502727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p><strong>注意</strong></p>
<ul>
<li>宏任务队列可以有多个；</li>
<li>微任务队列只有一个；</li>
</ul>
<h3 id="_3-3-eventloop-过程解析" tabindex="-1"><a class="header-anchor" href="#_3-3-eventloop-过程解析" aria-hidden="true">#</a> 3.3 EventLoop 过程解析</h3>
<p>上图：</p>
<p><img src="https://img-blog.csdnimg.cn/20210529222456556.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>值得一提的是，整个<code>&lt;script&gt;</code>标签包裹的整体代码，是属于宏任务。</p>
<ol>
<li>任务会依次进入<strong>执行栈</strong>，而首先入场的就是——宏任务全局上下文(<code>script</code>)；</li>
<li>执行同步任务；</li>
<li>js 引擎遇到一个<strong>异步任务</strong>后并不会一直等待其返回结果：
<ul>
<li>遇到异步任务，交给异步处理模块处理，对应的异步处理线程处理异步任务需要的操作，例如定时器的计数和异步请求监听状态的变更；</li>
<li>当异步事件返回结果后，事件触发线程将回调函数（标记）加入任务队列，等待栈为空时，依次进入栈中执行；</li>
</ul>
</li>
<li>执行栈在执行完同步任务后，查看执行栈是否为空，如果执行栈为空：
<ul>
<li><strong>先检查</strong>微任务(microTask)队列，如果存在任务，则<strong>一次性执行完所有</strong>微任务，无任务则跳过</li>
<li><strong>后检查</strong>宏任务(macroTask)队列，如果存在任务，则<strong>取出第一个</strong>宏任务，执行，</li>
</ul>
</li>
</ol>
<p><strong>总结 1:</strong></p>
<p>每次单个宏任务执行完毕后，检查微任务(microTask)队列是否为空，如果不为空的话，会按照先入先出的规则全部执行完微任务(microTask)后，设置微任务(microTask)队列为 null，然后再执行宏任务，如此循环。</p>
<p><strong>总结 2:</strong></p>
<p>又因为第一次进入执行栈的总是宏任务（Script），而每次宏任务完成后，都会读取微任务队列，所以，大家也会听见另一种表述方式：、</p>
<p>每一轮循环中，同步任务执行后会在末尾执行并清空所有的微任务，会在下一轮循环中取第一个宏任务执行，如此循环。</p>
<p>下面我们用两段代码来分析一下今天所学～</p>
<p><img src="https://img-blog.csdnimg.cn/20210530142414407.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<h2 id="四、示例分析" tabindex="-1"><a class="header-anchor" href="#四、示例分析" aria-hidden="true">#</a> 四、示例分析</h2>
<h3 id="_4-1-同步-宏任务" tabindex="-1"><a class="header-anchor" href="#_4-1-同步-宏任务" aria-hidden="true">#</a> 4.1 同步+宏任务</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 0s延迟的定时任务</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>以这段代码举例，我们按照第三小节的步骤逐步分析：</p>
<ol>
<li>从全局任务入口，首先打印日志 1，</li>
<li>遇到宏任务<code>setTimeout-log(2)</code>，交给异步处理模块</li>
<li>遇到宏任务<code>setTimeout-log(3)</code>，交给异步处理模块</li>
<li>顺序执行，打印日志 4，</li>
<li>同步任务执行完毕，读取微任务队列，为 null，则读取宏任务队列第一个，先返回处理结果的是<code>setTimeout-log(3)</code>，将 log(3) 内回调函数加入执行队列，顺序执行，打印日志 3，</li>
<li>继续重复步骤 5，顺序执行，打印日志 2，执行结束。</li>
</ol>
<p><strong>注意：</strong></p>
<p>读取宏任务队列的任务，<code>setTimeout-log(3)</code>，虽然定时器的等待时间被设置 0 秒，但是<code>W3C</code>在<code>HTML标准</code>中规定，规定要求<code>setTimeout</code>中低于<code>4ms</code>的时间间隔算为 4ms。</p>
<p>由于浏览器在执行以上三步时，并未耗时很久，所以当宏任务<code>setTimeout-log(3)</code>1 执行完时， <code>setTimeout-log(1)</code>的等待时间并未结束，所以在 1 秒后打印,实际上并未等待 1 秒。</p>
<h3 id="_4-2-同步-宏任务-微任务" tabindex="-1"><a class="header-anchor" href="#_4-2-同步-宏任务-微任务" aria-hidden="true">#</a> 4.2 同步+宏任务+微任务</h3>
<p>再来看下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>第一轮循环</strong></p>
<ol>
<li>同样从全局任务入口，遇到宏任务<code>setTimeout-log(1)</code>，交给异步处理模块，由于等待时间为 0，直接加入宏任务队列。</li>
<li>再次遇到宏任务<code>setTimeout-log(3)</code>，交给异步处理模块，同样直接加入宏任务队列。</li>
<li>遇到微任务<code>then()-log(4)</code>，加入微任务队列。</li>
<li>最后遇到打印语句，直接<strong>打印5</strong>。</li>
<li>执行栈空</li>
</ol>
<p>画出当前任务队列的情况：</p>
<img src="https://img-blog.csdnimg.cn/20210530141123220.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="60%">
<p><strong>第二轮循环</strong></p>
<ol>
<li>执行栈空后，读取微任务队列，执行<code>then()-log(4)</code>，<strong>打印4</strong>，微任务队列为null；</li>
</ol>
<p>画出此刻任务队列的情况：</p>
<img src="https://img-blog.csdnimg.cn/20210530141147103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="60%">
<ol start="2">
<li>微任务队列为空，读取宏任务队列的最靠前的任务<code>setTimeout-log(1)</code>;；</li>
<li><strong>打印1</strong>，又遇到微任务<code>then()-log(2)</code>，加入微任务队列。第二轮循环结束。</li>
</ol>
<p>画出当前任务队列的情况：</p>
<img src="https://img-blog.csdnimg.cn/20210530141214426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="60%">
<p><strong>第三轮循环</strong></p>
<ol>
<li>读取微任务队列：<code>then()-log(2)</code>，<strong>打印2</strong>，微任务队列为null</li>
<li>读取宏任务队列首个任务：<code>setTimeout()-log(3)</code>，<strong>打印3</strong></li>
</ol>
<p>至此，异步任务队列也被清空，整个任务执行完毕</p>
<p><strong>最终结果：5，4，1，2，3</strong></p>
<h2 id="五、写在最后" tabindex="-1"><a class="header-anchor" href="#五、写在最后" aria-hidden="true">#</a> 五、写在最后</h2>
<p>尝试走进浏览器的大门，你会对自己天天要调试的页面（浏览器）变得越来越亲切，也许有一天你会深耕在浏览器领域，希望而这一切的起因都是因为这个浏览器系列，来自<a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">《余光前端笔记》<OutboundLink/></a></p>
<h3 id="_5-1-本文参考" tabindex="-1"><a class="header-anchor" href="#_5-1-本文参考" aria-hidden="true">#</a> 5.1 本文参考</h3>
<ul>
<li><a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" target="_blank" rel="noopener noreferrer">JavaScript 运行机制详解：再谈Event Loop<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/lin_credible/article/details/40143961" target="_blank" rel="noopener noreferrer">【朴灵评注】JavaScript 运行机制详解：再谈Event Loop<OutboundLink/></a></li>
<li><a href="https://muyiy.cn/question/browser/25.html" target="_blank" rel="noopener noreferrer">木易杨：说说浏览器事件循环<OutboundLink/></a></li>
</ul>
<h3 id="_5-2-关于我" tabindex="-1"><a class="header-anchor" href="#_5-2-关于我" aria-hidden="true">#</a> 5.2 关于我</h3>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>邮箱：webbj97@163.com</li>
</ul>
<h3 id="_5-3-其他沉淀" tabindex="-1"><a class="header-anchor" href="#_5-3-其他沉淀" aria-hidden="true">#</a> 5.3 其他沉淀</h3>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Github: Js 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN 博客汇总<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
</template>
