# 首屏加载

F12：NetWork网络 右下角有个加载时间load：453毫秒，这就是首屏加载时间

## 性能指标

## 如何计算首屏加载时间？

### performance

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

## 首屏加载慢原因

* 网络原因：F12 Network 网络 切换 网速:快速4G

## 优化首屏加载

### 首屏的组件需要某个条件才会显示在页面。（v-if，仍然加载组件资源）

```js
// Vue3中的异步组件
// import cropDialog from './cropDialog.vue';

// 异步组件
const cropDialog = defineAsyncComponent(() => {
    return import('./cropDialog.vue');
})
```

### base64图片，方案：图片占位+使用网络图片（cdn）(5s -> 3s)

### 白屏时间

骨架屏，Vue框架执行之前

```html
<div id="app">
    <div>优化视觉体验，白屏看起来不那么难受</div>
</div>
```