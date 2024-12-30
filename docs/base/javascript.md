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
