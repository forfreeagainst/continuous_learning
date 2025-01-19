# CSS

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
