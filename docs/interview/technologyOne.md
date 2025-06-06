# 技术面试题一

## 工程化

### :star: 浅谈前端构建工具的选择?

```md
Go和JavaScript的区别？
1.同时Go 是一种编译型语言，在编译阶段就已经将源码转译为机器码，启动时只需要直接执行这些机器码即可。
而JavaScript 是一种解释型语言，代码在运行时由 JavaScript 引擎（如 V8、SpiderMonkey）
逐行解释并执行。
2.JavaScript 是动态类型语言，变量的类型在运行时才能确定，这增加了运行时的开销。Go 是静态类型语言，
变量的类型在编译时就已经确定，减少了运行时的类型检查开销。

esbuild 为什么快？
1.使用Go语言编写，充分利用了Go的编译执行和并发处理能力。
2.专注于核心功能，避免了不必要的开销。
3.原生支持ES Module, 优化了依赖解析和代码生成。

esbuild 天生支持 TypeScript（TS），无需额外配置即可直接编译 .ts 和 .tsx 文件。

开发环境和生产环境在构建和运行时的目标不同。
在开发环境，我们注重快速启动，热更新，调试友好。
在生产环境，我们注重代码体积最小、加载最快、按需加载。

Vite生产环境为什么不使用 esbuild?
1.esbuild的功能限制，插件生态不足。生产环境通常需要更复杂的资源处理（如CSS提取、代码拆分等），
来获得更好的功能支持和优化能力，而esbuild在这方面的支持不如Roolup成熟。
2.esbuild虽然速度快，但其稳定性和兼容性不如Rollup,生产环境更注重稳定性和可靠性，所以Vite选择
Roolup作为默认的生产打包工具。因为Roolup是一个经过多年验证的打包工具，广泛用于库和应用的打包
场景，具有更好的稳定性和兼容性。

Vite生产环境为什么不适用webpack,而使用rollup?
rollup专注于 ES 模块打包的场景，打包速度更快，生成的代码更小、更高效。

webpack对比 Vite?
webpack的兼容性强，支持多种模块化规范（CommonJS、AMD、ES Module），对老项目和老浏览器的兼容性较好。
Vite 基于 ES Module，对老项目（如 CommonJS 模块）的兼容性较差。
Webpack较早出现，插件生态丰富，处理多种资源类型和复杂构建任务的场景更得心应手。
但其（webpack）配置复杂性和构建速度问题，都不如Vite,Vite的开发体验会更好。
如果你追求极致的开发体验和现代特性支持，Vite 是更好的选择。
如果你需要处理复杂的构建任务或维护老项目，Webpack 仍然是更成熟的选择。

Vite为什么比Webpack快？
1. Vite 不需要全量打包
2. 解析模块依赖使用esbuild
3. 充分利用缓存 源码模块-协商缓存304，依赖模块-强缓存Cache-Control
开发服务器启动， 从依赖打包和 源码打包这两个方面提升性能
依赖：使用esbuild 进行依赖预打包，esbuild使用Go 编写，回避 Javascript-based的打包工具快 10-100倍
<!-- 源码：使用浏览器原生 es module提供源码，让浏览器接管 打包工具的部分工作。 -->
Vite 在文件热更新上做了优化
使用 ESM 不需要重新编译：一些打包工具的开发服务器在文件更改时，需要重新构建整个项目，
来获取新的模块依赖关系
使用浏览器缓存加速：Vite使用HTTP头 来加速整个页面的 重新加载

Parcel零配置，构建速度较快（比webpack快，比vite慢），插件生态较弱，适合小型项目、原型开发

SWC（Speedy Web Compiler）是一个基于 Rust 编写的高性能 JavaScript 和 TypeScript 编译工具。
它的目标是替代 Babel 和 Terser，提供更快的编译速度和更低的资源消耗。SWC 的核心功能包括代码转换
（Transformation）、压缩（Minification）和打包（Bundling）。缺点：1.相比 Babel，SWC 的插件
生态还不够丰富。2.swcpack 仍处于实验阶段，功能不如 Webpack 强大。

Vite 适合现代前端项目，提供极致的开发体验。
Webpack 适合大型复杂项目，功能强大但配置复杂。
Rollup 适合库开发，输出高效的代码。
esbuild 适合开发环境中的快速构建。
```

### :star: webpack常用的loader?

以前有资源loader，现在改为了资源模块 （type: "asset"等）。资源模块(asset module)是一种模块类型，它允许使用
资源文件（字体，图标等）而无需配置额外 loader。(file-loader,raw-loader,url-loader, webpack5官网说它们将在不久
的将来被淘汰)。
<!-- 
曾经的用法，没啥用，别看
raw-loader: 加载文件原始内容
file-loader: 把文件输出到文件夹中，在代码中通过相对url去引用输出的文件（图片 字体）
url-loader: 与file-loader类似，区别，可以设置阈值，大于多少kb, 交给file-loader
 -->

语法转化

* babel-loader:  将ES2015+ 代码并将其转换为 ES5
* ts-loader: 将typescript转换为javascript

样式

* style-loader 将模块导出的内容作为样式并添加到 DOM 中
* css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
* less-loader 加载并编译 LESS 文件
* sass-loader 加载并编译 SASS/SCSS 文件
* postcss-loader 使用 PostCSS 加载并转换 CSS/SSS 文件，处理css兼容性问题
* stylus-loader 加载并编译 Stylus 文件

框架

vue-loader 加载并编译 Vue 组件

构建速度

thread-loader: 多线程打包

### :star: webpack常用的plugin?

* DefinePlugin: 允许创建一个在编译时可配置的全局常量。定义环境变量。
* HtmlWebpackPlugin: 快速创建 HTML 文件来服务 bundles。能够自动生成一个或多个HTML文件，自动帮我们引用打包后的JavaScript和CSS文件‌
* MiniCssExtractPlugin：为每一个包含了 CSS 的 JS 文件创建一个 CSS 文件。把含有css的js文件，创建单独的css文件，通过link标签进行加载。js会堵塞页面渲染，css在js时加载，用户进来，会出现闪屏现象，用户体验不好。
* TerserWebpackPlugin:自定义js压缩方式，比如可以结合多线程。
* webpack-bundle-analyzer: 可视化 webpack 输出文件的体积。它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式
* eslint-webpack-plugin: 该插件使用 eslint 来查找和修复 JavaScript 代码中的问题。
* speed-measure-webpack-plugin（Asome-webpack）: 看到每个loader、plugin的执行耗时
* CssMinimizerWebpackPlugin（node >= 18.12.0）:压缩css代码
* ImageMinimizerWebpackPlugin（node >= 18.12.0）:压缩本地的静态图片
* CopyWebpackPlugin: 将已存在的单个文件或整个目录复制到构建目录。

### :star: loader和plugin的区别？

* 定义和作用

定义：Loader 是一个转换器，用于对模块的源代码进行转换。它本质上是一个函数，接收源文件内容作为参数，返回转换后的内容。

作用：Webpack 本身只能处理 JavaScript 和 JSON 文件，对于其他类型的文件（如 CSS、图片、TypeScript 等），就需要使用 Loader 来将这些文件转换为 Webpack 能够处理的模块。

定义：Plugin 是一个扩展器，它可以在 Webpack 构建流程的特定生命周期钩子中插入自定义的构建行为。

作用：Plugin 可以实现范围更广的任务，比如代码压缩、资源优化、生成 HTML 文件、分割代码等，它可以作用于整个构建过程。

综上所述，Loader 主要负责模块的转换，而 Plugin 则用于扩展 Webpack 的功能，在整个构建过程中执行各种自定义任务。

### :star: 是否写过Loader? 简单描述一下编写Loader的思路？

1.理解Loader的作用

* loader是一个函数，它接受模块的源代码作为输入，并返回处理后的结果。
* loader可以是同步，也可以是异步的。（有同步Loaders,异步Loaders,Raw Loader, Pitching Loading）

2.Loader的基本结构

* Loader是一个导出函数的模块
* 函数接收一个参数source, 表示模块的源代码
* 函数可以返回处理后的代码，或者调用this.callback 返回更多信息（如SourceMap）

3. 处理源代码

* 在Loader函数中，你可以对 source 进行任意处理。eg: 转换语法-sass-css, 修改内容-替换字符串等。

4. 支持链式调用

* Loader通常是链式调用的，前一个Loader 的输出会作为下一个Loader的输入。
* 因此，Loader的返回值必须是字符串或者 Buffer.

5. 异步Loader

* 如果Loader 需要执行异步操作（如读取文件），可以使用this.async 来返回一个回调函数。

6. 在Loader应用到Webpack配置中

* 在webpack.config.js 中，通过module.rules 配置Loader。

### :star: 是否写过plugin, 简单描述一下编写Plugin的思路？

1.理解webpack的生命周期钩子

* Webpack在构建过程会触发一系列生命周期钩子。如complilation（在compilation 创建之后执行。）
emit（输出 asset 到 output 目录之前执行）
* Plugin通过监听这些钩子，在特定的时机执行自定义逻辑。

2.创建一个JavaScript类

* Plugin 是一个 JavaScript 类，需要实现一个 apply 方法。
* apply 方法接收一个 compiler 参数，compiler 是 Webpack 的核心对象，提供了访问钩子的能力。

3.监听钩子

* 在 apply 方法中，通过 compiler.hooks.\<hookName\>.tap 方法监听特定的钩子。
hookName钩子名，eg:compilation, emit等，有很多生命周期钩子

4.实现自定义逻辑

* 在钩子回调函数中编写自定义逻辑，例如修改资源、生成文件、打印日志等。

5.将 Plugin 应用到 Webpack 配置中：

* 在 webpack.config.js 中，通过 plugins 数组将自定义 Plugin 实例化并添加到配置中。

举例

在此，写过一个inline-chunk-webpack-plugin。webpack打包生成的runtime文件太小了，额外发送请求性能不好，
所以需要将其内联到js中，从而减少请求数量。开发思路: 我们需要借助html-webpack-plugin来实现，其次在
html-webpack-plugin 输出 index.html前将内联runtime 注入进去，最后删除多余的runtime。

其他应用：添加注释，删除console等

### webpack 构建流程简单说一下

Webpack的运行流程是一个串行的过程。

它可以分为以下三个阶段

* 初始化：启动构建，读取并合并配置参数，加载Plugin,实例化Compiler
* 编译：从Entry 触发，针对每个Module 串行调用对应的Loader取翻译文件内容，再找到该 Module 依赖的Module,递归
地进行编译处理
* 输出：对编译后的Module 组合成Chunk,把Chunk转换成文件，输出到文件系统。

### webpack中，Compiler和Compilation如何理解？

* Compiler: 全局唯一的Webpack实例，代表整个生命周期，适合处理全局任务。
* Compilation: 单次编译的实例，代表一个构建过程，适合处理模块和资源级别的任务。
* 插件通过监听Compiler和Compilation的钩子，可以介入Webpack的构建过程，实现自定义功能。

### Webpack 事件机制了解吗？

webpack的事件流机制，它是基于Tapable库实现，它提供一种发布-订阅模式，允许Webpack在特定时机广播事件，
插件则可以监听这些事件并执行相应的逻辑。

### 使用webpack 开发时，你用过哪些可以提高效率的插件？

### 文件指纹是什么？ 怎么用？

文件指纹：打包后输出的文件名的后缀。它可以用来。

* 缓存优化：通过文件指纹，浏览器可以缓存文件，同时确保文件内容变化时，文件名也会变化，从而加载新文件。
* 版本控制：文件指纹可以用于标识文件版本，确保用户总是加载最新的文件。
* 避免冲突：生成唯一的文件名，避免多个文件重名的问题。

Webpack 提供了以下几种文件指纹占位符：

* [hash]：基于整个项目构建生成的哈希值，所有文件共享同一个哈希值。
* [chunkhash]：基于每个 chunk 内容生成的哈希值，适用于 JavaScript 文件。
* [contenthash]：基于文件内容生成的哈希值，通常用于 CSS 或提取的文件（如通过 mini-css-extract-plugin 提取的 CSS 文件）。

文件指纹的生成规则

* [hash]：每次构建都会生成一个新的哈希值，所有文件共享。
* [chunkhash]：基于每个 chunk 的内容生成，适用于 JavaScript 文件。
* [contenthash]：基于文件内容生成，适用于 CSS 或提取的文件。

js 的文件指纹设置

```javascript
module.exports = {
    entry: {app: "./src/app.js", jquery: "./src/jquery.js"},
    output: { filename: '[name][chunkhash:8].js', path: __dirname + '/dist' },
}
```

css的文件指纹设置

```javascript
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({ filename: `[name][contenthash:8].css`})
    ]
}
```

图片、字体的文件指纹设置

```javascript
module.exports = {
    output: {
        // 所有文件的输出路径
        // 开发模式没有输出
        path: undefined,
        // 入口文件打包输出文件名
        filename: "static/js/[name].js",
        // 给打包输出的其他文件命名
        chunkFilename: "static/js/[name].chunk.js",
        // 图片、字体等通过type:asset处理资源命名方式
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
}
```

### :star: 如何优化webpack 的构建速度？

* 多进程并行压缩。eg: TerserWebpackPlugin的配置parallel,EslintWebpackPlugin的配置parallel
* 使用高版本的webpack和node.js，性能通常会有显著提升。
* 借助 thread-loader 实现多线程打包，处理耗时的loader。如babel-loader,
<!-- 开发环境, 多线程处理语法转化thread-loader+babel-loader, eslint代码检查 -->
* 充分利用缓存提升二次构建速度。eg: babel-loader
* 通过esModule进行 tree shaking， 把没有用过的模块进行标记，最终从 bundle 中去掉。eg: lodash-es
* 使用 include、exclude, resolve配置（eg:resolve.extensions,resolve.modules）缩小打包作用域。
* 使用speed-measure-webpack-plugin分析每个loader、plugin的执行耗时，使用webpack-bundle-analyzer分析
打包结果，看是否还可以进行优化。
* One of,每个文件只能被其中一个loader配制处理。eg: css不走less配制，sass配制
<!-- include:只处理某些文件
exclude:排除某些文件，其他文件都处理
注意：node_modules已经被构建结束
eslint不需要检查node_modules,
babel不需要编译node_modules
引入的外部样式，也不需要处理 -->

#### for example：通过 resolve 配置减少模块查找时间

```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置别名
    },
    extensions: ['.js', '.json'], // 减少文件扩展名搜索
    modules: [path.resolve(__dirname, 'node_modules')], // 指定模块搜索目录
  },
};
```

#### for example：开发环境，多线程处理语法转换

```js
module: {
  rules: [
    {
      test: /\.js$/,
      // exclude: /node_modules/, // 排除node_modules下的文件，其他文件都处理
      include: path.resolve(__dirname, "../src"), // 只处理src下的文件，其他文件不处理
      use: [
        {
          loader: "thread-loader", // 开启多进程
          options: {
            works: threads, // 进程数量
          },
        },
        {
          loader: "babel-loader",
          options: {
            // presets: ["@babel/preset-env"],
            cacheDirectory: true, // 开启babel缓存
            cacheCompression: false, // 关闭缓存文件压缩
            plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
          },
        },
      ],
    },
  ],
}
```

### :star: 如何优化webpack 的打包体积？

### ES Module 的代码为什么可以被 Tree Shaking?

静态结构：

* ES Module 的 import 和 export 语句必须在顶层作用域，不能动态加载。
* 这种静态特性使得打包工具在编译时就能确定模块的依赖关系，无需运行代码。

确定依赖：

* 打包工具通过静态分析，可以准确识别哪些模块和函数被使用，哪些未被使用。
* 未使用的代码会被标记为“死代码”，并在最终打包时移除。

补充：

工具支持：

* Webpack、Rollup 等工具利用 ES Module 的静态特性，结合作用域分析和副作用检测，实现 Tree Shaking。

### package.json中dependencies和devDependencies的区别？

* dependencies是项目在生产环境中运行所需要的依赖，devDependencies开发中所需要的依赖。
* 当我们使用npm install进行安装依赖，默认安装的是生产环境的依赖。如果想要安装开发环境的
依赖，我们可以使用npm install --dev。
* 生产依赖通常包括运行时所需要的库、框架、工具。而开发依赖通常包括测试框架jest等，
构建工具typescript、vite等，代码检查工具eslint等。

### webpack5升级点有哪些？

### 聊一聊Babel原理吧

Babel是一个JavaScript编译器，可以把Es6+ 转换为向后兼容的ES5，以便在旧版浏览器或环境中运行。
它的核心流程包括：

* 1.解析，将源代码转化为抽象语法树。Babel使用@babel/parser来完成解析。
* 2.转换，对AST进行遍历和修改。Babel 使用 @babel/traverse 来遍历 AST，并使用 @babel/types 来创建或修改 AST 节点。eg: 把箭头函数转换为普通函数，把const 和 let 转换为 var。
* 3.生成，将修改后的AST转换为代码。Babel使用@babel/generator来完成生成。

### :star: 聊聊AST

定义：抽象语法树用来表达源代码的一种树形结构。AST 的生成通常分为两个步骤
* 词法分析（Lexical Analysis）：扫描源代码，识别出关键字、标识符、运算符、分隔符等，生成一个令牌流（Token Stream）
* 语法分析（Syntax Analysis）：根据语言的语法规则，将token流转换为树形结构，每个节点代表一个语法单元（如变量声明、表达式、语句等）。

#### AST 的结构

AST 是一个树形结构，每个节点都有以下属性：

* type：节点的类型（如 VariableDeclaration、Identifier、BinaryExpression 等）。
* loc：节点在源代码中的位置（行号、列号等）。
* 其他属性：根据节点类型不同，可能包含其他属性（如 name、value、operator 等）。

常见的节点类型

* Program：代表整个程序。
* VariableDeclaration：变量声明。
* FunctionDeclaration：函数声明。
* ExpressionStatement：表达式语句。
* Identifier：标识符（如变量名、函数名）。
* Literal：字面量（如字符串、数字）。
* BinaryExpression：二元表达式（如 1 + 2）。
* CallExpression：函数调用表达式（如 fn()）。

#### Ast的应用场景

* 代码转换，eg:Babel、TypeScript编译器
* 代码格式化，eg:Prettier
* 静态代码分析，eg:ESLint
* 代码压缩, eg: Terser、UglifgyJS
* 代码生成：eg:Babel、TypeScript编译器

## Vue

### :star: Vue3新特性?

* 响应式系统的升级，Vue3使用的是Proxy,Vue2使用的defineProperty
* 性能优化：更快的渲染速度和更小的包体积。eg: diff算法，tree shaking
* Composition API：Vue3是组合式API, Vue2是选项式API
* 更好地支持ts
* 新特性：Fragment,Teleport, Suspense等。
* 生命周期也不一样
* vue2组件模板是单一根节点，vue3可以是多节点。（背后原理能讲，冷门陌生）
* v-for和v-if，优先级不一样。（背后原理能讲，冷门陌生）

### :star: 首屏加载优化？

网络延迟

资源太大

* 分包

打包工具分析：

* 使用create-vue创建的vue3项目（内部使用vite进行打包）：roolup-plugin-visualizer


### 性能优化

背景与收益：反馈卡顿明显

怎么做

性能优化的标准

* 谷歌团队建议
* 2-5-8
* RAIL

如何得到这些标准？监控工具

* Permance
* lighthouse

FCP, FP
FPS
CPU/ GPU
LCP
TTI
Speed Index

html,css,js,vue,react,静态资源，打包，白屏，
加载速度：首屏/切换页面， 缓存：CDN, 协商/强缓存， 网络， 动画，web worker

### 说说Vue的插件机制？

### 大数据渲染

背景：后端因为链路长、接口不支持改造等其他原因，不支持分页数据，一次性将数据发送给前端。
页面等待时间长，用户体验差。
通过Chrome浏览器性能分析工具Performance,检测分析页面前端性能数据

FPS: 7s -> 1.5s
内存 117MB  -> 22MB

#### 采用虚拟列表的手段

对可见区域内的数据进行渲染，然后计算出鼠标滚动距离大约是滚动了多少项，通过动态地设置距离顶部
top值达到可见区域 动态渲染数据不会卡顿的效果

#### 采用分批渲染

把大数据一维数组通过while循环变成二维数组，然后借助requestanimationframe对二维数组里面的每一堆
进行分堆渲染数据。

#### 新闻资讯长列表渲染

截取长列表一部分数据用来填充当前可视区域，
长列表数据的不可视部分使用空白占位填充，
监听滚动事件，根据滚动位置动态改变可视列表，同时动态改变空白填充。


#### vue-virtual-scroller

* mitt：一个极简的 事件发射器/订阅库（Event Emitter），用于组件或模块间的通信。
* vue-observe-visibility： 检测 Vue 组件是否在视口中可见（基于 IntersectionObserver API）
* vue-resize： 用途: 监听 DOM 元素的尺寸变化（基于 ResizeObserver API）。

IntersectionObserver：动画帧调度（高频更新）
requestAnimationFrame：元素可见性检测（低频事件）
Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。


使用pnpm + monorepo
使用rollup进行打包

import { h } from 'vue'
this.$watch(() => this.sizeDependencies[k], this.onDataUpdate)

## HTML/CSS/JavaScript

### 怎么理解回流和重绘？什么场景下会触发？

* 解析HTML, 生成DOM 树，解析CSS树，生成CSSOM树
* 将DOM树和CSSOM树结合，生成渲染树（Render Tree）
* Layout( 回流)： 根据生成的渲染树，进行回流（Layout）,得到节点的几何信息（位置、大小）
* Painting（重绘）： 根据渲染树以及回流得到的几何信息，得到节点的绝对像素
* Display: 将像素发给GPU, 展示在页面上

回流：需要计算节点的几何信息

减少回流：

* 使用transform: 只会触发重绘，不引发回流

### 页面响应式如何实现？

rem 实现等比缩放效果

## JavaScript

### 说说你的原型和原型链的理解？

* 通过原型，对象可以共享属性和方法。对象和函数都拥有原型。
* 对象的隐式原型__proto__会永远指向构造函数的显式原型prototype。
* 原型链就是把原型串联起来，原型链的顶端是null。
* 对象查找属性和方法的顺序：对象本身 => 构造函数 => 构造函数的原型 => 当前原型的原型

### 设计模式有哪些？

创建型模式

* 单例模式
* 建造者模式

结构型设计模式

* 代理模式
* 装饰器模式
* 适配器模式
* 外观（门面）模式

行为型设计模式

* 策略模式
* 观察者模式
* 发布订阅模式
