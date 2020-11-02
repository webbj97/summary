module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        logo: '/public/logo.jpg',
        nav:[
            { text: '前端算法', link: '/algorithm/' }, // 内部链接 以docs为根目录
            { text: '博客', link: 'http://obkoro1.com/' }, // 外部链接
            // 下拉列表
            {
              text: 'GitHub',
              items: [
                { text: 'GitHub地址', link: 'https://github.com/OBKoro1' },
                {
                  text: '算法仓库',
                  link: 'https://github.com/OBKoro1/Brush_algorithm'
                }
              ]
            }
          ]
    }
}