abstract class Animal {
  abstract makeSound(): void;
  sayHi(): void {
    console.log("Hi.");
  }
}

// error
// class Dog extends Animal {
//   // error 非抽象类“Dog”不会实现继承自“Animal”类的抽象成员“makeSound”
// }

// good
class Cat extends Animal {
  makeSound() :void{
    console.log('miao miao~');
  }
}
const cat = new Cat();
cat.sayHi(); // hi
cat.makeSound(); // miao miao~
