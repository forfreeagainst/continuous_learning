# React源码

## 已学进度

1-1，2-1

## 为什么要学习React源码

### 解决常见面试题

* 为什么不能在循环，条件 或者 嵌套函数中调用 Hook

* 为什么 Hook 出现之后，函数组件中可以定义 state，保存在了哪里

* React / Vue DIFF 算法

Vue是数组，可以双向查找。React是单链表，使用单向查找。

### 优化项目

* 了解 React运行机制，提升项目性能，如合理使用缓存、尽可能避免组件的无效渲染等。
* 具体措施：保证组件key 取值的稳定性、适时使用 useCallback、useMemo、memo等API，掌握React中
状态的管理方式，掌握effect的使用时机等。

### 提高个人编码水平

React的那些学习知识点

VDom、Fiber、单链表、循环列表、最小堆、单线程任务调度器、位运算、哈希表、深度优化搜索、栈与队列等等。

## React的迭代历史

###  16.3: 引入fiber架构

###  16.8：正式引入hooks。（这条很重要，一定要能说出来）

### 17: 垫脚石版本

* 全新的JSX转换，在React17以前 ，使用JSX语法，必须要导入React,否则会报错。这是因为旧的 JSX 转换会把 JSX 转换为 React.createElement(...) 调用。

React.createElement和vue的h很相似吧，React.createElement 和 Vue 的 h 函数非常相似，它们都是用于创建虚拟 DOM 元素的底层 API。

* 事件委托的变更，不再委托在document，而是组件的最顶层。
* 副作用清理事件
* 返回一致的 undefined错误

<!-- 其他不了解了

* 事件系统相关更改
* 去除事件池
* 原生组件栈
* 移除私有导出
* 启发式更新算法更新 -->

### 18：大量新特性出现，如自动批量处理、非紧急更新、Concurrent等。

* setState 变成自动批量更新，是异步。如果想同步的话，用flushSync

* transition的API: startTransition、useTransition、useDeferedValue

* ...

## Thinking in React（React哲学）

## 其他

jsx => react/jsx-runtime