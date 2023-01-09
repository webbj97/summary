type T0 = Extract<"a" | "b" | "c", "a" | "f">;

// 不能将类型“{ name: string; }”分配给类型“nameAndAge”。
// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "stringMsg" 中需要该属性。
type Per = {
    name: string;
    age: number;
};
type keyofPer = keyof Per;
let aa: keyofPer = "name";

type _Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type _ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
};
