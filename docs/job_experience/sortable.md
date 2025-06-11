# sortable可排序的

vue-draggable-plus 拖拽Multirepo（vite打包，vue2+vue3+vue-demi兼容处理，vue3 + TypeScript）

vue-draggable-next: Vue3

https://form.making.link/docs/guide/v3/getting-started.html

https://lowcode-engine.cn/index

https://github.com/alibaba/lowcode-engine

## 技术选型考量

* 原生Drag API痛点：需手动实现排序逻辑、跨容器交互复杂、无动画支持。现代浏览器支持，但移动端兼容性较差	
* vue-draggable-next：下载量 341k+， Github Stars 52k+， Unpacked Size 585 kB
* vue-draggable-plus：下载量 328k+， Github Stars 3.5k+， Unpacked Size 213 kB

## sortablejs

```md

构建工具：vite
```

## Vue-dragable-plus

| 功能 | Sortable.js原生实现 | vue-draggable-plus封装增强 |
| --- | --- | --- |
| 数据绑定 | 需手动监听事件更新数据 | 自动同步拖拽后的数据到v-model |
| 虚拟 DOM 兼容 | 直接操作真实 DOM, 可能和 Vue 渲染冲突 | 适配 Vue 的虚拟 DOM diff 机制，避免渲染问题 |

* useDraggable: 基于sortablejs，那我就先研究这个
* directive: 基于useDraggable
* components: 基于useDraggable

### 如何理解源码手动操作DOM

* insertNodeAt/removeNode 的作用：在拖拽过程中提供即时视觉反馈，属于必要的性能优化手段。
* Vue 的协作方式：通过最终同步到响应式数据，保证 UI 与数据的长期一致性。
* 设计哲学：在特定性能敏感场景下，合理的手动 DOM 操作是 Vue 官方允许的模式（参考 Transition 组件的实现）。

### package.json

```json
{
    sideEffects: false, // 没有副作用的
    // 这是一个条件导出（Conditional Exports）的配置，它能根据不同的模块系统和使用场景提供不同的入口文件
    "exports": {
        ".": {
        "import": {
            "types": "./dist/index.d.ts",
            "default": "./dist/vue-draggable-plus.js"
        },
        "require": {
            "types": "./dist/index.d.ts",
            "default": "./dist/vue-draggable-plus.cjs"
        },
        "default": "./dist/vue-draggable-plus.umd.cjs"
        }
    },
    "scripts": {
        // vitepress dev .docs --host：用 VitePress 启动 .docs 目录的开发服务器，并允许外部访问（--host）
        "dev": "initial-scan docs && vitepress dev .docs --host",
        // 使用 Vite 构建生产环境代码
        "build": "vite build",
        // npm-run-all：一个可以顺序运行多个 npm 脚本的工具
        "build:lib": "npm-run-all lint build", // 先lint, 后build
        // 执行对应的Node脚本，拷贝文档
        "copy:docs": "node scripts/copy-docs.cjs",
        // cross-env NODE_ENV=production：设置环境变量 NODE_ENV=production（跨平台兼容）
        // vitepress build .docs：用 VitePress 构建 .docs 目录的生产版本
        "docs:build": "initial-scan docs && cross-env NODE_ENV=production && npm run copy:docs && vitepress build .docs",
        // vitepress serve .docs --host：启动一个本地服务器预览构建好的文档，并允许外部访问
        "serve": "cross-env NODE_ENV=production vitepress serve .docs --host",
        // 对 src 目录下所有 .ts 文件进行代码规范检查
        "lint": "eslint src/**/*.ts",
        "lint-fix": "pnpm lint --fix",
        // np 是一个流行的 npm 发布工具，可以交互式地完成版本号升级、Git 打标签、发布到 npm 等操作
        // 运行后会提示选择版本号（patch/minor/major），然后自动执行测试、构建、发布流程
        "release": "np"
    },
    // sortablejs 是 devDependencies：因为它只是前端库，由构建工具打包，不直接影响 Node.js 运行时。
    // @types/sortablejs 是 dependencies：可能是因为服务端代码或构建过程依赖它的类型定义
    //（否则应该也放在 devDependencies）。
}
```

## 其他拖拽方案

* mouseup
* 