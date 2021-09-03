<template><h1 align=center>浏览器（一）跨域</h1>
<p>因为浏览器出于安全的考虑，有同源策略，也就是说如果协议、域名或者端口有一个不同的就是跨域，Ajax 请求就会失败。</p>
<p>我们可以通过以下几种常用方法解决跨域的问题</p>
<h2 id="一、jsonp" tabindex="-1"><a class="header-anchor" href="#一、jsonp" aria-hidden="true">#</a> 一、JSONP</h2>
<p>原理：利用<code>&lt;script&gt;标签</code>没有跨域限制的漏洞。通过 script 标签指向一个需要访问的地址，并提供一个回到函数来接收数据。</p>
<p><strong>特点</strong></p>
<ul>
<li>使用简单且兼容性不错，但只限于 GET 请求</li>
</ul>
<p><strong>例：</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://domain/api?param1=a&amp;param2=b&amp;callback=jsonp<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">function</span> <span class="token function">jsonp</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>封装一个 JSONP</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createJsonp</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> jsonpCallback<span class="token punctuation">,</span> success</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"script"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  script<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>
  script<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  script<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">"text/javascript"</span><span class="token punctuation">;</span>
  window<span class="token punctuation">[</span>jsonpCallback<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    success <span class="token operator">&amp;&amp;</span> <span class="token function">success</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">createJsonp</span><span class="token punctuation">(</span><span class="token string">"http://xxx"</span><span class="token punctuation">,</span> <span class="token string">"callback"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="二、cors" tabindex="-1"><a class="header-anchor" href="#二、cors" aria-hidden="true">#</a> 二、CORS</h2>
<p>CORS 需要浏览器和后端同时支持，浏览器会自动进行 CORS 通信，而实现它的关键在后端。</p>
<p>服务器设置 <code>Access-Control-Allow-Origin</code> 就可以开启 CORS，概述行表示哪些域名可以访问资源。</p>
<h2 id="三、document-domain" tabindex="-1"><a class="header-anchor" href="#三、document-domain" aria-hidden="true">#</a> 三、document.domain</h2>
<p>该方式只能用于二级域名相同的情况下，比如</p>
<ul>
<li>a.test.com</li>
<li>b.test.com</li>
</ul>
<p>只需要给页面添加 document.domain = 'test.com'，表示二级域名相同就可以实现跨域</p>
<h2 id="四、postmessage" tabindex="-1"><a class="header-anchor" href="#四、postmessage" aria-hidden="true">#</a> 四、postMessage</h2>
<p>这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送信息，另一个页面判断来源并接受信息</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 发送信息端</span>
window<span class="token punctuation">.</span>parent<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">"message"</span><span class="token punctuation">,</span> <span class="token string">"http://test.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 接收信息端</span>
<span class="token keyword">var</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MessageChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mc<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"message"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> origin <span class="token operator">=</span> event<span class="token punctuation">.</span>origin <span class="token operator">||</span> event<span class="token punctuation">.</span>originalEvent<span class="token punctuation">.</span>origin<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>origin <span class="token operator">===</span> <span class="token string">"http://test.com"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"验证通过"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></template>
