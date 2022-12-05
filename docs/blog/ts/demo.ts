// const NumericObject = {
//     [1]: "冴羽一号",
//     [2]: "冴羽二号",
//     [3]: "冴羽三号",
// };

// type res = keyof typeof NumericObject;

type Array1 = { [index: number]: unknown };
type A = keyof Array1; // type A = number

type Map1 = { [k: string]: boolean };
type M = keyof Map1; // type M = string | number

function returnObjVal<T, K extends keyof T>(obj: T, key: K) {
    // (parameter) key: K extends keyof T
    return obj[key];
}

class GenericNumber<NumType> {
    add: (x: NumType, y: NumType) => NumType;
}

type numberOrStr = number | string;
let myGenericNumber = new GenericNumber<numberOrStr>();

myGenericNumber.add = function(x, y) {
    return x + y; // 运算符“+”不能应用于类型“numberOrStr”和“numberOrStr”
};

// let s = "hello";
// let n: typeof s; // let n: string

// type funcType = (str: string) => boolean;
// type n = ReturnType<funcType>; // type n = boolean

function f() {
    return { x: 10, y: 3 };
}

// 获取函数类型
type typeFn = typeof f;
// type typeFn = () => {
//     x: number;
//     y: number;
// }
type returnTypeFn = ReturnType<typeFn>;
// type typeFn = () => {
//     x: number;
//     y: number;
// }

const obj = { name: "kevin", age: "18" };
type objT = typeof obj;
// type objT = {
//     name: string;
//     age: string;
// }

function identity<Type>(arg: Type): Type {
    return arg;
}

type identityT = typeof identity 
