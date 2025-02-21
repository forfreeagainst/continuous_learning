# 面试题

## 工程化

### :star: webpack的常用的loader和plugin,如何自定义loader和plugin?如babel

css-loader,style-loader

HtmlWebpackPlugin, 

thread-loader多线程打包, webpackBundleAnalyzer打包后的块分析

```md
常用的loader:
样式资源：css-loader,style-loader,(less-loader)(sass-loader)(stylus-loader)
资源：file-loader(图片),url-loader(将小于某个大小的图片做优化，转为base64,一般为10kb)
//webpack5，可能把file-loader,url-loader弄为内置功能了。
//资源有哪些：图片，字体图标，音频/视频，asset/resource原封不动，asset做处理
js资源：eslint-loader
babel-loader:可以将ES6+代码转换为向后兼容的JavaScript语法，以便在当前和旧版本的浏览器和环境中运行‌
//eslint(Js和jsx检查工具)，
postcss-loader:处理css兼容性问题
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
loader和plugin的区别？
```




### package.json中dependencies和devDependencies的区别？

* dependencies是项目在生产环境中运行所需要的依赖，devDependencies开发中所需要的依赖。
* 当我们使用npm install进行安装依赖，默认安装的是生产环境的依赖。如果想要安装开发环境的
依赖，我们可以使用npm install --dev。
* 生产依赖通常包括运行时所需要的库、框架、工具。而开发依赖通常包括测试框架jest等，
构建工具typescript、vite等，代码检查工具eslint等。

### webpack5升级点有哪些？

