function firstElement<T>(arr: T[]): T {
    return arr[0];
}

const str = firstElement(["str"]);
// const str: string
const bool = firstElement([true]);
// const bool: boolean
const num = firstElement([1]);
// const num: number

function map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output
): Output[] {
    return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// const res = map([1, 2, 3, 4], (val) => val.split(","));
// (parameter) val: number
// 类型“number”上不存在属性“split”。

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'

function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}

const res1 = longest([1, 2, 3], 1);
// ❌ 类型“number”的参数不能赋给类型“{ length: number; }”的参数。
const res2 = longest([1, "2", 3], [1]);
// const res2: (string | number)[]
const res3 = longest("yuguang", "余光");
// const res3: "yuguang" | "余光"

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}
// 如果你像下面这样调用函数就会出现错误：

const arr1 = combine([1, 2, 3], ["hello"]);
// 不能将类型“string”分配给类型“number”

// 而如果你执意要这样做，你可以手动指定 Type：
const arr2 = combine<string | number>([1, 2, 3], ["hello"]);
