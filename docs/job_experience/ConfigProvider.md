# 配置式的Provider

借助naive ui provider，实现了message,dialog,loadingBar等通用组件以hooks的方式植入子层级的context

ConfigProvider抽离成组件，要注意要添加slot

参考naive ui provider的实现原理，实现了类似功能，这就能算是亮点。这和用hooks效果差不多。

loading这是个组件，不是hooks,而message是hooks

hooks代码逻辑的整合，组件是要在template写组件标签的。

优点：

* 统一管理：所有组件调用方式统一
* 使用便捷：通过 hook 轻松调用
* 可扩展性：易于添加新功能或修改现有行为

## 参考

* navie ui 的 provide
* elementUIPlus 的 provide