<template><h1 id="二分法" tabindex="-1"><a class="header-anchor" href="#二分法" aria-hidden="true">#</a> 二分法</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>二分法又可以被称为二分查找，它描述了在有序集合中搜索特定值的过程。广义的二分查找是将问题的规模尽可能的缩小到原有的一半</p>
</div>
<p>对于二分法的思想大家都能讲出几句，但我们仍然很难讲其与实际应用完美的结合到一起，所以我们尽量汇总二分法的应用场景，和大家一起深入，共勉！</p>
<nav class="table-of-contents"><ul><li><RouterLink to="#一、常见问题">一、常见问题</RouterLink></li><li><RouterLink to="#二、二分查找中使用的术语">二、二分查找中使用的术语</RouterLink></li><li><RouterLink to="#三、模版-i-基础二分查找">三、模版 I - 基础二分查找</RouterLink></li><li><RouterLink to="#四、模版-ii-依赖当前元素与右元素的关系">四、模版 II - 依赖当前元素与右元素的关系</RouterLink></li><li><RouterLink to="#五、模板-iii-依赖当前元素与左右两个元素之间的关系">五、模板 III - 依赖当前元素与左右两个元素之间的关系</RouterLink></li><li><RouterLink to="#六、二分查找模板分析">六、二分查找模板分析</RouterLink></li><li><RouterLink to="#七、其他经典问题">七、其他经典问题</RouterLink></li><li><RouterLink to="#八、写在最后">八、写在最后</RouterLink></li></ul></nav>
<h2 id="一、常见问题" tabindex="-1"><a class="header-anchor" href="#一、常见问题" aria-hidden="true">#</a> 一、常见问题</h2>
<p>给定一个由数字组成的有序数组 <code>nums</code>，并给你一个数字 <code>target</code>。问 <code>nums</code> 中是否存在 <code>target</code>。如果存在，则返回其在 <code>nums</code> 中的索引。如果不存在，则返回 - 1。</p>
<p>这是二分查找中最简单的一种形式。当然二分查找也有很多的变形，这也是二分查找容易出错，难以掌握的原因。</p>
<p>常见变体有：</p>
<ul>
<li>如果存在多个满足条件的元素，返回最左边满足条件的索引。</li>
<li>如果存在多个满足条件的元素，返回最右边满足条件的索引。</li>
<li>数组不是整体有序的。 比如先升序再降序，或者先降序再升序。</li>
<li>将一维数组变成二维数组...等等</li>
</ul>
<h2 id="二、二分查找中使用的术语" tabindex="-1"><a class="header-anchor" href="#二、二分查找中使用的术语" aria-hidden="true">#</a> 二、二分查找中使用的术语</h2>
<p>如前所述，二分查找是一种在每次比较之后将查找空间一分为二的算法。每次需要查找集合中的索引或元素时，都应该考虑二分查找。如果集合是无序的，我们可以总是在应用二分查找之前先对其进行排序。但要注意排序的成本</p>
<ul>
<li><code>target</code>: 要查找的值</li>
<li><code>index</code>: 查找时的当前位置</li>
<li><code>left</code> 和 <code>right</code>: 左右指针</li>
<li><code>mid</code>: 左右指针的中点，用来确定我们应该向左查找还是向右查找的索引</li>
</ul>
<p>在最简单的形式中，二分查找对具有指定左索引和右索引的连续序列进行操作。这就是所谓的<strong>查找空间</strong>。二分查找维护查找空间的左、右和中间指示符，并比较查找目标或将查找条件应用于集合的中间值；如果条件不满足或值不相等，则清除目标不可能存在的那一半，并在剩下的一半上继续查找，直到成功为止。如果查以空的一半结束，则无法满足条件，并且无法找到目标。</p>
<p><strong>注意：</strong></p>
<ol>
<li>二分法搜索可以采用许多替代形式</li>
<li>可能并不总是直接搜索特定值</li>
<li>你不一定能直接缩小一半的查找范围</li>
<li>...</li>
</ol>
<p>看过之后的几个模版，并结合配套的例题，相信你会有自己的想法。</p>
<h2 id="三、模版-i-基础二分查找" tabindex="-1"><a class="header-anchor" href="#三、模版-i-基础二分查找" aria-hidden="true">#</a> 三、模版 I - 基础二分查找</h2>
<p>模版 I 是基础的二分查找，用于查找可以通过访问数组中的单个索引来确定的元素或条件。</p>
<h4 id="_3-1-复杂度分析" tabindex="-1"><a class="header-anchor" href="#_3-1-复杂度分析" aria-hidden="true">#</a> 3.1 复杂度分析</h4>
<ul>
<li>平均时间复杂度： <code>O(logN)</code></li>
<li>最坏时间复杂度： <code>O(logN)</code></li>
<li>最优时间复杂度： <code>O(1)</code></li>
</ul>
<h4 id="_3-2-关键点" tabindex="-1"><a class="header-anchor" href="#_3-2-关键点" aria-hidden="true">#</a> 3.2 关键点</h4>
<ul>
<li>二分查找的最基础和最基本的形式。</li>
<li>查找条件可以在不与元素的两侧进行比较的情况下确定（或使用它周围的特定元素）。</li>
<li>不需要后处理，因为每一步中，你都在检查是否找到了元素。如果到达末尾，则知道未找到该元素。</li>
</ul>
<h4 id="_3-3-区分语法" tabindex="-1"><a class="header-anchor" href="#_3-3-区分语法" aria-hidden="true">#</a> 3.3 区分语法</h4>
<ol>
<li>初始条件：</li>
</ol>
<ul>
<li><code>left = 0</code></li>
<li><code>right = arrar.length-1 或 number</code></li>
</ul>
<ol start="2">
<li>终止：<code>left &gt; right</code></li>
<li>向左查找：<code>right = mid-1</code></li>
<li>向右查找：<code>left = mid+1</code></li>
</ol>
<h4 id="_3-4-javascript-基础模版" tabindex="-1"><a class="header-anchor" href="#_3-4-javascript-基础模版" aria-hidden="true">#</a> 3.4 javascript 基础模版</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">search</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 初始左边界</span>
  right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 初始右边界</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//防止溢出</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 收缩左边界</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">></span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 收缩右边界</span>
      right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mid<span class="token punctuation">;</span> <span class="token comment">// 找到了当前值</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="_3-5-代码分析" tabindex="-1"><a class="header-anchor" href="#_3-5-代码分析" aria-hidden="true">#</a> 3.5 代码分析</h4>
<ol>
<li>确定初始的左右边界:
<ul>
<li><code>left</code>: 0</li>
<li><code>right</code>: nums.length-1</li>
<li><code>mid</code>: (left + (right - left) &gt;&gt; 1)</li>
</ul>
</li>
<li>如果中间元素值<code>nums[mid]</code> &lt; target：证明中间值左侧包括中间值都不符合要求，可以直接排除，<code>left = mid + 1</code></li>
<li>如果中间元素值<code>nums[mid]</code>：证明中间值右侧包括中间值都不符合要求，可以直接排除，<code>right = mid - 1</code></li>
<li>如果中间元素值<code>nums[mid]</code> = target：直接返回<code>mid</code>的下标</li>
<li>重新定义了左右边界，也需要重新计算中间值，我们需要继续进行范围的排除</li>
<li>定义搜索的条件，应该是搜索区间都不为空，即<code>left &lt;= right</code></li>
</ol>
<h4 id="_3-6-leetcode-实战" tabindex="-1"><a class="header-anchor" href="#_3-6-leetcode-实战" aria-hidden="true">#</a> 3.6 LeetCode 实战</h4>
<p>下面五题，难度递增，每篇题解都包含原题链接、模版分析、Js 题解，大家可以放心食用，我们一起加油～</p>
<ol>
<li><RouterLink to="/algorithm/dichotomy/1-1.html">二分查找（easy）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/1-2.html">搜索插入的位置（easy）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/1-3.html">x 的平方根（easy）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/1-4.html">猜数字大小（easy）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/1-5.html">搜索旋转排序数组（middle）</RouterLink></li>
</ol>
<h2 id="四、模版-ii-依赖当前元素与右元素的关系" tabindex="-1"><a class="header-anchor" href="#四、模版-ii-依赖当前元素与右元素的关系" aria-hidden="true">#</a> 四、模版 II - 依赖当前元素与右元素的关系</h2>
<p>模板 II 是二分查找的高级模板。它用于查找需要访问数组中当前索引及其直接右邻居索引的元素或条件。</p>
<h4 id="_4-1-关键点" tabindex="-1"><a class="header-anchor" href="#_4-1-关键点" aria-hidden="true">#</a> 4.1 关键点</h4>
<ul>
<li>查找条件需要访问元素的直接右邻居。</li>
<li>使用元素的右邻居来确定是否满足条件，并决定是向左还是向右。</li>
<li>保证查找空间在每一步中至少有 2 个元素。</li>
<li>需要进行后处理。 当你剩下 1 个元素时，循环 / 递归结束。 需要评估剩余元素是否符合条件。</li>
</ul>
<h4 id="_4-2-区分语法" tabindex="-1"><a class="header-anchor" href="#_4-2-区分语法" aria-hidden="true">#</a> 4.2 区分语法</h4>
<ul>
<li>初始条件：left = 0, right = length</li>
<li>终止：left == right</li>
<li>向左查找：right = mid 这是因为向右判断，一般需要保留比较元素，否则某些晴情况下会丢失数据</li>
<li>向右查找：left = mid+1</li>
</ul>
<h4 id="_4-3-javascript-基础模版" tabindex="-1"><a class="header-anchor" href="#_4-3-javascript-基础模版" aria-hidden="true">#</a> 4.3 javascript 基础模版</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">search</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 初始左边界</span>
  right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 初始右边界</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//防止溢出</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">==</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      right <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 继续寻找左侧是否仍存在满足条件的元素，但包含当前元素</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">!=</span> nums<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> left<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="_4-4-代码分析" tabindex="-1"><a class="header-anchor" href="#_4-4-代码分析" aria-hidden="true">#</a> 4.4 代码分析</h4>
<p>首先定义搜索区间为 [left, right]，注意是左右都闭合，之后会用到这个点。</p>
<ol>
<li>终止搜索条件为 left &lt;= right。</li>
<li>循环体内，我们不断计算 mid ，并将 nums[mid] 与 目标值比对。</li>
<li>如果 nums[mid] 等于目标值， 则收缩左边界，注意它此时不代表最终结果</li>
<li>如果 nums[mid] 小于目标值， 说明目标值在 mid 右侧，这个时候搜索区间可缩小为 [mid + 1, right]</li>
<li>如果 nums[mid] 大于目标值， 说明目标值在 mid 左侧，这个时候搜索区间可缩小为 [left, mid - 1]</li>
<li>最后我们要判断 left 值是否等于 target，如果不等于，证明没找到</li>
<li>如果 left 出了右边边界了，说明也没有找到</li>
</ol>
<h4 id="_4-5-leetcode-实战" tabindex="-1"><a class="header-anchor" href="#_4-5-leetcode-实战" aria-hidden="true">#</a> 4.5 LeetCode 实战</h4>
<p>下面 3 题，难度递增，每篇题解都包含原题链接、模版分析、Js 题解，大家可以放心食用，我们一起加油～</p>
<ol>
<li><RouterLink to="/algorithm/dichotomy/2-1.html">第一个错误的版本（easy）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/2-2.html">寻找峰值（middle）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/2-3.html">寻找旋转排序数组中的最小值（middle）</RouterLink></li>
</ol>
<h2 id="五、模板-iii-依赖当前元素与左右两个元素之间的关系" tabindex="-1"><a class="header-anchor" href="#五、模板-iii-依赖当前元素与左右两个元素之间的关系" aria-hidden="true">#</a> 五、模板 III - 依赖当前元素与左右两个元素之间的关系</h2>
<p>模板 III 是二分查找的另一种独特形式。它用于搜索需要访问当前索引及其在数组中的直接左右邻居索引的元素或条件。</p>
<h4 id="_5-1-关键点" tabindex="-1"><a class="header-anchor" href="#_5-1-关键点" aria-hidden="true">#</a> 5.1 关键点</h4>
<ul>
<li>实现二分查找的另一种方法。</li>
<li>搜索条件需要访问元素的直接左右邻居。</li>
<li>使用元素的邻居来确定它是向右还是向左。</li>
<li>保证查找空间在每个步骤中至少有 3 个元素。</li>
<li>需要进行后处理。当剩下 <code>2</code>个元素时，循环 / 递归结束。需要评估其余元素是否符合条件。</li>
</ul>
<h4 id="_5-2-区分语法" tabindex="-1"><a class="header-anchor" href="#_5-2-区分语法" aria-hidden="true">#</a> 5.2 区分语法</h4>
<ul>
<li>初始条件：<code>left = 0, right = length - 1</code></li>
<li>终止：<code>left + 1 === right</code></li>
<li>向左查找：<code>right = mid</code></li>
<li>向右查找：<code>left = mid</code></li>
</ul>
<h4 id="_5-3-javascript-基础模版" tabindex="-1"><a class="header-anchor" href="#_5-3-javascript-基础模版" aria-hidden="true">#</a> 5.3 javascript 基础模版</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> mid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      right <span class="token operator">=</span> mid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">==</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> left<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">==</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> right<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="_5-4-代码分析" tabindex="-1"><a class="header-anchor" href="#_5-4-代码分析" aria-hidden="true">#</a> 5.4 代码分析</h4>
<p>因为我们的判断区间最少为 2 个元素，所以我们要注意循环的执行条件</p>
<ol>
<li>简单的判断边界： <code>nums.length === 0，return -1</code>；</li>
<li>定义初始的左右边界：<code>left = 0, right = nums.length - 1</code>；</li>
<li>确定执行条件：<code>left + 1 &lt; right</code>，这也意味着查找区间要存在 3 个元素；</li>
<li>向左查找时：<code>right = mid</code>；</li>
<li>向左查找时：<code>left = mid</code>；</li>
<li>判断剩下的两个元素哪个符合目标元素，并返回结果；</li>
</ol>
<h4 id="_5-5-leetcode-实战" tabindex="-1"><a class="header-anchor" href="#_5-5-leetcode-实战" aria-hidden="true">#</a> 5.5 LeetCode 实战</h4>
<p>下面 3 题，难度递增，每篇题解都包含原题链接、模版分析、Js 题解，大家可以放心食用，我们一起加油～</p>
<ol>
<li><RouterLink to="/algorithm/dichotomy/3-1.html">在排序数组中查找元素的第一个和最后一个位置（hard）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/3-2.html">寻找峰值（middle）</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/3-3.html">寻找旋转排序数组中的最小值（middle）</RouterLink></li>
</ol>
<h2 id="六、二分查找模板分析" tabindex="-1"><a class="header-anchor" href="#六、二分查找模板分析" aria-hidden="true">#</a> 六、二分查找模板分析</h2>
<p>本小结引自于<a href="https://leetcode-cn.com/leetbook/read/binary-search/xewjg7/" target="_blank" rel="noopener noreferrer">LeetCode二分专题<OutboundLink/></a></p>
<p>上面提到的三个模版，大家在做题的时候很难完全套用进去，大部分时候，都是寻找最合适的方式并不断调整</p>
<h4 id="_6-1-模版差异" tabindex="-1"><a class="header-anchor" href="#_6-1-模版差异" aria-hidden="true">#</a> 6.1 模版差异</h4>
<p>这 3 个模板的不同之处在于：</p>
<p><img src="https://img-blog.csdnimg.cn/20201214095145794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述"></p>
<ul>
<li>左、中、右索引的分配。</li>
<li>循环或递归终止条件。</li>
<li>后处理的必要性。</li>
</ul>
<p>个人感觉模版I最实用（其实是另外两个模版掉头发啊！）</p>
<h4 id="_6-2-模版示例" tabindex="-1"><a class="header-anchor" href="#_6-2-模版示例" aria-hidden="true">#</a> 6.2 模版示例</h4>
<p><strong>模板I (left &lt;= right)</strong></p>
<p>二分查找的最基础和最基本的形式。</p>
<ul>
<li>查找条件可以在不与元素的两侧进行比较的情况下确定（或使用它周围的特定元素）。</li>
<li>不需要后处理，因为每一步中，你都在检查是否找到了元素。如果到达末尾，则知道未找到该元素。</li>
</ul>
<p><strong>模板II (left &lt; right)</strong></p>
<p>一种实现二分查找的高级方法。</p>
<ul>
<li>查找条件需要访问元素的直接右邻居。</li>
<li>使用元素的右邻居来确定是否满足条件，并决定是向左还是向右。</li>
<li>保证查找空间在每一步中至少有 2 个元素。</li>
<li>需要进行后处理。 当你剩下 1 个元素时，循环 / 递归结束。 需要评估剩余元素是否符合条件。</li>
</ul>
<p><strong>模板III (left + 1 &lt; right)</strong></p>
<p>实现二分查找的另一种方法。</p>
<ul>
<li>搜索条件需要访问元素的直接左右邻居。</li>
<li>使用元素的邻居来确定它是向右还是向左。</li>
<li>保证查找空间在每个步骤中至少有 3 个元素。</li>
<li>需要进行后处理。 当剩下 2 个元素时，循环 / 递归结束。 需要评估其余元素是否符合条件。</li>
</ul>
<h2 id="七、其他经典问题" tabindex="-1"><a class="header-anchor" href="#七、其他经典问题" aria-hidden="true">#</a> 七、其他经典问题</h2>
<ul>
<li><RouterLink to="/algorithm/dichotomy/4-1.html">pow(n, x)</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/4-2.html">有效的完全平方数</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/4-3.html">寻找比目标字母大的最小字母</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/4-4.html">统计有序矩阵中的负数</RouterLink></li>
<li><RouterLink to="/algorithm/dichotomy/4-5.html">矩阵中战斗力最弱的 K 行</RouterLink></li>
</ul>
<h2 id="八、写在最后" tabindex="-1"><a class="header-anchor" href="#八、写在最后" aria-hidden="true">#</a> 八、写在最后</h2>
<p>本文解释了三种最常见的解题模版，并附上LeetCode实战，帮助我们理解二分法这种思想。</p>
<p>如果对你有所帮助不妨给本项目的<a href="https://github.com/webbj97/summary" target="_blank" rel="noopener noreferrer">github 点个 star<OutboundLink/></a>，这是对我最大的鼓励</p>
<p><strong>关于我</strong></p>
<ul>
<li>花名：余光</li>
<li>WX：j565017805</li>
<li>沉迷 JS，水平有限，虚心学习中</li>
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
