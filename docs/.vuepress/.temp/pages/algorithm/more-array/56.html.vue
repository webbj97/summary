<template><h1 id="合并区间" tabindex="-1"><a class="header-anchor" href="#合并区间" aria-hidden="true">#</a> 合并区间</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>更好的阅读体验应该是：</p>
<ol>
<li>审题-思考</li>
<li>答题</li>
<li>整理-归纳</li>
</ol>
</div>
<h2 id="一、题解" tabindex="-1"><a class="header-anchor" href="#一、题解" aria-hidden="true">#</a> 一、题解</h2>
<p>给出一个区间的集合，请合并所有重叠的区间。</p>
<p><strong>示例：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>提示：</strong></p>
<p>intervals[i][0] &lt;= intervals[i][1]</p>
<h2 id="二、题解" tabindex="-1"><a class="header-anchor" href="#二、题解" aria-hidden="true">#</a> 二、题解</h2>
<h4 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h4>
<ul>
<li>查看<code>第 i 行的尾</code>与<code>第 i+1 行的首</code>的相对关系</li>
</ul>
</template>
