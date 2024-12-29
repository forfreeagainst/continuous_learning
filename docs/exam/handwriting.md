# 手写题

## 手写call

```js
Function.prototype.call2 = function(context, ...args) {
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

//测试
function greet() {
  console.log(this.animal, "的睡眠时间一般在", this.sleepDuration, "之间");
}
const obj = {
  animal: "猫",
  sleepDuration: "12 到 16 小时",
};
greet.call2(obj); // 猫 的睡眠时间一般在 12 到 16 小时 之间
```

## 手写apply

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
Function.prototype.myBind = function(context) {
// 判断是否是undefined 和 null
    if (typeof context === "undefined" || context === null) {
        context = window;
    }
    self = this;
    return function(...args) {
        return self.apply(context, args);
    }
}
```

总结： call,apply都是将this赋值给对象的某个属性，对象调用后，this就会指向对象。
bind可以被new, 是把this赋值给self函数本身。

## 手写new

```js
function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};
```

## 手写Promise

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
function cloneDeep(temp) {
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
