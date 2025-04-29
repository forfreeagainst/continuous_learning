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

#### 常规

* 选项式 API => 组合式 API，没有this

* 动态类型语言 => 静态类型语言

* 生命周期beforeCreate, created, destoryed, ... => unMounted, setup, onMounted, ...

* 数组的 $set 和 $delete => 

* 组件ref => const xxx =ref(null);

* setTimeout、 $nextTick => nextTick

* 响应式对象data => ref 或 reactive

* 作用域插槽(Scoped Slots)允许子组件向父组件传递数据，使父组件可以控制如何渲染这些数据 => 

* v-model(value、input, 1个) + .sync(多个) => v-model(modelValue、update:modelValue，多个)

`<ChildComponent v-model:title="pageTitle" v-model:content="pageContent"/>`
`<ChildComponent v-model="dialogVisible"/>`

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

## 阅读文档

