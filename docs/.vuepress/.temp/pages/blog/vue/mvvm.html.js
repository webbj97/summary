export const data = {
  "key": "v-fec15708",
  "path": "/blog/vue/mvvm.html",
  "title": "MVVM",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "blog/vue/mvvm.md",
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
