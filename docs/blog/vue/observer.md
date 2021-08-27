
# 数据监听（响应式）

<img align=center src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1618455130682571/logo.png">

> 了解Vue中如何实现数据的响应式系统，从而达到数据驱动视图。


## 一、数据驱动视图？

大胆的一句话概括：视图因为它依赖的数据的变化二变化，即：

<font color="red">UI = render(state)</font>

* state(状态)：输入数据
* UI(页面)：输出视图
* render(驱动)：由Vue扮演，当Vue发现state变化之后，经过一系列加工，最终将变化反应在UI上

那么第一个问题来了，Vue怎么知道state变化了呢？

## 二、数据检测（Vue 2.x）

从上帝视角来讲，我们知道了整个双向绑定是通过`发布订阅+数据代理（劫持）`的方式实现的，即：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210415114123657.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)


`Object.defineProperty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

### 2.1 了解Object.defineProperty

**语法：**

```js
Object.defineProperty(obj, prop, descriptor)
```

**参数说明：**

* obj：必需。目标对象
* prop：必需。需定义或修改的属性的名字
* descriptor：必需。目标属性所拥有的特性

同时它提供了`get`和`set`两个方法以方便我们查看该属性的“操作日志”

**基本使用：**

```js
let a = {};
let val = null
Object.defineProperty(a, 'name', {
    enumerable: true,
    configurable: true,
    get() {
        console.log('a的name属性被获取了:', val);
        return val;
    },
    set(newVal) {
        console.log('a的name属性被修改了:', newVal);
        val = newVal;
    }
})
console.log('a:', a.name);
a.name = 100
```

通过这样的手段，我们可以做到：

1. 知道指定属性被`获取`
2. 知道指定属性被`更新`

介于我们拥有这两种能力，我们可以做一个最简单的双向绑定。

### 2.2 一个极简的双向绑定

**目标：**

input输入框输入内容，同步更新到p标签内

**思路：**

1. 监测：定义obj变量，并指定“劫持”obj.text属性
2. 更新：input监听键盘事件，输入内容时，实时修改obj.text属性
3. 通知：触发属性set方法，通知p标签进行内容更新

**实现：**

```html
<input type="text" id="input">
<p id="text"></p>

<script>
    const oInput = document.getElementById('input');
    const oText = document.getElementById('text');
    var obj = {}; // 定义变量
    // 监测
    Object.defineProperty(obj, 'text', {
        get(e){
            console.log(e)
        },
        set(newValue){
            // 通知
            oText.innerHTML = newValue;
        }
    })
    // 更新
    oInput.onkeyup = function(e){
        obj.text = e.target.value;
    }
</script>
```

**图解：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210415135927101.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

看了上面的demo，大家应该会有很多想法，这里面存在诸多的不方便，比如需要提前知道劫持哪个属性，通知哪个对象等等，下一结我们继续强大这个demo。

## 三、基于数据劫持的基本实现

简单了解过后，我们很快会发现，2.2中所谓的双向绑定貌似并没有实用价值，至少需要我们将发布订阅应用进来。

### 3.1 实现思路

1. 利用`Proxy`或`Object.defineProperty`生成的Observer针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者
2. 解析器Compile解析模板中的Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染
3. Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化

**解决问题：**

1. Observer：灵活的劫持（代理）数据的变动
2. Dep：依赖管理器，负责收益收集对数据的所有依赖（订阅者），并且在特定的时候通知所有订阅者数据已变动
3. Watcher：订阅者，负责接受变化，更新视图

于是我们有了下图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210415144032236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

### 3.2 依赖管理器——Dep

所以我们需要创建依赖管理器，负责：

1. 收集依赖：谁依赖了这个数据，就收集起来，即Getter时
2. 通知更新：什么时候数据变动了，就出发通知依赖者，即Setter时

总结一句话就是：在`getter`中收集依赖，在`setter`中通知依赖更新。

因此，我们给每个都建立一个依赖管理器，把这个数据所有的依赖都管理起来：

```js
// 依赖管理器
let uid = 0;
class Dep {
    constructor() {
        this.id = uid++; // 作为标识区分
        this.subs = []; // 谁依赖的这个数据，就保存进来，方便通知
    }
    // 添加依赖方法
    addSub(sub) {
        this.subs.push(sub)
    }
    // 触发添加
    depend() {
        // 为什么要这样操作？我们下一小结介绍
        // 暂时理解为，我们获得订阅者的方法
        if(Dep.target){
            Dep.target.addDep(this) // 添加依赖管理器
        }
    }
    // 通知所有的依赖更新
    notify() {
        const subs = this.subs.slice();
        // 在这里我们触发更新
        subs.forEach(sub => sub.update())
    }
}
// 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
// 这里我有看到利用window.target来保存临时watcher的，是两者均可还是另有玄机不知道有没有大佬解惑
Dep.target = null; // 初始化为null
```


### 3.3 监听者——Observer

在这里我们希望可以劫持数据的变化，并通知依赖管理器

```js
// 监听类
class Observer {
    constructor(value) {
        this.value = value;
        if (Array.isArray(value)) {

        } else {
            this.walk(value)
        }
    }
    walk(value) {
        const keys = Object.keys(value);
        keys.forEach(key => {
            this.convert(key, value[key])
        });

    }
    convert(key, val) {
        defineReactive(this.value, key, val)
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    // 给子元素添加监听
    let chlidOb = observe(val);
    Object.defineProperty(obj, key, {
        get() {
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            if (Dep.darget) {
                dep.depend();
            }
            console.log('获取')
            return val;
        },
        set(newValue) {
            if (val === newValue) {
                return;
            }
            console.log('修改')
            val = newValue;
            chlidOb = observe(newValue);
            // 通过依赖管理器，通知所有订阅者更新
            dep.notify();
        }
    })
}
// 添加监听
function observe(value) {
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}
```

可以加上下面的测试代码查看console效果

```js
const obj = new Observer({
    name: '余光',
    age: '24'
})
obj.value.name // name属性被读获取了
obj.value.name = 100; // name属性被修改了
```

### 3.4 订阅者——watcher

`Watcher类`的实例就是:

1. 谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例;
2. 在之后数据变化时，我们不直接去通知依赖更新，而是通知依赖对应的Watch实例;
3. 再由Watcher实例去通知真正的视图。

```js
// 实现一个订阅者，即“依赖”者
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
        this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
        this.cb = cb; // 当数据更新时想要做的事情
        this.expOrFn = expOrFn; // 被订阅的数据，数据key || 路径
        this.val = this.get(); // 维护更新之前的数据
    }
    // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
    update() {
        this.run();
    }
    addDep(dep) {
        // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
        // 此判断是避免同id的Watcher被多次储存
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
    run() {
        // 执行一次get方法
        const val = this.get();
        console.log(val);
        if (val !== this.val) {
            this.val = val;
            //
            this.cb.call(this.vm, val);
        }
    }
    get() {
        // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
        Dep.target = this; // 赋值给Dep.target
        // 这段代码需要结合上下文，含义是主动触发get，将该订阅者添加到依赖管理器中
        const val = this.vm._data[this.expOrFn]; // 主动触发
        // 置空，用于下一个Watcher使用
        Dep.target = null;
        return val;
    }
}
```

**分析**

当实例化`Watcher`类时：

1. 会先执行其构造函数：
2. 在构造函数中调用了`this.get()`实例方法；
    - 2.1 首先通过`Dep.target = this`(把自身赋给了全局一个唯一对象Dep.target上)；
    - 2.2 然后通过`this.vm._data[this.expOrFn]`获取一下被依赖的数据，获取被依赖数据的目的是触发该数据上面的`getter`，上文我们说过，在getter里会调用`dep.depend()`收集依赖，而在`dep.depend()`中取到挂载window.target上的值并将其存入依赖数组中;
    - 2.3 在`get()`方法最后将`Dep.target`释放掉。
3. 而当数据变化时，会触发数据的`setter`，在setter中调用了`dep.notify()`方法，在`dep.notify()`方法中，遍历所有依赖(即watcher实例)，执行依赖的`update()`方法，也就是Watcher类中的`update()`实例方法，在update()方法中调用数据变化的更新回调函数，从而更新视图。

### 3.5 挂载到Vue

```js
class Vue {
    constructor(options = {}) {
        // 简化了$options的处理
        this.$options = options;
        // 简化了对data的处理
        let data = this._data = this.$options.data;
        // 将所有data最外层属性代理到Vue实例上
        Object.keys(data).forEach(key => this._proxy(key));
        // 监听数据
        observe(data);
    }
    // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
    $watch(expOrFn, cb) {
        new Watcher(this, expOrFn, cb);
    }
    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: () => this._data[key], // 取options.data
            set: val => {
                this._data[key] = val;
            },
        });
    }
}

```

```js
// 测试代码
let demo = new Vue({
    data: {
        text: '',
    },
});

const p = document.getElementById('p');
const input = document.getElementById('input');

input.addEventListener('keyup', function(e) {
  demo.text = e.target.value;
});

demo.$watch('text', str => p.innerHTML = str);
```

至此我们拆解了部分代码，来看一下它的实际效果？
```js

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="webbj97" data-slug-hash="RwKJrbq" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="RwKJrbq">
  <span>See the Pen <a href="https://codepen.io/webbj97/pen/RwKJrbq">
  RwKJrbq</a> by 姜博健 (<a href="https://codepen.io/webbj97">@webbj97</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
```

再次回顾下图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210415144032236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)

### 3.5 任重道远的defineProperty

Object.defineProperty的第一个缺陷,无法监听数组变化。

然而Vue的文档提到了Vue是可以检测到数组变化的，但是只有以下八种方法,vm.items[indexOfItem] = newValue这种是无法检测的。

```js
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

其实作者在这里用了一些奇技淫巧,把无法监听数组的情况hack掉了,以下是方法示例。

```js
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method)=> {
    // 这里是原生Array的原型方法
    let original = Array.prototype[method];

   // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
   // 注意：是属性而非原型属性
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');

        // 调用对应的原生方法并返回结果
        return original.apply(this, arguments);
    };

});

let list = ['a', 'b', 'c'];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// 别忘了这个空数组的属性上定义了我们封装好的push等方法
list.__proto__ = arrayAugmentations;
list.push('d');  // 我被改变啦！ 4

// 这里的list2没有被重新定义原型指针，所以就正常输出
let list2 = ['a', 'b', 'c'];
list2.push('d');  // 4
```

我们应该注意到在上文中的实现里,我们多次用遍历方法遍历对象的属性，这就引出了Object.defineProperty的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择。

```js
Object.keys(value).forEach(key => this.convert(key, value[key]));
```

## 四、数据检测（Vue 3.x）

> Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。

本小结简单介绍一下proxy为什么能替代defineProperty：

前置知识：

* proxy同样拥有set和get方法，对指定数据进行代码
*Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。

### 4.1 重构极简版双向绑定

我们还是以上文中用Object.defineProperty实现的极简版双向绑定为例,用Proxy进行改写。

```js
const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};

const newObj = new Proxy(obj, {
    get: function(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
        console.log(target, key, value, receiver);
        if (key === 'text') {
            input.value = value;
            p.innerHTML = value;
        }
        return Reflect.set(target, key, value, receiver);
    },
});

input.addEventListener('keyup', function(e) {
    newObj.text = e.target.value;
});
```

我们可以看到,Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty。

### 4.2 proxy的优势

Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。

Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改。

Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。

当然,Proxy的劣势就是兼容性问题,而且无法用polyfill磨平,因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写。

## 写在最后

**参考：**

[面试官: 实现双向绑定Proxy比defineproperty优劣如何?](https://juejin.cn/post/6844903601416978439#heading-6)

本篇文章是Vue系列的第一篇文章，我的本意是多图少字，但不知不觉还是边幅过长，写这篇文章也是我一个自己总结的机会，希望能帮助到大家

**JavaScript系列：**

1. [《JavaScript内功进阶系列》（已完结）](https://blog.csdn.net/jbj6568839z/article/details/103161970)
2. [《JavaScript专项系列》（持续更新）](https://blog.csdn.net/jbj6568839z/category_10204368.html)
3. [《ES6基础系列》（持续更新）](https://blog.csdn.net/jbj6568839z/category_8464707.html)

**关于我**

* 花名：余光（沉迷JS，虚心学习中）
* WX：j565017805

**其他沉淀**

* [Js版LeetCode题解](https://webbj97.github.io/leetCode-Js/)
* [前端进阶笔记](https://webbj97.github.io/summary/)
* [我的CSDN博客](https://yuguang.blog.csdn.net/)

如果您看到了最后，对文章有任何建议，都可以在评论区留言

这是[文章所在GitHub仓库的传送门](https://github.com/webbj97/summary)，如果真的对您有所帮助，希望可以点个star，这是对我最大的鼓励 ～

<h1 align=center>
    <img src="https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1607504321645897/yuguang-vue-bottom.gif"/>
</h1>






