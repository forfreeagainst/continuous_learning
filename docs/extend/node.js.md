# node.js

## node.js本身能力

### process

* argv:解析命令行参数

* cwd: 当前的工作目录

### path

* resolve: 解析文件，比require强大。eg:path.resolve(__dirname, '../index.ts');

### module

* createRequire: esModule不能使用require

```md  
require: 一个json，或者commonjs模块（esModule不能使用require,commonJs才可以）
解决办法：
import { createRequire} from "module";
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

import.meta.url ://file:///D:/soul-ocean/vue3_monorepo/script/dev.js
__dirname：当前文件的绝对路径（esModule不能使用__dirname,commonJs才可以）
解决办法：
import { dirname } from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);//获取文件的绝对路径
//D:\soul-ocean\vue3_monorepo\scripts\dev.js
const __dirname = dirname(__filename);
//D:\soul-ocean\vue3_monorepo\scripts
```

### 命令

* node  *** -f esm

## npm包

### git-clone

```js
const clone = require('git-clone/promise');
const { removeSync } = require('fs-extra');
const process = require('process');

const repo = 'https://github.com/forfreeagainst/zhrx-code-review.git';
const targetPath = 'src/';
const options = {
  checkout: 'main'//revision/branch/tag to check out after clone
}
clone(repo, targetPath, [options]).then(() => {
  //删除.git文件
  const removePath = `${process.cwd()}/${targetPath}.git`
  console.log("🚀 ~removePath:", removePath)
  removeSync(removePath);
})
```

### 脚手架入门: commander、ora、inquirer、chalk、fs-extra

```js
#!/usr/bin/env node

//demo练习：commander, ora, inquirer, chalk，fs-extra
//bug:ora版本8.多，提示oraEsM导入失败，使用低的版本了。

import { program } from 'commander';
import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';
// import fs from 'fs-extra';
// 常见API: readJSONSync,

program
  // 包名 init(command是必输，option是选输)
  .command('init')
  .description("一键接入")
  // 包名 init -s "<>必输"
  .option('-s, --port <number>', '{port: "必输内容"}')
  // 包名 init -z "[]选输"
  .option("-z, --fix [boolean]", "输入-z, 默认{fix: true}")
  // 包名 init -v
  .option('-v', "前面一个参数没有逗号分隔, 输入-v,得到{v: true},否则为undefined")
  .action(async function (opt) {//args是选项值，如：Object: {fix: true}
    // const { port, fix, v} = opt;
    // console.log(port, fix, v);
    console.log(opt);
    let step = 0;

    const { answer1 } = await inquirer.prompt({
      type: 'input',
      name: 'answer1',
      message: '请输入你的项目名'
    })
    console.log(answer1);
    if (!answer1) {
      //红色，加粗，背景色是白色，%s是变量
      console.log(chalk.red.bold.bgWhite('请%s%s'), '输入', '，不然无法使用');
      return;
    }
    const Question_Two = [
      {
        name: '黑色',
        value: 'black'
      },
      {
        name: '白色',
        value: 'white'
      },
      {
        name: '黄色',
        value: 'yellow'
      }
    ];
    const { answer2 } = await inquirer.prompt({
      type: 'list',
      name: 'answer2',
      message: `Step ${++step}. 请选择你喜欢的颜色`,
      choices: Question_Two,
    });
    console.log(answer2);

    const { answer3 } = await inquirer.prompt({
      type: 'confirm',
      name: 'answer3',
      //你确定要使用唯一的外挂 no(界面会显示yes或者no)
      message: '你确定要使用唯一的外挂',
      default: true
    });
    //answer的值为true或者false
    console.log(answer3);

    //loading的效果
    // const loading = ora('初始化加载中......').start();
    // setTimeout(() => {
    //   loading.stop();
    // },2000)
  });

// program
//   .name('wiggins-lint-cli')
//   .description('CLI to some JavaScript string utilities')
//   .version('0.0.0');
// program
//   .option('-s, --small', 'small pizza size')
//   .option('-c, --cheese [type]', 'Add cheese with optional type');

program.parse(process.argv);
```

## package.json字段详解

### package.json中unpkg用途？

在`package.json`中并不存在`unpkg`这样一个直接的标准字段或配置项，但`unpkg`与`package.json`
所涉及的包管理等内容密切相关，其主要用于如下：

* 内容分发网络（CDN）服务

`unpkg`是一个免费的CDN，可用于托管和分发开源项目的代码和资源。当一个项目的开发者将代码发布到
像npm这样的包管理器时，`unpkg`能根据`package.json`中的信息，如版本号、文件路径等，快速地将
相应的文件内容通过CDN分发到全球各地，让用户能快速访问和加载项目的代码和资源。

* 快速原型开发和测试

在开发前端时，开发者可以在HTML文件中直接通过`unpkg`的链接引入所需的库或框架，无需在本地使用
`npm install`等命令安装。例如`https://unpkg.com/vue@3.2.37/dist/vue.global.js`，可快速
验证代码逻辑或展示效果。

* 共享和引用项目源码

项目中的`package.json`记录了项目的依赖等信息，`unpkg`可根据这些让其他开发者方便地共享和引用
项目的资源，便于代码的复用和传播。如果项目中有一些可供外部使用的工具函数、样式文件等，通过
`unpkg`结合`package.json`的配置，能轻松实现资源共享。

### npm script有生命周期？

npm script是有生命周期的，主要包括以下几个常见阶段

#### 生命周期顺序

1. :star: 安装阶段：preinstall, install, postinstall, prepare
2. 运行脚本阶段：prerun, run, postrun
3. 卸载阶段：preuninstall,unintall,postuninstall

#### :star: 预安装阶段（preinstall）

* 在`npm install`开始安装依赖之前触发。可用于执行一些准备工作，如检查环境、下载额外资源等。

eg: `"preinstall": "npx only-allow pnpm"`

#### 安装阶段（install）

* 当执行`npm install`命令时，会下载并安装项目的依赖包，此阶段会触发相关脚本。

#### :star: 准备阶段（prepare）

* 在所有依赖安装完成后执行，在生成`package.json`或`npm-shrinkwrap.json`前执行。与会在
`npm publish`之前执行，用于在发布前进行一些准备工作。

eg: `"prepare": "husky install "`

#### 预发布阶段（prepublish）

* 在 `npm publish` 命令执行前触发。常用于进行一些准备发布的操作。像代码检查、测试、构建
等，确保发布的代码符合要求。

#### 发布阶段（publish）

* 执行 `npm publish` 命令时触发，用于将包发布到npm仓库。

#### 预启动阶段（prestart）

* 在 `npm start`命令执行前触发。用于进行启动前的准备工作，如环境配制、检查服务依赖等。

#### 启动阶段（start）

* 执行`npm start` 命令时触发，通常用于启动项目的主要服务或应用程序。

