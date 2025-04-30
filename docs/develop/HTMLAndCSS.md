# HTML和CSS

## HTML

### canvas

#### 定义

canvas和img元素很像，但canvas只有两个属性，width和height。canvas默认初始宽度300像素，宽度150像素。该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，它会出现扭曲。

#### 常见API

* getContext: 获取渲染上下文
* fillStyle:画笔颜色
* clearRect(4个坐标)：清除指定矩形区域，让清除部分完全透明。
* fillRect(4个坐标)：从哪个坐标点绘制多少宽多少高的形状，绘制矩形区域
* strokeRect(4个坐标)：类似fillRect,这里是绘制矩形边框
* strokeStyle：边框颜色
* beginPath():开始绘制路线
* moveTo(两个坐标)：画笔移动到哪个（x,y）坐标
* lineTo(两个坐标)：绘制一条从当前位置到指定 x 以及 y 位置的直线。
* fill():填充绘制
* stroke():描边绘制
* closePath(): 关闭绘制路线

#### 例子

```html
<canvas id="cavnasArea"></canvas>
```

```js
const canvasBox = document.getElementById('cavnasArea')
if (canvasBox.getContext) {
  const ctx = canvasBox.getContext("2d");
  ctx.beginPath();  
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
  // ctx.fill();
  ctx.stroke();
}
```

#### 最佳实践

```js
```

## CSS

### 开发注意

* 拒绝使用行块盒，问题很多。

### 常见css属性

* background: linear-gradient(to left, cyan 50%, palegoldenrod 50%); // 使用渐变，形成样式的1/2
* transform: scale(0.5); // 使用缩（小）放（大） 实现 1px
* word-break: break-all; // 允许在单词内部进行换行。当文本内容宽度超过其容器的宽度，无论单词完整，都要换行。
* text-align: justify; // 两端对齐

### CSS预处理器

#### Sass

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
