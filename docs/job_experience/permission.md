# 权限管理

* 根据用户所具备的权限，动态添加路由规则，实现动态渲染菜单。同时通过路由守卫，禁止用户访问非权限内的页面。
* 通过Axios的请求拦截器和响应拦截器，实现接口权限的控制。
* 通过自定义全局指令实现细颗粒度权限控制

扩展就能问到：vue.directive, vue-router, aixos，

token 结合jwt 

RBAC 基于角色的权限控制, usePermission

## 为什么要权限控制？

* 后端权限：控制数据和用户是否能够操作
* 前端权限：视图权限。
* 有时你通过F12，改了一些东西，就能进行非法操作，后端也是有判断的。（自助结汇、自助购汇等）（经办、复核、）

前端权限控制的好处：
1. 减少没必要的操作或请求
2. 提高用户体验，避免在页面给用户产生困扰。同时减少页面内容的渲染，提高性能。
3. 降低非法操作的可能性
4. （测试案例）

## 前端权限控制的思路

* 菜单的控制（菜单权限）：用户登录后，后端返回该用户的权限数据。前端根据权限数据，展示有权限的菜单。
* 界面的控制（路由权限）：用户没有登录，输入非登录的url, 则需要跳转到登录页面；用户已经登录，输入没有非权限内的url,跳转到404
* 按钮的控制（按钮权限）：在某个菜单的页面中，展示可进行操作的按钮，比如删除，修改，增加
* 请求和响应的控制（接口权限）：用户通过非常规操作，通过F12调试工具，把禁用的按钮变成启用，进行发送请求，应被前端所拦截

菜单的控制 使用Vuex+sessionStorage 
通过vue-router的路由规则后端返回的权限数据， 进行嵌套路由，渲染菜单列表。

界面的控制： 使用token和全局导航守卫, 动态路由规则
登录的时候：根据用户所具备的权限，动态添加路由规则。防止用户输入没有非权限内的url,进行访问

### 按钮的控制

通过自定义指令和路由规则的元数据 / 从状态管理获取的用户权限信息，对dom进行样式禁用或移除

```js
// v-permission = "{action: 'add'}"
import Vue from 'vue';
import router from '@/router.js';
Vue.direactive('permission', {
  inserted: function(el, binding) {
    const action = binding.value.action;
    const currentRight = router.currentRoute.meta;
    if (currentRight) {
      if (currentRight.indexOf(action) === -1) {
        // 不具备权限，是要警用，还是直接移除元素
        const type = binding.value.effect;
        if (type === 'disabled') {
          el.disabled = true;
          el.classList.add('is-disabled');
        } else {
          el.parentNode.removeChild(el);
        }
      }
    }
  }
})
```

请求和响应的控制： 通过axios的请求拦截器实现

请求控制：1.除了登录请求都带上token,这样服务器才能鉴别你的身份。2.如果发出非权限内的请求，
可以在axios的请求拦截器进行阻止（判断路由规则的meta元信息的权限信息）

响应控制

```js
axios.interceptors.reponse.use(function(res) {
  if (res.data.meta.status === 401) {
    router.push('/login');
    sessionStorage.clear();
    window.location.reload();
  }
  return res;
})
```

权限控制：

* 权限控制流程
* 动态渲染菜单
* 细颗粒度权限控制，自定义全局指令的方式（组件级 细颗粒度，一个页面的元素有哪些，eg:删除按钮）
* 路由守卫的方式实现


1. 后台管理系统使用 RBAC
用户 角色 权限
首先给用户给用户选择一个或多个已存在的角色，每个角色可以控制自己拥有哪些任务的权限。
角色：管理员，经办人员，中心端人员   给角色配置相应的权限

方案一（项目方案）：

获取用户的permissionId列表和显示的菜单列表，同时在路由的配置，给每个菜单配置相应的permissionId,
在显示的菜单列表，通过路由守卫的方式，如果发现，该用户无对应的菜单权限，则提示用户需要获取权限。
meta: permissionId, hidden

缺点：

* 全局路由守卫，每次路由跳转，都要进行权限判断。
* 菜单信息写死在前端，要改显示文字或权限信息，需要重新编译。


接口权限：token ，用户权限列表与 当前页面权限 , 二次封装axios, 在请求和响应拦截器 ，
路由权限呢：
菜单权限呢：

登录后，获取菜单列表，存在vuex + sessionStorage, 渲染菜单列表。
导航守卫，防止用户跳过登录页面。没token 前往需要token的页面，返回登录页面
用户不具备权限的路由，是否要添加到路由映射表/路由规则呢 ？动态路由
根据用户所具备的权限，动态添加路由规则。（根据二级权限，对路由规则进行动态的添加）
initDynamicRoutes()动态路由添加的两个时机？登陆后，App的created钩子 （防止刷新，丢失Router数据）

请求控制：通过axios的请求/响应拦截器
请求控制
1.除了登录请求都要携带token数据，这样服务器才能鉴别你的身份。
2.如果发出了非权限内的请求，应该直接在前端访问内进行阻止，虽然这个请求发送到服务器也会被拒绝。（按钮
的禁用，通过f12进行非法操作）（判断非权限范围内的请求）
响应控制