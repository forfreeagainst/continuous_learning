# Vue源码

## Vue3源码

### Vue3新特性

Vue3更注重模块上的拆分。Vue2无法单独使用部分模块，需要引入完整的Vue.js。
Vue3中的模块之间耦合度低，模块可以独立使用。

Vue2中很多方法挂载到了实例上，即便没有使用也会被打包。
Vue3通过构建工具Tree-shaking机制实现按需加载，减少用户打包后体积。

Vue3允许自定义渲染器，扩展能力强。

依然保留Vue2的特色如下

* 声明式框架
* 虚拟Dom
传统更新页面，拼接一个完整的字符串innerHTML全部重新渲染。

编译时，把template变成虚拟节点，运行时，把虚拟dom变成真实Dom.

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

其他API:

```