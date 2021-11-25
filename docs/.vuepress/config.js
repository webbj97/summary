module.exports = {
    title: 'Hi 余光',
    description: '在这里一定有能帮助你成长的文章',
    base: '/summary/', // github仓库名
    theme: 'antdocs', // 接入ant主题
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    plugins: [
        '@vuepress/back-to-top',
        'vuepress-plugin-code-copy'
    ],
    themeConfig: {
        nav: require('./config/nav.js'),
        sidebar: require('./config/sidebar.js'),
        repo: 'https://github.com/webbj97/summary',
        lastUpdated: true, // 最近更新
        editLink: false,
        markdown: {
            lineNumbers: true // 代码块显示行号
        },
    }
}