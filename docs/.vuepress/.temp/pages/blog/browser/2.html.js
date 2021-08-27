export const data = {
  "key": "v-7597d9bc",
  "path": "/blog/browser/2.html",
  "title": "浏览器渲染基本原理",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "前言",
      "slug": "前言",
      "children": []
    },
    {
      "level": 2,
      "title": "一、浏览器渲染基本步骤",
      "slug": "一、浏览器渲染基本步骤",
      "children": [
        {
          "level": 3,
          "title": "1.1 构建对象模型",
          "slug": "_1-1-构建对象模型",
          "children": []
        },
        {
          "level": 3,
          "title": "1.2 生成 Render 树",
          "slug": "_1-2-生成-render-树",
          "children": []
        },
        {
          "level": 3,
          "title": "1.3 布局（layout）",
          "slug": "_1-3-布局-layout",
          "children": []
        },
        {
          "level": 3,
          "title": "1.4 绘制（paint）",
          "slug": "_1-4-绘制-paint",
          "children": []
        },
        {
          "level": 3,
          "title": "1.5 小结",
          "slug": "_1-5-小结",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "二、CSS 会阻塞渲染吗？",
      "slug": "二、css-会阻塞渲染吗",
      "children": []
    },
    {
      "level": 2,
      "title": "三、JavaScript 对渲染的影响",
      "slug": "三、javascript-对渲染的影响",
      "children": [
        {
          "level": 3,
          "title": "3.1 js 可能会延缓首次渲染",
          "slug": "_3-1-js-可能会延缓首次渲染",
          "children": []
        },
        {
          "level": 3,
          "title": "3.2 js 会阻止解析器",
          "slug": "_3-2-js-会阻止解析器",
          "children": []
        },
        {
          "level": 3,
          "title": "3.3 小节",
          "slug": "_3-3-小节",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "四、回流与重绘",
      "slug": "四、回流与重绘",
      "children": [
        {
          "level": 3,
          "title": "4.1 回流（reflow）——重排",
          "slug": "_4-1-回流-reflow-——重排",
          "children": []
        },
        {
          "level": 3,
          "title": "4.2 重绘（repaint）",
          "slug": "_4-2-重绘-repaint",
          "children": []
        },
        {
          "level": 3,
          "title": "4.3 浏览器的优化机制",
          "slug": "_4-3-浏览器的优化机制",
          "children": []
        },
        {
          "level": 3,
          "title": "4.4 减少重绘和回流(重排)",
          "slug": "_4-4-减少重绘和回流-重排",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "写在最后",
      "slug": "写在最后",
      "children": []
    }
  ],
  "filePathRelative": "blog/browser/2.md",
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
