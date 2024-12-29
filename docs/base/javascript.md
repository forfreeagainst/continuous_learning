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

## 作用域

作用域的概念
到底有多少作用域。javascript那本书，课件只说了静态作用域和动态作用域。
作用域有哪些？
全局作用域，函数作用域，块级作用域
模块作用域，脚本作用域，Closure作用域（闭包作用域）
Eval作用域，catch作用域，with作用域

## this指向

## 垃圾回收机制
