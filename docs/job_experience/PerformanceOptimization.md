# 性能优化

## Q & A

前端开发，说一下你的性能优化是怎么做的？你们公司性能优化的衡量指标有哪些？是否有真实用户的衡量指标？

## 设备

Android 版本， Android 5.0及以上
IOS版本，IOS9.0及以上
屏幕兼容性：自适应屏幕

## 性能需求

1. 在 95%的情况下，一般时段响应事件不超过1.5秒，高峰时段不超过3秒。
打开功能菜单从点击到 第一个界面显示出来所需要的时间 不得超过 300毫秒。
2. 在推荐配置环境下：登录响应时间在2 秒内，刷新页面响应时间在 2秒内，
刷新页面列表响应时间 2秒内，打开信息条目响应时间1秒内。
3. 每天手机登录用户数 为1000左右。

## 原理

### 从浏览器地址栏输⼊url到显示⻚⾯的步骤

1. url 解析

#### 浏览器渲染过程

解析：script:async、defer  link:prefetch、repload

最初是加载和构建阶段。加载阶段：这个阶段中，浏览器会从上到下加载一个HTML页面，并解析文档中的内容。
如果它遇到外部资源，比如CSS文件、图片或者JS文件，那么浏览器会发起额外的HTTP请求来获取它们，当浏览器
加载到JS文件时，默认情况下，浏览器会暂停HTML解析。等待JS加载并执行完成后，才继续处理后续的内容。除非
脚本使用了async /defer 属性 ，否则JS会阻塞页面的解析。这是因为JS 可能会修改 DOM结构。浏览器需要
确保解析和执行的顺序一致。当HTML解析逐步完成，并且关键的资源（如CSS）已加载后，浏览器就会开始构建
页面的渲染结构。
构建阶段：
它会将HTML构建成一个DOM树，CSS文件则会被解析成CSSOM树，即CSS对象模型树。DOM树和CSSOM树会进一步合并，
形成渲染树。渲染树只包含可见元素。如果一个元素的display:none被应用，它就不会进入渲染树。
（（DOM 树仍然包含该节点）（渲染树 = DOM 树 + CSSOM 树，但 display: none 的节点会被过滤掉））
而像opacity: 0;或者visibility:hidden这类的元素，仍然会在渲染树中，但不会被绘制。
最终我们进入到了渲染阶段。根据渲染树，浏览器会计算每个节点的布局（Layout：计算节点尺寸/位置）信息，比如
大小、位置等，然后根据计算好的信息，将页面绘制(Paint：像素填充到屏幕)到屏幕上，将最终的网页展示给我们。

浏览器的渲染是单线程的。
也就是说JS执行、布局、绘制，这些任务都在主线程上完成。如果任务过多或者过于耗时，就会导致页面卡顿。
这里就有几个优化主线程性能的技巧，第一是尽量减少DOM操作。我们可以使用浏览器的批量更新机制，即让
浏览器对多次DOM操作进行合并，避免频繁触发重排和重绘。我们可以使用DocumentFragment或者
requestAnimationFrame()

##### 补充

DocumentFragment，文档片段接口，表示一个没有父对象的最小文档对象。

它被作为一个轻量版的 Document 使用，就像标准的 document 一样，存储由节点（nodes）组成的文档结构。与 document 相比，最大的区别是它不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会对性能产生影响。

GPU 加速

transform 和 opacity 不会触发重排/重绘，而是走 GPU 合成层（Compositing），性能更高。

Visibility :占用空间（在渲染树，不会绘制）， display:none 不占用空间（不在渲染树）

v-if 和 v-show

| 指令 | 渲染方式 | DOM 是否存在？ |
| --- | --- | --- |
| v-if | 条件性渲染：当条件为 false 时，元素完全从 DOM 中移除。 | 不存在（条件为 false 时） |
| v-show | 显示/隐藏切换：通过 CSS display: none 控制，元素始终保留在 DOM 中。 | 存在（仅视觉隐藏） |

script defer 告诉浏览器立即下载，但延迟执行，只对外部的脚本有效
script async  可以和页面加载一起执行，可以和其他脚本一起执行，所以不应在加载中修改DOM.

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

* dns 解析: `timing.domainLookupEnd - timing.domainLookupStart`
* TTI 可交互时间：`timing.domInteractive - timing.navigationStart`

### 优化首屏加载

#### 静态资源处理

包体积优化 tree shaking，eg: lodash

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
 对于资源较小的文件，设置成base64,既可以减少请求，也不会影响到页面的加载性能。

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

#### 代码分割

按需加载 或者 并行加载文件。（通过roolup-plugin-visualizer）

```js
function loadlazy() {
    return import('./lazy.js');
}
```

#### 路由懒加载与组件懒加载

* 路由懒加载：使用Vue Router的 import() 语法 动态加载路由组件，减少首屏加载的代码量。
* 组件懒加载：对于非首屏的组件，可以使用import() 语法进行懒加载。（tab页面）

#### 按需引入UI组件库

##### 推荐使用按需引入 + 自动导入

1. pnpm add -D unplugin-vue-components unplugin-auto-import
2. 结合构建工具，进行打包配置

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

## 更新优化

### 使用指令

* v-once
* v-memo

### 通用的优化

长列表 - 虚拟滚动

### 减少大型不可变数据的响应性的开销

* shallowRef

### 避免不必要组件抽象

无内容的template。