# 自定义脚手架

## monorepo工具

### pnpm

* :star: 节省磁盘空间场景

在一个项目中有大量的依赖包，尤其是在多个项目或工作空间存在相同依赖时，pnpm能够共享这些相同的依赖包，
从而大大节省磁盘空间。

* :star: 高效安装场景

在同时开发多个项目且项目存在重复依赖的工作场景下，pnpm安装依赖的速度更快。它采用了一种独特的链接方式来管理依赖，相比传统的npm或yarn,在安装大量依赖包时可以减少文件的复制操作，加快安装过程。

### lerna

* :star: 版本管理场景

如果这些软件包之间相互依赖，并且需要统一管理版本发布，Lerna可以轻松处理。它能确保所有相互依赖的包
在版本升级时保持同步，避免因为版本不一致导致的兼容问题。换言之，复杂的大型项目中有多个内部包需要
协同开发、发布，lerna是一个不错的选择。

#### 常见命令

* npm install lerna
* :star: npx lerna init 初始化lerna
* :star: lerna run test 运行子包的script/脚本命令
* :star: lerna clean 删除子包的依赖，注：不会删除项目所在根的依赖
* lerna create shared 创建子包
* :star: lerna publish 发布包

lerna publish 运行的是lerna.json的command的配制。registry也可以选择私有网址

```json
{
  "version": "1.0.0",
  "npmClient": "pnpm",
  "useWorkspaces": true,
  "command": {
    "publish": {
      "npmClient": "npm",
      "message": "chore(release): publish %s",
      "registry": "https://registry.npmjs.org"
    },
    "packages": [
      "packages/*"
    ]
  }
}
```

#### 入门

* 安装指定版本的lerna
* 编写lerna.json
* 书写LICENSE，发布时需要协议证书

## 本地开发子包

* pnpm init 或者npm init -y

## Git规范

### 常用的钩子

* pre-commit：在`git commit` 之前触发，常用于对提交的代码文件进行规范校验
* commit-msg：在`git commit`后触发，用于提交消息的格式校验

### husky

* `npx husky install`或`husky install`

## lint工具

### commitlint

#### 开发子包

* pnpm init，生成package.json
* 该包名有特殊命名规范：commitlint-config-包名。

`Install @commitlint/cli and a @commitlint/config-* / commitlint-config-* of your choice as devDependency and configure commitlint to use it.`

* 安装依赖

```json
"dependencies": {
  "conventional-changelog-conventionalcommits": "^4.5.0"
}
```

* 入口文件

```js
//官方文档的cli说明中的parserPreset，用于解析提交消息的解析器预设
parserPreset: 'conventional-changelog-conventionalcommits',
rules: {规则...}
```

#### 扩展

* cz-git结合cz-commitlint

### eslint

### prettier

### markdownlint

### stylelint

## 静态资源站点

### VuePress

我们把代码提交到github,actions上可以看到部署信息。

```md
.github
    workflows
        docs.yml(git actions方案一, 看官网配制)
docs
    .vuepress
        config.js
    README.md
.gitignore
deploy.sh(git actions 方案二，看官网配制)
package.json
    scripts
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs",
        "deploy": "bash deploy.sh",
```
