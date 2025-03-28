# 设计模式 + 数据结构

## 设计原则SOLID

支持多人协作的、易于理解的、易读的、可测试的代码

### S: SRP single responsibility principle 单一职责原则

定义：一个类应该只有一个引起它变化的原因。

* 每个类只负责一项职责
* 减少类之间的耦合
* 提高代码的可读性和可维护性

### O: open closed principle 开闭原则 （软件实体， 对扩展开放，对修改关闭） eg: Vue源码的插件

定义：软件实体（类、模块、函数等）应该对扩展开发，对修改关闭。

* 通过扩展而不是修改现有代码来添加新功能
* 使用抽象和接口来实现这一原则

### L: Liskov Substitution principle 里式替代原则（子类可以替换掉父类）eg: 看起来像Java的多态

### I: interface segregation principle 接口隔离原则（原子化）

### D: dependence inversion principle 依赖倒置原则 eg: 爷孙的通信 useContext provide inject

## 设计模式

设计模式 是软件开发的经典解决方案。

### 创建型模式

增强 已有代码的灵活性

#### 单例模式

每个类都只有一个实例。eg: loading

### 结构型模式

将 不同代码 解耦

### 行为模式

不同的行为 解耦
