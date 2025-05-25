# rollup

Rollup 是一个基于 ES 模块（ESModule）进行开发的 JavaScript 模块打包工具。

## 命令行接口

### 命令行标志

```md
-c, --config <filename>     使用此配置文件
-w, --watch                 监视产物文件并在更改时重新构建
--environment <values>      传递给配置文件的设置（请参阅示例）
```


## rollup常用插件

核心打包工具 & Babel 相关

* @babel/core	Babel 的核心库，用于 JavaScript 代码转换（如 ES6+ → ES5）。
* @rollup/plugin-babel	让 Rollup 支持 Babel，用于 转译现代 JS 语法 或 TypeScript。
* @rollup/plugin-commonjs	将 CommonJS 模块（如 Node.js 的 require）转换为 ES 模块（import），以便 Rollup 处理。
* @rollup/plugin-node-resolve	解析 node_modules 中的第三方依赖，使 Rollup 能正确打包它们。
* @rollup/plugin-replace	在打包时 替换代码中的变量（如 process.env.NODE_ENV → "production"）。

Vue 相关

* @vue/compiler-sfc	Vue 3 的 单文件组件（SFC）编译器，用于解析 .vue 文件中的 template、script 和 style。
* rollup-plugin-vue	Rollup 插件，用于打包 Vue 单文件组件（.vue 文件）（Vue 2 和 Vue 3 都支持）。

CSS 处理

* autoprefixer	自动添加 CSS 浏览器前缀（如 -webkit-, -moz-），确保兼容性。
* clean-css	压缩 CSS，删除注释、空格，优化代码。
* rollup-plugin-css-only	提取 Vue 组件中的 CSS 并生成单独的 .css 文件。
* rollup-plugin-css-porter	类似功能，可合并多个 CSS 文件并优化。

生产环境优化

* cross-env	跨平台设置环境变量（如 NODE_ENV=production），避免 Windows/macOS 兼容性问题。
* rollup-plugin-terser	使用 Terser 压缩 JS 代码，删除注释、缩短变量名，减小文件体积。
