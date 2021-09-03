export const data = {
  "key": "v-6b51897a",
  "path": "/blog/browser/%E8%B7%A8%E5%9F%9F.html",
  "title": "",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一、JSONP",
      "slug": "一、jsonp",
      "children": []
    },
    {
      "level": 2,
      "title": "二、CORS",
      "slug": "二、cors",
      "children": []
    },
    {
      "level": 2,
      "title": "三、document.domain",
      "slug": "三、document-domain",
      "children": []
    },
    {
      "level": 2,
      "title": "四、postMessage",
      "slug": "四、postmessage",
      "children": []
    }
  ],
  "filePathRelative": "blog/browser/跨域.md",
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
