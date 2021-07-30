module.exports = {
    title: '余光的前端进阶笔记',
    description: '在这里一定有能帮助你成长的文章',
    base: '/summary/', // github仓库名
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    plugins: [
        '@vuepress/back-to-top',
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: '前端|博文', link: '/blog/' },
            { text: '算法|题解', link: '/algorithm/' },
            { text: 'CSS|博文', link: '/css/' },
            { text: 'GitHub', link: 'https://github.com/webbj97/summary' },
        ],
        markdown: {
            lineNumbers: true // 代码块显示行号
        },
        sidebar: {
            '/blog/': [{
                    title: 'JavaScript系列', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/blog/js-basics/1',
                        '/blog/js-basics/2',
                        '/blog/js-basics/3',
                        '/blog/js-basics/4',
                        '/blog/js-basics/5',
                        '/blog/js-basics/6',
                        '/blog/js-basics/7',
                        '/blog/js-basics/8',
                        '/blog/js-basics/9',
                        '/blog/js-basics/10',
                        '/blog/js-basics/11',
                        '/blog/js-special/1',
                        '/blog/js-special/2',
                        '/blog/js-special/3',
                        '/blog/js-special/4',
                        '/blog/js-special/5',
                        '/blog/js-special/6',
                        '/blog/js-special/7',
                        '/blog/js-special/8',
                        '/blog/js-special/9',
                    ]
                },
                {
                    title: 'TypeScript系列', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/blog/ts/1',
                        '/blog/ts/2',
                    ]
                },
                {
                    title: '设计模式', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/blog/js-sjms/1',
                        '/blog/js-sjms/2',
                        '/blog/js-sjms/3',
                        '/blog/js-sjms/4',
                        '/blog/js-sjms/5',
                        '/blog/js-sjms/6',
                    ]
                },
                {
                    title: 'ES6', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/blog/es6/1',
                        '/blog/es6/2',
                        '/blog/es6/3',
                        '/blog/es6/4',
                        '/blog/es6/5',
                        '/blog/es6/6',
                        '/blog/es6/7',
                        '/blog/es6/11',
                    ]
                },
                {
                    title: 'Vue', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 3, // 可选的, 默认值是 1
                    children: [
                        '/blog/vue/mvvm', // MVVM
                        '/blog/vue/observer', // 数据监听
                        '/blog/vue/dom-diff', // 虚拟Dom
                    ]
                },
                {
                    title: '浏览器', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 4, // 可选的, 默认值是 1
                    children: [
                        '/blog/browser/1', // 浏览器基本运行原理
                        '/blog/browser/2', // 渲染原理
                        '/blog/browser/3', // 浏览器EventLoop
                    ]
                },
                {
                    title: '网络', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/blog/browser/1', // 浏览器基础
                        '/blog/browser/2', // 渲染机制
                        '/blog/browser/3', // EventLoop
                    ]
                },
                {
                    title: '其他', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/blog/something-interesting/1-bank', // CSDN排行榜能分析出什么？
                        '/blog/something-interesting/2-csdn-plugin', // 渲染机制
                    ]
                },
            ],
            '/algorithm/': [{
                    title: '二分查找', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    path: '/algorithm/dichotomy',
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: '模版I', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            path: '/algorithm/dichotomy/1-1',
                            children: [
                                '/algorithm/dichotomy/1-1', // 二分查找 ok
                                '/algorithm/dichotomy/1-2', // 搜索插入的位置 ok
                                '/algorithm/dichotomy/1-3', // x 的平方根 ok
                                '/algorithm/dichotomy/1-4', // 猜数字大小 ok
                                '/algorithm/dichotomy/1-5', // 搜索旋转排序数组 ok
                            ]
                        },
                        {
                            title: '模版II', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            path: '/algorithm/dichotomy/2-1',
                            children: [
                                '/algorithm/dichotomy/2-1', // 第一个错误的版本 ok
                                '/algorithm/dichotomy/2-2', // 寻找峰值
                                '/algorithm/dichotomy/2-3', // 寻找旋转排序数组中的最小值
                                '/algorithm/dichotomy/2-4', // 输入有序数组
                                '/algorithm/dichotomy/2-5', // 寻找旋转排序数组中的最小值II
                            ]
                        },
                        {
                            title: '模版III', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            path: '/algorithm/dichotomy/3-1',
                            children: [
                                '/algorithm/dichotomy/3-1', // 在排序数组中查找元素的第一个和最后一个位置
                                '/algorithm/dichotomy/3-2', // 找到 K 个最接近的元素
                            ]
                        },
                        {
                            title: '练习题', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            path: '/algorithm/dichotomy/4-1',
                            children: [
                                '/algorithm/dichotomy/4-1', // pow(n, x)
                                '/algorithm/dichotomy/4-2', // 有效的完全平方数
                                '/algorithm/dichotomy/4-3', // 寻找比目标字母大的最小字母
                                '/algorithm/dichotomy/4-4', // 统计有序矩阵中的负数
                                '/algorithm/dichotomy/4-5', // 矩阵中战斗力最弱的 K 行
                            ]
                        },
                    ]
                },
                {
                    title: '链表', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    path: '/algorithm/linked/',
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/algorithm/linked/1-1', // 设计链表
                        '/algorithm/linked/1-2', // 环形链表
                        '/algorithm/linked/1-3', // 环形链表II
                    ]
                },
                {
                    title: '树', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    path: '/algorithm/tree/',
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [

                    ]
                },
                {
                    title: '二维数组', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    path: '/algorithm/more-array/',
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/algorithm/more-array/56',
                        '/algorithm/more-array/240',
                    ]
                },
                {
                    title: '数组', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    path: '/algorithm/array/',
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        '/algorithm/array/154',
                        '/algorithm/array/189',
                        '/algorithm/array/724',
                    ]
                },
            ],
            '/css/': [{
                title: 'CSS基础', // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [
                    '/css/code/1', // 选择器的权重与优先级有什么关系？
                    '/css/code/2', // 简述 CSS 盒模型
                    '/css/code/3', // 浅谈position
                    '/css/code/4', // CSS的上下文之BFC
                    '/css/code/5', // CSS的上下文之层叠上下文
                    '/css/code/6', // CSS-Flex弹性盒子
                    '/css/code/7', // CSS-Grid弹性盒子
                ]
            }, ]
        }
    }
}