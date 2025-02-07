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

#### lerna和pnpm一起使用，详见官网

[lerna秘诀](https://lerna.nodejs.cn/docs/recipes/using-pnpm-with-lerna)

#### :star: lerna发包精要

```md
npm config get registry
npm config set registry=https://registry.npmjs.org
npm login 
用户名：durant123
密码：SJQ******.(******是手机密码)

npm config set proxy null
npm cache clean --force
npm config set registry=https://registry.npmjs.org
提完代码，lerna publish
```

* 代理问题，多次使用被视为翻墙。npm config set proxy null && npm cache clean --force
* lerna发包，一定要有改动并提交的代码
* 如果要one-time-password, 手机设备的软件AUthenticator，有一次性验证码
* ECONNRESET可能网络问题，稍后重试。解决代理问题，继续重试lerna发布。eg: lerna ERR! lerna The "code" argument must be of type number. Received type string ('ECONNRESET')
* 书写LICENSE，发布时需要协议证书

## 本地开发子包

* pnpm init 或者npm init -y

## Git规范

### 常用的钩子

* pre-commit：在`git commit` 之前触发，常用于对提交的代码文件进行规范校验
* commit-msg：在`git commit`后触发，用于提交消息的格式校验

### husky：更好使用git钩子管理项目

* `npx husky install`或`husky install`

### changelog：维护Git更新日志

参考vue源码等

脚本命令changelog：`conventional-changelog -p angular -i CHANGELOG.md -s`

```json
"dependencies": {
  "conventional-changelog-conventionalcommits": "^4.5.0"
}
```

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

#### 子包的脚本命令

```json
"scripts": {
  "lint": "eslint ./",
  "test": "mocha ./__tests__/*.test.js --timeout 5000",
  "print-config": "eslint --print-config ./index.js > ./print-config.json"
}
```

### prettier

### markdownlint

#### 参考

* [markdownlint](https://github.com/DavidAnson/markdownlint)
* [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)

`MarkdownLint CLI 是一个用于检查 Markdown 文档语法错误的命令行工具`

#### pre-commit可校验markdown文件

```sh
# !/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

pnpm run mdlint
```

脚本命令`"mdlint": "markdownlint **/*.md --ignore node_modules"`

### stylelint

#### 平时项目开发，不用脚手架的能力，如何使用

* 配制规则
* 安装所需依赖stylelint和配制规则用到的依赖
* 配制脚本命令`"lint": "stylelint \"**/*.scss\"""`

#### 配制规则参考官网

[用户指南的规则](https://stylelint.nodejs.cn/user-guide/rules)

#### 开发子包需注意

* scss,less写测试用例，

## cli

### init

1. 检查cli包版本更新
2. 是否使用对应的lint工具（默认使用eslint,只要选择eslint类型）
3. 检测到项目中存在可能与 cli包 冲突的依赖和配置
4. 注入script（包名-scan: 包名 scan, 包名-fix: 包名 fix），添加git hooks。（pre-commit:包名 commit-file-scan, commit-msg:包名 commit-msg-scan）。触发的都是bin目录下的脚本命令。
5. 更新package.json文件，生成所有的配制文件

关键代码：

```ts
pkg.husky.hooks['pre-commit'] = `${PKG_NAME} commit-file-scan`;
pkg.husky.hooks['commit-msg'] = `${PKG_NAME} commit-msg-scan`;

program
  .command('commit-file-scan')
  .description('代码提交检查: git commit 时对提交代码进行规范问题扫描')
  .option('-s, --strict', '严格模式，对 warn 和 error 问题都卡口，默认仅对 error 问题卡口')
  .action(async (cmd) => {
    //...
  });

program
  .command('commit-msg-scan')
  .description('commit message 检查: git commit 时对 commit message 进行检查')
  .action(() => {
    //...
  });
```

### scan

1. 使用lint工具，却没有安装依赖。
2. 比较package.json和包名.config.js的区别，通过脚本命令的可选参数，调用lint工具的API能力，
获取对应的scan信息。
3. 在控制台打印扫描报告

### fix

1. 使用lint工具，却没有安装依赖。
2. 使用prettier格式化代码
3. 比较package.json和包名.config.js的区别，通过脚本命令的可选参数，调用lint工具的API能力，
获取对应的scan信息。
4. 在控制台打印扫描报告

### commit-file-scan

1. 使用lint工具，却没有安装依赖。
2. 获取未 add 的修改文件数量，比较工作区与暂存区的代码，提示是否有暂存的代码想要提交。
3. 获取此次 commit 修改的文件列表
4. 比较package.json和包名.config.js的区别，通过脚本命令的可选参数，调用lint工具的API能力，
获取对应的scan信息。
5. 在控制台打印扫描报告

### commit-msg-scan

1. 使用commitlint 对 git commit 的 commit message 进行检查

### update

1. 检查当前版本与最新版本，看是否安装最新的脚手架的包。

### package.json

```md
  // ???
  "dev": "npm run copyfiles && tsc -w",
  // tsc编译src下的源代码
  "build": "rm -rf lib && npm run copyfiles && tsc",
  // 拷贝config下的ejs文件到lib目录下。
  "copyfiles": "copyfiles -a -u 1 \"src/config/**\" lib",
  // 编译后，检测代码
  "test": "npm run build && jest",
  // 测试代码覆盖率
  "coverage": "nyc jest --silent --forceExit",
  // prepublishOnly: 在npm publish命令前执行
  "prepublishOnly": "npm run test"
```

## 测试工具

### jest

#### 官方使用指南

```js
// ES6 Class Mocks
// Using with puppeteer操作木偶的人
// 写法类似，有什么区别
describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });
});
```

#### 项目案例

```js
const assert = require('assert');
const stylelint = require('stylelint');
const path = require('path');

describe('test/rules-validate.test.js', () => {
  it('Validate default', async () => {
    const filePaths = [path.join(__dirname, './fixtures/index.css')];

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false,
    });

    if (result && result.errored) {
      const filesResult = JSON.parse(result.output || '[]') || [];
      filesResult.forEach((fileResult) => {
        console.log(`========= ${filePaths} ==========`);
        console.log(fileResult.warnings);
      });

      assert.ok(filesResult.length !== 0);
    }
  });
});
```

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
