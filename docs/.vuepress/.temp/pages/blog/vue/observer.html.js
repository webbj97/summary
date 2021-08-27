export const data = {
  "key": "v-c3b77ff4",
  "path": "/blog/vue/observer.html",
  "title": "数据监听（响应式）",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一、数据驱动视图？",
      "slug": "一、数据驱动视图",
      "children": []
    },
    {
      "level": 2,
      "title": "二、数据检测（Vue 2.x）",
      "slug": "二、数据检测-vue-2-x",
      "children": [
        {
          "level": 3,
          "title": "2.1 了解Object.defineProperty",
          "slug": "_2-1-了解object-defineproperty",
          "children": []
        },
        {
          "level": 3,
          "title": "2.2 一个极简的双向绑定",
          "slug": "_2-2-一个极简的双向绑定",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "三、基于数据劫持的基本实现",
      "slug": "三、基于数据劫持的基本实现",
      "children": [
        {
          "level": 3,
          "title": "3.1 实现思路",
          "slug": "_3-1-实现思路",
          "children": []
        },
        {
          "level": 3,
          "title": "3.2 依赖管理器——Dep",
          "slug": "_3-2-依赖管理器——dep",
          "children": []
        },
        {
          "level": 3,
          "title": "3.3 监听者——Observer",
          "slug": "_3-3-监听者——observer",
          "children": []
        },
        {
          "level": 3,
          "title": "3.4 订阅者——watcher",
          "slug": "_3-4-订阅者——watcher",
          "children": []
        },
        {
          "level": 3,
          "title": "3.5 挂载到Vue",
          "slug": "_3-5-挂载到vue",
          "children": []
        },
        {
          "level": 3,
          "title": "3.5 任重道远的defineProperty",
          "slug": "_3-5-任重道远的defineproperty",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "四、数据检测（Vue 3.x）",
      "slug": "四、数据检测-vue-3-x",
      "children": [
        {
          "level": 3,
          "title": "4.1 重构极简版双向绑定",
          "slug": "_4-1-重构极简版双向绑定",
          "children": []
        },
        {
          "level": 3,
          "title": "4.2 proxy的优势",
          "slug": "_4-2-proxy的优势",
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
  "filePathRelative": "blog/vue/observer.md",
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
