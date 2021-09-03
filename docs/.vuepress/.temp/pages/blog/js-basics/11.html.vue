<template><h1 id="javascript基础-番外-学习正则表达式的简单方法" tabindex="-1"><a class="header-anchor" href="#javascript基础-番外-学习正则表达式的简单方法" aria-hidden="true">#</a> JavaScript基础（番外）学习正则表达式的简单方法</h1>
<blockquote>
<p>正则表达式是繁琐的，但它是强大的，学会之后的应用会让你除了提高效率外，会给你带来绝对的成就感。</p>
</blockquote>
<h2 id="一、什么是正则" tabindex="-1"><a class="header-anchor" href="#一、什么是正则" aria-hidden="true">#</a> 一、什么是正则？</h2>
<ol start="2">
<li>正则表达式是一种被用于从文本中检索符合某些特定模式的文本。</li>
<li>正则表达式可以被用来替换字符串中的文本、验证表单、基于模式匹配从一个字符串中提取字符串等等。</li>
</ol>
<p>先来看看一个经典场景：</p>
<p>想象一下，您希望在用户填写用户名时遵守以下规则，仅包含字母，数字，下划线和连字符。同时我们还想限制用户名中的字符数量。这时我们可以使用以下正则表达式来验证用户名：</p>
<p><img src="https://img-blog.csdnimg.cn/20210702155025650.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<p>下面的代码就是上面正则表达式的简单应用</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>验证<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> oInput <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"input"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[0-9a-z_-]{3,15}$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> e <span class="token operator">=</span> oInput<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"用户名验证通过"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"⚠️验证错误⚠️"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>上面的规则组合是我们根据目标字符串的特点分析出来的，接下来我们来看看它的基本语法吧</p>
<h3 id="_1-1-test-检测字符串" tabindex="-1"><a class="header-anchor" href="#_1-1-test-检测字符串" aria-hidden="true">#</a> 1.1 test() 检测字符串</h3>
<p>test() 方法用于检测一个字符串是否匹配某个模式。</p>
<p><code>RegExpObject.test(string)</code></p>
<p><strong>返回值：</strong></p>
<p>如果字符串<code>string</code>中含有与<code>RegExpObject</code>匹配的文本，则返回<code>true</code>，否则返回<code>false</code>。</p>
<p><strong>示例：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">abc</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'123'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token operator">/</span>abc<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'abcd'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_1-2-replace-替换字符串" tabindex="-1"><a class="header-anchor" href="#_1-2-replace-替换字符串" aria-hidden="true">#</a> 1.2 replace() 替换字符串</h3>
<p>replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。</p>
<p><strong>返回值：</strong></p>
<p>一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。</p>
<p><strong>示例：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'yuguang up'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">yuguang</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">'余光'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "余光 up"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="二、元字符" tabindex="-1"><a class="header-anchor" href="#二、元字符" aria-hidden="true">#</a> 二、元字符</h2>
<p>元字符是正则表达式的基本组成元素。元字符在这里跟它通常表达的意思不一样，而是以某种特殊的含义去解释。</p>
<p>常用的元字符如下：</p>
<table>
<thead>
<tr>
<th>元字符</th>
<th>描述</th>
<th>举例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>.</code></td>
<td>匹配除换行符以外的任意字符</td>
<td><code>/.ing/.test('eating')</code></td>
</tr>
<tr>
<td><code>[xyz]</code></td>
<td>字符集，匹配方括号中包含的任意字符</td>
<td>'[abc]' 可以匹配 &quot;plain&quot; 中的 'a'</td>
</tr>
<tr>
<td><code>[^xyz]</code></td>
<td>负值字符集合。匹配未包含的任意字符</td>
<td>负值字符集合。匹配未包含的任意字符。例如，</td>
</tr>
<tr>
<td><code>*</code></td>
<td>匹配前面的子表达式零次或多次</td>
<td><code>/abc*/.test('ab')</code> 匹配 0 次是可以的</td>
</tr>
<tr>
<td><code>+</code></td>
<td>匹配前面的子表达式零次或多次</td>
<td><code>/abc*/.test('abcc')</code></td>
</tr>
<tr>
<td><code>?</code></td>
<td>匹配前面的子表达式零次或一次</td>
<td><code>/123?/.test('12')</code></td>
</tr>
<tr>
<td><code>{n,m}</code></td>
<td>花括号，匹配前面字符至少 n 次，但是不超过 m 次</td>
<td></td>
</tr>
<tr>
<td><code>(xyz)</code></td>
<td>字符组，按照确切的顺序匹配字符 xyz</td>
<td></td>
</tr>
<tr>
<td>`</td>
<td>`</td>
<td>分支结构，匹配符号之前的字符或后面的字符</td>
</tr>
<tr>
<td><code>\</code></td>
<td>转义符，它可以还原元字符原来的含义，允许你匹配保留字符</td>
<td></td>
</tr>
<tr>
<td><code>^</code></td>
<td>匹配行的开始</td>
<td></td>
</tr>
<tr>
<td><code>$</code></td>
<td>匹配行的结束</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="_2-1-英文句号" tabindex="-1"><a class="header-anchor" href="#_2-1-英文句号" aria-hidden="true">#</a> 2.1 英文句号</h3>
<p>英文句号，在匹配时也与它实际意义不同，它是元字符中最简单例子.</p>
<p>我们要匹配 &quot;End&quot; 这个字符串，还要仅仅运用 &quot;.&quot;，可以怎么做？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.nd</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'End'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-2-字符集-和-否定字符集" tabindex="-1"><a class="header-anchor" href="#_2-2-字符集-和-否定字符集" aria-hidden="true">#</a> 2.2 字符集 和 否定字符集</h3>
<p>字符集又叫字符类，通常情况下它表示，匹配大括号内所包含的任意<strong>一个</strong>字符</p>
<p>我们要匹配 &quot;End&quot;或&quot;end&quot; 时，可以怎么做？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[Ee]nd</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'End'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'and'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>**注意1：**元字符<code>^</code>代表从字符串的起始位置开始匹配，但在字符集内，它表示否定或取反</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 注意1：</span>
<span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^Ee]nd</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'End'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'and'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>**注意2：**元字符<code>.</code>代表换行符以外的任意字符，但在字符集内，它就代表英文句号</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 注意2：</span>
<span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">ok[.]</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'is ok!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'is ok.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_2-3-重复" tabindex="-1"><a class="header-anchor" href="#_2-3-重复" aria-hidden="true">#</a> 2.3 重复</h3>
<p>重复通常是匹配某一个规则多次，这和花括号的部分作用重合，区别在于匹配的次数问题</p>
<h4 id="_2-3-1-星号" tabindex="-1"><a class="header-anchor" href="#_2-3-1-星号" aria-hidden="true">#</a> 2.3.1 星号</h4>
<p>星号（*）表示匹配上一个匹配规则<code>零次</code>或<code>多次</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">yuguang*</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'yuguan'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'yuguanggggg'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_2-3-2-加号" tabindex="-1"><a class="header-anchor" href="#_2-3-2-加号" aria-hidden="true">#</a> 2.3.2 加号</h4>
<p>加号（+）表示匹配上一个匹配规则<code>1次</code>或<code>多次</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">yuguang+</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'yuguang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'yuguan'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_2-3-3-问号" tabindex="-1"><a class="header-anchor" href="#_2-3-3-问号" aria-hidden="true">#</a> 2.3.3 问号</h4>
<p>问号（?）用来表示前一个字符是可选的。该符号匹配前一个字符零次或一次。</p>
<p>表示：可选的字母y紧跟小写字母uguang</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">y?uguang</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'uguang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'yuguang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h4>
<p><code>*</code>如果出现在字符集之后，它表示整个字符集的重复。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[0-9]*</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'12345'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-4-花括号" tabindex="-1"><a class="header-anchor" href="#_2-4-花括号" aria-hidden="true">#</a> 2.4 花括号</h3>
<p>在正则表达式中花括号用于指定字符或一组字符可以重复的次数。例如正则表达式 <code>[0-9]{2,3}</code>，表示：匹配至少2位数字但不超过3位</p>
<ul>
<li>我们可以省略第二个数字：则正则表达式 <code>[0-9]{2,}</code>，表示：匹配 2 个或更多个数字。</li>
<li>我们也可以删除逗号：则正则表达式 <code>[0-9]{2}</code>，表示：匹配正好为 2 位数的数字。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[0-9]{1,}</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//false</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_2-5-字符组" tabindex="-1"><a class="header-anchor" href="#_2-5-字符组" aria-hidden="true">#</a> 2.5 字符组</h3>
<p>字符组是一组写在圆括号内的子模式 (...)，(xyz)按照确切的顺序匹配字符<code>x-&gt;y-&gt;z</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">'ababcdcd'</span><span class="token punctuation">;</span>
str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">ab</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">'替换'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "替换abcdcd"</span>
str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(ab)*</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">'替换'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "替换cdcd"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>注意：</strong></p>
<p>正如我们看到的，把量词放在一个字符组之后，它会重复整个字符组。 例如正则表达式 (ab)* 表示匹配零个或多个的字符串“ab”。</p>
<h3 id="_2-6-分支-或" tabindex="-1"><a class="header-anchor" href="#_2-6-分支-或" aria-hidden="true">#</a> 2.6 分支（或）</h3>
<p>在正则表达式中垂直条 <code>|</code> 用来定义分支结构，分支结构就像多个表达式之间的条件。现在你可能认为这个字符集和分支结构的工作方式一样。 但是字符集和分支结构巨大的区别是字符集只在字符级别上有作用，然而分支结构在表达式级别上依然可以使用。 例如正则表达式 <code>(T|t)he|car</code>，表示：匹配大写字母 T 或小写字母 t，后面跟小写字母 h，后跟小写字母 e，或匹配小写字母 c，后跟小写字母 a，后跟小写字母 r。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(T|t)he|car</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'The'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'tcar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_2-7-转义特殊字符" tabindex="-1"><a class="header-anchor" href="#_2-7-转义特殊字符" aria-hidden="true">#</a> 2.7 转义特殊字符</h3>
<p>正则表达式中使用反斜杠 <code>\</code> 来转义下一个字符。这将允许你使用保留字符来作为匹配字符:</p>
<p><code>{ } [ ] / \ + * . $ ^ | ?</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.{1}</span><span class="token regex-delimiter">/</span></span>
<span class="token string">'aa.bb.cc'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span> <span class="token string">'-'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "aa-bb.cc"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-8-定位符" tabindex="-1"><a class="header-anchor" href="#_2-8-定位符" aria-hidden="true">#</a> 2.8 定位符</h3>
<p>在正则表达式中，为了检查匹配符号是否是起始符号或结尾符号，我们使用定位符。</p>
<h4 id="_2-8-1-插入符号" tabindex="-1"><a class="header-anchor" href="#_2-8-1-插入符号" aria-hidden="true">#</a> 2.8.1 插入符号</h4>
<p>插入符号 ^ 符号用于检查匹配字符是否是输入字符串的第一个字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 因为起始不是a->b->c 替换失败</span>
<span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^abc</span><span class="token regex-delimiter">/</span></span>
<span class="token string">'not abc'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span> <span class="token string">'***'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "not abc"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_2-8-2-符号" tabindex="-1"><a class="header-anchor" href="#_2-8-2-符号" aria-hidden="true">#</a> 2.8.2 $符号</h4>
<p>美元 $ 符号用于检查匹配字符是否是输入字符串的最后一个字符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 因为起始不是a->b->c 替换失败</span>
<span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">abc$</span><span class="token regex-delimiter">/</span></span>
<span class="token string">'not abc'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span> <span class="token string">'***'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "not ***"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="三、简写字符集" tabindex="-1"><a class="header-anchor" href="#三、简写字符集" aria-hidden="true">#</a> 三、简写字符集</h2>
<p>正则表达式为常用的字符集和常用的正则表达式提供了简写。简写字符集如下：</p>
<table>
<thead>
<tr>
<th>简写</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>.</td>
<td>匹配除换行符以外的任意字符</td>
</tr>
<tr>
<td>\w</td>
<td>匹配所有字母和数字的字符：[a-zA-Z0-9_]</td>
</tr>
<tr>
<td>\W</td>
<td>匹配非字母和数字的字符：[^\w]</td>
</tr>
<tr>
<td>\d</td>
<td>匹配数字：[0-9]</td>
</tr>
<tr>
<td>\D</td>
<td>匹配非数字：[^\d]</td>
</tr>
<tr>
<td>\s</td>
<td>匹配空格符：[\t\n\f\r\p{Z}]</td>
</tr>
<tr>
<td>\S</td>
<td>匹配非空格符：[^\s]</td>
</tr>
</tbody>
</table>
<p>注意：这里并不是全部的简写，仅列出了常用或常见的。</p>
<p>我们依次为表格中的简写配一个示例</p>
<p><strong>匹配除换行符以外的任意字符：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 将换行符前的内容打码</span>
<span class="token string">'hi yuguang \n hi xiaoming'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">'***'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "***\n hi xiaoming"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>匹配所有字母和数字的字符：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'123'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\w</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">'***'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ***</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>匹配数字：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 匹配存在连续3位数字的字符串</span>
<span class="token operator">/</span>\d<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'1a2b3c444'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>匹配空格符：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 将空格替换成 :</span>
<span class="token string">'12 59'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\s</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">':'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "12:59"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="四、断言" tabindex="-1"><a class="header-anchor" href="#四、断言" aria-hidden="true">#</a> 四、断言</h2>
<p>编写代码时，我们总是会做出一些假设，断言就是用于在代码中捕捉这些假设，而正则中的断言也是类似的存在：</p>
<p>先来看看都有哪些断言</p>
<table>
<thead>
<tr>
<th>符号</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>?=</td>
<td>正向先行断言</td>
</tr>
<tr>
<td>?!</td>
<td>负向先行断言</td>
</tr>
<tr>
<td>?&lt;=</td>
<td>正向后行断言</td>
</tr>
<tr>
<td>?&lt;!</td>
<td>负向后行断言</td>
</tr>
</tbody>
</table>
<h3 id="_4-1-正向先行断言" tabindex="-1"><a class="header-anchor" href="#_4-1-正向先行断言" aria-hidden="true">#</a> 4.1 正向先行断言</h3>
<p>正向先行断言认为第一部分的表达式的后面必须是先行断言表达式。返回的匹配结果仅包含与第一部分表达式匹配的文本。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[Tt]he(?=\syuguang)</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'the yuguang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'the xiaoming'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>表示：匹配T或t，-&gt;h-&gt;e。 在括号中，我们定义了正向先行断言，它会引导正则表达式引擎匹配后面跟着 yuguang 的 The 或 the。</p>
<h3 id="_4-2-负向先行断言" tabindex="-1"><a class="header-anchor" href="#_4-2-负向先行断言" aria-hidden="true">#</a> 4.2 负向先行断言</h3>
<p>当我们需要指定第一部分表达式的后面不跟随某一内容时，使用负向先行断言。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[Tt]he(?!\syuguang)</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'the xiaoming'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_4-3-正向后行断言" tabindex="-1"><a class="header-anchor" href="#_4-3-正向后行断言" aria-hidden="true">#</a> 4.3 正向后行断言</h3>
<p>不难理解，后行就是匹配规则在之后的，用于获取跟随在特定模式之后的所有匹配内容。</p>
<p>例如正则表达式 (?&lt;=(T|t)he\s)(fat|mat)，表示：从输入字符串中获取在单词 The 或 the 之后的所有 fat 和 mat 单词。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;=(T|t)he\s)(fat|mat)</span><span class="token regex-delimiter">/</span></span>
<span class="token string">'The fat cat'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span> <span class="token string">'***'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "The *** cat"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_4-4-负向后行断言" tabindex="-1"><a class="header-anchor" href="#_4-4-负向后行断言" aria-hidden="true">#</a> 4.4 负向后行断言</h3>
<p>获取跟随在特定模式以外的所有匹配内容</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;=(T|t)he\s)(fat|mat)</span><span class="token regex-delimiter">/</span></span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'the fat cat'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 任意个的数字 + . | 数字 + 任意个数字</span>
<span class="token operator">/</span><span class="token punctuation">(</span>\d<span class="token operator">+</span><span class="token punctuation">(</span>\d<span class="token operator">|</span>\<span class="token punctuation">.</span><span class="token punctuation">)</span>\d<span class="token operator">+</span><span class="token punctuation">)</span><span class="token punctuation">(</span>\w<span class="token punctuation">)</span><span class="token operator">/</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="五、修饰符" tabindex="-1"><a class="header-anchor" href="#五、修饰符" aria-hidden="true">#</a> 五、修饰符</h2>
<p>不知道大家对上面的例子是否存在疑问，比如</p>
<ol>
<li>匹配一段规则，可以做到全局替换吗？</li>
<li>如果换行了怎么办？</li>
<li>...</li>
</ol>
<p>这就又引出了修饰符：因为它会修改正则表达式的输出。这些标志可以以任意顺序或组合使用，并且是正则表达式的一部分。</p>
<table>
<thead>
<tr>
<th>标记</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>i	不区分大小写：将匹配设置为不区分大小写。</td>
<td></td>
</tr>
<tr>
<td>g</td>
<td>全局搜索：搜索整个输入字符串中的所有匹配。</td>
</tr>
<tr>
<td>m</td>
<td>多行匹配：会匹配输入字符串每一行。</td>
</tr>
</tbody>
</table>
<h3 id="_5-1-不区分大小写" tabindex="-1"><a class="header-anchor" href="#_5-1-不区分大小写" aria-hidden="true">#</a> 5.1 不区分大小写</h3>
<p><code>i</code> 修饰符用于执行不区分大小写匹配。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'Hello'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">H</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "*ello"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_5-2-全局搜索" tabindex="-1"><a class="header-anchor" href="#_5-2-全局搜索" aria-hidden="true">#</a> 5.2 全局搜索</h3>
<p><code>g</code> 修饰符用于执行全局匹配（会查找所有匹配，不会在查找到第一个匹配时就停止）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'112233-112233-112233'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(112233)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'密码'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "密码-密码-密码"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_5-3-多行匹配" tabindex="-1"><a class="header-anchor" href="#_5-3-多行匹配" aria-hidden="true">#</a> 5.3 多行匹配</h3>
<p><code>m</code> 修饰符被用来执行多行的匹配。正如我们前面讨论过的 (^, $)，使用定位符来检查匹配字符是输入字符串开始或者结束。但是我们希望每一行都使用定位符，所以我们就使用 m 修饰符。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'The fat\n cat sat\n on the mat'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.(at)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gm</span></span><span class="token punctuation">,</span> <span class="token string">'结尾'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// "The 结尾\n cat 结尾\n on the 结尾"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="六、常见正则练习" tabindex="-1"><a class="header-anchor" href="#六、常见正则练习" aria-hidden="true">#</a> 六、常见正则练习</h2>
<h3 id="_6-1-电话号码匹配" tabindex="-1"><a class="header-anchor" href="#_6-1-电话号码匹配" aria-hidden="true">#</a> 6.1 电话号码匹配</h3>
<p>像电话号码的匹配规则其实没有绝对正确的答案，先来分析一下下面正则要匹配的手机号应该符合什么样的规则？</p>
<p><strong>正则：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/^1([358][0-9]|4[579]|6[67]|7[0135678]|9[189])[0-9]{8}$/</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>分析：</strong></p>
<ol>
<li>第一位一定是<code>1</code></li>
<li>第二位+第三位：要根据括号内的分支结构区分。分别是：</li>
</ol>
<ul>
<li>第二位：3、5、8 =&gt; 第三位：任意数字；</li>
<li>第二位：4 =&gt; 第三位：5、7、9；</li>
<li>第二位：6 =&gt; 第三位：6、7；</li>
<li>第二位：7 =&gt; 第三位：0、1、3、5、6、7、8；</li>
<li>第二位：9 =&gt; 第三位：1、8、9；</li>
</ul>
<ol start="3">
<li>剩余八位：任意8位数组排列组合`</li>
</ol>
<p>手机号正则表达式虽然很长，但实际分析起来并不复杂，在知道确切的规则后相信大家都能慢慢推导出来，话不多说直接上图：</p>
<p><strong>图示：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210712173729697.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_6-2-邮箱校验" tabindex="-1"><a class="header-anchor" href="#_6-2-邮箱校验" aria-hidden="true">#</a> 6.2 邮箱校验</h3>
<p><strong>正则：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z0-9_\-]+)$</span><span class="token regex-delimiter">/</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>分析：</strong></p>
<ol>
<li>起始：任意大小写字母或下划线或或数字 + @</li>
<li>中间：任意大小写字母或下划线或或数字 + .</li>
<li>结束：任意大小写字母或下划线或或数字</li>
</ol>
<p><strong>图示：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/20210712193056570.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h3 id="_6-3-xxxx-xx-xx日期转换" tabindex="-1"><a class="header-anchor" href="#_6-3-xxxx-xx-xx日期转换" aria-hidden="true">#</a> 6.3 xxxx-xx-xx日期转换</h3>
<p>有这样一个需求，明确的知道时间格式是：“2021-1-1”和“2021-12-1”，要准确的提取出年、月、日需要怎么做的？（只考虑正则哦）</p>
<p>这次我们先分析后写正则：</p>
<p><strong>分析</strong></p>
<ol>
<li>年：固定四位数字：<code>^[0-9]{4}</code></li>
<li>月：1-2位数字：</li>
</ol>
<ul>
<li>1位时：<code>[1-9]</code></li>
<li>2位时：<code>1[0-2]</code></li>
</ul>
<ol start="3">
<li>日：1-2位数字：</li>
</ol>
<ul>
<li>1位时：<code>[1-9]</code></li>
<li>2位时：<code>[12][0-9]|3[01]$</code></li>
</ul>
<p><strong>正则</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//      $1           $2                $3</span>
<span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^([0-9]{4})-([1-9]|1[0-2])-([12][0-9]|3[01]|[1-9])$</span><span class="token regex-delimiter">/</span></span>

<span class="token comment">// 测试代码</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token punctuation">,</span>year<span class="token punctuation">,</span> month<span class="token punctuation">,</span> day<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'2012-1-12'</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>图示：</strong></p>
<p><img src="https://img-blog.csdnimg.cn/2021071218500737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>邮箱：webbj97@163.com</li>
</ul>
<h3 id="其他沉淀" tabindex="-1"><a class="header-anchor" href="#其他沉淀" aria-hidden="true">#</a> 其他沉淀</h3>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">Github: Js 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN 博客汇总<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p></template>
