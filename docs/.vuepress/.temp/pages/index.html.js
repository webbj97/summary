export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "en-US",
  "frontmatter": {
    "home": true,
    "heroImage": "title.jpg",
    "actionText": "快速开始",
    "actionLink": "/blog/",
    "features": [
      {
        "title": "前端进阶",
        "details": "这里有着前端基础——JavaScript最全面的基础总结，帮助你打牢前端基础！"
      },
      {
        "title": "算法与数据结构",
        "details": "博主正在系统的整理算法思想，并与LeetCode练习题相互结合，一起加油！"
      },
      {
        "title": "有趣的CSS",
        "details": "相信在这里，你一定能找到Css之美"
      }
    ],
    "footer": "MIT Licensed | Copyright © 2020-present 余光"
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "README.md",
  "git": {
    "updatedTime": 1609320786000,
    "contributors": [
      {
        "name": "yuguang",
        "email": "yuguang@gaoding.com",
        "commits": 8
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
