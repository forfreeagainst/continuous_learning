# 面试题

## 工程化

### :star: webpack常用的loader?

以前有资源loader，现在改为了资源模块 （type: "asset"等）。资源模块(asset module)是一种模块类型，它允许使用
资源文件（字体，图标等）而无需配置额外 loader。(file-loader,raw-loader,url-loader, webpack5官网将在不久
的将来被淘汰)。

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


### :star: webpack常用的plugin?


### :star: loader和plugin的区别？


HtmlWebpackPlugin, 
thread-loader多线程打包, webpackBundleAnalyzer打包后的块分析
```md
常用的plugin:
eslintWebpackPlugin(注：webpack4使用eslint-loader,webpack使用eslintWebpackPlugin，
//loader和plugin区别)
HtmlWebpackPlugin:能够自动生成一个或多个HTML文件，自动帮我们引用打包后的JavaScript和CSS文件‌
MiniCssExtractPlugin：把含有css的js文件，创建单独的css文件，通过link标签进行加载。js会堵塞页面
渲染，css在js时加载，用户进来，会出现闪屏现象，用户体验不好。
CssMinimizerWebpackPlugin:压缩css代码
TerserWebpackPlugin:自定义js压缩方式，比如可以结合多线程。
ImageMinimizerWebpackPlugin:压缩本地的静态图片
BundlerAnalyzerPlugin:打包后可视化分析
```

### package.json中dependencies和devDependencies的区别？

* dependencies是项目在生产环境中运行所需要的依赖，devDependencies开发中所需要的依赖。
* 当我们使用npm install进行安装依赖，默认安装的是生产环境的依赖。如果想要安装开发环境的
依赖，我们可以使用npm install --dev。
* 生产依赖通常包括运行时所需要的库、框架、工具。而开发依赖通常包括测试框架jest等，
构建工具typescript、vite等，代码检查工具eslint等。

### webpack5升级点有哪些？

