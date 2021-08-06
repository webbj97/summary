<h1 align=center>电商静态页面有了这套完整淘宝静态布局，老师让我上台分享</h1>

> 作为一个前端开发，布局+样式已经成为了必备的技能，你做得好是应该的，做的不好可以原谅，但当你意识到不足时，补足它

> 这是我刚"入坑"的时候写的Demo，因为当时貌似很流行模仿淘宝、音乐类网站，毕竟他们本身展示的内容足够多，可以在一个页面内体现出许多东西，且难度适中，希望能帮到大家。

## 目录
* <a href="#1">优先阅读</a>
* <a href="#2">一、效果展示+基本布局结构分析</a>
* <a href="#3">二、基本布局结构代码+完整代码展示</a>
* <a href="#4">写在最后</a>


<h2 id="1">优先阅读</h2>

* 190920：第一次编辑 - 访问量一般
* 200619：貌似不少人还愿意研究一下，所以我给出下面的几个选项，大家可以参考：
    1. 我会通过标注的方式，将代码的布局展示出来，给大家提供参考，不至于看到一大块的代码无从下手；
* 201230：简单优化了部分代码
* 这里是另一个静态页面（小米官网）
	* 传送门[小米静态页面](https://blog.csdn.net/jbj6568839z/article/details/103462393)
---



#### 一、 仿淘宝官网页面（静态）最终效果图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201230173001552.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center)



[淘宝官网预览地址](https://webbj97.github.io/web-demo-bj/静态官网/淘宝首屏/index.html)

### html部分
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>淘宝网-淘！我喜欢</title>
    <link rel="stylesheet" href="./css/index.css">
</head>

<body>
    <div class="web-shop">
        <!-- 头部导航条 -->
        <div class="header">
            <div class="container">
                <ul class="nav">
                    <li>
                        <a href="javascript:;" class="arrow">中国大陆</a>
                    </li>
                    <li class="orange">
                        <a href="javascript:;">亲，请登录</a>
                    </li>
                    <li>
                        <a href="javascript:;">免费注册</a>
                    </li>
                    <li>
                        <a href="javascript:;">手机逛淘宝</a>
                    </li>
                </ul>
                <ul class="nav">
                    <li>
                        <a href="javascript:;" class="arrow">我的淘宝</a>
                    </li>
                    <li>
                        <a href="javascript:;" class="arrow">购物车</a>
                    </li>
                    <li>
                        <span class="start" class="arrow"></span>
                        <a href="javascript:;">收藏夹</a>
                    </li>
                    <li>
                        <a href="javascript:;" class="arrow">商品分类</a>
                    </li>
                    <li>
                        <a href="javascript:;" class="arrow">卖家中心</a>
                    </li>
                    <li>
                        <a href="javascript:;" class="arrow">联系客服</a>
                    </li>
                    <li>
                        <a href="javascript:;" class="arrow">网站导航</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="body-1">
            <!-- 搜索框 -->
            <div class="search">
                <div class="search-logo">
                    <a href="https://www.taobao.com/"></a>
                </div>
                <div class="search-box">
                    <ul class="search-tab">
                        <a href="javascript:;" class="choose1">淘宝</a>
                        <a href="javascript:;">天猫</a>
                        <a href="javascript:;">店铺</a>
                    </ul>
                    <form class="search-input">
                        <input class="box1" type="text" name="search">
                        <button class="btn" type="submit">搜索</button>
                    </form>

                    <div class="search-choose">
                        <a href="javascript:;">新款连衣裙</a>
                        <a href="javascript:;">四件套</a>
                        <a href="javascript:;" class="tx">潮流T恤</a>
                        <a href="javascript:;">时尚女鞋</a>
                        <a href="javascript:;">短裤</a>
                        <a href="javascript:;">半身裙</a>
                        <a href="javascript:;">男士外套</a>
                        <a href="javascript:;">墙纸</a>
                        <a href="javascript:;">新款男鞋</a>
                        <a href="javascript:;">耳机</a>
                    </div>
                </div>
                <div class="search-code">
                    <a href="javascript:;">
                        <img src="./img/jnh.png" alt="">
                    </a>
                </div>
            </div>
            <!-- 导航栏 -->
            <ul class="nav">
                <li class="left-nav">主题市场</li>
                <li class="li">天猫</li>
                <li class="li">聚划算</li>
                <li class="li">|</li>
                <li class="li">天猫商城</li>
                <li class="li">司法拍卖</li>
                <li class="li">淘宝心选</li>
                <li class="li">|</li>
                <li class="li">飞猪旅行</li>
                <li class="li">智能生活</li>
                <li class="li">苏宁易购</li>
            </ul>
            <!-- 内容区域 -->
            <div class="shop" id="">
                <!-- 左侧功能条 -->
                <ul class="left-items" id="left-items">
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>
                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">鞋靴</a> /
                        <a href="javascript:;">箱包</a> /
                        <a href="javascript:;">配件</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">童装</a> /
                        <a href="javascript:;">孕产</a> /
                        <a href="javascript:;">玩具</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <li class="left-items-li">
                        <a href="javascript:;">女装</a> /
                        <a href="javascript:;">男装</a> /
                        <a href="javascript:;">内衣</a>

                    </li>
                    <div class="left-items-content" id="left-items-content">

                    </div>
                </ul>
                <!-- 图片展示区 -->
                <div class="img-box">
                    <div>
                        <img src="./img/tu1.jpg" alt="">
                        <img src="./img/tu2.jpg" alt="">
                    </div>
                    <div>
                        <img src="./img/tu3.jpg" alt="">
                        <img src="./img/tu4.jpg" alt="">
                    </div>
                </div>
                <!--信息展示区-->
                <div class="tu-right">
                    <div class="right-icon">
                        <img src="./img/hi.png" alt="">
                    </div>
                    <div class="right-btn">
                        <a href="javascript:;">登录</a>
                        <a href="javascript:;">注册</a>
                        <a href="javascript:;">开店</a>
                    </div>
                    <div class="right-warn">网上有害信息举报专区</div>
                    <div class="right-info">
                        <ul class="info-top">
                            <li><a href="javascript:;">公告</a></li>
                            <li><a href="javascript:;">规则</a></li>
                            <li><a href="javascript:;">论坛</a></li>
                            <li><a href="javascript:;">安全</a></li>
                            <li><a href="javascript:;">公益</a></li>
                        </ul>
                        <ul class="info-bottom">
                            <li>公益阿里、腾讯等六家公司同台联合做公益</li>
                            <li>淘宝造物节之城市秘密、聚划算88红包省钱卡</li>
                        </ul>
                    </div>
                    <ul class="right-rechage">
                        <li><a class="icon icon-1" href="javascript:;"></a>
                            <p>充话费</p>
                        </li>
                        <li><a class="icon icon-2" href="javascript:;"></a>
                            <p>旅行</p>
                        </li>
                        <li><a class="icon icon-3" href="javascript:;"></a>
                            <p>车险</p>
                        </li>
                        <li><a class="icon icon-4" href="javascript:;"></a>
                            <p>游戏</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-1"></a>
                            <p>充话费</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-2"></a>
                            <p>旅行</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-3"></a>
                            <p>车险</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-4"></a>
                            <p>游戏</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-1"></a>
                            <p>充话费</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-2"></a>
                            <p>旅行</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-3"></a>
                            <p>车险</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-4"></a>
                            <p>游戏</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-1"></a>
                            <p>充话费</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-2"></a>
                            <p>旅行</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-3"></a>
                            <p>车险</p>
                        </li>
                        <li><a href="javascript:;" class="icon icon-4"></a>
                            <p>游戏</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="body-2">
            <div class="item">
                <div class="title">
                    <img src="./img/body-2-logo-1.jpg" alt="">
                    <span>与品质生活不期而遇</span>
                </div>
                <div class="content">
                    <div class="content-item">
                        <img src="./img/body-2-baby-1.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-2.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-3.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                </div>
                <div class="content">
                    <div class="content-item">
                        <img src="./img/body-2-baby-1.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-2.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-3.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="./img/body-2-logo-1.jpg" alt="">
                    <span>与品质生活不期而遇</span>
                </div>
                <div class="content">
                    <div class="content-item">
                        <img src="./img/body-2-baby-1.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-2.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-3.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                </div>
                <div class="content">
                    <div class="content-item">
                        <img src="./img/body-2-baby-1.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-2.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                    <div class="content-item">
                        <img src="./img/body-2-baby-3.png" alt="">
                        <p class="desc1">小狗图案不锈钢皂</p>
                        <p class="desc2">小狗图案不锈钢皂</p>
                        <p class="desc3">13673人说好</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="body-3">
            <h1 class="title-h1">
                <div class="icon"></div>热卖单品
            </h1>
            <div class="content">
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-1">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
                <div class="item">
                    <img src="./img/body-3-1.png" alt="">
                    <p class="desc-1">纯棉男女军绿色t恤2018新款宽松韩版初秋长</p>
                    <p class="desc-2">评价：17705 收藏：6875</p>
                    <p></p>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="item">
                <h2 class="title">消费者保证</h2>
                <div>
                    <span>保障范围</span>
                    <span>退货退款流程</span>
                    <span>服务中心</span>
                    <span>更多特色服务</span>
                </div>
            </div>
            <div class="item">
                <h2 class="title">消费者保证</h2>
                <div>
                    <span>保障范围</span>
                    <span>退货退款流程</span>
                    <span>服务中心</span>
                    <span>更多特色服务</span>
                </div>
            </div>
            <div class="item">
                <h2 class="title">消费者保证</h2>
                <div>
                    <span>保障范围</span>
                    <span>退货退款流程</span>
                    <span>服务中心</span>
                    <span>更多特色服务</span>
                </div>
            </div>
            <div class="item">
                <h2 class="title">消费者保证</h2>
                <div>
                    <span>保障范围</span>
                    <span>退货退款流程</span>
                    <span>服务中心</span>
                    <span>更多特色服务</span>
                </div>
            </div>
        </div>
    </div>


    <script src="./js/index.js"></script>
</body>

</html>
```

## CSS部分
```css

*{
    margin: 0px;
    padding: 0px;
    list-style: none;
    text-decoration: none;
    font-size: 13px;
    color:#6C6C6C;
    box-sizing: border-box;
    /* background: rgb(245, 238, 238) ; */
}
.tx{
    color: #f40;
}
.web-shop{
    min-width: 1170px;
    background: #f4f4f4;
}
/* 头部导航部分 */
.web-shop .header{
    width: 100%;
    background-color:#F5F5F5;
}
.web-shop .header .container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1168px;
    height: 35px;
    margin: 0 auto;
    line-height: 35px;
}
.web-shop .header .container .nav {
    display: flex;
}
.web-shop .header .container .nav li{
    padding: 0 14px;
    display: flex;
}
.web-shop .header .container .nav li a{
    position: relative;
    color:#6c6c6c;
    font-size: 12px;
    cursor: pointer;
}
.web-shop .header .container .nav li .arrow::after{
    content: '';
    position: absolute;
    right: -12px;
    top: 1px;
    width: 0px;
    height: 0px;
    margin-top: 15px;
    margin-left: 5px;
    border-top: 4px solid #aaa;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: 3px solid transparent;
}
.web-shop .header .container .nav .orange a{
    color:#f40;
}
.web-shop .header .container .nav a:hover{
    color:#f40;
    text-decoration: underline;
}

/* 内容区域 */
.web-shop .body-1{
    width: 1167px;
    margin: 0 auto;
}
/*输入框部分 */
.web-shop .body-1 .search{
    height: 121px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.web-shop .body-1 .search .search-logo{
    width: 180px;
    height: 100px;
    background: url(../img/taobao.gif) center center;
    cursor: pointer;
}
.body-1 .search .search-box{
    position: relative;
    padding-right: 30px;
}
.body-1 .search .search-box .search-tab{
    display: flex;
    position: absolute;
    left: 20px;
    background: #ff5400;
}
.body-1 .search .search-box .search-tab a{
    padding: 4px 10px;
    display: inline-block;
    color: #fff;

}
.body-1 .search .search-box .search-input{
    display: flex;
    height: 33px;
    padding-top: 26px
}
.body-1 .search .search-box .search-input input{
    height: 39px;
    width: 554px;
    border: 3px solid #ff5400;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.body-1 .search .search-box .search-input .btn{
    height: 39px;
    width: 56px;
    border: 3px solid #ff5400;
    background: #ff5400;
    color: #fff;
    border-left: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
.body-1 .search .search-box .search-choose{
    display: flex;
    justify-content: space-between;
    margin-top: 31px;
}
/* 导航栏 */
.body-1 .nav{
    display: flex;
    height: 30px;
    background-color: #ff8700;
    line-height: 30px;
}
.body-1 .nav .li{
    display: flex;
    height: 30px;
    padding: 0 15px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
}
.body-1 .nav .left-nav{
    width: 190px;
    text-align: center;
    font-size: 16px;
    background: #ff5000;
    color: #fff;
    line-height: 30px;
}

/* 列表框和图片区域 */
.body-1 .shop{
    display: flex;
    justify-content: space-between;
    height: 500px;
}
.body-1 .shop .left-items{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 190px;
    height: 100%;
    padding-top: 10px;
    border: 1px solid #ff5000;
    border-top: 0;
    box-sizing: border-box;
}
.body-1 .shop .left-items .left-items-li{
    text-align: center;
    padding: 8px 15px;
}
.body-1 .shop .left-items .left-items-li:hover{
    background: #ff4400;
    color: #fff;
}
.body-1 .shop .left-items .left-items-li:hover a{
    color: #fff;
}
.body-1 .shop .left-items .left-items-content{
    position: absolute;
    top: 0;
    left: 187px;
    display: none;
    width: 500px;
    height: 100%;
    background: rgba(0,0,0,0.8);
    color: #fff;
}
/* 图片区域--------------------------------------------------- */
.body-1 .shop .img-box{
    width: 700px;
    height: 500px;
    padding-top: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
}
/* 右区域 */
.body-1 .shop .tu-right{
    width: 275px;
    height: 495px;
    background-color: #fff;
    border: 1px solid #ff5000;
    border-top: 0;
}
.body-1 .shop .tu-right .icon-box{
    height: 97px;
    width: 100%;
    text-align: center;
}
.body-1 .shop .tu-right .right-icon img{
    width:273px;
    height:91px;
}
.body-1 .shop .tu-right .right-btn{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 25px;
    margin-top: 8px;
    margin-bottom: 20px;
}
.body-1 .shop .tu-right .right-btn a{
    display: inline-block;
    width: 75px;
    line-height: 25px;
    text-align: center;
    color: #FFF;
    background-color: #ff5000;
    border: 1px solid red;
    border-radius: 5px;
}
.body-1 .shop .tu-right .right-warn{
    width: 100%;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin: 0 auto;
    background-color: #ffe4dd;
}
.body-1 .shop .tu-right .right-info .info-top{
    display: flex;
    justify-content: space-around;
}
.body-1 .shop .tu-right .right-info .info-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
.body-1 .shop .tu-right .right-info .info-bottom li{
    font-size: 12px;
}
.body-1 .shop .tu-right .right-rechage{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.body-1 .shop .tu-right .right-rechage li{
    display: inline-block;
    width: 67.6px;
    padding: 3px;
    border: 1px solid #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}
.body-1 .shop .tu-right .right-rechage li .icon{
    display: inline-block;
    height: 36px;
    width: 40px;
}
.body-1 .shop .tu-right .right-rechage li .icon-1{
    background: url(../img/huafei.png) 50% 0 no-repeat;
}
.body-1 .shop .tu-right .right-rechage li .icon-2{
    background: url(../img/huafei.png) 50% -43px no-repeat;
}
.body-1 .shop .tu-right .right-rechage li .icon-3{
    background: url(../img/huafei.png) 50% -86px no-repeat;
}
.body-1 .shop .tu-right .right-rechage li .icon-4{
    background: url(../img/huafei.png) 50% -129px no-repeat;
}

.body-2{
    display: flex;
    justify-content: space-between;
    width: 1167px;
    margin: 10px auto 0;
}
.body-2 .item {
    width: 580px;
    padding: 13px;
    background: #fff;
}
.body-2 .item .title{
    display: flex;
    align-items: center;
}
.body-2 .item .title img{
    width: 75px;
    height: 30px;
    margin-right: 10px;
}
.body-2 .item .title span{
    color: #aaa;
}
.body-2 .item .content{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 5px;
}
.body-2 .item .content-item{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.body-2 .item .content-item img{
    width: 180px;
    height: 180px;
}
.body-2 .item .content-item .desc1{
    margin-top: 5px;
    font-size: 16px;
    line-height: 28px;
}
.body-2 .item .content-item .desc2{
    margin-top: 5px;
    font-size: 16px;
    line-height: 24px;
    color: #999;
}
.body-2 .item .content-item .desc3{
    line-height: 22px;
    margin-top: 12px;
    color: #35b1ff;
}

.body-3 {
    width: 1167px;
    margin: 10px auto 0;
    background: #fff;
}
.body-3 .title-h1{
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: orange;
    padding-left: 20px;
    border-bottom: 1px solid #f4f4f4;
}
.body-3 .title-h1 .icon{
    width: 4px;
    height: 14px;
    margin-right: 10px;
    background: orange;
}
.body-3 .content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.body-3 .content .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    padding: 12px;
    border: 1px solid #f4f4f4;

}
.body-3 .content .item:hover{
    border-color: #ff4400;
}
.body-3 .content .item img{
    width: 197px;
    height: 197px;
}
.body-3 .content .item p{
    width: 100%;
    margin-top: 5px;
}
.body-3 .content .item .desc-1{
    font-size: 16px;
    color: #aaa;
}
.body-3 .content .item .desc-2{
    font-size: 13px;
}

.footer {
    display: flex;
    justify-content: space-between;

    width: 1167px;
    margin: 0 auto;
}
.footer .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 241px;
    height: 300px;
}
.footer .item .title{
    font-size: 22px;
}
```

## Js部分
```js
var oNavContentData = [
    { title: '标题1', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题2', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题3', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题4', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题5', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题6', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题7', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题8', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题9', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题10', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题11', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题12', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题13', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
    { title: '标题14', list1: [1, 2, 3, 4, 5], list2: [1, 2, 3, 4, 5], list3: [1, 2, 3, 4, 5] },
]
var oNavItemBox = document.getElementById('left-items');
var oNavItemLi = document.querySelectorAll('.left-items-li'); //列表内容
var oNavContent = document.getElementById('left-items-content'); //内容区域

oNavItemLi.forEach((item, index) => {
    item.onmouseover = function(e) {
        oNavContent.style.display = 'block'
        oNavContent.innerText = oNavContentData[index].title
    }
    item.onmouseout = function(e) {
        oNavContent.style.display = 'none'
        oNavContent.innerText = ''
    }
});
```
### 代码下载
[github仓库下载](https://github.com/webbj97/web-demo-bj)
或加我WX（j565017805）联系我。

### github下载步骤（默认你已经安装了git）

### 第一步

### 第二步
在制定目录下，例如：我的Documents/gitbox文件夹下
windows => 进入git bash
mac => 终端 或 iterm
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190927144559874.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)
执行
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190920175413617.png)
红框部分替换成刚刚复制的链接

### 第三步
在编辑器上打开下载的文件，在浏览器上打开对应的 `.html` 文件。

---
该页面仅为静态页面，实现同一个效果的方式与很多种，希望能帮到大家～