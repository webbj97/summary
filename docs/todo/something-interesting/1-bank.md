# 【整活系列】我从CSDN排行榜上发现了惊人的秘密，快进来看看吧～

> 本篇文章尽量不使用的晦涩复杂的技术手段，仅仅利用简单的前端知识和相关api，配合浏览器获得我们想要的数据，进行分析
> 希望本篇文章可以让技术大佬会心一笑，回想自己当年是否也会有类似的的“奇葩”研究呢吧
> 也许这篇文章会勾起你当初从事技术工作时最纯粹的初衷

<img src="https://img-blog.csdnimg.cn/2021060119285815.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" width="80%">


## 一、前言

CSDN是我大学时接触的第一个技术社区，最近它增加了排行榜板块，里面细分了十几个分类，从互动、点赞、评论、收藏、时间纬度计算得到每篇文章的热度，将他们投放到对应的分类，最终汇聚成分类榜单和综合榜单。

社区在大力的鼓励大家进行技术分享和沉淀，以推动整个技术圈的发展。本篇文章也是因为我在浏览排行榜时的一个念头而诞生的，那就是我想从用户的视角：

* 统计各个榜单的文章标题+作者+所在榜单
* 将汇总的榜单数据整合，并做出一份新的“综合领域榜单”
* 统计综合领域榜单，看看各个单榜的“强弱”

用互联网黑话应该是这样的：

1. 在细分领域找到抓抓手
2. 形成方法论，才能对外输出
3. 分析自己的痛点，做精细化运营


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601193245281.jpg#pic_center)

## 二、开始行动

> 下面的代码都可以直接运行在浏览器控制台中，且我们尽量从用户的操作出发，避免给整个实现增加难度。

### 2.1 一条榜单内容我能得到什么

**思路：**

1. 选中单条内容
2. 获取内容内的标题、作者、热度

**代码：**

```js
// 选中单条内容
const hotRankItem = document.querySelector('.hostitem');
// 获取标题
hotRankItem.querySelector('a.title').innerText;
// 获取作者
hotRankItem.querySelector('a.name').innerText;
// 获取热度
hotRankItem.querySelector('span.num').innerText;
```

**结果：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601165631471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

### 2.2 获取一个榜单完整的数据

**思路：**

1. 获取内容列表，并转换成数组
2. 遍历获取所需内容，并返回数组

**代码：**

```js
function getData() {
    const likeArray = (arr) => Array.prototype.slice.call(arr)
    // 获取列表数组
    const hotRankList = likeArray(document.querySelectorAll('.hostitem'));
    // 处理榜单内所有数据
    const newHotRankList = hotRankList.map((element, index) => {
        const title = element.querySelector('a.title').innerText;
        const name = element.querySelector('a.name').innerText;
        const hot = element.querySelector('span.num').innerText;
        return {title, name, hot}
    })
    return newHotRankList;
}

getData()
```

**结果：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601170116422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

* 注意

经常浏览排行榜的小伙伴可能意识到了，出于性能和体验的考虑，只有用户划到页面底部，才会更新排行榜单后续的内容，每次新增25条。所以我们也想一个真正的用户一样，让代码帮我们阅读好啦～

### 2.3 模拟用户滑动获取完整榜单

**思路：**

1. 借助`window.scrollTo(x, y)`可把内容滚动到指定的坐标。
2. 已知每次显示25条数据，单榜共50条数据，综合榜共100条数据
3. 利用回调来确定处理数据的时机

**代码：**

```js
function getData() {
    const likeArray = (arr) => Array.prototype.slice.call(arr)
    // 获取列表数组
    const hotRankList = likeArray(document.querySelectorAll('.hostitem'));
    // 处理榜单内所有数据
    const newHotRankList = hotRankList.map((element, index) => {
        const title = element.querySelector('a.title').innerText;
        const name = element.querySelector('a.name').innerText;
        const hot = element.querySelector('span.num').innerText;
        return {title, name, hot}
    })
    return newHotRankList;
}

function getComData(){
    let mainHeight = 0; // 内容高度
    let timer = setInterval(() => {
        let height = document.querySelector('.main').offsetHeight
        if (mainHeight === height) {
            const res = getData();
            console.log(res)
            clearInterval(timer);
        } else {
            mainHeight = height
            window.scrollTo({
                top: 100000,
                behavior: "smooth"
            })
        }
    }, 1000)
}

getComData();
```

**结果：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601172136985.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

### 2.4 获取所有领域内容榜的数据
> 之后的所有示例，默认先执行本小节的代码

同样，如果我是用户且我想看过所有的榜单，我的操作应该是这样的

1. 浏览C/C++榜单，划至底部（阅读完毕）
2. 点击Java分类，继续步骤1->步骤2
3. 注意：此时用获取完整列表的方法使用了Promise

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601172348287.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

**思路：**

1. 循环模拟用户点击
2. 进入新的榜单，重复2.3小节的操作
3. 将所有的榜单的结果汇总，并获取榜单名称用于区分

```js
const likeArray = (arr) => Array.prototype.slice.call(arr)
function getData() {
    // 获取列表数组
    const hotRankList = likeArray(document.querySelectorAll('.hostitem'));
    const curBlogRankName = document.querySelector('.blog-rank-right-top li.active').innerText;
    console.log(`正在拉去${curBlogRankName}榜单数据`)
    // 处理榜单内所有数据
    const newHotRankList = hotRankList.map((element, index) => {
        const title = element.querySelector('a.title').innerText;
        const name = element.querySelector('a.name').innerText;
        const hot = element.querySelector('span.num').innerText;
        return {title, name, hot, curBlogRankName}
    })
    return newHotRankList
}

function getComData(){
    let mainHeight = 0; // 内容高度
    return new Promise((resolve, reject)=>{
        let timer = setInterval(() => {
            let height = document.querySelector('.main').offsetHeight
            if (mainHeight === height) {
                const res = getData();
                resolve(res);
                clearInterval(timer);
            } else {
                mainHeight = height;
                window.scrollTo({
                    top: 100000,
                    behavior: "smooth"
                })
            }
        }, 1000)
    })
}


// 获取列表榜单
async function loopNav(curList) {
    const result = {}
    let i = 0;
    const navList = likeArray(document.querySelectorAll('.blog-rank-right-top ul li'));
    for(let i = 0; i < navList.length; i++){
        navList[i].click();
        const res = await getComData();
        result[navList[i].innerText] = res;
    }
    console.log('榜单结果汇总：', result)
    window.rankResult = result; // 将结果挂到window对象上
}

loopNav();
```

**结果：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601175716735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

### 2.5 获取单个榜单数据集合

如果大家想要获取某个榜单内容：

例如：在[CSDN全站综合热榜](https://blog.csdn.net/rank/list)，打开控制台，执行2.3小节的代码

<img  src="https://img-blog.csdnimg.cn/20210601180103452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70" width="100%" />

就可以的得到数组类型的数据。

<img src="https://img-blog.csdnimg.cn/20210601193805138.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center" width="50%" />



## 三、拿到数据开始整活

我们拿到的数据应该是这样是：

```js
集合：{
    榜单1：[
        {文章1}， {文章1}，
    ],
    榜单1：[
        {文章1}， {文章1}，
    ]
}
```

按照第一章的思路，我们还要继续进行处理。

### 3.1 热度最高的前100名单

> 有人可能会问，会什么不直接看综合热榜，这是因为单榜和热榜更新时间不同，其实任选其一往深研究即可。

**思路：**

1. 所有榜单合并
2. 按热度排序
3. 截取前100名

**代码：**

```js
window.rankResult100 = Object.keys(rankResult)
    .reduce((prev, next) => prev.concat(rankResult[next]), [])
    .sort((a, b) => b.hot - a.hot)
    .slice(0, 100)
console.log('热度前100名（每日更新）:', window.rankResult100)
```

**结果：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601182954642.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

emmm 可以看到，**此时**排在第一的是运维榜单-程序猿是小贺大佬的文章。

### 3.2 统计前100名中出现的领域模块

> 实现此需求的方式有很多，不要纠结方式～

**代码：**

```js
window.rankResult100 = Object.keys(rankResult)
    .reduce((prev, next) => prev.concat(rankResult[next]), [])
    .sort((a, b) => b.hot - a.hot)
    .slice(0, 100)
console.log('热度前100名（每日更新）:', window.rankResult100)

// 统计榜单进去前100的数量
window.rankResultGroup = {};
// 获取榜单名称并生成Key
const navList = Array.prototype.slice.call(document.querySelectorAll('.blog-rank-right-top li'))
    .map(item => item.innerText)
    .forEach(item => window.rankResultGroup[item] = 0)
// 统计数量
window.rankResult100.forEach(item => window.rankResultGroup[item.curBlogRankName]++);
console.log('各榜单拥有前100数量:', window.rankResultGroup);
```

**结果：**


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601185152762.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

### 3.3 榜单“分析”结论——模块排名占有率高 和 语言使用率存在一定关系
> 怎么看，都像一句废话

使用的人多：

* 遇到的问题就多
* 解决问题的人就多
* 技术沉淀就多

虽然我不是专业做数据分析的，但在知乎随便翻了一下编程语言热度排行，在TIOBE 公布的 `2020年9月的编程语言排行榜`，可以看到前三名是 C、Java 和 Python，如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601191606932.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

对比我们最后得到的结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021060119183656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

嗯~相差不大。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601195305965.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)



### 3.4 小结

截止到此时，**我们完成了：**

1. 获取榜单数据
2. 整合榜单数据
3. 统计若干排名的文章
4. 统计单榜选手在综合榜100名内的数量
5. 简单的分析（虚心接受指教）

而这也让我对 `click`、`dom操作`、`数组操作`等加深了印象，希望读到这里的同学也能有所收获～

之后还能怎么做？我期待大家也能参与进来，和我和或其他人进行自己领域内的互动，例如：

1. 生成二维、三维的数据模型；
2. 分析上榜作者的粉丝数量，进一步得到对自己有用的信息；
3. 获取榜单文章的发布时间，统计大佬们的发布时间规律
4. ......

也许一条隐密的捷径就在你感兴趣、你正在探索的事情中，加油！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601194947131.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)


## 四、写在最后

读到这里的同学不妨做件小事，给我的[GitHub仓库](https://github.com/webbj97/summary)点个star吧！Thanks♪(･ω･)ﾉ

**关于我**

- 花名：余光
- WX：j565017805
- 邮箱：webbj97@163.com

**其他沉淀**

- [Github: Js 版 LeetCode 题解](https://webbj97.github.io/leetCode-Js/)
- [前端进阶笔记](https://webbj97.github.io/summary/)
- [CSDN 博客汇总](https://yuguang.blog.csdn.net/)

<p align=center>
	<img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif" width="100%"/>
</p>
