<template><h1 id="_4-输入有序数组" tabindex="-1"><a class="header-anchor" href="#_4-输入有序数组" aria-hidden="true">#</a> 4.输入有序数组</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题目" tabindex="-1"><a class="header-anchor" href="#一、题目" aria-hidden="true">#</a> 一、题目</h2>
<p>给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。</p>
<p>函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。</p>
<p>返回的下标值（index1 和 index2）不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。</p>
<p><strong>示例:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>* 输入: numbers = [2, 7, 11, 15], target = 9
* 输出: [1,2]
* 解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="二、解法一-暴力循环" tabindex="-1"><a class="header-anchor" href="#二、解法一-暴力循环" aria-hidden="true">#</a> 二、解法一（暴力循环）</h2>
<ul>
<li>时间复杂度较高</li>
<li>由于是唯一值，所以找到第一个数，在它之后寻找第二数即可。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">num<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> len <span class="token operator">=</span> num<span class="token punctuation">.</span>length
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>num<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">+</span>num<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h5 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h5>
<p><img src="https://img-blog.csdnimg.cn/20191231102307415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="三、解法二-indexof" tabindex="-1"><a class="header-anchor" href="#三、解法二-indexof" aria-hidden="true">#</a> 三、解法二（indexOf）</h2>
<h5 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h5>
<ul>
<li>由题干得知一定会有一组解，那么就考虑用 和 - A = B</li>
<li>在数组之中查找B，并返回下标</li>
<li>indexOf这个API也是遍历数组，所以效率反而比双循环还差</li>
</ul>
<h5 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">num<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> len <span class="token operator">=</span> num<span class="token punctuation">.</span>length
    <span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> len<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">var</span> temp <span class="token operator">=</span> target <span class="token operator">-</span> num<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>num<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> num<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        i<span class="token operator">++</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h5 id="结果-1" tabindex="-1"><a class="header-anchor" href="#结果-1" aria-hidden="true">#</a> 结果</h5>
<p><img src="https://img-blog.csdnimg.cn/20191231103041771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="四、解法三-map" tabindex="-1"><a class="header-anchor" href="#四、解法三-map" aria-hidden="true">#</a> 四、解法三（Map）</h2>
<h5 id="思路-1" tabindex="-1"><a class="header-anchor" href="#思路-1" aria-hidden="true">#</a> 思路</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>x + y = target
y = target - x
x + (target - x) = target
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>时间优化明显，但是仍然没有利用上题干提供的信息——排序数组</li>
<li>时间复杂度：O(n)</li>
</ul>
<p>套入题目的例子，遍历数组，数组遍历的当前值为numbers[i]，那么 y 应该是 target - numbers[i]。
所以，只要在遍历的时候确定target - numbers[i]在数组里有，返回对应下标。</p>
<p>hash表方法有两次哈希表方法和一次哈希表方法。</p>
<p>两次hash表方法，在第一次迭代中，我们将每个元素的值和它的索引添加到表中。然后，在第二次迭代中，我们将检查每个元素所对应的目标元素（target−numbers[i]）是否存在于表中。</p>
<h5 id="代码-1" tabindex="-1"><a class="header-anchor" href="#代码-1" aria-hidden="true">#</a> 代码</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">numbers<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>target <span class="token operator">-</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target <span class="token operator">-</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>或者</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">num<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> num<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> temp <span class="token operator">=</span> target <span class="token operator">-</span> num<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>temp<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>obj<span class="token punctuation">[</span>temp<span class="token punctuation">]</span><span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        obj<span class="token punctuation">[</span>num<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h5 id="结果-2" tabindex="-1"><a class="header-anchor" href="#结果-2" aria-hidden="true">#</a> 结果</h5>
<p><img src="https://img-blog.csdnimg.cn/20191231104343568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="五、解法四-双指针" tabindex="-1"><a class="header-anchor" href="#五、解法四-双指针" aria-hidden="true">#</a> 五、解法四（双指针）</h2>
<h5 id="思路-2" tabindex="-1"><a class="header-anchor" href="#思路-2" aria-hidden="true">#</a> 思路</h5>
<ul>
<li>利用排序数组特点</li>
<li>减少遍历次数</li>
</ul>
<h5 id="代码-2" tabindex="-1"><a class="header-anchor" href="#代码-2" aria-hidden="true">#</a> 代码</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">num<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> left <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">var</span> right <span class="token operator">=</span> num<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> sum <span class="token operator">=</span> num<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">+</span> num<span class="token punctuation">[</span>right<span class="token punctuation">]</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>sum <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">[</span>left<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> right<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">></span> target<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//和>目标值，证明右边界大了，那就向左移</span>
            right<span class="token operator">--</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>sum <span class="token operator">&lt;</span> target<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//和&lt;目标值，证明左边界小了，那就向右移</span>
            left<span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h5 id="结果-3" tabindex="-1"><a class="header-anchor" href="#结果-3" aria-hidden="true">#</a> 结果</h5>
<p><img src="https://img-blog.csdnimg.cn/20191231114657490.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p>
<h2 id="六、解法五-二分法" tabindex="-1"><a class="header-anchor" href="#六、解法五-二分法" aria-hidden="true">#</a> 六、解法五（二分法）</h2>
<p><strong>思路：</strong></p>
<ol>
<li>将2个数字的问题，转换成确定1个数字，寻找第二位数字的问题</li>
<li>将问题转换成，排序数组内寻找指定元素</li>
<li>利用数组的有序性质，可以通过二分查找的方法寻找第二个数。</li>
<li>为了避免重复寻找，在寻找第二个数时，只在第一个数的右侧寻找。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">numbers<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 每一个循环先确定1位，利用二分法寻找指定的元素</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> left <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 这是因为</span>
        <span class="token keyword">let</span> right <span class="token operator">=</span> numbers<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> numbers<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">+</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>target <span class="token operator">></span> numbers<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">+</span> numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="七、写在最后" tabindex="-1"><a class="header-anchor" href="#七、写在最后" aria-hidden="true">#</a> 七、写在最后</h2>
<p>本文是二分查找-模版 II 的最后一题，接下来我们将面对更大的挑战，加油～</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励</p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷 JS，水平有限，虚心学习中</li>
</ul>
<p><strong>其他沉淀</strong></p>
<ul>
<li><a href="https://webbj97.github.io/leetCode-Js/" target="_blank" rel="noopener noreferrer">JavaScript 版 LeetCode 题解<OutboundLink/></a></li>
<li><a href="https://webbj97.github.io/summary/" target="_blank" rel="noopener noreferrer">前端进阶笔记<OutboundLink/></a></li>
<li><a href="https://yuguang.blog.csdn.net/" target="_blank" rel="noopener noreferrer">CSDN<OutboundLink/></a></li>
</ul>
<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/16075049324880/yuguang-csdn-bottom.gif" width="100%"/>
</p>
</template>
