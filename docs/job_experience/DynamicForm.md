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
