# node.js

```md
process
  argv:解析命令行参数

module
  createRequire:

path
  resolve: 解析文件，比require强大。eg:path.resolve(__dirname, '../index.ts');

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
