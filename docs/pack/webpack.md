# Webapck

参考官网很重要，官网不会过时。

## 核心概念

* entry: 入口文件
* output: 输出文件
* loader:

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在更高层面，在 webpack 的配置中，loader 有两个属性：

test 属性，识别出哪些文件会被转换。
use 属性，定义出在进行转换时，应该使用哪个 loader。

* plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

* mode: 模式

通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。

* browser compatibility: 浏览器兼容性

Webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）。webpack 的 import() 和 require.ensure() 需要 Promise。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 提前加载 polyfill。

* environment: 环境

Webpack 5 运行于 Node.js v10.13.0+ 的版本。

## 入口起点 entry point

### 单入口文件

### 多入口文件

#### 常见场景

##### :star: 分离 app(应用程序) 和 vendor(第三方库) 入口

webpack.config.js

```js
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
};
```

webpack.prod.js

```js
module.exports = {
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
};
```

webpack.dev.js

```js
module.exports = {
  output: {
    filename: '[name].bundle.js',
  },
};
```

:star: 这是什么？ 这是告诉 webpack 我们想要配置 2 个单独的入口点（例如上面的示例）。

:star: 为什么？ 这样你就可以在 vendor.js 中存入未做修改的必要 library 或文件（例如 Bootstrap, jQuery, 图片等），然后将它们打包在一起成为单独的 chunk。内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。

而在 webpack 4 中不鼓励这样做。而是使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。不要 为 vendor 或其他不是执行起点创建 entry。

##### 多页面应用程序

webpack.config.js

```js
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
};
```

这是什么？ 我们告诉 webpack 需要三个独立分离的依赖图（如上面的示例）。

为什么？ 在多页面应用程序中，server 会拉取一个新的 HTML 文档给你的客户端。页面重新加载此新文档，并且资源被重新下载。然而，这给了我们特殊的机会去做很多事，例如使用 optimization.splitChunks 为页面间共享的应用程序代码创建 bundle。由于入口起点数量的增多，多页应用能够复用多个入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。

提示：

根据经验：每个 HTML 文档只使用一个入口起点。具体原因请参阅此 issue。

## 输出 output

可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。

### 单入口起点

webpack.config.js

```js
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
```

### 多个入口起点

webpack.config.js

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

![理解理解](./image.png)

### 高级进阶

以下是对资源使用 CDN 和 hash 的复杂示例：

config.js

```js
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[fullhash]',
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',
  },
};
```

如果在编译时，不知道最终输出文件的 publicPath 是什么地址，则可以将其留空，并且在运行时通过入口起点文件中的 __webpack_public_path__ 动态设置

```js
__webpack_public_path__ = myRuntimePublicPath;

// 应用程序入口的其余部分
```

## loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

### 用例

webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        //loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)
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
```

### 编写自己的loader

## plugin

### 剖析

webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象。

ConsoleLogOnBuildWebpackPlugin.js

```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack 构建正在启动！');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中重复使用。

### 配置方式

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

ProgressPlugin 用于自定义编译过程中的进度报告，HtmlWebpackPlugin 将生成一个 HTML 文件，并在其中使用 script 引入一个名为 my-first-webpack.bundle.js 的 JS 文件。

### 提示

你知道吗：以上看到的示例和 webpack 运行时(runtime)本身 极其类似。webpack 源码 中隐藏有大量使用示例，你可以将其应用在自己的配置和脚本中。
 
## 配置 （Configuration）

### 多个target

除了可以将单个配置导出为 object，function 或 Promise 以外，还可以将其导出为多个配置。

### 使用其它配置语言

Webpack 支持由多种编程和数据语言编写的配置文件。

## 模块（Modules）

### 如何理解loader和modules

Module（模块）

在 Webpack 里，Module 指的是项目中各个独立的文件或代码单元。Webpack 将项目中的所有文件（如 JavaScript、CSS、图片等）都视为模块，无论这些文件是自己编写的，还是从外部引入的第三方库。每个模块都有自己的功能和作用，并且可以通过特定的方式相互引用和依赖。
例如，在一个前端项目中，可能会有多个 JavaScript 文件，每个文件负责不同的功能，如一个文件处理用户输入，另一个文件负责与服务器通信，这些文件都可以看作是独立的模块。

Loader（加载器）

Loader 是 Webpack 中的一个重要概念，它是用于处理不同类型模块的转换器。由于 Webpack 本身只能理解 JavaScript 和 JSON 文件，对于其他类型的文件（如 CSS、图片、TS 等），就需要使用 Loader 来将这些文件转换为 Webpack 能够处理的模块。
例如，当你在项目中引入一个 CSS 文件时，Webpack 无法直接处理它，这时就需要使用 style-loader 和 css-loader 来将 CSS 文件转换为 JavaScript 模块，以便 Webpack 能够对其进行打包处理。

### 何为Webpack模块

与 Node.js 模块相比，webpack 模块能以各种方式表达它们的依赖关系。下面是一些示例：

* ES2015 import 语句
* CommonJS require() 语句
* AMD define 和 require 语句
* css/sass/less 文件中的 @import 语句。
* stylesheet url(...) 或者 HTML的 img src文件中的图片链接。

### 支持的模块类型

Webpack 天生支持如下模块类型：

* ECMAScript 模块
* CommonJS 模块
* AMD 模块
* Assets
* WebAssembly 模块

:star: 通过 loader 可以使 webpack 支持多种语言和预处理器语法编写的模块。loader 向 webpack 描述了如何处理非原生 模块，并将相关依赖引入到你的 bundles中。 webpack 社区已经为各种流行的语言和预处理器创建了 loader，其中包括：

* CoffeeScript
* TypeScript
* ESNext (Babel)
* Sass
* Less
* Stylus
* Elm

## 模块解析（Module Resolution）

### enhanced-resolve

使用 enhanced-resolve，webpack 能解析三种文件路径

* 绝对路径
* 相对路径
* 模块路径

### 解析 loader

loader 的解析规则也遵循特定的规范。但是 resolveLoader 配置项可以为 loader 设置独立的解析规则。

### 缓存

每次文件系统访问文件都会被缓存，以便于更快触发对同一文件的多个并行或串行请求。在 watch 模式 下，只有修改过的文件会被从缓存中移出。如果关闭 watch 模式，则会在每次编译前清理缓存。