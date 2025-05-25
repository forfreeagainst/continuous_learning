# Vue

如果你是一个老师，你要如何让学生快速上手 Vue 和 React

## 简单过官网

### 受限的全局访问

模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 Math 和 Date。

没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 window 上的属性。然而，你也可以
自行在 app.config.globalProperties 上显式地添加它们，供所有的 Vue 表达式使用。

### ref 的实现

```js
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

非原始值将通过 reactive() 转换为响应式代理，该函数将在后面讨论。

也可以通过 shallow ref 来放弃深层响应性。对于浅层 ref，只有 .value 的访问会被追踪。浅层 ref 可以用于避免对
大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。

### Reactive实现

reactive() 返回的是一个原始对象的 Proxy

依靠深层响应性，响应式对象内的嵌套对象依然是代理

有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。

不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

### nextTick使用场景

之前有个 驳回的业务，需要把 之前填写的业务数据，渲染给用户。表单的数据有联动，一开始，我们关闭了监听，等
页面重新渲染Dom完成，再打开监听。用到了nextTick

### computed的实现

返回值为一个计算属性 ref。和其他一般的 ref 类似，你可以通过 publishedBooksMessage.value 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。

计算属性 VS 方法： 1个数据在模板多次被使用，建议使用计算属性

计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要改变其他状态、在 getter 中做异步请求或者更改 DOM！

### 事件修饰符

* .stop: 阻止冒泡, eg：
* .prevent 阻止 默认行为， eg: 表单默认提交
* .self 
* .capture 阻止捕获
* .once 至多触发一次
* .passive 不阻止 默认行为， eg: touch、wheel

### 3.4+使用

#### props

* 同名简写`<div :id></div> => <div v-bind:id></div>`
* 如果需要，可以通过访问计算属性的 getter 的第一个参数来获取计算属性返回的上一个值

#### 组件 v-model

v-model 可以在组件上使用以实现双向绑定。

child.vue

```js
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>

// 实例2
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

parent.vue

```js
<Child v-model="countModel" />
```

### 3.5+使用

#### 模板引用的useTemplateRef

```js
<script lang="ts" setup>

// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')
// const input = ref('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

#### 响应式 Props 解构

* `const { foo } = defineProps(['foo'])`

### 侦听器

#### watch

侦听数据源类型:它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

```js
const count = ref(1);
const book = ref({
  bookName: '被讨厌的勇气',
  author: '岸见一郎'
})
const person = reactive({
  name: 'durant',
  age: 35
})
const song = reactive({
  songName: '进阶',
  author: 'JJ'
})
watch([() => book.value.author, count, () => person.name, song],() => {
  console.log("🚀 ~ watch ~ book.value:", book.value)
  console.log("🚀 ~ watch ~ song:", song)
  console.log("🚀 ~ watch ~ person:", person)
  console.log("🚀 ~ watch ~ count.value:", count.value)
})

setTimeout(()=> {
  book.value.author = 'me';// ref定义的非原始类型，需要（）=> book.value.author
})
setTimeout(() => {
  person.name = 'Brunson';
}, 2000);
setTimeout(() => {
  count.value += 1;
}, 1000)
setTimeout(() => {
  song.songName = '江南';
}, 3000)
```

#### watchEffect

不用写侦听数据源，侦听数据源为回调的响应式依赖。immediate立即执行一次。

```js
const count = ref(1);
watchEffect(async() => {
  console.log(count.value);
})
setTimeout(() => {
  count.value += 1;
}, 1000);
```

#### 停止侦听器

侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏

### 代码风格

#### 组件命名

`<MyComponent greeting-message="hello" />`

对于组件名我们推荐使用 PascalCase，因为这提高了模板的可读性，能帮助我们区分 Vue 组件和原生 HTML 元素。然而对于传递 props 来说，使用 camelCase 并没有太多优势，因此我们推荐更贴近 HTML 的书写风格。(官网推荐而已)

像组件与 prop 一样，事件的名字也提供了自动的格式转换。注意这里我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 prop 大小写格式一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。

### 深入组件的props

#### 更改对象 / 数组类型的 props​

当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，对 Vue 来说，阻止这种更改需要付出的代价异常昂贵。

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。在最佳实践中，你应该尽可能避免这样的更改，除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该抛出一个事件来通知父组件做出改变。

#### 深入组件的透传 Attributes



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
