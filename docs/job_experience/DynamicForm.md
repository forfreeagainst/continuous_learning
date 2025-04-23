# 动态表单

主导业务开发的能力还是有的

技术类的东西，我只能告诉他们怎么用。

主导动态表单的实现。（组件库封装）

使用统一UI风格的业务组件（本质上是对原本UI组件库的组件进行二次封装）

* 策略模式 / 动态组件 + 动态表单
* 表单联动（于父组件书写逻辑）、（移除表单选项）
* 组件进行分组展示 (二维数组了， 在联动/提交校验规则/增加表单项的时候，都要多访问一层)
* 初始化数据

formData:表单数据
formFields: 表单字段说明
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
