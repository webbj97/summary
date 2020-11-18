module.exports = {
    title: '余光的前端进阶笔记',
    description: '在这里一定有能帮助你成长的文章',
    base: '/summary/', // github仓库名
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: '基础|进阶', link: '/blog/' },
            { text: 'GitHub', link: 'https://github.com/webbj97/summary' },
        ],
        markdown: {
            lineNumbers: true // 代码块显示行号
        },
        sidebar: [{
                title: 'JavaScript基础', // 必要的
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
                ]
            },
            {
                title: 'JavaScript专题', // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [
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
                title: 'JavaScript设计模式（待优化）', // 必要的
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
                ]
            },
        ]
    }
}