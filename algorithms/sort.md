<img src="https://img-blog.csdnimg.cn/2020033114192346.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70"  width="100%"/>
<h1 align=center>最全排序算法总结看这一篇就够了</h1>

> 没有经过总结的知识是沉重的，无用的
##### 瞧一瞧～
* 博健的LeetCode题解：[Gitbook版本传送门](https://webbj97.github.io/leetCode-JavaScript-bj/)
* 博健的LeetCode题解：[CSDN传送门](https://blog.csdn.net/jbj6568839z/article/details/103808459)
* 有趣的CSS：[Gitbook传送门](https://webbj97.github.io/Interesting-CSS/)
* 前端进阶笔记：[Gitbook传送门](https://webbj97.github.io/summary/)
___
##### 目录

* <a href="#1">一、冒泡排序</a>
* <a href="#2">二、选择排序</a>
* <a href="#3">三、插入排序</a>
* <a href="#4">四、希尔排序</a>
* <a href="#5">五、归并排序</a>
* <a href="#6">六、快速排序</a>

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401172201937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

<h2 id="1">一、冒泡排序（BubbleSort）</h2>

#### 描述：
 就像气泡在水中上浮一样，两个数比较大小，较大的数下沉，较小的数冒起来。

#### 过程：

* 比较相邻的两个数据，如果第二个数小，就交换位置。
* 从后向前两两比较，一直到比较最前两个数据。最终最小数被交换到起始的位置，这样第一个最小数的位置就排好了。
* 继续重复上述过程，依次将第2.3...n-1个最小数排好位置。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401095658345.gif)

**平均时间复杂度: O(n2)**

**代码:**
```js
var sortArray = function(nums) {
    var swap = function (i, j) {
        var temp = 0
        temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }
    for(let i = 0;i < nums.length; i++){
        for(let j = 0;j < nums.length; j++){
            if(nums[i] < nums[j]){
                swap(i, j)
            }
        }
    }
    return nums
};
```


**优化：**
* 每一轮遍历，都会确定一个最大的数，及下一轮遍历的边界可以`-1`


<h2 id="2">二、选择排序(SelctionSort)</h2>

**思路**
* 在长度为`len`的无序数组中，第一次遍历`len-1`个数，找到最小的数值与第一个元素交换；
* 第二次遍历`len-2`个数，找到最小的数值与第二个元素交换；
.
.
* 第n-1次遍历，找到最小的数值与第len-1个元素交换，排序完成。

**平均时间复杂度：O(n2)**

**代码：**
```js
var selectSort = function(nums) {
    var temp = 0
    for (let i = 0; i < nums.length - 1; i++) {
        var min = i
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[min] > nums[j]) {
                min = j
            }
        }
        if (min !== i) {
            temp = nums[i]
            nums[i] = nums[min]
            nums[min] = temp
        }

    }
    return nums
}
图解
```
**Leetcode结果：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020040111144333.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

<h2 id="3">三、插入排序（insertSort）</h2>

**前言：**

数据序列1： `13-17-20-42-28` 利用插入排序，`13-17-20-28-42.` Number of swap:1;
数据序列2： `13-17-20-42-14` 利用插入排序，`13-14-17-20-42.` Number of swap:3;
如果数据序列基本有序，使用插入排序会更加高效。

**基本思想：**
* 在要排序的一组数中，假定前n-1个数已经排好序，现在将第n个数插到前面的有序数列中，使得这n个数也是排好顺序的。如此反复循环，直到全部排好顺序。

**过程：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401152851402.gif)
**代码：**
```js
var sortArray = function(nums) {
    var temp = 0
    for(let i = 0; i < nums.length-1; i++){
        for(let j = i+1; j >=0; j--){
            if(nums[j] < nums[j-1]){
                temp = nums[j-1]
                nums[j-1] = nums[j]
                nums[j] = temp
            }
        }
    }
    return nums
};
```
**leetCode结果：** 很遗憾经常超时。。。

<h2 id="4">四、希尔排序</h2>

**基本思想：**
* 在要排序的一组数中，根据某一增量分为若干子序列，并对子序列分别进行插入排序。
* 然后逐渐将增量减小,并重复上述过程。直至增量为1,此时数据序列基本有序,最后进行插入排序。

**代码：**
```js
function sortArray(nums) {
    var N = nums.length;
    var h = 1;
    while (h < N / 3) {
        h = 3 * h + 1; //设置间隔
    }
    while (h >= 1) {
        for (var i = h; i < N; i++) {
            for (j = i; j >= h && nums[j] < nums[j - h]; j -= h) {
                swap(nums, j, j - h);
            }
        }
        h = (h - 1) / 3;
    }
    return nums
}

function swap(array, i, j) { //两个数调换
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}
```

**LeetCode结果：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401153739887.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

<h2 id="5">五、归并排序</h2>

**基本思想：**

* 归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法的一个非常典型的应用。
* 首先考虑下如何将2个有序数列合并。这个非常简单，只要从比较2个数列的第一个数，谁小就先取谁，取了后就在对应数列中删除这个数。然后再进行比较，如果有数列为空，那直接将另一个数列的数据依次取出即可。
* 典型的双“指针”思想就可以实现

**先实现第一点，将两个已经排序的数组合并** [合并已经排序的数组-题解传送门](https://blog.csdn.net/jbj6568839z/article/details/105074562)
```js
var merge = function(A, m, B, n) {
// m = A.length  n = B.length
    var a = 0, b = 0;
    var arr = []
    while(a < m || b < n){
        if(a === m){
            arr.push(B[b++])
        }else if(b === n){
            arr.push(A[a++])
        }else if(A[a] < B[b]){
            arr.push(A[a++])
        }else{
            arr.push(B[b++])
        }
    }
};
```
之后就讲一个数组拆分为2、4、6，直至每个数组的元素个数为1，再进行两两合并


**过程：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401160527506.gif)

**平均时间复杂度：O(NlogN)**

* 归并排序的效率是比较高的，设数列长为N，将数列分开成小数列一共要logN步，每步都是一个合并有序数列的过程，时间复杂度可以记为O(N)，故一共为O(N*logN)。

**代码：**
```js
// 融合两个有序数组，这里实际上是将数组 arr 分为两个数组
function mergeArray(arr, first, mid, last, temp) {
  let i = first;
  let m = mid;
  let j = mid+1;
  let n = last;
  let k = 0;
  while(i<=m && j<=n) {
    if(arr[i] < arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  while(i<=m) {
    temp[k++] = arr[i++];
  }
  while(j<=n) {
    temp[k++] = arr[j++];
  }
  for(let l=0; l<k; l++) {
    arr[first+l] = temp[l];
  }
  return arr;
}
// 递归实现归并排序
function mergeSort(arr, first, last, temp) {
  if(first<last) {
    let mid = Math.floor((first+last)/2);
    mergeSort(arr, first, mid, temp);    // 左子数组有序
    mergeSort(arr, mid+1, last, temp);   // 右子数组有序
    arr = mergeArray(arr, first, mid, last, temp);
  }
  return arr;
}

// example
let arr = [10, 3, 1, 5, 11, 2, 0, 6, 3];
let temp = new Array();
let SortedArr = mergeSort(arr, 0 ,arr.length-1, temp);
alert(SortedArr);
```

<h2 id="6">六、快速排序（quickSort）</h2>

**基本思想：（分治）**

* 先从数列中取出一个数作为key值；
* 将比这个数小的数全部放在它的左边，大于或等于它的数全部放在它的右边；
* 对左右两个小数列重复第二步，直至各区间只有1个数。

**代码：**

```js
var sortArray = function(arr) {
    let pivot = arr[0]
    let left = []
    let right = []

    if (arr.length < 2) return arr

    for (let i = 1; i < arr.length; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
    }

    return sortArray(left).concat([pivot], sortArray(right))
};
```

参考阮一峰大佬的版本

```js
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var mid = arr.length>>1
　　var pivot = arr.splice(mid, 1)[0];
　　var left = [];
　　var right = [];

　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
```

**leetCode结果：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200401165050690.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

未完待续...