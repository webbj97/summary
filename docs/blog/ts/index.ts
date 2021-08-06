// type A1 = 'x' | 'y'
// type A2 = A1 extends 'x' ? 1 : 2;
// const c: A2 = 2

// type P<T> = T extends 'x' ? 1 : 2;
// type A3 = P<'x' | 'y'>

interface fruits {
  name: string;
  getColor(): void;
}
interface person {
  name: string;
  getAge(): void;
}

type fruitsOrPerson = fruits | person;

// 通过
function getColor(intance: fruitsOrPerson) {
  return (intance as fruits).getColor();
}

interface Animal {
  name: string;
}
interface Cat {
  age: string;
}

const animal: Animal = {
  name: "tom",
};

let tom = animal as Cat
