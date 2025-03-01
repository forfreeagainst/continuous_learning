# Vite

## 前沿知识

### 缓存（摘录，未核验）

缓存是前端性能优化的重要手段之一，合理使用缓存可以显著减少网络请求，提升页面加载速度和用户体验。在前端开发中，
缓存主要分为强缓存和协商缓存 两种机制，此外还有一些其他缓存策略。

1.强缓存

* 强缓存是通过设置HTTP 响应头 来告诉浏览器，在缓存有效期内直接使用本地缓存，而无需向服务器发送请求。
强缓存主要通过Cache-Control和Expires两个HTTP响应头来实现。
* 特点-优点：减少网络请求，提升页面加载速度。
* 特点-缺点：如果资源更新，客户端在缓存有效期内无法获取最新资源。

2.协商缓存

* 当强缓存失效时，浏览器会向服务器发送请求，服务器通过校验资源的修改时间或唯一标识来决定是否返回新资源。如果资源
未修改，服务器返回304 Not Modified, 浏览器使用本地缓存。
* 协商缓存主要通过以下两组 HTTP 头实现。Last-Modified 和 If-Modified-Since， ETag 和 If-None-Match。
* 特点-优点：确保客户端始终使用最新的资源。
* 特点-缺点：每次请求都需要与服务器通信，增加了网络开销。

3.Service Worker 缓存

4.CDN缓存

5.LocalStorage 和 SessionStorage

6.IndexedDB

:star: Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。如果出于某些原因你想要强制 Vite 重新构建依赖项，你可以在启动开发服务器时指定 --force 选项，或手动删除 node_modules/.vite 缓存目录。

## 指引

### 构建生产版本

#### 自定义构建

构建过程可以通过多种 构建配置选项 来自定义构建。具体来说，你可以通过 build.rollupOptions 直接调整底层的 Rollup 选项

```vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
    },
  },
})
```

