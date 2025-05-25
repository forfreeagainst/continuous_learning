# 代码规范

* || 和 &&  返回最后一个判定的值；res.list || []  obj.reset && obj.reset();
* 大厂赋值undefined, 使用void 0(随便一个表达式);

Undefined是window的一个属性。Window.undefined(只读属性)，但可以定义一个变量名为undefined. Var undefined = 333;

* Js的一些简写形式：

```js
{sum: sum}   等价于 {sum}

{set:function() {}, get:function() {}}  等价于 {set() {}, get() {} }
```

