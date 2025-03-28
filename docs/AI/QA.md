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

### 缓存（摘录，未核验）

缓存是前端性能优化的重要手段之一，合理使用缓存可以显著减少网络请求，提升页面加载速度和用户体验。在前端开发中，
缓存主要分为强缓存和协商缓存 两种机制，此外还有一些其他缓存策略。

1.强缓存

* 强缓存是通过设置HTTP 响应头 来告诉浏览器，在缓存有效期内直接使用本地缓存，而无需向服务器发送请求。
强缓存主要通过`Cache-Control`/kæʃ/ 和`Expires`/ɪkˈspaɪərz/两个HTTP响应头来实现。
* 特点-优点：减少网络请求，提升页面加载速度。
* 特点-缺点：如果资源更新，客户端在缓存有效期内无法获取最新资源。

2.协商缓存

* 当强缓存失效时，浏览器会向服务器发送请求，服务器通过校验资源的修改时间或唯一标识来决定是否返回新资源。如果资源
未修改，服务器返回304 Not Modified, 浏览器使用本地缓存。
* 协商缓存主要通过以下两组 HTTP 头实现。Last-Modified 和 If-Modified-Since， ETag 和 
If-None-Match。/nʌn/ /mætʃ/
* 特点-优点：确保客户端始终使用最新的资源。
* 特点-缺点：每次请求都需要与服务器通信，增加了网络开销。

3.Service Worker 缓存（策略缓存）

4.CDN缓存

5.LocalStorage 和 SessionStorage

6.IndexedDB

:star: Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。如果出于某些原因你想要强制 Vite 重新构建依赖项，你可以在启动开发服务器时指定 --force 选项，或手动删除 node_modules/.vite 缓存目录。

## html,css,js八股文

### js为什么是单线程的？

#### 最初的设计目的

JavaScript 最初被设计为一种浏览器脚本语言，主要用于：

* 操作 DOM（文档对象模型）
* 处理用户交互（点击、输入等）
* 执行简单的页面动画和表单验证

这些任务不需要多线程，反而多线程会带来复杂的同步问题。

#### DOM 操作的复杂性

* 如果允许多线程同时操作 DOM，会导致竞态条件（race condition）
* 需要复杂的锁机制来保证线程安全
* 这会大大增加开发复杂度和出错概率

单线程模型避免了这些问题，使 DOM 操作变得简单可靠。

#### 总结

虽然它是单线程的，但通过事件循环和异步编程模型，以及后来引入的 Web Workers，它仍然能够高效处理各种任务，
包括复杂的现代Web应用。

### 如何理解js的异步？

JavaScript是单线程的，这意味着它一次只能执行一个任务。如果没有异步机制，

* 长时间运行的任务会堵塞主线程
* 用户界面会冻结，无法响应用户操作
* 网络请求 等 I/O 操作会导致极差的用户体验

### 事件循环

JavaScript 的事件循环是其异步编程的核心机制，它使得单线程的 JavaScript 能够处理非阻塞 I/O 操作，实现高效的并发执行。

#### 宏任务

不是微任务

* setTimeout / setInterval
* I/O 操作 (文件读取、网络请求)
* UI 渲染
* DOM 事件回调
* setImmediate (Node.js)

#### 微任务

* Promise.then / catch / finally
* MutationObserver
* process.nextTick（Node.js）
* queueMicrotask

#### 执行顺序

宏任务->当前产生的所有微任务->GUI渲染->宏任务

<!-- allow pasting 允许粘贴 -->

console.log('Script start'); // 1. 同步代码立即执行

setTimeout(() => {          // 2. 异步API，回调进入队列
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => { // 3. 微任务
  console.log('Promise');
});

console.log('Script end');   // 4. 同步代码

### requestAnimationFrame 和IntersectionObserver 用途，兼容性怎么样？

特性	requestAnimationFrame	IntersectionObserver
用途	动画帧调度（高频更新）	元素可见性检测（低频事件）
触发频率	每帧一次（60Hz≈16.7ms）	仅在元素可见性变化时触发
性能影响	需手动管理，避免过度绘制	原生优化，对性能影响极小
兼容性	IE10+	现代浏览器 + Polyfill（IE 需额外处理）
替代方案	setTimeout/setInterval	手动监听 scroll + getBoundingClientRect

IntersectionObserver Polyfill 方案

`npm install intersection-observer`

然后在入口文件导入：`import 'intersection-observer';`

requestAnimationFrame Polyfill（通常不需要，但极端情况下）：

```js
window.requestAnimationFrame = window.requestAnimationFrame || 
                             window.webkitRequestAnimationFrame || 
                             window.mozRequestAnimationFrame || 
                             (cb => setTimeout(cb, 16));
```


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

## 网络

### 简单请求和复杂请求？

简单请求和复杂请求是HTTP请求的两种类型，主要区别在于是否触发CORS `预检请求`。

简单请求

特点

* 不触发预检请求。
* 浏览器直接发送请求，服务器响应后根据CORS策略决定是否允许。

复杂请求：

特点

* 触发预检请求（OPTIONS方法）。
* 服务器确认允许后，浏览器才发送实际请求。