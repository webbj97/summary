export const data = {
  "key": "v-722e287e",
  "path": "/blog/browser/3.html",
  "title": "走进 Event Loop",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一、JavaScript 与单线程？",
      "slug": "一、javascript-与单线程",
      "children": []
    },
    {
      "level": 2,
      "title": "二、任务",
      "slug": "二、任务",
      "children": [
        {
          "level": 3,
          "title": "2.1 同步与异步",
          "slug": "_2-1-同步与异步",
          "children": []
        },
        {
          "level": 3,
          "title": "2.2 宏任务与微任务",
          "slug": "_2-2-宏任务与微任务",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "三、EventLoop",
      "slug": "三、eventloop",
      "children": [
        {
          "level": 3,
          "title": "3.1 执行栈",
          "slug": "_3-1-执行栈",
          "children": []
        },
        {
          "level": 3,
          "title": "3.2 对同步、异步的处理",
          "slug": "_3-2-对同步、异步的处理",
          "children": []
        },
        {
          "level": 3,
          "title": "3.3 EventLoop 过程解析",
          "slug": "_3-3-eventloop-过程解析",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "四、示例分析",
      "slug": "四、示例分析",
      "children": [
        {
          "level": 3,
          "title": "4.1 同步+宏任务",
          "slug": "_4-1-同步-宏任务",
          "children": []
        },
        {
          "level": 3,
          "title": "4.2 同步+宏任务+微任务",
          "slug": "_4-2-同步-宏任务-微任务",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "五、写在最后",
      "slug": "五、写在最后",
      "children": [
        {
          "level": 3,
          "title": "5.1 本文参考",
          "slug": "_5-1-本文参考",
          "children": []
        },
        {
          "level": 3,
          "title": "5.2 关于我",
          "slug": "_5-2-关于我",
          "children": []
        },
        {
          "level": 3,
          "title": "5.3 其他沉淀",
          "slug": "_5-3-其他沉淀",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "blog/browser/3.md",
  "git": {
    "updatedTime": 1628247495000,
    "contributors": [
      {
        "name": "yuguang",
        "email": "yuguang@gaoding.com",
        "commits": 1
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
