<template><h1 id="module-的语法" tabindex="-1"><a class="header-anchor" href="#module-的语法" aria-hidden="true">#</a> Module 的语法</h1>
<p>历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的require、Python 的import，甚至就连 CSS 都有@import，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。</p>
<p>在 ES6 之前，社区制定了一些模块加载方案，最主要的有：</p>
<ul>
<li>CommonJS</li>
<li>AMD</li>
</ul>
<p>前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。</p>
<p>ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。</p>
<h3 id="编译时加载-静态加载" tabindex="-1"><a class="header-anchor" href="#编译时加载-静态加载" aria-hidden="true">#</a> 编译时加载（静态加载）</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// ES6模块</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stat<span class="token punctuation">,</span> exists<span class="token punctuation">,</span> readFile <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'fs'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。</p>
<p><strong>ES6 模块还有以下好处。</strong></p>
<ol>
<li>不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。</li>
<li>将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。</li>
<li>不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。</li>
<li>本章介绍 ES6 模块的语法，下一章介绍如何在浏览器和 Node 之中，加载 ES6 模块。</li>
</ol>
<h3 id="export-命令" tabindex="-1"><a class="header-anchor" href="#export-命令" aria-hidden="true">#</a> export 命令</h3>
<p>模块功能主要由两个命令构成：<code>export</code>和<code>import</code>。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。</p>
<p>一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// profile.js</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> firstName <span class="token operator">=</span> <span class="token string">'Michael'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> lastName <span class="token operator">=</span> <span class="token string">'Jackson'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> year <span class="token operator">=</span> <span class="token number">1958</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上面代码是profile.js文件，保存了用户信息。ES6 将其视为一个模块，里面用export命令对外部输出了三个变量。</p>
<p>export的写法，除了像上面这样，还有另外一种。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// profile.js</span>
<span class="token keyword">var</span> firstName <span class="token operator">=</span> <span class="token string">'Michael'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> lastName <span class="token operator">=</span> <span class="token string">'Jackson'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> year <span class="token operator">=</span> <span class="token number">1958</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> year <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。</p>
<p>export命令除了输出变量，还可以输出函数或类（class）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上面代码对外输出一个函数multiply。</p>
<p>通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">v1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">v2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>
  v1 <span class="token keyword">as</span> streamV1<span class="token punctuation">,</span>
  v2 <span class="token keyword">as</span> streamV2<span class="token punctuation">,</span>
  v2 <span class="token keyword">as</span> streamLatestVersion
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。</p>
<p>需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 报错</span>
<span class="token keyword">export</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> m<span class="token punctuation">;</span>
上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 <span class="token number">1</span>，第二种写法通过变量m，还是直接输出 <span class="token number">1</span>。<span class="token number">1</span>只是一个值，不是接口。正确的写法是下面这样。

<span class="token comment">// 写法一</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>m<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 写法三</span>
<span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>n <span class="token keyword">as</span> m<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。</p>
<p>同样的，function和class的输出，也必须遵守这样的写法。2</p>
</template>
