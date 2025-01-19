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
