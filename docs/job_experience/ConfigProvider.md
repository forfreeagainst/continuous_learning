# 配置式的Provider

已投降，vant项目感觉没啥可挖掘

已投降，vant项目感觉没啥可挖掘

已投降，vant项目感觉没啥可挖掘

## ElementPlus的ConfigProvider

message: 最多三个消息提示

## 前沿

* 借助naive ui provider，实现了message,dialog,loadingBar等通用组件以hooks的方式植入子层级的context
* ConfigProvider抽离成组件，要注意要添加slot
* Naive UI 的n-loading-bar-provider本质上是 通过Vue 的provide/inject 机制提供全局方法。
但它的设计更专注于封装状态管理和生命周期控制，而不仅仅是简单地暴露一个方法。

## 参考

* navie ui 的 provide
* elementUIPlus 的 provide