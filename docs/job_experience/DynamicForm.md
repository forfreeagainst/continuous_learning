# 动态表单

主导动态表单的实现，支持表单联动、分组展示、动态表单项，解决了因UI规范引发的业务组件频繁重构问题，显著降低了重复修改所产生的人工成本。（使用统一UI风格的业务组件，本质上是对原本UI组件库的组件进行二次封装）

难点在于schema的设计
formData:表单数据
formFields: 表单字段说明

* 多人开发导致的UI风格不一致性
* 要把业务逻辑 抽离到 父组件 身上。eg: 选择器的弹窗（组件通信：爷到孙，孙到爷）（放弃了v-model,emit, 采用了
provide、promise）
* 分组展示：一开始打算用 再嵌套一层数组。因为动态表单项、表单联动，有时某字段的规则要变更，有时表单项
要进行添加或删除，这样处理极其麻烦。最后换了个思路，给每个表单项添加一个classList, 选取不同的样式，
实现分组展示。
* 初始化数据

注意的是我爷组件的provide,提供的是响应式的ref,
孙组件inject接收，v-model = 响应式的ref。

v-model + computed(computed的get使用 props.xxx ,set使用update:modelValue)

```js
// formData = { person: {age: 35, name: 'durant'}}
// 场景一： formData.person.durant  文本框 v-model
// 场景二： formData.person.durant 传递给子组件 的文本框v-model
```

```js
 {
    name: 'username',
    label: '用户名',
    type: 'text',
    placeholder: '请输入您的用户名',
    rules: [
        { required: true, message: '用户名不能为空' },
        { 
            validator: (val: string) => val.length >= 3, 
            message: '用户名至少3个字符' 
        }
    ],
}
```

## 直接修改props,不推荐，但官网示例也这么做

是的，Vue 官网示例中确实直接修改了 props.model 的子属性（如 props.model.children），这在 Vue 的单向数据流原则中通常是不推荐的。但这里有一个关键点需要澄清

### 为什么官网示例可以这样写？

#### props.model 是一个对象（引用类型）

Vue 的 props 是只读的，但这里的 props.model 是一个对象（而非基本类型如 string/number）。
虽然不能直接对 props.model 重新赋值（如 props.model = {} 会报错），但修改对象的属性（如 props.model.children）在技术上是可行的，因为 JavaScript 的引用类型特性允许这样做。

#### 示例的简化目的

官网示例为了聚焦于递归组件的核心逻辑（如 TreeItem 的递归渲染），省略了严格的状态管理（如 Vuex/Pinia），直接通过修改对象属性实现“简易状态更新”。
这种写法在简单场景中能工作，但不适合大型项目。

#### 隐式假设 model 是响应式对象

如果父组件通过 reactive() 或 ref() 创建了 model 并传递给子组件，子组件对 props.model.children 的修改会触发父组件的响应式更新（因为父子组件引用同一个响应式对象）。

### 潜在问题

#### 违背单向数据流

Vue 官方文档明确建议避免直接修改 props，因为这会导致：

* 数据流难以追踪（父组件不知道子组件何时修改了数据）。
* 组件复用性下降（逻辑耦合到父组件的特定数据结构）。

#### 响应式更新可能丢失

如果父组件传递的 model 不是响应式对象（如直接传递一个普通对象 { name: 'foo', children: [] }），子组件的修改不会触发视图更新。
