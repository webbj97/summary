(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{883:function(t,s,a){"use strict";a.r(s);var n=a(50),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"一-变量与函数提升"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一-变量与函数提升"}},[t._v("#")]),t._v(" （一）变量与函数提升")]),t._v(" "),a("blockquote",[a("p",[t._v("相信阅读完"),a("a",{attrs:{href:"https://blog.csdn.net/jbj6568839z/article/details/103161970",target:"_blank",rel:"noopener noreferrer"}},[t._v("《前端进阶系列》"),a("OutboundLink")],1),t._v("的朋友们已经对Js中经典的知识点有所了解。本系列的第一篇选择了一个值得讨论的问题——变量提升，我们会从遇到问题、分析问题、解决问题、例题测试的方式加深大家对变量提升的认知，一起加油！")])]),t._v(" "),a("h2",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),a("p",[t._v("本篇文章是《JavaScript专项进阶系列》的第一篇文章，全系列大概会包含例如：")]),t._v(" "),a("ul",[a("li",[t._v("防抖节流")]),t._v(" "),a("li",[t._v("扁平化")]),t._v(" "),a("li",[t._v("深浅拷贝")]),t._v(" "),a("li",[t._v("数组去重")]),t._v(" "),a("li",[t._v("排序")]),t._v(" "),a("li",[t._v("...")])]),t._v(" "),a("p",[t._v("等等经典的专项知识点。取名为"),a("strong",[t._v("专项进阶")]),t._v("是因为它们在很多场合的“出镜率高”很高，为了避免化身"),a("code",[t._v("google内容搜索师")]),t._v("，《JavaScript专项进阶系列》诞生了！！！")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200715170621440.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2piajY1Njg4Mzl6,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})]),t._v(" "),a("h2",{attrs:{id:"一、有趣的现象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、有趣的现象"}},[t._v("#")]),t._v(" 一、有趣的现象")]),t._v(" "),a("p",[t._v("按照大家的常识，JavaScript代码在执行是一定是自上而下的，你需要输出一个字符串，当然需要提前声明一个"),a("code",[t._v("保存string类型的变量")]),t._v("。如果深奥的道理我都能懂，于是我阅读了下面的代码。")]),t._v(" "),a("h4",{attrs:{id:"_1-1-我以为的开局"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-我以为的开局"}},[t._v("#")]),t._v(" 1.1 我以为的开局")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 123")]),t._v("\n")])])]),a("p",[t._v("我们调换一下代码的位置在再看：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("strong",[t._v("我好像找到规律了!!!")])]),t._v(" "),a("p",[t._v("当我看完了前两段代码并且进行了“深度思考”后，我好像找到规律了，那就是：在当前代码块后函数中，在变量声明和初始化"),a("code",[t._v("之前")]),t._v("使用变量，会拿不到正确的值。")]),t._v(" "),a("p",{attrs:{align:"center"}},[a("img",{attrs:{width:"60%",src:"https://img-blog.csdnimg.cn/20200716110537792.jpg"}})]),t._v(" "),a("h4",{attrs:{id:"_1-2-实际上是这样的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-实际上是这样的"}},[t._v("#")]),t._v(" 1.2 实际上是这样的")]),t._v(" "),a("p",[t._v("带着上面的“结论”我来到了这里")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" val "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 余光")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("果然如此！，在"),a("strong",[t._v("变量声明和初始化之后")]),t._v("耶稣也阻挡不了我拿到val的值，我说的！！！")]),t._v(" "),a("p",[t._v("当我看到下面一段代码时，我已经产生了动摇，此事必要蹊跷。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" val "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" val "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'测试'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Ps：如果大家立即执行函数存在疑问，不妨看看"),a("a",{attrs:{href:"https://blog.csdn.net/jbj6568839z/article/details/106824296",target:"_blank",rel:"noopener noreferrer"}},[t._v("《JavaScript之深入理解立即调用函数表达式（IIFE）》"),a("OutboundLink")],1),t._v("吧～")]),t._v(" "),a("p",[t._v("这...我怂了，是什么原因导致这样的现象发生的呢？Js又是如果处理的呢？")]),t._v(" "),a("p",{attrs:{align:"center"}},[a("img",{attrs:{width:"60%",src:"https://img-blog.csdnimg.cn/20200716111555639.jpg"}})]),t._v(" "),a("h2",{attrs:{id:"二、js的预解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、js的预解析"}},[t._v("#")]),t._v(" 二、Js的预解析")]),t._v(" "),a("p",[t._v("在当前的作用域内，无论在哪里变量声明，在幕后，都会进行一次看不见的移动。")]),t._v(" "),a("p",[t._v("注意："),a("strong",[t._v("仅声明被“移动”")]),t._v("。即声明和赋值在某些时候被动分开了。而这次看不见的移动实际上就是"),a("code",[t._v("Js在编译阶段的解析")]),t._v("。")]),t._v(" "),a("p",[t._v("来看一段《你知不知道的Js》中经典的例子：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 未添加关键字（未声明），name为全局变量，，即window.name = '余光'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 再次声明name，此时name未进行初始化，它的值是undefined吗？")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ？")]),t._v("\n")])])]),a("p",[t._v("结果是成功打印“余光”，这样"),a("strong",[t._v("看不见的移动")]),t._v("就发生在Js预解析（编译）之中。")]),t._v(" "),a("h3",{attrs:{id:"_2-1-核心-预解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-核心-预解析"}},[t._v("#")]),t._v(" 2.1 核心：预解析")]),t._v(" "),a("p",[t._v("为了搞明白这个核心问题，我们需要回顾一下，引擎会在解释JavaScript代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来。感兴趣的小伙伴可以阅读"),a("a",{attrs:{href:"https://blog.csdn.net/jbj6568839z/article/details/106793254",target:"_blank",rel:"noopener noreferrer"}},[t._v("《JavaScript中的变量对象》"),a("OutboundLink")],1),t._v("和"),a("a",{attrs:{href:"https://blog.csdn.net/jbj6568839z/article/details/106618708",target:"_blank",rel:"noopener noreferrer"}},[t._v("《从作用域到作用域链》"),a("OutboundLink")],1),t._v("这两篇文章哦～")]),t._v(" "),a("p",[t._v("因此，发生这样的事情，包括"),a("code",[t._v("变量")]),t._v("和"),a("code",[t._v("函数")]),t._v("在内的所有声明都会在任何代码被执行前首先被处理。当你看到"),a("code",[t._v("var a = 2")]),t._v("；时，可能会认为这是一个声明。但JavaScript实际上会将其看成两个声明：var a；和a = 2;。")]),t._v(" "),a("ul",[a("li",[t._v("第一个定义声明是在编译阶段进行的。")]),t._v(" "),a("li",[t._v("第二个赋值声明会被留在原地等待执行阶段。")])]),t._v(" "),a("p",[t._v("即代码是这样写的：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 我们看到的代码：")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("但Js会将它解析成：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明(Declaration)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明但未初始化，所以分配 undefined")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化(Initialization)")]),t._v("\nname "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化（赋值）")]),t._v("\n")])])]),a("p",[t._v("所以本小结的一段代码应该这样分析：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明name提到作用域顶部，并被分配了一个undefined")]),t._v("\nname "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进行初始化操作")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '余光'")]),t._v("\n")])])]),a("h4",{attrs:{id:"_2-2-注意-只有声明被提升了"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-注意-只有声明被提升了"}},[t._v("#")]),t._v(" 2.2 注意：只有声明被提升了")]),t._v(" "),a("p",[a("strong",[t._v("只有声明会被提升，而赋值和其他代码逻辑会在执行到代码的位置时才会生效")]),t._v("。所以会有下面的问题：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("函数被提升了，自然可以正常执行，但变量仅仅是声明被提升了。")]),t._v(" "),a("h4",{attrs:{id:"_2-3-每个作用域都会进行提升操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-每个作用域都会进行提升操作"}},[t._v("#")]),t._v(" 2.3 每个作用域都会进行提升操作")]),t._v(" "),a("p",[t._v("还是上面的代码：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("实际它在编译时是这样的：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n    name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 函数执行")]),t._v("\n")])])]),a("p",{attrs:{align:"center"}},[a("img",{attrs:{width:"60%",src:"https://img-blog.csdnimg.cn/20200716134005198.jpg"}})]),t._v(" "),a("h2",{attrs:{id:"三、提升之间的优先级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、提升之间的优先级"}},[t._v("#")]),t._v(" 三、提升之间的优先级")]),t._v(" "),a("p",[t._v("既然我们知道了"),a("code",[t._v("变量")]),t._v("和"),a("code",[t._v("函数")]),t._v("会被提升，他们之间又是如何判断优先级的呢？")]),t._v(" "),a("h5",{attrs:{id:"_3-1-函数会被首先提升-然后才是变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-函数会被首先提升-然后才是变量"}},[t._v("#")]),t._v(" 3.1 函数会被首先提升，然后才是变量")]),t._v(" "),a("p",[t._v("我们分析下面的代码：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("foo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'小李'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("本着函数优先提升的原则，他会被解析成这样：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'余光'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 余光")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("foo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'小李'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("注意，"),a("code",[t._v("var foo")]),t._v(" 因为是一个重复声明，且优先级"),a("code",[t._v("低于函数声明")]),t._v("所以它被忽略掉了。")]),t._v(" "),a("h4",{attrs:{id:"_3-2-函数字面量不会进行函数提升"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-函数字面量不会进行函数提升"}},[t._v("#")]),t._v(" 3.2 函数字面量不会进行函数提升")]),t._v(" "),a("p",[t._v("最直观的例子，就是在函数字面量前调用该函数：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("foo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// TypeError: foo is not a function")]),t._v("\n")])])]),a("p",[t._v("这段程序中：")]),t._v(" "),a("ol",[a("li",[t._v("变量标识符"),a("code",[t._v("foo()")]),t._v("被提升并分配给所在作用域（在这里是全局作用域），因此foo()"),a("strong",[t._v("不会导致ReferenceError")]),t._v("。")]),t._v(" "),a("li",[t._v("然后就是执行foo，foo此时并没有赋值（注意变量被提升了）。由于对undefined值进行函数调用而导致非法操作，因此抛出TypeError异常。")])]),t._v(" "),a("h2",{attrs:{id:"四、es6和小结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、es6和小结"}},[t._v("#")]),t._v(" 四、ES6和小结")]),t._v(" "),a("p",[t._v("ES6新增了两个命令"),a("code",[t._v("let")]),t._v("和"),a("code",[t._v("const")]),t._v("，用来声明变量，有关它们完整的概念我会在《ES6基础系列》中总结，提起它们，是因为"),a("strong",[t._v("变量提升在它们身上不会存在")]),t._v("。")]),t._v(" "),a("h5",{attrs:{id:"_4-1-变量提升是可以规避的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-变量提升是可以规避的"}},[t._v("#")]),t._v(" 4.1 变量提升是可以规避的")]),t._v(" "),a("p",[t._v("let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// var 的情况")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("foo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出undefined")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" foo "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// let 的情况")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 报错ReferenceError")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" bar "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。")]),t._v(" "),a("p",[t._v("在变量提升上，const和let一样，只在声明所在的块级作用域内有效，也不会变量提升")]),t._v(" "),a("h4",{attrs:{id:"_4-2-小结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-小结"}},[t._v("#")]),t._v(" 4.2 小结")]),t._v(" "),a("ol",[a("li",[t._v('变量提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部，但变量的初始化不会提升；')]),t._v(" "),a("li",[t._v("函数提升：函数声明可以被看作是函数的整体被提升到了代码的顶部，但函数字面量表达式并不会引发函数提升；")]),t._v(" "),a("li",[t._v("函数提升优先与变量提升；")]),t._v(" "),a("li",[t._v("let和const可以有效的规避变量提升")])]),t._v(" "),a("p",[t._v("最后提炼一下《你不知道的JS》中的一段话："),a("strong",[t._v("JavaScript引擎并不总是按照代码的顺序来进行解析。在编译阶段，无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理，这个过程被称为提升。声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。")])]),t._v(" "),a("p",{attrs:{align:"center"}},[a("img",{attrs:{width:"60%",src:"https://img-blog.csdnimg.cn/20200716184711721.jpg"}})]),t._v(" "),a("h2",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),a("ul",[a("li",[t._v("你不知道的Js（上）")])]),t._v(" "),a("h2",{attrs:{id:"写在最后"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#写在最后"}},[t._v("#")]),t._v(" 写在最后")]),t._v(" "),a("p",[a("strong",[t._v("JavaScript系列：")])]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"https://blog.csdn.net/jbj6568839z/article/details/103161970",target:"_blank",rel:"noopener noreferrer"}},[t._v("《JavaScript内功进阶系列》（已完结）"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://blog.csdn.net/jbj6568839z/category_10204368.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("《JavaScript专项系列》（持续更新）"),a("OutboundLink")],1)])]),t._v(" "),a("p",[a("strong",[t._v("关于我")])]),t._v(" "),a("ul",[a("li",[t._v("花名：余光（沉迷JS，虚心学习中）")]),t._v(" "),a("li",[t._v("WX：j565017805")])]),t._v(" "),a("p",[a("strong",[t._v("其他沉淀")])]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://webbj97.github.io/leetCode-Js/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Js版LeetCode题解"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://webbj97.github.io/summary/",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端进阶笔记"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://yuguang.blog.csdn.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("我的CSDN博客"),a("OutboundLink")],1)])]),t._v(" "),a("p",[t._v("如果您看到了最后，对文章有任何建议，都可以在评论区留言，如果真的对您有所帮助，也希望您能点个star，这是对我最大的鼓励！")]),t._v(" "),a("p",{attrs:{align:"center"}},[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200602155947301.png",width:"60%"}})])])}),[],!1,null,null,null);s.default=e.exports}}]);