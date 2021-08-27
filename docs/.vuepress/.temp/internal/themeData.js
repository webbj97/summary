export const themeData = {
  "navbar": [
    {
      "text": "Home",
      "link": "/"
    },
    {
      "text": "前端|博文",
      "link": "/blog/"
    },
    {
      "text": "算法|题解",
      "link": "/algorithm/"
    },
    {
      "text": "CSS|博文",
      "link": "/css/"
    }
  ],
  "repo": "https://github.com/webbj97/summary",
  "lastUpdated": true,
  "editLink": false,
  "markdown": {
    "lineNumbers": true
  },
  "sidebar": {
    "/blog/": [
      {
        "text": "JavaScript基础",
        "children": [
          "/blog/javascript/basic-1",
          "/blog/javascript/basic-2",
          "/blog/javascript/basic-3",
          "/blog/javascript/basic-4",
          "/blog/javascript/basic-5",
          "/blog/javascript/basic-6",
          "/blog/javascript/basic-7",
          "/blog/javascript/basic-8",
          "/blog/javascript/basic-9",
          "/blog/javascript/basic-10",
          "/blog/javascript/basic-11"
        ]
      },
      {
        "text": "JavaScript进阶",
        "children": [
          "/blog/javascript/senior-1",
          "/blog/javascript/senior-2",
          "/blog/javascript/senior-3",
          "/blog/javascript/senior-4",
          "/blog/javascript/senior-5",
          "/blog/javascript/senior-6",
          "/blog/javascript/senior-7",
          "/blog/javascript/senior-8",
          "/blog/javascript/senior-9"
        ]
      },
      {
        "text": "TypeScript基础",
        "children": [
          "/blog/typescript/basic-1",
          "/blog/typescript/basic-2",
          "/blog/typescript/basic-3",
          "/blog/typescript/basic-4",
          "/blog/typescript/5",
          "/blog/typescript/6"
        ]
      },
      {
        "text": "ES6",
        "children": [
          "/blog/es6/1",
          "/blog/es6/2",
          "/blog/es6/3",
          "/blog/es6/4",
          "/blog/es6/5",
          "/blog/es6/6",
          "/blog/es6/7",
          "/blog/es6/11"
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "logo": null,
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLinkText": "Edit this page",
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
