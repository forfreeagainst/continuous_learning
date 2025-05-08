# vue2迁移到vue3

完全可以自己讲vue-form-making 迁移到 vue3。

## 价值+最佳实践+评估

### 价值

* 更好地理解低代码，表单生成工具
* vueDraggable转换成vueDraggableNext,万一不行，自己二次封装sortable.js（几百行代码）

### 评估

* 依赖的插件/库尚未兼容 Vue 3。

### 实操

#### 进化

* vue-cli自带的打包配置+webpack => vite

#### 注意

* 不要乱删方法！！！，有可能跨组件调用。（构建工具，会消除死代码）
* 不要乱删导入的组件，可大驼峰或者中划线命名法。

#### 常规

* 选项式 API => 组合式 API，没有this

* 动态类型语言 JavaScript => 静态类型语言 TypeScript

* 生命周期beforeCreate, created, destoryed, ... => unMounted, setup, onMounted, ...

* 数组的 $set 和 $delete => 

* watch => 语法变更

 A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.

* 组件ref => const xxx =ref(null);

命名冲突：组件名(一会中划线，一会大驼峰)，组件ref，响应式对象ref

* setTimeout、 $nextTick => nextTick

* 响应式对象data => ref 或 reactive

* v-model(value、input, 1个) + .sync(多个) => v-model(modelValue、update:modelValue，多个)

`<ChildComponent v-model:title="pageTitle" v-model:content="pageContent"/>`
`<ChildComponent v-model="dialogVisible"/>`

```js    
const emit = defineEmits(['update:select']);
emit('update:select', val);
```

* vue-router3.0 => vue-router4.0

```js
// 旧的写法
this.$router.push({name: this.$route.name});

// 新的写法
import {useRouter, useRoute} from 'vue-router';
const router = useRouter()
const route = useRoute();

router.push();
```

* UI框架，需要注意的是遗弃的属性等 => 替换类似效果

* 不规范的代码：组件名和响应式对象的变量 一致，在没有this的情况下 => 人工肉眼替换

##### 插槽

* 作用域插槽(Scoped Slots)允许子组件向父组件传递数据，使父组件可以控制如何渲染这些数据 => 

###### Vue3写法

具名插槽

```md
<!--父组件-->
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>

<!--子组件-->
<div class="container">
  <slot name="header"></slot>
</div>
```


##### Vue2模板只允许一个根节点 => Vue3的 Fragment(片段) 允许组件模板拥有 多个根节点。

* 避免多余的div嵌套，让DOM 结构更加简洁。 
* 更好的渲染性能：Fragment 的扁平化处理减少了虚拟 DOM 树的深度，提升 diff 效率。

| 特性 | Vue 2 | Vue 3 (Fragment) |
| --- | --- | --- |
| 虚拟DOM根节点	| 必须是单个元素节点 | 可以是Fragment（特殊符号）|
| 挂载方式 | 通过 $el 挂载 | 直接操作父容器插入子节点 |
| Diff算法 | 递归树比对 | 扁平化同级节点比对 |
| 模板编译结果 | 返回单个VNode函数 | 返回节点数组 |
| 组件实例管理 | 依赖根元素引用	| 无根元素依赖 |

仍需注意：

* 过渡动画（Transition）：仍需要单根节点来确定动画目标

```js
<Transition>
  <div v-if="show"> <!-- 必须单根 -->
    Content
  </div>
</Transition>
```

* 属性继承：多根节点时，父组件传递的非 prop 属性需要显式绑定

```js
<template>
  <header v-bind="$attrs"></header>
  <main v-bind="$attrs"></main>
</template>
```

## 阅读文档

