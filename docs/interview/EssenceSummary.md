# 精华总结

## 回答技巧

```md
首次，可能是组员问（技术的讨论）
引导面试官怎么问

使用 vue 什么技术手段 实现 xxx 功能，达到了 xxx 目的

Star
背景
任务：明确你要解决的具体问题或承担的角色
行动：你采取的技术方案、工具和决策过程
结果：量化成果，用数据或事实说明行动的效果

```

## Vue

### 说说Vue Router History的几种模式，有什么用途？(Vue Router有几种路由模式)？

* Hash模式的优点是 兼容性最好，支持所有浏览器，不需要服务器配置，
不足的是url 有"#" 号，不美观，同时不利于SEO 优化。
* HTML5 模式 （History模式）的优点是 url没有 “#”号，美观，适合现代浏览器和SEO优化，
不足的是不兼容一些旧的浏览器项目，服务器需要配置，确保所有路径都返回 index.html,否则刷新页面会返回404.
* Memory: 路由状态保存在内存中，不会改变浏览器的URL, 适合Node环境和SSR。

### Vue Router原理?（浏览器的前进后退如何监听？）

* VueRouter底层原理实际上就是依赖于浏览器提供的 History API, 包括replaceState,pushState,popstate。
* 从Vue Router 4开始，采用统一的 popstate 事件监听机制。
* History 模式：pushState/replaceState + popstate
* Hash 模式：location.hash 修改 + popstate（不再使用 hashchange）
* 在这个过程中，router就维护了一个路由映射表，将路由与组件对应起来，并在路由变化时，动态渲染相应的组件。

```md
Vue Router 4 开始，Hash 模式也改为通过 popstate 事件监听路由变化

Vue Router 4.2.5 的 Hash 模式：
通过 history.pushState 修改 URL，并统一监听 popstate 事件，不再依赖 hashchange。

动机：统一事件处理逻辑，减少代码分支，提升可维护性。
开发者无感知：对外暴露的 API（如 router.push）和行为保持不变，仅内部实现优化。

History 模式的"兼容性差"并非因为浏览器 API 支持，而是因为：

需要服务器配合：必须配置回退到 index.html

部署环境限制：某些环境无法修改服务器配置

Hash 模式之所以兼容性好，是因为它完全规避了路径处理问题，所有路由变化都在 # 之后，
服务器永远只看到 index.html 的请求。
```

## 工程化

### Monorepo和Multirepo区别？

* Monerepo包与包之间引用方便，Multirepo需要发布依赖后，才能引用
* Monorepo可以统一流水线，易于管理，Multirepo需要每个仓库单独配置CI / CD
* 但如果想要独立代码权限和发布节奏，或者构建方式差异大，选择Multirepo也是个不错的选择。
