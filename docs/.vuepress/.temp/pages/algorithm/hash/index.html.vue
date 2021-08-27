<template><h1 id="哈希表" tabindex="-1"><a class="header-anchor" href="#哈希表" aria-hidden="true">#</a> 哈希表</h1>
<h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2>
<p>哈希表是一种使用哈希函数组织数据，以支持快速插入和搜索的数据结构。</p>
<p>有两种不同类型的哈希表：哈希集合和哈希映射。</p>
<ul>
<li>哈希集合是集合数据结构的实现之一，用于存储非重复值。</li>
<li>哈希映射是映射 数据结构的实现之一，用于存储(key, value)键值对。</li>
</ul>
<h2 id="二、哈希表的原理" tabindex="-1"><a class="header-anchor" href="#二、哈希表的原理" aria-hidden="true">#</a> 二、哈希表的原理</h2>
<p>哈希表的关键思想是使用哈希函数将键映射到存储桶。更确切地说，</p>
<p>当我们插入一个新的键时，哈希函数将决定该键应该分配到哪个桶中，并将该键存储在相应的桶中；
当我们想要搜索一个键时，哈希表将使用相同的哈希函数来查找对应的桶，并只在特定的桶中进行搜索。</p>
<p>假设我们使用<code>y = x ％ 5</code>作为哈希函数。让我们使用这个例子来完成插入和搜索策略：</p>
<p align=center>
    <img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/09/06/screen-shot-2018-02-19-at-183537.png" width="60%">
</p>
<ul>
<li>插入：我们通过哈希函数解析键，将它们映射到相应的桶中。
<ul>
<li>例如，1987 分配给桶 2，而 24 分配给桶 4。</li>
</ul>
</li>
<li>搜索：我们通过相同的哈希函数解析键，并仅在特定存储桶中搜索。
<ul>
<li>如果我们搜索 1987，我们将使用相同的哈希函数将1987 映射到 2。因此我们在桶 2 中搜索，我们在那个桶中成功找到了 1987。</li>
</ul>
</li>
</ul>
<h4 id="_2-1-哈希函数" tabindex="-1"><a class="header-anchor" href="#_2-1-哈希函数" aria-hidden="true">#</a> 2.1 哈希函数</h4>
<p>哈希函数是哈希表中最重要的组件，该哈希表用于将键映射到特定的桶。在上一篇文章中的示例中，我们使用 y = x % 5 作为散列函数，其中 x 是键值，y 是分配的桶的索引。</p>
<p>依赖这个哈希函数，我们要存储<code>7</code>和<code>12</code>时，你会发现他们指向的索引都是<code>2</code>，我们当然希望索引指向的key是唯一的，但很难找到这样完美的函数。</p>
<p>我们将一个<strong>索引存储多个key</strong>或多<strong>个key指向一个索引</strong>这种情况，称为冲突。</p>
<p align=center>
    <img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/05/04/screen-shot-2018-05-04-at-145454.png" width="90%">
</p>
<h4 id="_2-2-冲突解决" tabindex="-1"><a class="header-anchor" href="#_2-2-冲突解决" aria-hidden="true">#</a> 2.2 冲突解决</h4>
<p>理想情况下，如果我们的哈希函数是完美的一对一映射，我们将不需要处理冲突。不幸的是，在大多数情况下，冲突几乎是不可避免的。</p>
<p>冲突解决算法应该解决以下几个问题：</p>
<ul>
<li>如何组织在同一个桶中的值？</li>
<li>如果为同一个桶分配了太多的值，该怎么办？</li>
<li>如何在特定的桶中搜索目标值？</li>
<li>根据我们的哈希函数，这些问题与桶的容量和可能映射到同一个桶的键的数目有关。</li>
</ul>
<p>让我们假设存储最大键数的桶有 N 个键。</p>
<ul>
<li>通常，如果 N 是常数且很小，我们可以简单地使用一个数组将键存储在同一个桶中。如果 N 是可变的或很大，我们可能需要使用高度平衡的二叉树来代替.。</li>
</ul>
<h2 id="三、设计哈希结构-不考虑冲突" tabindex="-1"><a class="header-anchor" href="#三、设计哈希结构-不考虑冲突" aria-hidden="true">#</a> 三、设计哈希结构（不考虑冲突）</h2>
<ul>
<li><code>add(value)</code>：向哈希集合中插入一个值。</li>
<li><code>contains(value)</code>：返回哈希集合中是否存在这个值。</li>
<li><code>remove(value)</code>：将给定值从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hashSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyHashSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
hashSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        
hashSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        
hashSet<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 返回 true</span>
hashSet<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 返回 false (未找到)</span>
hashSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          
hashSet<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 返回 true</span>
hashSet<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          
hashSet<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 返回  false (已经被删除)</span>

<span class="token doc-comment comment">/**
 * Initialize your data structure here.
 */</span>
<span class="token keyword">function</span> <span class="token function">ListNode</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> next <span class="token operator">=</span> <span class="token keyword">null</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">delListNode</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 新建一个头指针，是防止要删除的是head</span>
    <span class="token keyword">let</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>pre<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pre<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val <span class="token operator">===</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pre<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        pre <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">findInList</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>val <span class="token operator">===</span> val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token function-variable function">MyHashSet</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>mod <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">key</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token class-name">MyHashSet</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> index <span class="token operator">=</span> key <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mod<span class="token punctuation">;</span>
    <span class="token keyword">let</span> head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">key</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token class-name">MyHashSet</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">remove</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> index <span class="token operator">=</span> key <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mod<span class="token punctuation">;</span>
    <span class="token keyword">let</span> head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">delListNode</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token doc-comment comment">/**
 * Returns true if this set contains the specified element
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">key</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
 */</span>
<span class="token class-name">MyHashSet</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">contains</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> key <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mod<span class="token punctuation">;</span>
    <span class="token keyword">let</span> head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token function">findInList</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br></div></div></template>
