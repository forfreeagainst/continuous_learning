# Vue生态

## Vue-Router

路由其实就是条件渲染，匹配到哪个路由，就渲染哪个路由对应的视图

### 源码实现

### 常见API

* go
* push
* replace

### 用法

路由组件传参

```js
const routes = [
  { path: '/users/:id', component: User },
]
```

### 导航守卫

#### 全局前置守卫

#### 全局解析守卫

#### 全局后置钩子

#### 路由独享的守卫

#### 组件内的守卫

### 实践

#### 重定向接受参数

```js
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```
