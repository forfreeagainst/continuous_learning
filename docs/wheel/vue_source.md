# Vue源码

## Vue3源码

### Set、Map、WeakSet、WeakMap区别？

####  Set（集合）

* 存储结构：[值, 值]，存储唯一的值（不允许重复）。
* 键类型：任意类型的值（包括对象、原始值）。
* 可遍历：是（支持 forEach、keys()、values()、entries() 等方法）。
* 引用类型：强引用（即使对象不再使用，也不会被垃圾回收）。

常用方法：

* add(value)：添加值。
* delete(value)：删除值。
* has(value)：检查是否存在某值。
* clear()：清空集合。

使用场景：数组去重、集合运算（并集、交集等）。

#### WeakSet（弱集合）

* 存储结构：[值, 值]，但仅能存储对象（不能是原始值）。
* 键类型：仅对象（如 {}、new Object()）。
* 可遍历：否（没有 size 属性，也不能用 forEach 或迭代方法）。
* 引用类型：弱引用（如果对象在其他地方没有被引用，会被垃圾回收自动清除）。

常用方法：

* add(obj)：添加对象。
* delete(obj)：删除对象。
* has(obj)：检查是否存在某对象。

使用场景：临时存储对象（如 DOM 节点是否已被处理）。

#### Map（字典）

* 存储结构：[键, 值]，键值对集合。
* 键类型：任意类型（对象、原始值均可）。
* 可遍历：是（支持 forEach、keys()、values()、entries() 等方法）。
* 引用类型：强引用（键和值都不会被垃圾回收）。

常用方法：

* set(key, value)：设置键值对。
* get(key)：获取值。
* delete(key)：删除键值对。
* has(key)：检查是否存在某键。
* clear()：清空字典。

使用场景：需要复杂键（如对象）的映射、缓存、数据关联。

#### WeakMap（弱字典）

* 存储结构：[键, 值]，但键必须是对象（值可以是任意类型）。
* 键类型：仅对象（不能是原始值）。
* 可遍历：否（没有 size 属性，也不能用 forEach 或迭代方法）。
* 引用类型：弱引用（仅对键弱引用，如果键对象在其他地方没有被引用，会被垃圾回收，对应的值也会被释放）。

常用方法：

* set(key, value)：设置键值对（key 必须是对象）。
* get(key)：获取值。
* delete(key)：删除键值对。
* has(key)：检查是否存在某键。

使用场景：存储对象的私有数据或元数据（避免内存泄漏）。

帮助内存管理的数据结构：WeakMap,WeakSet。尽管JavaScript没有直接暴露垃圾回收器API。但语言
提供几个间接观察垃圾回收的数据结构，能用于内存管理。

| 特性 | Set| WeakSet| Map | WeakMap |
| --- | --- | --- | --- | --- |
| 存储结构 | [值，值] | [对象，对象] | [键，值] | [对象键，值] |
| 键类型 | 任意值 | 仅对象 | 任意值 | 仅对象 |
| 可遍历性 | 可 | 不可 | 可 | 不可 |
| 引用类型 | 强引用 | 弱引用 | 强引用 | 弱引用（仅键） |
| 垃圾回收影响 | 不回收 | 自动回收 | 不回收 | 自动回收 |
| 典型用途 | 去重、集合运算 | 临时对象管理 | 复杂键映射 | 对象私有数据 |

#### 关键性总结

* Set vs WeakSet

Set 可以存储任意值，WeakSet 只能存储对象。

Set 可遍历，WeakSet 不可遍历。

WeakSet 对对象是弱引用，适合临时存储（如 DOM 节点管理）。

* Map vs WeakMap

Map 的键可以是任意类型，WeakMap 的键必须是对象。

Map 可遍历，WeakMap 不可遍历。

WeakMap 对键是弱引用，适合存储对象的私有数据（避免内存泄漏）。

* 强引用 vs 弱引用

Set 和 Map 会阻止垃圾回收，可能导致内存泄漏。

WeakSet 和 WeakMap 不会阻止垃圾回收，适合临时存储。

## Vue讲述

### 响应式模块

```md
effect是个副作用，数据发生改变，立即执行effect。我们通过数据代理，在get和set方法进行切面编程，
get里面进行依赖收集，把effect中 使用到的变量 和 effect 进行关联，形成一个映射表。
get里面进行触发更新，数据发生改变，调用映射表的effect方法，进行页面数据的渲染(innerHTML)。

effect: 数据发生改变立即执行effect
watch, computed 都是基于 effect ，
effect(() => {
    document.innerHTML = `hello${name}`;
}, {}); // 执行函数，选项
写在effect里面的变量，才具有响应式。
父子组件，就是嵌套的effect;

设计响应式的effect
effect访问 对象的属性进行 依赖收集， 书写innerHTML = 啥 进行触发更新。
trackEffect, triggerEffect
1. 在proxy 的get 进行 依赖收集，

收集这个对象上的这个属性和 effect关联在一起。
收集依赖的数据格式 
 Map:  obj:  {属性 ： Map:  effect, effect, effect   }
嵌套Map ,
第一层： 对象，  Map
第二层： 属性， Map 


// 将当前的effect放入到dep （映射表）中，后续可以根据值得变化触发此dep中存放的 effect 。

2. 触发更新


3. 解决effect 的遗留问题
effect 有条件（前后的依赖不一样的各种情况） state.flag ? state.name : state.age;
（effect在进行第二次依赖收集，有个简单的diff算法））
effect 有重复的，映射表要去重  state.name + state.name

4. effect调度实现 （effect第二个参数scheduler, 数据更新了，不重新渲染，走自己的逻辑。
还可以赋值给变量即函数名，然后在scheduler中调用）。

5. 解决 innerHTML = state.name; state.name = 22; 陷入死循环
  当取的值也是对象的时候，我需要对这个对象 再进行代理，递归代理


reactive只能针对对象， proxy就是针对对象呀

ref 实现原理， 可以是基础类型，可以是对象
包了一层，成为对象。拥有三个属性：_v,  get方法 ，set方法
contructor：判断是不是对象 ,是的话，包一层reactive

其他API: toRef, toRefs, proxyRef, proxyRefs

书写computed, 也是ref (ref特征 _v, get value方法， set value方法)

思路：

```

缩略版 computed

```ts
 // 在effect 里用到 fullname.value才行
// const fullname = computed(() => state.firstname + state.name);
// effect(() => {
//   console.log(fullname.value);
// })


export class ComputedRefImpl<T> {
  private _value!: T

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
  ) {
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(this, DirtyLevels.ComputedValueMaybeDirty),
    )
  }

  get value() {
    trackRefValue(self)

    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }

  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty
  }

  set _dirty(v) {
    this.effect.dirty = v
  }
  // #endregion
}
```

reactiveEffect: 接收参数: getter函数，调度器
收集依赖， 

```ts
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []

  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean

  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void

  /**
   * @internal
   */
  _dirtyLevel = DirtyLevels.Dirty
  /**
   * @internal
   */
  _trackId = 0
  /**
   * @internal
   */
  _runnings = 0
  /**
   * @internal
   */
  _queryings = 0
  /**
   * @internal
   */
  _depsLength = 0

  constructor(
    public fn: () => T,
    public trigger: () => void,
    public scheduler?: EffectScheduler,
    scope?: EffectScope,
  ) {
    recordEffectScope(this, scope)
  }

  public get dirty() {
    if (this._dirtyLevel === DirtyLevels.ComputedValueMaybeDirty) {
      this._dirtyLevel = DirtyLevels.NotDirty
      this._queryings++
      pauseTracking()
      for (const dep of this.deps) {
        if (dep.computed) {
          triggerComputed(dep.computed)
          if (this._dirtyLevel >= DirtyLevels.ComputedValueDirty) {
            break
          }
        }
      }
      resetTracking()
      this._queryings--
    }
    return this._dirtyLevel >= DirtyLevels.ComputedValueDirty
  }

  public set dirty(v) {
    this._dirtyLevel = v ? DirtyLevels.Dirty : DirtyLevels.NotDirty
  }

  run() {
    this._dirtyLevel = DirtyLevels.NotDirty
    if (!this.active) {
      return this.fn()
    }
    let lastShouldTrack = shouldTrack
    let lastEffect = activeEffect
    try {
      shouldTrack = true
      activeEffect = this
      this._runnings++
      preCleanupEffect(this)
      return this.fn()
    } finally {
      postCleanupEffect(this)
      this._runnings--
      activeEffect = lastEffect
      shouldTrack = lastShouldTrack
    }
  }

  stop() {
    if (this.active) {
      preCleanupEffect(this)
      postCleanupEffect(this)
      this.onStop?.()
      this.active = false
    }
  }
}
```

effect: 

```ts
export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions,
): ReactiveEffectRunner {
  if ((fn as ReactiveEffectRunner).effect instanceof ReactiveEffect) {
    fn = (fn as ReactiveEffectRunner).effect.fn
  }

  const _effect = new ReactiveEffect(fn, NOOP, () => {
    if (_effect.dirty) {
      _effect.run()
    }
  })
  if (options) {
    extend(_effect, options)
    if (options.scope) recordEffectScope(_effect, options.scope)
  }
  if (!options || !options.lazy) {
    _effect.run()
  }
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect
  return runner
}
```


特性	ReactiveEffect 类	effect 函数
层级	底层实现类	高级 API（基于 ReactiveEffect）
使用方式	需实例化并手动调用 run()	直接传入函数，自动执行和追踪
调度控制	支持自定义调度器（scheduler）	通过 effect 的选项间接支持
停止监听	调用 stop() 方法	返回 stop 函数
典型用途	Vue 内部实现（如渲染、computed、watch）	开发者显式管理副作用

### runtime-dom

提供 DOM API (提供一系列dom操作的api方法) ，针对浏览器的

1. createRenderer(RuntimeCore的方法) 我们可以自己创建渲染器 （自定义渲染器），接收rendererOptions
2. render(RuntimeCore的方法) 用内置的渲染器来进行渲染 （渲染dom元素）(把虚拟节点变成真实节点)
3. h方法可以创建一个虚拟dom (接收参数：type, propsOrChildren, children)


type 标签：div , propsOrChildren 属性 {}

nodeOps 节点渲染
patchProp 属性渲染： attrs,class,events,props,style
events: 希望是一个() => 函数名， 这样可以移除事件和监听事件。

引用关系：runtime-core -> runtime-core -> reactivity

### runtime-core

#### 重点看createRenderer (渲染器)

createRenderer 返回一个对象，有render方法，render方法中 会调用核心函数patch, patch会根据初次渲染和
更新渲染，把虚拟节点，转化为真实节点。

createRenderer： 可以不针对浏览器的自定义渲染器，实现跨平台。
createRenderer：接收rendererOptions渲染器选项，自己有个render方法，

render: 接收参数： vnode/虚拟dom, Element/dom节点 

Vue 3 的 Diff 比 Vue 2 更高效，主要依赖以下优化：

优化策略	作用
静态提升（Hoist Static）	将静态节点（无动态绑定）提取到渲染函数外，复用旧 VNode，避免重复对比。
Patch Flags	在 VNode 上标记动态属性（如 class、style），仅对比变化的属性。
Block Tree	将模板划分为动态区块（Block），仅对比区块内的动态节点，跳过静态内容。
靶向更新	直接定位到动态节点，减少递归遍历。
1 << 2 , 二进制数，左移两位。 1  2  4  8 16 
组合起来，1111111， 一下子就看出来，它拥有全部的组合。10001，头和尾的组合。
| 或运算 1 | 8 得到9， & 与运算


Vue 3 的 Diff 比 Vue 2 更高效，主要依赖以下优化：

优化策略	作用
静态提升（Hoist Static）	将静态节点（无动态绑定）提取到渲染函数外，复用旧 VNode，避免重复对比。
Patch Flags	在 VNode 上标记动态属性（如 class、style），仅对比变化的属性。
Block Tree	将模板划分为动态区块（Block），仅对比区块内的动态节点，跳过静态内容。
靶向更新	直接定位到动态节点，减少递归遍历。



特性	render 函数	h 函数
角色	组件的视图生成器（返回整个 VNode 树）	单个 VNode 的工厂函数
调用者	Vue 内部调用（或开发者手动定义）	在 render 函数内部调用
输入	组件实例的 this（访问状态）	标签名/组件、props、children
输出	完整的 VNode 树	单个 VNode
是否必需	必须有（直接或间接）	可选（可用 JSX 替代）

#### 组件

template 会变成 render函数

```js
const VueComponent = {
  data() {
    return { name: 'durant', age: 35}
  },
  render() {
    return h(Fragment, [
      h(Text, "my name is" + this.name),
      h('a', this.age)
    ])
  }
}

// h 接收参数（type, propsOrChildren, children）
// type： 是 文本，注释，Fragment, 元素（组件，div...）
render(h(VueComponent, {}), app)
```


组件渲染整理流程

创建组件实例
给实例的属性赋值
创建一个effect

### 模板变成js语法

diff算法优化：

如果在编写vue3的时候，你直接采用jsx 或者 h 的写法，得不到优化

template 编译成 js 语法时，会有 PatchFlags，标记是文本、class, style等，没有
使用h, 使用了_createElementVNode。
反正用h是见得比较多，回头有用到_openBlock,_createElementBlock和_createElementVNode，再看一下吧。

* PatchFlags 优化：只考虑属性和内容发生变化
* BlockTree: 处理 虚拟DOM 树的层级，v-if,v-else, v-for不确定有多少个


我觉得直接 编写 h 代码 ，实现 一些插件（eg: vue-draggable-plus等）功能很难的。
1.它可以通过书写template, 然后通过某些插件进行转换为 h语法。
2.或者通过vue转换语法的网站，实现代码编写。


template 转换成 js 语法
1.“语法” 转化成一个对象 ast语法树
2.对树进行优化 （打标记 patchFlag）
3.根据转换后的代码生成 一个字符串。

compile(模板) 得到 {
  ast: {},
  code: render函数的字符串
}

编译主要分为三步
1. 将模板转换成 ast语法树
2. 转换生成 codegennode
3. 转换成 render函数


状态机：循环每个字符，判断它是什么类型，然后分别进行处理


## 面试题

### 请说以下 Vue2 响应式数据的理解

源码层面: 内部对所有属性进行了重写，性能问题，如果对象是多层级的，就会递归对象中的属性，增加
getter和 setter

我们在使用Vue的时候，如果层级过深（考虑优化），如果数据不是响应式的，就不要放在data中了。
我们属性取值的时候尽量避免多次取值。如果有些对象放在 data中，但不是响应式的，可以考虑采用
Object.freeze() 来冻结对象。

多次取值（多次访问get方法）

```js
for(let i =0; i< 100; i++) {
  this.sum ++; // 多次访问get方法
}

let sum = 0;
for(let i =0; i< 100; i++) {
  sum ++;
}
this.sum = sum;
```

### Vue2中如何监测数组的变化？

vue2 中监测数组的变化 没有采用defineProperty, 因为修改索引的情况不多，如果直接使用defineProperty 会浪费大量性能。
采用重写数组的变异方法来实现函数劫持。

initData -> observe -> 对我们传入的数组进行原型链修改，后续调用的方法都是 重写后的方法。->
对数组中每个对象 也再次进行代理

修改数组索引，修改长度是无法进行监控的。arr[1] = 100; arr.length = 300;

### Vue中如何进行依赖收集？

所谓的依赖收集（观察者模式），被观察者指代的是数据(dep), 观察者（watcher）
一个watcher中 可能对应着 多个数据，watcher 中还需要 保存dep, (重新渲染的时候可以让属性重新记录watcher)

多对多的关系 一个dep 对应多个watcher, 一个watcher 有多个dep。默认渲染的时候会进行依赖收集（会触发get方法），
数据更新了就找到属性对应的watcher去触发更新。

### 如何理解Vue中模板编译原理？

我们用户传递的是template 属性，我们需要将这个template 编译成 render函数

template ——> ast语法树
对语法树进行标记 （标记的是静态节点）
将ast 语法树生成 render函数

最终每次渲染可以调用render函数返回对应的虚拟节点（递归是先子后父）

### Vue生命周期钩子是如何实现的

内部利用了一个发布订阅模式，将用户写的钩子维护成了一个数组，后续一次调用callback.

## Vue2源码

`自己理解，并不一定对`

new Vue() 做了啥？
1.调用_init方法
2. 合并选项

Observer类，Dep类，
渲染完真实DOM,
再开启监听者模式，Object.defineProperty.
get: dep.depend(); set: dep.notify();

### API的实现

#### ref的实现

包了一层对象，{_v, get, set} 里面的_v如果是 引用类型，也是个proxy
