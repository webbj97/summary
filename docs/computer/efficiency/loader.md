# Loader

> Webpack 支持使用 loader 对文件进行预处理。你可以构建包括 JavaScript 在内的任何静态资源。并且可以使用 Node.js 轻松编写自己的 loader。—— MDN

## 什么是loader？

loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。它只专注于transform！！！！！！

* loader 用于对模块的源代码进行转换。
* loader 可以使你在 `import` 或 "load(加载)" 模块时预处理文件。


## loader 特性

`loader` 支持链式调用。链中的每个 `loader` 会将转换应用在已处理过的资源上。一组链式的 `loader` 将按照相反的顺序执行。链中的第一个 `loader` 将其结果（也就是应用过转换后的资源）传递给下一个 `loader`，依此类推。最后，链中的最后一个 `loader`，返回 `webpack` 所期望的 `JavaScript`。

**使用样式loader**

1. style-loader 将模块导出的内容作为样式并添加到 DOM 中
2. css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代
3. less-loader 加载并编译 LESS 文件
4. sass-loader 加载并编译 SASS/SCSS 文件

## 安装


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
                    "css-loader", // 解析css
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

## 使用 loader

在你的应用程序中，有两种使用 loader 的方式：

* 配置方式（推荐）：在 webpack.config.js 文件中指定 loader。
* 内联方式：在每个 import 语句中显式指定 loader。

`module.rules` 允许你在 `webpack` 配置中指定多个 `loader`。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。同时让你对各个 loader 有个全局概览：

`loader` 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在下面的示例中，从 less-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。

以安装style-loader为例

```bash
// 替换style-loader为其他loader即可

npm install --save-dev style-loader / yarn add -D style-loader
```

下面是我在使用 **样式loader** 时的简单配置：

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
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader, // 将样式文件打到html的style内，或者抽离为一个css文件引入到html中
                    "css-loader", // 解析css文件
                    "less-loader", // less解析为css
                ],
            },
            { test: /\.ts$/, use: "ts-loader" },
        ],
    },
    // plugins 数组是 webpack 打包期间会用到的一些插件列表
    plugins: [htmlPlugin, ...(devMode ? [] : [MiniCssPlugin])],
};
```

> 尽可能使用 module.rules，因为这样可以减少源码中样板文件的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。 —— MDN

另外注意：官方 `loader` 和第三方 `loader` 其实也不少，他们的能力千差万别，你很难做到全面掌握，我认为我们只需要它转换器的身份，在需要”转换“文件的时候合理正确的描述出自己的需求，应该就能找到想要的 `loader`。
