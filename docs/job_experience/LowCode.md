# 低代码

Vue3, 表单生成工具。

个人感觉：低代码的灵活性不够

对于复杂业务，实现个普通的代码生成器就好了。

标签页表单

## 架构设计

### 入料模块

入料能力，让组件在低代码平台使用更容易

### 编排模块

精心打造的编排模块，让拖拽、配置能力集成变得更简单

### 渲染模块

运行时渲染，快速提供协议的渲染能力

### 出码模块

出码能力，提升低代码的扩展性和性能

## 分析项目架构

```md
src:
    assets:静态资源
    blocks: 重要代码单独建立文件夹，物料组件、物料渲染器
    components: 组件
        AppEditorRender:layout布局的中间面板
        AppLeftPanel:layout布局的左边面板
        AppPreviewer: layout布局中间面板，手机和桌面预览器
        AppRightPanel: layout布局右边面板：图表配制/引用配制+导出JSON
        AppRunnerRenderer:
        ChartRenderer:图表渲染器，动态组件（canvas图表，ercharts图表，svg图表）
        FlowEditor: 动作页面的内容
        NotesEditor: 富文本编辑器
        Smooth-dnd:支持vue3拖拽
        AppNavigator:navigation导航栏
        DataSourceLeftPanel:DataSource数据源左侧面板
    constants: 物料基础配制
    hooks: 
    mocks: 模拟数据，Layout布局中间面板的初始数据
    router: 页面路由
    stores: 共享状态
    types: 定义数据类型，物料数据协议类型
    ui:
    utils:公共方法
    views:页面
        DataSourceContent:
        ActionsView:动作页面
        AppView:主页
        DataSourceView:数据源页面
        PageLayoutView:布局页面
        RunnerView:
    App.vue: 单页面组件
    main.ts: 样式定制，物料插件
    setup.ts:注入全局物料，物料插件化
```

```md
setup.ts
上面的declare module ‘@vue/runtime-core’ 是对ComponentCustomProperties 的一个补充说明，
ts的精髓在于它的类型约束，这样可以在其它组建中使用自定义属性时可以获得类型提示和类型的约束。
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Access to the application's blocksMap
     */
    $blocksMap: string
  }
}
```

## 最佳实践

### 构建工具vite

webpack, vite, 直接排除 esbuild, roolup, parcel, swc

* Vite 内置了对 Sass 的支持，不需要像 webpack 使用sass-loader

### UI框架ElementPlus

ElementPlus（生态、更稳定）、Naive UI、Ant Design（结合React更佳）

### lint校验

* list-stage + prettier 阻止我的代码提交

### 能力

* [vue-i18n](https://vue-i18n.intlify.dev/)
* vue-use
* @element-plus/icons-vue图标
* vite-plugin-inspect: Vite调式插件
<!-- Vite 调试插件，主要用于 可视化检查 Vite 构建和转换过程，帮助开发者分析模块的编译结果、插件中间状态、依赖关系等。 -->

其他库：

* viewer: 图片查看器
* qiqiu：七牛云
* clipboard：剪切板

#### 编排引擎

* vue-draggable-next（不好用，文档不咋滴，一个文件中有选项式API风格、组合式API风格）
* VueDraggablePlus: 有优秀的文档，支持组件、函数、指令三种编码风格。
* Vue-grid-layout: 可适应大屏

## 难点

### 编排引擎

```md
sortable.js -> VueDraggableNext、VueDraggablePlus

选择 ref (逐层Proxy) 还是 reactive(最外层不能被赋值)
图标i => 
物料 => 合适物料 + 亮点物料
.ghost , .handle, cursor: move;
多层v-model =>  跨组件通信(pinia)
新增的物料字段名变化下，不能看不清


复制的时候：cursor:move;


```

