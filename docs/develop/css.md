# CSS

## CSS面试题（不常问，放这了）

## 开发注意

* 拒绝使用行块盒，问题很多。

## 常见css属性

* word-break: break-all; // 允许在单词内部进行换行。当文本内容宽度超过其容器的宽度，无论单词完整，都要换行。
* text-align: justify; // 两端对齐

## CSS预处理器

### Sass

* 变量学习
`$theme-color: orange;`
* 原来没有值，才取这个加了!default的值。
`!default`
* 表示对象

```scss
$themes: (
  default-theme: (
    theme-color: orange,
  )
)
```

* 导入css文件

`@import "./defaultStyle.scss";`
