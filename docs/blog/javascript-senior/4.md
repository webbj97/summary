
# JavaScript专题（四）节流

## 前言

接着[《JavaScript专题进阶之防抖》]()，我们来聊一聊节流——另一个优化函数的思想。

我们还是以移动事件举例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #wrapper {
            width: 100%;
            height: 140px;

            background: rgba(0, 0, 0, 0.8);

            color: #fff;
            font-size: 30px;
            font-weight: bold;
            line-height: 140px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div id="wrapper"></div>

    <script>
        var count = 1;
        function moveAction () {
            oWrapper.innerHTML = count++;
        }

        var oWrapper = document.querySelector('#wrapper');
		oWrapper.onmousemove = moveAction;
    </script>
</body>

</html>
```

它的效果是这样：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200730101733705.gif)


## 一、核心和基本实现

节流的原理很简单：**如果你持续触发某个事件，特定的时间间隔内，只执行一次。**

**关于节流的实现，有两种主流的实现方式：**

1. 时间戳思路
2. 定时器思路


#### 1.1 时间戳思路

顾名思义，通过两个时间戳来控制时间间隔，当触发事件的时候：

1. 我们取出当前的时间戳 `now`；
2. 然后减去之前**执行时**的时间戳(首次值为 0 ) `prev`；
3. 如果大`now - prev > wait`，证明时间区间维护结束，执行指定事件，更新`prev`；

根据这一思路，我们就可以实现第一版代码了：

```js
oWrapper.onmousemove = throttle(moveAction, 1000);

function throttle(func, wait) {
    var _this, arg;
    var prev = 0; // 上一次触发的时间，第一次默认为0

    return function () {
        var now = Date.now(); // 触发时的时间
        _this = this;
        if (now - prev > wait) {
            func.apply(_this, arg); // 允许传入参数，并修正this
            prev = now; // 更新上一次触发的时间
        }
    }
}
```

来看看借助它，效果是什么样的：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020073118424074.gif)



我们可以看到：
1. 当鼠标移入的时候，**事件立刻执行**
2. 每过 1s 会执行一次，且移动2.5s会执行2次，意味着动作**停止后不会再执行**。


#### 1.2 定时器思路

利用定时器来保证间隔时间内事件的触发次数

1. 创建定时器`timer`，记录当前是否在**周期**内；
2. 判断定时器是否存在，若存在则直接结束，否则执行事件；
2. `wait`时间之后再次执行，并清掉定时器；


当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
```js
function throttle(func, wait) {
    var _this, arg;
    var timer; // 初始化
    return function () {
        _this = this; // 记录this
        arg = arguments; // 记录参数数组
        if (timer) return; // 时候未到
        timer = setTimeout(() => {
            func.apply(_this, arg); // 允许传入参数，并修正this
            timer = null;
        }, wait);
    }
}
```

来看看借助它，效果是什么样的：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200731184930157.gif)


但是，我们可以看到：

1. 当鼠标移入的时候，事件不会立刻执行;
2. 鼠标定制后`wait`间隔后会执行一次


#### 1.3 两种思路的区别


|  | 时间戳 | 定时器 |
| ---| --| -- |
| “起点” | 立即执行  | n 秒后执行|
| “终点” | 停止后不会执行 | 停止会再执行一次|


## 二、节流进阶

结合两种思想完成一个可以立即执行，且停止触发后再执行一次的节流方法：

```js
// 第三版
function throttle(func, wait) {
    var timeout, context, args;
    var previous = 0;

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(function(){
                previous = now;
                timeout = null;
                func.apply(context, args)
            }, remaining);
        }
    };
    return throttled;
}
```

效果演示如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200804192756351.gif)


我在看代码的时候，也是反复打印数据才理解为什么会这样做，一起加油～


## 参考

* [冴羽大大的Js系列](https://github.com/mqyqingfeng/Blog)
* [lodash.js](https://www.lodashjs.com/docs/lodash.debounce)

## 写在最后

**JavaScript系列：**

1. [《JavaScript内功进阶系列》（已完结）](https://blog.csdn.net/jbj6568839z/article/details/103161970)
2. [《JavaScript专项系列》（持续更新）](https://blog.csdn.net/jbj6568839z/category_10204368.html)

**关于我**

* 花名：余光（沉迷JS，虚心学习中）
* WX：j565017805

**其他沉淀**

* [Js版LeetCode题解](https://webbj97.github.io/leetCode-Js/)
* [前端进阶笔记](https://webbj97.github.io/summary/)
* [我的CSDN博客](https://yuguang.blog.csdn.net/)

如果您看到了最后，对文章有任何建议，都可以在评论区留言，如果真的对您有所帮助，也希望您能点个star，这是对我最大的鼓励！

<!-- 给这[GitHub，仓库传送门](https://github.com/webbj97/summary)点个star，这是对我最大的鼓励 -->

<p align=center>
	<img src="https://img-blog.csdnimg.cn/20200602155947301.png" width="60%"/>
</p>