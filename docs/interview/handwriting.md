# 手写题

## 最长递增子序列

### 个人思路

贪心算法 + 二分查找 ，为啥，就能得到最长递增子序列的个数

首先最长递增子序列的个数是对的，但顺序不对，不是子序列。通过索引的方式

1. 默认追加 （找到比它大的，就添加）
2. 替换 （当前比它小，就往前二分查找，找到比它小的，然后替换掉。）
3. 记录每个人的前驱节点
4. 通过最后一项进行回溯

### 官方源码

```js
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1; // 除2，然后取整的效果
        // 类似: (u + v) | 0 或者 ~((u+v) /2) ？？
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
```

## 手写call

定义：使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数

```js
// context是基本类型，不能用呀，必须是对象呀，跟真实的call不一样呀
Function.prototype.call2 = function(context, ...args) {
  // 判断是否是undefined和null
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  let fnSymbol = Symbol()
  console.log(this, 'this');
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol] 
  return fn;//调用这个call2方法的函数的返回值
}

//测试
function greet() {
  console.log(this.animal, "的睡眠时间一般在", this.sleepDuration, "之间");
}
const obj = {
  animal: "猫",
  sleepDuration: "12 到 16 小时",
};
greet.call2(obj); // 猫 的睡眠时间一般在 12 到 16 小时 之间

function testPrimary() {
  console.log(this)
}
testPrimary.call(16);
```

## 手写apply

定义：使用一个指定的 this 值和单个数组的前提下调用某个函数

```js
Function.prototype.apply2 = function(context, args) {
  // 判断是否是undefined和null
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  let fnSymbol = Symbol()
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol] 
  return fn
}
```

## 手写bind

一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

```js
Function.prototype.finalBind = function (context, ...args) {
  var fn = this;
  return function construtor(...returnArgs) {
    if (Object.getPrototypeOf(this) === construtor.prototype) {
      return new fn(...args,...returnArgs);
    } else {
      return fn.apply(context, [...args, ...returnArgs]);
    }
  }
}
```

总结：

| | 改变this指向| 参数| 立即调用 |
| --- | --- | --- | --- |
| call | 改变 | 多个参数，一次传递 | 立即调用 |
| apply | 改变 | 一个数组，一次传递 | 立即调用 |
| bind | 改变 | 多个参数，多次传递 | 不立即调用，返回绑定this之后的函数 |

## 手写new

* 创建一个对象
* 实例化对象的__proto__指向构造函数的属性prototype
* 将构造函数中的this绑定到创建的对象，并调用该构造函数
* 返回：如果返回的值是引用类型，就取该返回值，否则就返回该实例化对象。

```js
//new是关键字，我们用函数
function myNew(contructor, ...args) {
  var obj = new Object();
  obj.__proto__ = contructor.prototype;
  let res = contructor.apply(obj,args);
  //返回结果是对象，那就返回对象，否则就返回实例
  return res instanceof Object ? res: obj;//判断引用类型，不要使用typeof，eg: null;
  //typeof null为Object,这是js本身的bug。
  // null instanceof Object为false;null不是Object的实例
}

//测试代码
function fn(name,age) {
  this.name = name;
  this.age = age;
  return null;
}
const p2 = new fn('durant', 25);
console.log(p2)
const p = myNew(fn, 'druant',35);
console.log(p);
```

```js
function myNew() {
    var obj = new Object(),
    //不懂[].shift.call(arguments)怎么理解
    // 补充：Array.prototype.slice.call(arguments, 1);
    Constructor = [].shift.call(arguments);//第一个参数
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);//除去第一个参数，剩余的参数
    return typeof ret === 'object' ? ret : obj;
};
```

## 手写Promise

* promise有三个状态，分别为pending,fulfilled,rejected。
* 初始状态为pending,一旦变为fulfilled或rejected，就不会再发生变化了。（状态不可逆）
* throw也是触发reject方法

* then方法接受的参数：1.不是函数 2.是函数 3.返回结果是promise
* .then方法接受两个参数，结果要返回promise,后面才能继续.then，进行链式操作
* Promise有个A+规范，函数或对象中有属性then，并且then是个函数，就能成为Promise

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = "rejected";
class MyPromise {
  constructor(executor) {
    this.promiseState = PENDING;
    this.promiseResult = null;
    this.handlerList = [];

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    try {
      executor(this.resolve, this.reject)
    } catch(e) {
      this.reject(e);
    }
  }
  changeState(state, result) {
    if (this.promiseState !== PENDING) return;//状态不可逆
    this.promiseResult = result;
    this.promiseState = state;
    this.runTask();
  }
  resolve(success) {
    this.changeState(FULFILLED, success);
  }
  reject(fail) {
    this.changeState(REJECTED, fail);
  }
  //* Promise有个A+规范，函数或对象中有属性then，并且then是个函数，就能成为Promise
  isPromise(obj) {
    if(obj !== null && (typeof obj === 'object' || typeof obj === 'function')) {
      return typeof obj.then === 'function';
    }
    return false;
  }
  runMicroTask(func) {
    //Node环境
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func)
      //浏览器环境
    } else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode('1');
      ob.observe(textNode, {
        characterData: true
      })
      textNode.data = '2';
    } else {
      setTimeout(func, 0);
    }
  }
  runOne(callback, resolve, reject) {
    this.runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.promiseState === FULFILLED ? resolve : reject;
        settled(this.promiseResult);
        return;
      }
      try {
        const data = callback(this.promiseResult);
        if (this.isPromise(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    })
  }
  runTask() {
    if (this.promiseState === PENDING) return;
    while(this.handlerList.length) {
      const {onFulfilled, onRejected, resolve, reject} = this.handlerList.shift();
      if (this.promiseState === FULFILLED) {
        this.runOne(onFulfilled, resolve, reject);
      } else {
        this.runOne(onRejected, resolve, reject);
      }
    }
  }
    
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.handlerList.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      });
      this.runTask();
    })
  }
}
```

```js
class MyPromise {
    // 构造方法
    constructor(executor) {

        // 初始化值
        this.initValue()
        // 初始化this指向
        this.initBind()
              try {
            // 执行传进来的函数
            executor(this.resolve, this.reject)
        } catch (e) {
            // 捕捉到错误直接执行reject
            this.reject(e)
        }
    }

    initBind() {
        // 初始化this
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }

    initValue() {
        // 初始化值
        this.PromiseResult = null // 终值
        this.PromiseState = 'pending' // 状态
              this.onFulfilledCallbacks = [] // 保存成功回调
        this.onRejectedCallbacks = [] // 保存失败回调
    }

    resolve(value) {
        // state是不可变的
              if (this.PromiseState !== 'pending') return
        // 如果执行resolve，状态变为fulfilled
        this.PromiseState = 'fulfilled'
        // 终值为传进来的值
        this.PromiseResult = value
              // 执行保存的成功回调
              while (this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(this.PromiseResult)
        }
    }

    reject(reason) {
        // state是不可变的
        if (this.PromiseState !== 'pending') return
        // 如果执行reject，状态变为rejected
        this.PromiseState = 'rejected'
        // 终值为传进来的reason
        this.PromiseResult = reason
        // 执行保存的失败回调
              while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.PromiseResult)
        }
    }

    then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }


        var thenPromise = new MyPromise((resolve, reject) => {

            const resolvePromise = cb => {
              setTimeout(() => {
                try {
                  const x = cb(this.PromiseResult)
                  if (x === thenPromise) {
                    // 不能返回自身哦
                    throw new Error('不能返回自身。。。')
                  }
                  if (x instanceof MyPromise) {
                    // 如果返回值是Promise
                    // 如果返回值是promise对象，返回值为成功，新promise就是成功
                    // 如果返回值是promise对象，返回值为失败，新promise就是失败
                    // 谁知道返回的promise是失败成功？只有then知道
                    x.then(resolve, reject)
                  } else {
                    // 非Promise就直接成功
                    resolve(x)
                  }
                } catch (err) {
                  // 处理报错
                  reject(err)
                  throw new Error(err)
                }
              })
            }

            if (this.PromiseState === 'fulfilled') {
                // 如果当前为成功状态，执行第一个回调
                resolvePromise(onFulfilled)
            } else if (this.PromiseState === 'rejected') {
                // 如果当前为失败状态，执行第二个回调
                resolvePromise(onRejected)
            } else if (this.PromiseState === 'pending') {
                // 如果状态为待定状态，暂时保存两个回调
                // 如果状态为待定状态，暂时保存两个回调
                this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
            }
        })

        // 返回这个包装的Promise
        return thenPromise

    }
}
```

Promise.all

全部成功 -> 返回成功数组
如果有一个失败 -> 返回失败结果

```js
const all = (promiseList) => {
  const result = [];
  let count = 0;

  return new MyPromise((resolve,reject) => {
    const addData = (value, index) => {
      result[index] = value;
      count++;
      if (count === promiseList.length) {
        resolve(result);
      }
    }

    promiseList.forEach((promise,index) => {
      if (promise instanceof MyPromise) {
        promise.then(res => {
          addData(res, index);
        }, err=> {
          reject(err);
        })
      } else {
        addData(promise, index);
      }
    })
  })
}
```

Promise.race(竞赛)

先执行完，无论成功还是失败，就可以返回结果。

```js
const race = (promiseList) => {
  return new MyPromise((resolve,reject) => {
    promiseList.forEach(promise => {
      if (promise instanceof MyPromise) {
        promise.then(res => {
          reoslve(res);//其他.then不会紧跟其后吗
        }, err => {
          reject(err);
        })
      } else {
        resolve(promise);
      }
    })
  })
}
```

Promise.allSettled

等所有promise的状态都不再是pending，执行

```js
const allSettled = (promiseList) => {
  let resultList = [];
  let count = 0;

  const addData = (result, index, status) {
    resultList[index] = {
      status,
      result
    }
    count ++;
    if (count === promiseList.length) {
      resolve(resultList)
    }
  }

  return new MyPromise((resolve, reject) => {
    promiseList.forEach((promise,index) => {
      if (promise instanceof MyPromise) {
        promise.then(res= > {
          resolve(res, 'fullfilled');
        }, err => {
          reject(err, 'rejected');
        })
      } else {
        resolve(promise, 'fullfilled')
      }
    })
  })
}
```

Promise.any

等有一个成功或者全部失败，就结束

```js
const any = (promiseList) => {
  let errResultList = [];
  let count = 0;

  return new MyPromise((resolve,reject) => {
    promiseList.forEach((promise,index) => {
      if (promise instanceof MyPromise) {
        promise.then(res => {
          resolve(res);
        }, err=> {
          errResultList[index] = err;
          count ++;
          if (count === promiseList.length) {
            reject(errResultList);
          }
        })
      } else {
        resolve(promise);
      }
    })
  })
}
```

## 手写调度器

```js
class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0; // 用来记录当前正在执行的异步函数
    this.queue = new Array(); // 表示等待队列
  }
  async add(promiseCreator) {
    /*
        此时count已经满了，不能执行本次add需要阻塞在这里，将resolve放入队列中等待唤醒,
        等到count<max时，从队列中取出执行resolve,执行，await执行完毕，本次add继续
        */
    if (this.count >= this.max) {
      await new Promise((resolve, reject) => this.queue.push(resolve));
    }

    this.count++;
    let res = await promiseCreator();
    this.count--;
    if (this.queue.length) {
      // 依次唤醒add
      // 若队列中有值，将其resolve弹出，并执行
      // 以便阻塞的任务，可以正常执行
      this.queue.shift()();
    }
    return res;
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  //add返回一个promise，参数也是一个promise
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};
  
  addTask(1000, '1');
  addTask(500, '2');
  addTask(300, '3');
  addTask(400, '4');
  
// output: 2 3 1 4
```

## 手写防抖

防抖是回城，节流是技能CD。

```js
// 定义：一段时间不操作，才执行。每次操作，都清空定时器，再开启定时器
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    let args = arguments;
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}
```

## 手写节流

```js
// 定义：在一段时间内，只能执行一次
//防抖和节流都是返回一个函数，都和时间有关。
function throttle(fn, time) {
  let start = 0;
  return function () {
    const nowTime = new Date();
    if (nowTime - start > time) {
      fn.apply(this, arguments);
      start = nowTime;
    }
  }
}
```

## 手写深拷贝

```js
function deepClone(temp) {
  if (Array.isArray(temp)) {
    var arr = [];
    for (var i = 0; i < temp.length; i++) {
      arr[i] = deepClone(temp[i]);
    }
    return arr;
  }
  if (typeof temp === 'object' && temp !== null) {
    var obj = {};
    for (var key in temp) {
      obj[key] = deepClone(temp[key]);
    }
    return obj;
  }
  return temp;
}
// console.log(deepClone([{ a: 333, b: { d: 3 } }, { dd: [33] }]));
// console.log(deepClone(22));
// console.log(deepClone({ d: [3], b: 333 }));
```
