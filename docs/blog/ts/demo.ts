abstract class Base {
    abstract getName(): string;

    printName() {
        console.log("Hello, " + this.getName());
    }
}

class Derived extends Base {
    // 非抽象类“Derived”不会实现继承自“Base”类的抽象成员“getName”。
    getAge() {
        return "world";
    }
}

const d = new Derived();
d.printName();
