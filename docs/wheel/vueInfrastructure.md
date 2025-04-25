# Vue基建

## Vue2项目开发经验

```md
node_modules:项目依赖文件
public: 一般放置静态资源，需要注意,webpack进行打包的时候，会原封不动地打包到dist文件夹中。
src:源代码
  assets:放置静态资源，在webpack打包的时候，会把静态资源当成一个模块，打包到js文件夹里面
  components:全局组件
  app.vue：唯一的根组件
  main.js: 程序入口文件
babel.config:js:配制文件，将esNext转为es5
package.json: 项目有哪些依赖
package.json:项目依赖的版本号
README.md:说明性文件
```

### 选型

```md
axios

```

### 一些小处理

```md
去除默认样式reset.css
```
