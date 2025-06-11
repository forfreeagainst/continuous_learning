# 虚拟滚动

vue-virtual-scroller (vue的h用途，mitt、vue-observe-visibility、vue-resize配合使用，) 
退而求其次，把b站那个虚拟滚动的代码摘录了。

## 核心思想

动态渲染：只渲染可视区域（Viewport）内的数据。
DOM 复用：滚动时复用已存在的 DOM 节点，仅更新内容。

## 使用场景

* 超过 1,000 条数据的表格/列表。
* 对滚动流畅性要求高的场景（如移动端）。
* 需要高频更新的实时数据展示。