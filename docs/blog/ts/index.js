class Animal {
    constructor(name){
        this.name = name;
    }
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    constructor(name){
        super(name)
        console.log('this:', this.name);
    }
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog('哈哈哈');
dog.bark();
dog.move(10);
dog.bark();