# 面试题

## 工程化

### package.json中dependencies和devDependencies的区别？

* dependencies是项目在生产环境中运行所需要的依赖，devDependencies开发中所需要的依赖。
* 当我们使用npm install进行安装依赖，默认安装的是生产环境的依赖。如果想要安装开发环境的
依赖，我们可以使用npm install --dev。
* 生产依赖通常包括运行时所需要的库、框架、工具。而开发依赖通常包括测试框架jest等，
构建工具typescript、vite等，代码检查工具eslint等。

### webpack5升级点有哪些？

