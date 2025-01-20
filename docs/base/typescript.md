# typescript

## 常见语法

* Record<string, any>用于表示一个键为字符串类型，值可以为任意类型的对象。

```typescript
const animal: Record<string,any> = {
  name: '小炎',
  age: '3'
}
```

## tsc命令行编译器

tsc是TypeScript的官方命令行编译器，用来检查和编译TypeScript代码，生成JavaScript代码。

tsc 默认使用当前目录下的配置文件tsconfig.json，但也可以接受独立的命令行参数。命令行参数会覆盖tsconfig.json，比如命令行指定了所要编译的文件，那么 tsc 就会忽略tsconfig.json的files属性。

### tsc的命令行参数

* --watch（或者-w）：进入观察模式，只要文件有修改，就会自动重新编译。
* --module：指定编译生成的模块格式。
* --sourcemap：为编译产生的 JS 文件生成 SourceMap 文件（.map 文件）。
* --outDir：指定编译产物的存放目录。
* --outFile：所有编译产物打包成一个指定文件。

### 用例

npm install -g typescript

tsc

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
