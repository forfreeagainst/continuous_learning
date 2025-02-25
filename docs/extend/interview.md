# 面试题

## 工程化

### :star: 前端构建工具怎么选择？

#### webpack的优势

* 强大的模块化支持，能处理复杂的资源
* 兼容多种环境
* 丰富的生态系统和插件，遇到问题时，可以轻松找到解决方案或参考案例。

##### 模块化支持

Webpack 是一个模块化打包工具，能够将项目中的 JavaScript、CSS、图片、字体等资源视为模块，并通过依赖关系进行管理。Vue 3 的单文件组件（.vue 文件）也可以通过 vue-loader 被 Webpack 处理为模块，从而实现模块化开发。

优点：代码结构更清晰，易于维护和复用。

适用场景：适合大型项目，尤其是需要模块化管理的场景。

##### 强大的生态系统

Webpack 拥有丰富的插件和加载器（Loader），可以处理各种类型的资源文件。例如：

vue-loader：处理 .vue 文件。

babel-loader：将 ES6+ 代码转换为兼容性更好的 ES5 代码。

css-loader 和 style-loader：处理 CSS 文件。

file-loader 和 url-loader：处理图片、字体等静态资源。

优点：灵活扩展，满足各种开发需求。

适用场景：需要处理多种资源类型的项目。

##### 兼容性

Webpack 支持从旧版 JavaScript 到最新特性的转换，同时兼容多种浏览器环境。

优点：确保代码在不同环境下的兼容性。

适用场景：需要兼容旧版浏览器的项目。

#### webpack对比 Vite, 虽然 Webpack 有很多优点，但也要注意它的缺点：

* 构建速度较慢：Webpack 的构建速度在大型项目中可能较慢，尤其是在开发环境下。
* 配置复杂：Webpack 的配置相对复杂，初学者可能需要花费更多时间学习。

### :star: webpack常用的loader?

以前有资源loader，现在改为了资源模块 （type: "asset"等）。资源模块(asset module)是一种模块类型，它允许使用
资源文件（字体，图标等）而无需配置额外 loader。(file-loader,raw-loader,url-loader, webpack5官网说它们将在不久
的将来被淘汰)。
<!-- 
曾经的用法，没啥用，别看
raw-loader: 加载文件原始内容
file-loader: 把文件输出到文件夹中，在代码中通过相对url去引用输出的文件（图片 字体）
url-loader: 与file-loader类似，区别，可以设置阈值，大于多少kb, 交给file-loader
 -->

语法转化

* babel-loader:  将ES2015+ 代码并将其转换为 ES5
* ts-loader: 将typescript转换为javascript

样式

* style-loader 将模块导出的内容作为样式并添加到 DOM 中
* css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
* less-loader 加载并编译 LESS 文件
* sass-loader 加载并编译 SASS/SCSS 文件
* postcss-loader 使用 PostCSS 加载并转换 CSS/SSS 文件，处理css兼容性问题
* stylus-loader 加载并编译 Stylus 文件

框架

vue-loader 加载并编译 Vue 组件

构建速度

thread-loader: 多线程打包

### :star: webpack常用的plugin?

* DefinePlugin: 允许创建一个在编译时可配置的全局常量。定义环境变量。
* HtmlWebpackPlugin: 快速创建 HTML 文件来服务 bundles。能够自动生成一个或多个HTML文件，自动帮我们引用打包后的JavaScript和CSS文件‌
* MiniCssExtractPlugin：为每一个包含了 CSS 的 JS 文件创建一个 CSS 文件。把含有css的js文件，创建单独的css文件，通过link标签进行加载。js会堵塞页面渲染，css在js时加载，用户进来，会出现闪屏现象，用户体验不好。
* TerserWebpackPlugin:自定义js压缩方式，比如可以结合多线程。
* webpack-bundle-analyzer: 可视化 webpack 输出文件的体积。它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式
* eslint-webpack-plugin: 该插件使用 eslint 来查找和修复 JavaScript 代码中的问题。
* speed-measure-webpack-plugin（Asome-webpack）: 看到每个loader、plugin的执行耗时
* CssMinimizerWebpackPlugin（node >= 18.12.0）:压缩css代码
* ImageMinimizerWebpackPlugin（node >= 18.12.0）:压缩本地的静态图片
* CopyWebpackPlugin: 将已存在的单个文件或整个目录复制到构建目录。

### :star: loader和plugin的区别？

* 定义和作用

定义：Loader 是一个转换器，用于对模块的源代码进行转换。它本质上是一个函数，接收源文件内容作为参数，返回转换后的内容。

作用：Webpack 本身只能处理 JavaScript 和 JSON 文件，对于其他类型的文件（如 CSS、图片、TypeScript 等），就需要使用 Loader 来将这些文件转换为 Webpack 能够处理的模块。

定义：Plugin 是一个扩展器，它可以在 Webpack 构建流程的特定生命周期钩子中插入自定义的构建行为。

作用：Plugin 可以实现范围更广的任务，比如代码压缩、资源优化、生成 HTML 文件、分割代码等，它可以作用于整个构建过程。

综上所述，Loader 主要负责模块的转换，而 Plugin 则用于扩展 Webpack 的功能，在整个构建过程中执行各种自定义任务。

### webpack 构建流程简单说一下

### 使用webpack 开发时，你用过哪些可以提高效率的插件？

### 文件指纹是什么？ 怎么用？

文件指纹：打包后输出的文件名的后缀。它可以用来。

* 缓存优化：通过文件指纹，浏览器可以缓存文件，同时确保文件内容变化时，文件名也会变化，从而加载新文件。
* 版本控制：文件指纹可以用于标识文件版本，确保用户总是加载最新的文件。
* 避免冲突：生成唯一的文件名，避免多个文件重名的问题。

Webpack 提供了以下几种文件指纹占位符：

* [hash]：基于整个项目构建生成的哈希值，所有文件共享同一个哈希值。
* [chunkhash]：基于每个 chunk 内容生成的哈希值，适用于 JavaScript 文件。
* [contenthash]：基于文件内容生成的哈希值，通常用于 CSS 或提取的文件（如通过 mini-css-extract-plugin 提取的 CSS 文件）。

文件指纹的生成规则

* [hash]：每次构建都会生成一个新的哈希值，所有文件共享。
* [chunkhash]：基于每个 chunk 的内容生成，适用于 JavaScript 文件。
* [contenthash]：基于文件内容生成，适用于 CSS 或提取的文件。

js 的文件指纹设置

```javascript
module.exports = {
    entry: {app: "./src/app.js", jquery: "./src/jquery.js"},
    output: { filename: '[name][chunkhash:8].js', path: __dirname + '/dist' },
}
```

css的文件指纹设置

```javascript
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({ filename: `[name][contenthash:8].css`})
    ]
}
```

图片、字体的文件指纹设置

```javascript
module.exports = {
    output: {
        // 所有文件的输出路径
        // 开发模式没有输出
        path: undefined,
        // 入口文件打包输出文件名
        filename: "static/js/[name].js",
        // 给打包输出的其他文件命名
        chunkFilename: "static/js/[name].chunk.js",
        // 图片、字体等通过type:asset处理资源命名方式
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
}
```

### star: 如何优化webpack 的构建速度？

* 多进程进程并行压缩。eg: TerserWebpackPlugin的配置parallel。
* 使用高版本的webpack和node.js，性能通常会有显著提升。
* 多线程处理耗时的loader或plugin, 提升构建速度。eg: babel-loader, eslintWebpackPlugin
<!-- 开发环境, 多线程处理语法转化thread-loader+babel-loader, eslint代码检查 -->
* 充分利用缓存提升二次构建速度。eg: babel-loader
* 通过esModule进行 tree shaking， 把没有用过的模块进行标记，最终从 bundle 中去掉。eg: lodash-es
* 使用 include、exclude, resolve配置（eg:resolve.extensions,resolve.modules）缩小打包作用域。
* 使用speed-measure-webpack-plugin分析每个loader、plugin的执行耗时，使用webpack-bundle-analyzer分析
打包结果，看是否还可以进行优化。
* One of,每个文件只能被其中一个loader配制处理。eg: css不走less配制，sass配制
<!-- include:只处理某些文件
exclude:排除某些文件，其他文件都处理
注意：node_modules已经被构建结束
eslint不需要检查node_modules,
babel不需要编译node_modules
引入的外部样式，也不需要处理 -->

#### ES Module 的代码可以被 Tree Shaking?

静态结构：

* ES Module 的 import 和 export 语句必须在顶层作用域，不能动态加载。
* 这种静态特性使得打包工具在编译时就能确定模块的依赖关系，无需运行代码。

确定依赖：

* 打包工具通过静态分析，可以准确识别哪些模块和函数被使用，哪些未被使用。
* 未使用的代码会被标记为“死代码”，并在最终打包时移除。

补充：

工具支持：

* Webpack、Rollup 等工具利用 ES Module 的静态特性，结合作用域分析和副作用检测，实现 Tree Shaking。

#### for example

通过 resolve 配置减少模块查找时间

```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置别名
    },
    extensions: ['.js', '.json'], // 减少文件扩展名搜索
    modules: [path.resolve(__dirname, 'node_modules')], // 指定模块搜索目录
  },
};
```

#### for example

开发环境，多线程处理语法转换

```js
module: {
  rules: [
    {
      test: /\.js$/,
      // exclude: /node_modules/, // 排除node_modules下的文件，其他文件都处理
      include: path.resolve(__dirname, "../src"), // 只处理src下的文件，其他文件不处理
      use: [
        {
          loader: "thread-loader", // 开启多进程
          options: {
            works: threads, // 进程数量
          },
        },
        {
          loader: "babel-loader",
          options: {
            // presets: ["@babel/preset-env"],
            cacheDirectory: true, // 开启babel缓存
            cacheCompression: false, // 关闭缓存文件压缩
            plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
          },
        },
      ],
    },
  ],
}
```

### package.json中dependencies和devDependencies的区别？

* dependencies是项目在生产环境中运行所需要的依赖，devDependencies开发中所需要的依赖。
* 当我们使用npm install进行安装依赖，默认安装的是生产环境的依赖。如果想要安装开发环境的
依赖，我们可以使用npm install --dev。
* 生产依赖通常包括运行时所需要的库、框架、工具。而开发依赖通常包括测试框架jest等，
构建工具typescript、vite等，代码检查工具eslint等。

### webpack5升级点有哪些？

