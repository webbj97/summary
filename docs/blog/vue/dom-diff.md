# Virtual DOM

> 大家好我是余光，这是我《Vue系列》的第二篇文章，本篇文章我们会介绍：什么是虚拟Dom、为什么为是虚拟Dom、Diff对比等多个问题，希望能帮到大家～

## 一、Virtual DOM

> 大家在学习Js时，直接操作（修改）Dom可能是最让你头疼的事情，巧了！浏览器也很讨厌频繁的修改DOM（有关浏览器渲染过程的文章在路上啦）

**首先我们先认同这样的前提：**

* dom操作是非常昂贵的。
* 数据变化大小是随机的，全部刷新整个视图和单独刷新改动部分是需要取舍的

### 1.1 什么是虚拟DOM？

> 答：所谓虚拟DOM，就是用一个JS对象来描述一个DOM节点

```js
// 我是一个div标签：
<div class="a" id="b">我是内容</div>


// 用Js对象简单表示：
{
    tag:'div',        // 元素标签
    attrs:{           // 属性
        class:'a',
        id:'b'
    },
    text:'我是内容',  // 文本内容
    children:[]       // 子元素
}
```

我们把组成一个DOM节点的必要属性通过一个JS对象表示出来，那么这个JS对象就可以用来描述这个DOM节点，我们把这个JS对象就称为是这个真实DOM节点的`虚拟DOM节点`。

### 1.2 为什么会有虚拟Dom？

> 答：JS的计算性能来换取操作DOM所消耗的性能


我们知道，Vue是数据驱动视图的，数据发生变化视图就要随之更新，在更新视图的时候难免要操作DOM，即使计算机硬件一直在更新迭代，操作DOM的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户的体验。真实的DOM节点，哪怕一个最简单的div也包含着很多属性，可以打印出来直观感受一下：

<img src="https://img-blog.csdnimg.cn/20210422164628634.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70">


因此，Vue使用虚拟Dom的形式，用Js的计算性能来承担部分Dom的消耗，即：

* 减少Dom操作
* 精简更新的次数

最直观的思路就是我们不要盲目的去更新视图，而是通过对比数据变化前后的状态，计算出视图中哪些地方需要更新，只更新需要更新的地方。

我们可以用JS模拟出一个DOM节点，称之为虚拟DOM节点。当数据发生变化时，我们对比变化前后的虚拟DOM节点，通过`DOM-Diff`算法计算出需要更新的地方，然后去更新需要更新的视图。

这就是虚拟DOM产生的原因以及最大的用途。


### 1.3 Vue中的虚拟DOM

> 我们介绍了虚拟DOM的概念以及为什么要有虚拟DOM，那么在Vue中虚拟DOM是怎么实现的呢？

**描述节点**

Virtual DOM 就是用一个原生的 `JS 对象`去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多。在 Vue.js 中，Virtual DOM 是用 VNode 这么一个 Class 去描述的：

这里千万不要被这些茫茫多的属性吓到，我们只需要有一个概念，即VNode类包含了描述Dom节点的一些列属性：

* tag：标签名
* data： 数据
* children： 子节点（数组结构，元素是VNode类型）
* ...

VNode类中包含了描述一个真实DOM节点所需要的一系列属性，如tag表示节点的标签名，text表示节点中包含的文本，children表示该节点包含的子节点等。通过属性之间不同的搭配，就可以描述出各种类型的真实DOM节点。

```js
export default class VNode {
    tag: string | void; // 字符串 || 无类型（undefined、null）
    data: VNodeData | void; // VNodeData || 无类型
    children: ? Array < VNode > ; // 可空 || 数组<内部也是一个节点的模版>
    text: string | void;
    elm: Node | void;
    ns: string | void;
    context: Component | void; // rendered in this component's scope
    key: string | number | void;
    componentOptions: VNodeComponentOptions | void;
    componentInstance: Component | void; // component instance
    parent: VNode | void; // component placeholder node

    // strictly internal
    raw: boolean; // contains raw HTML? (server only)
    isStatic: boolean; // hoisted static node
    isRootInsert: boolean; // necessary for enter transition check
    isComment: boolean; // 空注释占位
    isCloned: boolean; // is a cloned node?
    isOnce: boolean; // is a v-once node?
    asyncFactory: Function | void; // async component factory function
    asyncMeta: Object | void;
    isAsyncPlaceholder: boolean;
    ssrContext: Object | void;
    fnContext: Component | void; // real context vm for functional nodes
    fnOptions: ? ComponentOptions; // for SSR caching
    devtoolsMeta: ? Object; // used to store functional render context for devtools
    fnScopeId: ? string; // functional scope id support

    constructor(
        tag ? : string,
        data ? : VNodeData,
        children ? : ? Array < VNode > ,
        text ? : string,
        elm ? : Node,
        context ? : Component,
        componentOptions ? : VNodeComponentOptions,
        asyncFactory ? : Function
    ) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.fnContext = undefined
        this.fnOptions = undefined
        this.fnScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }

    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    get child(): Component | void {
        return this.componentInstance
    }
}
```

其实 VNode 是对真实 DOM 的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其它属性都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。

由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是非常轻量和简单的。

### 1.4 注释节点、文本节点

在有了1.3小节的节点模版后，有一些节点，可以快速的得到：

```js
// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode();
  node.text = text; // 内容
  node.isComment = true; // 是注释节点
  return node;
}

// 创建文本节点
export const createTextVNode = (val: string | number) => {
  // 文本节点主要就是承载文本，所有只需要text属性
  return new VNode(undefined, undefined, undefined, String(val));
}
```

### 1.5 克隆节点

```js
// 创建克隆节点
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  return cloned
}
```

从上面代码中可以看到，克隆节点就是把已有节点的属性全部复制到新节点中，而现有节点和新克隆得到的节点之间唯一的不同就是克隆得到的节点`isCloned为true`。

### 1.6 小结

第一节主要是一起了解了虚拟Dom这个概念，以及为什么会有这样的概念、作为虚拟Dom的基本单元VNode大概是什么样子的，至少让我们印象加深，下一节我们研究一下新旧两套虚拟Dom是怎样进行对比获得差异的。

点赞收藏不迷路～

## 二、diff

VNode最大的用途就是在数据变化前后生成真实DOM对应的虚拟DOM节点，然后就可以对比新旧两份VNode，找出差异所在，然后更新有差异的DOM节点。

这个过程，被称为Dom-Diff——dom差异。它是整个虚拟DOM的核心所在。

### 2.1 patch（补丁）

> 打补丁从而得到新的VNode，以新的VNode为基准，改造旧的oldVNode使之成为跟新的VNode一样，这就是patch过程要干的事。

在Vue中，把 DOM-Diff过程叫做patch过程。patch,意为“补丁”，即指对旧的VNode修补，打补丁从而得到新的VNode。

**演员**

* 旧节点：数据变化之前的节点
* 新节点：数据变化之后的节点，要正确渲染的节点

**过程**

* 以生成的新的VNode为基准，对比旧的oldVNode
  - 1.1 如果新节点有(+)而旧节点上没有(-)，那么就在旧的oldVNode上加上去；
  - 1.2 如果新节点没有(-)而旧节点上有(+)，那么就在旧的oldVNode上去掉；
  - 1.3 如果新节点有(+)而旧节点上也有(+)，那么就以新的VNode为准，更新旧的oldVNode，从而让新旧VNode相同。

**操作**

1. 创建节点：新的VNode中有而旧的oldVNode中没有，就在旧的oldVNode中创建。
2. 删除节点：新的VNode中没有而旧的oldVNode中有，就从旧的oldVNode中删除。
3. 更新节点：新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新旧的oldVNode。

### 2.2 创建节点

实际上只有3种类型的节点能够被创建并插入到DOM中，它们分别是：元素节点、文本节点、注释节点。

所以Vue在创建节点的时候会：判断在新的VNode中 -> 判断多出来的节点是哪种类型 -> 调用不同的方法创建并插入到DOM中。

其实判断起来也不难，因为这三种类型的节点其特点非常明显，在源码中是怎么判断的：

```js
// 源码位置: /src/core/vdom/patch.js
function createElm(vnode, parentElm, refElm) {
    const data = vnode.data; // 节点数据
    const children = vnode.children; // 子节点
    const tag = vnode.tag; // 标签
    if (isDef(tag)) {
        vnode.elm = nodeOps.createElement(tag, vnode) // 创建元素节点
        createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
        insert(parentElm, vnode.elm, refElm) // 插入到DOM中
    } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text) // 创建注释节点
        insert(parentElm, vnode.elm, refElm) // 插入到DOM中
    } else {
        vnode.elm = nodeOps.createTextNode(vnode.text) // 创建文本节点
        insert(parentElm, vnode.elm, refElm) // 插入到DOM中
    }
}
```

从上面代码中，我们可以看出：

* 元素节点：只需判断该VNode节点是否有`tag`标签即可。如果`有tag属性`即认为是元素节点，则调用createElement方法创建元素节点，通常元素节点还会有子节点，那就递归遍历创建所有子节点，将所有子节点创建好之后insert插入到当前元素节点里面，最后把当前元素节点插入到DOM中。
* 注释节点，只需判断VNode的`isComment属性`是否为true即可，若为true则为注释节点，则调用createComment方法创建注释节点，再插入到DOM中。
* 文本节点，`不符合上述两个节点判断的`，就是文本节点，则调用createTextNode方法创建文本节点，再插入到DOM中。

### 2.3 删除节点

如果某些节点再新的VNode中没有而在旧的oldVNode中有，那么就需要把这些节点从旧的oldVNode中删除。删除节点非常简单，只需在要删除节点的父元素上调用removeChild方法即可。源码如下：

```js
function removeNode(el) {
    const parent = nodeOps.parentNode(el) // 获取父节点
    if (isDef(parent)) {
        nodeOps.removeChild(parent, el) // 调用父节点的removeChild方法
    }
}
```

### 2.4 更新节点

> old VNode -> patch(补丁) -> new VNode

更新节点就是当某些节点在新的VNode和旧的oldVNode中都有时，我们就需要细致比较一下，找出不一样的地方进行更新。

介绍更新节点之前，我们先介绍一个小的概念，就是什么是静态节点？我们看个例子：

**静态节点**

```html
<p>我是不会变化的文字</p>
```

上面这个节点里面只包含了纯文字，没有任何可变的变量，这也就是说，不管数据再怎么变化，只要这个节点渲染了，那么它以后就永远不会发生变化。

OK，有了这个概念以后，我们开始更新节点。更新节点的时候我们需要对以下3种情况进行判断并分别处理：

1. VNode和oldVNode均为静态节点
  - 我们说了，静态节点无论数据发生任何变化都与它无关，所以都为静态节点的话则直接跳过，无需处理。
2. 如果VNode是文本节点
  - 如果这个节点内只包含纯文本，那么只需看oldVNode是否也是文本节点，如果是，那就比较两个文本是否不同，如果不同则更新oldVNode里的文本。
  - 如果oldVNode不是文本节点，那么不论它是什么，直接调用setTextNode方法把它改成文本节点，并且文本内容跟VNode相同。
3. 如果VNode是元素节点
  - 如果VNode是元素节点，则又细分以下两种情况：
    - 如果`新的节点`内包含了`子节点`，那么此时要看旧的节点是否包含子节点，如果旧的节点里也包含了子节点，那就需要递归对比更新子节点；
    - 如果`旧的节点`里不包含`子节点`，那么这个旧节点有可能是空节点或者是文本节点，如果`旧的节点是空节点`就把新的节点里的`子节点创建一份`然后`插入到旧的节点`里面，如果旧的节点是文本节点，则把文本清空，然后把新的节点里的子节点创建一份然后插入到旧的节点里面。
  - 如果该节点不包含子节点，同时它又不是文本节点，那就说明该节点是个空节点，那就好办了，不管旧节点之前里面都有啥，直接清空即可。

OK，处理完以上3种情况，更新节点就算基本完成了，接下来我们看下源码中具体是怎么实现的，源码如下：

```js
// 更新节点
function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  // vnode与oldVnode是否完全一样？若是，退出程序
  if (oldVnode === vnode) {
    return
  }
  const elm = vnode.elm = oldVnode.elm

  // vnode与oldVnode是否都是静态节点？若是，退出程序。个人理解退出程序 = 不需要Dom更新
  // 如果 新节点是静态节点 旧节点是静态节点
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    return
  }
  // 获取子节点
  const oldCh = oldVnode.children
  const ch = vnode.children
  // vnode有text属性？若没有：
  if (isUndef(vnode.text)) {
    // vnode的子节点与oldVnode的子节点是否都存在？
    if (isDef(oldCh) && isDef(ch)) {
      // 若都存在，判断子节点是否相同，不同则更新子节点
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    }
    // 若只有vnode的子节点存在
    else if (isDef(ch)) {
      /**
       * 判断oldVnode是否有文本？
       * 若没有，则把vnode的子节点添加到真实DOM中
       * 若有，则清空Dom中的文本，再把vnode的子节点添加到真实DOM中
       */
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    }
    // 若只有oldnode的子节点存在
    else if (isDef(oldCh)) {
      // 清空DOM中的子节点
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    }
    // 若vnode和oldnode都没有子节点，但是oldnode中有文本
    else if (isDef(oldVnode.text)) {
      // 清空oldnode文本
      nodeOps.setTextContent(elm, '')
    }
    // 上面两个判断一句话概括就是，如果vnode中既没有text，也没有子节点，那么对应的oldnode中有什么就清空什么
  }
  // 若有，vnode的text属性与oldVnode的text属性是否相同？
  else if (oldVnode.text !== vnode.text) {
    // 若不相同：则用vnode的text替换真实DOM的文本
    nodeOps.setTextContent(elm, vnode.text)
  }
}
```
上面代码里注释已经写得很清晰了，接下来我们画流程图来梳理一下整个过程，流程图如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210430154548413.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70)


你可能注意到了，如果新旧VNode里都包含了子节点，那么对于子节点的更新在代码里调用了updateChildren方法，而这个方法的逻辑到底是怎样的我们放在下一篇文章中展开学习。

### 2.5 小节






## 写在最后

**参考**

[Vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/virtual-dom.html)