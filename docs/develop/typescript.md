# typescript

## 关键特性

* 静态类型检查：TypeScript 在编译时就会检查代码的类型是否匹配，能够发现很多潜在的错误。即使是简单的错误（例如拼写错误或类型不一致），也可以在编写代码时被捕获到。
* 类型推断：TypeScript 能够自动推断变量的类型。比如当你声明一个变量并赋值时，TypeScript 会根据赋值来推断这个变量的类型，不需要每次都显式声明类型。
* 代码提示：已知是字符串，vscode编辑器就能显示字符串的方法，使开发过程高效。
* 团队合作
* 便于前后端协作，thift/swagger

## 类型

### 基础类型

```ts
const aa: null = null;
const bb: undefined = undefined;
const cc: string = "23";
const dd: number = 2;
const ee: boolean = true;
const ff: Symbol = Symbol();
let gg: bigint;
const func: Function = () => undefined;
```

### 常见类型

```ts
// Object
const obj: Record<string, any> = {string: 'any'}

// Array
const numArr: number[] = [32, 33];
const numArr: Array<number> = [123, 456];

// Promise
//async 是异步函数，也适合用promise<string>
function chooseColor = () : promise<string> {
} 

//interface的extends
interface Person {
    age: number
}
interface BaseInfo extends Person{
    name: string,
    gender?: string
}

//namespace:归类效果
namespace Eslint {
    interface ccc {
        log: string,
        isLog: boolean
    }
    interface animal {
        nickname: string
    }
    type: number
}
Eslint.ccc


interface Obj {
  name: 'durant',
  age: '18'
}
type PickUser = Pick<Obj, 'name'>;
type OmitUser = Omit<Obj, 'name'>;
// Omit: 忽略我们不需要关心的属性
// Pick: 拣选我们需要关系的属性
// Partial：全都变成可选属性
// Required: 全都变成必选属性

import type { langType } from "@/I18n/index.ts";  // ✅ 正确：显式声明仅导入类型

["zh-cn", "en"] as const; // 固定常量，用于类型安全。

// 对象（遍历对象中的每个属性，键不一定有，值为 replaceCallback的数组）
{ [key in EventTypes]?: ReplaceCallback[] }



declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $blocksMap: string
  }
}
// 同样用法
import {
  DefineNumberFormat
} from 'vue-i18n'
declare module 'vue-i18n' {
  // define the number format schema
  export interface DefineNumberFormat {
    currency: {
      style: 'currency'
      currencyDisplay: 'symbol'
      currency: string
    }
  }
}
```

### 特殊类型

* any 相当于js
* unknown 更安全的any, 有类型守卫/判断类型。（eg: *** instanceof Array）

TypeScript 提供了类型守卫（如 typeof 和 instanceof），用于在运行时缩小变量的类型范围。

* void 函数没有返回值
* never 永远没有结果

* type
* interface

interface 可以重复定义，type 不行。

* 枚举 enum
* promise `Promise<name: string> => Person`
* 联合类型 |
* 交叉类型 &
* 命名空间 namespace: iife+闭包

### 类型工具/类型操作工具

* Partial 把必填变为可选
* Require 把可选变为必填
* Record<string, any>用于表示一个键为字符串类型，值可以为任意类型的对象。
* Readonly 只读，可以解决引用类型+const定义的变量，其属性可被修改，很像Object.freeze()
* Pick<Person, 'name' | 'gender'> 挑选哪些属性，我有名、有性别
* Omit<Person, 'age'> 省略（排除）哪些属性，除了年龄我都有
* exclude<'a' | 'b' | 'c', 'a'> 从联合类型，进行排除
* Parameters<****> 有点像函数的arguments，类数组
* ReturnType<****>

## tsc命令行编译器

tsc是TypeScript的官方命令行编译器，用来检查和编译TypeScript代码，生成JavaScript代码。

tsc 默认使用当前目录下的配置文件tsconfig.json，但也可以接受独立的命令行参数。命令行参数会覆盖tsconfig.json，比如命令行指定了所要编译的文件，那么 tsc 就会忽略tsconfig.json的files属性。

### ts-node

ts-node是一个TypeScript执行引擎，能让我们在Node.js环境下直接运行TypeScript代码。

运行命令 `ts-node test.ts`

### tsc的命令行参数

* --watch（或者-w）：进入观察模式，只要文件有修改，就会自动重新编译。
* --module：指定编译生成的模块格式。
* --sourcemap：为编译产生的 JS 文件生成 SourceMap 文件（.map 文件）。
* --outDir：指定编译产物的存放目录。
* --outFile：所有编译产物打包成一个指定文件。

### 用例

npm install -g typescript

`tsc --init` 生成tsconfig.json文件

`tsc -p ./` 编译ts文件，转成js文件

tsconfig.json

```json
{
    "compilerOptions": {
        "outDir": "./dist", // 指定输出目录为dist文件夹
        "target": "es5", // 设置目标语言的版本
        "module": "commonjs", // 设置模块系统
        "strict": true // 启用所有严格类型检查
    },
    "include": [
        "./src/**/*" // 包含src目录及其子目录下所有的ts文件
    ],
    "exclude": [
        "./node_modules", // 排除node_modules目录
        "./**/*.spec.ts" // 排除所有的spec文件
    ]
}
```

```json
{
  "compilerOptions": {
    "outDir": "dist", // 输出的目录
    "sourceMap": true,
    "target": "ES2016", // 目标语法
    "module": "ESNext", // 模块格式
    "moduleResolution": "node", // 模块解析方式
    "strict": false, // 严格模式(eg: any会报红)
    "resolveJsonModule": true, // 解析json 模块
    "esModuleInterop": true, // 允许通过es6模块引入commonjs模块
    "jsx": "preserve", // jsx 不转译
    "lib": ["ESNext", "DOM"], // 支持的类库
    // 配置别名
    "baseUrl": ".",
    "paths": {
      "@vue/*": ["packages/*/src"]
    }
  }
}
```

### 待补充，未整理

extends interface
implements class 的定义
namespace命名空间的本质是闭包+iife。
同级目录ts变量共享，我们使用EsModule解决这个问题。
global.d.ts
thift / swagger
HTMLButtonElement、HTMLCanvasElement
装饰器-》类方法-内层定义、类的构造器-外层定义，属性。运用像express api（user/getUserInfo）中间件
Reflect
declare
keyof、typeof
变量命名空间const a :string，类型命名空间type a = "string" | "number"
