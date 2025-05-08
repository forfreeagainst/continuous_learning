# 前端埋点

提效，提高性能，格式化结果

## :star: 数据收集

### 异常收集

#### 资源异常

* 浏览器：window.error、tag.onerror
* 小程序：tag.binderror

#### 代码异常

* 浏览器：JS、Promise、Vue、React
* 小程序：JS、Vue(uni-app)

#### 请求异常

* 浏览器：XMLHttpRequest、Fetch、Axios(响应拦截器)
* 小程序：wx.request

### 行为收集

#### 页面事件

* 浏览器 ：document.click
* 小程序：onLoad、onShow 等Page方法

#### 路由切换

* 浏览器：window.popstate、history
* 小程序：wx.switchTab、wx.reLauch等路由方法

### 性能指标收集

LCP、FID、CLS、FP、FCP

## :star: 数据上报

* 浏览器：xhr/fetch、img、sendBeacon
* 小程序：wx.request

## :star: 数据存储

* 数据处理：sourcemap
* 存储系统：Redis、MongoDB

## :star: 数据展示

* 

## Vue项目的最佳实践

app.config.errorHandler

