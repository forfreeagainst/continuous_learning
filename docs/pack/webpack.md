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