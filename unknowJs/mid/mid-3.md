<img align=center src="../img/4.png"/>

# 原生函数
常用的原生函数有:
* String()
* Number()
* Boolean()
* Array()
* Object()
* Function()
* RegExp()
* Date()
* Error()
* Symbol()——ES6 中新加入的!

实际上，它们就是内建函数。
熟悉 Java 语言的人会发现，JavaScript 中的 String() 和 Java 中的字符串构造函数
String(..) 非常相似，可以这样来用:
```js
var s = new String( "Hello World!" );
console.log( s.toString() ); // "Hello World!"
```

原生函数可以被当作构造函数来使用，但其构造出来的对象可能会和我们设想的有所出入:
```js
var a = new String( "abc" );
typeof a; // 是"object"，不是"String" 
a instanceof String; // true 
Object.prototype.toString.call( a ); // "[object String]"
```

## 3.1 内部属性 [[Class]]
所有 typeof 返回值为 "object" 的对象(如数组)都包含一个内部属性` [[Class]]` (我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类)。这个属性无法直接访问， 一般通过 `Object.prototype.toString(..) `来查看。例如:
```js
Object.prototype.toString.call( [1,2,3] );
// "[object Array]"
Object.prototype.toString.call( /regex-literal/i );
// "[object RegExp]"
```

## 3.2 封装对象包装
封装对象扮演着十分重要的角色。由于基本类型值没有 `.length`和 `.toString()`这样的属性和方法，需要通过封装对象才能访问到，此时JavaScript会自动为基本类型值包装一个封装对象。
```js
var a = "abc"

a.length; // 3
a.toUpperCase(); // "ABC"
```

##### 有意思的封装对象
```js
var a = new Boolean( false );
if (!a) {
	console.log( "Oops" ); // 执行不到这里
}
```

我们为 false 创建了一个`封装对象`，然而该对象是真值，即总是返回 true，所以这里使用封装对象得到的结果和使用 false 截然相反。 
```js
var a = "abc";
var b = new String( a );
var c = Object( a );
typeof a; // "string"
typeof b; // "object"
typeof c; // "object"
b instanceof String; // true
c instanceof String; // true
Object.prototype.toString.call( b ); // "[object String]"
Object.prototype.toString.call( c ); // "[object String]"
```
再次强调，一般不推荐直接使用封装对象(如上例中的 b 和 c)，但它们偶尔也会派上 用场。

## 3.3 拆封
如果想要得到封装对象中的基本类型值，可以使用 valueOf() 函数:
```js
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );
a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true
```

## 3.4 小节
JavaScript 为基本数据类型值提供了封装对象，称为原生函数(如 String、Number、Boolean 等)。它们为基本数据类型值提供了该子类型所特有的方法和属性(如:`String#trim() 和 Array#concat(..)`)。

对于简单标量基本类型值，比如 "abc"，如果要访问它的 length 属性或 String.prototype 方法，JavaScript 引擎会自动对该值进行封装(即用相应类型的封装对象来包装它)来实 现对这些属性和方法的访问。
