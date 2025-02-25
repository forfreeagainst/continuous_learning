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
