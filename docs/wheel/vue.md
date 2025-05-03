# Vue

## Vue3

### 脚手架

* [脚手架](https://github.com/vuejs/create-vue.git)

### 常用API

* reactivity：传入的是对象
* shallowReactivity
* ref: 可传入基本类型和 对象
* shallowRef：

* isRef: 检查某个值是否为 ref。
* unref: 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。
* toRef: 把reactive变成ref去使用，意义是解构的时候，丧失响应式。同时模板上使用方便，模板自动补充.value;

```js
// 中转了一下 name.value ===> state.name
let state = reactive({name: 'durant', age: 35});
// toRef: 两个参数, 代码书写，又是一个类，有set value, 和get value;
let name = toRef(state, 'name');
let age = toRef(state, 'age');
console.log(name.value, age.value);
```

* toRefs: 可多个一起
* proxyRef: 工具函数，接收带有ref的对象，主要用于处理 ref 对象的自动解包(unwrap)问题。

```js
import { ref, proxyRefs } from 'vue'

const foo = ref('hello')
const bar = ref('world')

const proxy = proxyRefs({ foo, bar })

console.log(proxy.foo) // 直接输出 'hello'，而不是 ref 对象
console.log(proxy.bar) // 直接输出 'world'
```

* proxyRefs: Vue3 响应式系统中一个相对底层的 API，在大多数应用开发中可能不会直接使用，但在编写库或复杂组合式函数时会很有用

```js
function proxyRefs(objectWithRef) {
  return new Proxy(objectWithRef, {
    get(target, key, receiver) {
      let r = Reflect.get(target, key, receiver);
      return r.__v_isRef ? r.value : r;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      if (oldValue.__v_isRef) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  });
}
```

* computed: 接收参数 getter函数，或者 选项（对象有get方法和set方法） 
* watch: 接收参数 1 监测数据  2 回调函数  3选项可选 (监测数据 ：ref 或reactive 或 函数)
* watchEffect: 监控多个数据

* readonly
* shallowReadonly

* storeToRefs：store里的数据解构不失去响应式。（可以让解构的东西不失去响应式,只可以对变量，方法不行）

```js
import { blocksEditor } from '@/stores/blocksEditor';
const blocksStore = blocksEditor();
const { blocks } = storeToRefs(blocksStore);
```

* toRaw：变成未加工的，可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。

```js
const foo = {};
const reactiveFoo = reactive(foo);
console.log(toRaw(reactiveFoo) === foo); // true
```

* markRaw：将一个对象标记为不可被转为代理。返回该对象本身。

## Vue3AndTypeScirpt

### ref、reactive

```js
type blockType = 'a': 'b': null;
const block = ref<blockType>('a')
```

### defineProps、defineEmits

```js
<van-field
    v-model="formData[fieldInfo.name]"
    :name="fieldInfo.name"
    :label="fieldInfo.label"
    :type="fieldInfo.type"
    :placeholder="fieldInfo.placeholder"
    :rules="fieldInfo.rules"
/>
```

```js
// props非模板里面使用， fieldInfo可以在模板里面使用
const props = defineProps<{
    fieldInfo: object,
}>();
const props = defineProps<{
  preview: {
    type: Boolean,
    default: false
  }
}>();

// js写法
const props = defineProps({
  foo: String
});
const props = defineProps({
  upload: {
    type: Boolean,
    default: false,
  },
});
// :upload="true" 这样不会报错
```

```js
const emit = defineEmits(['submit'])
const onSubmit = (values) => {
    emit('submit', values);
};
```

### provide、inject

```js
import {ref, provide} from 'vue';
const formData = ref({
    username: 'durant',
    useCoupon: true,
})

provide('formData', formData);
```

```js
import {inject} from 'vue';

const formData = inject('formData');
```

### watch

```js
watch(() => formData.value.username, ()=> {
    formData.value.useCoupon = !!(formData.value.username)
    console.log("🚀 ~ watch ~ formData.value.useCoupon:", formData.value.useCoupon)
})
```

### 组件的ref

```js
<div class="canvas" ref="containerRef"></div>

// HTMLDivElement、HTMLElement
var containerRef = ref<HTMLDivElement | null>(null)
```

注意ref，要在onMounted后使用。setup里是没有dom。

### 定义类型

```js
import type { App } from 'vue'
app: App<Element>


```

## Vue3项目如何使用Webpack?

区别于vite创建vue3项目，区别于vue-cli创建vue3项目并把webpack.config.js给隐藏了

### 初始化项目

```bash
mkdir vue3-webpack-project
cd vue3-webpack-project
npm init -y
```

### 安装 Vue 3 和 Webpack 相关的依赖

```bash
npm install vue@3
npm install --save-dev webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc css-loader style-loader html-webpack-plugin
```

* vue@next: Vue 3 的核心库。
* webpack: Webpack 构建工具。
* webpack-cli: Webpack 命令行工具。
* webpack-dev-server: 开发服务器。
* vue-loader@next: 用于加载 .vue 文件。
* @vue/compiler-sfc: 用于编译 Vue 单文件组件。
* css-loader 和 style-loader: 用于处理 CSS 文件。
* html-webpack-plugin: 用于生成 HTML 文件。

### 创建项目结构

```md
vue3-webpack-project/
├── src/
│   ├── App.vue
│   ├── main.js
│   └── index.html
├── webpack.config.js
└── package.json
```

### 编写代码

`src/App.vue`

```vue
<template>
  <div id="app">
    <h1>Hello Vue 3 with Webpack!</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

`src/main.js`

```js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

`src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 3 Webpack</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### 配置webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
};
```

### 配置 `package.json` 脚本

```json
"scripts": {
  "dev": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

### 运行项目

* 运行开发服务器 `npm run dev`
* 构建生产版本 `npm run build`

### 访问项目

在浏览器中访问 http://localhost:9000，你应该会看到 "Hello Vue 3 with Webpack!" 的页面。

### 强化webpack.config.js配置

#### 思考

##### Vue警告: VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__,

```js
const { DefinePlugin } = require("webpack");

new DefinePlugin({
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false,
}),
```

##### style-loader还是vue-style-loader

vue-style-loader：专门为 Vue 项目设计，主要用于处理 Vue 单文件组件（SFC）中的样式。Vue 单文件组件有 style 标签，这些样式可能会有 scoped 属性，用于实现局部样式，vue-style-loader 能够很好地处理这些特性。
style-loader：是一个通用的 Webpack loader，可用于任何 Webpack 项目，不局限于 Vue 项目。它可以将 CSS 代码以 style 标签的形式插入到 HTML 文档的 head 中，适用于处理普通的 CSS 文件。

##### 按需加载elementUiPlus（待测）

```js
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
```

plugin放置

```js
// 按需加载element-plus
AutoImport({
  resolvers: [ElementPlusResolver()],
}),
Components({
  resolvers: [
    ElementPlusResolver({
      // 自定义主题，引入sass
      importStyle: "sass",
    }),
  ],
}),
```

##### 其他看官网配置

* npm install --save-dev mini-css-extract-plugin
* npm install css-minimizer-webpack-plugin --save-dev
* npm install terser-webpack-plugin --save-dev
* ImageMinimizerWebpackPlugin可用tinyPng替代吧，感觉没啥必要
* npm install copy-webpack-plugin --save-dev
* 处理图片（png等）和其他资源（ttf等）
* 处理js（babel-loader、@babel/core）,babel.config.js
* vue-loader开启缓存
* 优化：codeSplit, runtimeChunk等
