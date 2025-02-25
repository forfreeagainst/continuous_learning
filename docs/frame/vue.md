# Vue

## Vue3

### 常用API

* storeToRefs: store里的数据解构不失去响应式。
* toRaw: 变成未加工的

## Vue2

## Vue3项目如何使用Webpack?

区别于vite创建vue3项目，区别于vue-cli创建vue3项目并把webpack.config.js给隐藏了

### 初始化项目

```bash
mkdir vue3-webpack-project
cd vue3-webpack-project
npm init -y
```

### 安装 Vue 3 和 Webpack 相关的依赖

```bash
npm install vue@3
npm install --save-dev webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc css-loader style-loader html-webpack-plugin
```

* vue@next: Vue 3 的核心库。
* webpack: Webpack 构建工具。
* webpack-cli: Webpack 命令行工具。
* webpack-dev-server: 开发服务器。
* vue-loader@next: 用于加载 .vue 文件。
* @vue/compiler-sfc: 用于编译 Vue 单文件组件。
* css-loader 和 style-loader: 用于处理 CSS 文件。
* html-webpack-plugin: 用于生成 HTML 文件。

### 创建项目结构

```md
vue3-webpack-project/
├── src/
│   ├── App.vue
│   ├── main.js
│   └── index.html
├── webpack.config.js
└── package.json
```

### 编写代码

`src/App.vue`

```vue
<template>
  <div id="app">
    <h1>Hello Vue 3 with Webpack!</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

`src/main.js`

```js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

`src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 3 Webpack</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### 配置webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
};
```

### 配置 `package.json` 脚本

```json
"scripts": {
  "dev": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

### 运行项目

* 运行开发服务器 `npm run dev`
* 构建生产版本 `npm run build`

### 访问项目

在浏览器中访问 http://localhost:9000，你应该会看到 "Hello Vue 3 with Webpack!" 的页面。

### 强化webpack.config.js配置

#### 思考

##### Vue警告: VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__,

```js
const { DefinePlugin } = require("webpack");

new DefinePlugin({
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false,
}),
```

##### style-loader还是vue-style-loader

vue-style-loader：专门为 Vue 项目设计，主要用于处理 Vue 单文件组件（SFC）中的样式。Vue 单文件组件有 style 标签，这些样式可能会有 scoped 属性，用于实现局部样式，vue-style-loader 能够很好地处理这些特性。
style-loader：是一个通用的 Webpack loader，可用于任何 Webpack 项目，不局限于 Vue 项目。它可以将 CSS 代码以 style 标签的形式插入到 HTML 文档的 head 中，适用于处理普通的 CSS 文件。

##### 按需加载elementUiPlus（待测）

```js
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
```

plugin放置

```js
// 按需加载element-plus
AutoImport({
  resolvers: [ElementPlusResolver()],
}),
Components({
  resolvers: [
    ElementPlusResolver({
      // 自定义主题，引入sass
      importStyle: "sass",
    }),
  ],
}),
```

##### 其他看官网配置

* npm install --save-dev mini-css-extract-plugin
* npm install css-minimizer-webpack-plugin --save-dev
* npm install terser-webpack-plugin --save-dev
* ImageMinimizerWebpackPlugin可用tinyPng替代吧，感觉没啥必要
* npm install copy-webpack-plugin --save-dev
* 处理图片（png等）和其他资源（ttf等）
* 处理js（babel-loader、@babel/core）,babel.config.js
* vue-loader开启缓存
* 优化：codeSplit, runtimeChunk等