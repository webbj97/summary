import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig < DefaultThemeOptions > ({
    title: '余光的前端成长笔记',
    description: '在这里一定有能帮助你成长的文章',
    base: '/summary/', // github仓库名
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    plugins: [
        '@vuepress/back-to-top',
        'vuepress-plugin-code-copy'
    ],
    themeConfig: {
        navbar: [
            { text: 'Home', link: '/' },
            { text: '前端|博文', link: '/blog/' },
            { text: '算法|题解', link: '/algorithm/' },
            { text: 'CSS|博文', link: '/css/' },
        ],
        repo: 'https://github.com/webbj97/summary',
        lastUpdated: true, // 最近更新
        editLink: false,
        markdown: {
            lineNumbers: true // 代码块显示行号
        },
        sidebar: {
            '/blog/': [{
                    text: 'JavaScript基础', // 必要的
                    children: [
                        '/blog/javascript/basic-1',
                        '/blog/javascript/basic-2',
                        '/blog/javascript/basic-3',
                        '/blog/javascript/basic-4',
                        '/blog/javascript/basic-5',
                        '/blog/javascript/basic-6',
                        '/blog/javascript/basic-7',
                        '/blog/javascript/basic-8',
                        '/blog/javascript/basic-9',
                        '/blog/javascript/basic-10',
                        '/blog/javascript/basic-11',
                    ]
                },
                {
                    text: 'JavaScript进阶', // 必要的
                    children: [
                        '/blog/javascript/senior-1',
                        '/blog/javascript/senior-2',
                        '/blog/javascript/senior-3',
                        '/blog/javascript/senior-4',
                        '/blog/javascript/senior-5',
                        '/blog/javascript/senior-6',
                        '/blog/javascript/senior-7',
                        '/blog/javascript/senior-8',
                        '/blog/javascript/senior-9',
                    ]
                },
                {
                    text: 'TypeScript基础', // 必要的
                    children: [
                        '/blog/typescript/basic-1',
                        '/blog/typescript/basic-2',
                        '/blog/typescript/basic-3',
                        '/blog/typescript/basic-4',
                        '/blog/typescript/5',
                        '/blog/typescript/6',
                    ]
                },
                {
                    text: 'ES6', // 必要的
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
                    text: '设计模式', // 必要的
                    children: [
                        '/blog/js-sjms/1',
                        '/blog/js-sjms/2',
                        '/blog/js-sjms/3',
                        '/blog/js-sjms/4',
                        '/blog/js-sjms/5',
                        '/blog/js-sjms/6',
                    ]
                },
                // {
                //     title: 'Vue', // 必要的
                //     collapsable: true, // 可选的, 默认值是 true,
                //     sidebarDepth: 3, // 可选的, 默认值是 1
                //     children: [
                //         '/blog/vue/mvvm', // MVVM
                //         '/blog/vue/observer', // 数据监听
                //         '/blog/vue/dom-diff', // 虚拟Dom
                //     ]
                // },
                // {
                //     title: '浏览器', // 必要的
                //     collapsable: true, // 可选的, 默认值是 true,
                //     sidebarDepth: 4, // 可选的, 默认值是 1
                //     children: [
                //         '/blog/browser/1', // 浏览器基本运行原理
                //         '/blog/browser/2', // 渲染原理
                //         '/blog/browser/3', // 浏览器EventLoop
                //     ]
                // },
                // {
                //     title: '网络', // 必要的
                //     collapsable: true, // 可选的, 默认值是 true,
                //     sidebarDepth: 2, // 可选的, 默认值是 1
                //     children: [
                //         '/blog/browser/1', // 浏览器基础
                //         '/blog/browser/2', // 渲染机制
                //         '/blog/browser/3', // EventLoop
                //     ]
                // },
                // {
                //     title: '其他', // 必要的
                //     collapsable: true, // 可选的, 默认值是 true,
                //     sidebarDepth: 2, // 可选的, 默认值是 1
                //     children: [
                //         '/blog/something-interesting/1-bank', // CSDN排行榜能分析出什么？
                //         '/blog/something-interesting/2-csdn-plugin', // 渲染机制
                //     ]
                // },
            ],
        }
    }
})