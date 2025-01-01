# JavaScript

## 原型与原型链

* 对象的原型__proto__会永远指向它的构造函数的属性prototype。
* 构造函数的属性prototype可以通过constructor指向构造函数本身。
* (Object.getPrototypeOf(实例化对象) === 实例化对象的__proto。)
* (构造函数的属性prototype也可称为构造函数实例化的对象的原型)
* (对象都有__proto__,函数都有属性prototype,构造函数的属性prototype也是对象)
* (keywords: 构造函数1个，实例化对象可多个)

```js
function Person() {};
const p1 = new Person();
console.log(p1.__proto__ === Person.prototype);//true
console.log(Person.prototype.constructor === Person);//true
console.log(Object.getPrototypeOf(p1) === p1.__proto__);//true
console.log(Object.prototype.__proto__ === null);//true
console.log(p1.constructor === Person);//true：p1没有constructor,从Person.prototype去找
```

```js
//Object.create()静态方法以一个现有对象作为原型，创建一个新对象。
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // Inherited properties can be overwritten

me.printIntroduction();
// Expected output: "My name is Matthew. Am I human? true"
delete me.isHuman;
console.log(me.isHuman);//false
```

```js
// instanceof
// 用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
const obj = {a:33};
object instanceof obj;
// Object.prototype.toString.call(***)
const isEmptyArr3 = (data) => {
  if (Object.prototype.toString.call(data) === "[object Array]" && !data.length) {
    return true;
  }
  return false;
}
```

```answer
(1)为什么要有原型？对象共享属性和方法
(2)函数就会自带一个prototype(func();)
对象拥有__proto__(const obj = new func();//实例对象)
对象和函数都拥有原型（对象__proto__,函数prototype）
(3)对象查找属性和方法的顺序：对象本身=》构造函数=》对象的原型(构造函数的原型)=》当前原型的原型
(4)原型链就是把原型串联起来，原型链的顶端是null
(5) prototype显式原型，_proto_隐式原型

注：对象的隐式原型（__proto__）永远指向构造函数的显示原型(prototype)。
```

## 静态作用域与动态作用域的定义

* 作用域：源代码定义变量的区域
* 分为静态作用域（词法作用域）和动态作用域
* `js是静态作用域`，bash是动态作用域
* 静态作用域：函数定义时决定的；动态作用域：函数调用时决定的。

## Js作用域

```md
作用域：变量和函数生效的区域
作用域有哪些？
全局作用域，函数作用域，块级作用域
模块作用域，脚本作用域，Closure作用域（闭包作用域）
Eval作用域，catch作用域，with作用域
```

## 执行上下文

* （可执行代码有哪些类型？就三种全局代码，函数代码，eval代码）
* （全局执行上下文：只有一个）
* （函数执行上下文：每次调用函数都会创建一个新的执行上下文）
* （Eval函数执行上下文：指的是运行在eval函数中的代码，很少用而且不建议使用。）
* 当JavaScript代码执行一段可执行代码（executable code）时，会创建对应的执行上下文（executation context）。对于每个上下文，都有三个重要属性。

`1. 变量对象（Variable Object，VO）（存储变量和函数的声明）
2. 作用域链（scope chain）
3. this
`

* JavaScript引擎创建了执行上下文栈（Excution context stack,ECS）来管理执行上下文

```md
1.全局对象（VO）：window
2.函数对象 (activation object，活动对象AO)

跟JS的执行机制有关，先执行所有AO,再执行VO

AO {
  1.函数本身的形参arguments
  2.函数本身的声明
  3.变量的声明
}

赋值是VO;var 变量是AO;
function 函数名() {};也是AO

read();//read
function read() {
  console.log('read');
}

console.log(write);//undefined
write();//write is not a function
var write = function () {//使用const则不会变量提升，为什么
  console.log('write')
}

function use() {
  //访问不存在的变量会报错，访问对象中不存在的属性是undefined;
  console.log(a);//全局变量没有a,会报错，不能看成window的属性a。
  a = 1;//等价于window.a = 1; 没有var,不是AO,是VO
}
use();

console.log(sss);
function a() {
  var sss = 1;
}
a();

function foo() {
  function fun() {};//reference to function fun(){}
  var play = function () {};//reference to FunctionExpression play
}
```

## 作用域链

作用域链是JavaScript中查找变量和函数的一种机制。作用域链是有当前执行环境（Execution Context）
中的变量对象（Variable Object）以及父级执行环境的变量对象组成的。当代码在一个执行环境中执行时，
如果访问一个变量或者函数，JavaScript引擎会首先在当前执行环境的变量对象中查找，如果找不到，它会
沿着作用域链向上一级的执行环境中查找，直到找到对应的变量或者函数，或者达到全局执行环境为止。
`作用域链的形成是函数定义时的位置来决定的。`作用域链决定了变量和函数的访问权限。一个变量或者函数
能否在当前执行环境中被访问到，取决于它是否在当前执行环境的作用域链上。

```js
function fun3() {
  console.log('func3');
}
function fun2() {
  fun3();
}
function fun1() {
  var abc = 333;
  fun2();
}
fun1();
```

## 闭包

* 定义：能够访问到自由变量的函数
* （自由变量：能够在函数中使用，但不是函数的参数，也不是内部的局部变量）
* （沿着作用域链，访问别人的变量对象）
* 执行上下文的两大概念： 作用域链和变量对象
* 优点：属性获取方式便捷
* 缺点：太便捷

```md
闭包是能够访问自由变量的函数
当我们访问到闭包的时候，其实会涉及到执行上下文的两大概念：作用域链和变量对象。
因为作用域链和变量对象的关系，我们能够在当前函数执行中，沿着作用域链访问到外部的变量对象。
因为能沿着作用域链访问外部的变量对象，让我们属性获取方式便捷。但由于获取方式便捷，js垃圾回收
不能将其回收。 
```

## this指向（重点中的重点）

```md
绑定规则：
(1). 默认绑定：严格模式下，this会绑定到undefined。非严格模式下，this会绑定到window。
(2). 隐式绑定：this永远指向最后调用它的对象
(3). 显示绑定：call,apply,bind
(4). new绑定
优先级：new绑定优先级>显示绑定优先级> 隐式绑定优先级>默认绑定优先级。
（箭头函数没有this,它是基于闭包，闭包基于词法作用域，而词法作用域是在编译时确定的）
```

## 按值传递

* （ES中说，所有的参数都是按值传递的。）
* 按值传递，按共享传递
* 基本类型：数据存储在栈中；引用类型：地址指针在栈中，真实数据在堆中。
* 当我们的函数，传递的是基本类型，会重新生成一个新的内存空间，拷贝新的值。传递的是引用类型，
如果也要把堆中的真实数据拷贝，很消耗内存空间，影响性能，所以这里拷贝的是指栈中指向真实数据
的地址指针。

```js
var obj = {
  name: 'durant'
};
function foo(o) {
  o.name = 'james';
  console.log(o.name);
}
console.log(obj.name);//durant
foo(obj);//james
console.log(obj.name);//james


function bb() {
  console.log(self === window)
}
bb();

```

## 垃圾回收机制

```md
什么是垃圾回收机制？
GC即Garbage Collection，程序工作过程中会产生很多垃圾，这些垃圾是程序不用的内存或者之前用过了，
以后不会再用的内存空间，而垃圾回收机制就是用来查找和删除那些不再被其他对象引用的对象的过程。


垃圾是怎样产生的？
举个例子，我们先声明了一个变量 test，它引用了对象 {name: 'isboyjc'}，接着我们把这个变量
重新赋值了一个数组对象，也就变成了该变量引用了一个数组，那么之前的对象引用关系就没有了，
这时我们所谓的垃圾就产生了。


为什么要进行垃圾回收？
因为操作系统提供的内存是有限的，程序的运行是需要内存的，随着我们的使用，所需的内存越来越多，
如果不释放不再使用的内存，内存占用就会越来越高，轻则影响系统性能，重则导致进程崩溃。


垃圾回收是怎么样进行的？
在 JavaScript 内存管理中有一个概念叫做 可达性，就是那些以某种方式可访问或者说可用的值，
它们被保证存储在内存中，反之不可访问则需回收。我们可以通过标记清除法，引用计数法等去发现
不可达的对象，然后定期进行清理。
1. 标记清除法 mark sweep
标记清除法的过程：垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中
所有对象都是垃圾，全标记为0
然后从各个根对象开始遍历，把不是垃圾的节点改成1
清理所有标记为0的垃圾，销毁并回收它们所占用的内存空间
最后，把所有内存中对象标记修改为0，等待下一轮垃圾回收
优点：使用一位二进制0或1就可以为其标记，实现比较简单。
产生问题：
清除之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了 内存碎片。
由于剩余空闲内存不是一整块，它是由不同大小内存组成的内存列表，这就牵扯出了内存分配的问题。
假设我们新建对象分配内存时需要大小为 size，由于空闲内存是间断的、不连续的，则需要对空闲内存
列表进行一次单向遍历找出大于等于 size 的块才能为其分配。为了找到合适的块，我们可以采取三种
分配策略。
First-fit，遍历整个空闲列表，找到大于等于 size 的块就立即返回
Best-fit，遍历整个空闲列表，找到最接近并且拥有足够 size 的分块
Worst-fit，遍历整个空闲列表，找到最大的分块，然后切成两部分，一部分 size 大小，并将该部分返回
这三种策略里面 Worst-fit 的空间利用率看起来是最合理，但实际上切分之后会造成更多的小块，
形成内存碎片，所以不推荐使用，对于 First-fit 和 Best-fit 来说，考虑到分配的速度和效率
，First-fit 是更为明智的选择
缺点：
内存碎片化，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时
找不到合适的块
分配速度慢，因为即便是使用 First-fit 策略，其操作仍是一个 O(n) 的操作，最坏情况是每次都要遍历
到最后，同时因为碎片化，大对象的分配效率会更慢
2.标记整理法mark compact（解决了标记清除法清除后，内存空间不连续的问题）
compact:把...紧压在一起或压实
它的标记过程和标记算法没有什么不同，只是在清理完所有标记为0的垃圾，会把不需要的清理的对象
（即活着的对象）向内存的一段移动，让已经使用的内存空间可以连续起来，未使用的内存空间
也可以连续起来。
3.引用计数法
自己语言（可能不准确）：通过跟踪，记录每个变量的被引用数。其他变量引用它了加1，
不再引用它了就减1。如果该变量引用数为0，就进行回收。
它的策略是跟踪记录每个变量值被使用的次数
（1）当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1
（2）如果同一个值又被赋给另一个变量，那么引用数加 1
（3）如果该变量的值被其他的值覆盖了，则引用次数减 1
（4）当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，回收空间，
  垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存
eg:
let a = new Object()  // 此对象的引用计数为 1（a引用）
let b = a   // 此对象的引用计数是 2（a,b引用）
a = null    // 此对象的引用计数为 1（b引用）
b = null    // 此对象的引用计数为 0（无引用）
...   // GC 回收此对象
但也存在严重问题-循环使用
eg:
function test(){
  let A = new Object()
  let B = new Object()
  
  A.b = B
  B.a = A
}
如上所示，对象 A 和 B 通过各自的属性相互引用着，按照上文的引用计数策略，它们的引用数量
都是 2，但是，在函数 test 执行完成之后，对象 A 和 B 是要被清理的，但使用引用计数则
不会被清理，因为它们的引用数量不会变成 0，假如此函数在程序中被多次调用，那么就会造成
大量的内存不会被释放
我们再用标记清除的角度看一下，当函数结束后，两个对象都不在作用域中，A 和 B 都会被当作
非活动对象来清除掉，相比之下，引用计数则不会释放，也就会造成大量无用内存占用，
这也是后来放弃引用计数，使用标记清除的原因之一
优点
引用计数算法的优点我们对比标记清除来看就会清晰很多，首先引用计数在引用值为 0 时，也就是在
变成垃圾的那一刻就会被回收，所以它可以立即回收垃圾
而标记清除算法需要每隔一段时间进行一次，那在应用程序（JS脚本）运行过程中线程就必须要暂停去执行
一段时间的 GC，另外，标记清除算法需要遍历堆里的活动以及非活动对象来清除，而引用计数则只需要
在引用时计数就可以了
缺点
引用计数的缺点想必大家也都很明朗了，首先它需要一个计数器，而此计数器需要占很大的位置，因为我们
也不知道被引用数量的上限，还有就是无法解决循环引用无法回收的问题，这也是最严重的

V8引擎对垃圾回收进行了哪些优化？

```
