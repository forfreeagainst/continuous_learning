# QA问答

## CDN

### 聊聊CDN

CDN的作用？

* 加速资源加载：CDN 通过将资源分发到全球各地的边缘节点，使用户可以从离自己最近的节点获取资源，从而减少加载时间。
* 减少服务器压力：将静态资源托管到 CDN 上，可以减少服务器的带宽消耗。
* 减少打包体积：通过 CDN 引入第三方库，可以减少打包文件的体积，从而提升页面加载速度。

CDN 的适用场景？

* 生产环境：在生产环境中使用 CDN，可以显著提升页面加载速度。
* 大型项目：项目中依赖了大量的第三方库，通过 CDN 引入可以减少打包体积。
* 全球用户：如果用户分布在全球各地，使用 CDN 可以加速资源加载。

CDN的缺点？

* 依赖外部服务：如果 CDN 服务不可用，可能导致资源加载失败。
* 版本管理：需要手动管理 CDN 资源的版本，确保与项目兼容。
* 安全性：使用第三方 CDN 可能存在安全风险（如资源被篡改）。

### 在webpack中如何使用CDN?

#### 方案一，使用html-wepback-plugin自动注入CDN资源

修改webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  externals: {
    vue: 'Vue',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      cdn: {
        js: [
          'https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.js',
        ],
        css: [
          'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
        ],
      },
    }),
  ],
};
```

在 HTML模板中使用cdn 变量

```html
<!DOCTYPE html>
<html>
  <head>
    <% for (var i in htmlWebpackPlugin.options.cdn.css) { %>
      <link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>">
    <% } %>
  </head>
  <body>
    <div id="app"></div>
    <% for (var i in htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
  </body>
</html>
```

#### 方案二

步骤 1：在 HTML 中引入 CDN 资源

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.js"></script>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

步骤 2：配置 Webpack 的 externals

```js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  externals: {
    // 告诉 Webpack，vue 模块将通过全局变量 Vue 引入
    vue: 'Vue',
    // 如果需要引入多个库，可以继续添加
    lodash: '_',
  },
};
```

步骤 3：在代码中使用外部模块

```js
// 使用通过 CDN 引入的 Vue
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      message: 'Hello, Vue!',
    };
  },
});

app.mount('#app');
```

### 如何把资源上传到CDN?

1.准备资源

准备好要上传的文件（js文件，css文件，图片文件）

2.选择 CDN 服务提供商

常见 CDN 服务提供商：阿里云CDN、腾讯云CDN、百度云CDN

3.上传资源到 CDN

视服务提供商的情况而定

4.配置 CDN

在 CDN 控制台中配置缓存规则、域名绑定、HTTPS 等。

5.获取资源 URL

上传文件后，CDN 会生成一个资源 URL，可以通过该 URL 访问资源。（eg:https://cdn-net.com/app.js）

6.在项目中使用 CDN 资源

在 HTML 文件中通过 `script` 或 `link` 标签引入 CDN 资源。

## 浏览器与网络相关

### 浏览器输入url后，会发生什么？

1. url解析：解析URL的各个部分。
2. DNS查询：将域名解析为IP地址。
3. 建立TCP连接：通过三次握手与服务器建立链接。
4. 发送HTTP请求：向服务器请求页面资源。
5. 服务器处理请求：服务器生成并返回响应。
6. 接受HTTP请求：浏览器接受并解析响应。
7. 渲染页面：解析HTML、CSS和JavaScript，渲染页面。

渲染页面

1. 解析HTML: 浏览器将HTML 解析为 DOM 树。
2. 解析CSS: 浏览器将 CSS 解析为 CSSOM 树。
3. 构建渲染树：将DOM 树和 CSSOM 树合并为渲染树。
4. 布局（Layout）: 计算每个元素的位置和大小。
5. 绘制（Paint）: 将渲染树绘制到屏幕上。
6. 执行 JavaScript: 如果页面中包含 JavaScript 代码，浏览器会解析并执行。

## js八股文

### js为什么是单线程的？

### 如何理解js的异步？

### 事件循环

## 闲聊Vue

### Vue.js v2.7.16 和 v2.6.14 区别？

* Vue 2.7：虽然引入了 Vue 3 的部分特性，但仍保持与 Vue 2.x 的兼容性，适合希望逐步迁移到 Vue 3
* Vue 2.6：完全兼容 Vue 2.x 生态系统，适合不打算迁移到 Vue 3 的项目。

## 微前端

### 1.基于 iframe 的微前端

实现方式：每个子应用通过 iframe 嵌入到主应用中。

#### 优点

* 天然隔离，子应用之间互不影响。
* 实现简单，适合快速集成。

#### 缺点

* 性能较差，加载速度慢。
* 通信复杂，需通过 postMessage 实现。
* SEO 不友好。

### 2.基于模块联邦（Module Federation）的微前端

实现方式：使用 Webpack 5 的 Module Federation 功能，动态加载远程模块。

#### 优点

* 高效共享依赖，减少重复加载。
* 动态加载，提升性能。

#### 缺点

* 依赖 Webpack 5，技术栈受限。
* 配置复杂，需处理版本兼容性。
