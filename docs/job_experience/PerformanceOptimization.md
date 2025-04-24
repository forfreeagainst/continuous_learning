# 性能优化

## 首屏加载

### 首屏加载慢原因

* 网络原因：F12 Network 网络 切换 网速:快速4G

### 性能指标

* FP: First Paint：白屏时间
* FCP: First Conent Paint (/peɪnt/)：首屏时间
* LCP: Large Content(kɑːntent) Paint：最大内容绘制时间
* TTI： time to interactive 可交互时间
* TTFB：time to first byte 首字节时间 网络性能 服务器响应能力

### 如何收集

p95

其他性能优化手段：网络请求、资源预处理、资源压缩、资源的延后处理

### 优化首屏加载

#### vue3的异步组件

首屏的组件需要某个条件才会显示在页面。（v-if，仍然加载组件资源）

```js
// Vue3中的异步组件
// import cropDialog from './cropDialog.vue';

// 异步组件
const cropDialog = defineAsyncComponent(() => {
    return import('./cropDialog.vue');
})
```

#### 图片治理

 base64图片，方案：图片占位+使用网络图片（cdn）(5s -> 3s)

#### 脚本治理

#### css治理

unocss（原子化 css, 最小化 css 类为单位，实现高度可复用性，css文件尽可能小）

#### 减少HTTP请求

* 合并CSS和JavaScript文件，减少HTTP请求数量。（跟自定义插件InlineChunkWebpackPlugin）

#### 白屏时间

骨架屏（有内容，让用户感觉快），Vue框架执行之前

```html
<div id="app">
    <div>优化视觉体验，白屏看起来不那么难受</div>
</div>
```

#### 代码分割与路由懒加载

* 路由懒加载：使用Vue Router的 import() 语法 动态加载路由组件，减少首屏加载的代码量。
* 组件懒加载：对于非首屏的组件，可以使用import() 语法进行懒加载。

### 如何计算首屏加载时间/分析性能瓶颈

#### 性能监控与分析

使用工具（如Lighthouse、WebPageTest）分析应用性能，找出瓶颈并进行针对性优化。

#### 使用Performance

```js
// Vue项目
window.onload = function() {
    // MDN：timing即将废弃的属性
    const timing = performance.timing.domComplete - performance.timing.navigationStart;
    console.log("🚀 ~ timing:", timing)
    //改写
    // 观察的性能事件被记录时将调用 PerformanceObserverCallback 回调。调用回调时，其第一个参数是 性能观察条目列表，第二个参数是 观察者 对象。
    const observer = new PerformanceObserver(function (list, obj) {
        list.getEntries().forEach(entry => {
            console.log(entry.domComplete)
        })
    });
    observer.observe({ entryTypes: ["navigation"] });
}
```

* navigationStart: 页面导航开始的时间戳
* unloadEventStart: 卸载前一个页面的事件开始时间
* unloadEventEnd: 卸载前一个页面的事件结束时间
* redirectStart: 第一个重定向开始的时间
* redirectEnd: 最后一个重定向结束的时间
* fetchStart: 浏览器开始获取文档的时间
* domainLookupStart: DNS 查询开始的时间
* domainLookupEnd: DNS 查询结束的时间
* connectStart: TCP 连接开始的时间
* connectEnd: TCP 连接结束的时间
* sourceConnectionStart: 安全连接开始的时间（仅HTTPS）
* requestStart: 浏览器向服务器发送请求的时间
* responseStart: 浏览器从服务器接收第一个字节的时间
* responseEnd: 浏览器从服务器接收最后一个字节的时间
* domLoading: 解析器开始解析 DOM 的时间
* domInteractive: DOM 解析完成，但资源（如图片、样式表）可能仍在加载的时间
* domContentLoadedEventStart: DOMContentLoaded 事件开始的时间
* domContentLoadedEventEnd: DOMContentLoaded 事件结束的时间
* domComplete: DOM 和所有子资源都已完全加载的时间
* loadEventStart: load 事件开始的时间
* loadEventEnd: load 事件结束的时间

#### F12

NetWork网络 右下角有个加载时间load：453毫秒，这就是首屏加载时间
