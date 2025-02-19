# Webapck

参考官网很重要，官网不会过时。

## 核心概念

* entry: 入口文件
* output: 输出文件
* loader:

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在更高层面，在 webpack 的配置中，loader 有两个属性：

test 属性，识别出哪些文件会被转换。
use 属性，定义出在进行转换时，应该使用哪个 loader。

* plugin
* mode: 模式
* environment: 环境

