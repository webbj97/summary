# Loader

> Webpack 支持使用 loader 对文件进行预处理。你可以构建包括 JavaScript 在内的任何静态资源。并且可以使用 Node.js 轻松编写自己的 loader。—— MDN

## 一、什么是loader

loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。它只专注于transform！！！！！！

loader
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

示例
例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader：

npm install --save-dev css-loader ts-loader
然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：

webpack.config.js

module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};
使用 loader
在你的应用程序中，有两种使用 loader 的方式：

配置方式（推荐）：在 webpack.config.js 文件中指定 loader。
内联方式：在每个 import 语句中显式指定 loader。
注意在 webpack v4 版本可以通过 CLI 使用 loader，但是在 webpack v5 中被弃用。

Configuration
module.rules 允许你在 webpack 配置中指定多个 loader。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。同时让你对各个 loader 有个全局概览：

loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在下面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。查看 loader 功能 章节，了解有关 loader 顺序的更多信息。

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
内联方式
可以在 import 语句或任何 与 "import" 方法同等的引用方式 中指定 loader。使用 ! 将资源中的 loader 分开。每个部分都会相对于当前目录解析。

import Styles from 'style-loader!css-loader?modules!./styles.css';
通过为内联 import 语句添加前缀，可以覆盖 配置 中的所有 loader, preLoader 和 postLoader：

使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)

import Styles from '!style-loader!css-loader?modules!./styles.css';
使用 !! 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）

import Styles from '!!style-loader!css-loader?modules!./styles.css';
使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders

import Styles from '-!style-loader!css-loader?modules!./styles.css';
选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。

Tip
尽可能使用 module.rules，因为这样可以减少源码中样板文件的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。

loader 特性
loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
loader 可以是同步的，也可以是异步的。
loader 运行在 Node.js 中，并且能够执行任何操作。
loader 可以通过 options 对象配置（仍然支持使用 query 参数来设置选项，但是这种方式已被废弃）。
除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块。
插件(plugin)可以为 loader 带来更多特性。
loader 能够产生额外的任意文件。
可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言转译（或编译）和 更多其他特性。

解析 loader
loader 遵循标准 模块解析 规则。多数情况下，loader 将从 模块路径 加载（通常是从 npm install, node_modules 进行加载）。

我们预期 loader 模块导出为一个函数，并且编写为 Node.js 兼容的 JavaScript。通常使用 npm 进行管理 loader，但是也可以将应用程序中的文件作为自定义 loader。按照约定，loader 通常被命名为 xxx-loader（例如 json-loader）。更多详细信息，请查看 编写一个 loader。




下面我们来简单看下常用loader都有哪些：



### 二、常见的样式loader

1. style-loader 将模块导出的内容作为样式并添加到 DOM 中
2. css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代
3. less-loader 加载并编译 LESS 文件
4. sass-loader 加载并编译 SASS/SCSS 文件

安装：

```bash
// 替换style-loader为其他loader即可

npm install --save-dev style-loader / yarn add -D style-loader
```

这里列出了官方给出的例子：

```js
module.exports = {
    // 入口
    entry: {},
    // 输出
    output: {},
    // 通过选择 development, production 或 none 之中的一个
    mode: devMode ? "development" : "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader", // less解析为css
                ],
            },
            { test: /\.ts$/, use: "ts-loader" },
        ],
    },
    // plugins 数组是 webpack 打包期间会用到的一些插件列表
    plugins: [htmlPlugin, ...(devMode ? [] : [MiniCssPlugin])],
    // 配置模块如何解析
    resolve: {
        // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
        extensions: [".js", ".ts", ".jsx", ".json"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        client: {
            progress: true,
        },
        open: true, // 初次打包完成后，自动打开浏览器
        host: "127.0.0.1", // 实时打包所使用的主机地址
        port: 8090,
        hot: true, // 开启模块热替换
    },
};
```





### 2.1 babel-loader 

此 `package` 允许你使用 `Babel` 和 `webpack` 转译 `JavaScript` 文件。