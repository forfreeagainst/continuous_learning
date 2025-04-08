# sortable可排序的

## sortable.js介绍

## 学习封装一个拖拽插件

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