module.exports = {
    title: "Hi 余光",
    description: "在这里一定有能帮助你成长的文章",
    base: "/summary/", // github仓库名
    theme: "antdocs", // 接入ant主题
    head: [["link", { rel: "icon", href: `/favicon.ico` }]],
    plugins: [
        ["@vuepress/back-to-top"],
        ["vuepress-plugin-code-copy"],
        [
            "@vuepress-reco/vuepress-plugin-kan-ban-niang",
            {
                theme: ["haru1"],
            },
        ],
        [
            "cursor-effects",
            {
                size: 2, // size of the particle, default: 2
                shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
                zIndex: 999999999, // z-index property of the canvas, default: 999999999
            },
        ],
        // [
        //     "@vuepress-reco/vuepress-plugin-bulletin-popover",
        //     {
        //         width: "300px", // 默认 260px
        //         title: "消息提示",
        //         body: [
        //             {
        //                 type: "title",
        //                 content: "欢迎来到余光的小站 🎉🎉🎉",
        //                 style: "text-aligin: center;",
        //             },
        //             //   {
        //             //     type: 'image',
        //             //     src: '/rvcode_qq.png'
        //             //   }
        //         ],
        //     },
        // ],
    ],
    themeConfig: {
        nav: require("./config/nav.js"),
        sidebar: require("./config/sidebar.js"),
        repo: "https://github.com/webbj97/summary",
        lastUpdated: true, // 最近更新
        editLink: false,
        markdown: {
            lineNumbers: true, // 代码块显示行号
        },
        ads: {
            style: 1,
            image: "/summary/1.jpg",
            text:
                "前端经典 \n《手撕代码合集》《剑指OfferJs版》《CSS实现》都在这里",
            link: "https://webbj97.github.io/fe-questions/",
        },
    },
};
